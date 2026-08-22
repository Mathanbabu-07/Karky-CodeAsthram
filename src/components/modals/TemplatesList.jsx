import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiSearch,
  FiClock,
  FiAward,
  FiCode,
  FiPlay,
  FiGrid,
  FiList,
  FiCopy,
  FiCheck,
  FiLayers,
  FiArrowRight,
} from 'react-icons/fi';
import { SiPython, SiJavascript } from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import {
  PYTHON_TEMPLATES,
  JAVASCRIPT_TEMPLATES,
  JAVA_TEMPLATES,
} from '../../templates';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';

// Generate code preview from XML safely in headless mode
function generatePreviewCode(workspaceXml, language = 'python') {
  try {
    if (!globalThis.Blockly || !workspaceXml) return '// No code preview available';
    
    const headlessWs = new globalThis.Blockly.Workspace();
    const dom = globalThis.Blockly.utils.xml.textToDom(workspaceXml);
    globalThis.Blockly.Xml.domToWorkspace(dom, headlessWs);

    let code = '';
    const lang = (language || 'python').toLowerCase();
    if (lang === 'javascript' && globalThis.JavaScript) {
      code = globalThis.JavaScript.workspaceToCode(headlessWs);
    } else if (lang === 'java' && globalThis.Java) {
      code = globalThis.Java.workspaceToCode(headlessWs);
    } else if (globalThis.Python) {
      code = globalThis.Python.workspaceToCode(headlessWs);
    }

    headlessWs.dispose();
    return code.trim() || `// Pre-built ${language} starter template`;
  } catch (err) {
    return `// ${language.toUpperCase()} Template Preview\n// Load this project to view all interactive blocks in the workspace.`;
  }
}

export default function TemplatesList({ onSelectTemplate, onClose, currentLanguage = 'python' }) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [previewCode, setPreviewCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Combine all templates with language tags
  const allTemplates = useMemo(() => {
    return [
      ...PYTHON_TEMPLATES.map(t => ({ ...t, language: 'python' })),
      ...JAVASCRIPT_TEMPLATES.map(t => ({ ...t, language: 'javascript' })),
      ...JAVA_TEMPLATES.map(t => ({ ...t, language: 'java' })),
    ];
  }, []);

  // Sync selected language when parent currentLanguage changes
  useEffect(() => {
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    const baseList = selectedLanguage === 'all'
      ? allTemplates
      : allTemplates.filter(t => t.language === selectedLanguage);
    baseList.forEach(t => t.tags?.forEach(tag => tagsSet.add(tag)));
    return ['All', ...Array.from(tagsSet).sort()];
  }, [allTemplates, selectedLanguage]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(t => {
      const matchesLang = selectedLanguage === 'all' || t.language === selectedLanguage;
      const matchesSearch =
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = selectedDifficulty === 'All' || t.difficulty === selectedDifficulty;
      const matchesTag = selectedTag === 'All' || t.tags?.includes(selectedTag);

      return matchesLang && matchesSearch && matchesDifficulty && matchesTag;
    });
  }, [allTemplates, selectedLanguage, searchTerm, selectedDifficulty, selectedTag]);

  // Open Preview Drawer
  const handleOpenPreview = (template, e) => {
    e?.stopPropagation();
    setPreviewTemplate(template);
    const code = generatePreviewCode(template.workspaceXml, template.language);
    setPreviewCode(code);
  };

  // Close Preview Drawer
  const handleClosePreview = () => {
    setPreviewTemplate(null);
    setPreviewCode('');
  };

  // Copy Preview Code
  const handleCopyCode = () => {
    if (!previewCode) return;
    navigator.clipboard.writeText(previewCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Load Template
  const handleLoad = async (template) => {
    setIsLoading(true);
    try {
      await onSelectTemplate(template);
    } catch (err) {
      console.error('Error loading template:', err);
    } finally {
      setIsLoading(false);
      handleClosePreview();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (previewTemplate) {
          handleClosePreview();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewTemplate, onClose]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.97, y: 12 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: 12 },
  };

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner':
        return { bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.25)', text: '#4ade80' };
      case 'intermediate':
        return { bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.25)', text: '#facc15' };
      case 'advanced':
        return { bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.25)', text: '#f87171' };
      default:
        return { bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.25)', text: '#38bdf8' };
    }
  };

  const renderLangIcon = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'python':
        return <SiPython className="lang-vector-icon python" />;
      case 'javascript':
        return <SiJavascript className="lang-vector-icon javascript" />;
      case 'java':
        return <FaJava className="lang-vector-icon java" />;
      default:
        return <FiCode className="lang-vector-icon" />;
    }
  };

  return (
    <div
      className="templates-hub-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="templates-hub-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <motion.div
        className="templates-hub-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Header Section */}
        <div className="templates-hub-header">
          <div className="hub-title-group">
            <div className="hub-title-badge">
              <FiLayers className="hub-title-icon" />
              <h2 id="templates-hub-title">Project Templates</h2>
            </div>
            <p className="hub-subtitle">
              Pre-configured algorithmic and domain-specific project templates for immediate exploration.
            </p>
          </div>

          <button onClick={onClose} className="hub-close-btn" aria-label="Close project templates">
            <FiX />
          </button>
        </div>

        {/* Navigation & Filter Bar */}
        <div className="hub-nav-bar">
          {/* Language Tabs */}
          <div className="hub-lang-tabs">
            <button
              className={`hub-lang-tab ${selectedLanguage === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('all')}
            >
              <FiLayers className="tab-icon" />
              <span>All Projects</span>
              <span className="hub-count-pill">{allTemplates.length}</span>
            </button>
            <button
              className={`hub-lang-tab ${selectedLanguage === 'python' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('python')}
            >
              <SiPython className="tab-icon python" />
              <span>Python</span>
              <span className="hub-count-pill">{PYTHON_TEMPLATES.length}</span>
            </button>
            <button
              className={`hub-lang-tab ${selectedLanguage === 'javascript' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('javascript')}
            >
              <SiJavascript className="tab-icon javascript" />
              <span>JavaScript</span>
              <span className="hub-count-pill">{JAVASCRIPT_TEMPLATES.length}</span>
            </button>
            <button
              className={`hub-lang-tab ${selectedLanguage === 'java' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('java')}
            >
              <FaJava className="tab-icon java" />
              <span>Java</span>
              <span className="hub-count-pill">{JAVA_TEMPLATES.length}</span>
            </button>
          </div>

          {/* Search & Layout Controls */}
          <div className="hub-search-controls">
            <div className="hub-search-box">
              <FiSearch className="hub-search-icon" />
              <input
                type="text"
                placeholder="Search templates or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="hub-search-input"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="hub-search-clear">
                  <FiX />
                </button>
              )}
            </div>

            <div className="hub-view-toggle">
              <button
                className={`hub-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <FiGrid />
              </button>
              <button
                className={`hub-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Filters: Difficulty & Topic Tags */}
        <div className="hub-filter-chips-row">
          <div className="hub-chip-group">
            <span className="hub-filter-label">Difficulty:</span>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                className={`hub-filter-chip ${selectedDifficulty === diff ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff}
              </button>
            ))}
          </div>

          {allTags.length > 2 && (
            <div className="hub-chip-group tags-scroll">
              <span className="hub-filter-label">Topic:</span>
              {allTags.slice(0, 10).map((tag) => (
                <button
                  key={tag}
                  className={`hub-filter-chip ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="hub-content-container">
          {filteredTemplates.length === 0 ? (
            <div className="hub-empty-state">
              <div className="empty-icon-wrap">
                <FiSearch />
              </div>
              <h3>No projects match your filters</h3>
              <p>Try adjusting your search query, language selection, or difficulty level.</p>
              <button
                className="hub-reset-filters-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDifficulty('All');
                  setSelectedTag('All');
                  setSelectedLanguage('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="hub-grid-layout">
              {filteredTemplates.map((template) => {
                const diffStyle = getDifficultyColor(template.difficulty);
                return (
                  <motion.div
                    key={template.id}
                    className="hub-project-card"
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  >
                    <div className="hub-card-top">
                      <div className="hub-card-badges">
                        <span
                          className="hub-diff-badge"
                          style={{
                            backgroundColor: diffStyle.bg,
                            borderColor: diffStyle.border,
                            color: diffStyle.text,
                          }}
                        >
                          <FiAward style={{ marginRight: '4px' }} />
                          {template.difficulty}
                        </span>
                        <span className="hub-time-badge">
                          <FiClock style={{ marginRight: '4px' }} />
                          {template.estimatedTime}
                        </span>
                        <span className="hub-lang-tag">
                          {renderLangIcon(template.language)}
                          <span>{template.language}</span>
                        </span>
                      </div>
                      <h3 className="hub-card-title">{template.title}</h3>
                      <p className="hub-card-desc">{template.description}</p>
                    </div>

                    <div className="hub-card-bottom">
                      <div className="hub-card-tags">
                        {template.tags?.slice(0, 3).map((tag) => (
                          <span key={tag} className="hub-tag-pill">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="hub-card-actions">
                        <button
                          className="hub-preview-btn"
                          onClick={(e) => handleOpenPreview(template, e)}
                          title="Preview generated code"
                        >
                          <FiCode />
                          Preview
                        </button>
                        <button
                          className="hub-load-btn"
                          onClick={() => handleLoad(template)}
                          disabled={isLoading}
                          title={template.language !== currentLanguage ? `Loads template and switches workspace to ${template.language.toUpperCase()}` : 'Loads template into workspace'}
                        >
                          <FiPlay />
                          {template.language !== currentLanguage ? `Load (${template.language.toUpperCase()})` : 'Load Template'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="hub-list-layout">
              {filteredTemplates.map((template) => {
                const diffStyle = getDifficultyColor(template.difficulty);
                return (
                  <div key={template.id} className="hub-list-item">
                    <div className="hub-list-info">
                      <div className="hub-list-title-row">
                        <span className="hub-list-lang-icon">{renderLangIcon(template.language)}</span>
                        <h4 className="hub-list-title">{template.title}</h4>
                        <span
                          className="hub-diff-badge"
                          style={{
                            backgroundColor: diffStyle.bg,
                            borderColor: diffStyle.border,
                            color: diffStyle.text,
                          }}
                        >
                          {template.difficulty}
                        </span>
                        <span className="hub-time-badge">{template.estimatedTime}</span>
                      </div>
                      <p className="hub-list-desc">{template.description}</p>
                      <div className="hub-card-tags">
                        {template.tags?.map((tag) => (
                          <span key={tag} className="hub-tag-pill">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hub-list-actions">
                      <button
                        className="hub-preview-btn"
                        onClick={(e) => handleOpenPreview(template, e)}
                      >
                        <FiCode />
                        Preview
                      </button>
                      <button
                        className="hub-load-btn"
                        onClick={() => handleLoad(template)}
                        disabled={isLoading}
                        title={template.language !== currentLanguage ? `Loads template and switches workspace to ${template.language.toUpperCase()}` : 'Loads template into workspace'}
                      >
                        <FiPlay />
                        {template.language !== currentLanguage ? `Load (${template.language.toUpperCase()})` : 'Load'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="hub-footer">
          <span className="hub-footer-count">
            Showing <strong>{filteredTemplates.length}</strong> of{' '}
            <strong>{allTemplates.length}</strong> project templates
          </span>
          <button onClick={onClose} className="hub-footer-close">
            <FiX />
            Close
          </button>
        </div>

        {/* Live Code Preview Drawer Overlay */}
        <AnimatePresence>
          {previewTemplate && (
            <motion.div
              className="hub-preview-drawer"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              <div className="preview-drawer-header">
                <div>
                  <div className="preview-lang-pill">
                    {renderLangIcon(previewTemplate.language)}
                    <span>{previewTemplate.language.toUpperCase()} PROJECT</span>
                  </div>
                  <h3>{previewTemplate.title}</h3>
                  <p>{previewTemplate.description}</p>
                </div>
                <button onClick={handleClosePreview} className="preview-close-btn" aria-label="Close preview">
                  <FiX />
                </button>
              </div>

              <div className="preview-code-container">
                <div className="preview-code-header">
                  <span className="preview-code-tab">
                    <FiCode /> Generated Source Code
                  </span>
                  <button onClick={handleCopyCode} className="preview-copy-btn">
                    {copied ? (
                      <>
                        <FiCheck style={{ color: '#4ade80' }} /> Copied
                      </>
                    ) : (
                      <>
                        <FiCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>
                <pre className="preview-code-block">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: highlight(
                        previewCode,
                        languages[previewTemplate.language] || languages.python,
                        previewTemplate.language
                      ),
                    }}
                  />
                </pre>
              </div>

              <div className="preview-drawer-footer">
                <button onClick={handleClosePreview} className="preview-cancel-btn">
                  Cancel
                </button>
                <button
                  onClick={() => handleLoad(previewTemplate)}
                  className="preview-load-btn"
                  disabled={isLoading}
                >
                  <FiPlay />
                  {previewTemplate.language !== currentLanguage ? `Switch to ${previewTemplate.language.toUpperCase()} & Load` : 'Load into Workspace'}
                  <FiArrowRight />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

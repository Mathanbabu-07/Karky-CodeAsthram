import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiPlay,
  FiClock,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiLayers,
  FiSearch,
} from 'react-icons/fi';
import { SiPython, SiJavascript } from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import {
  PYTHON_TUTORIALS,
  JAVASCRIPT_TUTORIALS,
  JAVA_TUTORIALS,
} from '../../tutorials';

const TutorialsList = ({ tutorials, onSelectTutorial, onClose, currentLanguage = 'python' }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const allTutorials = useMemo(() => {
    return [
      ...PYTHON_TUTORIALS.map(t => ({ ...t, language: 'python' })),
      ...JAVASCRIPT_TUTORIALS.map(t => ({ ...t, language: 'javascript' })),
      ...JAVA_TUTORIALS.map(t => ({ ...t, language: 'java' })),
    ];
  }, []);

  useEffect(() => {
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredTutorials = useMemo(() => {
    return allTutorials.filter(tut => {
      const matchesLang = selectedLanguage === 'all' || tut.language === selectedLanguage;
      const matchesDiff = selectedDifficulty === 'All' || tut.difficulty === selectedDifficulty;
      const matchesSearch =
        tut.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tut.learningObjectives?.some(obj => obj.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesLang && matchesDiff && matchesSearch;
    });
  }, [allTutorials, selectedLanguage, selectedDifficulty, searchTerm]);

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
        return <FiBookOpen className="lang-vector-icon" />;
    }
  };

  return (
    <div
      className="tutorials-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorials-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <motion.div
        className="tutorials-hub-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="tutorials-hub-header">
          <div className="hub-title-group">
            <div className="hub-title-badge">
              <FiBookOpen className="hub-title-icon" />
              <h2 id="tutorials-modal-title">Interactive Tutorials</h2>
            </div>
            <p className="hub-subtitle">
              Structured step-by-step interactive lessons covering core programming constructs.
            </p>
          </div>
          {onClose && (
            <button onClick={onClose} className="hub-close-btn" aria-label="Close tutorials">
              <FiX />
            </button>
          )}
        </div>

        {/* Navigation & Tabs */}
        <div className="hub-nav-bar">
          <div className="hub-lang-tabs">
            <button
              className={`hub-lang-tab ${selectedLanguage === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('all')}
            >
              <FiLayers className="tab-icon" />
              <span>All Tutorials</span>
              <span className="hub-count-pill">{allTutorials.length}</span>
            </button>
            <button
              className={`hub-lang-tab ${selectedLanguage === 'python' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('python')}
            >
              <SiPython className="tab-icon python" />
              <span>Python</span>
              <span className="hub-count-pill">{PYTHON_TUTORIALS.length}</span>
            </button>
            <button
              className={`hub-lang-tab ${selectedLanguage === 'javascript' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('javascript')}
            >
              <SiJavascript className="tab-icon javascript" />
              <span>JavaScript</span>
              <span className="hub-count-pill">{JAVASCRIPT_TUTORIALS.length}</span>
            </button>
            <button
              className={`hub-lang-tab ${selectedLanguage === 'java' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('java')}
            >
              <FaJava className="tab-icon java" />
              <span>Java</span>
              <span className="hub-count-pill">{JAVA_TUTORIALS.length}</span>
            </button>
          </div>

          <div className="hub-search-controls">
            <div className="hub-search-box">
              <FiSearch className="hub-search-icon" />
              <input
                type="text"
                placeholder="Search tutorials..."
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
          </div>
        </div>

        {/* Difficulty Filter Chips */}
        <div className="hub-filter-chips-row">
          <div className="hub-chip-group">
            <span className="hub-filter-label">Level:</span>
            {['All', 'Beginner', 'Intermediate'].map((diff) => (
              <button
                key={diff}
                className={`hub-filter-chip ${selectedDifficulty === diff ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="tutorials-hub-content">
          {filteredTutorials.length === 0 ? (
            <div className="hub-empty-state">
              <div className="empty-icon-wrap">
                <FiSearch />
              </div>
              <h3>No tutorials found</h3>
              <p>Try clearing your search query or switching to another language tab.</p>
              <button
                className="hub-reset-filters-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDifficulty('All');
                  setSelectedLanguage('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="tutorials-card-grid">
              {filteredTutorials.map((tut) => {
                const diffStyle = getDifficultyColor(tut.difficulty);
                return (
                  <motion.div
                    key={tut.id}
                    className="tutorial-mission-card"
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  >
                    <div className="tutorial-card-top">
                      <div className="tutorial-badges-row">
                        <span
                          className="hub-diff-badge"
                          style={{
                            backgroundColor: diffStyle.bg,
                            borderColor: diffStyle.border,
                            color: diffStyle.text,
                          }}
                        >
                          <FiAward style={{ marginRight: '4px' }} />
                          {tut.difficulty}
                        </span>
                        <span className="hub-time-badge">
                          <FiClock style={{ marginRight: '4px' }} />
                          {tut.estimatedTime}
                        </span>
                        <span className="tutorial-stages-pill">
                          <FiLayers style={{ marginRight: '4px' }} />
                          {tut.stages?.length || 0} Steps
                        </span>
                        <span className="hub-lang-tag">
                          {renderLangIcon(tut.language)}
                          <span>{tut.language}</span>
                        </span>
                      </div>

                      <h3 className="tutorial-mission-title">{tut.title}</h3>

                      {tut.learningObjectives && tut.learningObjectives.length > 0 && (
                        <div className="tutorial-goals-preview">
                          <span className="goals-heading">Learning Objectives:</span>
                          <ul>
                            {tut.learningObjectives.slice(0, 2).map((obj, idx) => (
                              <li key={idx}>
                                <FiCheckCircle className="goal-check-icon" />
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="tutorial-card-footer">
                      <button
                        className="tutorial-start-mission-btn"
                        onClick={() => onSelectTutorial(tut)}
                        title={tut.language !== currentLanguage ? `Starts tutorial and switches workspace to ${tut.language.toUpperCase()}` : 'Starts tutorial'}
                      >
                        <FiPlay />
                        {tut.language !== currentLanguage ? `Start (${tut.language.toUpperCase()})` : 'Start Tutorial'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="hub-footer">
          <span className="hub-footer-count">
            Showing <strong>{filteredTutorials.length}</strong> of{' '}
            <strong>{allTutorials.length}</strong> interactive tutorials
          </span>
          {onClose && (
            <button onClick={onClose} className="hub-footer-close">
              <FiX />
              Close
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TutorialsList;

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronsRight, FiChevronLeft, FiChevronRight, FiSearch, FiFilter } from 'react-icons/fi';
import { TEMPLATES } from '../../templates';

export default function TemplatesList({ onSelectTemplate, onClose }) {
  const [direction, setDirection] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilteredIndex, setCurrentFilteredIndex] = useState(0);

  // Filter and search templates
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(template => {
      const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = selectedDifficulty === 'All' || template.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, selectedDifficulty]);

  // Reset to first template when filters change
  useEffect(() => {
    setCurrentFilteredIndex(0);
  }, [filteredTemplates]);

  const currentTemplate = filteredTemplates[currentFilteredIndex] || TEMPLATES[0];

  const handleSelectTemplate = useCallback(async () => {
    setIsLoading(true);
    try {
      await onSelectTemplate(currentTemplate);
    } catch (error) {
      console.error('Error loading template:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentTemplate, onSelectTemplate]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentFilteredIndex((prevIndex) => (prevIndex + 1) % filteredTemplates.length);
  }, [filteredTemplates.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentFilteredIndex((prevIndex) => (prevIndex - 1 + filteredTemplates.length) % filteredTemplates.length);
  }, [filteredTemplates.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
        case 'Enter':
          event.preventDefault();
          handleSelectTemplate();
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, handleSelectTemplate, onClose]);

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="templates-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="templates-modal-title">
      <motion.div
        className="templates-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <div className="templates-modal-header">
          <div className="header-content">
            <h2 id="templates-modal-title">Load a Template</h2>
            <p>Select a pre-built project to get started.</p>
          </div>
          <div className="header-controls">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              aria-label="Toggle filters"
            >
              <FiFilter />
            </button>
          </div>
        </div>
        {showFilters && (
          <motion.div
            className="filters-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-group">
              <label>Difficulty:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="difficulty-select"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="filter-stats">
              {filteredTemplates.length} of {TEMPLATES.length} templates
            </div>
          </motion.div>
        )}
        <div className="templates-carousel-wrapper">
          <button onClick={handlePrev} className="carousel-nav-btn prev" aria-label="Previous template">
            <FiChevronLeft />
          </button>
          <div className="templates-modal-content">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentFilteredIndex}
                className="template-card"
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 200, damping: 25 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
              >
                <div className="template-card-preview">
                  {/* Full-bleed tech frame loader utilizing entire panel */}
                  <svg className="template-techframe" viewBox="0 0 160 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="tfGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="var(--primary-500)" />
                        <stop offset="100%" stopColor="var(--accent-500)" />
                      </linearGradient>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--panel-border)" strokeWidth="0.5" />
                      </pattern>
                      <mask id="fadeMask">
                        <linearGradient id="maskGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="white" stopOpacity="0"/>
                          <stop offset="10%" stopColor="white" stopOpacity="1"/>
                          <stop offset="90%" stopColor="white" stopOpacity="1"/>
                          <stop offset="100%" stopColor="white" stopOpacity="0"/>
                        </linearGradient>
                        <rect x="0" y="0" width="160" height="160" fill="url(#maskGrad)"/>
                      </mask>
                    </defs>

                    {/* background tech grid */}
                    <rect x="0" y="0" width="160" height="160" fill="url(#grid)" opacity="0.35" />

                    {/* tech frame border */}
                    <rect x="2" y="2" width="156" height="156" rx="10" ry="10" fill="none" stroke="url(#tfGrad)" strokeWidth="2" />
                    <rect x="8" y="8" width="144" height="144" rx="8" ry="8" fill="none" stroke="url(#tfGrad)" strokeWidth="1" opacity="0.6" />

                    {/* moving sweep */}
                    <g className="techframe-sweep" mask="url(#fadeMask)">
                      <rect x="-160" y="0" width="80" height="160" fill="url(#tfGrad)" opacity="0.15" />
                    </g>

                    {/* block-flow path using puzzle-like blocks */}
                    <g className="block-flow">
                      {/* simple puzzle-like blocks approximated with rect + circles */}
                      <g transform="translate(18,34)">
                        <rect x="0" y="0" width="36" height="20" rx="3" fill="var(--primary-500)" />
                        <circle cx="36" cy="10" r="3" fill="var(--surface-1)" />
                      </g>
                      <g transform="translate(60,34)">
                        <rect x="0" y="0" width="36" height="20" rx="3" fill="var(--accent-500)" />
                        <circle cx="0" cy="10" r="3" fill="var(--surface-1)" />
                        <circle cx="36" cy="10" r="3" fill="var(--surface-1)" />
                      </g>
                      <g transform="translate(102,34)">
                        <rect x="0" y="0" width="36" height="20" rx="3" fill="var(--primary-600)" />
                        <circle cx="0" cy="10" r="3" fill="var(--surface-1)" />
                      </g>

                      <g transform="translate(28,70)">
                        <rect x="0" y="0" width="30" height="20" rx="3" fill="var(--accent-500)" />
                        <circle cx="30" cy="10" r="3" fill="var(--surface-1)" />
                      </g>
                      <g transform="translate(66,70)">
                        <rect x="0" y="0" width="30" height="20" rx="3" fill="var(--primary-500)" />
                        <circle cx="0" cy="10" r="3" fill="var(--surface-1)" />
                        <circle cx="30" cy="10" r="3" fill="var(--surface-1)" />
                      </g>
                      <g transform="translate(104,70)">
                        <rect x="0" y="0" width="30" height="20" rx="3" fill="var(--accent-500)" />
                        <circle cx="0" cy="10" r="3" fill="var(--surface-1)" />
                      </g>

                      <g transform="translate(40,106)">
                        <rect x="0" y="0" width="24" height="20" rx="3" fill="var(--primary-600)" />
                        <circle cx="24" cy="10" r="3" fill="var(--surface-1)" />
                      </g>
                      <g transform="translate(70,106)">
                        <rect x="0" y="0" width="24" height="20" rx="3" fill="var(--accent-500)" />
                        <circle cx="0" cy="10" r="3" fill="var(--surface-1)" />
                        <circle cx="24" cy="10" r="3" fill="var(--surface-1)" />
                      </g>
                      <g transform="translate(100,106)">
                        <rect x="0" y="0" width="24" height="20" rx="3" fill="var(--primary-500)" />
                        <circle cx="0" cy="10" r="3" fill="var(--surface-1)" />
                      </g>
                    </g>

                    {/* faint corner accents */}
                    <g opacity="0.5" stroke="url(#tfGrad)" strokeWidth="1">
                      <path d="M8 20 L8 8 L20 8" />
                      <path d="M140 8 L152 8 L152 20" />
                      <path d="M8 140 L8 152 L20 152" />
                      <path d="M152 140 L152 152 L140 152" />
                    </g>
                  </svg>
                </div>
                <div className="template-card-details">
                  <h3>{currentTemplate.title}</h3>
                  <p>{currentTemplate.description}</p>
                  <div className="template-meta">
                    <span className="difficulty-tag">{currentTemplate.difficulty}</span>
                    <span className="time-tag">{currentTemplate.estimatedTime}</span>
                  </div>
                  <div className="template-card-tags">
                    {currentTemplate.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button onClick={handleNext} className="carousel-nav-btn next" aria-label="Next template">
            <FiChevronRight />
          </button>
        </div>
        <div className="templates-modal-footer">
          <button onClick={onClose} className="close-modal-btn">
            <FiX />
            Close
          </button>
          <button
            onClick={handleSelectTemplate}
            disabled={isLoading}
            className={`load-template-btn primary ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ width: 16, height: 16, border: '2px solid var(--text)', borderTop: '2px solid transparent', borderRadius: '50%' }}
                />
                Loading...
              </>
            ) : (
              <>
                <FiChevronsRight />
                Load Template
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

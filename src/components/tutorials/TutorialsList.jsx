import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlay, FiClock, FiAward, FiBookOpen } from 'react-icons/fi';
import { getTutorialsForLanguage } from '../../tutorials';

const TutorialsList = ({ tutorials, onSelectTutorial, onClose, currentLanguage = 'python' }) => {
  const activeTutorials = tutorials || getTutorialsForLanguage(currentLanguage);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
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
        className="tutorials-modal-content-card"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.25 }}
      >
        <div className="tutorials-modal-header">
          <div className="tutorials-header-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiBookOpen style={{ color: 'var(--primary-500)', fontSize: '20px' }} />
              <h2 id="tutorials-modal-title">Interactive Tutorials</h2>
              <span className="tech-tag" style={{ textTransform: 'capitalize', fontSize: '11px', padding: '2px 8px' }}>
                {currentLanguage}
              </span>
            </div>
            <p className="tutorials-subtitle">
              Step-by-step guided lessons to learn {currentLanguage} coding fundamentals.
            </p>
          </div>
          {onClose && (
            <button onClick={onClose} className="tutorials-close-btn" aria-label="Close tutorials">
              <FiX />
            </button>
          )}
        </div>

        <div className="tutorials-modal-grid">
          {activeTutorials.map((tutorial) => (
            <div key={tutorial.id} className="tutorial-card-item">
              <div className="tutorial-card-header">
                <div className="tutorial-badges">
                  <span className="tutorial-diff-badge">
                    <FiAward style={{ marginRight: '4px' }} />
                    {tutorial.difficulty}
                  </span>
                  <span className="tutorial-time-badge">
                    <FiClock style={{ marginRight: '4px' }} />
                    {tutorial.estimatedTime}
                  </span>
                </div>
                <h3 className="tutorial-card-title">{tutorial.title}</h3>
              </div>

              {tutorial.learningObjectives && tutorial.learningObjectives.length > 0 && (
                <ul className="tutorial-objectives-list">
                  {tutorial.learningObjectives.slice(0, 2).map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
              )}

              <button
                className="tutorial-launch-btn"
                onClick={() => onSelectTutorial(tutorial)}
              >
                <FiPlay />
                Start Tutorial
              </button>
            </div>
          ))}
        </div>

        <div className="tutorials-modal-footer">
          {onClose && (
            <button onClick={onClose} className="close-modal-btn">
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

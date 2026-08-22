import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiMinus,
  FiMaximize2,
  FiCheckCircle,
  FiBookOpen,
  FiCode,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
} from 'react-icons/fi';
import TutorialStep from './TutorialStep';
import TutorialControls from './TutorialControls';
import { applyActions } from '../../utils/tutorialActions';

const TutorialController = ({ tutorial, workspace, onClose, onExploreMore }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const stages = tutorial?.stages || [];
  const currentStage = stages[currentStageIndex] || stages[0] || null;
  const hasNext = currentStageIndex < stages.length - 1;
  const hasPrevious = currentStageIndex > 0;
  const progressPercent = Math.round(((currentStageIndex + 1) / Math.max(stages.length, 1)) * 100);

  const handleNext = () => {
    if (hasNext) {
      const nextStageIndex = currentStageIndex + 1;
      const nextStage = stages[nextStageIndex];
      if (nextStage && workspace) {
        applyActions(workspace, nextStage.actions);
      }
      setCurrentStageIndex(nextStageIndex);
    }
  };

  const handleBack = () => {
    if (hasPrevious) {
      const prevStageIndex = currentStageIndex - 1;
      if (workspace) {
        workspace.clear();
        for (let i = 0; i <= prevStageIndex; i++) {
          if (stages[i]) {
            applyActions(workspace, stages[i].actions);
          }
        }
      }
      setCurrentStageIndex(prevStageIndex);
    }
  };

  const handleFinish = () => {
    setShowCompletion(true);
  };

  useEffect(() => {
    if (workspace && stages.length > 0 && stages[0]?.actions) {
      applyActions(workspace, stages[0].actions);
    }
  }, [workspace, tutorial]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (
        event.target &&
        (event.target.tagName === 'INPUT' ||
          event.target.tagName === 'TEXTAREA' ||
          event.target.isContentEditable)
      ) {
        return;
      }
      if (event.key === 'n' || event.key === 'N') {
        if (hasNext) handleNext();
        else handleFinish();
      } else if (event.key === 'p' || event.key === 'P') {
        handleBack();
      } else if (event.key === 'Escape') {
        if (showCompletion) setShowCompletion(false);
        else onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentStageIndex, hasNext, hasPrevious, showCompletion]);

  useEffect(() => {
    const lastAction = currentStage?.actions?.[currentStage.actions.length - 1];
    if (workspace && lastAction && lastAction.type === 'addBlock' && lastAction.blockXml) {
      const match = lastAction.blockXml.match(/id="([^"]+)"/);
      const blockId = match ? match[1] : null;
      if (blockId) {
        setTimeout(() => {
          const block = workspace.getBlockById(blockId);
          if (block) {
            const blockSvg = block.getSvgRoot();
            if (blockSvg) {
              blockSvg.classList.add('tutorial-highlight');
              setTimeout(() => {
                blockSvg.classList.remove('tutorial-highlight');
              }, 1800);
            }
          }
        }, 100);
      }
    }
  }, [currentStageIndex, workspace, currentStage]);

  if (!tutorial || stages.length === 0) {
    return null;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isCompact ? (
          /* Compact Docked Tutorial Bar */
          <motion.div
            key="compact"
            className="walkthrough-compact-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="compact-info" onClick={() => setIsCompact(false)}>
              <FiBookOpen className="compact-icon" />
              <span className="compact-title">{tutorial.title}</span>
              <span className="compact-step-pill">
                Step {currentStageIndex + 1} of {stages.length}
              </span>
            </div>

            <div className="compact-actions">
              {hasPrevious && (
                <button onClick={handleBack} className="compact-btn" title="Previous Step (P)">
                  <FiArrowLeft />
                </button>
              )}
              {hasNext ? (
                <button onClick={handleNext} className="compact-btn primary" title="Next Step (N)">
                  <span>Next</span>
                  <FiArrowRight />
                </button>
              ) : (
                <button onClick={handleFinish} className="compact-btn finish" title="Finish Tutorial">
                  <FiCheck />
                  <span>Finish</span>
                </button>
              )}
              <button
                onClick={() => setIsCompact(false)}
                className="compact-btn"
                title="Expand Tutorial Panel"
              >
                <FiMaximize2 />
              </button>
              <button onClick={onClose} className="compact-btn close" title="Exit Tutorial (Esc)">
                <FiX />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Full Docked Guided Walkthrough Panel */
          <motion.div
            key="full-panel"
            className="walkthrough-guide-panel"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            role="dialog"
            aria-modal="false"
            aria-labelledby="walkthrough-title"
          >
            {/* Header */}
            <div className="walkthrough-header">
              <div className="walkthrough-title-wrap">
                <div className="walkthrough-badge">
                  <FiBookOpen />
                  <span>Guided Tutorial</span>
                </div>
                <h3 id="walkthrough-title" className="walkthrough-title">
                  {tutorial.title}
                </h3>
              </div>

              <div className="walkthrough-window-controls">
                <button
                  onClick={() => setIsCompact(true)}
                  className="walkthrough-ctrl-icon-btn"
                  title="Minimize to Compact Bar"
                  aria-label="Minimize"
                >
                  <FiMinus />
                </button>
                <button
                  onClick={onClose}
                  className="walkthrough-ctrl-icon-btn close"
                  title="Exit Tutorial (Esc)"
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Stage Progress Bar & Dots */}
            <div className="walkthrough-stage-tracker">
              <div className="walkthrough-progress-meta">
                <span className="walkthrough-step-counter">
                  Step <strong>{currentStageIndex + 1}</strong> of <strong>{stages.length}</strong>
                </span>
                <span className="walkthrough-pct-counter">{progressPercent}% complete</span>
              </div>

              <div className="walkthrough-progress-track">
                <div
                  className="walkthrough-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Stage Step Indicator Dots */}
              <div className="walkthrough-step-dots">
                {stages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`walkthrough-step-dot ${
                      idx === currentStageIndex ? 'active' : idx < currentStageIndex ? 'completed' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Walkthrough Step Body */}
            <div className="walkthrough-body">
              <TutorialStep stage={currentStage} />
            </div>

            {/* Controls Footer */}
            <div className="walkthrough-footer">
              <TutorialControls
                onNext={handleNext}
                onBack={handleBack}
                onFinish={handleFinish}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tutorial Completion Modal */}
      <AnimatePresence>
        {showCompletion && (
          <div className="walkthrough-completion-overlay" onClick={() => setShowCompletion(false)}>
            <motion.div
              className="walkthrough-completion-modal"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="completion-icon-wrap">
                <FiCheckCircle />
              </div>
              <h2>Tutorial Completed</h2>
              <p className="completion-subtitle">
                You have successfully completed all steps in <strong>{tutorial.title}</strong>.
              </p>

              <div className="completion-summary-card">
                <h4>Key Takeaways</h4>
                <ul>
                  {stages.map((stg, i) => (
                    <li key={i}>
                      <FiCheck className="summary-check-icon" />
                      <span>{stg.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="completion-actions">
                <button
                  className="completion-btn secondary"
                  onClick={() => {
                    setShowCompletion(false);
                    onClose();
                  }}
                >
                  <FiCode />
                  <span>Return to Workspace</span>
                </button>
                <button
                  className="completion-btn primary"
                  onClick={() => {
                    setShowCompletion(false);
                    onClose();
                    onExploreMore?.();
                  }}
                >
                  <span>Browse More Tutorials</span>
                  <FiArrowRight />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TutorialController;



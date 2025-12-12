import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TutorialStep from './TutorialStep';
import TutorialControls from './TutorialControls';
import { applyActions } from '../../utils/tutorialActions';

const TutorialController = ({ tutorial, workspace, onClose }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (workspace && tutorial) {
      applyActions(workspace, tutorial.stages[0].actions);
    }
    // NOTE: Do not clear the workspace when the tutorial controller unmounts.
    // The tutorial should not remove the user's blocks when they close/finish
    // the tutorial. Any workspace resetting for navigation is handled
    // explicitly in navigation handlers (e.g. handleBack).
    return undefined;
  }, [workspace, tutorial]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'n') {
        handleNext();
      } else if (event.key === 'p') {
        handleBack();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentStageIndex]);

  useEffect(() => {
    const lastAction = currentStage.actions[currentStage.actions.length - 1];
    if (workspace && lastAction && lastAction.type === 'addBlock') {
      const blockId = lastAction.blockXml.match(/id="([^"]+)"/)[1];
      if (blockId) {
        setTimeout(() => {
          const block = workspace.getBlockById(blockId);
          if (block) {
            const blockSvg = block.getSvgRoot();
            if (blockSvg) {
              blockSvg.classList.add('tutorial-highlight');
              setTimeout(() => {
                blockSvg.classList.remove('tutorial-highlight');
              }, 1500);
            }
          }
        }, 100);
      }
    }
  }, [currentStageIndex, workspace]);

  if (!tutorial) {
    return null;
  }

  const handleNext = () => {
    if (currentStageIndex < tutorial.stages.length - 1) {
      const nextStageIndex = currentStageIndex + 1;
      const nextStage = tutorial.stages[nextStageIndex];
      applyActions(workspace, nextStage.actions);
      setCurrentStageIndex(nextStageIndex);
    }
  };

  const handleBack = () => {
    if (currentStageIndex > 0) {
      const prevStageIndex = currentStageIndex - 1;
      workspace.clear();
      for (let i = 0; i <= prevStageIndex; i++) {
        applyActions(workspace, tutorial.stages[i].actions);
      }
      setCurrentStageIndex(prevStageIndex);
    }
  };

  const currentStage = tutorial.stages[currentStageIndex];
  const hasNext = currentStageIndex < tutorial.stages.length - 1;
  const hasPrevious = currentStageIndex > 0;

  const panelVariants = {
    hidden: { x: '100%' },
    visible: { x: '0%' },
    exit: { x: '100%' },
  };

  return (
    <AnimatePresence>
      {tutorial && (
        <>
        <motion.div
          className={`tutorial-side-panel ${isMinimized ? 'minimized' : ''}`}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tutorial-title"
        >
          <div className="tutorial-panel-content-wrapper">
            <div className="tutorial-panel-header">
              <div className="tutorial-header-top">
                <h2 id="tutorial-title" className="tutorial-title">{tutorial.title}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="minimize-btn"
                    aria-label={isMinimized ? 'Expand tutorial' : 'Minimize tutorial'}
                  >
                    {isMinimized ? '⤢' : '⤡'}
                  </button>
                  <button onClick={onClose} className="close-btn">×</button>
                </div>
              </div>
              <div className="tutorial-progress">
                <div className="tutorial-progress-bar" style={{ width: `${((currentStageIndex + 1) / tutorial.stages.length) * 100}%` }}></div>
              </div>
              <div className="tutorial-progress-text">
                Stage {currentStageIndex + 1} of {tutorial.stages.length}
              </div>
            </div>
            <div className="tutorial-panel-body">
              <TutorialStep stage={currentStage} />
            </div>
            <div className="tutorial-panel-footer">
              <TutorialControls
                onNext={handleNext}
                onBack={handleBack}
                onClose={onClose}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
              />
            </div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TutorialController;

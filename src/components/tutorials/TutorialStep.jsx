import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TutorialStep = ({ stage }) => {
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  if (!stage) {
    return null;
  }

  const getAccessibilityTextFromActions = (actions) => {
    if (!actions || actions.length === 0) return 'No new blocks or changes in this step.';
    const actionDescriptions = actions.map(action => {
      switch (action.type) {
        case 'addBlock':
          const type = action.blockXml.match(/type="([^"]+)"/);
          return `Add a ${type ? type[1] : 'new'} block.`;
        case 'connect':
          return `Connect block ${action.childBlockId} to ${action.parentBlockId}.`;
        case 'setField':
          return `Set field ${action.fieldName} on block ${action.blockId} to ${action.value}.`;
        case 'clearWorkspace':
          return 'Clear the workspace.';
        default:
          return 'A change was made to the workspace.';
      }
    }).join(' ');
    return actionDescriptions;
  };

  return (
    <div className="tutorial-step">
      <h4 className="tutorial-step-title">{stage.title}</h4>

      <div className="tutorial-section">
        <strong className="tutorial-section-title">Intention</strong>
        <p className="tutorial-section-content">{stage.intention}</p>
      </div>

      <div className="tutorial-section">
        <strong className="tutorial-section-title">Instructions</strong>
        <p className="tutorial-section-content">{stage.instructionText}</p>
      </div>

      <div className="tutorial-section">
        <button
          className="tutorial-section-toggle"
          onClick={() => setIsExplanationVisible(!isExplanationVisible)}
          aria-expanded={isExplanationVisible}
        >
          <strong className="tutorial-section-title">Explanation</strong>
          <span>{isExplanationVisible ? '-' : '+'}</span>
        </button>
        <AnimatePresence>
          {isExplanationVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="tutorial-section-collapsible"
            >
              <p className="tutorial-section-content">
                {stage.explanation || 'No explanation provided for this step.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="tutorial-section">
        <strong className="tutorial-section-title">Expected Outcome</strong>
        <p className="tutorial-section-content">{stage.expectedOutcome}</p>
      </div>

      <div className="visually-hidden" aria-live="polite">
        {stage.accessibilityText || getAccessibilityTextFromActions(stage.actions)}
      </div>
    </div>
  );
};

export default TutorialStep;

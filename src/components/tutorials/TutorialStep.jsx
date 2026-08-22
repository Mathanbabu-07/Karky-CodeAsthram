import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiHelpCircle, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const TutorialStep = ({ stage }) => {
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  if (!stage) {
    return null;
  }

  return (
    <div className="walkthrough-step-container">
      {/* Objective */}
      {stage.intention && (
        <div className="walkthrough-objective-card">
          <div className="walkthrough-objective-icon">
            <FiInfo />
          </div>
          <div className="walkthrough-objective-text">
            <span className="walkthrough-objective-label">Step Objective</span>
            <p className="walkthrough-objective-desc">{stage.intention}</p>
          </div>
        </div>
      )}

      {/* Instructions Card */}
      <div className="walkthrough-instruction-card">
        <h4 className="walkthrough-step-headline">{stage.title}</h4>
        <p className="walkthrough-instruction-text">{stage.instructionText}</p>
      </div>

      {/* Collapsible Deep-Dive / Concept Explanation */}
      {stage.explanation && (
        <div className="walkthrough-concept-accordion">
          <button
            className="walkthrough-concept-toggle"
            onClick={() => setIsExplanationVisible(!isExplanationVisible)}
            aria-expanded={isExplanationVisible}
          >
            <div className="walkthrough-concept-title">
              <FiHelpCircle className="walkthrough-concept-icon" />
              <span>Concept Explanation</span>
            </div>
            {isExplanationVisible ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          <AnimatePresence>
            {isExplanationVisible && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="walkthrough-concept-body"
              >
                <p className="walkthrough-concept-text">{stage.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Expected Outcome */}
      {stage.expectedOutcome && (
        <div className="walkthrough-outcome-card">
          <FiCheckCircle className="walkthrough-outcome-icon" />
          <div className="walkthrough-outcome-text">
            <strong>Expected Output:</strong> {stage.expectedOutcome}
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialStep;



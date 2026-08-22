import React from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';

const TutorialControls = ({ onNext, onBack, onFinish, hasPrevious, hasNext }) => {
  return (
    <div className="walkthrough-controls-bar">
      <button
        onClick={onBack}
        disabled={!hasPrevious}
        className="walkthrough-ctrl-btn secondary"
        title="Previous Step (P)"
      >
        <FiArrowLeft />
        <span>Previous</span>
        <kbd className="ctrl-kbd">P</kbd>
      </button>

      {hasNext ? (
        <button
          onClick={onNext}
          className="walkthrough-ctrl-btn primary"
          title="Next Step (N)"
        >
          <span>Next Step</span>
          <FiArrowRight />
          <kbd className="ctrl-kbd primary">N</kbd>
        </button>
      ) : (
        <button
          onClick={onFinish}
          className="walkthrough-ctrl-btn finish"
          title="Finish Tutorial"
        >
          <FiCheck />
          <span>Finish Tutorial</span>
        </button>
      )}
    </div>
  );
};

export default TutorialControls;



import React from 'react';

const TutorialControls = ({ onNext, onBack, onClose, hasPrevious, hasNext }) => {
  const showGlobalToast = (message) => {
    try {
      const container = document.getElementById('logoutToast');
      const m = document.getElementById('logoutToastMessage');
      const icon = document.getElementById('logoutToastIcon');
      if (!container || !m) {
        // Fallback to alert if the global toast container is not available
        alert(message);
        return;
      }
      m.textContent = message || '';
      // Leave icon untouched; session API will render icons when used
      container.classList.remove('hidden', 'opacity-0');
      container.classList.add('opacity-100');
      setTimeout(() => {
        container.classList.remove('opacity-100');
        container.classList.add('opacity-0');
        setTimeout(() => container.classList.add('hidden'), 500);
      }, 4000);
    } catch (e) {
      // Graceful fallback
      try { alert(message); } catch {};
    }
  };

  const handleFinish = () => {
    // Congratulate the user via a small toast and close the tutorial UI.
    // Do NOT clear the Blockly workspace here.
    showGlobalToast("Congratulations! You've successfully completed this tutorial.");
    if (typeof onClose === 'function') onClose();
  };

  return (
    <div className="tutorial-controls">
      <button
        onClick={onBack}
        disabled={!hasPrevious}
        className="tutorial-button secondary"
      >
        Back
      </button>
      {hasNext ? (
        <button onClick={onNext} className="tutorial-button primary">
          Next
        </button>
      ) : (
        <button onClick={handleFinish} className="tutorial-button primary">
          Finish
        </button>
      )}
    </div>
  );
};

export default TutorialControls;

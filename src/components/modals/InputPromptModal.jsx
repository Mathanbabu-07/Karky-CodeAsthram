import React, { useState, useEffect } from 'react';
import { FiX, FiTerminal, FiCornerDownLeft } from 'react-icons/fi';

export default function InputPromptModal({ isOpen, prompt, onSubmit, onCancel, isSubmitting }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (isOpen) setValue('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value == null) return;
    onSubmit(value);
  };

  return (
    <div className="code-execution-modal-overlay" onClick={onCancel}>
      <div className="code-execution-modal input-prompt-modal" onClick={(e) => e.stopPropagation()}>
        {/* Terminal Top Bar */}
        <div className="code-execution-modal-header">
          <div className="terminal-header-left">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="terminal-title-group">
              <FiTerminal className="terminal-icon" />
              <span className="terminal-title">Interactive Program Input</span>
            </div>
          </div>
          <button onClick={onCancel} className="terminal-action-btn close" aria-label="Close">
            <FiX />
          </button>
        </div>

        {/* Modal Body */}
        <div className="code-execution-modal-body input-prompt-body">
          <div className="input-prompt-label">
            <span className="prompt-indicator">&gt;</span>
            <span className="prompt-text">{prompt || 'Enter value for standard input:'}</span>
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <div className="input-field-wrapper">
              <input
                type="text"
                className="terminal-input-field"
                placeholder="Type your response..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
                disabled={isSubmitting}
              />
              <span className="input-key-hint">↵ Enter</span>
            </div>

            <div className="input-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting || !value.trim()}
              >
                <FiCornerDownLeft style={{ marginRight: 6 }} /> Send Input
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { FiX, FiSend } from 'react-icons/fi';

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
      <div className="code-execution-modal" onClick={(e) => e.stopPropagation()}>
        <div className="code-execution-modal-header">
          <h2>Program Input Required</h2>
          <button onClick={onCancel} className="close-button" aria-label="Close">
            <FiX />
          </button>
        </div>
        <div className="code-execution-modal-body">
          <p style={{ marginTop: 0, color: '#8cb2d4' }}>{prompt || 'Enter input:'}</p>
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              className="input-field"
              placeholder="Type your response..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              disabled={isSubmitting}
            />
            <div className="input-actions">
              <button type="button" className="btn-secondary" onClick={onCancel} disabled={isSubmitting}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                <FiSend style={{ marginRight: 6 }} /> Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

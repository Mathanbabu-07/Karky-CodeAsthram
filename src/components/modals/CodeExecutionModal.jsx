import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

export default function CodeExecutionModal({ isOpen, onClose, output, isLoading, error }) {
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current && output) {
      // Add error handling for images
      const images = outputRef.current.querySelectorAll('img');
      images.forEach(img => {
        // Add loading class initially
        img.classList.add('output-image-loading');

        img.addEventListener('error', () => {
          img.classList.remove('output-image-loading');
          const container = img.closest('.output-file-container');
          if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'output-file-error';
            errorDiv.innerHTML = `
              <div class="output-file-note" style="border-left-color: #f44336;">
                <strong>⚠️ Image failed to load</strong><br>
                The generated image could not be displayed. Try downloading the file instead.
              </div>
            `;
            img.style.display = 'none';
            container.appendChild(errorDiv);
          }
        });

        img.addEventListener('load', () => {
          img.classList.remove('output-image-loading');
          // Remove any existing error messages when image loads successfully
          const container = img.closest('.output-file-container');
          if (container) {
            const errorDiv = container.querySelector('.output-file-error');
            if (errorDiv) {
              errorDiv.remove();
            }
          }
        });
      });
    }
  }, [output]);

  const renderOutput = () => {
    if (isLoading) {
      return (
        <div className="execution-loading">
          <div className="spinner"></div>
          <p>Running code...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="execution-error">
          <h3>Error</h3>
          <pre>{error}</pre>
          {error.includes('server is currently unavailable') && (
            <p className="server-status-note">
              <small>Note: The Python execution server may be temporarily down for maintenance.</small>
            </p>
          )}
        </div>
      );
    }

    if (!output) {
      return <p>No output</p>;
    }

    // The output is HTML string from the server
    return (
      <div
        ref={outputRef}
        className="execution-output"
        dangerouslySetInnerHTML={{ __html: output }}
      />
    );
  };

  if (!isOpen) return null;

  return (
    <div className="code-execution-modal-overlay" onClick={onClose}>
      <div className="code-execution-modal" onClick={(e) => e.stopPropagation()}>
        <div className="code-execution-modal-header">
          <h2>Code Execution Result</h2>
          <button onClick={onClose} className="close-button">
            <FiX />
          </button>
        </div>
        <div className="code-execution-modal-body">
          {renderOutput()}
        </div>
      </div>
    </div>
  );
}
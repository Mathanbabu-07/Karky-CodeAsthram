import React, { useEffect, useRef, useState } from 'react';
import { FiX, FiTerminal, FiCopy, FiCheck, FiDownload, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function CodeExecutionModal({
  isOpen,
  onClose,
  output,
  isLoading,
  error,
  language = 'python',
}) {
  const outputRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (outputRef.current && output) {
      const images = outputRef.current.querySelectorAll('img');
      images.forEach((img) => {
        img.classList.add('output-image-loading');

        img.addEventListener('error', () => {
          img.classList.remove('output-image-loading');
          const container = img.closest('.output-file-container');
          if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'output-file-error';
            errorDiv.innerHTML = `
              <div class="output-file-note" style="border-left-color: #ef4444;">
                <strong>Image rendering failed</strong><br>
                The generated graphic could not be rendered inline.
              </div>
            `;
            img.style.display = 'none';
            container.appendChild(errorDiv);
          }
        });

        img.addEventListener('load', () => {
          img.classList.remove('output-image-loading');
          const container = img.closest('.output-file-container');
          if (container) {
            const errorDiv = container.querySelector('.output-file-error');
            if (errorDiv) errorDiv.remove();
          }
        });
      });
    }
  }, [output]);

  const handleCopyOutput = () => {
    const textToCopy = error ? String(error) : (outputRef.current?.innerText || output || '');
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const langLabel = language === 'java' ? 'Java JVM' : language === 'javascript' ? 'JavaScript V8' : 'Python 3';

  return (
    <div className="code-execution-modal-overlay" onClick={onClose}>
      <div className="code-execution-modal" onClick={(e) => e.stopPropagation()}>
        {/* Terminal Header */}
        <div className="code-execution-modal-header">
          <div className="terminal-header-left">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="terminal-title-group">
              <FiTerminal className="terminal-icon" />
              <span className="terminal-title">Execution Console</span>
              <span className="terminal-lang-tag">{langLabel}</span>
            </div>
          </div>

          <div className="terminal-header-actions">
            {/* Status Pill */}
            {isLoading ? (
              <span className="status-pill running">
                <span className="pulse-dot" /> Running...
              </span>
            ) : error ? (
              <span className="status-pill error">
                <FiAlertCircle /> Runtime Error
              </span>
            ) : (
              <span className="status-pill success">
                <FiCheckCircle /> Success
              </span>
            )}

            <button
              type="button"
              className="terminal-action-btn"
              onClick={handleCopyOutput}
              title="Copy Console Output"
            >
              {copied ? <FiCheck style={{ color: '#22c55e' }} /> : <FiCopy />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="terminal-action-btn close"
              title="Close Console (Esc)"
            >
              <FiX />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div className="code-execution-modal-body">
          {isLoading ? (
            <div className="execution-loading">
              <div className="spinner" />
              <p className="loading-text">Executing {langLabel} script in isolated runtime...</p>
            </div>
          ) : error ? (
            <div className="execution-error">
              <div className="error-header">
                <FiAlertCircle />
                <span>Execution Traceback / Error</span>
              </div>
              <pre className="error-body">{error}</pre>
            </div>
          ) : !output ? (
            <div className="execution-empty">
              <p>Program executed successfully with no stdout output.</p>
            </div>
          ) : (
            <div
              ref={outputRef}
              className="execution-output"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
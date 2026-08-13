// src/components/CodePanel.jsx
import React, { useState } from 'react';
import { FiDownload, FiEye, FiEyeOff, FiClipboard, FiPlay } from 'react-icons/fi';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import '../CodePanel.css';
import AlivePythonIcon from './AlivePythonIcon';
import CodeExecutionModal from './modals/CodeExecutionModal';
import InputPromptModal from './modals/InputPromptModal';
import { executeJavaCode } from '../utils/javaRunner';
import { executeJSCode } from '../utils/jsRunner';
import axios from 'axios';

// Prefer same-origin proxy in dev to avoid CSP/CORS issues; override via VITE_API_BASE if needed
const API_BASE = import.meta?.env?.VITE_API_BASE || '/api';

// Helper to POST with fallback
// - In dev: use VITE_API_BASE if set; otherwise only '/api' (avoid remote to prevent CORS/CSP noise)
// - In prod: prefer VITE_API_BASE if set, else try remote host
async function postWithFallback(path, data) {
  let candidates;
  if (import.meta?.env?.DEV) {
    candidates = import.meta?.env?.VITE_API_BASE
      ? [import.meta.env.VITE_API_BASE]
      : ['/api'];
  } else {
    candidates = import.meta?.env?.VITE_API_BASE
      ? [import.meta.env.VITE_API_BASE]
      : ['http://localhost:5000', '/api'];
  }

  let lastError = null;
  for (const base of candidates) {
    const normalizedBase = String(base).replace(/\/$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${normalizedBase}${normalizedPath}`;
    try {
      // Optionally include credentials (cookies) for prod stickiness if enabled via env.
      // Requires backend CORS to set 'Access-Control-Allow-Credentials: true' and allow the exact origin.
      const isAbsolute = /^https?:\/\//i.test(normalizedBase);
      const forceCreds = String(import.meta?.env?.VITE_API_WITH_CREDENTIALS || '').toLowerCase() === 'true';
      return await axios.post(
        url,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: Boolean(isAbsolute && forceCreds),
        }
      );
    } catch (err) {
      lastError = err;
      const status = err?.response?.status;
      const isNetwork = !status && (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network'));
      // Retry on proxy or transient upstream issues; otherwise break early
      if (status && ![502, 503, 504].includes(status)) {
        break;
      }
      if (!status && !isNetwork) {
        break;
      }
      // else continue to next candidate
    }
  }
  throw lastError;
}

export default function CodePanel({
  code,
  isCollapsed,
  onToggleCollapse,
  onDownload,
  currentLanguage = 'python',
}) {
  const [showToast, setShowToast] = useState(false);
  const [showExecutionModal, setShowExecutionModal] = useState(false);
  const [executionOutput, setExecutionOutput] = useState('');
  const [executionError, setExecutionError] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [execId, setExecId] = useState(null);
  const [awaitingPrompt, setAwaitingPrompt] = useState('');
  const [isSubmittingInput, setIsSubmittingInput] = useState(false);

  // Helper to append output HTML fragments
  const appendOutput = (html) => {
    if (!html) return;
    setExecutionOutput(prev => prev ? `${prev}<br>${html}` : html);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      setExecutionError('No code to execute. Please generate some code first.');
      setShowExecutionModal(true);
      return;
    }

    setIsExecuting(true);
    setExecutionError('');
    setExecutionOutput('');
    setShowExecutionModal(true);

    if (currentLanguage === 'java') {
      try {
        const result = executeJavaCode(code);
        if (result.status === 'success') {
          setExecutionOutput(result.output);
        } else {
          setExecutionError(result.output);
        }
      } catch (err) {
        setExecutionError(`Java Execution Error: ${err.message}`);
      } finally {
        setIsExecuting(false);
      }
      return;
    }

    if (currentLanguage === 'javascript') {
      try {
        const result = await executeJSCode(code);
        if (result.status === 'success') {
          setExecutionOutput(result.output);
        } else {
          setExecutionError(result.output);
        }
      } catch (err) {
        setExecutionError(`JavaScript Execution Error: ${err.message}`);
      } finally {
        setIsExecuting(false);
      }
      return;
    }

    try {
      const response = await postWithFallback('/run', { code, language: currentLanguage });
      // Backward compatible: if server returns { output }, show it directly
      if (response.data && response.data.output && !response.data.status) {
        setExecutionOutput(response.data.output || 'No output');
      } else if (response.data && response.data.status) {
        // New interactive protocol
        const { status, output_html, exec_id, prompt } = response.data;
        if (output_html) setExecutionOutput(output_html);
        if (exec_id) setExecId(exec_id);
        if (status === 'await_input') {
          setAwaitingPrompt(prompt || 'Input required:');
        }
      }
    } catch (error) {
      console.error('Execution error:', error);
      let errorMessage = 'An error occurred while executing the code.';

      if (error.response) {
        // Server responded with error status
        if (error.response.status === 502) {
          errorMessage = 'Code execution server is currently unavailable. Please try again later.';
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid code or request. Please check your code and try again.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error occurred. Please try again later.';
        } else {
          errorMessage = error.response.data?.error || `Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error: Unable to connect to the code execution server.';
      } else {
        // Other error
        errorMessage = error.message || 'Unknown error occurred.';
      }

      setExecutionError(errorMessage);
    } finally {
      setIsExecuting(false);
    }
  };

  const submitUserInput = async (value) => {
    if (!execId) {
      // No active execution session
      setExecutionError('No active session to receive input. Please run the code again.');
      return;
    }
    setIsSubmittingInput(true);
    try {
      const payload = {
        exec_id: String(execId),
        // Some backends expect `input`, others `text`; send both for compatibility
        input: String(value ?? ''),
        text: String(value ?? '')
      };
  const res = await postWithFallback(`/input?exec_id=${encodeURIComponent(String(execId))}`, payload);
      const { status, output_html, prompt } = res.data || {};
      if (output_html) {
        // Append incremental output
        appendOutput(output_html);
      }
      if (status === 'await_input') {
        setAwaitingPrompt(prompt || 'Input required:');
      } else {
        // Completed or error
        setAwaitingPrompt('');
        setExecId(null);
      }
    } catch (error) {
      console.error('Input submit error:', error);
      // If backend returned rich HTML (e.g., Missing/Invalid exec_id), surface it in the modal
      const html = error?.response?.data?.output_html;
      if (html) {
        appendOutput(html);
      }
      const serverMessage = error?.response?.data?.error || error?.response?.data?.message;
      if (serverMessage) {
        setExecutionError(`Input error: ${serverMessage}`);
      } else if (error?.response?.status) {
        setExecutionError(`Input error: Server responded with ${error.response.status}.`);
      } else if (error?.request) {
        setExecutionError('Input error: Network issue while contacting the execution server.');
      } else {
        setExecutionError('Failed to send input to the execution server.');
      }
      setAwaitingPrompt('');
      setExecId(null);
    } finally {
      setIsSubmittingInput(false);
    }
  };

  return (
    <>
      <div className={`code-panel ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="code-panel-header">
          <div className="header-icon-container">
            {currentLanguage === 'java' ? (
              <img
                src="/java_logo.png"
                alt="Java Logo"
                style={{
                  width: '85px',
                  height: '85px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            ) : currentLanguage === 'javascript' ? (
              <img
                src="/js_logo.png"
                alt="JavaScript Logo"
                style={{
                  width: '85px',
                  height: '85px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            ) : (
              <AlivePythonIcon />
            )}
          </div>
          <div className="code-panel-action-pod">
            <button onClick={handleRunCode} title="Run Code" disabled={isExecuting}>
              <FiPlay />
            </button>
            <button onClick={handleCopy} title="Copy Code">
              <FiClipboard />
            </button>
            <button onClick={onDownload} title={`Download ${currentLanguage === 'java' ? 'Java' : currentLanguage === 'javascript' ? 'JavaScript' : 'Python'} Script`}>
              <FiDownload />
            </button>
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Show Code' : 'Hide Code'}
            >
              {isCollapsed ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
        </div>
        <div className="code-content-wrapper">
          {!code?.trim() && (
            <div className="code-empty-state">No code yet - build projects to see {currentLanguage} code here.</div>
          )}
          <Editor
            value={code}
            onValueChange={() => {}} // Read-only
            highlight={(code) => {
              const lang = (currentLanguage || 'python').toLowerCase();
              const grammar = languages[lang] || languages.python;
              return highlight(code, grammar, lang);
            }}
            padding={20}
            className="code-editor"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
            }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast-notification">
          Code copied to clipboard!
        </div>
      )}
      <CodeExecutionModal
        isOpen={showExecutionModal}
        onClose={() => setShowExecutionModal(false)}
        output={executionOutput}
        isLoading={isExecuting}
        error={executionError}
      />
      <InputPromptModal
        isOpen={!!awaitingPrompt}
        prompt={awaitingPrompt}
        onSubmit={submitUserInput}
        onCancel={() => { setAwaitingPrompt(''); setExecId(null); }}
        isSubmitting={isSubmittingInput}
      />
    </>
  );
}

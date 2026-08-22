// src/components/CodePanel.jsx
import React, { useState } from 'react';
import { FiDownload, FiEye, FiEyeOff, FiClipboard, FiPlay, FiCheck, FiCode } from 'react-icons/fi';
import { SiPython, SiJavascript } from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import '../CodePanel.css';
import CodeExecutionModal from './modals/CodeExecutionModal';
import InputPromptModal from './modals/InputPromptModal';
import { executeJavaCode } from '../utils/javaRunner';
import { executeJSCode } from '../utils/jsRunner';
import axios from 'axios';

// Prefer same-origin proxy in dev to avoid CSP/CORS issues; override via VITE_API_BASE if needed
const API_BASE = import.meta?.env?.VITE_API_BASE || '/api';

// Helper to POST with fallback
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
      if (status && ![502, 503, 504].includes(status)) {
        break;
      }
      if (!status && !isNetwork) {
        break;
      }
    }
  }
  throw lastError;
}

const LANGUAGE_LABELS = {
  python: {
    name: 'Python',
    label: 'script.py',
    icon: SiPython,
    colorClass: 'python',
  },
  javascript: {
    name: 'JavaScript',
    label: 'script.js',
    icon: SiJavascript,
    colorClass: 'javascript',
  },
  java: {
    name: 'Java',
    label: 'Main.java',
    icon: FaJava,
    colorClass: 'java',
  },
};

export default function CodePanel({
  code,
  isCollapsed,
  onToggleCollapse,
  onDownload,
  currentLanguage = 'python',
}) {
  const [copied, setCopied] = useState(false);
  const [showExecutionModal, setShowExecutionModal] = useState(false);
  const [executionOutput, setExecutionOutput] = useState('');
  const [executionError, setExecutionError] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [execId, setExecId] = useState(null);
  const [awaitingPrompt, setAwaitingPrompt] = useState('');
  const [isSubmittingInput, setIsSubmittingInput] = useState(false);

  const langInfo = LANGUAGE_LABELS[currentLanguage] || LANGUAGE_LABELS.python;
  const LangIcon = langInfo.icon;

  const appendOutput = (html) => {
    if (!html) return;
    setExecutionOutput(prev => prev ? `${prev}<br>${html}` : html);
  };

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      setExecutionError('No code to execute. Place blocks on the workspace first.');
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
      if (response.data && response.data.output && !response.data.status) {
        setExecutionOutput(response.data.output || 'Execution completed with no output.');
      } else if (response.data && response.data.status) {
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
        if (error.response.status === 502) {
          errorMessage = 'Python execution server is currently unavailable. Please verify backend service.';
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid syntax or request. Please inspect your block configuration.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server runtime error occurred while executing program.';
        } else {
          errorMessage = error.response.data?.error || `Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage = 'Network error: Unable to reach the execution server.';
      } else {
        errorMessage = error.message || 'Unknown execution error occurred.';
      }

      setExecutionError(errorMessage);
    } finally {
      setIsExecuting(false);
    }
  };

  const submitUserInput = async (value) => {
    if (!execId) {
      setExecutionError('No active execution session to receive input. Please run again.');
      return;
    }
    setIsSubmittingInput(true);
    try {
      const payload = {
        exec_id: String(execId),
        input: String(value ?? ''),
        text: String(value ?? ''),
      };
      const res = await postWithFallback(`/input?exec_id=${encodeURIComponent(String(execId))}`, payload);
      const { status, output_html, prompt } = res.data || {};
      if (output_html) {
        appendOutput(output_html);
      }
      if (status === 'await_input') {
        setAwaitingPrompt(prompt || 'Input required:');
      } else {
        setAwaitingPrompt('');
        setExecId(null);
      }
    } catch (error) {
      console.error('Input submit error:', error);
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
        setExecutionError('Input error: Network issue contacting execution backend.');
      } else {
        setExecutionError('Failed to send input to execution backend.');
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
        {/* Modern Header */}
        <div className="code-panel-header">
          <div className="code-panel-title-group">
            <div className={`code-panel-lang-badge ${langInfo.colorClass}`}>
              <LangIcon />
            </div>
            <div className="code-panel-meta">
              <span className="code-panel-lang-name">{langInfo.name}</span>
              <span className="code-panel-filename">{langInfo.label}</span>
            </div>
          </div>

          <div className="code-panel-action-pod">
            <button
              type="button"
              className="action-btn run"
              onClick={handleRunCode}
              title={`Execute ${langInfo.name} Code`}
              disabled={isExecuting}
            >
              <FiPlay />
            </button>
            <button
              type="button"
              className="action-btn copy"
              onClick={handleCopy}
              title="Copy Code to Clipboard"
            >
              {copied ? <FiCheck style={{ color: '#22c55e' }} /> : <FiClipboard />}
            </button>
            <button
              type="button"
              className="action-btn download"
              onClick={onDownload}
              title={`Download ${langInfo.label}`}
            >
              <FiDownload />
            </button>
            <button
              type="button"
              className="action-btn toggle"
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Expand Code View' : 'Hide Code View'}
            >
              {isCollapsed ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
        </div>

        {/* Code Body */}
        <div className="code-content-wrapper">
          {!code?.trim() ? (
            <div className="code-empty-state">
              <div className="empty-state-icon">
                <FiCode />
              </div>
              <h4 className="empty-state-title">No Blocks Placed</h4>
              <p className="empty-state-desc">
                Drag blocks from the toolbox onto the canvas to generate live {langInfo.name} code.
              </p>
            </div>
          ) : (
            <Editor
              value={code}
              onValueChange={() => {}}
              highlight={(code) => {
                const lang = (currentLanguage || 'python').toLowerCase();
                const grammar = languages[lang] || languages.python;
                return highlight(code, grammar, lang);
              }}
              padding={16}
              className="code-editor"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 13.5,
              }}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <CodeExecutionModal
        isOpen={showExecutionModal}
        onClose={() => setShowExecutionModal(false)}
        output={executionOutput}
        isLoading={isExecuting}
        error={executionError}
        language={currentLanguage}
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

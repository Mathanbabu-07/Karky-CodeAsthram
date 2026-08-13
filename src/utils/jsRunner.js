/**
 * Client-side JavaScript execution engine for CodeAsthram
 * Runs user code in a sandboxed AsyncFunction scope and captures console output and error diagnostics.
 */

export async function executeJSCode(code) {
  if (!code || !code.trim()) {
    return {
      status: 'error',
      output: 'No JavaScript code to execute.'
    };
  }

  const outputLogs = [];
  
  // Custom console object to intercept logs
  const customConsole = {
    log: (...args) => {
      const formatted = args.map(formatLogArg).join(' ');
      outputLogs.push(escapeHtml(formatted));
    },
    error: (...args) => {
      const formatted = args.map(formatLogArg).join(' ');
      outputLogs.push(`<span style="color: #ef4444;">[ERROR] ${escapeHtml(formatted)}</span>`);
    },
    warn: (...args) => {
      const formatted = args.map(formatLogArg).join(' ');
      outputLogs.push(`<span style="color: #f59e0b;">[WARN] ${escapeHtml(formatted)}</span>`);
    },
    info: (...args) => {
      const formatted = args.map(formatLogArg).join(' ');
      outputLogs.push(`<span style="color: #3b82f6;">[INFO] ${escapeHtml(formatted)}</span>`);
    }
  };

  // Mock prompt function
  const customPrompt = (msg) => {
    if (typeof window !== 'undefined' && window.prompt) {
      return window.prompt(msg);
    }
    return '';
  };

  // Mock alert function
  const customAlert = (msg) => {
    outputLogs.push(`<span style="color: #10b981;">[ALERT] ${escapeHtml(String(msg))}</span>`);
  };

  try {
    // Get AsyncFunction constructor for top-level await and async execution support
    const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
    const runner = new AsyncFunction(
      'console',
      'prompt',
      'alert',
      `"use strict";\n${code}`
    );

    const startTime = performance.now();
    await runner(customConsole, customPrompt, customAlert);
    const endTime = performance.now();

    const outputText = outputLogs.length > 0
      ? outputLogs.join('<br>')
      : 'Program executed successfully with no output.';

    return {
      status: 'success',
      output: outputText,
      executionTime: (endTime - startTime).toFixed(2)
    };
  } catch (err) {
    const errorText = `JavaScript Execution Error: ${err.name}: ${err.message}`;
    return {
      status: 'error',
      output: outputTextWithLogs(outputLogs, errorText),
      error: `${err.name}: ${err.message}`
    };
  }
}

function formatLogArg(arg) {
  if (arg === null) return 'null';
  if (arg === undefined) return 'undefined';
  if (typeof arg === 'object') {
    try {
      return JSON.stringify(arg, null, 2);
    } catch (e) {
      return String(arg);
    }
  }
  return String(arg);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function outputTextWithLogs(logs, errorText) {
  const formattedError = `<span style="color: #ef4444; font-weight: bold;">${escapeHtml(errorText)}</span>`;
  if (logs.length > 0) {
    return `${logs.join('<br>')}<br>${formattedError}`;
  }
  return formattedError;
}

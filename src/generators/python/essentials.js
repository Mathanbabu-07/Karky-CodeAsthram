// src/generators/python/essentials.js
import { pythonGenerator as Python } from 'blockly/python';
// Simplified imports
Python.forBlock['essentials_import_simple'] = function(block) {
  const mod = block.getFieldValue('MODULE');
  if (mod) {
    Python.addImport(mod);
  }
  return '';
};

// Scope keywords: global/nonlocal
Python.forBlock['essentials_scope_keyword'] = function(block) {
  const kind = block.getFieldValue('KIND') || 'global';
  const name = block.getFieldValue('NAME') || 'x';
  return `${kind} ${name}\n`;
};

// pass statement
Python.forBlock['control_pass'] = function(block) {
  return 'pass\n';
};
Python.forBlock['control_pass_simple'] = function(block) {
  return 'pass\n';
};

// while True / while <expr>
Python.forBlock['control_while_true'] = function(block) {
  const mode = block.getFieldValue('COND_MODE');
  const cond = mode === 'EXPR' ? (Python.valueToCode(block, 'COND', Python.ORDER_NONE) || 'True') : 'True';
  const body = Python.statementToCode(block, 'DO') || 'pass';
  return `while ${cond}:\n${pythonGenerator.prefixLines(body, pythonGenerator.INDENT)}\n`;
};
Python.forBlock['control_while_true_inline'] = function(block) {
  const mode = block.getFieldValue('COND_MODE');
  const cond = mode === 'EXPR' ? (Python.valueToCode(block, 'COND', Python.ORDER_NONE) || 'True') : 'True';
  const body = Python.statementToCode(block, 'DO') || 'pass';
  return `while ${cond}:\n${pythonGenerator.prefixLines(body, pythonGenerator.INDENT)}\n`;
};

Python.forBlock['essentials_function_def'] = function(block) {
  const functionName = block.getFieldValue('NAME');
  const params = block.arguments_ || [];
  const branch = Python.statementToCode(block, 'DO');
  const returnValue = Python.valueToCode(block, 'RETURN', Python.ORDER_NONE) || '';

  let code = `def ${functionName}(${params.join(', ')}):\n`;
  code += branch || '  pass\n';
  if (returnValue) {
    code += `  return ${returnValue}\n`;
  }

  return code;
};

// separate return statement
Python.forBlock['control_return'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE);
  if (value) return `return ${value}\n`;
  return 'return\n';
};

Python.forBlock['tuples_count'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_MEMBER) || '()';
  const code = `${tuple}.count(${value})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

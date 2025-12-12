// src/generators/python/re.js
import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['re_compile'] = function(block) {
  Python.addImport('re');
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  return [`re.compile(${pattern})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['re_search'] = function(block) {
  Python.addImport('re');
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const string = Python.valueToCode(block, 'STRING', Python.ORDER_NONE) || "''";
  return [`re.search(${pattern}, ${string})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['re_match'] = function(block) {
  Python.addImport('re');
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const string = Python.valueToCode(block, 'STRING', Python.ORDER_NONE) || "''";
  return [`re.match(${pattern}, ${string})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['re_findall'] = function(block) {
  Python.addImport('re');
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const string = Python.valueToCode(block, 'STRING', Python.ORDER_NONE) || "''";
  return [`re.findall(${pattern}, ${string})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['re_sub'] = function(block) {
  Python.addImport('re');
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const repl = Python.valueToCode(block, 'REPL', Python.ORDER_NONE) || "''";
  const string = Python.valueToCode(block, 'STRING', Python.ORDER_NONE) || "''";
  return [`re.sub(${pattern}, ${repl}, ${string})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['re_split'] = function(block) {
  Python.addImport('re');
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const string = Python.valueToCode(block, 'STRING', Python.ORDER_NONE) || "''";
  return [`re.split(${pattern}, ${string})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['re_escape'] = function(block) {
  Python.addImport('re');
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  return [`re.escape(${pattern})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['re_match_group'] = function(block) {
  const match = Python.valueToCode(block, 'MATCH', Python.ORDER_MEMBER) || 'None';
  const group = Python.valueToCode(block, 'GROUP', Python.ORDER_NONE) || '0';
  return [`${match}.group(${group})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['re_match_groups'] = function(block) {
  const match = Python.valueToCode(block, 'MATCH', Python.ORDER_MEMBER) || 'None';
  return [`${match}.groups()`, Python.ORDER_FUNCTION_CALL];
};
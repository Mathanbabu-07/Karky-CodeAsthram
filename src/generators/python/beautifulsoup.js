// src/generators/python/beautifulsoup.js
import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['beautifulsoup_parse_html'] = function(block) {
  Python.addImport('from python import blocks_runtime');
  const html_text = Python.valueToCode(block, 'HTML_TEXT', Python.ORDER_ATOMIC) || "''";
  const parser = block.getFieldValue('PARSER');
  return [`blocks_runtime.beautifulsoup_parse_html(${html_text}, '${parser}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['beautifulsoup_find'] = function(block) {
  Python.addImport('from python import blocks_runtime');
  const soup = Python.valueToCode(block, 'SOUP', Python.ORDER_ATOMIC) || 'None';
  const tag = Python.valueToCode(block, 'TAG', Python.ORDER_ATOMIC) || "''";
  const attrs = Python.valueToCode(block, 'ATTRS', Python.ORDER_ATOMIC) || '{}';
  return [`blocks_runtime.beautifulsoup_find(${soup}, ${tag}, ${attrs})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['beautifulsoup_find_all'] = function(block) {
  Python.addImport('from python import blocks_runtime');
  const soup = Python.valueToCode(block, 'SOUP', Python.ORDER_ATOMIC) || 'None';
  const tag = Python.valueToCode(block, 'TAG', Python.ORDER_ATOMIC) || "''";
  const attrs = Python.valueToCode(block, 'ATTRS', Python.ORDER_ATOMIC) || '{}';
  const limit = Python.valueToCode(block, 'LIMIT', Python.ORDER_ATOMIC) || '0';
  return [`blocks_runtime.beautifulsoup_find_all(${soup}, ${tag}, ${attrs}, ${limit})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['beautifulsoup_get_text'] = function(block) {
  Python.addImport('from python import blocks_runtime');
  const element = Python.valueToCode(block, 'ELEMENT', Python.ORDER_ATOMIC) || 'None';
  return [`blocks_runtime.beautifulsoup_get_text(${element})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['beautifulsoup_get_attribute'] = function(block) {
  Python.addImport('from python import blocks_runtime');
  const element = Python.valueToCode(block, 'ELEMENT', Python.ORDER_ATOMIC) || 'None';
  const attribute = Python.valueToCode(block, 'ATTRIBUTE', Python.ORDER_ATOMIC) || "''";
  return [`blocks_runtime.beautifulsoup_get_attribute(${element}, ${attribute})`, Python.ORDER_FUNCTION_CALL];
};
// src/generators/python/beautifulsoup.js
import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['beautifulsoup_parse_html'] = function (block) {
  Python.addImport('from bs4 import BeautifulSoup');
  const html_text = Python.valueToCode(block, 'HTML_TEXT', Python.ORDER_ATOMIC) || "''";
  const parser = block.getFieldValue('PARSER');
  return [`BeautifulSoup(${html_text}, '${parser}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['beautifulsoup_find'] = function (block) {
  const soup = Python.valueToCode(block, 'SOUP', Python.ORDER_MEMBER) || 'None';
  const tag = Python.valueToCode(block, 'TAG', Python.ORDER_ATOMIC) || "''";
  const attrs = Python.valueToCode(block, 'ATTRS', Python.ORDER_ATOMIC) || '{}';
  return [`${soup}.find(${tag}, ${attrs})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['beautifulsoup_find_all'] = function (block) {
  const soup = Python.valueToCode(block, 'SOUP', Python.ORDER_MEMBER) || 'None';
  const tag = Python.valueToCode(block, 'TAG', Python.ORDER_ATOMIC) || "''";
  const attrs = Python.valueToCode(block, 'ATTRS', Python.ORDER_ATOMIC) || '{}';
  const limit = Python.valueToCode(block, 'LIMIT', Python.ORDER_ATOMIC) || 'None';
  return [`${soup}.find_all(${tag}, ${attrs}, limit=${limit})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['beautifulsoup_get_text'] = function (block) {
  const element = Python.valueToCode(block, 'ELEMENT', Python.ORDER_MEMBER) || 'None';
  return [`${element}.get_text()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['beautifulsoup_get_attribute'] = function (block) {
  const element = Python.valueToCode(block, 'ELEMENT', Python.ORDER_MEMBER) || 'None';
  const attribute = Python.valueToCode(block, 'ATTRIBUTE', Python.ORDER_ATOMIC) || "''";
  return [`${element}.get(${attribute})`, Python.ORDER_FUNCTION_CALL];
};
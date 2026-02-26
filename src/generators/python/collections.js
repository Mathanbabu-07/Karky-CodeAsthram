// src/generators/python/collections.js
import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['collections_counter_create'] = function (block) {
  Python.addImport('from collections import Counter');
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  return [`Counter(${iterable})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['collections_deque_create'] = function (block) {
  Python.addImport('from collections import deque');
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  return [`deque(${iterable})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['collections_deque_append'] = function (block) {
  const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
  const deque = Python.valueToCode(block, 'DEQUE', Python.ORDER_MEMBER) || 'None';
  return `${deque}.append(${item})\n`;
};

Python.forBlock['collections_deque_appendleft'] = function (block) {
  const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
  const deque = Python.valueToCode(block, 'DEQUE', Python.ORDER_MEMBER) || 'None';
  return `${deque}.appendleft(${item})\n`;
};

Python.forBlock['collections_deque_pop'] = function (block) {
  const deque = Python.valueToCode(block, 'DEQUE', Python.ORDER_MEMBER) || 'None';
  return [`${deque}.pop()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['collections_deque_popleft'] = function (block) {
  const deque = Python.valueToCode(block, 'DEQUE', Python.ORDER_MEMBER) || 'None';
  return [`${deque}.popleft()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['collections_defaultdict_create'] = function (block) {
  Python.addImport('from collections import defaultdict');
  const factory = Python.valueToCode(block, 'FACTORY', Python.ORDER_NONE) || 'None';
  return [`defaultdict(${factory})`, Python.ORDER_FUNCTION_CALL];
};
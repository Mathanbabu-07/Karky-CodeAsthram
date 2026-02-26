// src/generators/python/itertools.js
import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['itertools_chain'] = function(block) {
  Python.addImport('import itertools');
  const iterables = Python.valueToCode(block, 'ITERABLES', Python.ORDER_NONE) || '[]';
  const code = `itertools.chain(*${iterables})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['itertools_permutations'] = function(block) {
  Python.addImport('import itertools');
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  const r = Python.valueToCode(block, 'R', Python.ORDER_NONE) || 'None';
  const code = `itertools.permutations(${iterable}, r=${r})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['itertools_combinations'] = function(block) {
  Python.addImport('import itertools');
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  const r = Python.valueToCode(block, 'R', Python.ORDER_NONE) || 'None';
  const code = `itertools.combinations(${iterable}, ${r})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['itertools_product'] = function(block) {
  Python.addImport('import itertools');
  const iterables = Python.valueToCode(block, 'ITERABLES', Python.ORDER_NONE) || '[]';
  const code = `itertools.product(*${iterables})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['itertools_count'] = function(block) {
  Python.addImport('import itertools');
  const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || '0';
  const step = Python.valueToCode(block, 'STEP', Python.ORDER_NONE) || '1';
  const code = `itertools.count(start=${start}, step=${step})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['itertools_cycle'] = function(block) {
  Python.addImport('import itertools');
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  const code = `itertools.cycle(${iterable})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['itertools_repeat'] = function(block) {
  Python.addImport('import itertools');
  const object = Python.valueToCode(block, 'OBJECT', Python.ORDER_NONE) || 'None';
  const times = Python.valueToCode(block, 'TIMES', Python.ORDER_NONE);
  let code;
  if (times) {
    code = `itertools.repeat(${object}, ${times})`;
  } else {
    code = `itertools.repeat(${object})`;
  }
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['itertools_takewhile'] = function(block) {
  Python.addImport('import itertools');
  const predicate = Python.valueToCode(block, 'PREDICATE', Python.ORDER_NONE) || 'None';
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  const code = `itertools.takewhile(${predicate}, ${iterable})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['itertools_dropwhile'] = function(block) {
  Python.addImport('import itertools');
  const predicate = Python.valueToCode(block, 'PREDICATE', Python.ORDER_NONE) || 'None';
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  const code = `itertools.dropwhile(${predicate}, ${iterable})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['itertools_filterfalse'] = function(block) {
  Python.addImport('import itertools');
  const predicate = Python.valueToCode(block, 'PREDICATE', Python.ORDER_NONE) || 'None';
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  const code = `itertools.filterfalse(${predicate}, ${iterable})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};
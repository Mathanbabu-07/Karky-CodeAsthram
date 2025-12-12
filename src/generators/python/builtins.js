import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['builtins_eval'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || '""';
  const code = `eval(${expr})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['essentials_var_set'] = function (block) {
  const varName = Python.nameDB_.getDistinctName(block.getFieldValue('VAR'), 'VARIABLE');
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC) || 'None';
  return `${varName} = ${value}\n`;
};

Python.forBlock['essentials_var_get'] = function (block) {
  const varName = Python.nameDB_.getDistinctName(block.getFieldValue('VAR'), 'VARIABLE');
  return [varName, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_var_undefined'] = function (block) {
  return ['None', Python.ORDER_ATOMIC];
};

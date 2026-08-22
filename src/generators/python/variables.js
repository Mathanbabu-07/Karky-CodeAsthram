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

Python.forBlock['variables_cast'] = function (block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || "''";
  const type = block.getFieldValue('TYPE') || 'str';
  let func = 'str';
  if (type === 'int') func = 'int';
  else if (type === 'float') func = 'float';
  else if (type === 'bool') func = 'bool';
  else if (type === 'str') func = 'str';
  return [`${func}(${value})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['variables_get_with_default'] = function (block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const defVal = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
  return [`(${value} if ${value} is not None else ${defVal})`, Python.ORDER_CONDITIONAL];
};


import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['essentials_var_set'] = function(block) {
  const varName = Python.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  return `${varName} = ${value}\n`;
};

Python.forBlock['essentials_var_get'] = function(block) {
  const varName = Python.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
  return [varName, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_var_undefined'] = function(block) {
  return ['None', Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_is_instance'] = function(block) {
  const obj = Python.valueToCode(block, 'OBJ', Python.ORDER_NONE) || 'None';
  const type = Python.valueToCode(block, 'TYPE', Python.ORDER_NONE) || 'object';
  const code = `isinstance(${obj}, ${type})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_type_of'] = function(block) {
  const obj = Python.valueToCode(block, 'OBJ', Python.ORDER_NONE) || 'None';
  const code = `type(${obj})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_cast'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const type = block.getFieldValue('TYPE');
  const code = `${type}(${value})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_default_if_none'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const default_ = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
  const code = `${default_} if ${value} is None else ${value}`;
  return [code, Python.ORDER_CONDITIONAL];
};

Python.forBlock['essentials_type_as_string'] = function(block) {
  const obj = Python.valueToCode(block, 'OBJ', Python.ORDER_NONE) || 'None';
  const code = `type(${obj}).__name__`;
  return [code, Python.ORDER_MEMBER];
};

Python.forBlock['essentials_is_none'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const code = `${value} is None`;
  return [code, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_is_not_none'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const code = `${value} is not None`;
  return [code, Python.ORDER_RELATIONAL];
};
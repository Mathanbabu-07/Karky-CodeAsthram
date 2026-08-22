import { javascriptGenerator } from 'blockly/javascript';

// Sub-phase 3.3: JavaScript Logic & Comparison Operators Generators

javascriptGenerator.forBlock['js_logic_compare'] = function(block, generator) {
  const rawOp = block.getFieldValue('OP');
  const opMap = {
    'EQ': '===',
    'NEQ': '!==',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>=',
    '==': '==',
    '===': '===',
    '!=': '!=',
    '!==': '!==',
    '<': '<',
    '<=': '<=',
    '>': '>',
    '>=': '>='
  };
  const op = opMap[rawOp] || rawOp || '===';
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || '0';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '0';
  return [`${a} ${op} ${b}`, generator.ORDER_RELATIONAL];
};

javascriptGenerator.forBlock['js_logic_operation'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || 'false';
  const op = block.getFieldValue('OP') || '&&';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || 'false';
  const order = op === '&&' ? generator.ORDER_LOGICAL_AND : generator.ORDER_LOGICAL_OR;
  return [`${a} ${op} ${b}`, order];
};

javascriptGenerator.forBlock['js_nullish_coalescing'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || 'null';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '""';
  return [`${a} ?? ${b}`, generator.ORDER_LOGICAL_OR];
};

javascriptGenerator.forBlock['js_optional_chaining'] = function(block, generator) {
  const obj = generator.valueToCode(block, 'OBJ', generator.ORDER_MEMBER) || 'obj';
  const prop = block.getFieldValue('PROP') || 'prop';
  return [`${obj}?.${prop}`, generator.ORDER_MEMBER];
};

javascriptGenerator.forBlock['logic_compare'] = function(block, generator) {
  const rawOp = block.getFieldValue('OP');
  const opMap = {
    'EQ': '===',
    'NEQ': '!==',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>=',
    '==': '==',
    '===': '===',
    '!=': '!=',
    '!==': '!==',
    '<': '<',
    '<=': '<=',
    '>': '>',
    '>=': '>='
  };
  const op = opMap[rawOp] || rawOp || '===';
  const argument0 = generator.valueToCode(block, 'A', generator.ORDER_RELATIONAL) || '0';
  const argument1 = generator.valueToCode(block, 'B', generator.ORDER_RELATIONAL) || '0';
  return [`${argument0} ${op} ${argument1}`, generator.ORDER_RELATIONAL];
};

javascriptGenerator.forBlock['logic_operation'] = function(block, generator) {
  const rawOp = block.getFieldValue('OP');
  const op = (rawOp === 'AND' || rawOp === '&&') ? '&&' : '||';
  const order = (op === '&&') ? generator.ORDER_LOGICAL_AND : generator.ORDER_LOGICAL_OR;
  const argument0 = generator.valueToCode(block, 'A', order) || 'false';
  const argument1 = generator.valueToCode(block, 'B', order) || 'false';
  return [`${argument0} ${op} ${argument1}`, order];
};

javascriptGenerator.forBlock['logic_negate'] = function(block, generator) {
  const argument0 = generator.valueToCode(block, 'BOOL', generator.ORDER_UNARY_NEGATION) || 'true';
  return ['!' + argument0, generator.ORDER_UNARY_NEGATION];
};

javascriptGenerator.forBlock['logic_boolean'] = function(block) {
  return [(block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false', javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['logic_null'] = function() {
  return ['null', javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['logic_ternary'] = function(block, generator) {
  const valueIf = generator.valueToCode(block, 'IF', generator.ORDER_CONDITIONAL) || 'false';
  const valueThen = generator.valueToCode(block, 'THEN', generator.ORDER_CONDITIONAL) || 'null';
  const valueElse = generator.valueToCode(block, 'ELSE', generator.ORDER_CONDITIONAL) || 'null';
  return [`${valueIf} ? ${valueThen} : ${valueElse}`, generator.ORDER_CONDITIONAL];
};

javascriptGenerator.forBlock['essentials_num_compare'] = function(block, generator) {
  const rawOp = block.getFieldValue('OP');
  const opMap = {
    'EQ': '===',
    'NEQ': '!==',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>=',
    '==': '==',
    '===': '===',
    '!=': '!=',
    '!==': '!==',
    '<': '<',
    '<=': '<=',
    '>': '>',
    '>=': '>='
  };
  const op = opMap[rawOp] || rawOp || '===';
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || '0';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '0';
  return [`${a} ${op} ${b}`, generator.ORDER_RELATIONAL];
};

javascriptGenerator.forBlock['essentials_bool_true'] = function() {
  return ['true', javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_bool_false'] = function() {
  return ['false', javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_logic_and'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_LOGICAL_AND) || 'false';
  const b = generator.valueToCode(block, 'B', generator.ORDER_LOGICAL_AND) || 'false';
  return [`${a} && ${b}`, generator.ORDER_LOGICAL_AND];
};

javascriptGenerator.forBlock['essentials_logic_or'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_LOGICAL_OR) || 'false';
  const b = generator.valueToCode(block, 'B', generator.ORDER_LOGICAL_OR) || 'false';
  return [`${a} || ${b}`, generator.ORDER_LOGICAL_OR];
};

javascriptGenerator.forBlock['essentials_logic_not'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_UNARY_NEGATION) || 'false';
  return [`!${a}`, generator.ORDER_UNARY_NEGATION];
};

javascriptGenerator.forBlock['essentials_compare'] = function(block, generator) {
  const rawOp = block.getFieldValue('OP');
  const opMap = {
    'EQ': '===',
    'NEQ': '!==',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  const op = opMap[rawOp] || rawOp || '===';
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || '0';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '0';
  return [`${a} ${op} ${b}`, generator.ORDER_RELATIONAL];
};

javascriptGenerator.forBlock['essentials_in_operator'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || 'item';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || 'container';
  return [`(${b} && typeof ${b}.includes === 'function' ? ${b}.includes(${a}) : ${a} in ${b})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_not_in_operator'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || 'item';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || 'container';
  return [`!(${b} && typeof ${b}.includes === 'function' ? ${b}.includes(${a}) : ${a} in ${b})`, generator.ORDER_LOGICAL_NOT];
};

javascriptGenerator.forBlock['essentials_ternary'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_CONDITIONAL) || 'null';
  const cond = generator.valueToCode(block, 'CONDITION', generator.ORDER_CONDITIONAL) || 'false';
  const b = generator.valueToCode(block, 'B', generator.ORDER_CONDITIONAL) || 'null';
  return [`${cond} ? ${a} : ${b}`, generator.ORDER_CONDITIONAL];
};

javascriptGenerator.forBlock['essentials_assert'] = function(block, generator) {
  const cond = (block.getInput('TEST') ? generator.valueToCode(block, 'TEST', generator.ORDER_NONE) : (block.getInput('CONDITION') ? generator.valueToCode(block, 'CONDITION', generator.ORDER_NONE) : '')) || 'true';
  const msg = (block.getInput('MESSAGE') ? generator.valueToCode(block, 'MESSAGE', generator.ORDER_NONE) : (block.getInput('MSG') ? generator.valueToCode(block, 'MSG', generator.ORDER_NONE) : '')) || '"Assertion failed"';
  return `console.assert(${cond}, ${msg});\n`;
};

import { javascriptGenerator } from 'blockly/javascript';

// Sub-phase 6.3: JavaScript Objects & JSON Generators

javascriptGenerator.forBlock['js_object_create'] = function(block) {
  const jsonStr = block.getFieldValue('JSON_STR') || '';
  return [`{ ${jsonStr} }`, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['js_object_get_set'] = function(block, generator) {
  const obj = generator.valueToCode(block, 'OBJ', generator.ORDER_MEMBER) || 'obj';
  const prop = block.getFieldValue('PROP') || 'prop';
  return [`${obj}.${prop}`, generator.ORDER_MEMBER];
};

javascriptGenerator.forBlock['js_json_stringify'] = function(block, generator) {
  const obj = generator.valueToCode(block, 'OBJ', generator.ORDER_NONE) || '{}';
  return [`JSON.stringify(${obj})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_json_parse'] = function(block, generator) {
  const str = generator.valueToCode(block, 'STR', generator.ORDER_NONE) || '"{}"';
  return [`JSON.parse(${str})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_dict_create'] = function(block, generator) {
  const pairs = generator.valueToCode(block, 'PAIRS', generator.ORDER_NONE) || '';
  return [`{ ${pairs} }`, generator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_dict_statements'] = function(block, generator) {
  const dict = generator.valueToCode(block, 'DICT', generator.ORDER_MEMBER) || 'obj';
  const key = generator.valueToCode(block, 'KEY', generator.ORDER_NONE) || '""';
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_ASSIGNMENT) || 'null';
  return `${dict}[${key}] = ${val};\n`;
};

javascriptGenerator.forBlock['essentials_dict_expressions'] = function(block, generator) {
  const dict = generator.valueToCode(block, 'DICT', generator.ORDER_MEMBER) || 'obj';
  const key = generator.valueToCode(block, 'KEY', generator.ORDER_NONE) || '""';
  return [`${dict}[${key}]`, generator.ORDER_MEMBER];
};

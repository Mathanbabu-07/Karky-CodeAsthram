import { javascriptGenerator } from 'blockly/javascript';

// JavaScript Objects & JSON & Dictionary Generators

javascriptGenerator.forBlock['js_object_create'] = function(block, generator) {
  const jsonStr = block.getFieldValue('JSON_STR') || '';
  const gen = generator || javascriptGenerator;
  return [`{ ${jsonStr} }`, gen.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['js_object_get_set'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const obj = (block.getInput('OBJ') ? gen.valueToCode(block, 'OBJ', gen.ORDER_MEMBER) : '') || 'obj';
  const prop = block.getFieldValue('PROP') || 'prop';
  return [`${obj}.${prop}`, gen.ORDER_MEMBER];
};

javascriptGenerator.forBlock['js_json_stringify'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const obj = (block.getInput('OBJ') ? gen.valueToCode(block, 'OBJ', gen.ORDER_NONE) : '') || '{}';
  return [`JSON.stringify(${obj})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_json_parse'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const str = (block.getInput('STR') ? gen.valueToCode(block, 'STR', gen.ORDER_NONE) : '') || '"{}"';
  return [`JSON.parse(${str})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_dict_create'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const pairs = [];
  const count = typeof block.itemCount_ !== 'undefined' ? block.itemCount_ : (block.inputList ? Math.floor(block.inputList.length / 2) : 0);
  
  for (let i = 0; i < count || block.getInput('KEY' + i); i++) {
    if (!block.getInput('KEY' + i) && !block.getInput('VALUE' + i)) break;
    const key = block.getInput('KEY' + i) ? gen.valueToCode(block, 'KEY' + i, gen.ORDER_NONE) : null;
    const value = block.getInput('VALUE' + i) ? gen.valueToCode(block, 'VALUE' + i, gen.ORDER_NONE) : null;
    if (key && value) {
      pairs.push(`${key}: ${value}`);
    }
  }
  const code = '{' + (pairs.length > 0 ? ' ' + pairs.join(', ') + ' ' : '') + '}';
  return [code, gen.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_dict_statements'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const dict = (block.getInput('DICT') ? gen.valueToCode(block, 'DICT', gen.ORDER_MEMBER) : '') || 'obj';
  const key = (block.getInput('KEY') ? gen.valueToCode(block, 'KEY', gen.ORDER_NONE) : '') || '""';
  const val = (block.getInput('VALUE') ? gen.valueToCode(block, 'VALUE', gen.ORDER_ASSIGNMENT) : '') || 'null';
  return `${dict}[${key}] = ${val};\n`;
};

javascriptGenerator.forBlock['essentials_dict_expressions'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const dict = (block.getInput('DICT') ? gen.valueToCode(block, 'DICT', gen.ORDER_MEMBER) : '') || 'obj';
  const key = (block.getInput('KEY') ? gen.valueToCode(block, 'KEY', gen.ORDER_NONE) : '') || '""';
  return [`${dict}[${key}]`, gen.ORDER_MEMBER];
};

javascriptGenerator.forBlock['essentials_dict_update'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const dict = (block.getInput('DICT') ? gen.valueToCode(block, 'DICT', gen.ORDER_MEMBER) : '') || 'obj';
  const other = (block.getInput('OTHER') ? gen.valueToCode(block, 'OTHER', gen.ORDER_NONE) : '') || '{}';
  return `Object.assign(${dict}, ${other});\n`;
};

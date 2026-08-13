import { javascriptGenerator } from 'blockly/javascript';

// Sub-phase 6.4: ES6 Map & Set Collections Generators

javascriptGenerator.forBlock['js_map_create'] = function() {
  return ['new Map()', javascriptGenerator.ORDER_NEW];
};

javascriptGenerator.forBlock['js_map_set_get'] = function(block, generator) {
  const map = generator.valueToCode(block, 'MAP', generator.ORDER_MEMBER) || 'map';
  const action = block.getFieldValue('ACTION') || 'set';
  const key = generator.valueToCode(block, 'KEY', generator.ORDER_NONE) || '';
  const val = generator.valueToCode(block, 'VAL', generator.ORDER_NONE) || '';
  const args = action === 'set' ? `${key}, ${val}` : key;
  return [`${map}.${action}(${args})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_set_create'] = function() {
  return ['new Set()', javascriptGenerator.ORDER_NEW];
};

javascriptGenerator.forBlock['js_set_add_has'] = function(block, generator) {
  const set = generator.valueToCode(block, 'SET', generator.ORDER_MEMBER) || 'set';
  const action = block.getFieldValue('ACTION') || 'add';
  const val = generator.valueToCode(block, 'VAL', generator.ORDER_NONE) || '';
  return [`${set}.${action}(${val})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['lists_create_with'] = function(block, generator) {
  const elements = [];
  const count = block.itemCount_ !== undefined ? block.itemCount_ : (block.inputList ? block.inputList.length : 0);
  for (let i = 0; i < count; i++) {
    let element = '';
    if (block.getInput('ADD' + i)) {
      element = generator.valueToCode(block, 'ADD' + i, generator.ORDER_NONE);
    } else if (block.getInput('ITEM' + i)) {
      element = generator.valueToCode(block, 'ITEM' + i, generator.ORDER_NONE);
    }
    if (element !== null && element !== '') {
      elements.push(element);
    }
  }
  return [`[${elements.join(', ')}]`, generator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_list_create'] = function(block, generator) {
  const items = generator.valueToCode(block, 'ITEMS', generator.ORDER_NONE) || '';
  return [`[${items}]`, generator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_list_length'] = function(block, generator) {
  const list = generator.valueToCode(block, 'LIST', generator.ORDER_MEMBER) || '[]';
  return [`${list}.length`, generator.ORDER_MEMBER];
};

javascriptGenerator.forBlock['essentials_list_get'] = function(block, generator) {
  const list = generator.valueToCode(block, 'LIST', generator.ORDER_MEMBER) || '[]';
  const index = generator.valueToCode(block, 'INDEX', generator.ORDER_NONE) || '0';
  return [`${list}[${index}]`, generator.ORDER_MEMBER];
};

javascriptGenerator.forBlock['essentials_list_set'] = function(block, generator) {
  const list = generator.valueToCode(block, 'LIST', generator.ORDER_MEMBER) || '[]';
  const index = generator.valueToCode(block, 'INDEX', generator.ORDER_NONE) || '0';
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_ASSIGNMENT) || 'null';
  return `${list}[${index}] = ${val};\n`;
};

javascriptGenerator.forBlock['essentials_set_create'] = function() {
  return ['new Set()', javascriptGenerator.ORDER_NEW];
};

javascriptGenerator.forBlock['essentials_set_add'] = function(block, generator) {
  const set = generator.valueToCode(block, 'SET', generator.ORDER_MEMBER) || 'set';
  const item = generator.valueToCode(block, 'ITEM', generator.ORDER_NONE) || 'null';
  return `${set}.add(${item});\n`;
};

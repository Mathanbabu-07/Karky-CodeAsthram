import { javascriptGenerator } from 'blockly/javascript';

// Safe helper to extract input values
function getValue(generator, block, order, ...names) {
  for (const name of names) {
    if (block.getInput(name)) {
      return generator.valueToCode(block, name, order) || '';
    }
  }
  return '';
}

// Sub-phase 6.4: ES6 Map & Set Collections Generators

javascriptGenerator.forBlock['js_map_create'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  return ['new Map()', gen.ORDER_FUNCTION_CALL || gen.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['js_map_set_get'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const map = getValue(gen, block, gen.ORDER_MEMBER, 'MAP', 'OBJ') || 'map';
  const action = block.getFieldValue('ACTION') || 'set';
  const key = getValue(gen, block, gen.ORDER_NONE, 'KEY') || '""';
  const val = getValue(gen, block, gen.ORDER_NONE, 'VAL', 'VALUE') || 'null';
  const args = action === 'set' ? `${key}, ${val}` : key;
  return [`${map}.${action}(${args})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_set_create'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  return ['new Set()', gen.ORDER_FUNCTION_CALL || gen.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['js_set_add_has'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set = getValue(gen, block, gen.ORDER_MEMBER, 'SET') || 'set';
  const action = block.getFieldValue('ACTION') || 'add';
  const val = getValue(gen, block, gen.ORDER_NONE, 'VAL', 'ITEM', 'VALUE') || 'null';
  return [`${set}.${action}(${val})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['lists_create_with'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const elements = [];
  const count = block.itemCount_ !== undefined ? block.itemCount_ : (block.inputList ? block.inputList.length : 0);
  for (let i = 0; i < count; i++) {
    let element = '';
    if (block.getInput('ADD' + i)) {
      element = gen.valueToCode(block, 'ADD' + i, gen.ORDER_NONE);
    } else if (block.getInput('ITEM' + i)) {
      element = gen.valueToCode(block, 'ITEM' + i, gen.ORDER_NONE);
    }
    if (element !== null && element !== '') {
      elements.push(element);
    }
  }
  return [`[${elements.join(', ')}]`, gen.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_list_create'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const items = getValue(gen, block, gen.ORDER_NONE, 'ITEMS', 'LIST') || '';
  return [`[${items}]`, gen.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_list_length'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const list = getValue(gen, block, gen.ORDER_MEMBER, 'LIST', 'ARRAY') || '[]';
  return [`${list}.length`, gen.ORDER_MEMBER];
};

javascriptGenerator.forBlock['essentials_list_get'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const list = getValue(gen, block, gen.ORDER_MEMBER, 'LIST', 'ARRAY') || '[]';
  const index = getValue(gen, block, gen.ORDER_NONE, 'INDEX', 'AT') || '0';
  return [`${list}[${index}]`, gen.ORDER_MEMBER];
};

javascriptGenerator.forBlock['essentials_list_set'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const list = getValue(gen, block, gen.ORDER_MEMBER, 'LIST', 'ARRAY') || '[]';
  const index = getValue(gen, block, gen.ORDER_NONE, 'INDEX', 'AT') || '0';
  const val = getValue(gen, block, gen.ORDER_ASSIGNMENT, 'VALUE', 'VAL') || 'null';
  return `${list}[${index}] = ${val};\n`;
};

javascriptGenerator.forBlock['essentials_list_statements'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const list = getValue(gen, block, gen.ORDER_MEMBER, 'LIST', 'ARRAY') || '[]';
  const op = block.getFieldValue('OP') || block.getFieldValue('MODE') || 'APPEND';
  const item = getValue(gen, block, gen.ORDER_NONE, 'ITEM', 'VAL', 'VALUE') || 'null';
  const index = getValue(gen, block, gen.ORDER_NONE, 'INDEX', 'AT') || '0';
  switch (op) {
    case 'APPEND':
      return `${list}.push(${item});\n`;
    case 'INSERT':
      return `${list}.splice(${index}, 0, ${item});\n`;
    case 'REMOVE':
      return `const _remIdx = ${list}.indexOf(${item}); if (_remIdx !== -1) ${list}.splice(_remIdx, 1);\n`;
    case 'CLEAR':
      return `${list}.length = 0;\n`;
    default:
      return `${list}.push(${item});\n`;
  }
};

javascriptGenerator.forBlock['essentials_list_expressions'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const list = getValue(gen, block, gen.ORDER_MEMBER, 'LIST', 'ARRAY') || '[]';
  const index = getValue(gen, block, gen.ORDER_NONE, 'INDEX', 'AT') || '0';
  return [`(${list}.splice(${index}, 1)[0])`, gen.ORDER_MEMBER];
};

javascriptGenerator.forBlock['essentials_list_from_range'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const start = getValue(gen, block, gen.ORDER_NONE, 'START') || '0';
  const end = getValue(gen, block, gen.ORDER_NONE, 'END', 'STOP') || '10';
  const step = getValue(gen, block, gen.ORDER_NONE, 'STEP') || '1';
  return [`Array.from({ length: Math.floor((${end} - ${start}) / ${step}) + 1 }, (_, i) => ${start} + i * ${step})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_list_slice'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const list = getValue(gen, block, gen.ORDER_MEMBER, 'LIST', 'ARRAY') || '[]';
  const start = getValue(gen, block, gen.ORDER_NONE, 'START') || '0';
  const end = getValue(gen, block, gen.ORDER_NONE, 'END');
  if (end) {
    return [`${list}.slice(${start}, ${end})`, gen.ORDER_FUNCTION_CALL];
  }
  return [`${list}.slice(${start})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_list_sort'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const list = getValue(gen, block, gen.ORDER_MEMBER, 'LIST', 'ARRAY') || '[]';
  const reverse = block.getFieldValue('REVERSE') === 'TRUE';
  if (reverse) {
    return `${list}.sort().reverse();\n`;
  }
  return `${list}.sort();\n`;
};

javascriptGenerator.forBlock['essentials_list_reverse'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const list = getValue(gen, block, gen.ORDER_MEMBER, 'LIST', 'ARRAY') || '[]';
  return `${list}.reverse();\n`;
};

javascriptGenerator.forBlock['essentials_list_index_of'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const list = getValue(gen, block, gen.ORDER_MEMBER, 'LIST', 'ARRAY') || '[]';
  const item = getValue(gen, block, gen.ORDER_NONE, 'ITEM', 'VAL') || 'null';
  return [`${list}.indexOf(${item})`, gen.ORDER_FUNCTION_CALL];
};

// ==================== FULL SET OPERATIONS (JavaScript) ====================

javascriptGenerator.forBlock['essentials_set_create'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const elements = [];
  const count = typeof block.itemCount_ !== 'undefined' ? block.itemCount_ : 0;
  for (let i = 0; i < count || block.getInput('ADD' + i) || block.getInput('ITEM' + i); i++) {
    const inp = block.getInput('ADD' + i) ? ('ADD' + i) : ('ITEM' + i);
    if (!block.getInput(inp)) break;
    const el = gen.valueToCode(block, inp, gen.ORDER_NONE);
    if (el) elements.push(el);
  }
  if (elements.length > 0) {
    return [`new Set([${elements.join(', ')}])`, gen.ORDER_NEW || gen.ORDER_FUNCTION_CALL];
  }
  return ['new Set()', gen.ORDER_NEW || gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_set_add'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set = getValue(gen, block, gen.ORDER_MEMBER, 'SET') || 'set';
  const item = getValue(gen, block, gen.ORDER_NONE, 'ITEM', 'VAL', 'VALUE') || 'null';
  return `${set}.add(${item});\n`;
};

javascriptGenerator.forBlock['essentials_set_remove'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set = getValue(gen, block, gen.ORDER_MEMBER, 'SET') || 'set';
  const item = getValue(gen, block, gen.ORDER_NONE, 'ITEM', 'VAL', 'VALUE') || 'null';
  return `${set}.delete(${item});\n`;
};

javascriptGenerator.forBlock['essentials_set_contains'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set = getValue(gen, block, gen.ORDER_MEMBER, 'SET') || 'set';
  const item = getValue(gen, block, gen.ORDER_NONE, 'ITEM', 'VAL', 'VALUE') || 'null';
  return [`${set}.has(${item})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_set_length'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set = getValue(gen, block, gen.ORDER_MEMBER, 'SET') || 'set';
  return [`${set}.size`, gen.ORDER_MEMBER];
};

javascriptGenerator.forBlock['essentials_set_union'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set1 = getValue(gen, block, gen.ORDER_NONE, 'SET1', 'SET_A') || 'new Set()';
  const set2 = getValue(gen, block, gen.ORDER_NONE, 'SET2', 'SET_B') || 'new Set()';
  return [`new Set([...${set1}, ...${set2}])`, gen.ORDER_NEW || gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_set_intersection'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set1 = getValue(gen, block, gen.ORDER_NONE, 'SET1', 'SET_A') || 'new Set()';
  const set2 = getValue(gen, block, gen.ORDER_NONE, 'SET2', 'SET_B') || 'new Set()';
  return [`new Set([...${set1}].filter(x => ${set2}.has(x)))`, gen.ORDER_NEW || gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_set_difference'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set1 = getValue(gen, block, gen.ORDER_NONE, 'SET1', 'SET_A') || 'new Set()';
  const set2 = getValue(gen, block, gen.ORDER_NONE, 'SET2', 'SET_B') || 'new Set()';
  return [`new Set([...${set1}].filter(x => !${set2}.has(x)))`, gen.ORDER_NEW || gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_set_symmetric_difference'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set1 = getValue(gen, block, gen.ORDER_NONE, 'SET1', 'SET_A') || 'new Set()';
  const set2 = getValue(gen, block, gen.ORDER_NONE, 'SET2', 'SET_B') || 'new Set()';
  return [`new Set([...[...${set1}].filter(x => !${set2}.has(x)), ...[...${set2}].filter(x => !${set1}.has(x))])`, gen.ORDER_NEW || gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_set_is_subset'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set1 = getValue(gen, block, gen.ORDER_NONE, 'SET1', 'SET_A') || 'new Set()';
  const set2 = getValue(gen, block, gen.ORDER_NONE, 'SET2', 'SET_B') || 'new Set()';
  return [`[...${set1}].every(x => ${set2}.has(x))`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_set_is_superset'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const set1 = getValue(gen, block, gen.ORDER_NONE, 'SET1', 'SET_A') || 'new Set()';
  const set2 = getValue(gen, block, gen.ORDER_NONE, 'SET2', 'SET_B') || 'new Set()';
  return [`[...${set2}].every(x => ${set1}.has(x))`, gen.ORDER_FUNCTION_CALL];
};

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

// Text & Built-in Utilities Generators for JavaScript

javascriptGenerator.forBlock['text'] = function(block) {
  const textValue = block.getFieldValue('TEXT') || '';
  return [JSON.stringify(textValue), javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['text_literal'] = function(block) {
  const val = block.getFieldValue('TEXT') || '';
  return [JSON.stringify(val), javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['text_multiline'] = function(block) {
  const val = block.getFieldValue('TEXT') || '';
  return [JSON.stringify(val), javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['text_print'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const msg = getValue(gen, block, gen.ORDER_NONE, 'TEXT', 'MESSAGE', 'VALUE') || '""';
  return `console.log(${msg});\n`;
};

javascriptGenerator.forBlock['text_print_fstring'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const msg = getValue(gen, block, gen.ORDER_NONE, 'TEXT', 'MESSAGE', 'VALUE') || '""';
  return `console.log(${msg});\n`;
};

javascriptGenerator.forBlock['text_concat'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const elements = [];
  const itemCount = block.itemCount_ !== undefined ? block.itemCount_ : 2;
  for (let i = 0; i < itemCount || block.getInput('ADD' + i); i++) {
    if (!block.getInput('ADD' + i)) break;
    const val = gen.valueToCode(block, 'ADD' + i, gen.ORDER_NONE);
    if (val) {
      elements.push(`String(${val})`);
    }
  }
  if (elements.length === 0) {
    return ['""', gen.ORDER_ATOMIC];
  }
  return [elements.join(' + '), gen.ORDER_ADDITION];
};

javascriptGenerator.forBlock['text_length'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const str = getValue(gen, block, gen.ORDER_MEMBER, 'VALUE', 'STRING', 'TEXT') || '""';
  return [`String(${str}).length`, gen.ORDER_MEMBER];
};

javascriptGenerator.forBlock['text_substring'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const str = getValue(gen, block, gen.ORDER_MEMBER, 'STRING', 'TEXT', 'VALUE') || '""';
  const start = getValue(gen, block, gen.ORDER_NONE, 'START', 'AT1', 'FROM') || '0';
  const end = getValue(gen, block, gen.ORDER_NONE, 'END', 'AT2', 'TO') || '0';
  return [`String(${str}).substring(${start}, ${end})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['text_replace'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const str = getValue(gen, block, gen.ORDER_MEMBER, 'STRING', 'TEXT', 'VALUE') || '""';
  const from = getValue(gen, block, gen.ORDER_NONE, 'FROM', 'FIND') || '""';
  const to = getValue(gen, block, gen.ORDER_NONE, 'TO', 'REPLACE') || '""';
  return [`String(${str}).replaceAll(${from}, ${to})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['text_is_empty'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const str = getValue(gen, block, gen.ORDER_MEMBER, 'VALUE', 'STRING', 'TEXT') || '""';
  return [`!String(${str}).length`, gen.ORDER_LOGICAL_NOT];
};

javascriptGenerator.forBlock['text_search'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const str = getValue(gen, block, gen.ORDER_MEMBER, 'STRING', 'TEXT', 'VALUE') || '""';
  const find = getValue(gen, block, gen.ORDER_NONE, 'FIND', 'SUBSTRING') || '""';
  return [`String(${str}).indexOf(${find})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['text_transform'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const str = getValue(gen, block, gen.ORDER_MEMBER, 'STRING', 'TEXT', 'VALUE') || '""';
  const op = block.getFieldValue('OP') || 'UPPERCASE';
  const method = op === 'UPPERCASE' ? 'toUpperCase' : (op === 'LOWERCASE' ? 'toLowerCase' : 'trim');
  return [`String(${str}).${method}()`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['text_split_join'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const str = getValue(gen, block, gen.ORDER_MEMBER, 'STRING', 'TEXT', 'LIST') || '""';
  const delim = getValue(gen, block, gen.ORDER_NONE, 'DELIM') || '","';
  const mode = block.getFieldValue('MODE') || 'SPLIT';
  if (mode === 'SPLIT') {
    return [`String(${str}).split(${delim})`, gen.ORDER_FUNCTION_CALL];
  }
  return [`${str}.join(${delim})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['text_newline'] = function() {
  return ['"\\n"', javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['text_tab'] = function() {
  return ['"\\t"', javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_safe_input'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const promptText = getValue(gen, block, gen.ORDER_NONE, 'PROMPT', 'TEXT') || '"Enter input:"';
  return [`prompt(${promptText})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_input_raw'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const promptText = getValue(gen, block, gen.ORDER_NONE, 'PROMPT', 'TEXT') || '"Enter input:"';
  return [`prompt(${promptText})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_log_info'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const msg = getValue(gen, block, gen.ORDER_NONE, 'TEXT', 'MESSAGE', 'VALUE') || '""';
  return `console.info(${msg});\n`;
};

javascriptGenerator.forBlock['math_number'] = function(block) {
  const num = Number(block.getFieldValue('NUM') || 0);
  return [String(num), javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_num_literal'] = function(block) {
  const num = Number(block.getFieldValue('NUM') || 0);
  return [String(num), javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_num_arithmetic'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const a = getValue(gen, block, gen.ORDER_NONE, 'A', 'NUM1') || '0';
  const op = block.getFieldValue('OP') || '+';
  const b = getValue(gen, block, gen.ORDER_NONE, 'B', 'NUM2') || '0';
  return [`${a} ${op} ${b}`, gen.ORDER_ADDITION];
};

javascriptGenerator.forBlock['essentials_num_neg'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const val = getValue(gen, block, gen.ORDER_UNARY_PREFIX, 'NUM', 'VALUE', 'A') || '0';
  return [`-${val}`, gen.ORDER_UNARY_PREFIX];
};

javascriptGenerator.forBlock['essentials_num_abs'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const val = getValue(gen, block, gen.ORDER_NONE, 'NUM', 'VALUE', 'A') || '0';
  return [`Math.abs(${val})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_num_round'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const val = getValue(gen, block, gen.ORDER_NONE, 'NUM', 'VALUE', 'A') || '0';
  return [`Math.round(${val})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_num_clamp'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const val = getValue(gen, block, gen.ORDER_NONE, 'VALUE', 'NUM', 'VAL') || '0';
  const min = getValue(gen, block, gen.ORDER_NONE, 'MIN', 'LOW') || '0';
  const max = getValue(gen, block, gen.ORDER_NONE, 'MAX', 'HIGH') || '100';
  return [`Math.min(Math.max(${val}, ${min}), ${max})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_num_compare'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const a = getValue(gen, block, gen.ORDER_NONE, 'A', 'NUM1') || '0';
  const op = block.getFieldValue('OP') || '===';
  const b = getValue(gen, block, gen.ORDER_NONE, 'B', 'NUM2') || '0';
  return [`${a} ${op} ${b}`, gen.ORDER_RELATIONAL];
};

javascriptGenerator.forBlock['essentials_num_min'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const a = getValue(gen, block, gen.ORDER_NONE, 'A', 'NUM1') || '0';
  const b = getValue(gen, block, gen.ORDER_NONE, 'B', 'NUM2') || '0';
  return [`Math.min(${a}, ${b})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_num_max'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const a = getValue(gen, block, gen.ORDER_NONE, 'A', 'NUM1') || '0';
  const b = getValue(gen, block, gen.ORDER_NONE, 'B', 'NUM2') || '0';
  return [`Math.max(${a}, ${b})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_num_rand_int'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const from = getValue(gen, block, gen.ORDER_NONE, 'FROM', 'MIN') || '0';
  const to = getValue(gen, block, gen.ORDER_NONE, 'TO', 'MAX') || '100';
  return [`Math.floor(Math.random() * (${to} - ${from} + 1)) + ${from}`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_num_rand_float'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const from = getValue(gen, block, gen.ORDER_NONE, 'FROM', 'MIN') || '0';
  const to = getValue(gen, block, gen.ORDER_NONE, 'TO', 'MAX') || '1';
  return [`Math.random() * (${to} - ${from}) + ${from}`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_expr_group'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const expr = getValue(gen, block, gen.ORDER_NONE, 'EXPR', 'VALUE', 'NUM') || '0';
  return [`(${expr})`, gen.ORDER_ATOMIC];
};

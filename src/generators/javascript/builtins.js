import { javascriptGenerator } from 'blockly/javascript';

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
  const msg = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || '""';
  return `console.log(${msg});\n`;
};

javascriptGenerator.forBlock['text_print_fstring'] = function(block, generator) {
  const msg = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || '""';
  return `console.log(${msg});\n`;
};

javascriptGenerator.forBlock['text_concat'] = function(block, generator) {
  const elements = [];
  const itemCount = block.itemCount_ !== undefined ? block.itemCount_ : 2;
  for (let i = 0; i < itemCount; i++) {
    const val = generator.valueToCode(block, 'ADD' + i, generator.ORDER_NONE);
    if (val) {
      elements.push(`String(${val})`);
    }
  }
  if (elements.length === 0) {
    return ['""', generator.ORDER_ATOMIC];
  }
  return [elements.join(' + '), generator.ORDER_ADDITION];
};

javascriptGenerator.forBlock['text_length'] = function(block, generator) {
  const str = generator.valueToCode(block, 'VALUE', generator.ORDER_MEMBER) || '""';
  return [`String(${str}).length`, generator.ORDER_MEMBER];
};

javascriptGenerator.forBlock['text_substring'] = function(block, generator) {
  const str = generator.valueToCode(block, 'STRING', generator.ORDER_MEMBER) || '""';
  const start = generator.valueToCode(block, 'START', generator.ORDER_NONE) || '0';
  const end = generator.valueToCode(block, 'END', generator.ORDER_NONE) || '0';
  return [`String(${str}).substring(${start}, ${end})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['text_replace'] = function(block, generator) {
  const str = generator.valueToCode(block, 'STRING', generator.ORDER_MEMBER) || '""';
  const from = generator.valueToCode(block, 'FROM', generator.ORDER_NONE) || '""';
  const to = generator.valueToCode(block, 'TO', generator.ORDER_NONE) || '""';
  return [`String(${str}).replaceAll(${from}, ${to})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_safe_input'] = function(block, generator) {
  const promptText = generator.valueToCode(block, 'PROMPT', generator.ORDER_NONE) || '"Enter input:"';
  return [`prompt(${promptText})`, generator.ORDER_FUNCTION_CALL];
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
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || '0';
  const op = block.getFieldValue('OP') || '+';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '0';
  return [`${a} ${op} ${b}`, generator.ORDER_ADDITION];
};

javascriptGenerator.forBlock['essentials_num_neg'] = function(block, generator) {
  const val = generator.valueToCode(block, 'NUM', generator.ORDER_UNARY_PREFIX) || '0';
  return [`-${val}`, generator.ORDER_UNARY_PREFIX];
};

javascriptGenerator.forBlock['essentials_num_abs'] = function(block, generator) {
  const val = generator.valueToCode(block, 'NUM', generator.ORDER_NONE) || '0';
  return [`Math.abs(${val})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_num_round'] = function(block, generator) {
  const val = generator.valueToCode(block, 'NUM', generator.ORDER_NONE) || '0';
  return [`Math.round(${val})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_num_compare'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || '0';
  const op = block.getFieldValue('OP') || '===';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '0';
  return [`${a} ${op} ${b}`, generator.ORDER_RELATIONAL];
};

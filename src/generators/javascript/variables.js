import { javascriptGenerator } from 'blockly/javascript';

// Helper to safely extract input values by checking multiple candidate input names
function getValue(generator, block, order, ...names) {
  for (const name of names) {
    if (block.getInput(name)) {
      return generator.valueToCode(block, name, order) || '';
    }
  }
  return '';
}

// Sub-phase 3.1: JavaScript Core Variables & Data Types Generators

javascriptGenerator.forBlock['js_var_let'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const varName = block.getFieldValue('VAR') || 'x';
  const val = getValue(gen, block, gen.ORDER_ASSIGNMENT, 'VALUE', 'VAL') || '0';
  return `let ${varName} = ${val};\n`;
};

javascriptGenerator.forBlock['js_var_const'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const varName = block.getFieldValue('VAR') || 'PI';
  const val = getValue(gen, block, gen.ORDER_ASSIGNMENT, 'VALUE', 'VAL') || '0';
  return `const ${varName} = ${val};\n`;
};

javascriptGenerator.forBlock['js_var_assign'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const varName = block.getFieldValue('VAR') || 'x';
  const val = getValue(gen, block, gen.ORDER_ASSIGNMENT, 'VALUE', 'VAL') || '0';
  return `${varName} = ${val};\n`;
};

javascriptGenerator.forBlock['js_typeof'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const val = getValue(gen, block, gen.ORDER_UNARY_PREFIX, 'VALUE', 'OBJ', 'VAL') || 'null';
  return [`typeof ${val}`, gen.ORDER_UNARY_PREFIX];
};

javascriptGenerator.forBlock['js_type_convert'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const val = getValue(gen, block, gen.ORDER_NONE, 'VALUE', 'VAL', 'OBJ') || '""';
  const type = block.getFieldValue('TYPE') || 'Number';
  return [`${type}(${val})`, gen.ORDER_FUNCTION_CALL];
};

// Standard & Essentials Variable Generators for JavaScript
javascriptGenerator.forBlock['variables_get'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const varName = gen.nameDB_ ? gen.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE') : (block.getFieldValue('VAR') || 'x');
  return [varName, gen.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['variables_set'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const varName = gen.nameDB_ ? gen.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE') : (block.getFieldValue('VAR') || 'x');
  const argument0 = getValue(gen, block, gen.ORDER_ASSIGNMENT, 'VALUE', 'VAL') || '0';
  return `${varName} = ${argument0};\n`;
};

javascriptGenerator.forBlock['variables_cast'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const val = getValue(gen, block, gen.ORDER_NONE, 'VALUE', 'VAL', 'OBJ') || '""';
  const targetType = block.getFieldValue('TYPE') || 'String';
  if (targetType === 'int' || targetType === 'Integer') return [`parseInt(${val}, 10)`, gen.ORDER_FUNCTION_CALL];
  if (targetType === 'double' || targetType === 'float' || targetType === 'Double') return [`parseFloat(${val})`, gen.ORDER_FUNCTION_CALL];
  if (targetType === 'boolean' || targetType === 'Boolean') return [`Boolean(${val})`, gen.ORDER_FUNCTION_CALL];
  return [`String(${val})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['variables_get_with_default'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const varName = block.getFieldValue('VAR') || 'x';
  const defaultVal = getValue(gen, block, gen.ORDER_LOGICAL_OR, 'DEFAULT', 'VALUE') || 'null';
  return [`(${varName} ?? ${defaultVal})`, gen.ORDER_LOGICAL_OR || gen.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_var_get'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const varName = block.getFieldValue('VAR') || block.getFieldValue('NAME') || 'x';
  return [varName, gen.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_var_set'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const varName = block.getFieldValue('VAR') || block.getFieldValue('NAME') || 'x';
  const val = getValue(gen, block, gen.ORDER_ASSIGNMENT, 'VALUE', 'VAL') || '0';
  return `${varName} = ${val};\n`;
};

javascriptGenerator.forBlock['essentials_var_undefined'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  return ['undefined', gen.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['essentials_type_of'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const val = getValue(gen, block, gen.ORDER_UNARY_PREFIX, 'OBJ', 'VALUE', 'VAL') || 'null';
  return [`typeof ${val}`, gen.ORDER_UNARY_PREFIX];
};

javascriptGenerator.forBlock['essentials_cast'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const val = getValue(gen, block, gen.ORDER_NONE, 'VALUE', 'VAL', 'OBJ') || '""';
  const type = block.getFieldValue('TYPE') || 'String';
  if (type === 'int' || type === 'Integer') return [`parseInt(${val}, 10)`, gen.ORDER_FUNCTION_CALL];
  if (type === 'double' || type === 'float' || type === 'Double') return [`parseFloat(${val})`, gen.ORDER_FUNCTION_CALL];
  if (type === 'boolean' || type === 'Boolean') return [`Boolean(${val})`, gen.ORDER_FUNCTION_CALL];
  return [`String(${val})`, gen.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_is_instance'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const val = getValue(gen, block, gen.ORDER_RELATIONAL, 'OBJ', 'VALUE', 'VAL') || 'null';
  let type = block.getInput('TYPE') ? gen.valueToCode(block, 'TYPE', gen.ORDER_NONE) : block.getFieldValue('TYPE');
  if (!type || type === "''" || type === '""') type = 'Object';
  type = String(type).replace(/['"]/g, '');
  return [`${val} instanceof ${type}`, gen.ORDER_RELATIONAL];
};

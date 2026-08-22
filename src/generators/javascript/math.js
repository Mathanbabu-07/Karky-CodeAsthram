import { javascriptGenerator } from 'blockly/javascript';

// Sub-phase 3.2: JavaScript Math & Arithmetic Operators Generators

javascriptGenerator.forBlock['js_math_arithmetic'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || '0';
  const op = block.getFieldValue('OP') || '+';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '0';
  
  let order = generator.ORDER_ADDITION;
  if (op === '*' || op === '/' || op === '%') {
    order = generator.ORDER_MULTIPLICATIVE;
  } else if (op === '**') {
    order = generator.ORDER_EXPONENTIATION || generator.ORDER_NONE;
  }
  return [`${a} ${op} ${b}`, order];
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

javascriptGenerator.forBlock['essentials_num_clamp'] = function(block, generator) {
  const valInput = block.getInput('NUM') ? 'NUM' : (block.getInput('VALUE') ? 'VALUE' : null);
  const val = valInput ? (generator.valueToCode(block, valInput, generator.ORDER_NONE) || '0') : '0';
  const min = block.getInput('MIN') ? (generator.valueToCode(block, 'MIN', generator.ORDER_NONE) || '0') : '0';
  const max = block.getInput('MAX') ? (generator.valueToCode(block, 'MAX', generator.ORDER_NONE) || '100') : '100';
  return [`Math.min(Math.max(${val}, ${min}), ${max})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['math_single'] = function(block, generator) {
  const operator = block.getFieldValue('OP');
  let code;
  let arg;
  if (operator === 'NEG') {
    arg = generator.valueToCode(block, 'NUM', generator.ORDER_UNARY_NEGATION) || '0';
    if (arg[0] === '-') {
      arg = ' ' + arg;
    }
    return ['-' + arg, generator.ORDER_UNARY_NEGATION];
  }
  if (operator === 'SIN' || operator === 'COS' || operator === 'TAN') {
    arg = generator.valueToCode(block, 'NUM', generator.ORDER_MULTIPLICATIVE) || '0';
  } else {
    arg = generator.valueToCode(block, 'NUM', generator.ORDER_NONE) || '0';
  }
  switch (operator) {
    case 'ABS':
      code = 'Math.abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'Math.sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'Math.log(' + arg + ')';
      break;
    case 'EXP':
      code = 'Math.exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'Math.pow(10, ' + arg + ')';
      break;
    case 'ROUND':
      code = 'Math.round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'Math.ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'Math.floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'Math.sin(' + arg + ' / 180 * Math.PI)';
      break;
    case 'COS':
      code = 'Math.cos(' + arg + ' / 180 * Math.PI)';
      break;
    case 'TAN':
      code = 'Math.tan(' + arg + ' / 180 * Math.PI)';
      break;
    default:
      code = arg;
  }
  return [code, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['math_ops_multi'] = function(block, generator) {
  const op = block.getFieldValue('OP') || 'POW';
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || '0';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '0';
  switch (op) {
    case 'POW':
      return [`Math.pow(${a}, ${b})`, generator.ORDER_FUNCTION_CALL];
    case 'MOD':
      return [`${a} % ${b}`, generator.ORDER_MULTIPLICATIVE];
    case 'LOG':
      return [`Math.log(${a}) / Math.log(${b})`, generator.ORDER_FUNCTION_CALL];
    default:
      return [`Math.pow(${a}, ${b})`, generator.ORDER_FUNCTION_CALL];
  }
};

javascriptGenerator.forBlock['control_math_stats'] = function(block, generator) {
  const mode = block.getFieldValue('MODE') || 'SUM';
  const list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE) || '[]';
  switch (mode) {
    case 'SUM':
      return [`${list}.reduce((a, b) => a + b, 0)`, generator.ORDER_FUNCTION_CALL];
    case 'MEAN':
    case 'AVERAGE':
      return [`(${list}.reduce((a, b) => a + b, 0) / ${list}.length)`, generator.ORDER_DIVISION];
    case 'MIN':
      return [`Math.min(...${list})`, generator.ORDER_FUNCTION_CALL];
    case 'MAX':
      return [`Math.max(...${list})`, generator.ORDER_FUNCTION_CALL];
    default:
      return [`${list}.reduce((a, b) => a + b, 0)`, generator.ORDER_FUNCTION_CALL];
  }
};

javascriptGenerator.forBlock['control_decimal_create'] = function(block, generator) {
  const val = generator.valueToCode(block, 'NUM', generator.ORDER_NONE) || '0';
  return [`Number(${val})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['control_fraction_create'] = function(block, generator) {
  const num = generator.valueToCode(block, 'NUM', generator.ORDER_NONE) || '0';
  const den = generator.valueToCode(block, 'DEN', generator.ORDER_NONE) || '1';
  return [`(${num} / ${den})`, generator.ORDER_DIVISION];
};

javascriptGenerator.forBlock['control_complex_create'] = function(block, generator) {
  const real = generator.valueToCode(block, 'REAL', generator.ORDER_NONE) || '0';
  const imag = generator.valueToCode(block, 'IMAG', generator.ORDER_NONE) || '0';
  return [`({ real: ${real}, imag: ${imag} })`, generator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['control_accumulate'] = function(block, generator) {
  const list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE) || '[]';
  return [`${list}.reduce((acc, curr) => [...acc, (acc.length ? acc[acc.length - 1] : 0) + curr], [])`, generator.ORDER_FUNCTION_CALL];
};

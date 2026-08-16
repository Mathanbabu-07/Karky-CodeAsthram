import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Dedicated Math.pow
javaGenerator.forBlock['java_math_pow'] = function (block, generator) {
    const base = generator.valueToCode(block, 'BASE', Order.NONE) || '1';
    const exp = generator.valueToCode(block, 'EXP', Order.NONE) || '1';
    return [`Math.pow(${base}, ${exp})`, Order.FUNCTION_CALL];
};

// Dedicated Math.sqrt
javaGenerator.forBlock['java_math_sqrt'] = function (block, generator) {
    const num = generator.valueToCode(block, 'NUM', Order.NONE) || '0';
    return [`Math.sqrt(${num})`, Order.FUNCTION_CALL];
};

// Numeric literal
javaGenerator.forBlock['essentials_num_literal'] = function (block, generator) {
    const number = parseFloat(block.getFieldValue('NUM'));
    return [String(number), Order.ATOMIC];
};

// Arithmetic operations
javaGenerator.forBlock['essentials_num_arithmetic'] = function (block, generator) {
    const OPERATORS = {
        'ADD': [' + ', Order.ADDITION],
        'MINUS': [' - ', Order.SUBTRACTION],
        'MULTIPLY': [' * ', Order.MULTIPLICATION],
        'DIVIDE': [' / ', Order.DIVISION],
        'MODULO': [' % ', Order.MODULUS]
    };
    const tuple = OPERATORS[block.getFieldValue('OP')];
    const operator = tuple[0];
    const order = tuple[1];
    const argument0 = generator.valueToCode(block, 'A', order) || '0';
    const argument1 = generator.valueToCode(block, 'B', order) || '0';
    const code = argument0 + operator + argument1;
    return [code, order];
};

// Negation
javaGenerator.forBlock['essentials_num_neg'] = function (block, generator) {
    const value = generator.valueToCode(block, 'NUM', Order.UNARY_NEGATION) || '0';
    return ['-' + value, Order.UNARY_NEGATION];
};

// Absolute value
javaGenerator.forBlock['essentials_num_abs'] = function (block, generator) {
    const value = generator.valueToCode(block, 'NUM', Order.NONE) || '0';
    return ['Math.abs(' + value + ')', Order.FUNCTION_CALL];
};

// Round
javaGenerator.forBlock['essentials_num_round'] = function (block, generator) {
    const value = generator.valueToCode(block, 'NUM', Order.NONE) || '0';
    return ['Math.round(' + value + ')', Order.FUNCTION_CALL];
};

// Clamp (min/max)
javaGenerator.forBlock['essentials_num_clamp'] = function (block, generator) {
    const valInput = block.getInput('NUM') ? 'NUM' : (block.getInput('VALUE') ? 'VALUE' : null);
    const value = valInput ? (generator.valueToCode(block, valInput, Order.NONE) || '0') : '0';
    const minInput = block.getInput('MIN') ? 'MIN' : (block.getInput('LOW') ? 'LOW' : null);
    const min = minInput ? (generator.valueToCode(block, minInput, Order.NONE) || '0') : '0';
    const maxInput = block.getInput('MAX') ? 'MAX' : (block.getInput('HIGH') ? 'HIGH' : null);
    const max = maxInput ? (generator.valueToCode(block, maxInput, Order.NONE) || '100') : '100';
    const code = `Math.max(${min}, Math.min(${max}, ${value}))`;
    return [code, Order.FUNCTION_CALL];
};

// Comparison
javaGenerator.forBlock['essentials_num_compare'] = function (block, generator) {
    const OPERATORS = {
        'LT': ' < ',
        'LTE': ' <= ',
        'GT': ' > ',
        'GTE': ' >= ',
        'EQ': ' == ',
        'NEQ': ' != '
    };
    const operator = OPERATORS[block.getFieldValue('OP')] || ' == ';
    const argument0 = generator.valueToCode(block, 'A', Order.RELATIONAL) || '0';
    const argument1 = generator.valueToCode(block, 'B', Order.RELATIONAL) || '0';
    const code = argument0 + operator + argument1;
    return [code, Order.RELATIONAL];
};

// Min
javaGenerator.forBlock['essentials_num_min'] = function (block, generator) {
    const a = generator.valueToCode(block, 'A', Order.NONE) || '0';
    const b = generator.valueToCode(block, 'B', Order.NONE) || '0';
    return ['Math.min(' + a + ', ' + b + ')', Order.FUNCTION_CALL];
};

// Max
javaGenerator.forBlock['essentials_num_max'] = function (block, generator) {
    const a = generator.valueToCode(block, 'A', Order.NONE) || '0';
    const b = generator.valueToCode(block, 'B', Order.NONE) || '0';
    return ['Math.max(' + a + ', ' + b + ')', Order.FUNCTION_CALL];
};

// Random integer
javaGenerator.forBlock['essentials_num_rand_int'] = function (block, generator) {
    const minInput = block.getInput('MIN') ? 'MIN' : (block.getInput('LOW') ? 'LOW' : (block.getInput('FROM') ? 'FROM' : null));
    const min = minInput ? (generator.valueToCode(block, minInput, Order.NONE) || '0') : '0';
    const maxInput = block.getInput('MAX') ? 'MAX' : (block.getInput('HIGH') ? 'HIGH' : (block.getInput('TO') ? 'TO' : null));
    const max = maxInput ? (generator.valueToCode(block, maxInput, Order.NONE) || '100') : '100';
    generator.addImport && generator.addImport('java.util.Random');
    const code = `(new Random().nextInt(${max} - ${min} + 1) + ${min})`;
    return [code, Order.FUNCTION_CALL];
};

// Random float
javaGenerator.forBlock['essentials_num_rand_float'] = function (block, generator) {
    generator.addImport && generator.addImport('java.util.Random');
    return ['new Random().nextDouble()', Order.FUNCTION_CALL];
};

// Expression grouping (parentheses)
javaGenerator.forBlock['essentials_expr_group'] = function (block, generator) {
    const valInput = block.getInput('VALUE') ? 'VALUE' : (block.getInput('EXPR') ? 'EXPR' : (block.getInput('NUM') ? 'NUM' : null));
    const value = valInput ? (generator.valueToCode(block, valInput, Order.NONE) || '0') : '0';
    return ['(' + value + ')', Order.ATOMIC];
};

// Math single operations (sin, cos, sqrt, etc.)
javaGenerator.forBlock['math_single'] = function (block, generator) {
    const OPERATORS = {
        'ROOT': 'Math.sqrt',
        'ABS': 'Math.abs',
        'NEG': '-',
        'LN': 'Math.log',
        'LOG10': 'Math.log10',
        'EXP': 'Math.exp',
        'POW10': function (arg) { return 'Math.pow(10, ' + arg + ')'; },
        'SIN': 'Math.sin',
        'COS': 'Math.cos',
        'TAN': 'Math.tan',
        'ASIN': 'Math.asin',
        'ACOS': 'Math.acos',
        'ATAN': 'Math.atan'
    };
    const operator = block.getFieldValue('OP');
    const arg = generator.valueToCode(block, 'NUM', Order.NONE) || '0';

    let code;
    if (operator === 'NEG') {
        code = '-' + arg;
    } else if (typeof OPERATORS[operator] === 'function') {
        code = OPERATORS[operator](arg);
    } else {
        code = OPERATORS[operator] + '(' + arg + ')';
    }
    return [code, Order.FUNCTION_CALL];
};

// Math operations (multi-argument)
javaGenerator.forBlock['math_ops_multi'] = function (block, generator) {
    const op = block.getFieldValue('OP');
    const a = generator.valueToCode(block, 'A', Order.NONE) || '0';
    const b = generator.valueToCode(block, 'B', Order.NONE) || '0';

    let code;
    switch (op) {
        case 'POW':
            code = `Math.pow(${a}, ${b})`;
            break;
        case 'ATAN2':
            code = `Math.atan2(${a}, ${b})`;
            break;
        default:
            code = `Math.${op.toLowerCase()}(${a}, ${b})`;
    }
    return [code, Order.FUNCTION_CALL];
};

// Statistics (sum, mean, median) - using Arrays
javaGenerator.forBlock['control_math_stats'] = function (block, generator) {
    const mode = block.getFieldValue('MODE');
    const list = generator.valueToCode(block, 'LIST', Order.NONE) || 'new int[]{}';

    generator.addImport('java.util.Arrays');
    generator.addImport('java.util.stream.IntStream');

    let code;
    switch (mode) {
        case 'SUM':
            code = `Arrays.stream(${list}).sum()`;
            break;
        case 'AVERAGE':
            code = `Arrays.stream(${list}).average().orElse(0.0)`;
            break;
        case 'MIN':
            code = `Arrays.stream(${list}).min().orElse(0)`;
            break;
        case 'MAX':
            code = `Arrays.stream(${list}).max().orElse(0)`;
            break;
        case 'MEDIAN':
            // Median requires sorting
            code = `IntStream.of(Arrays.stream(${list}).sorted().toArray()).skip(Arrays.stream(${list}).count() / 2).findFirst().orElse(0)`;
            break;
        default:
            code = `Arrays.stream(${list}).average().orElse(0.0)`;
    }
    return [code, Order.FUNCTION_CALL];
};

export { javaGenerator };

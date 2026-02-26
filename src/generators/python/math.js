import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['control_math_stats'] = function (block) {
    const op = block.getFieldValue('OP');
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';

    switch (op) {
        case 'MAX':
            return [`max(${list})`, Python.ORDER_FUNCTION_CALL];
        case 'MIN':
            return [`min(${list})`, Python.ORDER_FUNCTION_CALL];
        case 'SUM':
            return [`sum(${list})`, Python.ORDER_FUNCTION_CALL];
        case 'MEAN':
        case 'MEDIAN':
        case 'STDDEV':
            Python.addImport('import statistics');
            let func = '';
            switch (op) {
                case 'MEAN': func = 'mean'; break;
                case 'MEDIAN': func = 'median'; break;
                case 'STDDEV': func = 'stdev'; break;
            }
            return [`statistics.${func}(${list})`, Python.ORDER_FUNCTION_CALL];
    }
};

Python.forBlock['control_decimal_create'] = function (block) {
    Python.addImport('from decimal import Decimal');
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || '0';
    return [`Decimal(str(${value}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['control_fraction_create'] = function (block) {
    Python.addImport('from fractions import Fraction');
    const num = Python.valueToCode(block, 'NUMERATOR', Python.ORDER_NONE) || '0';
    const den = Python.valueToCode(block, 'DENOMINATOR', Python.ORDER_NONE) || '1';
    return [`Fraction(${num}, ${den})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['control_complex_create'] = function (block) {
    const real = Python.valueToCode(block, 'REAL', Python.ORDER_NONE) || '0';
    const imag = Python.valueToCode(block, 'IMAG', Python.ORDER_NONE) || '0';
    return [`complex(${real}, ${imag})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['math_pi'] = function (block) {
    Python.addImport('import math');
    return ['math.pi', Python.ORDER_MEMBER];
};

Python.forBlock['math_sqrt'] = function (block) {
    Python.addImport('import math');
    const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
    return [`math.sqrt(${num})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['math_single'] = function (block) {
    const operator = block.getFieldValue('OP');
    const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
    let code;
    switch (operator) {
        case 'ROOT':
            Python.addImport('import math');
            code = `math.sqrt(${num})`;
            break;
        case 'ABS':
            code = `abs(${num})`;
            break;
        case 'NEG':
            code = `-(${num})`;
            break;
        case 'LN':
            Python.addImport('import math');
            code = `math.log(${num})`;
            break;
        case 'LOG10':
            Python.addImport('import math');
            code = `math.log10(${num})`;
            break;
        case 'EXP':
            Python.addImport('import math');
            code = `math.exp(${num})`;
            break;
        case 'POW10':
            code = `10 ** ${num}`;
            break;
        case 'SIN':
            Python.addImport('import math');
            code = `math.sin(${num})`;
            break;
        case 'COS':
            Python.addImport('import math');
            code = `math.cos(${num})`;
            break;
        case 'TAN':
            Python.addImport('import math');
            code = `math.tan(${num})`;
            break;
        case 'ASIN':
            Python.addImport('import math');
            code = `math.asin(${num})`;
            break;
        case 'ACOS':
            Python.addImport('import math');
            code = `math.acos(${num})`;
            break;
        case 'ATAN':
            Python.addImport('import math');
            code = `math.atan(${num})`;
            break;
        case 'DEGREES':
            Python.addImport('import math');
            code = `math.degrees(${num})`;
            break;
        case 'RADIANS':
            Python.addImport('import math');
            code = `math.radians(${num})`;
            break;
        default:
            throw Error('Unknown operator: ' + operator);
    }
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['math_ops_multi'] = function (block) {
    Python.addImport('import math');
    const op = block.getFieldValue('OP');
    const A = Python.valueToCode(block, 'A', Python.ORDER_NONE) || '0';
    const B = Python.valueToCode(block, 'B', Python.ORDER_NONE) || '0';
    switch (op) {
        case 'sin': return [`math.sin(${A})`, Python.ORDER_FUNCTION_CALL];
        case 'cos': return [`math.cos(${A})`, Python.ORDER_FUNCTION_CALL];
        case 'sqrt': return [`math.sqrt(${A})`, Python.ORDER_FUNCTION_CALL];
        case 'pow': return [`math.pow(${A}, ${B})`, Python.ORDER_FUNCTION_CALL];
    }
    return ['0', Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_num_literal'] = function (block) {
    const num = block.getFieldValue('NUM');
    return [Number(num), Python.ORDER_ATOMIC];
};

Python.forBlock['python_number'] = function (block) {
    const num = block.getFieldValue('NUM');
    return [Number(num), Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_num_arithmetic'] = function (block) {
    const operator = block.getFieldValue('OP') || 'ADD';

    const OPERATORS = {
        'ADD': [' + ', Python.ORDER_ADDITIVE],
        'MINUS': [' - ', Python.ORDER_SUBTRACTIVE],
        'MULTIPLY': [' * ', Python.ORDER_MULTIPLICATIVE],
        'DIVIDE': [' / ', Python.ORDER_DIVISION],
        'FLOOR_DIVIDE': [' // ', Python.ORDER_DIVISION],
        'MODULO': [' % ', Python.ORDER_MODULUS],
        'POWER': [' ** ', Python.ORDER_EXPONENTIATION],
    };

    const tuple = OPERATORS[operator];
    if (!tuple) {
        console.warn('Unknown operator in essentials_num_arithmetic:', operator);
        return ['0', Python.ORDER_ATOMIC];
    }

    const opToken = tuple[0];
    const order = tuple[1] ?? Python.ORDER_ATOMIC;
    // Ask children for code using the same precedence so Blockly wraps with
    // parentheses whenever needed. This improves BODMAS clarity.
    const A = Python.valueToCode(block, 'A', order) || '0';
    const B = Python.valueToCode(block, 'B', order) || '0';

    const code = `${A}${opToken}${B}`;
    return [code, order];
};

Python.forBlock['essentials_expr_group'] = function (block) {
    const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || '0';
    // Always wrap in parentheses; this is explicit grouping requested by the user.
    return [`(${expr})`, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_num_neg'] = function (block) {
    const num = Python.valueToCode(block, 'NUM', Python.ORDER_UNARY_SIGN) || '0';
    return [`-${num}`, Python.ORDER_UNARY_SIGN];
};

Python.forBlock['essentials_num_abs'] = function (block) {
    const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
    return [`abs(${num})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_round'] = function (block) {
    const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
    return [`round(${num})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_clamp'] = function (block) {
    const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
    const min = Python.valueToCode(block, 'MIN', Python.ORDER_NONE) || '0';
    const max = Python.valueToCode(block, 'MAX', Python.ORDER_NONE) || '0';
    return [`max(${min}, min(${num}, ${max}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_compare'] = function (block) {
    const a = Python.valueToCode(block, 'A', Python.ORDER_RELATIONAL) || '0';
    const b = Python.valueToCode(block, 'B', Python.ORDER_RELATIONAL) || '0';
    const op = block.getFieldValue('OP');
    const OPERATORS = {
        'EQ': '==',
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
    };
    return [`${a} ${OPERATORS[op]} ${b}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_num_min'] = function (block) {
    const a = Python.valueToCode(block, 'A', Python.ORDER_NONE) || '0';
    const b = Python.valueToCode(block, 'B', Python.ORDER_NONE) || '0';
    return [`min(${a}, ${b})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_max'] = function (block) {
    const a = Python.valueToCode(block, 'A', Python.ORDER_NONE) || '0';
    const b = Python.valueToCode(block, 'B', Python.ORDER_NONE) || '0';
    return [`max(${a}, ${b})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_rand_int'] = function (block) {
    Python.addImport('import random');
    const a = Python.valueToCode(block, 'A', Python.ORDER_NONE) || '0';
    const b = Python.valueToCode(block, 'B', Python.ORDER_NONE) || '0';
    return [`random.randint(${a}, ${b})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_rand_float'] = function (block) {
    Python.addImport('import random');
    return ['random.random()', Python.ORDER_FUNCTION_CALL];
};

// Additional Math blocks moved from python.js

Python.forBlock['math_decimal'] = function (block) {
    Python.addImport('from decimal import Decimal');
    const value = block.getFieldValue('VALUE');
    return [`Decimal('${value}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['math_random_item'] = function (block) {
    Python.addImport('import random');
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    return [`random.choice(${list})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['lists_shuffle_in_place'] = function (block) {
    Python.addImport('import random');
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    return `random.shuffle(${list})\n`;
};

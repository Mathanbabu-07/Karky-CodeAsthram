import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// ==================== CONTROL FLOW BLOCKS ====================

// Standard if block (Blockly built-in)
javaGenerator.forBlock['controls_if'] = function (block, generator) {
    let code = '';
    let n = 0;

    // Create if statement
    let conditionCode = generator.valueToCode(block, 'IF' + n, Order.NONE) || 'false';
    let branchCode = generator.statementToCode(block, 'DO' + n);
    code += `if (${conditionCode}) {\n${branchCode}}`;

    // Create else if statements
    for (n = 1; n <= (block.elseifCount_ || 0); n++) {
        conditionCode = generator.valueToCode(block, 'IF' + n, Order.NONE) || 'false';
        branchCode = generator.statementToCode(block, 'DO' + n);
        code += ` else if (${conditionCode}) {\n${branchCode}}`;
    }

    // Create else statement
    if (block.elseCount_) {
        branchCode = generator.statementToCode(block, 'ELSE');
        code += ` else {\n${branchCode}}`;
    }

    return code + '\n';
};

// Match/Switch block  
javaGenerator.forBlock['control_switch'] = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '0';
    let code = `switch (${value}) {\n`;

    // Get all cases
    for (let i = 0; i < (block.caseCount_ || 0); i++) {
        const caseValue = generator.valueToCode(block, 'CASE' + i, Order.NONE) || '0';
        const caseCode = generator.statementToCode(block, 'DO' + i);
        code += `    case ${caseValue}:\n${generator.prefixLines(caseCode, '        ')}        break;\n`;
    }

    // Default case
    if (block.defaultCount_) {
        const defaultCode = generator.statementToCode(block, 'DEFAULT');
        code += `    default:\n${generator.prefixLines(defaultCode, '        ')}        break;\n`;
    }

    code += '}\n';
    return code;
};

// ==================== TEXT BLOCKS ====================

// Text create/join (multiple inputs)
javaGenerator.forBlock['text_create_join_container'] = function (block, generator) {
    return null; // Container block, no code generation
};

javaGenerator.forBlock['text_create_join_item'] = function (block, generator) {
    return null; // Helper block, no code generation
};

// ==================== LIST BLOCKS ====================

// List create (Blockly's mutator-based)
javaGenerator.forBlock['lists_create_with_container'] = function (block, generator) {
    return null; // Container block
};

javaGenerator.forBlock['lists_create_with_item'] = function (block, generator) {
    return null; // Helper block
};

// List operations
javaGenerator.forBlock['lists_length'] = function (block, generator) {
    const list = generator.valueToCode(block, 'VALUE', Order.MEMBER) || 'new ArrayList<>()';
    return [`${list}.size()`, Order.MEMBER];
};

javaGenerator.forBlock['lists_isEmpty'] = function (block, generator) {
    const list = generator.valueToCode(block, 'VALUE', Order.MEMBER) || 'new ArrayList<>()';
    return [`${list}.isEmpty()`, Order.MEMBER];
};

javaGenerator.forBlock['lists_indexOf'] = function (block, generator) {
    const list = generator.valueToCode(block, 'VALUE', Order.MEMBER) || 'new ArrayList<>()';
    const item = generator.valueToCode(block, 'FIND', Order.NONE) || 'null';
    const mode = block.getFieldValue('END');

    if (mode === 'FIRST') {
        return [`${list}.indexOf(${item})`, Order.MEMBER];
    } else {
        return [`${list}.lastIndexOf(${item})`, Order.MEMBER];
    }
};

javaGenerator.forBlock['lists_getIndex'] = function (block, generator) {
    const list = generator.valueToCode(block, 'VALUE', Order.MEMBER) || 'new ArrayList<>()';
    const mode = block.getFieldValue('MODE');
    const where = block.getFieldValue('WHERE');

    let code;
    if (where === 'FROM_START') {
        const at = generator.valueToCode(block, 'AT', Order.NONE) || '0';
        if (mode === 'GET') {
            code = `${list}.get(${at})`;
            return [code, Order.MEMBER];
        } else if (mode === 'REMOVE') {
            code = `${list}.remove(${at})`;
            return code + ';\n';
        }
    } else if (where === 'FROM_END') {
        const at = generator.valueToCode(block, 'AT', Order.NONE) || '0';
        code = `${list}.get(${list}.size() - 1 - ${at})`;
        return [code, Order.MEMBER];
    } else if (where === 'FIRST') {
        if (mode === 'GET') {
            code = `${list}.get(0)`;
            return [code, Order.MEMBER];
        } else if (mode === 'REMOVE') {
            code = `${list}.remove(0)`;
            return code + ';\n';
        }
    } else if (where === 'LAST') {
        if (mode === 'GET') {
            code = `${list}.get(${list}.size() - 1)`;
            return [code, Order.MEMBER];
        } else if (mode === 'REMOVE') {
            code = `${list}.remove(${list}.size() - 1)`;
            return code + ';\n';
        }
    }

    return ['null', Order.ATOMIC];
};

javaGenerator.forBlock['lists_setIndex'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    const value = generator.valueToCode(block, 'TO', Order.NONE) || 'null';
    const where = block.getFieldValue('WHERE');
    const mode = block.getFieldValue('MODE');

    let code;
    if (where === 'FROM_START') {
        const at = generator.valueToCode(block, 'AT', Order.NONE) || '0';
        if (mode === 'SET') {
            code = `${list}.set(${at}, ${value})`;
        } else {
            code = `${list}.add(${at}, ${value})`;
        }
    } else if (where === 'FIRST') {
        if (mode === 'SET') {
            code = `${list}.set(0, ${value})`;
        } else {
            code = `${list}.add(0, ${value})`;
        }
    } else if (where === 'LAST') {
        if (mode === 'SET') {
            code = `${list}.set(${list}.size() - 1, ${value})`;
        } else {
            code = `${list}.add(${value})`;
        }
    }

    return code + ';\n';
};

// List from range
javaGenerator.forBlock['lists_range'] = function (block, generator) {
    const start = generator.valueToCode(block, 'START', Order.NONE) || '0';
    const end = generator.valueToCode(block, 'END', Order.NONE) || '10';
    const step = generator.valueToCode(block, 'STEP', Order.NONE) || '1';

    generator.addImport('java.util.stream.IntStream');
    generator.addImport('java.util.stream.Collectors');

    const code = `IntStream.iterate(${start}, n -> n < ${end}, n -> n + ${step}).boxed().collect(Collectors.toList())`;
    return [code, Order.FUNCTION_CALL];
};

// ==================== BOOLEAN BLOCKS ====================

javaGenerator.forBlock['logic_boolean'] = function (block, generator) {
    const value = block.getFieldValue('BOOL') === 'TRUE' ? 'true' : 'false';
    return [value, Order.ATOMIC];
};

javaGenerator.forBlock['logic_compare'] = function (block, generator) {
    const OPERATORS = {
        'EQ': ' == ',
        'NEQ': ' != ',
        'LT': ' < ',
        'LTE': ' <= ',
        'GT': ' > ',
        'GTE': ' >= '
    };
    const operator = OPERATORS[block.getFieldValue('OP')];
    const a = generator.valueToCode(block, 'A', Order.RELATIONAL) || '0';
    const b = generator.valueToCode(block, 'B', Order.RELATIONAL) || '0';
    return [a + operator + b, Order.RELATIONAL];
};

javaGenerator.forBlock['logic_operation'] = function (block, generator) {
    const operator = block.getFieldValue('OP') === 'AND' ? ' && ' : ' || ';
    const a = generator.valueToCode(block, 'A', Order.LOGICAL_AND) || 'false';
    const b = generator.valueToCode(block, 'B', Order.LOGICAL_AND) || 'false';
    return [a + operator + b, Order.LOGICAL_AND];
};

javaGenerator.forBlock['logic_negate'] = function (block, generator) {
    const value = generator.valueToCode(block, 'BOOL', Order.LOGICAL_NOT) || 'false';
    return ['!' + value, Order.LOGICAL_NOT];
};

// ==================== MATH BLOCKS ====================

javaGenerator.forBlock['math_number'] = function (block, generator) {
    const number = parseFloat(block.getFieldValue('NUM'));
    return [String(number), Order.ATOMIC];
};

javaGenerator.forBlock['math_arithmetic'] = function (block, generator) {
    const OPERATORS = {
        'ADD': [' + ', Order.ADDITION],
        'MINUS': [' - ', Order.SUBTRACTION],
        'MULTIPLY': [' * ', Order.MULTIPLICATION],
        'DIVIDE': [' / ', Order.DIVISION],
        'POWER': [null, Order.NONE] // Handled separately
    };
    const tuple = OPERATORS[block.getFieldValue('OP')];
    const operator = tuple[0];
    const order = tuple[1];
    const a = generator.valueToCode(block, 'A', order) || '0';
    const b = generator.valueToCode(block, 'B', order) || '0';

    if (!operator) {
        // Power operation
        return [`Math.pow(${a}, ${b})`, Order.FUNCTION_CALL];
    }

    return [a + operator + b, order];
};

javaGenerator.forBlock['math_modulo'] = function (block, generator) {
    const a = generator.valueToCode(block, 'DIVIDEND', Order.MODULUS) || '0';
    const b = generator.valueToCode(block, 'DIVISOR', Order.MODULUS) || '1';
    return [a + ' % ' + b, Order.MODULUS];
};

javaGenerator.forBlock['math_random_int'] = function (block, generator) {
    const from = generator.valueToCode(block, 'FROM', Order.NONE) || '0';
    const to = generator.valueToCode(block, 'TO', Order.NONE) || '100';
    generator.addImport('java.util.Random');
    const code = `(new Random().nextInt(${to} - ${from} + 1) + ${from})`;
    return [code, Order.FUNCTION_CALL];
};

javaGenerator.forBlock['math_random_float'] = function (block, generator) {
    generator.addImport('java.util.Random');
    return ['new Random().nextDouble()', Order.FUNCTION_CALL];
};

javaGenerator.forBlock['logic_null'] = function (block, generator) {
    return ['null', Order.ATOMIC];
};

javaGenerator.forBlock['logic_ternary'] = function (block, generator) {
    const condition = generator.valueToCode(block, 'IF', Order.CONDITIONAL) || 'false';
    const thenCode = generator.valueToCode(block, 'THEN', Order.CONDITIONAL) || 'null';
    const elseCode = generator.valueToCode(block, 'ELSE', Order.CONDITIONAL) || 'null';
    return [`(${condition}) ? ${thenCode} : ${elseCode}`, Order.CONDITIONAL];
};

// ==================== LOOP BLOCKS ====================

javaGenerator.forBlock['controls_repeat_ext'] = function (block, generator) {
    const repeats = generator.valueToCode(block, 'TIMES', Order.NONE) || '0';
    const branch = generator.statementToCode(block, 'DO');
    return `for (int i = 0; i < ${repeats}; i++) {\n${branch}}\n`;
};

javaGenerator.forBlock['controls_whileUntil'] = function (block, generator) {
    const until = block.getFieldValue('MODE') === 'UNTIL';
    let argument0 = generator.valueToCode(block, 'BOOL', Order.NONE) || 'false';
    if (until) {
        argument0 = '!' + argument0;
    }
    const branch = generator.statementToCode(block, 'DO');
    return `while (${argument0}) {\n${branch}}\n`;
};

javaGenerator.forBlock['controls_for'] = function (block, generator) {
    const varId = block.getFieldValue('VAR');
    const variable0 = generator.getVariableName ? generator.getVariableName(varId) : (block.getField('VAR') ? block.getField('VAR').getText() : (varId || 'i'));
    const argument0 = generator.valueToCode(block, 'FROM', Order.ASSIGNMENT) || '0';
    const argument1 = generator.valueToCode(block, 'TO', Order.ASSIGNMENT) || '0';
    const increment = generator.valueToCode(block, 'BY', Order.ASSIGNMENT) || '1';
    const branch = generator.statementToCode(block, 'DO');
    return `for (int ${variable0} = ${argument0}; ${variable0} <= ${argument1}; ${variable0} += ${increment}) {\n${branch}}\n`;
};

javaGenerator.forBlock['controls_forEach'] = function (block, generator) {
    const varId = block.getFieldValue('VAR');
    const variable0 = generator.getVariableName ? generator.getVariableName(varId) : (block.getField('VAR') ? block.getField('VAR').getText() : (varId || 'item'));
    const argument0 = generator.valueToCode(block, 'LIST', Order.ASSIGNMENT) || 'new ArrayList<>()';
    const branch = generator.statementToCode(block, 'DO');
    return `for (var ${variable0} : ${argument0}) {\n${branch}}\n`;
};

javaGenerator.forBlock['controls_flow_statements'] = function (block, generator) {
    const action = block.getFieldValue('FLOW');
    return action === 'BREAK' ? 'break;\n' : 'continue;\n';
};

// ==================== PROCEDURES BLOCKS ====================

javaGenerator.forBlock['procedures_defnoreturn'] = function (block, generator) {
    const funcName = block.getFieldValue('NAME') || 'myFunction';
    const branch = generator.statementToCode(block, 'STACK');
    const args = [];
    const variables = block.getVars ? block.getVars() : [];
    for (let i = 0; i < variables.length; i++) {
        args[i] = 'Object ' + variables[i];
    }
    return `public static void ${funcName}(${args.join(', ')}) {\n${branch}}\n`;
};

javaGenerator.forBlock['procedures_defreturn'] = function (block, generator) {
    const funcName = block.getFieldValue('NAME') || 'myFunction';
    const branch = generator.statementToCode(block, 'STACK');
    const returnValue = generator.valueToCode(block, 'RETURN', Order.NONE) || '';
    const returnStr = returnValue ? `    return ${returnValue};\n` : '';
    const args = [];
    const variables = block.getVars ? block.getVars() : [];
    for (let i = 0; i < variables.length; i++) {
        args[i] = 'Object ' + variables[i];
    }
    return `public static Object ${funcName}(${args.join(', ')}) {\n${branch}${returnStr}}\n`;
};

javaGenerator.forBlock['procedures_callnoreturn'] = function (block, generator) {
    const funcName = block.getFieldValue('NAME') || 'myFunction';
    const args = [];
    const variables = block.getVars ? block.getVars() : [];
    for (let i = 0; i < variables.length; i++) {
        args[i] = generator.valueToCode(block, 'ARG' + i, Order.NONE) || 'null';
    }
    return `${funcName}(${args.join(', ')});\n`;
};

javaGenerator.forBlock['procedures_callreturn'] = function (block, generator) {
    const funcName = block.getFieldValue('NAME') || 'myFunction';
    const args = [];
    const variables = block.getVars ? block.getVars() : [];
    for (let i = 0; i < variables.length; i++) {
        args[i] = generator.valueToCode(block, 'ARG' + i, Order.NONE) || 'null';
    }
    return [`${funcName}(${args.join(', ')})`, Order.FUNCTION_CALL];
};

export { javaGenerator };

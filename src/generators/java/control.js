import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Dedicated Java if/else block
javaGenerator.forBlock['java_if_else'] = function (block, generator) {
    const condition = generator.valueToCode(block, 'IF0', Order.NONE) || generator.valueToCode(block, 'CONDITION', Order.NONE) || 'false';
    const branch = generator.statementToCode(block, 'DO0') || generator.statementToCode(block, 'DO');
    return `if (${condition}) {\n${branch}}\n`;
};

// Dedicated Java do-while loop: do { ... } while (condition);
javaGenerator.forBlock['java_do_while'] = function (block, generator) {
    const branch = generator.statementToCode(block, 'DO');
    const condition = generator.valueToCode(block, 'CONDITION', Order.NONE) || generator.valueToCode(block, 'BOOL', Order.NONE) || 'false';
    return `do {\n${branch}} while (${condition});\n`;
};

// Dedicated Java break / continue
javaGenerator.forBlock['java_break_continue'] = function (block, generator) {
    const action = block.getFieldValue('ACTION') === 'CONTINUE' ? 'continue;' : 'break;';
    return `${action}\n`;
};

// If/Else block (generic if_block)
javaGenerator.forBlock['if_block'] = function (block, generator) {
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

// Match/Switch statement
javaGenerator.forBlock['control_match'] = function (block, generator) {
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

// Conditional expression (control_condition_expr)
javaGenerator.forBlock['control_condition_expr'] = function (block, generator) {
    const OPERATORS = {
        'EQ': ' == ',
        'NEQ': ' != ',
        'LT': ' < ',
        'LTE': ' <= ',
        'GT': ' > ',
        'GTE': ' >= ',
        'IS': ' == ',
        'IS_NOT': ' != '
    };
    const opKey = block.getFieldValue('OP');
    const a = generator.valueToCode(block, 'A', Order.RELATIONAL) || '0';
    const b = generator.valueToCode(block, 'B', Order.RELATIONAL) || '0';

    if (opKey === 'IN') {
        return [`${b}.contains(${a})`, Order.MEMBER];
    } else if (opKey === 'NOT_IN') {
        return [`!${b}.contains(${a})`, Order.LOGICAL_NOT];
    }

    const op = OPERATORS[opKey] || ' == ';
    return [`${a}${op}${b}`, Order.RELATIONAL];
};

// Logical combine (control_logical_combine)
javaGenerator.forBlock['control_logical_combine'] = function (block, generator) {
    const opKey = block.getFieldValue('LOGICAL_OP') || block.getFieldValue('OP');
    const left = generator.valueToCode(block, 'LEFT', Order.LOGICAL_AND) || generator.valueToCode(block, 'ITEM0', Order.LOGICAL_AND) || 'false';
    if (opKey === 'NOT') {
        return [`!(${left})`, Order.LOGICAL_NOT];
    }
    const right = generator.valueToCode(block, 'RIGHT', Order.LOGICAL_AND) || generator.valueToCode(block, 'ITEM1', Order.LOGICAL_AND) || 'false';
    const op = opKey === 'OR' ? ' || ' : ' && ';
    return [`(${left}${op}${right})`, Order.LOGICAL_AND];
};

// If main (public static void main)
javaGenerator.forBlock['control_if_main'] = function (block, generator) {
    const branch = generator.statementToCode(block, 'DO');
    return branch;
};

// Pass/No-op
javaGenerator.forBlock['control_pass_simple'] = function (block, generator) {
    return '// No operation\n';
};

// If truthy check (control_if_truthy)
javaGenerator.forBlock['control_if_truthy'] = function (block, generator) {
    const value = generator.valueToCode(block, 'EXPR', Order.NONE) || generator.valueToCode(block, 'VALUE', Order.NONE) || 'false';
    const branch = generator.statementToCode(block, 'DO');
    return `if (${value}) {\n${branch}}\n`;
};

export { javaGenerator };

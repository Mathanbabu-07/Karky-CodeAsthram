import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// If/Else block
javaGenerator.forBlock['if_block'] = function (block, generator) {
    let code = '';
    let n = 0;

    // Create if statement
    let conditionCode = generator.valueToCode(block, 'IF' + n, Order.NONE) || 'false';
    let branchCode = generator.statementToCode(block, 'DO' + n);
    code += `if (${conditionCode}) {\n${branchCode}}`;

    // Create else if statements
    for (n = 1; n <= block.elseifCount_; n++) {
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
    for (let i = 0; i < block.caseCount_; i++) {
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

// Conditional expression (ternary)
javaGenerator.forBlock['control_condition_expr'] = function (block, generator) {
    const condition = generator.valueToCode(block, 'CONDITION', Order.CONDITIONAL) || 'false';
    const trueValue = generator.valueToCode(block, 'TRUE', Order.CONDITIONAL) || '""';
    const falseValue = generator.valueToCode(block, 'FALSE', Order.CONDITIONAL) || '""';
    return [`(${condition}) ? ${trueValue} : ${falseValue}`, Order.CONDITIONAL];
};

// Logical combine (complex conditions)
javaGenerator.forBlock['control_logical_combine'] = function (block, generator) {
    const op = block.getFieldValue('OP') === 'AND' ? ' && ' : ' || ';
    const conditions = [];

    for (let i = 0; i < block.itemCount_; i++) {
        const condition = generator.valueToCode(block, 'ITEM' + i, Order.LOGICAL_AND) || 'false';
        conditions.push(condition);
    }

    return ['(' + conditions.join(op) + ')', Order.LOGICAL_AND];
};

// If main (public static void main)
javaGenerator.forBlock['control_if_main'] = function (block, generator) {
    const branch = generator.statementToCode(block, 'DO');
    // This is already wrapped by the generator, so just return the code
    return branch;
};

// Pass/No-op
javaGenerator.forBlock['control_pass_simple'] = function (block, generator) {
    return '// No operation\n';
};

// If truthy check
javaGenerator.forBlock['control_if_truthy'] = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 'null';
    const code = `if (${value} != null) {\n`;
    const branch = generator.statementToCode(block, 'DO');
    return code + branch + '}\n';
};

export { javaGenerator };

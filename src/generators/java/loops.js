import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Dedicated Java index-based for loop
javaGenerator.forBlock['java_for_loop'] = function (block, generator) {
    const variable = block.getFieldValue('VAR') || 'i';
    const from = generator.valueToCode(block, 'FROM', Order.NONE) || '0';
    const to = generator.valueToCode(block, 'TO', Order.NONE) || '10';
    const by = generator.valueToCode(block, 'BY', Order.NONE) || '1';
    const branch = generator.statementToCode(block, 'DO');
    return `for (int ${variable} = ${from}; ${variable} < ${to}; ${variable} += ${by}) {\n${branch}}\n`;
};

// Dedicated Java enhanced foreach loop
javaGenerator.forBlock['java_foreach'] = function (block, generator) {
    const type = block.getFieldValue('TYPE') || 'var';
    const variable = block.getFieldValue('VAR') || 'item';
    const collection = generator.valueToCode(block, 'COLLECTION', Order.NONE) || 'list';
    const branch = generator.statementToCode(block, 'DO');
    return `for (${type} ${variable} : ${collection}) {\n${branch}}\n`;
};

// Repeat N times
javaGenerator.forBlock['controls_repeat_ext'] = function (block, generator) {
    const times = generator.valueToCode(block, 'TIMES', Order.NONE) || '10';
    const branch = generator.statementToCode(block, 'DO');
    const loopVar = generator.nameDB_.getDistinctName('i', 'VARIABLE');

    const code = `for (int ${loopVar} = 0; ${loopVar} < ${times}; ${loopVar}++) {\n${branch}}\n`;
    return code;
};

// While/Until loop
javaGenerator.forBlock['controls_whileUntil'] = function (block, generator) {
    const mode = block.getFieldValue('MODE');
    const condition = generator.valueToCode(block, 'BOOL', Order.NONE) || 'false';
    const branch = generator.statementToCode(block, 'DO');

    const actualCondition = mode === 'UNTIL' ? `!(${condition})` : condition;
    const code = `while (${actualCondition}) {\n${branch}}\n`;
    return code;
};

// For loop with range
javaGenerator.forBlock['controls_for'] = function (block, generator) {
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
    const from = generator.valueToCode(block, 'FROM', Order.NONE) || '0';
    const to = generator.valueToCode(block, 'TO', Order.NONE) || '10';
    const by = generator.valueToCode(block, 'BY', Order.NONE) || '1';
    const branch = generator.statementToCode(block, 'DO');

    const code = `for (int ${variable} = ${from}; ${variable} <= ${to}; ${variable} += ${by}) {\n${branch}}\n`;
    return code;
};

// For each loop
javaGenerator.forBlock['controls_forEach'] = function (block, generator) {
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
    const list = generator.valueToCode(block, 'LIST', Order.NONE) || 'new ArrayList<>()';
    const branch = generator.statementToCode(block, 'DO');

    // Use var for type inference (Java 10+)
    const code = `for (var ${variable} : ${list}) {\n${branch}}\n`;
    return code;
};

// Break/Continue
javaGenerator.forBlock['controls_flow_statements'] = function (block, generator) {
    const flowType = block.getFieldValue('FLOW');
    return flowType === 'BREAK' ? 'break;\n' : 'continue;\n';
};

javaGenerator.forBlock['control_flow_break_continue'] = function (block, generator) {
    const flowType = block.getFieldValue('FLOW');
    return flowType === 'BREAK' ? 'break;\n' : 'continue;\n';
};

// Indexed for loop
javaGenerator.forBlock['control_for_indexed'] = function (block, generator) {
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
    const indexVar = generator.nameDB_.getName(block.getFieldValue('INDEX'), 'VARIABLE');
    const list = generator.valueToCode(block, 'LIST', Order.NONE) || 'new ArrayList<>()';
    const branch = generator.statementToCode(block, 'DO');

    const code = `for (int ${indexVar} = 0; ${indexVar} < ${list}.size(); ${indexVar}++) {\n` +
        `    var ${variable} = ${list}.get(${indexVar});\n${branch}}\n`;
    return code;
};

// While true (infinite loop)
javaGenerator.forBlock['control_while_true_inline'] = function (block, generator) {
    const branch = generator.statementToCode(block, 'DO');
    return `while (true) {\n${branch}}\n`;
};

// For zip (iterate two lists together)
javaGenerator.forBlock['control_for_zip'] = function (block, generator) {
    const var1 = generator.nameDB_.getName(block.getFieldValue('VAR1'), 'VARIABLE');
    const var2 = generator.nameDB_.getName(block.getFieldValue('VAR2'), 'VARIABLE');
    const list1 = generator.valueToCode(block, 'LIST1', Order.NONE) || 'new ArrayList<>()';
    const list2 = generator.valueToCode(block, 'LIST2', Order.NONE) || 'new ArrayList<>()';
    const branch = generator.statementToCode(block, 'DO');

    const indexVar = generator.nameDB_.getDistinctName('i', 'VARIABLE');
    const code = `for (int ${indexVar} = 0; ${indexVar} < Math.min(${list1}.size(), ${list2}.size()); ${indexVar}++) {\n` +
        `    var ${var1} = ${list1}.get(${indexVar});\n` +
        `    var ${var2} = ${list2}.get(${indexVar});\n${branch}}\n`;
    return code;
};

export { javaGenerator };

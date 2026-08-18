import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

function getValue(generator, block, order, ...names) {
    for (const name of names) {
        if (block.getInput(name)) {
            return generator.valueToCode(block, name, order) || '';
        }
    }
    return '';
}

function getStatement(generator, block, ...names) {
    for (const name of names) {
        if (block.getInput(name)) {
            return generator.statementToCode(block, name) || '';
        }
    }
    return '';
}

// Dedicated Java index-based for loop
javaGenerator.forBlock['java_for_loop'] = function (block, generator) {
    const variable = block.getFieldValue('VAR') || 'i';
    const from = getValue(generator, block, Order.NONE, 'FROM', 'START') || '0';
    const to = getValue(generator, block, Order.NONE, 'TO', 'END') || '10';
    const by = getValue(generator, block, Order.NONE, 'BY', 'STEP') || '1';
    const branch = getStatement(generator, block, 'DO', 'STACK', 'BODY');
    return `for (int ${variable} = ${from}; ${variable} < ${to}; ${variable} += ${by}) {\n${branch}}\n`;
};

// Dedicated Java enhanced foreach loop
javaGenerator.forBlock['java_foreach'] = function (block, generator) {
    const type = block.getFieldValue('TYPE') || 'var';
    const variable = block.getFieldValue('VAR') || 'item';
    const collection = getValue(generator, block, Order.NONE, 'COLLECTION', 'LIST', 'TARGET') || 'list';
    const branch = getStatement(generator, block, 'DO', 'STACK', 'BODY');
    return `for (${type} ${variable} : ${collection}) {\n${branch}}\n`;
};

// Repeat N times
javaGenerator.forBlock['controls_repeat_ext'] = function (block, generator) {
    const times = getValue(generator, block, Order.NONE, 'TIMES', 'NUM', 'VALUE') || '10';
    const branch = getStatement(generator, block, 'DO', 'STACK', 'BODY');
    const loopVar = generator.nameDB_.getDistinctName('i', 'VARIABLE');
    return `for (int ${loopVar} = 0; ${loopVar} < ${times}; ${loopVar}++) {\n${branch}}\n`;
};

// While/Until loop
javaGenerator.forBlock['controls_whileUntil'] = function (block, generator) {
    const mode = block.getFieldValue('MODE');
    const condition = getValue(generator, block, Order.NONE, 'BOOL', 'CONDITION', 'IF') || 'false';
    const branch = getStatement(generator, block, 'DO', 'STACK', 'BODY');
    const actualCondition = mode === 'UNTIL' ? `!(${condition})` : condition;
    return `while (${actualCondition}) {\n${branch}}\n`;
};

// For loop with range
javaGenerator.forBlock['controls_for'] = function (block, generator) {
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
    const from = getValue(generator, block, Order.NONE, 'FROM', 'START') || '0';
    const to = getValue(generator, block, Order.NONE, 'TO', 'END') || '10';
    const by = getValue(generator, block, Order.NONE, 'BY', 'STEP') || '1';
    const branch = getStatement(generator, block, 'DO', 'STACK', 'BODY');
    return `for (int ${variable} = ${from}; ${variable} <= ${to}; ${variable} += ${by}) {\n${branch}}\n`;
};

// For each loop
javaGenerator.forBlock['controls_forEach'] = function (block, generator) {
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
    const list = getValue(generator, block, Order.NONE, 'LIST', 'COLLECTION') || 'new ArrayList<>()';
    const branch = getStatement(generator, block, 'DO', 'STACK', 'BODY');
    return `for (var ${variable} : ${list}) {\n${branch}}\n`;
};

// Break/Continue
javaGenerator.forBlock['controls_flow_statements'] = function (block, generator) {
    const flowType = block.getFieldValue('FLOW');
    return flowType === 'BREAK' ? 'break;\n' : 'continue;\n';
};

javaGenerator.forBlock['control_flow_break_continue'] = function (block, generator) {
    const flowType = block.getFieldValue('FLOW') || block.getFieldValue('ACTION');
    return flowType === 'CONTINUE' ? 'continue;\n' : 'break;\n';
};

// Indexed for loop
javaGenerator.forBlock['control_for_indexed'] = function (block, generator) {
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
    const indexVar = generator.nameDB_.getName(block.getFieldValue('INDEX') || 'i', 'VARIABLE');
    const list = getValue(generator, block, Order.NONE, 'LIST', 'ITER') || 'new ArrayList<>()';
    const branch = getStatement(generator, block, 'DO', 'STACK', 'BODY');
    return `for (int ${indexVar} = 0; ${indexVar} < ${list}.size(); ${indexVar}++) {\n` +
        `    var ${variable} = ${list}.get(${indexVar});\n${branch}}\n`;
};

// While true (infinite loop)
javaGenerator.forBlock['control_while_true_inline'] = function (block, generator) {
    const branch = getStatement(generator, block, 'DO', 'STACK', 'BODY');
    return `while (true) {\n${branch}}\n`;
};

// For zip (iterate two lists together)
javaGenerator.forBlock['control_for_zip'] = function (block, generator) {
    const var1 = generator.nameDB_.getName(block.getFieldValue('VAR1') || 'item1', 'VARIABLE');
    const var2 = generator.nameDB_.getName(block.getFieldValue('VAR2') || 'item2', 'VARIABLE');
    const list1 = getValue(generator, block, Order.NONE, 'LIST1', 'A') || 'new ArrayList<>()';
    const list2 = getValue(generator, block, Order.NONE, 'LIST2', 'B') || 'new ArrayList<>()';
    const branch = getStatement(generator, block, 'DO', 'STACK', 'BODY');

    const indexVar = generator.nameDB_.getDistinctName('i', 'VARIABLE');
    return `for (int ${indexVar} = 0; ${indexVar} < Math.min(${list1}.size(), ${list2}.size()); ${indexVar}++) {\n` +
        `    var ${var1} = ${list1}.get(${indexVar});\n` +
        `    var ${var2} = ${list2}.get(${indexVar});\n${branch}}\n`;
};

export { javaGenerator };

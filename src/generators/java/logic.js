import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Boolean literals
javaGenerator.forBlock['essentials_bool_true'] = function (block, generator) {
    return ['true', Order.ATOMIC];
};

javaGenerator.forBlock['essentials_bool_false'] = function (block, generator) {
    return ['false', Order.ATOMIC];
};

// Logical AND
javaGenerator.forBlock['essentials_logic_and'] = function (block, generator) {
    const a = generator.valueToCode(block, 'A', Order.LOGICAL_AND) || 'false';
    const b = generator.valueToCode(block, 'B', Order.LOGICAL_AND) || 'false';
    return [a + ' && ' + b, Order.LOGICAL_AND];
};

// Logical OR
javaGenerator.forBlock['essentials_logic_or'] = function (block, generator) {
    const a = generator.valueToCode(block, 'A', Order.LOGICAL_OR) || 'false';
    const b = generator.valueToCode(block, 'B', Order.LOGICAL_OR) || 'false';
    return [a + ' || ' + b, Order.LOGICAL_OR];
};

// Logical NOT
javaGenerator.forBlock['essentials_logic_not'] = function (block, generator) {
    const bInput = block.getInput('BOOL') ? 'BOOL' : (block.getInput('VALUE') ? 'VALUE' : null);
    const value = bInput ? (generator.valueToCode(block, bInput, Order.LOGICAL_NOT) || 'false') : 'false';
    return ['!' + value, Order.LOGICAL_NOT];
};

// Comparison (equals, not equals)
javaGenerator.forBlock['essentials_compare'] = function (block, generator) {
    const OPERATORS = {
        'EQ': ' == ',
        'NEQ': ' != '
    };
    const operator = OPERATORS[block.getFieldValue('OP')] || ' == ';
    const a = generator.valueToCode(block, 'A', Order.EQUALITY) || 'null';
    const b = generator.valueToCode(block, 'B', Order.EQUALITY) || 'null';
    return [a + operator + b, Order.EQUALITY];
};

// In operator (contains)
javaGenerator.forBlock['essentials_in_operator'] = function (block, generator) {
    const itemInput = block.getInput('ITEM') ? 'ITEM' : (block.getInput('MEMBER') ? 'MEMBER' : (block.getInput('ELEMENT') ? 'ELEMENT' : (block.getInput('A') ? 'A' : null)));
    const item = itemInput ? (generator.valueToCode(block, itemInput, Order.NONE) || '""') : '""';
    const collInput = block.getInput('COLLECTION') ? 'COLLECTION' : (block.getInput('LIST') ? 'LIST' : (block.getInput('CONTAINER') ? 'CONTAINER' : (block.getInput('B') ? 'B' : null)));
    const collection = collInput ? (generator.valueToCode(block, collInput, Order.MEMBER) || '""') : '""';

    const code = `${collection}.contains(${item})`;
    return [code, Order.MEMBER];
};

// Not in operator
javaGenerator.forBlock['essentials_not_in_operator'] = function (block, generator) {
    const itemInput = block.getInput('ITEM') ? 'ITEM' : (block.getInput('MEMBER') ? 'MEMBER' : (block.getInput('ELEMENT') ? 'ELEMENT' : (block.getInput('A') ? 'A' : null)));
    const item = itemInput ? (generator.valueToCode(block, itemInput, Order.NONE) || '""') : '""';
    const collInput = block.getInput('COLLECTION') ? 'COLLECTION' : (block.getInput('LIST') ? 'LIST' : (block.getInput('CONTAINER') ? 'CONTAINER' : (block.getInput('B') ? 'B' : null)));
    const collection = collInput ? (generator.valueToCode(block, collInput, Order.MEMBER) || '""') : '""';
    const code = `!${collection}.contains(${item})`;
    return [code, Order.LOGICAL_NOT];
};

// Ternary operator
javaGenerator.forBlock['essentials_ternary'] = function (block, generator) {
    const condInput = block.getInput('CONDITION') ? 'CONDITION' : (block.getInput('IF') ? 'IF' : null);
    const condition = condInput ? (generator.valueToCode(block, condInput, Order.CONDITIONAL) || 'false') : 'false';
    const tInput = block.getInput('TRUE') ? 'TRUE' : (block.getInput('THEN') ? 'THEN' : null);
    const trueValue = tInput ? (generator.valueToCode(block, tInput, Order.CONDITIONAL) || 'null') : 'null';
    const fInput = block.getInput('FALSE') ? 'FALSE' : (block.getInput('ELSE') ? 'ELSE' : null);
    const falseValue = fInput ? (generator.valueToCode(block, fInput, Order.CONDITIONAL) || 'null') : 'null';
    const code = `(${condition}) ? ${trueValue} : ${falseValue}`;
    return [code, Order.CONDITIONAL];
};

// Assert
javaGenerator.forBlock['essentials_assert'] = function (block, generator) {
    const condInput = block.getInput('CONDITION') ? 'CONDITION' : (block.getInput('IF') ? 'IF' : null);
    const condition = condInput ? (generator.valueToCode(block, condInput, Order.NONE) || 'true') : 'true';
    const msgInput = block.getInput('MESSAGE') ? 'MESSAGE' : (block.getInput('MSG') ? 'MSG' : null);
    const message = msgInput ? generator.valueToCode(block, msgInput, Order.NONE) : null;

    if (message) {
        return `assert ${condition} : ${message};\n`;
    }
    return `assert ${condition};\n`;
};

// Additional logic control blocks
javaGenerator.forBlock['control_match'] = function (block, generator) {
    const vInput = block.getInput('VALUE') ? 'VALUE' : (block.getInput('EXPR') ? 'EXPR' : null);
    const val = vInput ? (generator.valueToCode(block, vInput, Order.NONE) || 'null') : 'null';
    const cases = generator.statementToCode(block, 'CASES') || '';
    return `switch (${val}) {\n${cases}}\n`;
};

javaGenerator.forBlock['control_logical_combine'] = function (block, generator) {
    const op = block.getFieldValue('OP') || 'AND';
    const elements = [];
    let i = 0;
    while (block.getInput('ITEM' + i) || block.getInput('ADD' + i)) {
        const inp = block.getInput('ITEM' + i) ? ('ITEM' + i) : ('ADD' + i);
        elements.push(generator.valueToCode(block, inp, Order.NONE) || 'false');
        i++;
    }
    const sep = op === 'OR' ? ' || ' : ' && ';
    if (elements.length === 0) return ['true', Order.ATOMIC];
    return [elements.join(sep), Order.LOGICAL_AND];
};

javaGenerator.forBlock['control_if_truthy'] = function (block, generator) {
    const vInput = block.getInput('VALUE') ? 'VALUE' : (block.getInput('VAL') ? 'VAL' : (block.getInput('EXPR') ? 'EXPR' : null));
    const val = vInput ? (generator.valueToCode(block, vInput, Order.NONE) || 'false') : 'false';
    const branch = generator.statementToCode(block, 'DO') || generator.statementToCode(block, 'STACK') || '';
    return `if (${val} != null && !Boolean.FALSE.equals(${val})) {\n${branch}}\n`;
};

export { javaGenerator };

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
    const value = generator.valueToCode(block, 'BOOL', Order.LOGICAL_NOT) || 'false';
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
    const item = generator.valueToCode(block, 'ITEM', Order.NONE) || '""';
    const collection = generator.valueToCode(block, 'COLLECTION', Order.MEMBER) || '""';

    // Try to detect if it's a String (use contains) or Collection (use contains)
    const code = `${collection}.contains(${item})`;
    return [code, Order.MEMBER];
};

// Not in operator
javaGenerator.forBlock['essentials_not_in_operator'] = function (block, generator) {
    const item = generator.valueToCode(block, 'ITEM', Order.NONE) || '""';
    const collection = generator.valueToCode(block, 'COLLECTION', Order.MEMBER) || '""';
    const code = `!${collection}.contains(${item})`;
    return [code, Order.LOGICAL_NOT];
};

// Ternary operator
javaGenerator.forBlock['essentials_ternary'] = function (block, generator) {
    const condition = generator.valueToCode(block, 'CONDITION', Order.CONDITIONAL) || 'false';
    const trueValue = generator.valueToCode(block, 'TRUE', Order.CONDITIONAL) || 'null';
    const falseValue = generator.valueToCode(block, 'FALSE', Order.CONDITIONAL) || 'null';
    const code = `(${condition}) ? ${trueValue} : ${falseValue}`;
    return [code, Order.CONDITIONAL];
};

// Assert
javaGenerator.forBlock['essentials_assert'] = function (block, generator) {
    const condition = generator.valueToCode(block, 'CONDITION', Order.NONE) || 'true';
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE);

    if (message) {
        return `assert ${condition} : ${message};\n`;
    }
    return `assert ${condition};\n`;
};

export { javaGenerator };

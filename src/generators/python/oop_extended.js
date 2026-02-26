import { pythonGenerator as Python } from 'blockly/python';

// ==============================================================================
// OOP Extended Generators - Object Member Access & Method Calls
// ==============================================================================

// Issue 1: Set object attribute using self
Python.forBlock['oop_self_set_attribute'] = function (block) {
    const attr = block.getFieldValue('ATTR') || 'attribute';
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    return `self.${attr} = ${value}\n`;
};

// Issue 1: Get object attribute using self
Python.forBlock['oop_self_get_attribute'] = function (block) {
    const attr = block.getFieldValue('ATTR') || 'attribute';
    return [`self.${attr}`, Python.ORDER_MEMBER];
};

// Issue 2: Call method on self (expression)
Python.forBlock['oop_self_call_method'] = function (block) {
    const method = block.getFieldValue('METHOD') || 'method';
    const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '';

    // Handle different argument formats
    let argsStr = '';
    if (args && args !== '[]') {
        // If args is a list literal, unpack it
        if (args.startsWith('[') && args.endsWith(']')) {
            const innerArgs = args.slice(1, -1).trim();
            argsStr = innerArgs;
        } else {
            argsStr = args;
        }
    }

    return [`self.${method}(${argsStr})`, Python.ORDER_FUNCTION_CALL];
};

// Issue 2: Call method on self (statement)
Python.forBlock['oop_self_call_method_statement'] = function (block) {
    const method = block.getFieldValue('METHOD') || 'method';
    const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '';

    // Handle different argument formats
    let argsStr = '';
    if (args && args !== '[]') {
        // If args is a list literal, unpack it
        if (args.startsWith('[') && args.endsWith(']')) {
            const innerArgs = args.slice(1, -1).trim();
            argsStr = innerArgs;
        } else {
            argsStr = args;
        }
    }

    return `self.${method}(${argsStr})\n`;
};

// Issue 4: Call method on object (expression)
Python.forBlock['oop_object_call_method'] = function (block) {
    const object = Python.valueToCode(block, 'OBJECT', Python.ORDER_MEMBER) || 'obj';
    const method = block.getFieldValue('METHOD') || 'method';
    const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '';

    // Handle different argument formats
    let argsStr = '';
    if (args && args !== '[]') {
        // If args is a list literal, unpack it
        if (args.startsWith('[') && args.endsWith(']')) {
            const innerArgs = args.slice(1, -1).trim();
            argsStr = innerArgs;
        } else {
            argsStr = args;
        }
    }

    return [`${object}.${method}(${argsStr})`, Python.ORDER_FUNCTION_CALL];
};

// Issue 4: Call method on object (statement)
Python.forBlock['oop_object_call_method_statement'] = function (block) {
    const object = Python.valueToCode(block, 'OBJECT', Python.ORDER_MEMBER) || 'obj';
    const method = block.getFieldValue('METHOD') || 'method';
    const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '';

    // Handle different argument formats
    let argsStr = '';
    if (args && args !== '[]') {
        // If args is a list literal, unpack it
        if (args.startsWith('[') && args.endsWith(']')) {
            const innerArgs = args.slice(1, -1).trim();
            argsStr = innerArgs;
        } else {
            argsStr = args;
        }
    }

    return `${object}.${method}(${argsStr})\n`;
};

// Set attribute on any object
Python.forBlock['oop_object_set_attribute'] = function (block) {
    const object = Python.valueToCode(block, 'OBJECT', Python.ORDER_MEMBER) || 'obj';
    const attr = block.getFieldValue('ATTR') || 'attribute';
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    return `${object}.${attr} = ${value}\n`;
};

// Get attribute from any object
Python.forBlock['oop_object_get_attribute'] = function (block) {
    const object = Python.valueToCode(block, 'OBJECT', Python.ORDER_MEMBER) || 'obj';
    const attr = block.getFieldValue('ATTR') || 'attribute';
    return [`${object}.${attr}`, Python.ORDER_MEMBER];
};

// Issue 3: Return statement (can be used anywhere including inside conditionals)
Python.forBlock['oop_return_conditional'] = function (block) {
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    return `return ${value}\n`;
};

// Issue 5: Custom expression
Python.forBlock['oop_custom_expression'] = function (block) {
    const code = block.getFieldValue('CODE') || 'None';
    return [code, Python.ORDER_ATOMIC];
};

// Issue 5: Custom statement
Python.forBlock['oop_custom_statement'] = function (block) {
    const code = block.getFieldValue('CODE') || 'pass';
    return `${code}\n`;
};

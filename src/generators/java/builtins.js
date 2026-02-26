import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Blockly's built-in tuple/list creation blocks
javaGenerator.forBlock['lists_create_with'] = function (block, generator) {
    generator.addImport('java.util.ArrayList');
    generator.addImport('java.util.Arrays');

    const elements = [];
    for (let i = 0; i < block.itemCount_; i++) {
        const element = generator.valueToCode(block, 'ADD' + i, Order.NONE) || 'null';
        elements.push(element);
    }

    if (elements.length === 0) {
        return ['new ArrayList<>()', Order.FUNCTION_CALL];
    }

    const code = `new ArrayList<>(Arrays.asList(${elements.join(', ')}))`;
    return [code, Order.FUNCTION_CALL];
};

// Create tuple (Java uses arrays for tuples)
javaGenerator.forBlock['tuples_create_with'] = function (block, generator) {
    const elements = [];
    for (let i = 0; i < block.itemCount_; i++) {
        const element = generator.valueToCode(block, 'ADD' + i, Order.NONE) || 'null';
        elements.push(element);
    }

    const code = `new Object[]{${elements.join(', ')}}`;
    return [code, Order.ATOMIC];
};

// Text join/create
javaGenerator.forBlock['text_join'] = function (block, generator) {
    const elements = [];
    for (let i = 0; i < block.itemCount_; i++) {
        const element = generator.valueToCode(block, 'ADD' + i, Order.NONE) || '""';
        elements.push(element);
    }

    if (elements.length === 0) {
        return ['""', Order.ATOMIC];
    }

    const code = elements.join(' + ');
    return [code, Order.ADDITION];
};

// Text create (same as join)
javaGenerator.forBlock['text_create_join_container'] = javaGenerator.forBlock['text_join'];
javaGenerator.forBlock['text_create_join_item'] = function (block, generator) {
    return null; // This is a helper block
};

// Dictionary/map comprehension (convert to Stream operations)
javaGenerator.forBlock['dicts_create_with'] = function (block, generator) {
    generator.addImport('java.util.HashMap');

    const elements = [];
    for (let i = 0; i < block.itemCount_; i++) {
        const key = generator.valueToCode(block, 'KEY' + i, Order.NONE) || '""';
        const value = generator.valueToCode(block, 'VALUE' + i, Order.NONE) || 'null';
        elements.push(`put(${key}, ${value})`);
    }

    if (elements.length === 0) {
        return ['new HashMap<>()', Order.FUNCTION_CALL];
    }

    const code = `new HashMap<>() {{ ${elements.join('; ')}; }}`;
    return [code, Order.FUNCTION_CALL];
};

// List comprehension (convert to Stream)
javaGenerator.forBlock['controls_list_comprehension'] = function (block, generator) {
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    const list = generator.valueToCode(block, 'LIST', Order.NONE) || 'new ArrayList<>()';
    const expression = generator.valueToCode(block, 'EXPRESSION', Order.NONE) || variable;
    const condition = generator.valueToCode(block, 'CONDITION', Order.NONE);

    generator.addImport('java.util.stream.Collectors');

    let code;
    if (condition) {
        code = `${list}.stream().filter(${variable} -> ${condition}).map(${variable} -> ${expression}).collect(Collectors.toList())`;
    } else {
        code = `${list}.stream().map(${variable} -> ${expression}).collect(Collectors.toList())`;
    }

    return [code, Order.FUNCTION_CALL];
};

// Dict comprehension
javaGenerator.forBlock['controls_dict_comprehension'] = function (block, generator) {
    const keyVar = generator.nameDB_.getName(block.getFieldValue('KEY_VAR'), Blockly.Names.NameType.VARIABLE);
    const valueVar = generator.nameDB_.getName(block.getFieldValue('VALUE_VAR'), Blockly.Names.NameType.VARIABLE);
    const list = generator.valueToCode(block, 'LIST', Order.NONE) || 'new ArrayList<>()';
    const keyExpr = generator.valueToCode(block, 'KEY_EXPR', Order.NONE) || keyVar;
    const valueExpr = generator.valueToCode(block, 'VALUE_EXPR', Order.NONE) || valueVar;
    const condition = generator.valueToCode(block, 'CONDITION', Order.NONE);

    generator.addImport('java.util.stream.Collectors');

    let code;
    if (condition) {
        code = `${list}.stream().filter(item -> ${condition}).collect(Collectors.toMap(item -> ${keyExpr}, item -> ${valueExpr}))`;
    } else {
        code = `${list}.stream().collect(Collectors.toMap(item -> ${keyExpr}, item -> ${valueExpr}))`;
    }

    return [code, Order.FUNCTION_CALL];
};

// Null/None value
javaGenerator.forBlock['logic_null'] = function (block, generator) {
    return ['null', Order.ATOMIC];
};

javaGenerator.forBlock['essentials_none'] = function (block, generator) {
    return ['null', Order.ATOMIC];
};

export { javaGenerator };

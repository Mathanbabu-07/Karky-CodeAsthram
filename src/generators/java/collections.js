import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Dedicated Java HashMap creation: new HashMap<Key, Val>()
javaGenerator.forBlock['java_hashmap_create'] = function (block, generator) {
    generator.addImport('java.util.HashMap');
    const kType = block.getFieldValue('KEY_TYPE') || 'String';
    const vType = block.getFieldValue('VAL_TYPE') || 'String';
    return [`new HashMap<${kType}, ${vType}>()`, Order.FUNCTION_CALL];
};

// Dedicated Java HashMap put: map.put(k, v);
javaGenerator.forBlock['java_hashmap_put'] = function (block, generator) {
    generator.addImport('java.util.HashMap');
    const map = generator.valueToCode(block, 'MAP', Order.MEMBER) || 'map';
    const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 'null';
    return `${map}.put(${key}, ${value});\n`;
};

// Dedicated Java HashMap get: map.get(k)
javaGenerator.forBlock['java_hashmap_get'] = function (block, generator) {
    const map = generator.valueToCode(block, 'MAP', Order.MEMBER) || 'map';
    const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
    return [`${map}.get(${key})`, Order.MEMBER];
};

// Dedicated Java HashSet creation: new HashSet<Type>()
javaGenerator.forBlock['java_hashset_create'] = function (block, generator) {
    generator.addImport('java.util.HashSet');
    const type = block.getFieldValue('TYPE') || 'String';
    return [`new HashSet<${type}>()`, Order.FUNCTION_CALL];
};

// Dedicated Java HashSet add: set.add(item);
javaGenerator.forBlock['java_hashset_add'] = function (block, generator) {
    generator.addImport('java.util.HashSet');
    const set = generator.valueToCode(block, 'SET', Order.MEMBER) || 'set';
    const item = generator.valueToCode(block, 'ITEM', Order.NONE) || 'null';
    return `${set}.add(${item});\n`;
};

// Create dictionary (HashMap generic)
javaGenerator.forBlock['essentials_dict_create'] = function (block, generator) {
    generator.addImport('java.util.HashMap');

    const entries = [];
    const count = block.itemCount_ !== undefined ? block.itemCount_ : 0;
    for (let i = 0; i < count; i++) {
        const keyInput = block.getInput('KEY' + i) ? 'KEY' + i : (block.getInput('KEY_' + i) ? 'KEY_' + i : null);
        const valInput = block.getInput('VALUE' + i) ? 'VALUE' + i : (block.getInput('VALUE_' + i) ? 'VALUE_' + i : null);

        const key = keyInput ? generator.valueToCode(block, keyInput, Order.NONE) : '';
        const value = valInput ? generator.valueToCode(block, valInput, Order.NONE) : '';

        if (key && value) {
            entries.push(`${key}, ${value}`);
        }
    }

    if (entries.length === 0) {
        return ['new HashMap<>()', Order.FUNCTION_CALL];
    }

    generator.addImport('java.util.Map');
    const code = `new HashMap<>(Map.of(${entries.join(', ')}))`;
    return [code, Order.FUNCTION_CALL];
};

// Dictionary statements
javaGenerator.forBlock['essentials_dict_statements'] = function (block, generator) {
    const dict = generator.valueToCode(block, 'DICT', Order.MEMBER) || 'new HashMap<>()';
    const mode = block.getFieldValue('MODE');

    let code;
    switch (mode) {
        case 'SET':
            const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
            const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 'null';
            code = `${dict}.put(${key}, ${value});\n`;
            break;
        case 'REMOVE':
            const removeKey = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
            code = `${dict}.remove(${removeKey});\n`;
            break;
        case 'CLEAR':
            code = `${dict}.clear();\n`;
            break;
        default:
            code = '';
    }
    return code;
};

// Dictionary expressions
javaGenerator.forBlock['essentials_dict_expressions'] = function (block, generator) {
    const dict = generator.valueToCode(block, 'DICT', Order.MEMBER) || 'new HashMap<>()';
    const mode = block.getFieldValue('MODE');

    let code;
    switch (mode) {
        case 'GET':
            const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
            code = `${dict}.get(${key})`;
            break;
        case 'CONTAINS_KEY':
            const checkKey = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
            code = `${dict}.containsKey(${checkKey})`;
            break;
        case 'KEYS':
            code = `new ArrayList<>(${dict}.keySet())`;
            generator.addImport('java.util.ArrayList');
            break;
        case 'VALUES':
            code = `new ArrayList<>(${dict}.values())`;
            generator.addImport('java.util.ArrayList');
            break;
        case 'SIZE':
            code = `${dict}.size()`;
            break;
        default:
            code = 'null';
    }
    return [code, Order.MEMBER];
};

// Dictionary update/merge
javaGenerator.forBlock['essentials_dict_update'] = function (block, generator) {
    const dict1 = generator.valueToCode(block, 'DICT1', Order.MEMBER) || 'new HashMap<>()';
    const dict2 = generator.valueToCode(block, 'DICT2', Order.NONE) || 'new HashMap<>()';
    return `${dict1}.putAll(${dict2});\n`;
};

javaGenerator.forBlock['essentials_dict_merge_shallow'] = function (block, generator) {
    const dict1 = generator.valueToCode(block, 'DICT1', Order.NONE) || 'new HashMap<>()';
    const dict2 = generator.valueToCode(block, 'DICT2', Order.NONE) || 'new HashMap<>()';

    generator.addImport('java.util.HashMap');
    const code = `new HashMap<>() {{ putAll(${dict1}); putAll(${dict2}); }}`;
    return [code, Order.FUNCTION_CALL];
};

// Set operations
javaGenerator.forBlock['essentials_set_create'] = function (block, generator) {
    generator.addImport('java.util.HashSet');
    generator.addImport('java.util.Arrays');

    const elements = [];
    for (let i = 0; i < block.itemCount_; i++) {
        const element = generator.valueToCode(block, 'ADD' + i, Order.NONE) || 'null';
        elements.push(element);
    }

    if (elements.length === 0) {
        return ['new HashSet<>()', Order.FUNCTION_CALL];
    }

    const code = `new HashSet<>(Arrays.asList(${elements.join(', ')}))`;
    return [code, Order.FUNCTION_CALL];
};

javaGenerator.forBlock['essentials_set_add'] = function (block, generator) {
    const set = generator.valueToCode(block, 'SET', Order.MEMBER) || 'new HashSet<>()';
    const item = generator.valueToCode(block, 'ITEM', Order.NONE) || 'null';
    return `${set}.add(${item});\n`;
};

javaGenerator.forBlock['essentials_set_remove'] = function (block, generator) {
    const set = generator.valueToCode(block, 'SET', Order.MEMBER) || 'new HashSet<>()';
    const item = generator.valueToCode(block, 'ITEM', Order.NONE) || 'null';
    return `${set}.remove(${item});\n`;
};

javaGenerator.forBlock['essentials_set_union'] = function (block, generator) {
    const set1 = generator.valueToCode(block, 'SET1', Order.NONE) || 'new HashSet<>()';
    const set2 = generator.valueToCode(block, 'SET2', Order.NONE) || 'new HashSet<>()';

    generator.addImport('java.util.HashSet');
    const code = `new HashSet<>() {{ addAll(${set1}); addAll(${set2}); }}`;
    return [code, Order.FUNCTION_CALL];
};

javaGenerator.forBlock['essentials_set_intersection'] = function (block, generator) {
    const set1 = generator.valueToCode(block, 'SET1', Order.NONE) || 'new HashSet<>()';
    const set2 = generator.valueToCode(block, 'SET2', Order.NONE) || 'new HashSet<>()';

    generator.addImport('java.util.HashSet');
    const code = `new HashSet<>(${set1}) {{ retainAll(${set2}); }}`;
    return [code, Order.FUNCTION_CALL];
};

javaGenerator.forBlock['essentials_set_difference'] = function (block, generator) {
    const set1 = generator.valueToCode(block, 'SET1', Order.NONE) || 'new HashSet<>()';
    const set2 = generator.valueToCode(block, 'SET2', Order.NONE) || 'new HashSet<>()';

    generator.addImport('java.util.HashSet');
    const code = `new HashSet<>(${set1}) {{ removeAll(${set2}); }}`;
    return [code, Order.FUNCTION_CALL];
};

javaGenerator.forBlock['essentials_set_contains'] = function (block, generator) {
    const set = generator.valueToCode(block, 'SET', Order.MEMBER) || 'new HashSet<>()';
    const item = generator.valueToCode(block, 'ITEM', Order.NONE) || 'null';
    return [`${set}.contains(${item})`, Order.MEMBER];
};

export { javaGenerator };

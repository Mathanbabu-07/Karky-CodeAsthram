import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Dedicated Native Array creation: new int[size]
javaGenerator.forBlock['java_array_create'] = function (block, generator) {
    const type = block.getFieldValue('TYPE') || 'int';
    const size = generator.valueToCode(block, 'SIZE', Order.NONE) || '10';
    return [`new ${type}[${size}]`, Order.UNARY_POSTFIX];
};

// Dedicated Native Array index assignment: arr[idx] = val;
javaGenerator.forBlock['java_array_get_set'] = function (block, generator) {
    const array = generator.valueToCode(block, 'ARRAY', Order.MEMBER) || 'arr';
    const index = generator.valueToCode(block, 'INDEX', Order.NONE) || '0';
    const value = generator.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || '0';
    return `${array}[${index}] = ${value};\n`;
};

// Dedicated Native Array length: arr.length
javaGenerator.forBlock['java_array_length'] = function (block, generator) {
    const array = generator.valueToCode(block, 'ARRAY', Order.MEMBER) || 'arr';
    return [`${array}.length`, Order.MEMBER];
};

// Dedicated ArrayList creation: new ArrayList<String>()
javaGenerator.forBlock['java_arraylist_create'] = function (block, generator) {
    generator.addImport('java.util.ArrayList');
    const type = block.getFieldValue('TYPE') || 'String';
    return [`new ArrayList<${type}>()`, Order.FUNCTION_CALL];
};

// Dedicated ArrayList add: list.add(item);
javaGenerator.forBlock['java_arraylist_add'] = function (block, generator) {
    generator.addImport('java.util.ArrayList');
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'list';
    const item = generator.valueToCode(block, 'ITEM', Order.NONE) || 'null';
    return `${list}.add(${item});\n`;
};

// Dedicated ArrayList get: list.get(index)
javaGenerator.forBlock['java_arraylist_get'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'list';
    const index = generator.valueToCode(block, 'INDEX', Order.NONE) || '0';
    return [`${list}.get(${index})`, Order.MEMBER];
};

// Dedicated ArrayList size: list.size()
javaGenerator.forBlock['java_arraylist_size'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'list';
    return [`${list}.size()`, Order.MEMBER];
};

// Create list (generic)
javaGenerator.forBlock['essentials_list_create'] = function (block, generator) {
    generator.addImport('java.util.ArrayList');
    generator.addImport('java.util.Arrays');

    const elements = [];
    const count = block.itemCount_ !== undefined ? block.itemCount_ : (block.inputList ? block.inputList.length : 0);
    for (let i = 0; i < count; i++) {
        let element = '';
        if (block.getInput('ITEM' + i)) {
            element = generator.valueToCode(block, 'ITEM' + i, Order.NONE);
        } else if (block.getInput('ADD' + i)) {
            element = generator.valueToCode(block, 'ADD' + i, Order.NONE);
        }
        if (element !== null && element !== '') {
            elements.push(element);
        }
    }

    if (elements.length === 0) {
        return ['new ArrayList<>()', Order.FUNCTION_CALL];
    }

    const code = `new ArrayList<>(Arrays.asList(${elements.join(', ')}))`;
    return [code, Order.FUNCTION_CALL];
};

// List from range
javaGenerator.forBlock['essentials_list_from_range'] = function (block, generator) {
    const start = generator.valueToCode(block, 'START', Order.NONE) || '0';
    const end = generator.valueToCode(block, 'END', Order.NONE) || '10';
    const step = generator.valueToCode(block, 'STEP', Order.NONE) || '1';

    generator.addImport('java.util.stream.IntStream');
    generator.addImport('java.util.stream.Collectors');

    const code = `IntStream.rangeClosed(${start}, ${end}).filter(i -> (i - ${start}) % ${step} == 0).boxed().collect(Collectors.toList())`;
    return [code, Order.FUNCTION_CALL];
};

// List length
javaGenerator.forBlock['essentials_list_length'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    return [`${list}.size()`, Order.MEMBER];
};

// List get
javaGenerator.forBlock['essentials_list_get'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    const index = generator.valueToCode(block, 'INDEX', Order.NONE) || '0';
    return [`${list}.get(${index})`, Order.MEMBER];
};

// List set
javaGenerator.forBlock['essentials_list_set'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    const index = generator.valueToCode(block, 'INDEX', Order.NONE) || '0';
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 'null';
    return `${list}.set(${index}, ${value});\n`;
};

// List statements (add, remove, clear, etc.)
javaGenerator.forBlock['essentials_list_statements'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    const mode = block.getFieldValue('MODE');

    let code;
    switch (mode) {
        case 'APPEND':
            const item = generator.valueToCode(block, 'ITEM', Order.NONE) || 'null';
            code = `${list}.add(${item});\n`;
            break;
        case 'REMOVE':
            const removeItem = generator.valueToCode(block, 'ITEM', Order.NONE) || 'null';
            code = `${list}.remove(${removeItem});\n`;
            break;
        case 'CLEAR':
            code = `${list}.clear();\n`;
            break;
        case 'INSERT':
            const index = generator.valueToCode(block, 'INDEX', Order.NONE) || '0';
            const insertItem = generator.valueToCode(block, 'ITEM', Order.NONE) || 'null';
            code = `${list}.add(${index}, ${insertItem});\n`;
            break;
        default:
            code = '';
    }
    return code;
};

// List expressions (contains, indexOf, etc.)
javaGenerator.forBlock['essentials_list_expressions'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    const mode = block.getFieldValue('MODE');

    let code;
    switch (mode) {
        case 'CONTAINS':
            const item = generator.valueToCode(block, 'ITEM', Order.NONE) || 'null';
            code = `${list}.contains(${item})`;
            break;
        case 'INDEX_OF':
            const searchItem = generator.valueToCode(block, 'ITEM', Order.NONE) || 'null';
            code = `${list}.indexOf(${searchItem})`;
            break;
        case 'IS_EMPTY':
            code = `${list}.isEmpty()`;
            break;
        default:
            code = 'false';
    }
    return [code, Order.MEMBER];
};

// List sort
javaGenerator.forBlock['essentials_list_sort'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    generator.addImport('java.util.Collections');
    return `Collections.sort(${list});\n`;
};

// List reverse
javaGenerator.forBlock['essentials_list_reverse'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    generator.addImport('java.util.Collections');
    return `Collections.reverse(${list});\n`;
};

// List slice
javaGenerator.forBlock['essentials_list_slice'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    const start = generator.valueToCode(block, 'START', Order.NONE) || '0';
    const end = generator.valueToCode(block, 'END', Order.NONE);

    let code;
    if (end) {
        code = `${list}.subList(${start}, ${end})`;
    } else {
        code = `${list}.subList(${start}, ${list}.size())`;
    }
    return [code, Order.MEMBER];
};

// List map/filter/reduce (using Streams)
javaGenerator.forBlock['essentials_list_map'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    const func = generator.valueToCode(block, 'FUNCTION', Order.NONE) || 'x -> x';

    generator.addImport('java.util.stream.Collectors');
    const code = `${list}.stream().map(${func}).collect(Collectors.toList())`;
    return [code, Order.MEMBER];
};

javaGenerator.forBlock['essentials_list_filter'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    const func = generator.valueToCode(block, 'FUNCTION', Order.NONE) || 'x -> true';

    generator.addImport('java.util.stream.Collectors');
    const code = `${list}.stream().filter(${func}).collect(Collectors.toList())`;
    return [code, Order.MEMBER];
};

// List shuffle
javaGenerator.forBlock['lists_shuffle_in_place'] = function (block, generator) {
    const list = generator.valueToCode(block, 'LIST', Order.MEMBER) || 'new ArrayList<>()';
    generator.addImport('java.util.Collections');
    return `Collections.shuffle(${list});\n`;
};

export { javaGenerator };

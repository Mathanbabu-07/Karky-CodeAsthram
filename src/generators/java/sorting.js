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

// 1. sorted_block
javaGenerator.forBlock['sorted_block'] = function (block, generator) {
    generator.addImport('java.util.ArrayList');
    generator.addImport('java.util.Collections');
    const iterable = getValue(generator, block, Order.NONE, 'ITERABLE', 'LIST', 'DATA') || 'new ArrayList<>()';
    const reverse = getValue(generator, block, Order.NONE, 'REVERSE');
    
    if (reverse === 'true' || reverse === 'True') {
        return [`new ArrayList<>(${iterable}) {{ Collections.sort(this, Collections.reverseOrder()); }}`, Order.FUNCTION_CALL];
    }
    return [`new ArrayList<>(${iterable}) {{ Collections.sort(this); }}`, Order.FUNCTION_CALL];
};

// 2. list_sort_block
javaGenerator.forBlock['list_sort_block'] = function (block, generator) {
    generator.addImport('java.util.Collections');
    const list = getValue(generator, block, Order.MEMBER, 'LIST', 'TARGET') || 'list';
    const reverse = getValue(generator, block, Order.NONE, 'REVERSE');
    if (reverse === 'true' || reverse === 'True') {
        return `Collections.sort(${list}, Collections.reverseOrder());\n`;
    }
    return `Collections.sort(${list});\n`;
};

// 3. key_builder_block
javaGenerator.forBlock['key_builder_block'] = function (block, generator) {
    const kind = block.getFieldValue('KIND') || 'IDENTITY';
    switch (kind) {
        case 'IDENTITY':
            return ['java.util.Comparator.naturalOrder()', Order.FUNCTION_CALL];
        case 'LEN':
            return ['java.util.Comparator.comparingInt(Object::hashCode)', Order.FUNCTION_CALL];
        case 'ABS':
            return ['java.util.Comparator.comparingDouble(Math::abs)', Order.FUNCTION_CALL];
        default:
            return ['java.util.Comparator.naturalOrder()', Order.FUNCTION_CALL];
    }
};

// 4. multi_key_sort_block
javaGenerator.forBlock['multi_key_sort_block'] = function (block, generator) {
    generator.addImport('java.util.ArrayList');
    generator.addImport('java.util.Collections');
    const data = getValue(generator, block, Order.NONE, 'DATA', 'LIST') || 'new ArrayList<>()';
    return [`new ArrayList<>(${data}) {{ Collections.sort(this); }}`, Order.FUNCTION_CALL];
};

// 5. reverse_view_block
javaGenerator.forBlock['reverse_view_block'] = function (block, generator) {
    generator.addImport('java.util.ArrayList');
    generator.addImport('java.util.Collections');
    const iterable = getValue(generator, block, Order.NONE, 'ITERABLE', 'LIST') || 'new ArrayList<>()';
    return [`new ArrayList<>(${iterable}) {{ Collections.reverse(this); }}`, Order.FUNCTION_CALL];
};

// 6. argsort_helper_block
javaGenerator.forBlock['argsort_helper_block'] = function (block, generator) {
    generator.addImport('java.util.stream.IntStream');
    generator.addImport('java.util.stream.Collectors');
    const iterable = getValue(generator, block, Order.NONE, 'ITERABLE', 'LIST') || 'new ArrayList<>()';
    return [`IntStream.range(0, ${iterable}.size()).boxed().sorted(java.util.Comparator.comparing(${iterable}::get)).collect(Collectors.toList())`, Order.FUNCTION_CALL];
};

// 7. stable_sort_info_block
javaGenerator.forBlock['stable_sort_info_block'] = function () {
    return ['// Timsort / MergeSort is stable in Java', Order.ATOMIC];
};

// 8. sorting_master_block
javaGenerator.forBlock['sorting_master_block'] = function (block, generator) {
    generator.addImport('java.util.Collections');
    const target = getValue(generator, block, Order.NONE, 'TARGET') || 'list';
    return `Collections.sort(${target});\n`;
};

// 9. reverse_toggle_block
javaGenerator.forBlock['reverse_toggle_block'] = function (block) {
    const isReverse = block.getFieldValue('REVERSE') === 'TRUE';
    return [isReverse ? 'true' : 'false', Order.ATOMIC];
};

// 10. key_dict_item_block
javaGenerator.forBlock['key_dict_item_block'] = function (block, generator) {
    const key = getValue(generator, block, Order.NONE, 'KEY') || '"key"';
    return [`(map -> map.get(${key}))`, Order.FUNCTION_CALL];
};

// 11. heapq_select_block
javaGenerator.forBlock['heapq_select_block'] = function (block, generator) {
    generator.addImport('java.util.PriorityQueue');
    generator.addImport('java.util.ArrayList');
    const n = getValue(generator, block, Order.NONE, 'N') || '3';
    const iterable = getValue(generator, block, Order.NONE, 'ITERABLE', 'LIST') || 'new ArrayList<>()';
    const mode = block.getFieldValue('MODE') || 'LARGEST';
    return [`new ArrayList<>(new PriorityQueue<>(${iterable}))`, Order.FUNCTION_CALL];
};

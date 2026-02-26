import { pythonGenerator as Python } from 'blockly/python';

// ==============================================================================
// Built-in Data Structure Methods - Generators (Issue 6)
// ==============================================================================

// ============================================================================
// List Methods
// ============================================================================
Python.forBlock['list_method_append'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return `${list}.append(${item})\n`;
};

Python.forBlock['list_method_pop'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE);
    if (index) {
        return [`${list}.pop(${index})`, Python.ORDER_FUNCTION_CALL];
    }
    return [`${list}.pop()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['list_method_remove'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return `${list}.remove(${item})\n`;
};

Python.forBlock['list_method_insert'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return `${list}.insert(${index}, ${item})\n`;
};

Python.forBlock['list_method_extend'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
    return `${list}.extend(${iterable})\n`;
};

Python.forBlock['list_method_clear'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    return `${list}.clear()\n`;
};

Python.forBlock['list_method_count'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return [`${list}.count(${item})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['list_method_sort'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const reverse = block.getFieldValue('REVERSE') === 'True';
    return `${list}.sort(reverse=${reverse})\n`;
};

Python.forBlock['list_method_reverse'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    return `${list}.reverse()\n`;
};

Python.forBlock['list_method_copy'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    return [`${list}.copy()`, Python.ORDER_FUNCTION_CALL];
};

// ============================================================================
// Tuple Methods
// ============================================================================
Python.forBlock['tuple_method_count'] = function (block) {
    const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_MEMBER) || '()';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return [`${tuple}.count(${item})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tuple_method_index'] = function (block) {
    const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_MEMBER) || '()';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return [`${tuple}.index(${item})`, Python.ORDER_FUNCTION_CALL];
};

// ============================================================================
// Set Methods
// ============================================================================
Python.forBlock['set_method_add'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return `${set}.add(${item})\n`;
};

Python.forBlock['set_method_remove'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return `${set}.remove(${item})\n`;
};

Python.forBlock['set_method_discard'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return `${set}.discard(${item})\n`;
};

Python.forBlock['set_method_pop'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    return [`${set}.pop()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['set_method_clear'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    return `${set}.clear()\n`;
};

Python.forBlock['set_method_union'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    const other = Python.valueToCode(block, 'OTHER', Python.ORDER_NONE) || 'set()';
    return [`${set}.union(${other})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['set_method_intersection'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    const other = Python.valueToCode(block, 'OTHER', Python.ORDER_NONE) || 'set()';
    return [`${set}.intersection(${other})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['set_method_difference'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    const other = Python.valueToCode(block, 'OTHER', Python.ORDER_NONE) || 'set()';
    return [`${set}.difference(${other})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['set_method_update'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    const other = Python.valueToCode(block, 'OTHER', Python.ORDER_NONE) || 'set()';
    return `${set}.update(${other})\n`;
};

// ============================================================================
// Dictionary Methods
// ============================================================================
Python.forBlock['dict_method_get'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    const defaultVal = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE);
    if (defaultVal) {
        return [`${dict}.get(${key}, ${defaultVal})`, Python.ORDER_FUNCTION_CALL];
    }
    return [`${dict}.get(${key})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dict_method_keys'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    return [`${dict}.keys()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dict_method_values'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    return [`${dict}.values()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dict_method_items'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    return [`${dict}.items()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dict_method_pop'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    const defaultVal = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE);
    if (defaultVal) {
        return [`${dict}.pop(${key}, ${defaultVal})`, Python.ORDER_FUNCTION_CALL];
    }
    return [`${dict}.pop(${key})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dict_method_update'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    const other = Python.valueToCode(block, 'OTHER', Python.ORDER_NONE) || '{}';
    return `${dict}.update(${other})\n`;
};

Python.forBlock['dict_method_clear'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    return `${dict}.clear()\n`;
};

Python.forBlock['dict_method_setdefault'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    const defaultVal = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
    return [`${dict}.setdefault(${key}, ${defaultVal})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dict_method_popitem'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    return [`${dict}.popitem()`, Python.ORDER_FUNCTION_CALL];
};

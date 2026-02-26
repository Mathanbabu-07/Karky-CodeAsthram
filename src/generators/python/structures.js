import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['essentials_tuple_to_list'] = function (block) {
    const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_NONE) || '()';
    return [`list(${tuple})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_tuple_unpack'] = function (block) {
    const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_NONE) || '()';
    const vars = (block.getFieldValue('VARS') || '').trim();
    const names = vars.split(',').map(s => s.trim()).filter(Boolean);
    if (names.length <= 1) {
        const target = names[0] || Python.nameDB_.getDistinctName('_unpack', 'VARIABLE');
        return `${target} = ${tuple}\n`;
    }
    const temp = Python.nameDB_.getDistinctName('_unpack', 'VARIABLE');
    let code = `${temp} = ${tuple}\n`;
    names.forEach((n, i) => {
        const safe = Python.nameDB_.getDistinctName(n, 'VARIABLE');
        code += `${safe} = ${temp}[${i}]\n`;
    });
    return code;
};

Python.forBlock['essentials_namedtuple_define'] = function (block) {
    Python.addImport('from collections import namedtuple');
    const name = block.getFieldValue('NAME');
    const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
    return [`namedtuple('${name}', ${fields})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dataclass_stub'] = function (block) {
    Python.addImport('from dataclasses import make_dataclass');
    const name = block.getFieldValue('NAME');
    const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
    return [`make_dataclass('${name}', ${fields})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_set_create'] = function (block) {
    const elements = [];
    for (let i = 0; i < block.itemCount_; i++) {
        const code = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || 'None';
        elements.push(code);
    }
    if (elements.length === 0) {
        return ['set()', Python.ORDER_FUNCTION_CALL];
    }
    const code = '{' + elements.join(', ') + '}';
    return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_set_add'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return `${set}.add(${item})\n`;
};

Python.forBlock['essentials_set_remove'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return `${set}.remove(${item})\n`;
};

Python.forBlock['essentials_set_union'] = function (block) {
    const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
    const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
    return [`${set1} | ${set2}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_set_intersection'] = function (block) {
    const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
    const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
    return [`${set1} & ${set2}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_set_difference'] = function (block) {
    const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
    const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
    return [`${set1} - ${set2}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_set_symmetric_difference'] = function (block) {
    const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
    const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
    return [`${set1} ^ ${set2}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_set_contains'] = function (block) {
    const set = Python.valueToCode(block, 'SET', Python.ORDER_RELATIONAL) || 'set()';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_RELATIONAL) || 'None';
    return [`${item} in ${set}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_set_is_subset'] = function (block) {
    const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
    const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
    return [`${set1}.issubset(${set2})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_set_is_superset'] = function (block) {
    const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
    const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
    return [`${set1}.issuperset(${set2})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dict_create'] = function (block) {
    const pairs = [];
    for (let i = 0; typeof block.itemCount_ !== 'undefined' && i < block.itemCount_; i++) {
        const key = Python.valueToCode(block, 'KEY' + i, Python.ORDER_NONE) || 'None';
        const value = Python.valueToCode(block, 'VALUE' + i, Python.ORDER_NONE) || 'None';
        if (key !== 'None' && value !== 'None') {
            pairs.push(`${key}: ${value}`);
        }
    }
    const code = '{' + pairs.join(', ') + '}';
    return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_dict_statements'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    return `${dict}[${key}] = ${value}\n`;
};

Python.forBlock['essentials_dict_expressions'] = function (block) {
    const op = block.getFieldValue('OP');
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';

    let code;
    switch (op) {
        case 'GET':
            code = [`${dict}.get(${key})`, Python.ORDER_FUNCTION_CALL];
            break;
        case 'POP':
            code = [`${dict}.pop(${key})`, Python.ORDER_FUNCTION_CALL];
            break;
        case 'KEYS':
            code = [`list(${dict}.keys())`, Python.ORDER_FUNCTION_CALL];
            break;
        case 'VALUES':
            code = [`list(${dict}.values())`, Python.ORDER_FUNCTION_CALL];
            break;
        case 'ITEMS':
            code = [`list(${dict}.items())`, Python.ORDER_FUNCTION_CALL];
            break;
        default:
            return ['', Python.ORDER_ATOMIC];
    }
    return code;
};

Python.forBlock['essentials_dict_update'] = function (block) {
    const dict1 = Python.valueToCode(block, 'DICT1', Python.ORDER_MEMBER) || '{}';
    const dict2 = Python.valueToCode(block, 'DICT2', Python.ORDER_NONE) || '{}';
    return `${dict1}.update(${dict2})\n`;
};

Python.forBlock['essentials_dict_merge_shallow'] = function (block) {
    const dict1 = Python.valueToCode(block, 'DICT1', Python.ORDER_NONE) || '{}';
    const dict2 = Python.valueToCode(block, 'DICT2', Python.ORDER_NONE) || '{}';
    return [`{**${dict1}, **${dict2}}`, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_dict_deep_merge'] = function (block) {
    Python.addImport('from functools import reduce');
    const dict1 = Python.valueToCode(block, 'DICT1', Python.ORDER_NONE) || '{}';
    const dict2 = Python.valueToCode(block, 'DICT2', Python.ORDER_NONE) || '{}';
    const helperName = Python.nameDB_.getDistinctName('_deep_merge', 'PROCEDURE');
    const funcDef = `def ${helperName}(d1, d2):\n` +
        `  result = d1.copy()\n` +
        `  for k, v in d2.items():\n` +
        `    if k in result and isinstance(result[k], dict) and isinstance(v, dict):\n` +
        `      result[k] = ${helperName}(result[k], v)\n` +
        `    else:\n` +
        `      result[k] = v\n` +
        `  return result\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(${dict1}, ${dict2})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dict_setdefault'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    const default_val = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
    return [`${dict}.setdefault(${key}, ${default_val})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dict_pop'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    return [`${dict}.pop(${key})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dict_get_nested'] = function (block) {
    Python.addImport('from functools import reduce');
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || '[]';
    const default_val = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
    return [`reduce(lambda d, k: d.get(k, ${default_val}) if isinstance(d, dict) else ${default_val}, ${path}, ${dict})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_registry_register'] = function (block) {
    const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    return `${registry}[${key}] = ${value}\n`;
};

Python.forBlock['essentials_registry_call'] = function (block) {
    const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
    const kwargs = Python.valueToCode(block, 'KWARGS', Python.ORDER_NONE) || '{}';
    return [`${registry}[${key}](*${args}, **${kwargs})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['python_list'] = function (block) {
    const items = Python.statementToCode(block, 'ITEMS');
    return [`[\\n${items}]`, Python.ORDER_ATOMIC];
};

Python.forBlock['python_dict'] = function (block) {
    const items = Python.statementToCode(block, 'ITEMS');
    return [`{\\n${items}}`, Python.ORDER_ATOMIC];
};

Python.forBlock['python_key_value'] = function (block) {
    const key = block.getFieldValue('KEY');
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC);
    return `${JSON.stringify(key)}: ${value},\\n`;
};

Python.forBlock['essentials_list_create'] = function (block) {
    const elements = [];
    const itemCount = block.itemCount_ || 0; // Handle undefined

    for (let i = 0; i < itemCount; i++) {
        // Support both ITEMi (current block definition) and ADDi (legacy templates)
        let code = null;

        // Try ITEM{i} first
        if (block.getInput('ITEM' + i)) {
            code = Python.valueToCode(block, 'ITEM' + i, Python.ORDER_NONE);
        }

        // Fallback to ADD{i}
        if (!code && block.getInput('ADD' + i)) {
            code = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE);
        }

        // Default to None if no input found
        elements.push(code || 'None');
    }

    const code = '[' + elements.join(', ') + ']';
    return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_list_from_range'] = function (block) {
    const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || '0';
    const end = Python.valueToCode(block, 'END', Python.ORDER_NONE) || '0';
    const step = Python.valueToCode(block, 'STEP', Python.ORDER_NONE) || '1';
    return [`list(range(${start}, ${end}, ${step}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_range'] = function (block) {
    const mode = block.getFieldValue('MODE') || 'STOP';
    if (mode === 'STOP') {
        const stop = Python.valueToCode(block, 'STOP', Python.ORDER_NONE) || '0';
        return [`range(${stop})`, Python.ORDER_FUNCTION_CALL];
    }
    if (mode === 'START_STOP') {
        const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || '0';
        const stop = Python.valueToCode(block, 'STOP', Python.ORDER_NONE) || '0';
        return [`range(${start}, ${stop})`, Python.ORDER_FUNCTION_CALL];
    }
    // START_STOP_STEP
    const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || '0';
    const stop = Python.valueToCode(block, 'STOP', Python.ORDER_NONE) || '0';
    const step = Python.valueToCode(block, 'STEP', Python.ORDER_NONE) || '1';
    return [`range(${start}, ${stop}, ${step})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_length'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    return [`len(${list})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_get'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0';
    return [`${list}[${index}]`, Python.ORDER_MEMBER];
};

Python.forBlock['essentials_list_set'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER);
    if (!list || list === '[]') {
        return '# Error: No list provided\n';
    }

    const where = block.getFieldValue('WHERE');
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';

    let code;
    let index;

    switch (where) {
        case 'FIRST':
            code = `${list}[0] = ${value}`;
            break;
        case 'LAST':
            code = `${list}.append(${value})`;
            break;
        case 'FROM_START':
            index = Python.valueToCode(block, 'AT', Python.ORDER_NONE) || '0';
            // User is 1-based, Python is 0-based.
            if (String(index).match(/^\d+$/)) {
                index = String(parseInt(index, 10) - 1);
            } else {
                index = `${index} - 1`;
            }
            code = `${list}[${index}] = ${value}`;
            break;
        case 'FROM_END':
            index = Python.valueToCode(block, 'AT', Python.ORDER_UNARY_SIGN) || '1';
            index = `len(${list}) - ${index}`;
            code = `${list}[${index}] = ${value}`;
            break;
        case 'RANDOM':
            Python.addImport('import random');
            index = `random.randint(0, len(${list}) - 1)`;
            code = `${list}[${index}] = ${value}`;
            break;
        default:
            throw Error('Unhandled option (list_set).');
    }

    return code + '\n';
};

Python.forBlock['essentials_list_statements'] = function (block) {
    const op = block.getFieldValue('OP');
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0';

    let code;
    switch (op) {
        case 'APPEND':
            code = `${list}.append(${item})`;
            break;
        case 'INSERT':
            code = `${list}.insert(${index}, ${item})\\n`;
            break;
        case 'REMOVE':
            code = `${list}.remove(${item})\\n`;
            break;
        default:
            return '';
    }
    return code;
};

Python.forBlock['essentials_list_expressions'] = function (block) {
    const op = block.getFieldValue('OP');
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0';

    let code;
    switch (op) {
        case 'POP':
            code = [`${list}.pop(${index})`, Python.ORDER_FUNCTION_CALL];
            break;
        default:
            return ['', Python.ORDER_ATOMIC];
    }
    return code;
};

Python.forBlock['essentials_list_index_of'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return [`${list}.index(${item})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_slice'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || 'None';
    const end = Python.valueToCode(block, 'END', Python.ORDER_NONE) || 'None';
    return [`${list}[${start}:${end}]`, Python.ORDER_MEMBER];
};

Python.forBlock['essentials_list_sort'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    const reverse = block.getFieldValue('REVERSE') === 'TRUE';
    return `${list}.sort(key=${key}, reverse=${reverse})\n`;
};

Python.forBlock['essentials_list_reverse'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    return `${list}.reverse()\n`;
};

Python.forBlock['essentials_list_map'] = function (block) {
    const func = Python.valueToCode(block, 'FUNCTION', Python.ORDER_NONE) || 'None';
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    return [`list(map(${func}, ${list}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_filter'] = function (block) {
    const func = Python.valueToCode(block, 'FUNCTION', Python.ORDER_NONE) || 'None';
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    return [`list(filter(${func}, ${list}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_reduce'] = function (block) {
    Python.addImport('import functools');
    const func = Python.valueToCode(block, 'FUNCTION', Python.ORDER_NONE) || 'None';
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    const initial = Python.valueToCode(block, 'INITIAL', Python.ORDER_NONE) || 'None';
    return [`functools.reduce(${func}, ${list}, ${initial})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_flatten'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    return [`[item for sublist in ${list} for item in sublist]`, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_list_unique'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    return [`list(set(${list}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_chunk'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    const size = Python.valueToCode(block, 'SIZE', Python.ORDER_NONE) || '1';
    return [`[${list}[i:i + ${size}] for i in range(0, len(${list}), ${size})]`, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_list_enumerate'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    return [`list(enumerate(${list}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_tuple_create'] = function (block) {
    const elements = [];
    for (let i = 0; i < block.itemCount_; i++) {
        const code = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || 'None';
        elements.push(code);
    }
    if (elements.length === 0) {
        return ['()', Python.ORDER_ATOMIC];
    }
    if (elements.length === 1) {
        return [`(${elements[0]},)`, Python.ORDER_ATOMIC];
    }
    const code = '(' + elements.join(', ') + ')';
    return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_tuple_from_list'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    return [`tuple(${list})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_registry_create'] = function (block) {
    return ['{}', Python.ORDER_ATOMIC];
};

Python.forBlock['data_structures_registry_register'] = function (block) {
    const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
    return `${registry}[${key}] = ${fn}\n`;
};

Python.forBlock['data_structures_registry_unregister'] = function (block) {
    const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    return `del ${registry}[${key}]\n`;
};

Python.forBlock['data_structures_registry_list'] = function (block) {
    const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
    return [`list(${registry}.keys())`, Python.ORDER_FUNCTION_CALL];
};

// Additional Structures moved from python.js

Python.forBlock['lists_comprehension'] = function (block) {
    const output = Python.valueToCode(block, 'OUTPUT', Python.ORDER_NONE) || 'None';
    const variable = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const condition = Python.valueToCode(block, 'IF', Python.ORDER_NONE) || '';

    let code = `[${output} for ${variable} in ${list}`;
    if (condition) {
        code += ` if ${condition}`;
    }
    code += ']';
    return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['tuples_index'] = function (block) {
    const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_MEMBER) || '()';
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    const code = `${tuple}.index(${item})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tuples_create_with'] = function (block) {
    const elements = [];
    for (let i = 0; i < block.itemCount_; i++) {
        const element = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || 'None';
        elements.push(element);
    }
    if (elements.length === 0) {
        return ['()', Python.ORDER_ATOMIC];
    }
    if (elements.length === 1) {
        return [`(${elements[0]},)`, Python.ORDER_ATOMIC];
    }
    const code = `(${elements.join(', ')})`;
    return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['tuples_unpack'] = function (block) {
    const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_NONE) || '()';
    const vars = block.getFieldValue('VARS');
    return `${vars} = ${tuple}\n`;
};

Python.forBlock['tuples_create_simplenamespace'] = function (block) {
    Python.addImport('from types import SimpleNamespace');
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
    return [`SimpleNamespace(**${dict})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dicts_register_handler'] = function (block) {
    const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
    const handler = Python.valueToCode(block, 'HANDLER', Python.ORDER_NONE) || 'None';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    return `${registry}[${key}] = ${handler}\n`;
};

Python.forBlock['dicts_create_with_item'] = function (block) {
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    // This block generates a key-value pair for dictionary creation
    return [`${key}: ${value}`, Python.ORDER_ATOMIC];
};

Python.forBlock['dicts_copy'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    return [`${dict}.copy()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dicts_fromkeys'] = function (block) {
    const keys = Python.valueToCode(block, 'KEYS', Python.ORDER_NONE) || '[]';
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    return [`dict.fromkeys(${keys}, ${value})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['dicts_popitem'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    return [`${dict}.popitem()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_seq_concat'] = function (block) {
    const a = Python.valueToCode(block, 'A', Python.ORDER_ADDITIVE) || '[]';
    const b = Python.valueToCode(block, 'B', Python.ORDER_ADDITIVE) || '[]';
    return [`${a} + ${b}`, Python.ORDER_ADDITIVE];
};

Python.forBlock['data_structures_seq_repeat'] = function (block) {
    const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_MULTIPLICATIVE) || '[]';
    const times = Python.valueToCode(block, 'TIMES', Python.ORDER_MULTIPLICATIVE) || '0';
    return [`${seq} * ${times}`, Python.ORDER_MULTIPLICATIVE];
};

Python.forBlock['data_structures_seq_slice_step'] = function (block) {
    const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_MEMBER) || '[]';
    const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || 'None';
    const end = Python.valueToCode(block, 'END', Python.ORDER_NONE) || 'None';
    const step = Python.valueToCode(block, 'STEP', Python.ORDER_NONE) || 'None';
    return [`${seq}[${start}:${end}:${step}]`, Python.ORDER_MEMBER];
};

Python.forBlock['data_structures_seq_sorted_by'] = function (block) {
    const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_NONE) || '[]';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
    return [`sorted(${seq}, key=${key})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_seq_zip'] = function (block) {
    const elements = [];
    for (let i = 0; i < block.itemCount_; i++) {
        const code = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || '[]';
        elements.push(code);
    }
    return [`list(zip(${elements.join(', ')}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_seq_transpose'] = function (block) {
    const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_NONE) || '[]';
    return [`list(zip(*${seq}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_seq_chunk'] = function (block) {
    const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_NONE) || '[]';
    const size = Python.valueToCode(block, 'SIZE', Python.ORDER_NONE) || '1';
    return [`[${seq}[i:i + ${size}] for i in range(0, len(${seq}), ${size})]`, Python.ORDER_ATOMIC];
};

Python.forBlock['data_structures_seq_window'] = function (block) {
    const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_NONE) || '[]';
    const size = Python.valueToCode(block, 'SIZE', Python.ORDER_NONE) || '1';
    const step = Python.valueToCode(block, 'STEP', Python.ORDER_NONE) || '1';
    return [`[${seq}[i:i+${size}] for i in range(0, len(${seq})-${size}+1, ${step})]`, Python.ORDER_ATOMIC];
};

Python.forBlock['data_structures_map_get_path'] = function (block) {
    Python.addImport('from functools import reduce');
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || '[]';
    const default_val = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
    const helperName = Python.nameDB_.getDistinctName('_get_nested', 'PROCEDURE');
    const funcDef = `def ${helperName}(d, path, default=None):\n` +
        `  try:\n` +
        `    return reduce(lambda x, y: x[y], path, d)\n` +
        `  except (KeyError, TypeError, IndexError):\n` +
        `    return default\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(${dict}, ${path}, ${default_val})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_set_path'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || '[]';
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    const helperName = Python.nameDB_.getDistinctName('_set_nested', 'PROCEDURE');
    const funcDef = `def ${helperName}(d, path, value):\n` +
        `  for key in path[:-1]:\n` +
        `    d = d.setdefault(key, {})\n` +
        `  d[path[-1]] = value\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return `${helperName}(${dict}, ${path}, ${value})\n`;
};

Python.forBlock['data_structures_map_flatten'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
    const helperName = Python.nameDB_.getDistinctName('_flatten_dict', 'PROCEDURE');
    const funcDef = `def ${helperName}(d, parent_key='', sep='.'):\n` +
        `  items = []\n` +
        `  for k, v in d.items():\n` +
        `    new_key = f"{parent_key}{sep}{k}" if parent_key else k\n` +
        `    if isinstance(v, dict):\n` +
        `      items.extend(${helperName}(v, new_key, sep=sep).items())\n` +
        `    else:\n` +
        `      items.append((new_key, v))\n` +
        `  return dict(items)\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(${dict})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_unflatten'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
    const helperName = Python.nameDB_.getDistinctName('_unflatten_dict', 'PROCEDURE');
    const funcDef = `def ${helperName}(d, sep='.'):\n` +
        `  result = {}\n` +
        `  for key, value in d.items():\n` +
        `    parts = key.split(sep)\n` +
        `    target = result\n` +
        `    for part in parts[:-1]:\n` +
        `      target = target.setdefault(part, {})\n` +
        `    target[parts[-1]] = value\n` +
        `  return result\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}(${dict})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_filter_by_value'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
    const condition = Python.valueToCode(block, 'CONDITION', Python.ORDER_NONE) || 'lambda v: True';
    return [`{k: v for k, v in ${dict}.items() if (${condition})(v)}`, Python.ORDER_ATOMIC];
};

Python.forBlock['data_structures_map_keys_to_list'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    return [`list(${dict}.keys())`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_items_to_list'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
    return [`list(${dict}.items())`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_invert'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
    return [`{v: k for k, v in ${dict}.items()}`, Python.ORDER_ATOMIC];
};

Python.forBlock['data_structures_record_define_namedtuple'] = function (block) {
    Python.addImport('from collections import namedtuple');
    const name = block.getFieldValue('NAME');
    const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
    return [`namedtuple('${name}', ${fields})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_record_define_dataclass'] = function (block) {
    Python.addImport('from dataclasses import dataclass, field');
    const name = block.getFieldValue('NAME');
    const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
    const defaults = Python.valueToCode(block, 'DEFAULTS', Python.ORDER_NONE) || '{}';
    const helperName = Python.nameDB_.getDistinctName('_create_dataclass', 'PROCEDURE');
    const funcDef = `def ${helperName}(name, fields, defaults):\n` +
        `  field_defs = {}\n` +
        `  for f in fields:\n` +
        `    if f in defaults:\n` +
        `      field_defs[f] = defaults[f]\n` +
        `    else:\n` +
        `      field_defs[f] = field(default=None)\n` +
        `  return type(name, (), field_defs)\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return [`${helperName}('${name}', ${fields}, ${defaults})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_record_instantiate'] = function (block) {
    const a_class = Python.valueToCode(block, 'CLASS', Python.ORDER_FUNCTION_CALL) || 'None';
    const values = Python.valueToCode(block, 'VALUES', Python.ORDER_NONE) || '{}';
    return [`${a_class}(**${values})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_record_to_dict'] = function (block) {
    const record = Python.valueToCode(block, 'RECORD', Python.ORDER_MEMBER) || 'None';
    return [`dict(${record}._asdict()) if hasattr(${record}, '_asdict') else vars(${record})`, Python.ORDER_CONDITIONAL];
};

Python.forBlock['data_structures_record_from_dict'] = function (block) {
    const a_class = Python.valueToCode(block, 'CLASS', Python.ORDER_FUNCTION_CALL) || 'None';
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
    return [`${a_class}(**${dict})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_frozen_map'] = function (block) {
    const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
    return [`frozenset(${dict}.items())`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_frozen_list'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
    return [`tuple(${list})`, Python.ORDER_FUNCTION_CALL];
};

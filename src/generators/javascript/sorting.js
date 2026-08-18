import { javascriptGenerator, Order } from 'blockly/javascript';

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

// 1. sorted_block
javascriptGenerator.forBlock['sorted_block'] = function(block, generator) {
    const iterable = getValue(generator, block, Order.NONE, 'ITERABLE', 'LIST', 'DATA') || '[]';
    const key = getValue(generator, block, Order.NONE, 'KEY');
    const reverse = getValue(generator, block, Order.NONE, 'REVERSE');
    let comp = '(a, b) => (a > b ? 1 : a < b ? -1 : 0)';
    if (key) {
        comp = `(a, b) => { const ka = (${key})(a), kb = (${key})(b); return ka > kb ? 1 : ka < kb ? -1 : 0; }`;
    }
    let code = `[...${iterable}].sort(${comp})`;
    if (reverse === 'true' || reverse === 'True') {
        code += '.reverse()';
    }
    return [code, Order.MEMBER];
};

// 2. list_sort_block
javascriptGenerator.forBlock['list_sort_block'] = function(block, generator) {
    const list = getValue(generator, block, Order.MEMBER, 'LIST', 'TARGET') || '[]';
    const key = getValue(generator, block, Order.NONE, 'KEY');
    const reverse = getValue(generator, block, Order.NONE, 'REVERSE');
    let comp = '(a, b) => (a > b ? 1 : a < b ? -1 : 0)';
    if (key) {
        comp = `(a, b) => { const ka = (${key})(a), kb = (${key})(b); return ka > kb ? 1 : ka < kb ? -1 : 0; }`;
    }
    let code = `${list}.sort(${comp});\n`;
    if (reverse === 'true' || reverse === 'True') {
        code += `${list}.reverse();\n`;
    }
    return code;
};

// 3. key_builder_block
javascriptGenerator.forBlock['key_builder_block'] = function(block, generator) {
    const kind = block.getFieldValue('KIND');
    switch (kind) {
        case 'IDENTITY':
            return ['(x => x)', Order.ATOMIC];
        case 'LEN':
            return ['(x => (x ? x.length : 0))', Order.ATOMIC];
        case 'ABS':
            return ['(x => Math.abs(x))', Order.ATOMIC];
        case 'LAMBDA': {
            const v = block.getFieldValue('VAR') || 'x';
            const expr = getValue(generator, block, Order.NONE, 'EXPR') || v;
            return [`(${v} => ${expr})`, Order.ATOMIC];
        }
        case 'ITEMGETTER': {
            const idx = getValue(generator, block, Order.NONE, 'INDEX', 'INDEX0') || '0';
            return [`(x => x[${idx}])`, Order.ATOMIC];
        }
        case 'ATTRGETTER': {
            const attr = getValue(generator, block, Order.NONE, 'ATTRIBUTE', 'ATTRIBUTE0') || '"name"';
            return [`(x => x[${attr}])`, Order.ATOMIC];
        }
        default:
            return ['(x => x)', Order.ATOMIC];
    }
};

// 4. multi_key_sort_block
javascriptGenerator.forBlock['multi_key_sort_block'] = function(block, generator) {
    const data = getValue(generator, block, Order.NONE, 'DATA', 'LIST') || '[]';
    return [`[...${data}].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))`, Order.MEMBER];
};

// 5. reverse_view_block
javascriptGenerator.forBlock['reverse_view_block'] = function(block, generator) {
    const iterable = getValue(generator, block, Order.NONE, 'ITERABLE', 'LIST') || '[]';
    return [`[...${iterable}].reverse()`, Order.MEMBER];
};

// 6. argsort_helper_block
javascriptGenerator.forBlock['argsort_helper_block'] = function(block, generator) {
    const iterable = getValue(generator, block, Order.NONE, 'ITERABLE', 'LIST') || '[]';
    const code = `${iterable}.map((val, idx) => ({ val, idx })).sort((a, b) => (a.val > b.val ? 1 : -1)).map(item => item.idx)`;
    return [code, Order.MEMBER];
};

// 7. stable_sort_info_block
javascriptGenerator.forBlock['stable_sort_info_block'] = function() {
    return '// Python sorting is stable\n';
};

// 8. sorting_master_block
javascriptGenerator.forBlock['sorting_master_block'] = function(block, generator) {
    const mode = block.getFieldValue('MODE') || 'SORTED';
    const target = getValue(generator, block, Order.NONE, 'TARGET', 'LIST') || '[]';
    const key = getValue(generator, block, Order.NONE, 'KEY');
    const reverse = getValue(generator, block, Order.NONE, 'REVERSE');
    let comp = '(a, b) => (a > b ? 1 : a < b ? -1 : 0)';
    if (key) {
        comp = `(a, b) => { const ka = (${key})(a), kb = (${key})(b); return ka > kb ? 1 : ka < kb ? -1 : 0; }`;
    }
    if (mode === 'SORTED') {
        let code = `[...${target}].sort(${comp})`;
        if (reverse === 'true' || reverse === 'True') {
            code += '.reverse()';
        }
        return [code, Order.MEMBER];
    }
    let code = `${target}.sort(${comp});\n`;
    if (reverse === 'true' || reverse === 'True') {
        code += `${target}.reverse();\n`;
    }
    return code;
};

// 9. reverse_toggle_block
javascriptGenerator.forBlock['reverse_toggle_block'] = function(block) {
    const val = block.getFieldValue('VAL') === 'True' || block.getFieldValue('VAL') === 'true' ? 'true' : 'false';
    return [val, Order.ATOMIC];
};

// 10. key_dict_item_block
javascriptGenerator.forBlock['key_dict_item_block'] = function(block, generator) {
    const dictCode = getValue(generator, block, Order.NONE, 'DICT') || '{}';
    const mode = block.getFieldValue('MODE') || 'KEY';
    const idx = mode === 'KEY' ? '0' : '1';
    return [`Object.entries(${dictCode}).sort((a, b) => (a[${idx}] > b[${idx}] ? 1 : -1))`, Order.MEMBER];
};

// 11. heapq_select_block
javascriptGenerator.forBlock['heapq_select_block'] = function(block, generator) {
    const mode = block.getFieldValue('MODE') || 'NSMALLEST';
    const n = getValue(generator, block, Order.NONE, 'N') || '1';
    const iterable = getValue(generator, block, Order.NONE, 'ITERABLE', 'LIST') || '[]';
    const isMin = mode !== 'NLARGEST';
    const comp = isMin ? '(a, b) => a - b' : '(a, b) => b - a';
    return [`[...${iterable}].sort(${comp}).slice(0, ${n})`, Order.MEMBER];
};

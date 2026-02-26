import { pythonGenerator as Python } from 'blockly/python';

// ==============================================================================
// Special Blocks Generators for Issues 7-10
// ==============================================================================

// ============================================================================
// Issue 7: Initialize list with object (e.g., queue = [self.root])
// ============================================================================
Python.forBlock['list_create_with_values'] = function (block) {
    const items = Python.valueToCode(block, 'ITEMS', Python.ORDER_NONE) || '';
    // If items is a single value, wrap it in a list
    if (items && !items.startsWith('[')) {
        return [`[${items}]`, Python.ORDER_ATOMIC];
    }
    return [items || '[]', Python.ORDER_ATOMIC];
};

Python.forBlock['list_create_single_item'] = function (block) {
    const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
    return [`[${item}]`, Python.ORDER_ATOMIC];
};

// ============================================================================
// Issue 8: CSV Writer Blocks
// ============================================================================
Python.forBlock['csv_writer_create'] = function (block) {
    Python.addImport('import csv');
    const file = Python.valueToCode(block, 'FILE', Python.ORDER_NONE) || 'None';
    return [`csv.writer(${file})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['csv_writer_writerow'] = function (block) {
    Python.addImport('import csv');
    const writer = Python.valueToCode(block, 'WRITER', Python.ORDER_MEMBER) || 'writer';
    const row = Python.valueToCode(block, 'ROW', Python.ORDER_NONE) || '[]';
    return `${writer}.writerow(${row})\n`;
};

Python.forBlock['csv_writer_writerows'] = function (block) {
    Python.addImport('import csv');
    const writer = Python.valueToCode(block, 'WRITER', Python.ORDER_MEMBER) || 'writer';
    const rows = Python.valueToCode(block, 'ROWS', Python.ORDER_NONE) || '[]';
    return `${writer}.writerows(${rows})\n`;
};

Python.forBlock['csv_dictwriter_create'] = function (block) {
    Python.addImport('import csv');
    const file = Python.valueToCode(block, 'FILE', Python.ORDER_NONE) || 'None';
    const fieldnames = Python.valueToCode(block, 'FIELDNAMES', Python.ORDER_NONE) || '[]';
    return [`csv.DictWriter(${file}, fieldnames=${fieldnames})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['csv_dictwriter_writeheader'] = function (block) {
    Python.addImport('import csv');
    const writer = Python.valueToCode(block, 'WRITER', Python.ORDER_MEMBER) || 'writer';
    return `${writer}.writeheader()\n`;
};

Python.forBlock['csv_reader_create'] = function (block) {
    Python.addImport('import csv');
    const file = Python.valueToCode(block, 'FILE', Python.ORDER_NONE) || 'None';
    return [`csv.reader(${file})`, Python.ORDER_FUNCTION_CALL];
};

// ============================================================================
// Issue 9: Check if file exists
// ============================================================================
Python.forBlock['file_exists_check'] = function (block) {
    Python.addImport('import os');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || '""';
    return [`os.path.exists(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['file_isfile_check'] = function (block) {
    Python.addImport('import os');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || '""';
    return [`os.path.isfile(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['file_isdir_check'] = function (block) {
    Python.addImport('import os');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || '""';
    return [`os.path.isdir(${path})`, Python.ORDER_FUNCTION_CALL];
};

// ============================================================================
// Issue 10: Access 2D list element
// ============================================================================
Python.forBlock['list_2d_get'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const row = Python.valueToCode(block, 'ROW', Python.ORDER_NONE) || '0';
    const col = Python.valueToCode(block, 'COL', Python.ORDER_NONE) || '0';
    return [`${list}[${row}][${col}]`, Python.ORDER_MEMBER];
};

Python.forBlock['list_2d_set'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const row = Python.valueToCode(block, 'ROW', Python.ORDER_NONE) || '0';
    const col = Python.valueToCode(block, 'COL', Python.ORDER_NONE) || '0';
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    return `${list}[${row}][${col}] = ${value}\n`;
};

Python.forBlock['list_2d_create'] = function (block) {
    const rows = Python.valueToCode(block, 'ROWS', Python.ORDER_NONE) || '0';
    const cols = Python.valueToCode(block, 'COLS', Python.ORDER_NONE) || '0';
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || '0';
    return [`[[${value} for _ in range(${cols})] for _ in range(${rows})]`, Python.ORDER_ATOMIC];
};

Python.forBlock['list_nd_get'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const indices = block.getFieldValue('INDICES') || '[0]';
    return [`${list}${indices}`, Python.ORDER_MEMBER];
};

Python.forBlock['list_nd_set'] = function (block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const indices = block.getFieldValue('INDICES') || '[0]';
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    return `${list}${indices} = ${value}\n`;
};

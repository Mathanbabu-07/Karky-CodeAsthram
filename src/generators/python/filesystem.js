import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['io_fs_open'] = function (block) {
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    const mode = Python.valueToCode(block, 'MODE', Python.ORDER_NONE) || "'r'";
    const varName = Python.nameDB_.getDistinctName(block.getFieldValue('VAR'), 'VARIABLE');
    const branch = Python.statementToCode(block, 'DO') || '  pass';
    return `with open(${path}, ${mode}) as ${varName}:\n${branch}`;
};

Python.forBlock['io_fs_file_mode'] = function (block) {
    const mode = block.getFieldValue('MODE');
    return [mode, Python.ORDER_ATOMIC];
};

Python.forBlock['io_fs_read_lines'] = function (block) {
    const file = Python.valueToCode(block, 'FILE', Python.ORDER_MEMBER) || 'None';
    return [`${file}.readlines()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_write_lines'] = function (block) {
    const file = Python.valueToCode(block, 'FILE', Python.ORDER_MEMBER) || 'None';
    const lines = Python.valueToCode(block, 'LINES', Python.ORDER_NONE) || '[]';
    return `${file}.writelines(${lines})\n`;
};

Python.forBlock['io_fs_read'] = function (block) {
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`open(${path}, 'r').read()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_write'] = function (block) {
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    const content = Python.valueToCode(block, 'CONTENT', Python.ORDER_NONE) || "''";
    const helperName = Python.provideFunction_(
        'write_file',
        [`def ${Python.FUNCTION_NAME_PLACEHOLDER_}(path, content):`,
            `  with open(path, 'w') as f:`,
            `    f.write(content)`]);
    return `${helperName}(${path}, ${content})\n`;
};

Python.forBlock['io_fs_append'] = function (block) {
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    const content = Python.valueToCode(block, 'CONTENT', Python.ORDER_NONE) || "''";
    const helperName = Python.provideFunction_(
        'append_file',
        [`def ${Python.FUNCTION_NAME_PLACEHOLDER_}(path, content):`,
            `  with open(path, 'a') as f:`,
            `    f.write(content)`]);
    return `${helperName}(${path}, ${content})\n`;
};

Python.forBlock['io_fs_delete'] = function (block) {
    Python.addImport('import os');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return `os.remove(${path})\n`;
};

Python.forBlock['io_fs_exists'] = function (block) {
    Python.addImport('import os');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`os.path.exists(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_listdir'] = function (block) {
    Python.addImport('import os');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`os.listdir(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_mkdir'] = function (block) {
    Python.addImport('import os');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return `os.makedirs(${path}, exist_ok=True)\n`;
};

Python.forBlock['io_fs_tempfile'] = function (block) {
    Python.addImport('import tempfile');
    return [`tempfile.NamedTemporaryFile(delete=False).name`, Python.ORDER_MEMBER];
};

Python.forBlock['io_fs_copy'] = function (block) {
    Python.addImport('import shutil');
    const src = Python.valueToCode(block, 'SRC', Python.ORDER_NONE) || "''";
    const dst = Python.valueToCode(block, 'DST', Python.ORDER_NONE) || "''";
    return `shutil.copy2(${src}, ${dst})\n`;
};

Python.forBlock['io_json_load'] = function (block) {
    Python.addImport('import json');
    const source = Python.valueToCode(block, 'SOURCE', Python.ORDER_NONE) || "''";
    return [`json.loads(open(${source}).read())`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_json_dump'] = function (block) {
    Python.addImport('import json');
    const obj = Python.valueToCode(block, 'OBJECT', Python.ORDER_NONE) || '{}';
    const dest = Python.valueToCode(block, 'DEST', Python.ORDER_NONE) || 'None';
    const indent = Python.valueToCode(block, 'INDENT', Python.ORDER_NONE) || 'None';
    const sort_keys = Python.valueToCode(block, 'SORT_KEYS', Python.ORDER_NONE) || 'False';

    const helperName = Python.provideFunction_(
        'dump_json',
        [`def ${Python.FUNCTION_NAME_PLACEHOLDER_}(obj, dest, indent=None, sort_keys=False):`,
            `  with open(dest, 'w') as f:`,
            `    json.dump(obj, f, indent=indent, sort_keys=sort_keys)`]);

    return `${helperName}(${obj}, ${dest}, indent=${indent}, sort_keys=${sort_keys})\n`;
};

Python.forBlock['io_csv_read'] = function (block) {
    Python.addImport('import csv');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    const delimiter = Python.valueToCode(block, 'DELIMITER', Python.ORDER_NONE) || "','";
    return [`list(csv.reader(open(${path}), delimiter=${delimiter}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_csv_write'] = function (block) {
    Python.addImport('import csv');
    const rows = Python.valueToCode(block, 'ROWS', Python.ORDER_NONE) || '[]';
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    const delimiter = Python.valueToCode(block, 'DELIMITER', Python.ORDER_NONE) || "','";

    const helperName = Python.provideFunction_(
        'write_csv',
        [`def ${Python.FUNCTION_NAME_PLACEHOLDER_}(path, rows, delimiter=','):`,
            `  with open(path, 'w', newline='') as f:`,
            `    writer = csv.writer(f, delimiter=delimiter)`,
            `    writer.writerows(rows)`]);

    return `${helperName}(${path}, ${rows}, delimiter=${delimiter})\n`;
};

Python.forBlock['io_yaml_load'] = function (block) {
    Python.addImport('import yaml');
    const source = Python.valueToCode(block, 'SOURCE', Python.ORDER_NONE) || "''";
    return [`yaml.safe_load(open(${source}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_yaml_dump'] = function (block) {
    Python.addImport('import yaml');
    const obj = Python.valueToCode(block, 'OBJECT', Python.ORDER_NONE) || '{}';
    const dest = Python.valueToCode(block, 'DEST', Python.ORDER_NONE) || 'None';

    const helperName = Python.provideFunction_(
        'dump_yaml',
        [`def ${Python.FUNCTION_NAME_PLACEHOLDER_}(obj, dest):`,
            `  with open(dest, 'w') as f:`,
            `    yaml.safe_dump(obj, f)`]);

    return `${helperName}(${obj}, ${dest})\n`;
};

Python.forBlock['io_bytes_from_text'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const encoding = block.getFieldValue('ENCODING');
    return [`${text}.encode('${encoding}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_text_from_bytes'] = function (block) {
    const bytes = Python.valueToCode(block, 'BYTES', Python.ORDER_MEMBER) || "b''";
    const encoding = block.getFieldValue('ENCODING');
    return [`${bytes}.decode('${encoding}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_stream_read_chunk'] = function (block) {
    const stream = Python.valueToCode(block, 'STREAM', Python.ORDER_MEMBER) || 'None';
    const size = Python.valueToCode(block, 'SIZE', Python.ORDER_NONE) || '1024';
    return [`${stream}.read(${size})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_stream_write_chunk'] = function (block) {
    const stream = Python.valueToCode(block, 'STREAM', Python.ORDER_MEMBER) || 'None';
    const chunk = Python.valueToCode(block, 'CHUNK', Python.ORDER_NONE) || "b''";
    return `${stream}.write(${chunk})\n`;
};

Python.forBlock['io_serialize_json_safe'] = function (block) {
    Python.addImport('import json');
    const obj = Python.valueToCode(block, 'OBJECT', Python.ORDER_NONE) || '{}';
    return [`json.dumps(${obj})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_deserialize_json_safe'] = function (block) {
    Python.addImport('import json');
    const json = Python.valueToCode(block, 'JSON', Python.ORDER_NONE) || "''";
    return [`json.loads(${json})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_serialize_msgpack'] = function (block) {
    Python.addImport('import msgpack');
    const obj = Python.valueToCode(block, 'OBJECT', Python.ORDER_NONE) || '{}';
    return [`msgpack.packb(${obj})`, Python.ORDER_FUNCTION_CALL];
};

// Additional Filesystem blocks moved from python.js

Python.forBlock['io_fs_glob'] = function (block) {
    Python.addImport('import glob');
    const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
    return [`glob.glob(${pattern})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_stat'] = function (block) {
    Python.addImport('import os');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`os.stat(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_walk'] = function (block) {
    Python.addImport('import os');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    const branch = Python.statementToCode(block, 'DO') || Python.PASS;
    // returns root, dirs, files
    return `for root, dirs, files in os.walk(${path}):\n${branch}`;
};

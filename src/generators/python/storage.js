import { pythonGenerator as Python } from 'blockly/python';
const pythonGenerator = Python;

Python.forBlock['storage_db_connect'] = function (block) {
    pythonGenerator.addImport('import sqlite3');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "':memory:'";
    return [`sqlite3.connect(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_db_query'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    const sql = Python.valueToCode(block, 'SQL', Python.ORDER_NONE) || "''";
    const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || '[]';
    return [`${conn}.execute(${sql}, ${params}).fetchall()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_db_select'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    const table = Python.valueToCode(block, 'TABLE', Python.ORDER_NONE) || "''";
    const where = Python.valueToCode(block, 'WHERE', Python.ORDER_NONE) || 'None';
    const whereClause = `${where} is not None`;
    return [`${conn}.execute(f"SELECT * FROM {${table}}" + (f" WHERE {${where}}" if ${whereClause} else "")).fetchall()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_db_insert'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    const table = Python.valueToCode(block, 'TABLE', Python.ORDER_NONE) || "''";
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
    const helperName = Python.nameDB_.getDistinctName('_db_insert', 'PROCEDURE');
    const funcDef = `def ${helperName}(conn, table, data):\n` +
        `  cols = ', '.join(data.keys())\n` +
        `  vals = ', '.join(['?' for _ in data])\n` +
        `  conn.execute(f"INSERT INTO {table} ({cols}) VALUES ({vals})", list(data.values()))\n` +
        `  conn.commit()\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return `${helperName}(${conn}, ${table}, ${data})\n`;
};

Python.forBlock['storage_db_update'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    const table = Python.valueToCode(block, 'TABLE', Python.ORDER_NONE) || "''";
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
    const where = Python.valueToCode(block, 'WHERE', Python.ORDER_NONE) || 'None';
    const helperName = Python.nameDB_.getDistinctName('_db_update', 'PROCEDURE');
    const funcDef = `def ${helperName}(conn, table, data, where=None):\n` +
        `  set_clause = ', '.join([f"{k} = ?" for k in data.keys()])\n` +
        `  query = f"UPDATE {table} SET {set_clause}"\n` +
        `  if where:\n` +
        `    query += f" WHERE {where}"\n` +
        `  conn.execute(query, list(data.values()))\n` +
        `  conn.commit()\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = funcDef;
    }
    return `${helperName}(${conn}, ${table}, ${data}, where=${where})\n`;
};

Python.forBlock['storage_db_transaction'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
    const branch = Python.statementToCode(block, 'DO') || 'pass';
    return `with ${conn}:\n${pythonGenerator.prefixLines(branch, pythonGenerator.INDENT)}\n`;
};

Python.forBlock['storage_cache_set'] = function (block) {
    pythonGenerator.addImport('import time');
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    const ttl = Python.valueToCode(block, 'TTL', Python.ORDER_NONE) || 'None';
    const helperName = '_cache';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    return `${helperName}[${key}] = (${value}, time.time() + ${ttl} if ${ttl} else None)\n`;
};

Python.forBlock['storage_cache_get'] = function (block) {
    pythonGenerator.addImport('import time');
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
    const helperName = '_cache';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    const getterName = Python.nameDB_.getDistinctName('_cache_get', 'PROCEDURE');
    const funcDef = `def ${getterName}(key):\n` +
        `  if key in ${helperName}:\n` +
        `    val, exp = ${helperName}[key]\n` +
        `    if exp is None or time.time() < exp:\n` +
        `      return val\n` +
        `    else:\n` +
        `      del ${helperName}[key]\n` +
        `  return None\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[getterName]) {
        Python.definitions_[getterName] = funcDef;
    }
    return [`${getterName}(${key})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_cache_delete'] = function (block) {
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
    const helperName = '_cache';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    return `${helperName}.pop(${key}, None)\n`;
};

Python.forBlock['storage_cache_incr'] = function (block) {
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
    const by = Python.valueToCode(block, 'BY', Python.ORDER_NONE) || '1';
    const helperName = '_cache';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    const incrName = Python.nameDB_.getDistinctName('_cache_incr', 'PROCEDURE');
    const funcDef = `def ${incrName}(key, by=1):\n` +
        `  if key in ${helperName}:\n` +
        `    val, exp = ${helperName}[key]\n` +
        `    ${helperName}[key] = (val + by, exp)\n` +
        `    return val + by\n` +
        `  else:\n` +
        `    ${helperName}[key] = (by, None)\n` +
        `    return by\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[incrName]) {
        Python.definitions_[incrName] = funcDef;
    }
    return [`${incrName}(${key}, ${by})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_orm_model_define'] = function (block) {
    const name = block.getFieldValue('NAME');
    const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '{}';
    // Simple class-based model creation
    return [`type('${name}', (), ${fields})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_orm_create'] = function (block) {
    const session = Python.valueToCode(block, 'SESSION', Python.ORDER_MEMBER) || 'None';
    const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || 'None';
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
    return `${session}.add(${model}(**${data}))\n${session}.commit()\n`;
};

Python.forBlock['storage_orm_query'] = function (block) {
    const session = Python.valueToCode(block, 'SESSION', Python.ORDER_MEMBER) || 'None';
    const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || 'None';
    const filters = Python.valueToCode(block, 'FILTERS', Python.ORDER_NONE) || '{}';
    return [`${session}.query(${model}).filter_by(**${filters}).all()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_migrate_schema'] = function (block) {
    const adapter = Python.valueToCode(block, 'ADAPTER', Python.ORDER_NONE) || 'None';
    // Schema migration is complex - just add a comment
    return `# Schema migration should be handled with tools like Alembic\n`;
};

Python.forBlock['storage_backup_db'] = function (block) {
    pythonGenerator.addImport('import shutil');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return `shutil.copy2('database.db', ${path})\n`;
};

Python.forBlock['storage_restore_db'] = function (block) {
    pythonGenerator.addImport('import shutil');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return `shutil.copy2(${path}, 'database.db')\n`;
};

// Additional Storage blocks moved from python.js

Python.forBlock['storage_db_execute'] = function (block) {
    const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
    const sql = Python.valueToCode(block, 'SQL', Python.ORDER_NONE) || "''";
    const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || '[]';
    return `${conn}.execute(${sql}, ${params})\n${conn}.commit()\n`;
};

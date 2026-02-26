import { pythonGenerator as Python } from 'blockly/python';
// Helper to map block types to sqlalchemy types
const sqlalchemyTypeMap = {
    'TEXT': 'String',
    'INTEGER': 'Integer',
    'FLOAT': 'Float',
    'BOOLEAN': 'Boolean',
};

Python.forBlock['db_create_engine'] = function(block, generator) {
  generator.addImport('from sqlalchemy import create_engine');
  const connectionString = generator.valueToCode(block, 'CONNECTION_STRING', generator.ORDER_ATOMIC) || "'sqlite:///:memory:'";
  const code = `create_engine(${connectionString})`;
  return [code, generator.ORDER_FUNCTION_CALL];
};

Python.forBlock['db_define_table'] = function(block, generator) {
  generator.addImport('from sqlalchemy import Table, MetaData');
  const tableName = block.getFieldValue('TABLE_NAME');
  const columnsCode = generator.statementToCode(block, 'COLUMNS');
  // The statementToCode will produce a comma-separated list of Column() calls
  const columnsList = `[${columnsCode.trim().replace(/,\s*$/, "")}]`;
  const code = `Table('${tableName}', MetaData(), *${columnsList})`;
  return [code, generator.ORDER_FUNCTION_CALL];
};

Python.forBlock['db_column_def'] = function(block, generator) {
    generator.addImport('from sqlalchemy import Column, String, Integer, Float, Boolean');
    const columnName = block.getFieldValue('COLUMN_NAME');
    const columnType = block.getFieldValue('COLUMN_TYPE');
    const isPrimaryKey = block.getFieldValue('IS_PRIMARY_KEY') === 'TRUE';

    const sqlalchemyType = sqlalchemyTypeMap[columnType] || 'String';
    // This generates a Column object, with a trailing comma for easy concatenation in the parent block.
    const code = `Column('${columnName}', ${sqlalchemyType}, primary_key=${isPrimaryKey}),\n`;
    return code;
};

Python.forBlock['db_insert'] = function(block, generator) {
  generator.addImport('from sqlalchemy import insert');
  const table = generator.valueToCode(block, 'TABLE', generator.ORDER_ATOMIC) || 'None';
  const values = generator.valueToCode(block, 'VALUES', generator.ORDER_ATOMIC) || '{}';
  const code = `insert(${table}).values(**${values})`;
  return [code, generator.ORDER_FUNCTION_CALL];
};

Python.forBlock['db_select'] = function(block, generator) {
    generator.addImport('from sqlalchemy import select');
    const table = generator.valueToCode(block, 'TABLE', generator.ORDER_ATOMIC) || 'None';
    const where_clause = generator.valueToCode(block, 'WHERE', generator.ORDER_ATOMIC);

    let code = `select(${table})`;
    if (where_clause) {
        code += `.where(${where_clause})`;
    }
    return [code, generator.ORDER_FUNCTION_CALL];
};

Python.forBlock['db_update'] = function(block, generator) {
    generator.addImport('from sqlalchemy import update');
    const table = generator.valueToCode(block, 'TABLE', generator.ORDER_ATOMIC) || 'None';
    const values = generator.valueToCode(block, 'VALUES', generator.ORDER_ATOMIC) || '{}';
    const where_clause = generator.valueToCode(block, 'WHERE', generator.ORDER_ATOMIC);

    let code = `update(${table}).values(**${values})`;
    if (where_clause) {
        code += `.where(${where_clause})`;
    }
    return [code, generator.ORDER_FUNCTION_CALL];
};

Python.forBlock['db_delete'] = function(block, generator) {
    generator.addImport('from sqlalchemy import delete');
    const table = generator.valueToCode(block, 'TABLE', generator.ORDER_ATOMIC) || 'None';
    const where_clause = generator.valueToCode(block, 'WHERE', generator.ORDER_ATOMIC);

    let code = `delete(${table})`;
    if (where_clause) {
        code += `.where(${where_clause})`;
    }
    return [code, generator.ORDER_FUNCTION_CALL];
};

Python.forBlock['db_execute_statement'] = function(block, generator) {
  const engine = generator.valueToCode(block, 'ENGINE', generator.ORDER_ATOMIC) || 'None';
  const statement = generator.valueToCode(block, 'STATEMENT', generator.ORDER_ATOMIC) || 'None';
  const code = `with ${engine}.begin() as conn:\n    conn.execute(${statement})\n`;
  return code;
};

Python.forBlock['db_fetch'] = function(block, generator) {
    const engine = generator.valueToCode(block, 'ENGINE', generator.ORDER_ATOMIC) || 'None';
    const statement = generator.valueToCode(block, 'STATEMENT', generator.ORDER_ATOMIC) || 'None';
    const fetchType = block.getFieldValue('FETCH_TYPE');
    const functionName = fetchType === 'ONE' ? 'fetchone' : 'fetchall';

    // To handle the multi-line nature of database connections within a single output block,
    // we define and call a helper function.
    const helper_func = generator.provideFunction_(
        `db_execute_and_fetch_${functionName}`,
        `
def ${generator.FUNCTION_NAME_PLACEHOLDER_}(engine, statement):
    with engine.connect() as connection:
        result = connection.execute(statement)
        return result.${functionName}()
`
    );
    const code = `${helper_func}(${engine}, ${statement})`;
    return [code, generator.ORDER_FUNCTION_CALL];
};
import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['sqlite_connect'] = function(block) {
  Python.addImport('sqlite3');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || "':memory:'";
  const code = `sqlite3.connect(${path})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sqlite_execute'] = function(block) {
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
  const query = Python.valueToCode(block, 'QUERY', Python.ORDER_NONE) || "''";
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE);
  const code = params ? `${conn}.execute(${query}, ${params})` : `${conn}.execute(${query})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sqlite_fetchall'] = function(block) {
  const cursor = Python.valueToCode(block, 'CURSOR', Python.ORDER_MEMBER) || 'None';
  const code = `${cursor}.fetchall()`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['sqlite_close'] = function(block) {
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_MEMBER) || 'None';
  return `${conn}.close()` + '\n';
};

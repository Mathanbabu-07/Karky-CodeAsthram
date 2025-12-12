import { pythonGenerator as Python } from 'blockly/python';

// Generator for the 'fastapi_create_app' block
Python['fastapi_create_app'] = function(block) {
  const code = 'fastapi_create_app()';
  return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'fastapi_add_endpoint' block
Python['fastapi_add_endpoint'] = function(block) {
  const app = Python.valueToCode(block, 'APP', Python.ORDER_ATOMIC) || 'None';
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_ATOMIC) || '""';
  const methods = `['${block.getFieldValue('METHODS')}']`;
  const handler_code = Python.statementToCode(block, 'HANDLER');

  // Define a unique function name for the handler
  const func_name = Python.provideFunction_(
    'endpoint_handler_' + block.id.replace(/-/g, '_'),
    [`def ${Python.FUNCTION_NAME_PLACEHOLDER_}():`,
     handler_code || '  pass',
     // FastAPI endpoints must return a value
     '  return {"status": "ok"}'
    ]
  );

  const code = `fastapi_add_endpoint(${app}, ${path}, ${func_name}, ${methods})\n`;
  return code;
};

// Generator for the 'fastapi_run_server' block
Python['fastapi_run_server'] = function(block) {
  const app = Python.valueToCode(block, 'APP', Python.ORDER_ATOMIC) || 'None';
  const host = `'${block.getFieldValue('HOST')}'`;
  const port = block.getFieldValue('PORT');

  const code = `fastapi_run_server(${app}, host=${host}, port=${port})\n`;
  return code;
};

// Generator for the 'fastapi_stop_server' block
Python['fastapi_stop_server'] = function(block) {
  const code = 'fastapi_stop_server()\n';
  return code;
};
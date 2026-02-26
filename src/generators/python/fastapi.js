import { pythonGenerator as Python } from 'blockly/python';
// Generator for the 'fastapi_create_app' block
Python.forBlock['fastapi_create_app'] = function (block) {
  Python.addImport('from fastapi import FastAPI');
  const code = 'FastAPI()';
  return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'fastapi_add_endpoint' block
Python.forBlock['fastapi_add_endpoint'] = function (block) {
  const app = Python.valueToCode(block, 'APP', Python.ORDER_NONE) || 'app';
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || '"/"';
  const method = block.getFieldValue('METHODS') || 'get';
  const handler_code = Python.statementToCode(block, 'HANDLER');

  // Create a unique function name
  const funcName = Python.provideFunction_(
    'endpoint_' + method + '_' + block.id.replace(/[^a-zA-Z0-9]/g, '_'),
    [`def ${Python.FUNCTION_NAME_PLACEHOLDER_}():`,
    handler_code || '  return {"status": "ok"}'
    ]
  );

  // Clean up the function definition provided by provideFunction_ to include variable name
  // But wait, provideFunction_ returns the NAME. 
  // We need to inject the decorator properly.
  // Actually, providing a decorator via provideFunction_ is hard.
  // Alternative: Generate the code inline.

  const funcDef = `
@${app}.${method.toLowerCase()}(${path})
async def endpoint_${block.id.replace(/[^a-zA-Z0-9]/g, '_')}():
${handler_code || '  return {"message": "Hello World"}'}
`;
  return funcDef;
};

// Generator for the 'fastapi_post_endpoint' block
Python.forBlock['fastapi_post_endpoint'] = function (block) {
  // Path is a FIELD, not value input
  const path = block.getFieldValue('PATH') || '/';

  // Model is a VALUE (Pydantic model)
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || 'BaseModel';

  // Body is 'DO' statement
  const handler_code = Python.statementToCode(block, 'DO');

  // App variable is implicit 'app' as it's not an input on this block
  const app = 'app';

  const funcName = 'endpoint_post_' + block.id.replace(/[^a-zA-Z0-9]/g, '_');
  const argName = 'item'; // Standard body argument name

  const funcDef = `
@${app}.post("${path}")
async def ${funcName}(${argName}: ${model}):
${handler_code || '  return {"message": "Data received", "data": item}'}
`;
  return funcDef;
};

// Generator for the 'fastapi_run_server' block
Python.forBlock['fastapi_run_server'] = function (block) {
  Python.addImport('import uvicorn');
  // Usually this block is a statement, not value
  const app_var = Python.valueToCode(block, 'APP', Python.ORDER_NONE) || 'app';
  // If APP is complex (e.g. FastAPI()), we can't easily pass it to uvicorn string.
  // Standard pattern: uvicorn.run(app, ...)
  const host = block.getFieldValue('HOST') || '127.0.0.1';
  const port = block.getFieldValue('PORT') || '8000';

  const code = `uvicorn.run(${app_var}, host="${host}", port=${port})\n`;
  return code;
};

// Generator for the 'fastapi_stop_server' block
Python.forBlock['fastapi_stop_server'] = function (block) {
  // There is no standard way to stop uvicorn from code unless running in thread.
  // Return pass for now to prevent crash.
  return 'pass # Server stop not supported in script mode\n';
};
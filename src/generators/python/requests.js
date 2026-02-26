import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['http_request_simple'] = function (block) {
  const method = block.getFieldValue('METHOD') || 'get';
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || 'None';
  Python.addImport('import requests');
  const code = `requests.${method}(${url}, params=${params})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'requests_get' block
Python.forBlock['requests_get'] = function (block) {
  Python.addImport('import requests');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || '""';
  const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_NONE) || 'None';
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || 'None';

  const code = `requests.get(${url}, headers=${headers}, params=${params})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'requests_post' block
Python.forBlock['requests_post'] = function (block) {
  Python.addImport('import requests');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || '""';
  const jsonData = Python.valueToCode(block, 'JSON_DATA', Python.ORDER_NONE) || 'None';
  const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_NONE) || 'None';

  const code = `requests.post(${url}, json=${jsonData}, headers=${headers})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'requests_put' block
Python.forBlock['requests_put'] = function (block) {
  Python.addImport('import requests');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || '""';
  const jsonData = Python.valueToCode(block, 'JSON_DATA', Python.ORDER_NONE) || 'None';
  const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_NONE) || 'None';

  const code = `requests.put(${url}, json=${jsonData}, headers=${headers})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'requests_delete' block
Python.forBlock['requests_delete'] = function (block) {
  Python.addImport('import requests');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || '""';
  const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_NONE) || 'None';

  const code = `requests.delete(${url}, headers=${headers})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'requests_get_response_value' block
Python.forBlock['requests_get_response_value'] = function (block) {
  const response = Python.valueToCode(block, 'RESPONSE', Python.ORDER_MEMBER) || '{}';
  const getKey = block.getFieldValue('KEY') || 'content'; // Assume dropdown or field

  let code;
  if (getKey === 'json') {
    code = `${response}.json()`;
  } else if (getKey === 'status_code') {
    code = `${response}.status_code`;
  } else {
    code = `${response}.text`;
  }
  return [code, Python.ORDER_MEMBER];
};
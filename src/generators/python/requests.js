import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['http_request_simple'] = function(block) {
  const method = block.getFieldValue('METHOD') || 'get';
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || 'None';
  Python.addImport('requests');
  const code = `requests.${method}(${url}, params=${params})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'requests_get' block
Python['requests_get'] = function(block) {
  const url = Python.valueToCode(block, 'URL', Python.ORDER_ATOMIC) || '""';
  const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_ATOMIC) || 'None';
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_ATOMIC) || 'None';

  const code = `requests_get(${url}, headers=${headers}, params=${params})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'requests_post' block
Python['requests_post'] = function(block) {
  const url = Python.valueToCode(block, 'URL', Python.ORDER_ATOMIC) || '""';
  const jsonData = Python.valueToCode(block, 'JSON_DATA', Python.ORDER_ATOMIC) || 'None';
  const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_ATOMIC) || 'None';

  const code = `requests_post(${url}, json_data=${jsonData}, headers=${headers})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'requests_put' block
Python['requests_put'] = function(block) {
    const url = Python.valueToCode(block, 'URL', Python.ORDER_ATOMIC) || '""';
    const jsonData = Python.valueToCode(block, 'JSON_DATA', Python.ORDER_ATOMIC) || 'None';
    const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_ATOMIC) || 'None';

    const code = `requests_put(${url}, json_data=${jsonData}, headers=${headers})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'requests_delete' block
Python['requests_delete'] = function(block) {
    const url = Python.valueToCode(block, 'URL', Python.ORDER_ATOMIC) || '""';
    const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_ATOMIC) || 'None';

    const code = `requests_delete(${url}, headers=${headers})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

// Generator for the 'requests_get_response_value' block
Python['requests_get_response_value'] = function(block) {
    const response = Python.valueToCode(block, 'RESPONSE', Python.ORDER_ATOMIC) || '{}';
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_ATOMIC) || '""';

    const code = `${response}.get(${key})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};
import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['json_loads'] = function(block) {
  Python.addImport('import json');
  const json_string = Python.valueToCode(block, 'JSON_STRING', Python.ORDER_ATOMIC);
  const code = `json.loads(${json_string})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

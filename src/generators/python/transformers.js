import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['transformers_pipeline'] = function(block) {
  Python.addImport('from transformers import pipeline');
  const task = block.getFieldValue('TASK');
  const code = `pipeline('${task}')`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

import { pythonGenerator as Python } from 'blockly/python';

// subprocess.run generator
Python.forBlock['automation_subprocess_run'] = function(block) {
  Python.addImport('subprocess');
  const cmd = Python.valueToCode(block, 'CMD', Python.ORDER_NONE) || '"echo"';
  const capture = block.getFieldValue('CAPTURE') === 'TRUE';
  const text = block.getFieldValue('TEXT') === 'TRUE';
  const args = [cmd];
  if (capture) args.push('capture_output=True');
  if (text) args.push('text=True');
  const code = `subprocess.run(${args.join(', ')})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

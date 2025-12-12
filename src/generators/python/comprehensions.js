import { pythonGenerator as Python } from 'blockly/python';

// List comprehension with optional condition
Python.forBlock['comprehension_list_with_if'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'x';
  const varName = block.getFieldValue('VAR') || 'x';
  const iter = Python.valueToCode(block, 'ITER', Python.ORDER_NONE) || '[]';
  const haveIf = block.getFieldValue('HAS_IF') === 'TRUE';
  const cond = Python.valueToCode(block, 'IF', Python.ORDER_NONE) || 'True';
  const code = haveIf ? `[${expr} for ${varName} in ${iter} if ${cond}]` : `[${expr} for ${varName} in ${iter}]`;
  return [code, Python.ORDER_ATOMIC];
};

// Existing simple comprehension blocks
Python.forBlock['control_list_comp'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'x';
  const varName = Python.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
  const iter = Python.valueToCode(block, 'ITER', Python.ORDER_NONE) || '[]';
  const condInput = block.getInput('COND');
  const cond = condInput ? (Python.valueToCode(block, 'COND', Python.ORDER_NONE) || 'True') : null;
  const code = cond ? `[${expr} for ${varName} in ${iter} if ${cond}]` : `[${expr} for ${varName} in ${iter}]`;
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['control_set_comp'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'x';
  const varName = Python.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
  const iter = Python.valueToCode(block, 'ITER', Python.ORDER_NONE) || '[]';
  const condInput = block.getInput('COND');
  const cond = condInput ? (Python.valueToCode(block, 'COND', Python.ORDER_NONE) || 'True') : null;
  const code = cond ? `{${expr} for ${varName} in ${iter} if ${cond}}` : `{${expr} for ${varName} in ${iter}}`;
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['control_gen_expr'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'x';
  const varName = Python.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
  const iter = Python.valueToCode(block, 'ITER', Python.ORDER_NONE) || '[]';
  const condInput = block.getInput('COND');
  const cond = condInput ? (Python.valueToCode(block, 'COND', Python.ORDER_NONE) || 'True') : null;
  const code = cond ? `(${expr} for ${varName} in ${iter} if ${cond})` : `(${expr} for ${varName} in ${iter})`;
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['control_dict_comp'] = function(block) {
  const keyExpr = Python.valueToCode(block, 'KEY_EXPR', Python.ORDER_NONE) || 'k';
  const valueExpr = Python.valueToCode(block, 'VALUE_EXPR', Python.ORDER_NONE) || 'v';
  const varName = Python.nameDB_.getName(block.getFieldValue('VAR'), 'VARIABLE');
  const iter = Python.valueToCode(block, 'ITER', Python.ORDER_NONE) || '[]';
  const condInput = block.getInput('COND');
  const cond = condInput ? (Python.valueToCode(block, 'COND', Python.ORDER_NONE) || 'True') : null;
  const code = cond ? `{${keyExpr}: ${valueExpr} for ${varName} in ${iter} if ${cond}}` : `{${keyExpr}: ${valueExpr} for ${varName} in ${iter}}`;
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['control_dict_zip_comp'] = function(block) {
  const keyExpr = Python.valueToCode(block, 'KEY_EXPR', Python.ORDER_NONE) || 'k';
  const valueExpr = Python.valueToCode(block, 'VALUE_EXPR', Python.ORDER_NONE) || 'v';
  const var1 = Python.nameDB_.getName(block.getFieldValue('VAR1'), 'VARIABLE');
  const var2 = Python.nameDB_.getName(block.getFieldValue('VAR2'), 'VARIABLE');
  const iter1 = Python.valueToCode(block, 'ITER1', Python.ORDER_NONE) || '[]';
  const iter2 = Python.valueToCode(block, 'ITER2', Python.ORDER_NONE) || '[]';
  const condInput = block.getInput('COND');
  const cond = condInput ? (Python.valueToCode(block, 'COND', Python.ORDER_NONE) || 'True') : null;
  const zipIter = `zip(${iter1}, ${iter2})`;
  const code = cond ? `{${keyExpr}: ${valueExpr} for ${var1}, ${var2} in ${zipIter} if ${cond}}` : `{${keyExpr}: ${valueExpr} for ${var1}, ${var2} in ${zipIter}}`;
  return [code, Python.ORDER_ATOMIC];
};

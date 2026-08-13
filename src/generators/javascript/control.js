import { javascriptGenerator } from 'blockly/javascript';

// Sub-phase 4.1: JavaScript Control Structures, Branching & Conditionals Generators

javascriptGenerator.forBlock['if_block'] = function(block, generator) {
  let n = 0;
  let code = '';
  let branchCode, conditionCode;
  do {
    conditionCode = generator.valueToCode(block, 'IF' + n, generator.ORDER_NONE) || 'false';
    branchCode = generator.statementToCode(block, 'DO' + n);
    code += (n > 0 ? ' else ' : '') + 'if (' + conditionCode + ') {\n' + branchCode + '}';
    n++;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = generator.statementToCode(block, 'ELSE');
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

javascriptGenerator.forBlock['controls_if'] = function(block, generator) {
  let n = 0;
  let code = '';
  let branchCode, conditionCode;
  if (generator.STATEMENT_PREFIX) {
    code += generator.injectId(generator.STATEMENT_PREFIX, block);
  }
  do {
    conditionCode = generator.valueToCode(block, 'IF' + n, generator.ORDER_NONE) || 'false';
    branchCode = generator.statementToCode(block, 'DO' + n);
    if (generator.STATEMENT_SUFFIX) {
      branchCode = generator.injectId(generator.STATEMENT_SUFFIX, block) + branchCode;
    }
    code += (n > 0 ? ' else ' : '') + 'if (' + conditionCode + ') {\n' + branchCode + '}';
    n++;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || block.elseCount_) {
    branchCode = generator.statementToCode(block, 'ELSE');
    if (generator.STATEMENT_SUFFIX) {
      branchCode = generator.injectId(generator.STATEMENT_SUFFIX, block) + branchCode;
    }
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

javascriptGenerator.forBlock['js_if_else'] = function(block, generator) {
  const cond = generator.valueToCode(block, 'COND', generator.ORDER_NONE) ||
               generator.valueToCode(block, 'IF', generator.ORDER_NONE) ||
               'false';
  const branchThen = generator.statementToCode(block, 'THEN') || generator.statementToCode(block, 'DO');
  const branchElse = generator.statementToCode(block, 'ELSE');
  let code = `if (${cond}) {\n${branchThen}}`;
  if (branchElse) {
    code += ` else {\n${branchElse}}`;
  }
  return code + '\n';
};

javascriptGenerator.forBlock['control_condition_expr'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || '0';
  const rawOp = block.getFieldValue('OP');
  const opMap = {
    'EQ': '===',
    'NEQ': '!==',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>=',
    'IN': 'in',
    'NOT_IN': 'in',
    'IS': '===',
    'IS_NOT': '!=='
  };
  const op = opMap[rawOp] || rawOp || '===';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '0';
  if (rawOp === 'NOT_IN') {
    return [`!(${a} in ${b})`, generator.ORDER_UNARY_NEGATION];
  }
  return [`${a} ${op} ${b}`, generator.ORDER_RELATIONAL];
};

javascriptGenerator.forBlock['control_logical_combine'] = function(block, generator) {
  const op = block.getFieldValue('LOGICAL_OP') || 'AND';
  const left = generator.valueToCode(block, 'LEFT', generator.ORDER_NONE) || 'false';
  if (op === 'NOT') {
    return [`!(${left})`, generator.ORDER_UNARY_NEGATION];
  }
  const right = generator.valueToCode(block, 'RIGHT', generator.ORDER_NONE) || 'false';
  const jsOp = op === 'AND' ? '&&' : '||';
  const order = jsOp === '&&' ? generator.ORDER_LOGICAL_AND : generator.ORDER_LOGICAL_OR;
  return [`${left} ${jsOp} ${right}`, order];
};

javascriptGenerator.forBlock['control_if_truthy'] = function(block, generator) {
  const expr = generator.valueToCode(block, 'EXPR', generator.ORDER_NONE) || 'false';
  const branch = generator.statementToCode(block, 'DO');
  return `if (Boolean(${expr})) {\n${branch}}\n`;
};

javascriptGenerator.forBlock['control_if_main'] = function(block, generator) {
  const branch = generator.statementToCode(block, 'DO');
  return `if (typeof require !== 'undefined' && require.main === module) {\n${branch}}\n`;
};

javascriptGenerator.forBlock['js_switch'] = function(block, generator) {
  const val = generator.valueToCode(block, 'VAL', generator.ORDER_NONE) ||
              generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) ||
              'val';
  const cases = generator.statementToCode(block, 'CASES') || generator.statementToCode(block, 'DO');
  return `switch (${val}) {\n${cases}}\n`;
};

javascriptGenerator.forBlock['control_switch'] = function(block, generator) {
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) ||
              generator.valueToCode(block, 'EXPR', generator.ORDER_NONE) ||
              'val';
  const cases = generator.statementToCode(block, 'DO') || generator.statementToCode(block, 'CASES');
  return `switch (${val}) {\n${cases}}\n`;
};

javascriptGenerator.forBlock['control_case'] = function(block, generator) {
  const pattern = generator.valueToCode(block, 'PATTERN', generator.ORDER_NONE) || 'null';
  const branch = generator.statementToCode(block, 'DO');
  return `case ${pattern}:\n${branch}break;\n`;
};

javascriptGenerator.forBlock['control_return'] = function(block, generator) {
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '';
  return `return ${val};\n`;
};

javascriptGenerator.forBlock['control_try_except'] = function(block, generator) {
  const tryBranch = generator.statementToCode(block, 'TRY');
  const catchBranch = generator.statementToCode(block, 'EXCEPT');
  return `try {\n${tryBranch}} catch (err) {\n${catchBranch}}\n`;
};

javascriptGenerator.forBlock['control_try_except_finally'] = function(block, generator) {
  const tryBranch = generator.statementToCode(block, 'TRY');
  const catchBranch = generator.statementToCode(block, 'EXCEPT');
  const finallyBranch = generator.statementToCode(block, 'FINALLY');
  return `try {\n${tryBranch}} catch (err) {\n${catchBranch}} finally {\n${finallyBranch}}\n`;
};

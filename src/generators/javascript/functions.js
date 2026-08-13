import { javascriptGenerator } from 'blockly/javascript';

// Phase 5: JavaScript Function Declarations, Arrow Expressions & Procedure Generators

javascriptGenerator.forBlock['js_function_decl'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || 'myFunction';
  const params = block.getFieldValue('PARAMS') || '';
  const body = generator.statementToCode(block, 'BODY');
  return `function ${name}(${params}) {\n${body}}\n`;
};

javascriptGenerator.forBlock['js_arrow_function'] = function(block, generator) {
  const params = block.getFieldValue('PARAMS') || '';
  const body = generator.statementToCode(block, 'BODY');
  return [`(${params}) => {\n${body}}`, generator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['js_function_call'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || 'myFunction';
  const args = generator.valueToCode(block, 'ARGS', generator.ORDER_NONE) || '';
  return `${name}(${args});\n`;
};

javascriptGenerator.forBlock['js_return'] = function(block, generator) {
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '';
  return `return ${val};\n`;
};

javascriptGenerator.forBlock['procedures_defnoreturn'] = function(block, generator) {
  const funcName = generator.nameDB_ ? generator.nameDB_.getName(block.getFieldValue('NAME'), 'PROCEDURE') : (block.getFieldValue('NAME') || 'myFunction');
  let xfix1 = '';
  if (generator.STATEMENT_PREFIX) {
    xfix1 = generator.injectId(generator.STATEMENT_PREFIX, block);
  }
  let branch = generator.statementToCode(block, 'STACK');
  if (generator.STATEMENT_SUFFIX) {
    branch = generator.injectId(generator.STATEMENT_SUFFIX, block) + branch;
  }

  const args = [];
  const variables = block.getVars ? block.getVars() : (block.arguments_ || []);
  for (let i = 0; i < variables.length; i++) {
    args[i] = generator.nameDB_ ? generator.nameDB_.getName(variables[i], 'VARIABLE') : variables[i];
  }

  return `function ${funcName}(${args.join(', ')}) {\n${xfix1}${branch}}\n`;
};

javascriptGenerator.forBlock['procedures_defreturn'] = function(block, generator) {
  const funcName = generator.nameDB_ ? generator.nameDB_.getName(block.getFieldValue('NAME'), 'PROCEDURE') : (block.getFieldValue('NAME') || 'myFunction');
  let branch = generator.statementToCode(block, 'STACK');
  let returnValue = generator.valueToCode(block, 'RETURN', generator.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = generator.INDENT + 'return ' + returnValue + ';\n';
  }

  const args = [];
  const variables = block.getVars ? block.getVars() : (block.arguments_ || []);
  for (let i = 0; i < variables.length; i++) {
    args[i] = generator.nameDB_ ? generator.nameDB_.getName(variables[i], 'VARIABLE') : variables[i];
  }

  return `function ${funcName}(${args.join(', ')}) {\n${branch}${returnValue}}\n`;
};

javascriptGenerator.forBlock['procedures_callnoreturn'] = function(block, generator) {
  const funcName = generator.nameDB_ ? generator.nameDB_.getName(block.getFieldValue('NAME'), 'PROCEDURE') : (block.getFieldValue('NAME') || 'myFunction');
  const args = [];
  const variables = block.arguments_ || [];
  for (let i = 0; i < variables.length; i++) {
    args[i] = generator.valueToCode(block, 'ARG' + i, generator.ORDER_NONE) || 'null';
  }
  return `${funcName}(${args.join(', ')});\n`;
};

javascriptGenerator.forBlock['procedures_callreturn'] = function(block, generator) {
  const funcName = generator.nameDB_ ? generator.nameDB_.getName(block.getFieldValue('NAME'), 'PROCEDURE') : (block.getFieldValue('NAME') || 'myFunction');
  const args = [];
  const variables = block.arguments_ || [];
  for (let i = 0; i < variables.length; i++) {
    args[i] = generator.valueToCode(block, 'ARG' + i, generator.ORDER_NONE) || 'null';
  }
  return [`${funcName}(${args.join(', ')})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['essentials_function_def'] = function(block, generator) {
  const funcName = block.getFieldValue('NAME') || 'myFunction';
  const params = block.getFieldValue('PARAMS') || '';
  const body = generator.statementToCode(block, 'BODY');
  return `function ${funcName}(${params}) {\n${body}}\n`;
};

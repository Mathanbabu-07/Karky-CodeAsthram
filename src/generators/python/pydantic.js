import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['pydantic_create_model'] = function(block) {
  Python.addImport('from pydantic import BaseModel');
  const name = block.getFieldValue('NAME');
  const fields = Python.statementToCode(block, 'FIELDS');

  const code = `
class ${name}(BaseModel):
${fields}
`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pydantic_field'] = function(block) {
  const name = block.getFieldValue('NAME');
  const type = block.getFieldValue('TYPE');
  return `    ${name}: ${type}\n`;
};

import { javascriptGenerator } from 'blockly/javascript';

// OOP Class Generators for JavaScript

javascriptGenerator.forBlock['oop_class'] = function(block, generator) {
  const className = block.getFieldValue('NAME') || 'MyClass';
  const body = generator.statementToCode(block, 'BODY');
  return `class ${className} {\n${body}}\n`;
};

javascriptGenerator.forBlock['oop_constructor'] = function(block, generator) {
  const params = block.getFieldValue('PARAMS') || '';
  const body = generator.statementToCode(block, 'BODY');
  return `constructor(${params}) {\n${body}}\n`;
};

javascriptGenerator.forBlock['oop_method'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || 'myMethod';
  const params = block.getFieldValue('PARAMS') || '';
  const body = generator.statementToCode(block, 'BODY');
  return `${name}(${params}) {\n${body}}\n`;
};

javascriptGenerator.forBlock['oop_super_init'] = function(block, generator) {
  const args = block.getFieldValue('ARGS') || '';
  return `super(${args});\n`;
};

javascriptGenerator.forBlock['oop_super_call'] = function(block, generator) {
  const method = block.getFieldValue('METHOD') || 'superMethod';
  const args = block.getFieldValue('ARGS') || '';
  return `super.${method}(${args});\n`;
};

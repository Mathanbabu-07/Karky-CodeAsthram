import { javascriptGenerator } from 'blockly/javascript';

// Safe helper to extract statements from various possible input names
function getStatement(generator, block, ...names) {
  for (const name of names) {
    if (block.getInput(name)) {
      return generator.statementToCode(block, name) || '';
    }
  }
  return '';
}

// Safe helper to collect parameters from mutator fields or args
function getParams(block) {
  const params = [];
  let i = 0;
  while (block.getFieldValue('P' + i) || block.getFieldValue('ARG' + i)) {
    const val = block.getFieldValue('P' + i) || block.getFieldValue('ARG' + i);
    if (val) params.push(val);
    i++;
  }
  if (params.length === 0 && block.arguments_ && Array.isArray(block.arguments_)) {
    return block.arguments_;
  }
  if (params.length === 0) {
    const raw = block.getFieldValue('PARAMS');
    if (raw) params.push(raw);
  }
  return params;
}

// OOP Class Generators for JavaScript

javascriptGenerator.forBlock['oop_class'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const className = block.getFieldValue('NAME') || 'MyClass';
  const base = block.getInput('BASE') ? gen.valueToCode(block, 'BASE', gen.ORDER_NONE) : '';
  const extendsClause = base && base !== "''" && base !== '""' ? ` extends ${base.replace(/['"]/g, '')}` : '';
  const body = getStatement(gen, block, 'DO', 'BODY', 'STACK', 'MEMBERS');
  return `class ${className}${extendsClause} {\n${body}}\n`;
};

javascriptGenerator.forBlock['oop_constructor'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const params = getParams(block);
  const body = getStatement(gen, block, 'DO', 'BODY', 'STACK');
  
  // Check if inside a class or standalone on workspace
  const parent = block.getParent();
  const isInsideClass = parent && parent.type === 'oop_class';
  
  if (isInsideClass) {
    return `constructor(${params.join(', ')}) {\n${body}}\n`;
  }
  // Standalone anchor fallback
  return `class MyClass {\n  constructor(${params.join(', ')}) {\n${gen.prefixLines(body, '    ')}  }\n}\n`;
};

javascriptGenerator.forBlock['oop_method'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const name = block.getFieldValue('NAME') || 'myMethod';
  const params = getParams(block);
  const body = getStatement(gen, block, 'DO', 'BODY', 'STACK');
  
  const parent = block.getParent();
  const isInsideClass = parent && parent.type === 'oop_class';
  
  if (isInsideClass) {
    return `${name}(${params.join(', ')}) {\n${body}}\n`;
  }
  // Standalone anchor fallback
  return `function ${name}(${params.join(', ')}) {\n${body}}\n`;
};

javascriptGenerator.forBlock['oop_super_init'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  let args = '';
  if (block.getInput('ARGS')) {
    args = gen.valueToCode(block, 'ARGS', gen.ORDER_NONE) || '';
  }
  return `super(${args});\n`;
};

javascriptGenerator.forBlock['oop_super_call'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const method = block.getFieldValue('METHOD') || 'superMethod';
  let args = '';
  if (block.getInput('ARGS')) {
    args = gen.valueToCode(block, 'ARGS', gen.ORDER_NONE) || '';
  }
  return `super.${method}(${args});\n`;
};

javascriptGenerator.forBlock['oop_magic_method'] = function(block, generator) {
  const gen = generator || javascriptGenerator;
  const magic = block.getFieldValue('MAGIC_METHOD') || 'STR';
  const body = getStatement(gen, block, 'DO', 'BODY', 'STACK');
  const name = magic.toLowerCase();
  return `${name}() {\n${body}}\n`;
};

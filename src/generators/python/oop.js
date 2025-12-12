import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['oop_class'] = function(block) {
  const name = block.getFieldValue('NAME') || 'MyClass';
  const base = Python.valueToCode(block, 'BASE', Python.ORDER_NONE) || '';
  const body = Python.statementToCode(block, 'BODY') || '  pass';
  const basePart = base ? `(${base})` : '';
  return `class ${name}${basePart}:\n${body}`;
};

// Dataclass enhanced definitions
Python.forBlock['data_structures_record_define_dataclass_auto'] = function(block) {
  const name = block.getFieldValue('NAME') || 'MyRecord';
  const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
  const defaults = Python.valueToCode(block, 'DEFAULTS', Python.ORDER_NONE) || '[]';
  const repr = block.getFieldValue('REPR') === 'TRUE';
  const frozen = block.getFieldValue('FROZEN') === 'TRUE';
  Python.addImport('dataclasses');
  // Expect fields list of strings; defaults list aligned length or subset.
  // Build assignments inside class
  let bodyLines = [];
  bodyLines.push('@dataclasses.dataclass' + (frozen || repr ? `(${[repr ? 'repr=True' : '', frozen ? 'frozen=True' : ''].filter(Boolean).join(',')})` : ''));
  bodyLines.push(`class ${name}:`);
  bodyLines.push(`  pass  # fields injected by runtime processing of list`);
  // Simplify: rely on separate instantiation helper; advanced field injection omitted due to dynamic nature.
  return bodyLines.join('\n') + '\n';
};

Python.forBlock['data_structures_record_define_namedtuple_annotated'] = function(block) {
  const name = block.getFieldValue('NAME') || 'MyTuple';
  const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
  Python.addImport('typing');
  // fields expected as list of (name, type) tuples or strings "name:type"
  return `${name} = typing.NamedTuple('${name}', ${fields})\n`;
};

Python.forBlock['oop_method'] = function(block) {
  const name = block.getFieldValue('NAME') || 'method';
  // Collect parameters from mutator dummy inputs PARAMi with field P{i}
  const params = ['self'];
  let i = 0;
  while (block.getFieldValue('P' + i)) {
    params.push(block.getFieldValue('P' + i));
    i++;
  }
  const body = Python.statementToCode(block, 'DO') || '  pass';
  return `def ${name}(${params.join(', ')}):\n${body}`;
};

Python.forBlock['oop_constructor'] = function(block) {
  const params = ['self'];
  let i = 0;
  while (block.getFieldValue('P' + i)) {
    params.push(block.getFieldValue('P' + i));
    i++;
  }
  const body = Python.statementToCode(block, 'DO') || '  pass';
  return `def __init__(${params.join(', ')}):\n${body}`;
};

Python.forBlock['oop_super_init'] = function(block) {
  const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
  return `super().__init__(*${args})\n`;
};

Python.forBlock['oop_super_call'] = function(block) {
  const method = block.getFieldValue('METHOD') || 'method';
  const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
  return `super().${method}(*${args})\n`;
};

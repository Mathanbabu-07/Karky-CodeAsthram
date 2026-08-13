import { javascriptGenerator } from 'blockly/javascript';

// Sub-phases 6.1 & 6.2: JavaScript Native Arrays & Higher-Order Iterators Generators

javascriptGenerator.forBlock['js_array_create'] = function(block) {
  const items = block.getFieldValue('ITEMS') || '';
  return [`[${items}]`, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['js_array_push_pop'] = function(block, generator) {
  const arr = generator.valueToCode(block, 'ARR', generator.ORDER_MEMBER) || 'arr';
  const action = block.getFieldValue('ACTION') || 'push';
  const val = generator.valueToCode(block, 'VAL', generator.ORDER_NONE) || '';
  return `${arr}.${action}(${val});\n`;
};

javascriptGenerator.forBlock['js_array_get_set'] = function(block, generator) {
  const arr = generator.valueToCode(block, 'ARR', generator.ORDER_MEMBER) || 'arr';
  const idx = generator.valueToCode(block, 'INDEX', generator.ORDER_NONE) || '0';
  return [`${arr}[${idx}]`, generator.ORDER_MEMBER];
};

javascriptGenerator.forBlock['js_array_length'] = function(block, generator) {
  const arr = generator.valueToCode(block, 'ARR', generator.ORDER_MEMBER) || 'arr';
  return [`${arr}.length`, generator.ORDER_MEMBER];
};

javascriptGenerator.forBlock['js_array_map_filter'] = function(block, generator) {
  const arr = generator.valueToCode(block, 'ARR', generator.ORDER_MEMBER) || 'arr';
  const method = block.getFieldValue('METHOD') || 'map';
  const cb = generator.valueToCode(block, 'CALLBACK', generator.ORDER_NONE) || 'x => x';
  return [`${arr}.${method}(${cb})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_array_includes'] = function(block, generator) {
  const arr = generator.valueToCode(block, 'ARR', generator.ORDER_MEMBER) || 'arr';
  const val = generator.valueToCode(block, 'VAL', generator.ORDER_NONE) || '';
  return [`${arr}.includes(${val})`, generator.ORDER_FUNCTION_CALL];
};

import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import './javascript/block_definitions.js';
import './javascript/variables.js';
import './javascript/math.js';
import './javascript/logic.js';
import './javascript/builtins.js';
import './javascript/control.js';
import './javascript/loops.js';
import './javascript/functions.js';
import './javascript/arrays.js';
import './javascript/objects.js';
import './javascript/collections.js';
import './javascript/oop.js';
import './javascript/sorting.js';

// Ensure Blockly is available globally
if (!globalThis.Blockly) {
  globalThis.Blockly = Blockly;
}

// Make JavaScript generator available globally
globalThis.JavaScript = javascriptGenerator;

// Clean finish method preventing redundant top-level var declarations
javascriptGenerator.finish = function(code) {
  if (javascriptGenerator.definitions_) {
    delete javascriptGenerator.definitions_['variables'];
  }
  const definitions = Object.values(javascriptGenerator.definitions_ || {});
  return definitions.join('\n') + (definitions.length ? '\n\n' : '') + code;
};

// Fail-safe blockToCode wrapper so missing block definitions never crash code generation
const originalBlockToCode = javascriptGenerator.blockToCode;
javascriptGenerator.blockToCode = function(block, opt_thisOnly) {
  if (!block) return '';
  if (!javascriptGenerator.forBlock[block.type]) {
    console.warn(`[JavaScript Generator] Missing generator for block "${block.type}". Using fallback comment.`);
    return `/* ${block.type} */\n`;
  }
  try {
    return originalBlockToCode.call(javascriptGenerator, block, opt_thisOnly);
  } catch (err) {
    console.error(`[JavaScript Generator] Error in generator for "${block.type}":`, err);
    return `/* error in ${block.type}: ${err.message} */\n`;
  }
};

// Generators for JavaScript specific blocks
javascriptGenerator.forBlock['js_var_let'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'x';
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_ASSIGNMENT) || '0';
  return `let ${varName} = ${val};\n`;
};

javascriptGenerator.forBlock['js_var_const'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'PI';
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_ASSIGNMENT) || '0';
  return `const ${varName} = ${val};\n`;
};

javascriptGenerator.forBlock['js_var_assign'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'x';
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_ASSIGNMENT) || '0';
  return `${varName} = ${val};\n`;
};

javascriptGenerator.forBlock['js_typeof'] = function(block, generator) {
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_UNARY_PREFIX) || 'null';
  return [`typeof ${val}`, generator.ORDER_UNARY_PREFIX];
};

javascriptGenerator.forBlock['js_type_convert'] = function(block, generator) {
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '""';
  const type = block.getFieldValue('TYPE') || 'Number';
  return [`${type}(${val})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_math_arithmetic'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || '0';
  const op = block.getFieldValue('OP') || '+';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '0';
  return [`${a} ${op} ${b}`, generator.ORDER_ADDITION];
};

javascriptGenerator.forBlock['js_logic_compare'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || '0';
  const op = block.getFieldValue('OP') || '===';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '0';
  return [`${a} ${op} ${b}`, generator.ORDER_RELATIONAL];
};

javascriptGenerator.forBlock['js_logic_operation'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || 'false';
  const op = block.getFieldValue('OP') || '&&';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || 'false';
  return [`${a} ${op} ${b}`, generator.ORDER_LOGICAL_AND];
};

javascriptGenerator.forBlock['js_nullish_coalescing'] = function(block, generator) {
  const a = generator.valueToCode(block, 'A', generator.ORDER_NONE) || 'null';
  const b = generator.valueToCode(block, 'B', generator.ORDER_NONE) || '""';
  return [`${a} ?? ${b}`, generator.ORDER_LOGICAL_OR];
};

javascriptGenerator.forBlock['js_optional_chaining'] = function(block, generator) {
  const obj = generator.valueToCode(block, 'OBJ', generator.ORDER_MEMBER) || 'obj';
  const prop = block.getFieldValue('PROP') || 'prop';
  return [`${obj}?.${prop}`, generator.ORDER_MEMBER];
};

javascriptGenerator.forBlock['js_if_else'] = function(block, generator) {
  const cond = generator.valueToCode(block, 'COND', generator.ORDER_NONE) || 'false';
  const branchThen = generator.statementToCode(block, 'THEN');
  const branchElse = generator.statementToCode(block, 'ELSE');
  let code = `if (${cond}) {\n${branchThen}}`;
  if (branchElse) {
    code += ` else {\n${branchElse}}`;
  }
  return code + '\n';
};

javascriptGenerator.forBlock['js_switch'] = function(block, generator) {
  const val = generator.valueToCode(block, 'VAL', generator.ORDER_NONE) || 'val';
  const cases = generator.statementToCode(block, 'CASES');
  return `switch (${val}) {\n${cases}}\n`;
};

javascriptGenerator.forBlock['js_for_loop'] = function(block, generator) {
  const varName = block.getFieldValue('VAR') || 'i';
  const from = generator.valueToCode(block, 'FROM', generator.ORDER_ASSIGNMENT) || '0';
  const to = generator.valueToCode(block, 'TO', generator.ORDER_RELATIONAL) || '10';
  const step = generator.valueToCode(block, 'STEP', generator.ORDER_ASSIGNMENT) || '1';
  const branch = generator.statementToCode(block, 'DO');
  return `for (let ${varName} = ${from}; ${varName} < ${to}; ${varName} += ${step}) {\n${branch}}\n`;
};

javascriptGenerator.forBlock['js_for_of'] = function(block, generator) {
  const item = block.getFieldValue('ITEM') || 'item';
  const list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE) || '[]';
  const branch = generator.statementToCode(block, 'DO');
  return `for (const ${item} of ${list}) {\n${branch}}\n`;
};

javascriptGenerator.forBlock['js_for_in'] = function(block, generator) {
  const key = block.getFieldValue('KEY') || 'key';
  const obj = generator.valueToCode(block, 'OBJ', generator.ORDER_NONE) || '{}';
  const branch = generator.statementToCode(block, 'DO');
  return `for (const ${key} in ${obj}) {\n${branch}}\n`;
};

javascriptGenerator.forBlock['js_while'] = function(block, generator) {
  const cond = generator.valueToCode(block, 'COND', generator.ORDER_NONE) || 'false';
  const branch = generator.statementToCode(block, 'DO');
  return `while (${cond}) {\n${branch}}\n`;
};

javascriptGenerator.forBlock['js_break_continue'] = function(block) {
  const action = block.getFieldValue('ACTION') || 'break';
  return `${action};\n`;
};

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

javascriptGenerator.forBlock['js_array_create'] = function(block) {
  const items = block.getFieldValue('ITEMS') || '';
  return [`[${items}]`, generator.ORDER_ATOMIC];
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

javascriptGenerator.forBlock['js_object_create'] = function(block) {
  const jsonStr = block.getFieldValue('JSON_STR') || '';
  return [`{ ${jsonStr} }`, generator.ORDER_ATOMIC];
};

javascriptGenerator.forBlock['js_object_get_set'] = function(block, generator) {
  const obj = generator.valueToCode(block, 'OBJ', generator.ORDER_MEMBER) || 'obj';
  const prop = block.getFieldValue('PROP') || 'prop';
  return [`${obj}.${prop}`, generator.ORDER_MEMBER];
};

javascriptGenerator.forBlock['js_json_stringify'] = function(block, generator) {
  const obj = generator.valueToCode(block, 'OBJ', generator.ORDER_NONE) || '{}';
  return [`JSON.stringify(${obj})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_json_parse'] = function(block, generator) {
  const str = generator.valueToCode(block, 'STR', generator.ORDER_NONE) || '"{}"';
  return [`JSON.parse(${str})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_map_create'] = function() {
  return ['new Map()', javascriptGenerator.ORDER_NEW];
};

javascriptGenerator.forBlock['js_map_set_get'] = function(block, generator) {
  const map = generator.valueToCode(block, 'MAP', generator.ORDER_MEMBER) || 'map';
  const action = block.getFieldValue('ACTION') || 'set';
  const key = generator.valueToCode(block, 'KEY', generator.ORDER_NONE) || '';
  const val = generator.valueToCode(block, 'VAL', generator.ORDER_NONE) || '';
  const args = action === 'set' ? `${key}, ${val}` : key;
  return [`${map}.${action}(${args})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_set_create'] = function() {
  return ['new Set()', javascriptGenerator.ORDER_NEW];
};

javascriptGenerator.forBlock['js_set_add_has'] = function(block, generator) {
  const set = generator.valueToCode(block, 'SET', generator.ORDER_MEMBER) || 'set';
  const action = block.getFieldValue('ACTION') || 'add';
  const val = generator.valueToCode(block, 'VAL', generator.ORDER_NONE) || '';
  return [`${set}.${action}(${val})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_class_define'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || 'MyClass';
  const body = generator.statementToCode(block, 'BODY');
  return `class ${name} {\n${body}}\n`;
};

javascriptGenerator.forBlock['js_constructor'] = function(block, generator) {
  const params = block.getFieldValue('PARAMS') || '';
  const body = generator.statementToCode(block, 'BODY');
  return `constructor(${params}) {\n${body}}\n`;
};

javascriptGenerator.forBlock['js_class_method'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || 'myMethod';
  const params = block.getFieldValue('PARAMS') || '';
  const body = generator.statementToCode(block, 'BODY');
  return `${name}(${params}) {\n${body}}\n`;
};

javascriptGenerator.forBlock['js_instantiate'] = function(block, generator) {
  const cls = block.getFieldValue('CLASS') || 'MyClass';
  const args = generator.valueToCode(block, 'ARGS', generator.ORDER_NONE) || '';
  return [`new ${cls}(${args})`, generator.ORDER_NEW];
};

javascriptGenerator.forBlock['js_class_extends'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || 'ChildClass';
  const parent = block.getFieldValue('PARENT') || 'ParentClass';
  const body = generator.statementToCode(block, 'BODY');
  return `class ${name} extends ${parent} {\n${body}}\n`;
};

javascriptGenerator.forBlock['js_console_log'] = function(block, generator) {
  const text = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || '""';
  return `console.log(${text});\n`;
};

javascriptGenerator.forBlock['js_console_error'] = function(block, generator) {
  const text = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || '""';
  return `console.error(${text});\n`;
};

javascriptGenerator.forBlock['js_prompt_input'] = function(block, generator) {
  const text = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || '"Enter input:"';
  return [`prompt(${text})`, generator.ORDER_FUNCTION_CALL];
};

javascriptGenerator.forBlock['js_alert'] = function(block, generator) {
  const text = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || '""';
  return `alert(${text});\n`;
};

javascriptGenerator.forBlock['js_try_catch'] = function(block, generator) {
  const branchTry = generator.statementToCode(block, 'TRY');
  const branchCatch = generator.statementToCode(block, 'CATCH');
  return `try {\n${branchTry}} catch (err) {\n${branchCatch}}\n`;
};

javascriptGenerator.forBlock['js_throw_error'] = function(block, generator) {
  const text = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || '"Error"';
  return `throw new Error(${text});\n`;
};

javascriptGenerator.forBlock['js_async_func'] = function(block, generator) {
  const name = block.getFieldValue('NAME') || 'fetchData';
  const params = block.getFieldValue('PARAMS') || '';
  const body = generator.statementToCode(block, 'BODY');
  return `async function ${name}(${params}) {\n${body}}\n`;
};

javascriptGenerator.forBlock['js_await'] = function(block, generator) {
  const val = generator.valueToCode(block, 'VALUE', generator.ORDER_UNARY_PREFIX) || 'promise';
  return [`await ${val}`, generator.ORDER_UNARY_PREFIX];
};

export default javascriptGenerator;

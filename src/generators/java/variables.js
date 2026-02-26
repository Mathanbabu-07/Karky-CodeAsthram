import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Variable assignment
javaGenerator.forBlock['essentials_var_set'] = function (block, generator) {
    const varName = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    const value = generator.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || 'null';
    // Use 'var' for type inference (Java 10+)
    return `var ${varName} = ${value};\n`;
};

// Variable get
javaGenerator.forBlock['essentials_var_get'] = function (block, generator) {
    const varName = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    return [varName, Order.ATOMIC];
};

// Import statement
javaGenerator.forBlock['essentials_import_simple'] = function (block, generator) {
    const packageName = block.getFieldValue('PACKAGE') || '';
    if (packageName) {
        generator.addImport(packageName);
    }
    return ''; // Imports are handled at the top
};

// Scope keyword (not really applicable in Java, skip)
javaGenerator.forBlock['essentials_scope_keyword'] = function (block, generator) {
    return ''; // Java doesn't have global/nonlocal keywords
};

// Variable undefined/null
javaGenerator.forBlock['essentials_var_undefined'] = function (block, generator) {
    return ['null', Order.ATOMIC];
};

// Type checking (instanceof)
javaGenerator.forBlock['essentials_is_instance'] = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.RELATIONAL) || 'null';
    const type = block.getFieldValue('TYPE') || 'Object';
    return [`${value} instanceof ${type}`, Order.RELATIONAL];
};

// Type of (getClass)
javaGenerator.forBlock['essentials_type_of'] = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.MEMBER) || 'null';
    return [`${value}.getClass().getSimpleName()`, Order.MEMBER];
};

// Type casting
javaGenerator.forBlock['essentials_cast'] = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.UNARY_PREFIX) || 'null';
    const type = block.getFieldValue('TYPE') || 'Object';
    return [`(${type}) ${value}`, Order.UNARY_PREFIX];
};

// Default if none (null coalescing)
javaGenerator.forBlock['essentials_default_if_none'] = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.CONDITIONAL) || 'null';
    const defaultValue = generator.valueToCode(block, 'DEFAULT', Order.CONDITIONAL) || '""';
    return [`(${value} != null) ? ${value} : ${defaultValue}`, Order.CONDITIONAL];
};

// Built-in variable blocks (Blockly's native)
javaGenerator.forBlock['variables_get'] = function (block, generator) {
    const varName = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    return [varName, Order.ATOMIC];
};

javaGenerator.forBlock['variables_set'] = function (block, generator) {
    const varName = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    const value = generator.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || 'null';
    return `${varName} = ${value};\n`;
};

export { javaGenerator };

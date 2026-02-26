import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['argparse_import'] = function(block, generator) {
    Python.addImport('import argparse');
    return '';
};

Python.forBlock['argparse_create_parser'] = function(block, generator) {
    Python.addImport('import argparse');
    const description = generator.valueToCode(block, 'DESCRIPTION', generator.ORDER_ATOMIC) || '""';
    const code = `argparse.ArgumentParser(description=${description})`;
    return [code, generator.ORDER_FUNCTION_CALL];
};

Python.forBlock['argparse_add_argument'] = function(block, generator) {
    const parser = generator.valueToCode(block, 'PARSER', generator.ORDER_ATOMIC) || 'parser';
    const argName = generator.valueToCode(block, 'ARG_NAME', generator.ORDER_ATOMIC) || '""';
    const help = generator.valueToCode(block, 'HELP', generator.ORDER_ATOMIC) || '""';
        const required = block.getFieldValue('REQUIRED') === 'TRUE';
        const defaultVal = generator.valueToCode(block, 'DEFAULT', generator.ORDER_ATOMIC);
        const parts = [argName];
        parts.push(`help=${help}`);
        if (required) parts.push('required=True');
        if (defaultVal) parts.push(`default=${defaultVal}`);
        const code = `${parser}.add_argument(${parts.join(', ')})\n`;
    return code;
};

Python.forBlock['argparse_parse_args'] = function(block, generator) {
    const parser = generator.valueToCode(block, 'PARSER', generator.ORDER_ATOMIC) || 'parser';
    const code = `${parser}.parse_args()`;
    return [code, generator.ORDER_FUNCTION_CALL];
};

Python.forBlock['argparse_get_arg'] = function(block, generator) {
    const argName = generator.valueToCode(block, 'ARG_NAME', generator.ORDER_ATOMIC) || '""';
    const args = generator.valueToCode(block, 'ARGS', generator.ORDER_ATOMIC) || 'args';
    const code = `getattr(${args}, ${argName.replace(/'/g, '')})`;
    return [code, generator.ORDER_MEMBER];
};
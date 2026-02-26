import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['logging_import'] = function(block, generator) {
    Python.addImport('import logging');
    return '';
};

Python.forBlock['logging_basic_config'] = function(block, generator) {
    Python.addImport('import logging');
    const level = block.getFieldValue('LEVEL') || 'INFO';
    const fmt = generator.valueToCode(block, 'FORMAT', generator.ORDER_NONE);
    const datefmt = generator.valueToCode(block, 'DATEFMT', generator.ORDER_NONE);
    const parts = [ `level=logging.${level}` ];
    if (fmt) parts.push(`format=${fmt.trim()}`);
    if (datefmt) parts.push(`datefmt=${datefmt.trim()}`);
    const code = `logging.basicConfig(${parts.join(', ')})\n`;
    return code;
};

// Alias essentials block type to same generator logic
Python.forBlock['essentials_logging_basic_config'] = Python.forBlock['logging_basic_config'];

Python.forBlock['logging_log'] = function(block, generator) {
    Python.addImport('import logging');
    const message = generator.valueToCode(block, 'MESSAGE', generator.ORDER_ATOMIC) || '""';
    const level = block.getFieldValue('LEVEL');
    const code = `logging.${level}(${message})\n`;
    return code;
};

Python.forBlock['logging_get_logger'] = function(block, generator) {
    Python.addImport('import logging');
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || "'__main__'";
    const code = `logging.getLogger(${name})`;
    return [code, generator.ORDER_FUNCTION_CALL];
};

Python.forBlock['logging_logger_set_level'] = function(block, generator) {
    Python.addImport('import logging');
    const logger = generator.valueToCode(block, 'LOGGER', generator.ORDER_ATOMIC) || 'logging.getLogger()';
    const level = block.getFieldValue('LEVEL');
    const code = `${logger}.setLevel(${level})\n`;
    return code;
};
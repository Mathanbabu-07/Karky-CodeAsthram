import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['list_advanced_method'] = function(block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const method = block.getFieldValue('METHOD');
    
    if (method === 'COPY') {
        const code = `.copy()`;
        return [code, Python.ORDER_FUNCTION_CALL];
    } else { // CLEAR
        const code = `.clear()\n`;
        return code;
    }
};

Python.forBlock['list_item_operation'] = function(block) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const op = block.getFieldValue('OPERATION');
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE);
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE);
    
    let code;
    switch(op) {
        case 'APPEND':
            code = `.append()\n`;
            return code;
        case 'EXTEND':
            code = `.extend()\n`;
            return code;
        case 'INSERT':
            code = `.insert(, )\n`;
            return code;
        case 'REMOVE':
            code = `.remove()\n`;
            return code;
        case 'POP':
            if (index) {
                code = `.pop()`;
            } else {
                code = `.pop()`;
            }
            return [code, Python.ORDER_FUNCTION_CALL];
        case 'COUNT':
            code = `.count()`;
            return [code, Python.ORDER_FUNCTION_CALL];
        default:
            return '';
    }
};

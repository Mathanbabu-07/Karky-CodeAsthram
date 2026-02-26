import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['numpy_array'] = function(block) {
  Python.addImport('import numpy as np');
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_ATOMIC) || '[]';
  const dtype = Python.valueToCode(block, 'DTYPE', Python.ORDER_ATOMIC) || 'None';
  const code = `np.array(${list}, dtype=${dtype})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_arange'] = function(block) {
    Python.addImport('import numpy as np');
    const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || '0';
    const stop = Python.valueToCode(block, 'STOP', Python.ORDER_NONE);
    const step = Python.valueToCode(block, 'STEP', Python.ORDER_NONE) || '1';
    const code = `np.arange(start=${start}, stop=${stop}, step=${step})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_reshape'] = function(block) {
  Python.addImport('import numpy as np');
  const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'np.array([])';
  const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_ATOMIC) || '()';
  const code = `${array}.reshape(${shape})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_zeros'] = function(block) {
  Python.addImport('import numpy as np');
  const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_ATOMIC);
  const code = `np.zeros(${shape})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_ones'] = function(block) {
  Python.addImport('import numpy as np');
  const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_ATOMIC);
  const code = `np.ones(${shape})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_concatenate'] = function(block) {
    Python.addImport('import numpy as np');
    const arrays = Python.valueToCode(block, 'ARRAYS', Python.ORDER_NONE) || '[]';
    const axis = Python.valueToCode(block, 'AXIS', Python.ORDER_NONE) || '0';
    return [`np.concatenate(${arrays}, axis=${axis})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_vstack'] = function(block) {
    Python.addImport('import numpy as np');
    const arrays = Python.valueToCode(block, 'ARRAYS', Python.ORDER_NONE) || '[]';
    return [`np.vstack(${arrays})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_hstack'] = function(block) {
    Python.addImport('import numpy as np');
    const arrays = Python.valueToCode(block, 'ARRAYS', Python.ORDER_NONE) || '[]';
    return [`np.hstack(${arrays})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_split'] = function(block) {
    Python.addImport('import numpy as np');
    const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_NONE) || 'np.array([])';
    const sections = Python.valueToCode(block, 'SECTIONS', Python.ORDER_NONE) || '1';
    const axis = Python.valueToCode(block, 'AXIS', Python.ORDER_NONE) || '0';
    return [`np.split(${array}, ${sections}, axis=${axis})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_sum'] = function(block) {
  Python.addImport('import numpy as np');
  const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'None';
  return [`${array}.sum()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_mean'] = function(block) {
  Python.addImport('import numpy as np');
  const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'None';
  return [`${array}.mean()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_std'] = function(block) {
    Python.addImport('import numpy as np');
    const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'None';
    return [`${array}.std()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_dot'] = function(block) {
    Python.addImport('import numpy as np');
    const a = Python.valueToCode(block, 'A', Python.ORDER_NONE) || 'None';
    const b = Python.valueToCode(block, 'B', Python.ORDER_NONE) || 'None';
    return [`np.dot(${a}, ${b})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_elementwise_op'] = function(block) {
    Python.addImport('import numpy as np');
    const a = Python.valueToCode(block, 'A', Python.ORDER_NONE);
    const op = block.getFieldValue('OP');
    const b = Python.valueToCode(block, 'B', Python.ORDER_NONE);
    let code;
    switch (op) {
        case 'add':
            code = `np.add(${a}, ${b})`;
            break;
        case 'subtract':
            code = `np.subtract(${a}, ${b})`;
            break;
        case 'multiply':
            code = `np.multiply(${a}, ${b})`;
            break;
        case 'divide':
            code = `np.divide(${a}, ${b})`;
            break;
        default:
            throw new Error('Unknown element-wise operation.');
    }
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['numpy_indexing'] = function(block) {
    const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'None';
    const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0';
    return [`${array}[${index}]`, Python.ORDER_MEMBER];
};

Python.forBlock['numpy_slicing'] = function(block) {
    const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_MEMBER) || 'None';
    const slice = Python.valueToCode(block, 'SLICE', Python.ORDER_NONE) || ':';
    return [`${array}[${slice}]`, Python.ORDER_MEMBER];
};
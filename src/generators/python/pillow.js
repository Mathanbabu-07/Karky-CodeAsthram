// src/generators/python/pillow.js
import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['pillow_image_create'] = function(block) {
  Python.addImport('from python import blocks_runtime');
  const mode = block.getFieldValue('MODE');
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_ATOMIC) || '(100, 100)';
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || "'white'";
  return [`blocks_runtime.pillow_image_create('${mode}', ${size}, ${color})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pillow_draw_line'] = function(block) {
  Python.addImport('from python import blocks_runtime');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const xy_start = Python.valueToCode(block, 'XY_START', Python.ORDER_ATOMIC) || '(0, 0)';
  const xy_end = Python.valueToCode(block, 'XY_END', Python.ORDER_ATOMIC) || '(10, 10)';
  const fill = Python.valueToCode(block, 'FILL', Python.ORDER_ATOMIC) || "'black'";
  const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC) || '1';
  return `blocks_runtime.pillow_draw_line(${image}, ${xy_start}, ${xy_end}, ${fill}, ${width})\n`;
};

Python.forBlock['pillow_draw_rectangle'] = function(block) {
  Python.addImport('from python import blocks_runtime');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const bounding_box = Python.valueToCode(block, 'BOUNDING_BOX', Python.ORDER_ATOMIC) || '(10, 10, 50, 50)';
  const fill = Python.valueToCode(block, 'FILL', Python.ORDER_ATOMIC) || 'None';
  const outline = Python.valueToCode(block, 'OUTLINE', Python.ORDER_ATOMIC) || 'None';
  const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC) || '1';
  return `blocks_runtime.pillow_draw_rectangle(${image}, ${bounding_box}, fill=${fill}, outline=${outline}, width=${width})\n`;
};

Python.forBlock['pillow_draw_ellipse'] = function(block) {
    Python.addImport('from python import blocks_runtime');
    const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
    const bounding_box = Python.valueToCode(block, 'BOUNDING_BOX', Python.ORDER_ATOMIC) || '(10, 10, 50, 50)';
    const fill = Python.valueToCode(block, 'FILL', Python.ORDER_ATOMIC) || 'None';
    const outline = Python.valueToCode(block, 'OUTLINE', Python.ORDER_ATOMIC) || 'None';
    const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC) || '1';
    return `blocks_runtime.pillow_draw_ellipse(${image}, ${bounding_box}, fill=${fill}, outline=${outline}, width=${width})\n`;
};

Python.forBlock['pillow_draw_text'] = function(block) {
  Python.addImport('from python import blocks_runtime');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_ATOMIC) || "''";
  const position = Python.valueToCode(block, 'POSITION', Python.ORDER_ATOMIC) || '(10, 10)';
  const fill = Python.valueToCode(block, 'FILL', Python.ORDER_ATOMIC) || "'black'";
  return `blocks_runtime.pillow_draw_text(${image}, ${text}, ${position}, ${fill})\n`;
};

Python.forBlock['pillow_image_filter'] = function(block) {
  Python.addImport('from python import blocks_runtime');
  const filter_name = block.getFieldValue('FILTER');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC) || 'None';
  return [`blocks_runtime.pillow_image_filter(${image}, '${filter_name}')`, Python.ORDER_FUNCTION_CALL];
};
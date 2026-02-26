// src/generators/python/pillow.js
import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['pillow_image_create'] = function (block) {
  Python.addImport('from PIL import Image');
  const mode = block.getFieldValue('MODE');
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_ATOMIC) || '(100, 100)';
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || "'white'";
  return [`Image.new('${mode}', ${size}, ${color})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['pillow_draw_line'] = function (block) {
  Python.addImport('from PIL import ImageDraw');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_MEMBER) || 'None';
  const xy_start = Python.valueToCode(block, 'XY_START', Python.ORDER_ATOMIC) || '(0, 0)';
  const xy_end = Python.valueToCode(block, 'XY_END', Python.ORDER_ATOMIC) || '(10, 10)';
  const fill = Python.valueToCode(block, 'FILL', Python.ORDER_ATOMIC) || "'black'";
  const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC) || '1';
  const helperName = Python.nameDB_.getDistinctName('_draw', 'VARIABLE');
  let code = `${helperName} = ImageDraw.Draw(${image})\\n`;
  code += `${helperName}.line([${xy_start}, ${xy_end}], fill=${fill}, width=${width})\\n`;
  return code;
};

Python.forBlock['pillow_draw_rectangle'] = function (block) {
  Python.addImport('from PIL import ImageDraw');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_MEMBER) || 'None';
  const bounding_box = Python.valueToCode(block, 'BOUNDING_BOX', Python.ORDER_ATOMIC) || '(10, 10, 50, 50)';
  const fill = Python.valueToCode(block, 'FILL', Python.ORDER_ATOMIC) || 'None';
  const outline = Python.valueToCode(block, 'OUTLINE', Python.ORDER_ATOMIC) || 'None';
  const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC) || '1';
  const helperName = Python.nameDB_.getDistinctName('_draw', 'VARIABLE');
  let code = `${helperName} = ImageDraw.Draw(${image})\\n`;
  code += `${helperName}.rectangle(${bounding_box}, fill=${fill}, outline=${outline}, width=${width})\\n`;
  return code;
};

Python.forBlock['pillow_draw_ellipse'] = function (block) {
  Python.addImport('from PIL import ImageDraw');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_MEMBER) || 'None';
  const bounding_box = Python.valueToCode(block, 'BOUNDING_BOX', Python.ORDER_ATOMIC) || '(10, 10, 50, 50)';
  const fill = Python.valueToCode(block, 'FILL', Python.ORDER_ATOMIC) || 'None';
  const outline = Python.valueToCode(block, 'OUTLINE', Python.ORDER_ATOMIC) || 'None';
  const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC) || '1';
  const helperName = Python.nameDB_.getDistinctName('_draw', 'VARIABLE');
  let code = `${helperName} = ImageDraw.Draw(${image})\\n`;
  code += `${helperName}.ellipse(${bounding_box}, fill=${fill}, outline=${outline}, width=${width})\\n`;
  return code;
};

Python.forBlock['pillow_draw_text'] = function (block) {
  Python.addImport('from PIL import ImageDraw');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_MEMBER) || 'None';
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_ATOMIC) || "''";
  const position = Python.valueToCode(block, 'POSITION', Python.ORDER_ATOMIC) || '(10, 10)';
  const fill = Python.valueToCode(block, 'FILL', Python.ORDER_ATOMIC) || "'black'";
  const helperName = Python.nameDB_.getDistinctName('_draw', 'VARIABLE');
  let code = `${helperName} = ImageDraw.Draw(${image})\\n`;
  code += `${helperName}.text(${position}, ${text}, fill=${fill})\\n`;
  return code;
};

Python.forBlock['pillow_image_filter'] = function (block) {
  Python.addImport('from PIL import ImageFilter');
  const filter_name = block.getFieldValue('FILTER');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_MEMBER) || 'None';
  const filterMap = {
    'BLUR': 'ImageFilter.BLUR',
    'CONTOUR': 'ImageFilter.CONTOUR',
    'DETAIL': 'ImageFilter.DETAIL',
    'EDGE_ENHANCE': 'ImageFilter.EDGE_ENHANCE',
    'EMBOSS': 'ImageFilter.EMBOSS',
    'SHARPEN': 'ImageFilter.SHARPEN',
    'SMOOTH': 'ImageFilter.SMOOTH'
  };
  const filter = filterMap[filter_name] || 'ImageFilter.BLUR';
  return [`${image}.filter(${filter})`, Python.ORDER_FUNCTION_CALL];
};
import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['graphics_turtle_create'] = function(block) {
  Python.addImport('import turtle');
  return [`turtle.Turtle()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['graphics_turtle_forward'] = function(block) {
  const turtle = Python.valueToCode(block, 'TURTLE', Python.ORDER_MEMBER) || 'None';
  const distance = Python.valueToCode(block, 'DISTANCE', Python.ORDER_NONE) || '0';
  return `${turtle}.forward(${distance})\n`;
};

Python.forBlock['graphics_turtle_backward'] = function(block) {
  const turtle = Python.valueToCode(block, 'TURTLE', Python.ORDER_MEMBER) || 'None';
  const distance = Python.valueToCode(block, 'DISTANCE', Python.ORDER_NONE) || '0';
  return `${turtle}.backward(${distance})\n`;
};

Python.forBlock['graphics_turtle_right'] = function(block) {
  const turtle = Python.valueToCode(block, 'TURTLE', Python.ORDER_MEMBER) || 'None';
  const angle = Python.valueToCode(block, 'ANGLE', Python.ORDER_NONE) || '0';
  return `${turtle}.right(${angle})\n`;
};

Python.forBlock['graphics_turtle_left'] = function(block) {
  const turtle = Python.valueToCode(block, 'TURTLE', Python.ORDER_MEMBER) || 'None';
  const angle = Python.valueToCode(block, 'ANGLE', Python.ORDER_NONE) || '0';
  return `${turtle}.left(${angle})\n`;
};

Python.forBlock['graphics_turtle_penup'] = function(block) {
  const turtle = Python.valueToCode(block, 'TURTLE', Python.ORDER_MEMBER) || 'None';
  return `${turtle}.penup()\n`;
};

Python.forBlock['graphics_turtle_pendown'] = function(block) {
  const turtle = Python.valueToCode(block, 'TURTLE', Python.ORDER_MEMBER) || 'None';
  return `${turtle}.pendown()\n`;
};

Python.forBlock['graphics_turtle_done'] = function(block) {
  Python.addImport('import turtle');
  return `turtle.done()\n`;
};

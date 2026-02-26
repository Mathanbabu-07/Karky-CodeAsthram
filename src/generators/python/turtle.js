import { pythonGenerator as Python } from 'blockly/python';
Python.forBlock['turtle_move_turn'] = function(block) {
  Python.addImport('import turtle');
  const direction = block.getFieldValue('DIRECTION');
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC) || '0';
  let code;
  switch (direction) {
    case 'FORWARD': code = `turtle.forward(${value})\n`; break;
    case 'BACKWARD': code = `turtle.backward(${value})\n`; break;
    case 'LEFT': code = `turtle.left(${value})\n`; break;
    case 'RIGHT': code = `turtle.right(${value})\n`; break;
  }
  return code;
};
Python.forBlock['turtle_goto'] = function(block) {
  Python.addImport('import turtle');
  const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || '0';
  const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || '0';
  return `turtle.goto(${x}, ${y})\n`;
};
Python.forBlock['turtle_home'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.home()\n';
};
Python.forBlock['turtle_set_property'] = function(block) {
  Python.addImport('import turtle');
  const property = block.getFieldValue('PROPERTY');
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC) || '0';
  let code;
  switch (property) {
    case 'SETX': code = `turtle.setx(${value})\n`; break;
    case 'SETY': code = `turtle.sety(${value})\n`; break;
    case 'SETHEADING': code = `turtle.setheading(${value})\n`; break;
  }
  return code;
};
Python.forBlock['turtle_get_property'] = function(block) {
  Python.addImport('import turtle');
  const property = block.getFieldValue('PROPERTY');
  let code;
  switch (property) {
    case 'XCOR': code = 'turtle.xcor()'; break;
    case 'YCOR': code = 'turtle.ycor()'; break;
    case 'HEADING': code = 'turtle.heading()'; break;
  }
  return [code, Python.ORDER_FUNCTION_CALL];
};
Python.forBlock['turtle_position'] = function(block) {
  Python.addImport('import turtle');
  return ['turtle.position()', Python.ORDER_FUNCTION_CALL];
};
Python.forBlock['turtle_distance_to'] = function(block) {
  Python.addImport('import turtle');
  const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || '0';
  const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || '0';
  return [`turtle.distance(${x}, ${y})`, Python.ORDER_FUNCTION_CALL];
};
Python.forBlock['turtle_towards'] = function(block) {
  Python.addImport('import turtle');
  const x = Python.valueToCode(block, 'X', Python.ORDER_ATOMIC) || '0';
  const y = Python.valueToCode(block, 'Y', Python.ORDER_ATOMIC) || '0';
  return [`turtle.towards(${x}, ${y})`, Python.ORDER_FUNCTION_CALL];
};
Python.forBlock['turtle_pen_control'] = function(block) {
  Python.addImport('import turtle');
  const state = block.getFieldValue('STATE');
  return state === 'UP' ? 'turtle.penup()\n' : 'turtle.pendown()\n';
};
Python.forBlock['turtle_isdown'] = function(block) {
  Python.addImport('import turtle');
  return ['turtle.isdown()', Python.ORDER_FUNCTION_CALL];
};
Python.forBlock['turtle_pen_size'] = function(block) {
  Python.addImport('import turtle');
  const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC) || '1';
  return `turtle.pensize(${width})\n`;
};
Python.forBlock['turtle_pen_color'] = function(block) {
  Python.addImport('import turtle');
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || "'black'";
  return `turtle.pencolor(${color})\n`;
};
Python.forBlock['turtle_fill_color'] = function(block) {
  Python.addImport('import turtle');
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || "'black'";
  return `turtle.fillcolor(${color})\n`;
};
Python.forBlock['turtle_color_both'] = function(block) {
  Python.addImport('import turtle');
  const penColor = Python.valueToCode(block, 'PEN_COLOR', Python.ORDER_ATOMIC) || "'black'";
  const fillColor = Python.valueToCode(block, 'FILL_COLOR', Python.ORDER_ATOMIC) || "'black'";
  return `turtle.color(${penColor}, ${fillColor})\n`;
};
Python.forBlock['turtle_begin_fill'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.begin_fill()\n';
};
Python.forBlock['turtle_end_fill'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.end_fill()\n';
};
Python.forBlock['turtle_filling'] = function(block) {
  Python.addImport('import turtle');
  return ['turtle.filling()', Python.ORDER_FUNCTION_CALL];
};
Python.forBlock['turtle_write'] = function(block) {
  Python.addImport('import turtle');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_ATOMIC) || "''";
  const font = Python.valueToCode(block, 'FONT', Python.ORDER_ATOMIC) || '("Arial", 8, "normal")';
  const align = block.getFieldValue('ALIGN');
  const move = Python.valueToCode(block, 'MOVE', Python.ORDER_ATOMIC) || 'False';
  return `turtle.write(${text}, move=${move}, align='${align}', font=${font})\n`;
};
Python.forBlock['turtle_setup'] = function(block) {
  Python.addImport('import turtle');
  const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC) || 'None';
  const height = Python.valueToCode(block, 'HEIGHT', Python.ORDER_ATOMIC) || 'None';
  const startx = Python.valueToCode(block, 'STARTX', Python.ORDER_ATOMIC) || 'None';
  const starty = Python.valueToCode(block, 'STARTY', Python.ORDER_ATOMIC) || 'None';
  return `turtle.setup(width=${width}, height=${height}, startx=${startx}, starty=${starty})\n`;
};
Python.forBlock['turtle_screensize'] = function(block) {
  Python.addImport('import turtle');
  const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_ATOMIC) || 'None';
  const height = Python.valueToCode(block, 'HEIGHT', Python.ORDER_ATOMIC) || 'None';
  const bg = Python.valueToCode(block, 'BG', Python.ORDER_ATOMIC) || 'None';
  return `turtle.screensize(canvwidth=${width}, canvheight=${height}, bg=${bg})\n`;
};
Python.forBlock['turtle_bgcolor'] = function(block) {
  Python.addImport('import turtle');
  const color = Python.valueToCode(block, 'COLOR', Python.ORDER_ATOMIC) || "'white'";
  return `turtle.bgcolor(${color})\n`;
};
Python.forBlock['turtle_bgpic'] = function(block) {
  Python.addImport('import turtle');
  const picname = Python.valueToCode(block, 'PICNAME', Python.ORDER_ATOMIC) || "'nopic'";
  return `turtle.bgpic(${picname})\n`;
};
Python.forBlock['turtle_title'] = function(block) {
  Python.addImport('import turtle');
  const title = Python.valueToCode(block, 'TITLE', Python.ORDER_ATOMIC) || "''";
  return `turtle.title(${title})\n`;
};
Python.forBlock['turtle_mode'] = function(block) {
  Python.addImport('import turtle');
  const mode = block.getFieldValue('MODE');
  return `turtle.mode('${mode}')\n`;
};
Python.forBlock['turtle_colormode'] = function(block) {
  Python.addImport('import turtle');
  const cmode = block.getFieldValue('CMODE');
  return `turtle.colormode(${cmode})\n`;
};
Python.forBlock['turtle_tracer'] = function(block) {
  Python.addImport('import turtle');
  const n = Python.valueToCode(block, 'N', Python.ORDER_ATOMIC) || 'None';
  const delay = Python.valueToCode(block, 'DELAY', Python.ORDER_ATOMIC) || 'None';
  return `turtle.tracer(${n}, ${delay})\n`;
};
Python.forBlock['turtle_update'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.update()\n';
};
Python.forBlock['turtle_delay'] = function(block) {
  Python.addImport('import turtle');
  const delay = Python.valueToCode(block, 'DELAY', Python.ORDER_ATOMIC) || '0';
  return `turtle.delay(${delay})\n`;
};
Python.forBlock['turtle_clearscreen'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.clearscreen()\n';
};
Python.forBlock['turtle_resetscreen'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.resetscreen()\n';
};
Python.forBlock['turtle_done'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.done()\n';
};
Python.forBlock['turtle_exitonclick'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.exitonclick()\n';
};
Python.forBlock['turtle_listen'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.listen()\n';
};
Python.forBlock['turtle_onkey'] = function(block) {
  Python.addImport('import turtle');
  const key = block.getFieldValue('KEY');
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_NONE) || 'None';
  return `turtle.onkey(${func}, "${key}")\n`;
};
Python.forBlock['turtle_onkeyrelease'] = function(block) {
  Python.addImport('import turtle');
  const key = block.getFieldValue('KEY');
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_NONE) || 'None';
  return `turtle.onkeyrelease(${func}, "${key}")\n`;
};
Python.forBlock['turtle_onclick'] = function(block) {
  Python.addImport('import turtle');
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_NONE) || 'None';
  return `turtle.onclick(${func})\n`;
};
Python.forBlock['turtle_onscreenclick'] = function(block) {
  Python.addImport('import turtle');
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_NONE) || 'None';
  return `turtle.onscreenclick(${func})\n`;
};
Python.forBlock['turtle_onrelease'] = function(block) {
  Python.addImport('import turtle');
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_NONE) || 'None';
  return `turtle.onrelease(${func})\n`;
};
Python.forBlock['turtle_ontimer'] = function(block) {
  Python.addImport('import turtle');
  const delay = Python.valueToCode(block, 'DELAY', Python.ORDER_ATOMIC) || '0';
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_NONE) || 'None';
  return `turtle.ontimer(${func}, ${delay})\n`;
};
Python.forBlock['turtle_textinput'] = function(block) {
  Python.addImport('import turtle');
  const title = Python.valueToCode(block, 'TITLE', Python.ORDER_ATOMIC) || "''";
  const prompt = Python.valueToCode(block, 'PROMPT', Python.ORDER_ATOMIC) || "''";
  return [`turtle.textinput(${title}, ${prompt})`, Python.ORDER_FUNCTION_CALL];
};
Python.forBlock['turtle_numinput'] = function(block) {
  Python.addImport('import turtle');
  const title = Python.valueToCode(block, 'TITLE', Python.ORDER_ATOMIC) || "''";
  const prompt = Python.valueToCode(block, 'PROMPT', Python.ORDER_ATOMIC) || "''";
  const def = Python.valueToCode(block, 'DEFAULT', Python.ORDER_ATOMIC) || 'None';
  const min = Python.valueToCode(block, 'MIN', Python.ORDER_ATOMIC) || 'None';
  const max = Python.valueToCode(block, 'MAX', Python.ORDER_ATOMIC) || 'None';
  return [`turtle.numinput(${title}, ${prompt}, default=${def}, minval=${min}, maxval=${max})`, Python.ORDER_FUNCTION_CALL];
};
Python.forBlock['turtle_begin_poly'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.begin_poly()\n';
};
Python.forBlock['turtle_end_poly'] = function(block) {
  Python.addImport('import turtle');
  return 'turtle.end_poly()\n';
};
Python.forBlock['turtle_get_poly'] = function(block) {
  Python.addImport('import turtle');
  return ['turtle.get_poly()', Python.ORDER_FUNCTION_CALL];
};
Python.forBlock['turtle_register_shape'] = function(block) {
  Python.addImport('import turtle');
  const name = Python.valueToCode(block, 'NAME', Python.ORDER_ATOMIC) || "''";
  const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_ATOMIC) || 'None';
  return `turtle.register_shape(${name}, ${shape})\n`;
};
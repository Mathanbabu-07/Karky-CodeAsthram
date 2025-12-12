import * as Blockly from 'blockly/core';

Blockly.defineBlocksWithJsonArray([
  // Movement & State
  {
    "type": "turtle_move_turn",
    "message0": "turn %1 by %2 pixels",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          ["forward", "FORWARD"],
          ["backward", "BACKWARD"],
          ["left", "LEFT"],
          ["right", "RIGHT"]
        ]
      },
      { "type": "input_value", "name": "VALUE", "check": "Number" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Moves or turns the turtle.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.forward"
  },
  {
    "type": "turtle_goto",
    "message0": "go to x: %1 y: %2",
    "args0": [
      { "type": "input_value", "name": "X", "check": "Number" },
      { "type": "input_value", "name": "Y", "check": "Number" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Moves the turtle to an absolute position.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.goto"
  },
  {
    "type": "turtle_home",
    "message0": "go to home",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Moves the turtle to the origin (0,0) and sets its heading to 0.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.home"
  },
  {
    "type": "turtle_set_property",
    "message0": "set %1 to %2",
    "args0": [
      { "type": "field_dropdown", "name": "PROPERTY", "options": [["x coordinate", "SETX"], ["y coordinate", "SETY"], ["heading", "SETHEADING"]] },
      { "type": "input_value", "name": "VALUE", "check": "Number" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the turtle's x or y coordinate or heading.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.setx"
  },
  {
    "type": "turtle_get_property",
    "message0": "get %1",
    "args0": [
      { "type": "field_dropdown", "name": "PROPERTY", "options": [["x coordinate", "XCOR"], ["y coordinate", "YCOR"], ["heading", "HEADING"]] }
    ],
    "output": "Number", "colour": "#4C97FF", "tooltip": "Gets the turtle's x or y coordinate or heading.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.xcor"
  },
  {
    "type": "turtle_position",
    "message0": "get position",
    "output": "Array", "colour": "#4C97FF", "tooltip": "Gets the turtle's current (x, y) coordinates.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.position"
  },
  {
    "type": "turtle_distance_to",
    "message0": "distance to x: %1 y: %2",
    "args0": [
      { "type": "input_value", "name": "X", "check": "Number" },
      { "type": "input_value", "name": "Y", "check": "Number" }
    ],
    "output": "Number", "colour": "#4C97FF", "tooltip": "Calculates the distance from the turtle to a given point.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.distance"
  },
  {
    "type": "turtle_towards",
    "message0": "angle towards x: %1 y: %2",
    "args0": [
      { "type": "input_value", "name": "X", "check": "Number" },
      { "type": "input_value", "name": "Y", "check": "Number" }
    ],
    "output": "Number", "colour": "#4C97FF", "tooltip": "Calculates the angle to a given point.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.towards"
  },
  // Pen & Drawing
  {
    "type": "turtle_pen_control",
    "message0": "pen %1",
    "args0": [
      { "type": "field_dropdown", "name": "STATE", "options": [["up", "UP"], ["down", "DOWN"]] }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Lifts or lowers the turtle's pen.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.penup"
  },
  {
    "type": "turtle_isdown",
    "message0": "is pen down?",
    "output": "Boolean", "colour": "#4C97FF", "tooltip": "Returns true if the pen is down, false otherwise.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.isdown"
  },
  {
    "type": "turtle_pen_size",
    "message0": "set pen size to %1",
    "args0": [
      { "type": "input_value", "name": "WIDTH", "check": "Number" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the turtle's pen size.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.pensize"
  },
  {
    "type": "turtle_pen_color",
    "message0": "set pen color to %1",
    "args0": [
      { "type": "input_value", "name": "COLOR", "check": "Colour" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the turtle's pen color.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.pencolor"
  },
  {
    "type": "turtle_fill_color",
    "message0": "set fill color to %1",
    "args0": [
      { "type": "input_value", "name": "COLOR", "check": "Colour" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the turtle's fill color.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.fillcolor"
  },
  {
    "type": "turtle_color_both",
    "message0": "set pen color to %1 and fill color to %2",
    "args0": [
      { "type": "input_value", "name": "PEN_COLOR", "check": "Colour" },
      { "type": "input_value", "name": "FILL_COLOR", "check": "Colour" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets both the pen and fill colors.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.color"
  },
  {
    "type": "turtle_begin_fill",
    "message0": "begin fill",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Starts recording the turtle's movements for a filled shape.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.begin_fill"
  },
  {
    "type": "turtle_end_fill",
    "message0": "end fill",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Fills the shape drawn since the last begin_fill() call.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.end_fill"
  },
  {
    "type": "turtle_filling",
    "message0": "is filling?",
    "output": "Boolean", "colour": "#4C97FF", "tooltip": "Returns true if the turtle is in fill mode, false otherwise.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.filling"
  },
  {
    "type": "turtle_write",
    "message0": "write %1 with font %2 align %3 move %4",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": "String" },
      { "type": "input_value", "name": "FONT", "check": "Tuple" },
      {
        "type": "field_dropdown",
        "name": "ALIGN",
        "options": [ ["left", "left"], ["center", "center"], ["right", "right"] ]
      },
      { "type": "input_value", "name": "MOVE", "check": "Boolean" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4C97FF",
    "tooltip": "Writes text at the turtle's current position.",
    "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.write"
  },
  // Screen & Window
  {
    "type": "turtle_setup",
    "message0": "setup window width: %1 height: %2 startx: %3 starty: %4",
    "args0": [
      { "type": "input_value", "name": "WIDTH", "check": "Number" },
      { "type": "input_value", "name": "HEIGHT", "check": "Number" },
      { "type": "input_value", "name": "STARTX", "check": "Number" },
      { "type": "input_value", "name": "STARTY", "check": "Number" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the window size and position.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.setup"
  },
  {
    "type": "turtle_screensize",
    "message0": "set screen size width: %1 height: %2 bg: %3",
    "args0": [
      { "type": "input_value", "name": "WIDTH", "check": "Number" },
      { "type": "input_value", "name": "HEIGHT", "check": "Number" },
      { "type": "input_value", "name": "BG", "check": "Colour" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the scrollable drawing area and background color.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.screensize"
  },
  {
    "type": "turtle_bgcolor",
    "message0": "set background color to %1",
    "args0": [{ "type": "input_value", "name": "COLOR", "check": "Colour" }],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the window background color.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.bgcolor"
  },
  {
    "type": "turtle_bgpic",
    "message0": "set background picture to %1",
    "args0": [{ "type": "input_value", "name": "PICNAME", "check": "String" }],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets or clears the background image.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.bgpic"
  },
  {
    "type": "turtle_title",
    "message0": "set window title to %1",
    "args0": [{ "type": "input_value", "name": "TITLE", "check": "String" }],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the window's title bar text.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.title"
  },
  {
    "type": "turtle_mode",
    "message0": "set mode to %1",
    "args0": [
      { "type": "field_dropdown", "name": "MODE", "options": [["standard", "standard"], ["logo", "logo"], ["world", "world"]] }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the coordinate system.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.mode"
  },
  {
    "type": "turtle_colormode",
    "message0": "set color mode to %1",
    "args0": [
      { "type": "field_dropdown", "name": "CMODE", "options": [["1.0", "1.0"], ["255", "255"]] }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the color system.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.colormode"
  },
  {
    "type": "turtle_tracer",
    "message0": "set tracer to n: %1 delay: %2",
    "args0": [
      { "type": "input_value", "name": "N", "check": "Number" },
      { "type": "input_value", "name": "DELAY", "check": "Number" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Turns automatic screen updates on/off.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.tracer"
  },
  {
    "type": "turtle_update",
    "message0": "update screen",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Forces an immediate screen redraw.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.update"
  },
  {
    "type": "turtle_delay",
    "message0": "set delay to %1 ms",
    "args0": [{ "type": "input_value", "name": "DELAY", "check": "Number" }],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets the drawing delay in milliseconds.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.delay"
  },
  {
    "type": "turtle_clearscreen",
    "message0": "clear screen",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Clears all drawings and resets turtles.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.clearscreen"
  },
  {
    "type": "turtle_resetscreen",
    "message0": "reset screen",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Full reset of the screen.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.resetscreen"
  },
  {
    "type": "turtle_done",
    "message0": "done",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Keeps the window open.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.done"
  },
  {
    "type": "turtle_exitonclick",
    "message0": "exit on click",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Keeps the window open until the user clicks inside it.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.exitonclick"
  },
  // Events & Polygons
  {
    "type": "turtle_listen",
    "message0": "listen for events",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Sets focus to the screen to capture events.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.listen"
  },
  {
    "type": "turtle_onkey",
    "message0": "when key %1 is pressed run %2",
    "args0": [
      { "type": "field_input", "name": "KEY", "text": "space" },
      { "type": "input_value", "name": "FUNC" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Binds a function to a key press.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.onkey"
  },
  {
    "type": "turtle_onkeyrelease",
    "message0": "when key %1 is released run %2",
    "args0": [
      { "type": "field_input", "name": "KEY", "text": "space" },
      { "type": "input_value", "name": "FUNC" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Binds a function to a key release.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.onkeyrelease"
  },
  {
    "type": "turtle_onclick",
    "message0": "when turtle is clicked run %1",
    "args0": [{ "type": "input_value", "name": "FUNC" }],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Binds a function to a click on the turtle.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.onclick"
  },
  {
    "type": "turtle_onscreenclick",
    "message0": "when screen is clicked run %1",
    "args0": [{ "type": "input_value", "name": "FUNC" }],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Binds a function to a click on the screen.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.onscreenclick"
  },
  {
    "type": "turtle_onrelease",
    "message0": "when turtle click is released run %1",
    "args0": [{ "type": "input_value", "name": "FUNC" }],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Binds a function to a mouse button release on the turtle.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.onrelease"
  },
  {
    "type": "turtle_ontimer",
    "message0": "after %1 ms run %2",
    "args0": [
      { "type": "input_value", "name": "DELAY", "check": "Number" },
      { "type": "input_value", "name": "FUNC" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Calls a function after a given delay.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.ontimer"
  },
  {
    "type": "turtle_textinput",
    "message0": "ask for text with title %1 and prompt %2",
    "args0": [
      { "type": "input_value", "name": "TITLE", "check": "String" },
      { "type": "input_value", "name": "PROMPT", "check": "String" }
    ],
    "output": "String", "colour": "#4C97FF", "tooltip": "Opens a dialog to get text input from the user.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.textinput"
  },
  {
    "type": "turtle_numinput",
    "message0": "ask for number with title %1 prompt %2 default %3 min %4 max %5",
    "args0": [
      { "type": "input_value", "name": "TITLE", "check": "String" },
      { "type": "input_value", "name": "PROMPT", "check": "String" },
      { "type": "input_value", "name": "DEFAULT", "check": "Number" },
      { "type": "input_value", "name": "MIN", "check": "Number" },
      { "type": "input_value", "name": "MAX", "check": "Number" }
    ],
    "output": "Number", "colour": "#4C97FF", "tooltip": "Opens a dialog to get numerical input from the user.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.numinput"
  },
  {
    "type": "turtle_begin_poly",
    "message0": "begin polygon",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Starts recording the vertices of a polygon.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.begin_poly"
  },
  {
    "type": "turtle_end_poly",
    "message0": "end polygon",
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Stops recording the vertices of a polygon.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.end_poly"
  },
  {
    "type": "turtle_get_poly",
    "message0": "get polygon",
    "output": "Array", "colour": "#4C97FF", "tooltip": "Returns the last recorded polygon.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.get_poly"
  },
  {
    "type": "turtle_register_shape",
    "message0": "register shape %1 as %2",
    "args0": [
      { "type": "input_value", "name": "NAME", "check": "String" },
      { "type": "input_value", "name": "SHAPE", "check": "Array" }
    ],
    "previousStatement": null, "nextStatement": null, "colour": "#4C97FF", "tooltip": "Registers a polygon or image as a new turtle shape.", "helpUrl": "https://docs.python.org/3/library/turtle.html#turtle.register_shape"
  }
]);
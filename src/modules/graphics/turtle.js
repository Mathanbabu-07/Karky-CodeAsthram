import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "graphics_turtle_create",
    "message0": "create turtle",
    "output": "Turtle",
    "colour": 160,
    "tooltip": "Creates a new turtle object."
  },
  {
    "type": "graphics_turtle_forward",
    "message0": "move turtle %1 forward by %2 pixels",
    "args0": [
      { "type": "input_value", "name": "TURTLE", "check": "Turtle" },
      { "type": "input_value", "name": "DISTANCE", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Moves the turtle forward by a given distance."
  },
  {
    "type": "graphics_turtle_backward",
    "message0": "move turtle %1 backward by %2 pixels",
    "args0": [
      { "type": "input_value", "name": "TURTLE", "check": "Turtle" },
      { "type": "input_value", "name": "DISTANCE", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Moves the turtle backward by a given distance."
  },
  {
    "type": "graphics_turtle_right",
    "message0": "turn turtle %1 right by %2 degrees",
    "args0": [
      { "type": "input_value", "name": "TURTLE", "check": "Turtle" },
      { "type": "input_value", "name": "ANGLE", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Turns the turtle right by a given angle."
  },
  {
    "type": "graphics_turtle_left",
    "message0": "turn turtle %1 left by %2 degrees",
    "args0": [
      { "type": "input_value", "name": "TURTLE", "check": "Turtle" },
      { "type": "input_value", "name": "ANGLE", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Turns the turtle left by a given angle."
  },
  {
    "type": "graphics_turtle_penup",
    "message0": "lift pen of turtle %1",
    "args0": [
      { "type": "input_value", "name": "TURTLE", "check": "Turtle" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Lifts the turtle's pen, so it doesn't draw."
  },
  {
    "type": "graphics_turtle_pendown",
    "message0": "lower pen of turtle %1",
    "args0": [
      { "type": "input_value", "name": "TURTLE", "check": "Turtle" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Lowers the turtle's pen, so it draws."
  },
  {
    "type": "graphics_turtle_done",
    "message0": "finish turtle drawing",
    "previousStatement": null,
    "colour": 160,
    "tooltip": "Finishes the turtle drawing and displays the result."
  }
]);

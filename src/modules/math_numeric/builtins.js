import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "math_pi",
    "message0": "pi",
    "output": "Number",
    "colour": 230,
    "tooltip": "The constant value of pi (3.141...)",
    "helpUrl": ""
  },
  {
    "type": "math_sqrt",
    "message0": "square root of %1",
    "args0": [
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "Calculates the square root of a number.",
    "helpUrl": ""
  }
]);

// src/modules/variables_basic_types/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  // Block for casting to a different type
  {
    "type": "variables_cast",
    "message0": "cast %1 to %2",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["integer", "int"],
          ["string", "str"],
          ["float", "float"],
          ["boolean", "bool"]
        ]
      }
    ],
    "output": null,
    "colour": "#FF8C1A",
    "inputsInline": true,
    "tooltip": "Casts a value to the specified type.",
    "helpUrl": "https://docs.python.org/3/library/functions.html"
  },
  // Block for getting a value with a default if it is None
  {
    "type": "variables_get_with_default",
    "message0": "value %1 or default %2",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "input_value",
        "name": "DEFAULT"
      }
    ],
    "output": null,
    "colour": "#FF8C1A",
    "inputsInline": true,
    "tooltip": "Returns the value if it is not None, otherwise returns the default.",
    "helpUrl": ""
  }
]);

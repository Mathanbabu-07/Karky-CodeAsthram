// src/modules/lists_sequences/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "lists_comprehension",
    "message0": "list comprehension: %1 for %2 in %3 if %4",
    "args0": [
      { "type": "input_value", "name": "OUTPUT" },
      { "type": "field_variable", "name": "VAR", "variable": "item" },
      { "type": "input_value", "name": "LIST", "check": "Array" },
      { "type": "input_value", "name": "IF", "check": "Boolean" }
    ],
    "output": "Array",
    "colour": "#745BA5",
    "tooltip": "Creates a new list based on an existing list.",
    "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
  }
]);

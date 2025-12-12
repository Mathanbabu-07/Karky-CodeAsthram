// src/modules/loops_iteration/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "loops_for_each_safe",
    "message0": "for each item %1 in list %2 with limit %3",
    "args0": [
      { "type": "field_variable", "name": "VAR", "variable": "item" },
      { "type": "input_value", "name": "LIST", "check": "Array" },
      { "type": "input_value", "name": "LIMIT", "check": "Number" }
    ],
    "message1": "do %1",
    "args1": [
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#33A574",
    "tooltip": "A 'for each' loop with a safety limit on iterations. Default limit is 1000.",
    "helpUrl": ""
  },
  {
    "type": "loops_while_safe",
    "message0": "while %1 with limit %2",
    "args0": [
      { "type": "input_value", "name": "BOOL", "check": "Boolean" },
      { "type": "input_value", "name": "LIMIT", "check": "Number" }
    ],
    "message1": "do %1",
    "args1": [
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#33A574",
    "tooltip": "A 'while' loop with a safety limit on iterations. Default limit is 1000.",
    "helpUrl": ""
  },
  {
    "type": "loops_enumerate",
    "message0": "for index %1 , item %2 in enumerate %3",
    "args0": [
      { "type": "field_variable", "name": "INDEX_VAR", "variable": "index" },
      { "type": "field_variable", "name": "ITEM_VAR", "variable": "item" },
      { "type": "input_value", "name": "LIST", "check": "Array" }
    ],
    "message1": "do %1",
    "args1": [
        { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#33A574",
    "inputsInline": true,
    "tooltip": "Iterates over a list with both index and item.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#enumerate"
  },
  {
    "type": "loops_zip",
    "message0": "for %1 in zip of lists %2",
    "args0": [
      { "type": "field_input", "name": "VARS", "text": "a, b" },
      { "type": "input_value", "name": "LISTS", "check": "Array" }
    ],
    "message1": "do %1",
    "args1": [
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#33A574",
    "tooltip": "Iterates over multiple lists at once. The input should be a list of lists.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#zip"
  }
]);

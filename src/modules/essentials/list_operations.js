import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_list_statements",
    "message0": "in list %1 %2 item %3 at index %4",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array",
        "colour": "#4D6A94"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          [
            "append",
            "APPEND"
          ],
          [
            "insert",
            "INSERT"
          ],
          [
            "remove",
            "REMOVE"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "ITEM"
      },
      {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Append, insert, or remove an item from a list."
  },
  {
    "type": "essentials_list_expressions",
    "message0": "in list %1 pop item at index %2",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Pops an item from a list at the specified index."
  }
]);
import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_dict_statements",
    "message0": "in dictionary %1 set key %2 to value %3",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "KEY"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Set a key-value pair in a dictionary."
  },
  {
    "type": "essentials_dict_expressions",
    "message0": "in dictionary %1 %2 key %3",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#4D6A94"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          [
            "get",
            "GET"
          ],
          [
            "pop",
            "POP"
          ],
          [
            "get all keys",
            "KEYS"
          ],
          [
            "get all values",
            "VALUES"
          ],
          [
            "get all items",
            "ITEMS"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "KEY"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Get, pop, or retrieve keys\/values\/items from a dictionary."
  }
]);
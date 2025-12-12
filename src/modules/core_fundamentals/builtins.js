import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "python_text",
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
        "text": ""
      }
    ],
    "output": "String",
    "colour": 160,
    "tooltip": "A string of text.",
    "helpUrl": ""
  },
  {
    "type": "python_number",
    "message0": "%1",
    "args0": [
      {
        "type": "field_number",
        "name": "NUM",
        "value": 0
      }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "A number.",
    "helpUrl": ""
  },
  {
    "type": "python_boolean",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "BOOL",
        "options": [
          [
            "True",
            "TRUE"
          ],
          [
            "False",
            "FALSE"
          ]
        ]
      }
    ],
    "output": "Boolean",
    "colour": 210,
    "tooltip": "A boolean value (True or False).",
    "helpUrl": ""
  },
  {
    "type": "python_list",
    "message0": "create list with %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "ITEMS"
      }
    ],
    "output": "Array",
    "colour": 260,
    "tooltip": "Create a list with any number of items.",
    "helpUrl": ""
  },
  {
      "type": "python_dict",
      "message0": "create dictionary with %1",
      "args0": [
          {
              "type": "input_statement",
              "name": "ITEMS"
          }
      ],
      "output": "Object",
      "colour": 20,
      "tooltip": "Create a dictionary with key-value pairs.",
      "helpUrl": ""
  },
  {
      "type": "python_key_value",
      "message0": "key %1 value %2",
      "args0": [
          {
              "type": "field_input",
              "name": "KEY",
              "text": "key"
          },
          {
              "type": "input_value",
              "name": "VALUE"
          }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 40,
      "tooltip": "A key-value pair for a dictionary.",
      "helpUrl": ""
  }
  ,
  {
    "type": "builtins_eval",
    "message0": "eval expression %1",
    "args0": [ { "type": "input_value", "name": "EXPR", "check": ["String", null] } ],
    "output": null,
    "colour": 160,
    "tooltip": "Evaluate a Python expression string and return the result.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#eval"
  }
]);

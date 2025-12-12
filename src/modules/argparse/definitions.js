import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "argparse_import",
    "message0": "import argparse",
    "nextStatement": null,
    "colour": "#546E7A",
    "tooltip": "Imports the argparse module.",
    "helpUrl": ""
  },
  {
    "type": "argparse_create_parser",
    "message0": "create argument parser with description %1",
    "args0": [{
        "type": "input_value",
        "name": "DESCRIPTION",
        "check": "String",
        "colour": "#546E7A"
      }],
    "output": null,
    "colour": "#546E7A",
    "tooltip": "Creates an ArgumentParser object.",
    "helpUrl": ""
  },
  {
    "type": "argparse_add_argument",
    "message0": "parser %1 add argument %2",
    "args0": [
      {
        "type": "input_value",
        "name": "PARSER",
        "colour": "#546E7A"
      },
      {
        "type": "input_value",
        "name": "ARG_NAME",
        "check": "String"
      }
    ],
    "message1": "help %1",
    "args1": [{
        "type": "input_value",
        "name": "HELP",
        "check": "String"
      }],
    "message2": "required %1 default %2",
    "args2": [
      { "type": "field_dropdown", "name": "REQUIRED", "options": [["no","FALSE"],["yes","TRUE"]] },
      { "type": "input_value", "name": "DEFAULT" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#546E7A",
    "tooltip": "Adds an argument to the parser.",
    "helpUrl": ""
  },
  {
    "type": "argparse_parse_args",
    "message0": "parser %1 parse args",
    "args0": [{
        "type": "input_value",
        "name": "PARSER",
        "colour": "#546E7A"
      }],
    "output": null,
    "colour": "#546E7A",
    "tooltip": "Parses the command-line arguments.",
    "helpUrl": ""
  },
  {
    "type": "argparse_get_arg",
    "message0": "get arg %1 from parsed args %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ARG_NAME",
        "check": "String",
        "colour": "#546E7A"
      },
      {
        "type": "input_value",
        "name": "ARGS"
      }
    ],
    "output": null,
    "colour": "#546E7A",
    "tooltip": "Gets the value of a specific argument.",
    "helpUrl": ""
  }
]);
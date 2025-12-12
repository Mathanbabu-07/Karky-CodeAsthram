import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "tools_argparse_define",
    "message0": "define CLI argument %1",
    "args0": [
      { "type": "input_value", "name": "ARG", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Defines a command-line argument."
  },
  {
    "type": "tools_argparse_parse",
    "message0": "parse CLI arguments",
    "output": "Object",
    "colour": 260,
    "tooltip": "Parses command-line arguments."
  },
  {
    "type": "tools_print_help",
    "message0": "print CLI help",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Prints the command-line help message."
  }
]);

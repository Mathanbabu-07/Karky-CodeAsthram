import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "text_to_lines",
    "message0": "get lines from text %1",
    "args0": [{
        "type": "input_value",
        "name": "TEXT",
        "check": "String",
        "colour": "#D3425C"
      }],
    "output": "Array",
    "colour": "#D3425C",
    "tooltip": "Splits a multi-line text into a list of lines."
  },
  {
    "type": "text_indent",
    "message0": "indent text %1 with %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "PREFIX",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#D3425C",
    "tooltip": "Indents each line of a text with a prefix."
  },
  {
    "type": "text_unindent",
    "message0": "unindent text %1",
    "args0": [{
        "type": "input_value",
        "name": "TEXT",
        "check": "String",
        "colour": "#D3425C"
      }],
    "output": "String",
    "colour": "#D3425C",
    "tooltip": "Unindents a block of text."
  },
  {
    "type": "text_preview",
    "message0": "preview of text %1 with limit %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "LIMIT",
        "check": "Number"
      }
    ],
    "output": "String",
    "colour": "#D3425C",
    "tooltip": "Creates a preview of a text, truncated to a certain length."
  }
]);
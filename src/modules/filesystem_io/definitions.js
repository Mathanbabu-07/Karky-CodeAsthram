// src/modules/filesystem_io/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "filesystem_read_file",
    "message0": "read file from path %1",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "output": "String",
    "colour": "#428042",
    "tooltip": "Reads a file from the virtual filesystem.",
    "helpUrl": ""
  },
  {
    "type": "filesystem_write_file",
    "message0": "write to file at path %1 content %2",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" },
      { "type": "input_value", "name": "CONTENT" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#428042",
    "tooltip": "Writes content to a file in the virtual filesystem.",
    "helpUrl": ""
  },
  {
    "type": "filesystem_list_dir",
    "message0": "list directory at path %1",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "output": "Array",
    "colour": "#428042",
    "tooltip": "Lists the contents of a directory in the virtual filesystem.",
    "helpUrl": ""
  }
]);

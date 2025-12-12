import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "system_io_open",
    "message0": "open file %1 in mode %2",
    "args0": [
      {
        "type": "input_value",
        "name": "PATH",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "MODE",
        "options": [
          [ "read", "r" ],
          [ "write", "w" ],
          [ "append", "a" ],
          [ "read/write", "r+" ]
        ]
      }
    ],
    "output": "File",
    "colour": 230,
    "tooltip": "Opens a file and returns a file object.",
    "helpUrl": ""
  },
  {
    "type": "system_io_read",
    "message0": "read from file %1",
    "args0": [
      {
        "type": "input_value",
        "name": "FILE",
        "check": "File"
      }
    ],
    "output": "String",
    "colour": 230,
    "tooltip": "Reads the entire content of a file.",
    "helpUrl": ""
  },
  {
    "type": "system_io_write",
    "message0": "write %1 to file %2",
    "args0": [
      {
        "type": "input_value",
        "name": "CONTENT",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "FILE",
        "check": "File"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Writes a string to a file.",
    "helpUrl": ""
  },
  {
    "type": "system_io_close",
    "message0": "close file %1",
    "args0": [
      {
        "type": "input_value",
        "name": "FILE",
        "check": "File"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Closes a file.",
    "helpUrl": ""
  },
  {
    "type": "system_io_remove",
    "message0": "delete file at path %1",
    "args0": [
      {
        "type": "input_value",
        "name": "PATH",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Deletes a file.",
    "helpUrl": ""
  },
  {
    "type": "system_io_listdir",
    "message0": "list files in directory %1",
    "args0": [
      {
        "type": "input_value",
        "name": "PATH",
        "check": "String"
      }
    ],
    "output": "Array",
    "colour": 230,
    "tooltip": "Returns a list of files in a directory.",
    "helpUrl": ""
  }
]);

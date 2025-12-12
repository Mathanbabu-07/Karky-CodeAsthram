import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "io_json_load",
    "message0": "load JSON from %1",
    "args0": [{
        "type": "input_value",
        "name": "SOURCE",
        "check": "String",
        "colour": "#3A9467"
      }],
    "output": "Object",
    "colour": "#3A9467",
    "tooltip": "Loads a JSON string or from a file path."
  },
  {
    "type": "io_json_dump",
    "message0": "dump object %1 to JSON string or file path %2 with indent %3 and sort keys %4",
    "args0": [
      {
        "type": "input_value",
        "name": "OBJECT",
        "colour": "#3A9467"
      },
      {
        "type": "input_value",
        "name": "DEST",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "INDENT",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "SORT_KEYS",
        "check": "Boolean"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3A9467",
    "tooltip": "Dumps an object to a JSON string or a file, with optional formatting."
  },
  {
    "type": "io_csv_read",
    "message0": "read CSV from path %1 with delimiter %2",
    "args0": [
      {
        "type": "input_value",
        "name": "PATH",
        "check": "String",
        "colour": "#3A9467"
      },
      {
        "type": "input_value",
        "name": "DELIMITER",
        "check": "String"
      }
    ],
    "output": "Array",
    "colour": "#3A9467",
    "tooltip": "Reads a CSV file into a list of dictionaries."
  },
  {
    "type": "io_csv_write",
    "message0": "write list of dictionaries %1 to CSV path %2 with delimiter %3",
    "args0": [
      {
        "type": "input_value",
        "name": "ROWS",
        "check": "Array",
        "colour": "#3A9467"
      },
      {
        "type": "input_value",
        "name": "PATH",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "DELIMITER",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3A9467",
    "tooltip": "Writes a list of dictionaries to a CSV file."
  },
  {
    "type": "io_yaml_load",
    "message0": "load YAML from %1",
    "args0": [{
        "type": "input_value",
        "name": "SOURCE",
        "check": "String",
        "colour": "#3A9467"
      }],
    "output": "Object",
    "colour": "#3A9467",
    "tooltip": "Loads a YAML string or from a file path. (Gated)"
  },
  {
    "type": "io_yaml_dump",
    "message0": "dump object %1 to YAML string or file path %2",
    "args0": [
      {
        "type": "input_value",
        "name": "OBJECT",
        "colour": "#3A9467"
      },
      {
        "type": "input_value",
        "name": "DEST",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3A9467",
    "tooltip": "Dumps an object to a YAML string or a file. (Gated)"
  }
]);
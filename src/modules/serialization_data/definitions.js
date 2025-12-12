// src/modules/serialization_data/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "serialization_to_json",
    "message0": "convert to JSON string %1",
    "args0": [
      { "type": "input_value", "name": "DATA" }
    ],
    "output": "String",
    "colour": "#C27448",
    "tooltip": "Serializes a dictionary or list into a JSON string.",
    "helpUrl": "https://docs.python.org/3/library/json.html#json.dumps"
  },
  {
    "type": "serialization_from_json",
    "message0": "parse JSON from string %1",
    "args0": [
      { "type": "input_value", "name": "JSON_STRING", "check": "String" }
    ],
    "output": null,
    "colour": "#C27448",
    "tooltip": "Deserializes a JSON string into a dictionary or list.",
    "helpUrl": "https://docs.python.org/3/library/json.html#json.loads"
  },
  {
    "type": "serialization_write_csv",
    "message0": "write to CSV file at path %1 data (list of dicts) %2",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" },
      { "type": "input_value", "name": "DATA", "check": "Array" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#C27448",
    "tooltip": "Writes a list of dictionaries to a CSV file in the virtual filesystem.",
    "helpUrl": ""
  },
  {
    "type": "serialization_read_csv",
    "message0": "read CSV file from path %1",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "output": "Array",
    "colour": "#C27448",
    "tooltip": "Reads a CSV file from the virtual filesystem into a list of dictionaries.",
    "helpUrl": ""
  }
]);

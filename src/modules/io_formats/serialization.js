import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "io_serialize_json_safe",
    "message0": "serialize to safe JSON %1",
    "args0": [{
        "type": "input_value",
        "name": "OBJECT",
        "colour": "#3A9467"
      }],
    "output": "String",
    "colour": "#3A9467",
    "tooltip": "Serializes an object to a JSON string safely."
  },
  {
    "type": "io_deserialize_json_safe",
    "message0": "deserialize from safe JSON %1",
    "args0": [{
        "type": "input_value",
        "name": "JSON",
        "check": "String",
        "colour": "#3A9467"
      }],
    "output": null,
    "colour": "#3A9467",
    "tooltip": "Deserializes a JSON string safely."
  },
  {
    "type": "io_serialize_msgpack",
    "message0": "serialize to MessagePack %1",
    "args0": [{
        "type": "input_value",
        "name": "OBJECT",
        "colour": "#3A9467"
      }],
    "output": "Bytes",
    "colour": "#3A9467",
    "tooltip": "Serializes an object using MessagePack."
  }
]);
import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "io_bytes_from_text",
    "message0": "bytes from text %1 encoding %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String",
        "colour": "#3A9467"
      },
      {
        "type": "field_input",
        "name": "ENCODING",
        "text": "utf-8"
      }
    ],
    "output": "Bytes",
    "colour": "#3A9467",
    "tooltip": "Encodes a string into bytes."
  },
  {
    "type": "io_text_from_bytes",
    "message0": "text from bytes %1 encoding %2",
    "args0": [
      {
        "type": "input_value",
        "name": "BYTES",
        "check": "Bytes",
        "colour": "#3A9467"
      },
      {
        "type": "field_input",
        "name": "ENCODING",
        "text": "utf-8"
      }
    ],
    "output": "String",
    "colour": "#3A9467",
    "tooltip": "Decodes bytes into a string."
  },
  {
    "type": "io_stream_read_chunk",
    "message0": "read chunk of size %1 from stream %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SIZE",
        "check": "Number",
        "colour": "#3A9467"
      },
      {
        "type": "input_value",
        "name": "STREAM"
      }
    ],
    "output": "Bytes",
    "colour": "#3A9467",
    "tooltip": "Reads a chunk of bytes from a stream."
  },
  {
    "type": "io_stream_write_chunk",
    "message0": "write chunk %1 to stream %2",
    "args0": [
      {
        "type": "input_value",
        "name": "CHUNK",
        "check": "Bytes",
        "colour": "#3A9467"
      },
      {
        "type": "input_value",
        "name": "STREAM"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3A9467",
    "tooltip": "Writes a chunk of bytes to a stream."
  }
]);
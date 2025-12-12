import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "tools_log_debug",
    "message0": "log debug message %1 with data %2",
    "args0": [
      { "type": "input_value", "name": "MSG", "check": "String" },
      { "type": "input_value", "name": "DATA" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Logs a debug message."
  },
  {
    "type": "tools_log_to_file",
    "message0": "log message %1 to file %2",
    "args0": [
      { "type": "input_value", "name": "MSG", "check": "String" },
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Logs a message to a file. (Gated)"
  },
  {
    "type": "tools_capture_stacktrace",
    "message0": "capture stacktrace",
    "output": "String",
    "colour": 260,
    "tooltip": "Captures the current stacktrace."
  }
]);

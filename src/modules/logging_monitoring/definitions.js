// src/modules/logging_monitoring/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "logging_log",
    "message0": "log %1 with level %2",
    "args0": [
      { "type": "input_value", "name": "MESSAGE" },
      {
        "type": "field_dropdown",
        "name": "LEVEL",
        "options": [
          ["info", "info"],
          ["warning", "warning"],
          ["error", "error"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5B5B5B",
    "tooltip": "Logs a message with the specified level.",
    "helpUrl": ""
  },
  {
    "type": "monitoring_metric_increment",
    "message0": "increment metric %1 by %2",
    "args0": [
      { "type": "input_value", "name": "NAME", "check": "String" },
      { "type": "input_value", "name": "VALUE", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5B5B5B",
    "tooltip": "Increments a monitoring metric.",
    "helpUrl": ""
  },
  {
    "type": "monitoring_trace_span",
    "message0": "trace span named %1 do %2",
    "args0": [
      { "type": "input_value", "name": "NAME", "check": "String" },
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5B5B5B",
    "tooltip": "Creates a monitoring trace span around a block of code.",
    "helpUrl": ""
  }
]);

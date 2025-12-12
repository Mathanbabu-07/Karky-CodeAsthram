import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "concurrency_schedule_every",
    "message0": "schedule to run %1 every %2 seconds",
    "args0": [
      {
        "type": "input_value",
        "name": "FN",
        "colour": "#FF7043"
      },
      {
        "type": "input_value",
        "name": "INTERVAL",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7043",
    "tooltip": "Schedules a function to run at a regular interval."
  },
  {
    "type": "concurrency_schedule_once",
    "message0": "schedule to run %1 once after %2 seconds",
    "args0": [
      {
        "type": "input_value",
        "name": "FN",
        "colour": "#FF7043"
      },
      {
        "type": "input_value",
        "name": "DELAY",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7043",
    "tooltip": "Schedules a function to run once after a delay."
  }
]);
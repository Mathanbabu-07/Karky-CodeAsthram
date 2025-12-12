// src/modules/concurrency_parallelism/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "concurrency_submit_task",
    "message0": "run in background %1 with args %2",
    "args0": [
      { "type": "input_value", "name": "FUNC" },
      { "type": "input_value", "name": "ARGS", "check": "Array" }
    ],
    "output": "Future",
    "colour": "#D95757",
    "tooltip": "Runs a function in the background using a managed thread pool. Returns a future object.",
    "helpUrl": ""
  },
  {
    "type": "concurrency_get_future_result",
    "message0": "get result from future %1 with timeout (secs) %2",
    "args0": [
      { "type": "input_value", "name": "FUTURE", "check": "Future" },
      { "type": "input_value", "name": "TIMEOUT", "check": "Number" }
    ],
    "output": null,
    "colour": "#D95757",
    "inputsInline": true,
    "tooltip": "Waits for a background task to finish and gets its result. Provide a timeout in seconds.",
    "helpUrl": ""
  },
  {
    "type": "concurrency_is_future_done",
    "message0": "is future %1 done?",
    "args0": [
      { "type": "input_value", "name": "FUTURE", "check": "Future" }
    ],
    "output": "Boolean",
    "colour": "#D95757",
    "inputsInline": true,
    "tooltip": "Checks if a background task has completed, failed, or been cancelled.",
    "helpUrl": ""
  }
]);

import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "tools_timeit_block",
    "message0": "time execution of %1",
    "args0": [
      { "type": "input_statement", "name": "DO" }
    ],
    "output": "Number",
    "colour": 260,
    "tooltip": "Times the execution of a block of code."
  },
  {
    "type": "tools_profile_start_stop",
    "message0": "%1 profiling",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ACTION",
        "options": [
          ["start", "START"],
          ["stop", "STOP"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Starts or stops the profiler."
  },
  {
    "type": "tools_memory_snapshot",
    "message0": "take memory snapshot",
    "output": "Object",
    "colour": 260,
    "tooltip": "Takes a snapshot of memory usage."
  },
  {
    "type": "tools_trace_function",
    "message0": "trace function %1",
    "args0": [
      { "type": "input_value", "name": "FN" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Traces the execution of a function."
  }
]);

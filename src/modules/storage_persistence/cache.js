import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "storage_cache_set",
    "message0": "in cache set key %1 to value %2 with TTL (s) %3",
    "args0": [
      { "type": "input_value", "name": "KEY", "check": "String" },
      { "type": "input_value", "name": "VALUE" },
      { "type": "input_value", "name": "TTL", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Sets a value in the cache with an optional time-to-live."
  },
  {
    "type": "storage_cache_get",
    "message0": "in cache get key %1",
    "args0": [
      { "type": "input_value", "name": "KEY", "check": "String" }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "Gets a value from the cache."
  },
  {
    "type": "storage_cache_delete",
    "message0": "in cache delete key %1",
    "args0": [
      { "type": "input_value", "name": "KEY", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Deletes a value from the cache."
  },
  {
    "type": "storage_cache_incr",
    "message0": "in cache increment key %1 by %2",
    "args0": [
      { "type": "input_value", "name": "KEY", "check": "String" },
      { "type": "input_value", "name": "BY", "check": "Number" }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "Increments a value in the cache."
  }
]);

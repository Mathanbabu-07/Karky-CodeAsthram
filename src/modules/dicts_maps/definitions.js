// src/modules/dicts_maps/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "dicts_create_with_item",
    "message0": "key %1 value %2",
    "args0": [
      { "type": "input_value", "name": "KEY" },
      { "type": "input_value", "name": "VALUE" }
    ],
    "output": "dict_pair",
    "colour": "#CF63CF",
    "tooltip": "A key-value pair for a dictionary.",
    "inputsInline": true,
    "helpUrl": ""
  },
  {
    "type": "dicts_register_handler",
    "message0": "in registry %1 register handler %2 for key %3",
    "args0": [
      { "type": "input_value", "name": "REGISTRY", "check": "Object" },
      { "type": "input_value", "name": "HANDLER" },
      { "type": "input_value", "name": "KEY" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#CF63CF",
    "inputsInline": true,
    "tooltip": "A pattern for registering a function (handler) in a dictionary.",
    "helpUrl": ""
  },
  // Block for copying a dictionary
  {
    "type": "dicts_copy",
    "message0": "copy dictionary %1",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Object"
      }
    ],
    "output": "Object",
    "colour": "#CF63CF",
    "tooltip": "Returns a shallow copy of a dictionary.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#dict.copy"
  },
  // Block for creating a dictionary from keys
  {
    "type": "dicts_fromkeys",
    "message0": "create dictionary from keys %1 with value %2",
    "args0": [
      {
        "type": "input_value",
        "name": "KEYS",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "output": "Object",
    "colour": "#CF63CF",
    "inputsInline": true,
    "tooltip": "Creates a new dictionary with keys from a sequence and a specified value.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#dict.fromkeys"
  },
  // Block for popping an item from a dictionary
  {
    "type": "dicts_popitem",
    "message0": "pop item from dictionary %1",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Object"
      }
    ],
    "output": "Tuple",
    "colour": "#CF63CF",
    "tooltip": "Removes and returns an arbitrary (key, value) pair from the dictionary.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#dict.popitem"
  }
]);

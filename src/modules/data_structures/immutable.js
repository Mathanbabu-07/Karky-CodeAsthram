import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "data_structures_frozen_map",
    "message0": "frozen map from dictionary %1",
    "args0": [{
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#3A8A9E"
      }],
    "output": null,
    "colour": "#3A8A9E",
    "tooltip": "Creates an immutable map (frozenset of items)."
  },
  {
    "type": "data_structures_frozen_list",
    "message0": "frozen list from list %1",
    "args0": [{
        "type": "input_value",
        "name": "LIST",
        "check": "Array",
        "colour": "#3A8A9E"
      }],
    "output": "Tuple",
    "colour": "#3A8A9E",
    "tooltip": "Creates an immutable list (tuple)."
  }
]);
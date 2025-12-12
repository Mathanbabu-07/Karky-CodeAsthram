import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "data_structures_map_get_path",
    "message0": "in dictionary %1 get path %2 default %3",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#3A8A9E"
      },
      {
        "type": "input_value",
        "name": "PATH",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "DEFAULT"
      }
    ],
    "output": null,
    "colour": "#3A8A9E",
    "tooltip": "Gets a value from a nested dictionary using a list of keys."
  },
  {
    "type": "data_structures_map_set_path",
    "message0": "in dictionary %1 set path %2 to value %3",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#3A8A9E"
      },
      {
        "type": "input_value",
        "name": "PATH",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3A8A9E",
    "tooltip": "Sets a value in a nested dictionary using a list of keys."
  },
  {
    "type": "data_structures_map_flatten",
    "message0": "flatten dictionary %1",
    "args0": [{
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#3A8A9E"
      }],
    "output": "Object",
    "colour": "#3A8A9E",
    "tooltip": "Flattens a nested dictionary into a single level."
  },
  {
    "type": "data_structures_map_unflatten",
    "message0": "unflatten dictionary %1",
    "args0": [{
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#3A8A9E"
      }],
    "output": "Object",
    "colour": "#3A8A9E",
    "tooltip": "Unflattens a dictionary with dot-separated keys into a nested dictionary."
  },
  {
    "type": "data_structures_map_filter_by_value",
    "message0": "filter dictionary %1 by value where %2",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#3A8A9E"
      },
      {
        "type": "input_value",
        "name": "CONDITION",
        "check": "Boolean"
      }
    ],
    "output": "Object",
    "colour": "#3A8A9E",
    "tooltip": "Filters a dictionary by its values using a lambda function."
  },
  {
    "type": "data_structures_map_keys_to_list",
    "message0": "keys of %1 as list",
    "args0": [{
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#3A8A9E"
      }],
    "output": "Array",
    "colour": "#3A8A9E",
    "tooltip": "Returns a list of the dictionary's keys."
  },
  {
    "type": "data_structures_map_items_to_list",
    "message0": "items of %1 as list of tuples",
    "args0": [{
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#3A8A9E"
      }],
    "output": "Array",
    "colour": "#3A8A9E",
    "tooltip": "Returns a list of the dictionary's (key, value) pairs."
  },
  {
    "type": "data_structures_map_invert",
    "message0": "invert dictionary %1",
    "args0": [{
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#3A8A9E"
      }],
    "output": "Object",
    "colour": "#3A8A9E",
    "tooltip": "Inverts a dictionary, swapping keys and values."
  }
]);
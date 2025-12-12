import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "data_structures_registry_create",
    "message0": "create registry named %1",
    "args0": [{
        "type": "field_input",
        "name": "NAME",
        "text": "my_registry",
        "colour": "#3A8A9E"
      }],
    "output": "Object",
    "colour": "#3A8A9E",
    "tooltip": "Creates a new, empty registry (a dictionary)."
  },
  {
    "type": "data_structures_registry_register",
    "message0": "in registry %1 register key %2 with function %3",
    "args0": [
      {
        "type": "input_value",
        "name": "REGISTRY",
        "check": "Object",
        "colour": "#3A8A9E"
      },
      {
        "type": "input_value",
        "name": "KEY"
      },
      {
        "type": "input_value",
        "name": "FN"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3A8A9E",
    "tooltip": "Registers a function in a registry."
  },
  {
    "type": "data_structures_registry_unregister",
    "message0": "in registry %1 unregister key %2",
    "args0": [
      {
        "type": "input_value",
        "name": "REGISTRY",
        "check": "Object",
        "colour": "#3A8A9E"
      },
      {
        "type": "input_value",
        "name": "KEY"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3A8A9E",
    "tooltip": "Unregisters a function from a registry."
  },
  {
    "type": "data_structures_registry_list",
    "message0": "list registered keys in %1",
    "args0": [{
        "type": "input_value",
        "name": "REGISTRY",
        "check": "Object",
        "colour": "#3A8A9E"
      }],
    "output": "Array",
    "colour": "#3A8A9E",
    "tooltip": "Lists all registered keys in a registry."
  }
]);
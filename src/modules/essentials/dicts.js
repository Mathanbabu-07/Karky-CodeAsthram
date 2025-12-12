import * as Blockly from "blockly\/core";
import { createPlusField } from "..\/..\/plugins\/block-plus-minus\/field_plus";
import { createMinusField } from "..\/..\/plugins\/block-plus-minus\/field_minus";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_dict_create",
    "message0": "create dictionary with %1",
    "args0": [{
        "type": "input_dummy",
        "name": "EMPTY",
        "colour": "#4D6A94"
      }],
    "output": "Object",
    "colour": "#4D6A94",
    "tooltip": "Creates a dictionary with any number of key-value pairs.",
    "helpUrl": "",
    "mutator": "essentials_dict_create_mutator"
  },
  {
    "type": "essentials_dict_update",
    "message0": "update %1 with %2",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT1",
        "check": "Object",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "DICT2",
        "check": "Object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Updates a dictionary with another dictionary.",
    "helpUrl": ""
  },
  {
    "type": "essentials_dict_merge_shallow",
    "message0": "merge shallow %1 and %2",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT1",
        "check": "Object",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "DICT2",
        "check": "Object"
      }
    ],
    "output": "Object",
    "colour": "#4D6A94",
    "tooltip": "Merges two dictionaries shallowly.",
    "helpUrl": ""
  },
  {
    "type": "essentials_dict_deep_merge",
    "message0": "merge deep %1 and %2",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT1",
        "check": "Object",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "DICT2",
        "check": "Object"
      }
    ],
    "output": "Object",
    "colour": "#4D6A94",
    "tooltip": "Merges two dictionaries deeply.",
    "helpUrl": ""
  },
  {
    "type": "essentials_dict_get_nested",
    "message0": "in dictionary %1 get nested path %2 with default %3",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Object",
        "colour": "#4D6A94"
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
    "colour": "#4D6A94",
    "tooltip": "Gets a nested value from a dictionary using a path.",
    "helpUrl": ""
  },
  {
    "type": "essentials_registry_register",
    "message0": "in registry %1 register key %2 with value %3",
    "args0": [
      {
        "type": "input_value",
        "name": "REGISTRY",
        "check": "Object",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "KEY"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Registers a value in a registry.",
    "helpUrl": ""
  },
  {
    "type": "essentials_registry_call",
    "message0": "in registry %1 call key %2 with args %3 kwargs %4",
    "args0": [
      {
        "type": "input_value",
        "name": "REGISTRY",
        "check": "Object",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "KEY"
      },
      {
        "type": "input_value",
        "name": "ARGS",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "KWARGS",
        "check": "Object"
      }
    ],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Calls a function from a registry.",
    "helpUrl": ""
  },
  {
    "type": "essentials_dict_has_key",
    "message0": "dictionary %1 has key %2",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Object"
      },
      {
        "type": "input_value",
        "name": "KEY"
      }
    ],
    "output": "Boolean",
    "colour": 20,
    "tooltip": "Checks if a dictionary has a key.",
    "helpUrl": ""
  }
]);
const essentialsDictCreateMutator = {
  itemCount_: 0,
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_(targetCount);
  },
  saveExtraState: function () {
    return { itemCount: this.itemCount_ };
  },
  loadExtraState: function (state) {
    this.updateShape_(state["itemCount"]);
  },
  updateShape_: function (targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
    this.updateMinus_();
  },
  plus: function () {
    this.addPart_();
    this.updateMinus_();
  },
  minus: function () {
    if (this.itemCount_ === 0) {
      return;
    }
    this.removePart_();
    this.updateMinus_();
  },
  addPart_: function () {
    if (this.itemCount_ === 0) {
      this.removeInput("EMPTY");
      this.topInput_ = this.appendDummyInput("ADD0").appendField(createPlusField(), "PLUS").appendField("create dictionary with");
    }
    this.appendValueInput("KEY" + this.itemCount_).appendField("key");
    this.appendValueInput("VALUE" + this.itemCount_).appendField("value");
    this.itemCount_++;
  },
  removePart_: function () {
    this.itemCount_--;
    this.removeInput("KEY" + this.itemCount_);
    this.removeInput("VALUE" + this.itemCount_);
    if (this.itemCount_ === 0) {
      this.topInput_ = this.appendDummyInput("EMPTY").appendField(createPlusField(), "PLUS").appendField("create empty dictionary");
    }
  },
  updateMinus_: function () {
    const minusField = this.getField("MINUS");
    if (this.topInput_) {
      if (!minusField && this.itemCount_ > 0) {
        this.topInput_.insertFieldAt(1, createMinusField(), "MINUS");
      } else if (minusField && this.itemCount_ < 1) {
        this.topInput_.removeField("MINUS");
      }
    }
  }
};
const essentialsDictCreateHelper = function () {
  this.getInput("EMPTY").insertFieldAt(0, createPlusField(), "PLUS");
  this.updateShape_(1);
};
Blockly.Extensions.registerMutator("essentials_dict_create_mutator", essentialsDictCreateMutator, essentialsDictCreateHelper);
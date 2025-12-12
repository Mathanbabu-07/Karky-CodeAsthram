import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_set_create",
    "message0": "create set with %1",
    "args0": [{
        "type": "input_dummy",
        "name": "EMPTY",
        "colour": "#4D6A94"
      }],
    "output": "Set",
    "colour": "#4D6A94",
    "tooltip": "Creates a set with any number of items.",
    "helpUrl": "",
    "mutator": "essentials_set_create_mutator"
  },
  {
    "type": "essentials_set_add",
    "message0": "add %1 to set %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ITEM",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "SET",
        "check": "Set"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Adds an item to a set.",
    "helpUrl": ""
  },
  {
    "type": "essentials_set_remove",
    "message0": "remove %1 from set %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ITEM",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "SET",
        "check": "Set"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Removes an item from a set.",
    "helpUrl": ""
  },
  {
    "type": "essentials_set_union",
    "message0": "union of %1 and %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SET1",
        "check": "Set",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "SET2",
        "check": "Set"
      }
    ],
    "output": "Set",
    "colour": "#4D6A94",
    "tooltip": "Returns the union of two sets.",
    "helpUrl": ""
  },
  {
    "type": "essentials_set_intersection",
    "message0": "intersection of %1 and %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SET1",
        "check": "Set",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "SET2",
        "check": "Set"
      }
    ],
    "output": "Set",
    "colour": "#4D6A94",
    "tooltip": "Returns the intersection of two sets.",
    "helpUrl": ""
  },
  {
    "type": "essentials_set_difference",
    "message0": "difference of %1 and %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SET1",
        "check": "Set",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "SET2",
        "check": "Set"
      }
    ],
    "output": "Set",
    "colour": "#4D6A94",
    "tooltip": "Returns the difference of two sets.",
    "helpUrl": ""
  },
  {
    "type": "essentials_set_symmetric_difference",
    "message0": "symmetric difference of %1 and %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SET1",
        "check": "Set",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "SET2",
        "check": "Set"
      }
    ],
    "output": "Set",
    "colour": "#4D6A94",
    "tooltip": "Returns the symmetric difference of two sets.",
    "helpUrl": ""
  },
  {
    "type": "essentials_set_contains",
    "message0": "%1 contains %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SET",
        "check": "Set",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "ITEM"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Returns true if the item is in the set.",
    "helpUrl": ""
  },
  {
    "type": "essentials_set_is_subset",
    "message0": "%1 is subset of %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SET1",
        "check": "Set",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "SET2",
        "check": "Set"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Returns true if the first set is a subset of the second.",
    "helpUrl": ""
  },
  {
    "type": "essentials_set_is_superset",
    "message0": "%1 is superset of %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SET1",
        "check": "Set",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "SET2",
        "check": "Set"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Returns true if the first set is a superset of the second.",
    "helpUrl": ""
  },
  {
    "type": "essentials_set_length",
    "message0": "length of %1",
    "args0": [{
        "type": "input_value",
        "name": "SET",
        "check": "Set"
      }],
    "output": "Number",
    "colour": 260,
    "tooltip": "Returns the number of items in a set.",
    "helpUrl": ""
  }
]);
import { createPlusField } from "..\/..\/plugins\/block-plus-minus\/field_plus";
import { createMinusField } from "..\/..\/plugins\/block-plus-minus\/field_minus";
const essentialsSetCreateMutator = {
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
      this.topInput_ = this.appendValueInput("ADD0").appendField(createPlusField(), "PLUS").appendField("create set with");
    } else {
      this.appendValueInput("ADD" + this.itemCount_);
    }
    this.itemCount_++;
  },
  removePart_: function () {
    this.itemCount_--;
    this.removeInput("ADD" + this.itemCount_);
    if (this.itemCount_ === 0) {
      this.topInput_ = this.appendDummyInput("EMPTY").appendField(createPlusField(), "PLUS").appendField("create empty set");
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
const essentialsSetCreateHelper = function () {
  this.getInput("EMPTY").insertFieldAt(0, createPlusField(), "PLUS");
  this.updateShape_(2);
};
if (Blockly.Extensions.isRegistered("essentials_set_create_mutator")) {
  Blockly.Extensions.unregister("essentials_set_create_mutator");
}
Blockly.Extensions.registerMutator("essentials_set_create_mutator", essentialsSetCreateMutator, essentialsSetCreateHelper);
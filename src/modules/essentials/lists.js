import * as Blockly from "blockly\/core";
import { createPlusField } from "..\/..\/plugins\/block-plus-minus\/field_plus";
import { createMinusField } from "..\/..\/plugins\/block-plus-minus\/field_minus";
const essentialsListCreateMutator = {
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
      this.topInput_ = this.appendValueInput("ITEM0").appendField(createPlusField(), "PLUS").appendField("create list with");
    } else {
      this.appendValueInput("ITEM" + this.itemCount_);
    }
    this.itemCount_++;
  },
  removePart_: function () {
    this.itemCount_--;
    this.removeInput("ITEM" + this.itemCount_);
    if (this.itemCount_ === 0) {
      this.topInput_ = this.appendDummyInput("EMPTY").appendField(createPlusField(), "PLUS").appendField("create empty list");
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
const essentialsListCreateHelper = function () {
  this.getInput("EMPTY").insertFieldAt(0, createPlusField(), "PLUS");
  this.updateShape_(2);
};
if (Blockly.Extensions.isRegistered("essentials_list_create_mutator")) {
  Blockly.Extensions.unregister("essentials_list_create_mutator");
}
Blockly.Extensions.registerMutator("essentials_list_create_mutator", essentialsListCreateMutator, essentialsListCreateHelper);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_list_create",
    "message0": "create list with %1",
    "args0": [{
        "type": "input_dummy",
        "name": "EMPTY"
      }],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Creates a list with any number of items.",
    "helpUrl": "",
    "mutator": "essentials_list_create_mutator"
  },
  {
    "type": "essentials_range",
    "message0": "range %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MODE",
        "options": [
          ["stop", "STOP"],
          ["start, stop", "START_STOP"],
          ["start, stop, step", "START_STOP_STEP"]
        ]
      }
    ],
    "message1": "%1",
    "args1": [{ "type": "input_value", "name": "START", "check": "Number" }],
    "message2": "%1",
    "args2": [{ "type": "input_value", "name": "STOP", "check": "Number" }],
    "message3": "%1",
    "args3": [{ "type": "input_value", "name": "STEP", "check": "Number" }],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Creates a Python range object. Use with loops or convert to list.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#func-range",
    "mutator": "essentials_range_mutator"
  },
  {
    "type": "essentials_list_from_range",
    "message0": "list from range start %1 end %2 step %3",
    "args0": [
      {
        "type": "input_value",
        "name": "START",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "END",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "STEP",
        "check": "Number"
      }
    ],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Creates a list from a range of numbers.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_length",
    "message0": "length of %1",
    "args0": [{
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Returns the number of items in a list.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_get",
    "message0": "get item at index %1 in %2",
    "args0": [
      {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Gets an item from a list.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_set",
    "message0": "in list %1 set item at %2 %3 to %4",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      },
      {
        "type": "field_dropdown",
        "name": "WHERE",
        "options": [
          [ "first", "FIRST" ],
          [ "last", "LAST" ],
          [ "from start", "FROM_START" ],
          [ "from end", "FROM_END" ],
          [ "random", "RANDOM" ]
        ]
      },
      {
        "type": "input_value",
        "name": "AT",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Sets an item in a list.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_index_of",
    "message0": "index of first %1 in %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ITEM"
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Returns the index of the first occurrence of an item in a list.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_slice",
    "message0": "slice of %1 from %2 to %3",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "START",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "END",
        "check": "Number"
      }
    ],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Returns a slice of a list.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_sort",
    "message0": "sort %1 with key %2 reverse %3",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "KEY"
      },
      {
        "type": "field_checkbox",
        "name": "REVERSE",
        "checked": false
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Sorts a list.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_reverse",
    "message0": "reverse %1",
    "args0": [{
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Reverses a list.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_map",
    "message0": "map %1 over %2",
    "args0": [
      {
        "type": "input_value",
        "name": "FUNCTION"
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Applies a function to each item in a list.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_filter",
    "message0": "filter %1 with %2",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "FUNCTION"
      }
    ],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Filters a list using a function.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_reduce",
    "message0": "reduce %1 with %2 initial value %3",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "FUNCTION"
      },
      {
        "type": "input_value",
        "name": "INITIAL"
      }
    ],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Reduces a list to a single value using a function.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_flatten",
    "message0": "flatten %1",
    "args0": [{
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Flattens a list of lists into a single list.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_unique",
    "message0": "unique items in %1",
    "args0": [{
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Returns a list with unique items.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_chunk",
    "message0": "chunk %1 into lists of size %2",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "SIZE",
        "check": "Number"
      }
    ],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Chunks a list into smaller lists of a given size.",
    "helpUrl": ""
  },
  {
    "type": "essentials_list_enumerate",
    "message0": "enumerate %1",
    "args0": [{
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Returns a list of (index, item) tuples.",
    "helpUrl": ""
  },
  {
    "type": "lists_shuffle_in_place",
    "message0": "shuffle list %1 in place",
    "args0": [ { "type": "input_value", "name": "LIST", "check": "Array" } ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Shuffles the list in place using random.shuffle.",
    "helpUrl": "https://docs.python.org/3/library/random.html#random.shuffle"
  },
  {
    "type": "essentials_list_is_empty",
    "message0": "is %1 empty",
    "args0": [{
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }],
    "output": "Boolean",
    "colour": 260,
    "tooltip": "Checks if a list is empty.",
    "helpUrl": ""
  }
]);
// Mutator to show/hide inputs based on dropdown MODE
if (Blockly.Extensions.isRegistered('essentials_range_mutator')) {
  Blockly.Extensions.unregister('essentials_range_mutator');
}
Blockly.Extensions.register('essentials_range_mutator', function() {
  const updateShape = () => {
    const mode = this.getFieldValue('MODE');
    // Ensure inputs exist
    if (!this.getInput('START')) this.appendValueInput('START').setCheck('Number');
    if (!this.getInput('STOP')) this.appendValueInput('STOP').setCheck('Number');
    if (!this.getInput('STEP')) this.appendValueInput('STEP').setCheck('Number');
    // Set visibility
    this.getInput('START').setVisible(mode !== 'STOP');
    this.getInput('STOP').setVisible(true);
    this.getInput('STEP').setVisible(mode === 'START_STOP_STEP');
    this.render && this.render();
  };
  this.getField('MODE').setValidator(function(newVal) {
    updateShape.call(this.getSourceBlock());
    return newVal;
  });
  // Initial shape
  updateShape.call(this);
});
import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_tuple_create",
    "message0": "create tuple with %1",
    "args0": [{
        "type": "input_dummy",
        "name": "EMPTY",
        "colour": "#4D6A94"
      }],
    "output": "Tuple",
    "colour": "#4D6A94",
    "tooltip": "Creates a tuple with any number of items.",
    "helpUrl": "",
    "mutator": "essentials_tuple_create_mutator"
  },
  {
    "type": "essentials_tuple_from_list",
    "message0": "tuple from list %1",
    "args0": [{
        "type": "input_value",
        "name": "LIST",
        "check": "Array",
        "colour": "#4D6A94"
      }],
    "output": "Tuple",
    "colour": "#4D6A94",
    "tooltip": "Creates a tuple from a list.",
    "helpUrl": ""
  },
  {
    "type": "essentials_tuple_to_list",
    "message0": "list from tuple %1",
    "args0": [{
        "type": "input_value",
        "name": "TUPLE",
        "check": "Tuple",
        "colour": "#4D6A94"
      }],
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Creates a list from a tuple.",
    "helpUrl": ""
  },
  {
    "type": "essentials_tuple_unpack",
    "message0": "unpack %1 into variables %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TUPLE",
        "check": "Tuple",
        "colour": "#4D6A94"
      },
      {
        "type": "field_input",
        "name": "VARS",
        "text": "a, b, c"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Unpacks a tuple into variables.",
    "helpUrl": ""
  },
  {
    "type": "essentials_namedtuple_define",
    "message0": "define named tuple %1 with fields %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "MyNamedTuple",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "FIELDS",
        "check": "Array"
      }
    ],
    "output": "Class",
    "colour": "#4D6A94",
    "tooltip": "Defines a named tuple.",
    "helpUrl": ""
  },
  {
    "type": "essentials_dataclass_stub",
    "message0": "define dataclass %1 with fields %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "MyDataClass",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "FIELDS",
        "check": "Array"
      }
    ],
    "output": "Class",
    "colour": "#4D6A94",
    "tooltip": "Defines a dataclass.",
    "helpUrl": ""
  },
  {
    "type": "essentials_tuple_length",
    "message0": "length of %1",
    "args0": [{
        "type": "input_value",
        "name": "TUPLE",
        "check": "Tuple"
      }],
    "output": "Number",
    "colour": 260,
    "tooltip": "Returns the number of items in a tuple.",
    "helpUrl": ""
  },
  {
    "type": "essentials_tuple_get",
    "message0": "get item at index %1 in %2",
    "args0": [
      {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "TUPLE",
        "check": "Tuple"
      }
    ],
    "output": null,
    "colour": 260,
    "tooltip": "Gets an item from a tuple.",
    "helpUrl": ""
  },
  {
    "type": "tuples_count",
    "message0": "count occurrences of %1 in %2",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "input_value",
        "name": "TUPLE",
        "check": "Tuple"
      }
    ],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Counts the number of occurrences of an item in a tuple.",
    "helpUrl": ""
  }
]);
import { createPlusField } from "..\/..\/plugins\/block-plus-minus\/field_plus";
import { createMinusField } from "..\/..\/plugins\/block-plus-minus\/field_minus";
const essentialsTupleCreateMutator = {
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
      this.topInput_ = this.appendValueInput("ADD0").appendField(createPlusField(), "PLUS").appendField("create tuple with");
    } else {
      this.appendValueInput("ADD" + this.itemCount_);
    }
    this.itemCount_++;
  },
  removePart_: function () {
    this.itemCount_--;
    this.removeInput("ADD" + this.itemCount_);
    if (this.itemCount_ === 0) {
      this.topInput_ = this.appendDummyInput("EMPTY").appendField(createPlusField(), "PLUS").appendField("create empty tuple");
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
const essentialsTupleCreateHelper = function () {
  this.getInput("EMPTY").insertFieldAt(0, createPlusField(), "PLUS");
  this.updateShape_(2);
};
if (Blockly.Extensions.isRegistered("essentials_tuple_create_mutator")) {
  Blockly.Extensions.unregister("essentials_tuple_create_mutator");
}
Blockly.Extensions.registerMutator("essentials_tuple_create_mutator", essentialsTupleCreateMutator, essentialsTupleCreateHelper);
import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "tuples_create_with",
    "message0": "create tuple",
    "output": "Tuple",
    "mutator": "tuples_create_with_mutator",
    "colour": "#4A90E2",
    "tooltip": "Creates a tuple with any number of items.",
    "helpUrl": ""
  },
  {
    "type": "tuples_unpack",
    "message0": "unpack %1 into variables %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TUPLE"
      },
      {
        "type": "field_input",
        "name": "VARS",
        "text": "a, b, c"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4A90E2",
    "tooltip": "Unpacks a tuple into a comma-separated list of variables.",
    "helpUrl": ""
  },
  {
    "type": "tuples_create_simplenamespace",
    "message0": "create namespace from dictionary %1",
    "args0": [{
        "type": "input_value",
        "name": "DICT",
        "check": "Object"
      }],
    "output": null,
    "colour": "#4A90E2",
    "tooltip": "Creates a SimpleNamespace object from a dictionary.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/types.html#types.SimpleNamespace"
  },

  {
    "type": "tuples_index",
    "message0": "in tuple %1 find first occurrence of item %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TUPLE",
        "check": "Tuple",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "ITEM"
      }
    ],
    "output": "Number",
    "colour": "#4D6A94",
    "inputsInline": true,
    "tooltip": "Returns the index of the first occurrence of an item in a tuple.",
    "helpUrl": "https:\/\/docs.python.org\/3\/tutorial\/datastructures.html#tuples-and-sequences"
  }
]);
Blockly.defineBlocksWithJsonArray([
  {
    "type": "tuples_create_with_container",
    "message0": "items %1 %2",
    "args0": [
      { "type": "input_dummy" },
      {
        "type": "input_statement",
        "name": "STACK"
      }
    ],
    "colour": "#4A90E2",
    "tooltip": "Add, remove, or reorder items to reconfigure this tuple block.",
    "enableContextMenu": false
  },
  {
    "type": "tuples_create_with_item",
    "message0": "item",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4A90E2",
    "tooltip": "Add an item to the tuple.",
    "enableContextMenu": false
  }
]);
const TUPLE_CREATE_WITH_MUTATOR = {
  itemCount_: 0,
  mutationToDom: function () {
    const container = document.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },
  decompose: function (workspace) {
    const containerBlock = workspace.newBlock("tuples_create_with_container");
    containerBlock.initSvg();
    let connection = containerBlock.getInput("STACK").connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock("tuples_create_with_item");
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock("STACK");
    const connections = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    for (let i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        connections[i].reconnect(this, "ADD" + i);
      }
    }
  },
  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock("STACK");
    let i = 0;
    while (itemBlock) {
      const input = this.getInput("ADD" + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function () {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField("create empty tuple");
    }
    for (let i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        const input = this.appendValueInput("ADD" + i);
        if (i === 0) {
          input.appendField("create tuple with");
        }
      }
    }
    let i = this.itemCount_;
    while (this.getInput("ADD" + i)) {
      this.removeInput("ADD" + i);
      i++;
    }
  }
};
Blockly.Extensions.registerMutator("tuples_create_with_mutator", TUPLE_CREATE_WITH_MUTATOR, null, ["tuples_create_with_item"]);
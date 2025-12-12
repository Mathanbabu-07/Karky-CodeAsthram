import * as Blockly from 'blockly';


const FUNCTION_DEF_MUTATOR = {
  params_: [],

  saveExtraState: function() {
    return {
      params: this.params_,
    };
  },

  loadExtraState: function(state) {
    this.params_ = state.params;
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('essentials_function_def_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.params_.length; i++) {
      const paramBlock = workspace.newBlock('essentials_function_def_param');
      paramBlock.initSvg();
      paramBlock.setFieldValue(this.params_[i], 'NAME');
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function(containerBlock) {
    this.params_ = [];
    let paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      this.params_.push(paramBlock.getFieldValue('NAME'));
      paramBlock = paramBlock.nextConnection && paramBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
  },

  updateShape_: function() {
    const params = this.params_.join(', ');
    this.setFieldValue(params, 'PARAMS');
  }
};

Blockly.Extensions.registerMutator('essentials_function_def_mutator', FUNCTION_DEF_MUTATOR, null, ['essentials_function_def_param']);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_function_def_container",
    "message0": "parameters %1 %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "STACK" }
    ],
    "colour": "#9A5BA5",
    "tooltip": "A container for function parameters.",
    "enableContextMenu": false
  },
  {
    "type": "essentials_function_def_param",
    "message0": "parameter %1",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "x" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9A5BA5",
    "tooltip": "A function parameter.",
    "enableContextMenu": false
  }
]);

// src/modules/math_numeric/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  // Block for creating a Decimal object
  {
    "type": "math_decimal",
    "message0": "high-precision number %1",
    "args0": [
      {
        "type": "field_input",
        "name": "VALUE",
        "text": "0.0"
      }
    ],
    "output": "Number", // It's a Decimal object, but can be used as a number
    "colour": "#5B80A5",
    "tooltip": "Creates a high-precision Decimal number from a string.",
    "helpUrl": "https://docs.python.org/3/library/decimal.html"
  },
  // Block for getting a random item from a list
  {
    "type": "math_random_item",
    "message0": "random item from list %1",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": null,
    "colour": "#5B80A5",
    "tooltip": "Picks a random item from a list.",
    "helpUrl": "https://docs.python.org/3/library/random.html#random.choice"
  }
  ,
  {
    "type": "math_ops_multi",
    "message0": "%1 of %2",
    "args0": [
      { "type": "field_dropdown", "name": "OP", "options": [["sin", "sin"],["cos", "cos"],["sqrt", "sqrt"],["pow", "pow"]] },
      { "type": "input_value", "name": "A", "check": "Number" }
    ],
    "message1": "and %1",
    "args1": [ { "type": "input_value", "name": "B", "check": "Number" } ],
    "inputsInline": false,
    "output": "Number",
    "colour": "#5B80A5",
    "tooltip": "Common math functions: sin, cos, sqrt (ignores second), pow (uses both).",
    "helpUrl": "https://docs.python.org/3/library/math.html",
    "mutator": "math_ops_multi_mutator"
  }
]);

// Mutator: hide second operand unless pow selected (proper mutator with hooks)
if (Blockly.Extensions.isRegistered('math_ops_multi_mutator')) {
  // Avoid duplicate registration in HMR
  // Some Blockly builds store mutators in Extensions registry
}
if (!Blockly.Extensions.isRegistered('math_ops_multi_mutator')) {
  const mixin = {
    saveExtraState: function() { return { op: this.getFieldValue('OP') }; },
    loadExtraState: function(state) {
      if (state && state.op && this.getField('OP')) this.setFieldValue(state.op, 'OP');
      this.updateShape_ && this.updateShape_();
    },
    mutationToDom: function() {
      const container = Blockly.utils.xml.createElement('mutation');
      container.setAttribute('op', this.getFieldValue('OP'));
      return container;
    },
    domToMutation: function(xml) {
      const op = xml.getAttribute('op');
      if (op && this.getField('OP')) this.setFieldValue(op, 'OP');
      this.updateShape_ && this.updateShape_();
    },
    updateShape_: function() {
      // Ensure B input exists so we can toggle visibility
      if (!this.getInput('B')) {
        this.appendValueInput('B').setCheck('Number');
      }
      const op = this.getFieldValue('OP');
      this.getInput('B').setVisible(op === 'pow');
      if (this.render) this.render();
    }
  };
  const helper = function() {
    // Attach validator to update visibility when OP changes
    const fld = this.getField('OP');
    if (fld && !fld._mathOpsMultiValidatorAttached) {
      fld.setValidator((val) => {
        this.updateShape_ && this.updateShape_();
        return val;
      });
      fld._mathOpsMultiValidatorAttached = true;
    }
    this.updateShape_ && this.updateShape_();
  };
  Blockly.Extensions.registerMutator('math_ops_multi_mutator', mixin, helper);
}

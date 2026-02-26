import * as Blockly from "blockly/core";
import { createPlusField } from "../../plugins/block-plus-minus/field_plus";
import { createMinusField } from "../../plugins/block-plus-minus/field_minus";

// Utility to safely defer mutations to next animation frame to avoid gesture conflicts.
function defer(fn) {
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    window.requestAnimationFrame(fn);
  } else {
    setTimeout(fn, 0);
  }
}

Blockly.defineBlocksWithJsonArray([
  {
    "type": "oop_class",
    "message0": "class %1",
    "args0": [ { "type": "field_input", "name": "NAME", "text": "MyClass" } ],
    "message1": "base (optional) %1",
    "args1": [ { "type": "input_value", "name": "BASE", "check": "String" } ],
    "message2": "body %1",
    "args2": [ { "type": "input_statement", "name": "BODY" } ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Define a Python class with an optional single base class.",
    "helpUrl": "https://docs.python.org/3/tutorial/classes.html"
  },
  {
    "type": "oop_method",
    "message0": "method %1",
    "args0": [ { "type": "field_input", "name": "NAME", "text": "method" } ],
    "message1": "parameters %1",
    "args1": [ { "type": "input_dummy", "name": "PARAMS" } ],
    "message2": "do %1",
    "args2": [ { "type": "input_statement", "name": "DO" } ],
    "colour": 290,
    "tooltip": "Define an instance method. 'self' is added automatically.",
    "mutator": "oop_params_mutator",
    "previousStatement": null,
    "nextStatement": null
  },
  {
    "type": "oop_constructor",
    "message0": "constructor (__init__)",
    "message1": "parameters %1",
    "args1": [ { "type": "input_dummy", "name": "PARAMS" } ],
    "message2": "do %1",
    "args2": [ { "type": "input_statement", "name": "DO" } ],
    "colour": 290,
    "tooltip": "Define the __init__ constructor with parameters (self is added automatically).",
    "mutator": "oop_params_mutator",
    "previousStatement": null,
    "nextStatement": null
  },
  {
    "type": "oop_super_init",
    "message0": "super().__init__ with args %1",
    "args0": [ { "type": "input_value", "name": "ARGS", "check": "Array" } ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Call base class constructor.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#super"
  },
  {
    "type": "oop_super_call",
    "message0": "super().%1 with args %2",
    "args0": [
      { "type": "field_input", "name": "METHOD", "text": "method" },
      { "type": "input_value", "name": "ARGS", "check": "Array" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Call a method on the base class.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#super"
  }
]);

// Simple mutator for parameter name fields (ARG0, ARG1, ...)
const oopParamsMutator = {
  paramCount_: 0,
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('params', this.paramCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    const count = parseInt(xmlElement.getAttribute('params'), 10) || 0;
    this.updateShape_(count);
  },
  saveExtraState: function() { return { params: this.paramCount_ }; },
  loadExtraState: function(state) { this.updateShape_(state.params || 0); },
  plus: function() { defer(() => this.updateShape_(this.paramCount_ + 1)); },
  minus: function(index) { if (this.paramCount_ > 0) defer(() => this.updateShape_(this.paramCount_ - 1)); },
  updateShape_: function(target) {
    while (this.paramCount_ < target) {
      const i = this.paramCount_;
      const input = this.appendDummyInput('PARAM' + i)
        .appendField('param')
        .appendField(new Blockly.FieldTextInput('p' + i), 'P' + i)
        .appendField(createMinusField(i), 'MINUS' + i);
      this.moveInputBefore('PARAM' + i, 'DO');
      this.paramCount_++;
    }
    while (this.paramCount_ > target) {
      this.paramCount_--;
      this.removeInput('PARAM' + this.paramCount_);
    }
    if (this.getInput('PARAMS') && !this.getField('PLUS')) {
      this.getInput('PARAMS').appendField(createPlusField(), 'PLUS');
    }
  }
};

const oopParamsHelper = function() {
  if (this.getInput('PARAMS')) {
    this.getInput('PARAMS').appendField(createPlusField(), 'PLUS');
  }
  this.updateShape_(0);
};

if (!Blockly.Extensions.isRegistered('oop_params_mutator')) {
  Blockly.Extensions.registerMutator('oop_params_mutator', oopParamsMutator, oopParamsHelper);
} else {
  // Hot-reload scenario: ensure helper runs so PLUS button appears even after redefinition.
  const orig = Blockly.Extensions.getExtension('oop_params_mutator');
  if (orig && typeof orig === 'function') {
    // Re-run helper when blocks are reconstructed.
  }
}

Blockly.defineBlocksWithJsonArray([
  {
    "type": "oop_magic_method",
    "message0": "define %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MAGIC_METHOD",
        "options": [
          ["__str__(self)", "STR"],
          ["__repr__(self)", "REPR"],
          ["__eq__(self, other)", "EQ"],
          ["__lt__(self, other)", "LT"],
          ["__le__(self, other)", "LE"],
          ["__gt__(self, other)", "GT"],
          ["__ge__(self, other)", "GE"],
          ["__ne__(self, other)", "NE"],
          ["__add__(self, other)", "ADD"],
          ["__sub__(self, other)", "SUB"],
          ["__mul__(self, other)", "MUL"],
          ["__truediv__(self, other)", "TRUEDIV"],
          ["__len__(self)", "LEN"],
          ["__getitem__(self, key)", "GETITEM"],
          ["__setitem__(self, key, value)", "SETITEM"],
          ["__delitem__(self, key)", "DELITEM"],
          ["__contains__(self, item)", "CONTAINS"],
          ["__iter__(self)", "ITER"],
          ["__next__(self)", "NEXT"],
          ["__call__(self, *args)", "CALL"],
          ["__enter__(self)", "ENTER"],
          ["__exit__(self, exc_type, exc_val, exc_tb)", "EXIT"]
        ]
      }
    ],
    "message1": "body %1",
    "args1": [
      { "type": "input_statement", "name": "BODY" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Define a magic (dunder) method for a class. These enable operator overloading, iteration, context managers, and more.",
    "helpUrl": "https://docs.python.org/3/reference/datamodel.html#special-method-names"
  },
  {
    "type": "oop_property_decorator",
    "message0": "@property.%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DECORATOR_TYPE",
        "options": [
          ["getter", "GETTER"],
          ["setter", "SETTER"],
          ["deleter", "DELETER"]
        ]
      }
    ],
    "message1": "property name %1",
    "args1": [
      { "type": "field_input", "name": "PROP_NAME", "text": "property_name" }
    ],
    "message2": "body %1",
    "args2": [
      { "type": "input_statement", "name": "BODY" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Define a property with getter, setter, or deleter decorator.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#property"
  },
  {
    "type": "oop_class_decorator",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DECORATOR",
        "options": [
          ["@classmethod", "CLASSMETHOD"],
          ["@staticmethod", "STATICMETHOD"]
        ]
      }
    ],
    "message1": "def %1",
    "args1": [{ "type": "field_input", "name": "METHOD_NAME", "text": "method_name" }],
    "message2": "parameters %1",
    "args2": [{ "type": "input_dummy", "name": "PARAMS" }],
    "message3": "body %1",
    "args3": [{ "type": "input_statement", "name": "BODY" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Define a class method or static method.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#classmethod",
    "mutator": "oop_params_mutator"
  }
]);

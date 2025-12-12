import * as Blockly from "blockly\/core";

Blockly.defineBlocksWithJsonArray([
  {
    "type": "control_try_except_finally",
    "message0": "try %1",
    "args0": [{
        "type": "input_statement",
        "name": "TRY",
        "colour": "#7E57C2"
      }],
    "message1": "except %1 as %2 %3",
    "args1": [
      {
        "type": "input_value",
        "name": "EXCEPTION"
      },
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "e"
      },
      {
        "type": "input_statement",
        "name": "CATCH"
      }
    ],
    "message2": "finally %1",
    "args2": [{
        "type": "input_statement",
        "name": "FINALLY"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Tries to execute code, catches an exception, and runs a final block of code."
  },
  {
    "type": "control_try_except_else_finally",
    "message0": "try %1",
    "args0": [{ "type": "input_statement", "name": "TRY" }],
    "message1": "except %1 as %2 %3",
    "args1": [
      { "type": "input_value", "name": "EXCEPTION" },
      { "type": "field_variable", "name": "VAR", "variable": "e" },
      { "type": "input_statement", "name": "CATCH" }
    ],
    "message2": "else %1",
    "args2": [{ "type": "input_statement", "name": "ELSE" }],
    "message3": "finally %1",
    "args3": [{ "type": "input_statement", "name": "FINALLY" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Try/except with optional else and finally clauses.",
    "helpUrl": "https://docs.python.org/3/tutorial/errors.html#handling-exceptions"
  },
  {
    "type": "control_raise_exception",
    "message0": "raise exception %1 with message %2",
    "args0": [
      {
        "type": "input_value",
        "name": "EXCEPTION",
        "colour": "#7E57C2"
      },
      {
        "type": "input_value",
        "name": "MESSAGE"
      }
    ],
    "previousStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Raises an exception."
  },
  {
    "type": "control_assert_block",
    "message0": "assert %1 with message %2",
    "args0": [
      {
        "type": "input_value",
        "name": "CONDITION",
        "check": "Boolean",
        "colour": "#7E57C2"
      },
      {
        "type": "input_value",
        "name": "MESSAGE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Asserts that a condition is true."
  }
]);

// Define control_try_except with mutation for multiple except clauses
Blockly.Blocks['control_try_except'] = {
  init: function() {
    this.appendStatementInput("TRY")
        .appendField("try");
    this.appendStatementInput("EXCEPT")
        .appendField("except");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#7E57C2");
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('except_count', this.exceptCount_);
    for (var i = 0; i < this.exceptCount_; i++) {
      var exceptElement = document.createElement('except');
      exceptElement.setAttribute('name', this.getFieldValue('EXCEPTION' + i) || 'Exception');
      container.appendChild(exceptElement);
    }
    return container;
  },

  domToMutation: function(xmlElement) {
    var exceptElements = xmlElement.getElementsByTagName('except');
    this.exceptCount_ = exceptElements.length;
    this.updateShape_();
    for (var i = 0; i < this.exceptCount_; i++) {
      this.setFieldValue(exceptElements[i].getAttribute('name') || 'Exception', 'EXCEPTION' + i);
    }
  },

  updateShape_: function() {
    // Remove existing except inputs
    var i = 0;
    while (this.getInput('EXCEPT' + i)) {
      this.removeInput('EXCEPT' + i);
      i++;
    }
    // Add new ones
    for (var i = 0; i < this.exceptCount_; i++) {
      this.appendStatementInput('EXCEPT' + i)
          .appendField('except')
          .appendField(new Blockly.FieldTextInput('Exception'), 'EXCEPTION' + i)
          .appendField('as')
          .appendField(new Blockly.FieldVariable('e'), 'VAR' + i);
    }
  }
};
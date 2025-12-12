import * as Blockly from 'blockly/core';

// Simplified module import block (json, csv, os, sys, math, random)
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_import_simple",
    "message0": "import %1",
    "args0": [
      { "type": "field_dropdown", "name": "MODULE", "options": [["json","json"],["csv","csv"],["os","os"],["sys","sys"],["math","math"],["random","random"]] }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Import a common Python standard module.",
    "helpUrl": "https://docs.python.org/3/library/index.html"
  },
  {
    "type": "essentials_scope_keyword",
    "message0": "%1 variable %2",
    "args0": [
      { "type": "field_dropdown", "name": "KIND", "options": [["global","global"],["nonlocal","nonlocal"]] },
      { "type": "field_input", "name": "NAME", "text": "varname" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Declare a variable as global or nonlocal within a function scope.",
    "helpUrl": "https://docs.python.org/3/reference/simple_stmts.html#the-global-statement"
  },
  {
    "type": "control_pass",
    "message0": "pass",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Do nothing (placeholder).",
    "helpUrl": "https://docs.python.org/3/reference/simple_stmts.html#the-pass-statement"
  },
  {
    "type": "control_while_true",
    "message0": "while %1",
    "args0": [ { "type": "field_dropdown", "name": "COND_MODE", "options": [["True","TRUE"],["expression","EXPR"]] } ],
    "message1": "condition %1",
    "args1": [ { "type": "input_value", "name": "COND", "check": "Boolean" } ],
    "message2": "do %1",
    "args2": [ { "type": "input_statement", "name": "DO" } ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5C6BC0",
    "tooltip": "While loop. Defaults to an infinite loop while True unless 'expression' is selected.",
    "helpUrl": "https://docs.python.org/3/reference/compound_stmts.html#the-while-statement",
    "extensions": ["control_while_true_extension"]
  }
]);

// Dynamic visibility for condition input in while loop
Blockly.Extensions.register('control_while_true_extension', function() {
  this.setOnChange(function() {
    const mode = this.getFieldValue('COND_MODE');
    const condInput = this.getInput('COND');
    if (mode === 'EXPR') {
      if (condInput) condInput.setVisible(true);
    } else {
      if (condInput) condInput.setVisible(false);
    }
    if (this.rendered) this.render();
  });
});

// No manual apply: extension is attached via the block JSON "extensions" field above to ensure proper block instance context.

import * as Blockly from "blockly/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "control_pass_simple",
    "message0": "pass",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6",
    "tooltip": "No operation placeholder.",
    "helpUrl": "https://docs.python.org/3/reference/simple_stmts.html#the-pass-statement"
  },
  {
    "type": "control_if_main",
    "message0": "if __name__ == '__main__' do %1",
    "args0": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6",
    "tooltip": "Guard to run code only when executed as a script.",
    "helpUrl": "https://docs.python.org/3/library/__main__.html"
  },
  {
    "type": "control_match",
    "message0": "match %1",
    "args0": [{
      "type": "input_value",
      "name": "SUBJECT",
      "colour": "#9B59B6"
    }],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "CASES",
      "check": "control_case"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6",
    "tooltip": "A match-case block (requires Python 3.10+)."
  },
  {
    "type": "control_case",
    "message0": "case %1",
    "args0": [{
      "type": "input_value",
      "name": "PATTERN"
    }],
    "message1": "do %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": "control_case",
    "nextStatement": "control_case",
    "colour": "#9B59B6",
    "tooltip": "A case for a match-case block."
  }
]);

// --- Additional standardized conditional blocks ---

// 1) Condition Expression Block: comparisons, membership, identity
Blockly.defineBlocksWithJsonArray([
  {
    "type": "control_condition_expr",
    "message0": "%1 %2 %3",
    "args0": [
      { "type": "input_value", "name": "A" },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["==", "EQ"], ["!=", "NEQ"], ["<", "LT"], ["<=", "LTE"], [">", "GT"], [">=", "GTE"],
          ["in", "IN"], ["not in", "NOT_IN"], ["is", "IS"], ["is not", "IS_NOT"]
        ]
      },
      { "type": "input_value", "name": "B" }
    ],
    "output": "Boolean",
    "colour": "#9B59B6",
    "tooltip": "Build a conditional expression: comparisons, membership, identity."
  }
]);

// 2) Logical Combination Block: and/or/not with dynamic right input visibility
Blockly.defineBlocksWithJsonArray([
  {
    "type": "control_logical_combine",
    "message0": "%1 %2 %3",
    "args0": [
      { "type": "input_value", "name": "LEFT", "check": "Boolean" },
      {
        "type": "field_dropdown",
        "name": "LOGICAL_OP",
        "options": [["and", "AND"], ["or", "OR"], ["not", "NOT"]]
      },
      { "type": "input_value", "name": "RIGHT", "check": "Boolean" }
    ],
    "output": "Boolean",
    "colour": "#9B59B6",
    "extensions": ["logic_combine_update_shape"],
    "tooltip": "Combine boolean expressions using and/or/not. Hides RIGHT when using 'not'."
  }
]);

// 4) Universal Conditional Block (alias with mutator): if_block
// Shape mirrors Blockly's built-in controls_if (IF0/DO0) so we can apply
// the same +/- mutator extension already provided by our plugin.
Blockly.defineBlocksWithJsonArray([
  {
    "type": "if_block",
    "message0": "if %1 then %2",
    "args0": [
      { "type": "input_value", "name": "IF0", "check": "Boolean" },
      { "type": "input_statement", "name": "DO0" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6",
    "mutator": "controls_if_mutator",
    "tooltip": "Flexible if / elif / else block with +/− mutator."
  }
]);

// Extension to hide/show RIGHT input when operator changes
Blockly.Extensions.register('logic_combine_update_shape', function () {
  const update = () => {
    const op = this.getFieldValue('LOGICAL_OP');
    const right = this.getInput('RIGHT');
    if (right) right.setVisible(op !== 'NOT');
    // Force re-render
    this.render && this.render();
  };
  this.setOnChange(function (e) {
    if (!e || e.type !== Blockly.Events.BLOCK_CHANGE) return;
    if (e.name === 'LOGICAL_OP' && e.blockId === this.id) update();
  });
  // Initialize visibility once
  update();
});

// 3) Truthy/Falsy simplified IF block
Blockly.defineBlocksWithJsonArray([
  {
    "type": "control_if_truthy",
    "message0": "if %1 then %2",
    "args0": [
      { "type": "input_value", "name": "EXPR" },
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6",
    "tooltip": "If the expression is truthy, run the body."
  }
]);
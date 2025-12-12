import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "tools_test_define_case",
    "message0": "define test case %1 %2",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "my_test" },
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Defines a test case."
  },
  {
    "type": "tools_assert_equal",
    "message0": "assert equal a %1 b %2",
    "args0": [
      { "type": "input_value", "name": "A" },
      { "type": "input_value", "name": "B" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Asserts that two values are equal."
  },
  {
    "type": "tools_assert_true",
    "message0": "assert true %1",
    "args0": [
      { "type": "input_value", "name": "COND", "check": "Boolean" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Asserts that a condition is true."
  },
  {
    "type": "tools_run_tests",
    "message0": "run all tests",
    "output": "Object",
    "colour": 260,
    "tooltip": "Runs all defined test cases."
  },
  {
    "type": "tools_test_fixture",
    "message0": "test fixture setup %1 teardown %2",
    "args0": [
      { "type": "input_statement", "name": "SETUP" },
      { "type": "input_statement", "name": "TEARDOWN" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Defines a test fixture with setup and teardown."
  }
]);

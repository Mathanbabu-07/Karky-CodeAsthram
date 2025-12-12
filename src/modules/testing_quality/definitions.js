// src/modules/testing_quality/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "testing_test_case",
    "message0": "define test case %1",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "test_my_feature" }
    ],
    "message1": "do %1",
    "args1": [
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#428042",
    "tooltip": "Defines a test case. Use assert blocks inside. Name must start with 'test_'.",
    "helpUrl": ""
  },
  {
    "type": "testing_run_tests",
    "message0": "run all tests",
    "output": "Object",
    "colour": "#428042",
    "tooltip": "Runs all defined test cases and returns a summary report.",
    "helpUrl": ""
  }
]);

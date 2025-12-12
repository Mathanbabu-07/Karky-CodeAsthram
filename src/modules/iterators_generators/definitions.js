import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "iterators_yield",
    "message0": "yield %1",
    "args0": [{
        "type": "input_value",
        "name": "VALUE",
        "colour": "#7E57C2"
      }],
    "previousStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Yields a value from a generator function.",
    "helpUrl": "https:\/\/docs.python.org\/3\/reference\/expressions.html#yield-expressions"
  },
  {
    "type": "iterators_yield_from",
    "message0": "yield from %1",
    "args0": [{
        "type": "input_value",
        "name": "ITERABLE",
        "colour": "#7E57C2"
      }],
    "previousStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Delegates to a sub-generator, yielding all of its values.",
    "helpUrl": "https:\/\/docs.python.org\/3\/reference\/expressions.html#yield-expressions"
  },
  {
    "type": "iterators_generator_function",
    "message0": "define generator function %1 ( %2 )",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "my_generator",
        "colour": "#7E57C2"
      },
      {
        "type": "field_input",
        "name": "PARAMS",
        "text": "n"
      }
    ],
    "message1": "do %1",
    "args1": [{
        "type": "input_statement",
        "name": "DO"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Defines a generator function. Use the 'yield' block inside."
  },
  {
    "type": "iterators_safe_next",
    "message0": "next item from iterator %1 or default %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ITERATOR",
        "colour": "#7E57C2"
      },
      {
        "type": "input_value",
        "name": "DEFAULT"
      }
    ],
    "output": null,
    "colour": "#7E57C2",
    "inputsInline": true,
    "tooltip": "Gets the next item from an iterator, returning a default value if it is exhausted.",
    "helpUrl": ""
  },
  {
    "type": "iterators_generator_expression",
    "message0": "generator expression: %1 for %2 in %3 if %4",
    "args0": [
      {
        "type": "input_value",
        "name": "OUTPUT",
        "colour": "#7E57C2"
      },
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "item"
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "IF",
        "check": "Boolean"
      }
    ],
    "output": "Iterator",
    "colour": "#7E57C2",
    "tooltip": "Creates a generator expression, which can be iterated over.",
    "helpUrl": "https:\/\/docs.python.org\/3\/reference\/expressions.html#generator-expressions"
  }
]);
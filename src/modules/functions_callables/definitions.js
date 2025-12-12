import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "functions_lambda",
    "message0": "lambda %1 : %2",
    "args0": [
      {
        "type": "field_input",
        "name": "ARGS",
        "text": "x, y"
      },
      {
        "type": "input_value",
        "name": "EXPRESSION"
      }
    ],
    "output": null,
    "colour": "#9A5BA5",
    "tooltip": "Creates an anonymous lambda function.",
    "helpUrl": "https:\/\/docs.python.org\/3\/reference\/expressions.html#lambda"
  },
  {
    "type": "functions_decorator",
    "message0": "@ %1",
    "args0": [{
        "type": "input_value",
        "name": "DECORATOR"
      }],
    "message1": "%1",
    "args1": [{
        "type": "input_statement",
        "name": "FUNCTION",
        "check": "functions_define"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9A5BA5",
    "tooltip": "Applies a decorator to a function definition.",
    "helpUrl": "https:\/\/www.python.org\/dev\/peps\/pep-0318\/"
  },
  {
    "type": "functions_call_with_kwargs",
    "message0": "call function %1 with args %2 and kwargs %3",
    "args0": [
      {
        "type": "input_value",
        "name": "FUNC"
      },
      {
        "type": "input_value",
        "name": "ARGS",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "KWARGS",
        "check": "Object"
      }
    ],
    "output": null,
    "colour": "#9A5BA5",
    "inputsInline": true,
    "tooltip": "Calls a function with positional and keyword arguments.",
    "helpUrl": ""
  },
  {
    "type": "functions_callable",
    "message0": "is %1 callable?",
    "args0": [{
        "type": "input_value",
        "name": "ITEM",
        "colour": "#7E57C2"
      }],
    "output": "Boolean",
    "colour": "#7E57C2",
    "tooltip": "Checks if an object is callable (e.g., a function).",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/functions.html#callable"
  }
]);
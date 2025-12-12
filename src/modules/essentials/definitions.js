import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_num_arithmetic",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number",
        "colour": "#4D6A94"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          [
            "+",
            "ADD"
          ],
          [
            "-",
            "MINUS"
          ],
          [
            "*",
            "MULTIPLY"
          ],
          [
            "\/",
            "DIVIDE"
          ],
          [
            "\/\/",
            "FLOOR_DIVIDE"
          ],
          [
            "%",
            "MODULO"
          ],
          [
            "**",
            "POWER"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": "#4D6A94",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    "extensions": ["essentials_num_arithmetic_tooltips"]
  },
  {
    "type": "essentials_function_def",
    "message0": "define function %1 ( %2 )",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "my_function",
        "colour": "#7E57C2"
      },
      {
        "type": "field_label_serializable",
        "name": "PARAMS",
        "text": ""
      }
    ],
    "message1": "do %1",
    "args1": [{
        "type": "input_statement",
        "name": "DO"
      }],
    "message2": "return %1",
    "args2": [{
        "type": "input_value",
        "name": "RETURN"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Defines a function with parameters.",
    "mutator": "essentials_function_def_mutator"
  }
]);
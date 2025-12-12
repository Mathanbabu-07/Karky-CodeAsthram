import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_bool_true",
    "message0": "True",
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "The boolean value True.",
    "helpUrl": ""
  },
  {
    "type": "essentials_bool_false",
    "message0": "False",
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "The boolean value False.",
    "helpUrl": ""
  },
  {
    "type": "essentials_logic_and",
    "message0": "%1 and %2",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Boolean",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Boolean"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Returns true if both inputs are true.",
    "helpUrl": ""
  },
  {
    "type": "essentials_logic_or",
    "message0": "%1 or %2",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Boolean",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Boolean"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Returns true if either input is true.",
    "helpUrl": ""
  },
  {
    "type": "essentials_logic_not",
    "message0": "not %1",
    "args0": [{
        "type": "input_value",
        "name": "A",
        "check": "Boolean",
        "colour": "#4D6A94"
      }],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Returns true if the input is false.",
    "helpUrl": ""
  },
  {
    "type": "essentials_compare",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "colour": "#4D6A94"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          [
            "=",
            "EQ"
          ],
          [
            "≠",
            "NEQ"
          ],
          [
            "<",
            "LT"
          ],
          [
            "≤",
            "LTE"
          ],
          [
            ">",
            "GT"
          ],
          [
            "≥",
            "GTE"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Compares two values.",
    "helpUrl": ""
  },
  {
    "type": "essentials_in_operator",
    "message0": "%1 in %2",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Returns true if the first value is in the second.",
    "helpUrl": ""
  },
  {
    "type": "essentials_not_in_operator",
    "message0": "%1 not in %2",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Returns true if the first value is not in the second.",
    "helpUrl": ""
  },
  {
    "type": "essentials_ternary",
    "message0": "%1 if %2 else %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "CONDITION",
        "check": "Boolean"
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "A ternary operator.",
    "helpUrl": ""
  },
  {
    "type": "essentials_assert",
    "message0": "assert %1 message %2",
    "args0": [
      {
        "type": "input_value",
        "name": "CONDITION",
        "check": "Boolean",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "MESSAGE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Asserts that a condition is true.",
    "helpUrl": ""
  },
  {
    "type": "essentials_logic_is_truthy",
    "message0": "%1 is truthy",
    "args0": [{
        "type": "input_value",
        "name": "VALUE"
      }],
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Checks if a value is truthy (evaluates to True in a boolean context).",
    "helpUrl": ""
  }
]);
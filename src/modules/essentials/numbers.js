import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_num_literal",
    "message0": "%1",
    "args0": [{
        "type": "field_number",
        "name": "NUM",
        "value": 0
      }],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "A number.",
    "helpUrl": ""
  },
  {
    "type": "essentials_num_neg",
    "message0": "- %1",
    "args0": [{
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Negates a number.",
    "helpUrl": ""
  },
  {
    "type": "essentials_num_abs",
    "message0": "absolute of %1",
    "args0": [{
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Returns the absolute value of a number.",
    "helpUrl": ""
  },
  {
    "type": "essentials_num_round",
    "message0": "round %1",
    "args0": [{
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Rounds a number to the nearest integer.",
    "helpUrl": ""
  },
  {
    "type": "essentials_num_clamp",
    "message0": "clamp %1 between %2 and %3",
    "args0": [
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "MIN",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "MAX",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Clamps a number between a minimum and maximum value.",
    "helpUrl": ""
  },
  {
    "type": "essentials_num_compare",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
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
        "name": "B",
        "check": "Number"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Compares two numbers.",
    "helpUrl": ""
  },
  {
    "type": "essentials_num_min",
    "message0": "minimum of %1 and %2",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Returns the smaller of two numbers.",
    "helpUrl": ""
  },
  {
    "type": "essentials_num_max",
    "message0": "maximum of %1 and %2",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Returns the larger of two numbers.",
    "helpUrl": ""
  },
  {
    "type": "essentials_expr_group",
    "message0": "group ( %1 )",
    "args0": [
      { "type": "input_value", "name": "EXPR" }
    ],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Wrap an expression in parentheses to clarify precedence.",
    "helpUrl": "https://docs.python.org/3/reference/expressions.html"
  },
  {
    "type": "essentials_num_rand_int",
    "message0": "random integer from %1 to %2",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Returns a random integer between two numbers.",
    "helpUrl": ""
  },
  {
    "type": "essentials_num_rand_float",
    "message0": "random float",
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Returns a random float between 0 and 1.",
    "helpUrl": ""
  },
  {
    "type": "essentials_num_property",
    "message0": "%1 is %2",
    "args0": [
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "PROPERTY",
        "options": [
          [
            "even",
            "EVEN"
          ],
          [
            "odd",
            "ODD"
          ],
          [
            "positive",
            "POSITIVE"
          ],
          [
            "negative",
            "NEGATIVE"
          ],
          [
            "prime",
            "PRIME"
          ]
        ]
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Checks if a number has a certain property.",
    "helpUrl": ""
  },
  {
    "type": "essentials_num_is_divisible_by",
    "message0": "%1 is divisible by %2",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Checks if a number is divisible by another.",
    "helpUrl": ""
  }
]);
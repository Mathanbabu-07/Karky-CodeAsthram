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
  ,
  {
    "type": "num_base_conversion",
    "message0": "convert %1 to %2",
    "args0": [
      { "type": "input_value", "name": "NUMBER", "check": "Number" },
      {
        "type": "field_dropdown",
        "name": "BASE",
        "options": [
          ["binary (0b...)", "BIN"],
          ["octal (0o...)", "OCT"],
          ["hexadecimal (0x...)", "HEX"]
        ]
      }
    ],
    "inputsInline": true,
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "Convert a number to binary, octal, or hexadecimal string representation.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#bin"
  },
  {
    "type": "essentials_num_format_decimal",
    "message0": "format %1 with %2 decimal places",
    "args0": [
      {
        "type": "input_value",
        "name": "NUMBER",
        "check": "Number"
      },
      {
        "type": "field_number",
        "name": "DECIMALS",
        "value": 2,
        "min": 0,
        "max": 10
      }
    ],
    "inputsInline": true,
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "Format a number to a specific number of decimal places. Returns a string.",
    "helpUrl": "https://docs.python.org/3/tutorial/inputoutput.html#fancier-output-formatting"
  },
  {
    "type": "essentials_list_get_2d",
    "message0": "in array %1 get row %2 column %3",
    "args0": [
      {
        "type": "input_value",
        "name": "ARRAY"
      },
      {
        "type": "input_value",
        "name": "ROW",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "COL",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Get an element from a 2D array (matrix) at the specified row and column.",
    "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions"
  },
  {
    "type": "essentials_list_set_2d",
    "message0": "in array %1 set row %2 column %3 to %4",
    "args0": [
      {
        "type": "input_value",
        "name": "ARRAY"
      },
      {
        "type": "input_value",
        "name": "ROW",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "COL",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Set an element in a 2D array (matrix) at the specified row and column.",
    "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions"
  }
]);

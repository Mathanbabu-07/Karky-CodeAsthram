import * as Blockly from "blockly\/core";

// Unregister the core math_single to avoid overwrite warning
if (Blockly.Blocks['math_single']) {
  delete Blockly.Blocks['math_single'];
}

Blockly.defineBlocksWithJsonArray([
  {
    "type": "math_single",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          [ "square root", "ROOT" ],
          [ "absolute value", "ABS" ],
          [ "-", "NEG" ],
          [ "ln", "LN" ],
          [ "log10", "LOG10" ],
          [ "e^", "EXP" ],
          [ "10^", "POW10" ],
          [ "sin", "SIN" ],
          [ "cos", "COS" ],
          [ "tan", "TAN" ],
          [ "asin", "ASIN" ],
          [ "acos", "ACOS" ],
          [ "atan", "ATAN" ],
          [ "degrees", "DEGREES" ],
          [ "radians", "RADIANS" ]
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "#9B59B6",
    "tooltip": "Trigonometric functions and other mathematical operations.",
    "helpUrl": "https://www.w3schools.com/js/js_math.asp"
  },
  {
    "type": "control_math_stats",
    "message0": "calculate %1 of list %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          [
            "maximum",
            "MAX"
          ],
          [
            "minimum",
            "MIN"
          ],
          [
            "mean",
            "MEAN"
          ],
          [
            "median",
            "MEDIAN"
          ],
          [
            "standard deviation",
            "STDDEV"
          ],
          [
            "sum",
            "SUM"
          ]
        ],
        "colour": "#9B59B6"
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": "Number",
    "colour": "#9B59B6",
    "tooltip": "Calculates a statistical value of a list of numbers."
  },
  {
    "type": "control_decimal_create",
    "message0": "decimal from %1",
    "args0": [{
        "type": "input_value",
        "name": "VALUE",
        "colour": "#9B59B6"
      }],
    "output": "Number",
    "colour": "#9B59B6",
    "tooltip": "Creates a decimal number for high-precision calculations."
  },
  {
    "type": "control_fraction_create",
    "message0": "fraction with numerator %1 and denominator %2",
    "args0": [
      {
        "type": "input_value",
        "name": "NUMERATOR",
        "check": "Number",
        "colour": "#9B59B6"
      },
      {
        "type": "input_value",
        "name": "DENOMINATOR",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "#9B59B6",
    "tooltip": "Creates a fraction."
  },
  {
    "type": "control_complex_create",
    "message0": "complex number with real part %1 and imaginary part %2",
    "args0": [
      {
        "type": "input_value",
        "name": "REAL",
        "check": "Number",
        "colour": "#9B59B6"
      },
      {
        "type": "input_value",
        "name": "IMAG",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "#9B59B6",
    "tooltip": "Creates a complex number."
  },
  {
    "type": "control_accumulate",
    "message0": "accumulate %1 with function %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ITERABLE",
        "check": "Array",
        "colour": "#9B59B6"
      },
      {
        "type": "input_value",
        "name": "FUNC"
      }
    ],
    "output": "Array",
    "colour": "#9B59B6",
    "tooltip": "Returns a list of accumulated results."
  }
]);

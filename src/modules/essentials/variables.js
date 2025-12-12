import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_var_set",
    "message0": "set %1 to %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "item",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Sets a variable.",
    "helpUrl": ""
  },
  {
    "type": "essentials_var_get",
    "message0": "%1",
    "args0": [{
        "type": "field_variable",
        "name": "VAR",
        "variable": "item",
        "colour": "#4D6A94"
      }],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Gets a variable.",
    "helpUrl": ""
  },
  {
    "type": "essentials_var_undefined",
    "message0": "undefined",
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "The undefined value (None in Python).",
    "helpUrl": ""
  },
  {
    "type": "essentials_is_instance",
    "message0": "is %1 instance of %2",
    "args0": [
      {
        "type": "input_value",
        "name": "OBJ",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "TYPE"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Checks if an object is an instance of a type.",
    "helpUrl": ""
  },
  {
    "type": "essentials_type_of",
    "message0": "type of %1",
    "args0": [{
        "type": "input_value",
        "name": "OBJ",
        "colour": "#4D6A94"
      }],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Returns the type of an object.",
    "helpUrl": ""
  },
  {
    "type": "essentials_cast",
    "message0": "cast %1 to %2",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "colour": "#4D6A94"
      },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          [
            "integer",
            "int"
          ],
          [
            "float",
            "float"
          ],
          [
            "string",
            "str"
          ],
          [
            "boolean",
            "bool"
          ]
        ]
      }
    ],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Casts a value to a different type.",
    "helpUrl": ""
  },
  {
    "type": "essentials_default_if_none",
    "message0": "%1 if not None else %2",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "colour": "#4D6A94"
      },
      {
        "type": "input_value",
        "name": "DEFAULT"
      }
    ],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Returns a default value if the first value is None.",
    "helpUrl": ""
  },
  {
    "type": "essentials_type_as_string",
    "message0": "type of %1 as string",
    "args0": [{
        "type": "input_value",
        "name": "OBJ"
      }],
    "output": "String",
    "colour": 210,
    "tooltip": "Returns the type of an object as a string.",
    "helpUrl": ""
  },
  {
    "type": "essentials_is_none",
    "message0": "%1 is None",
    "args0": [{
        "type": "input_value",
        "name": "VALUE"
      }],
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Checks if a value is None.",
    "helpUrl": ""
  },
  {
    "type": "essentials_is_not_none",
    "message0": "%1 is not None",
    "args0": [{
        "type": "input_value",
        "name": "VALUE"
      }],
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Checks if a value is not None.",
    "helpUrl": ""
  }
]);
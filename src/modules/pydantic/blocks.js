import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "pydantic_create_model",
    "message0": "create Pydantic model %1 with fields %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "Item"
      },
      {
        "type": "input_statement",
        "name": "FIELDS"
      }
    ],
    "output": "PydanticModel",
    "colour": "#546E7A",
    "tooltip": "Creates a Pydantic model.",
    "helpUrl": "https://pydantic-docs.helpmanual.io/"
  },
  {
    "type": "pydantic_field",
    "message0": "field %1: %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "name"
      },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["string", "str"],
          ["integer", "int"],
          ["float", "float"],
          ["boolean", "bool"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#546E7A",
    "tooltip": "Adds a field to a Pydantic model.",
    "helpUrl": "https://pydantic-docs.helpmanual.io/usage/models/"
  }
]);

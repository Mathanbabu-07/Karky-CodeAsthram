import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "storage_orm_model_define",
    "message0": "define ORM model %1 with fields %2",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "MyModel" },
      { "type": "input_value", "name": "FIELDS", "check": "Object" }
    ],
    "output": "Model",
    "colour": 230,
    "tooltip": "Defines an ORM model. (Gated)"
  },
  {
    "type": "storage_orm_create",
    "message0": "in session %1 create %2 with data %3",
    "args0": [
      { "type": "input_value", "name": "SESSION" },
      { "type": "input_value", "name": "MODEL", "check": "Model" },
      { "type": "input_value", "name": "DATA", "check": "Object" }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "Creates a new record using an ORM. (Gated)"
  },
  {
    "type": "storage_orm_query",
    "message0": "in session %1 query %2 with filters %3",
    "args0": [
      { "type": "input_value", "name": "SESSION" },
      { "type": "input_value", "name": "MODEL", "check": "Model" },
      { "type": "input_value", "name": "FILTERS", "check": "Object" }
    ],
    "output": "Array",
    "colour": 230,
    "tooltip": "Queries for records using an ORM. (Gated)"
  }
]);

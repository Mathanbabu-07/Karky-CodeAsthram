import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "data_structures_record_define_namedtuple",
    "message0": "define named tuple %1 with fields %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "MyRecord",
        "colour": "#3A8A9E"
      },
      {
        "type": "input_value",
        "name": "FIELDS",
        "check": "Array"
      }
    ],
    "output": "Class",
    "colour": "#3A8A9E",
    "tooltip": "Defines a new named tuple class."
  },
  {
    "type": "data_structures_record_define_dataclass",
    "message0": "define dataclass %1 with fields %2 and defaults %3",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "MyRecord",
        "colour": "#3A8A9E"
      },
      {
        "type": "input_value",
        "name": "FIELDS",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "DEFAULTS",
        "check": "Array"
      }
    ],
    "output": "Class",
    "colour": "#3A8A9E",
    "tooltip": "Defines a new dataclass."
  },
  {
    "type": "data_structures_record_define_dataclass_auto",
    "message0": "define dataclass %1 fields %2 defaults %3 auto repr %4 frozen %5",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "MyRecord" },
      { "type": "input_value", "name": "FIELDS", "check": "Array" },
      { "type": "input_value", "name": "DEFAULTS", "check": "Array" },
      { "type": "field_checkbox", "name": "REPR", "checked": true },
      { "type": "field_checkbox", "name": "FROZEN", "checked": false }
    ],
    "output": "Class",
    "colour": "#3A8A9E",
    "tooltip": "Dataclass with options: auto __repr__ and frozen flag.",
    "helpUrl": "https://docs.python.org/3/library/dataclasses.html"
  },
  {
    "type": "data_structures_record_define_namedtuple_annotated",
    "message0": "define NamedTuple %1 annotated fields %2",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "MyTuple" },
      { "type": "input_value", "name": "FIELDS", "check": "Array" }
    ],
    "output": "Class",
    "colour": "#3A8A9E",
    "tooltip": "Define typing.NamedTuple with field: type annotation pairs.",
    "helpUrl": "https://docs.python.org/3/library/typing.html#typing.NamedTuple"
  },
  {
    "type": "data_structures_record_instantiate",
    "message0": "create instance of %1 with values %2",
    "args0": [
      {
        "type": "input_value",
        "name": "CLASS",
        "colour": "#3A8A9E"
      },
      {
        "type": "input_value",
        "name": "VALUES",
        "check": "Object"
      }
    ],
    "output": null,
    "colour": "#3A8A9E",
    "tooltip": "Creates an instance of a record (named tuple or dataclass)."
  },
  {
    "type": "data_structures_record_to_dict",
    "message0": "convert record %1 to dictionary",
    "args0": [{
        "type": "input_value",
        "name": "RECORD",
        "colour": "#3A8A9E"
      }],
    "output": "Object",
    "colour": "#3A8A9E",
    "tooltip": "Converts a record instance to a dictionary."
  },
  {
    "type": "data_structures_record_from_dict",
    "message0": "create instance of %1 from dictionary %2",
    "args0": [
      {
        "type": "input_value",
        "name": "CLASS",
        "colour": "#3A8A9E"
      },
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Object"
      }
    ],
    "output": null,
    "colour": "#3A8A9E",
    "tooltip": "Creates a record instance from a dictionary."
  }
]);
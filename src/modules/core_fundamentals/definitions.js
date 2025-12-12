// src/modules/core_fundamentals/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  // Block for the None constant
  {
    "type": "core_none",
    "message0": "None",
    "output": null,
    "colour": "#5B80A5",
    "tooltip": "The None object.",
    "helpUrl": "https://docs.python.org/3/library/constants.html#None"
  },
  // Block for type()
  {
    "type": "core_type",
    "message0": "type of %1",
    "args0": [
      {
        "type": "input_value",
        "name": "VAR"
      }
    ],
    "output": "Type",
    "colour": "#5B80A5",
    "tooltip": "Returns the type of a variable.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#type"
  },
  // Block for isinstance()
  {
    "type": "core_isinstance",
    "message0": "is %1 an instance of %2",
    "args0": [
      {
        "type": "input_value",
        "name": "OBJ"
      },
      {
        "type": "input_value",
        "name": "CLASS"
      }
    ],
    "output": "Boolean",
    "colour": "#5B80A5",
    "inputsInline": true,
    "tooltip": "Checks if an object is an instance of a class.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#isinstance"
  },
  // Block for creating an Enum
  {
    "type": "core_enum",
    "message0": "create enum %1 with members %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "MyEnum"
      },
      {
        "type": "input_value",
        "name": "MEMBERS",
        "check": "Array"
      }
    ],
    "output": "Class",
    "colour": "#5B80A5",
    "tooltip": "Creates a new enumeration type. Provide a list of strings for members.",
    "helpUrl": "https://docs.python.org/3/library/enum.html"
  },
  // Block for creating a dataclass
  {
    "type": "core_dataclass",
    "message0": "create dataclass %1 with fields %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "MyDataClass"
      },
      {
        "type": "input_value",
        "name": "FIELDS",
        "check": "Array"
      }
    ],
    "output": "Class",
    "colour": "#5B80A5",
    "tooltip": "Creates a new dataclass. Provide a list of strings for field names.",
    "helpUrl": "https://docs.python.org/3/library/dataclasses.html"
  },
  // Block for creating a namedtuple
  {
    "type": "core_namedtuple",
    "message0": "create namedtuple %1 with fields %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "MyNamedTuple"
      },
      {
        "type": "input_value",
        "name": "FIELDS",
        "check": "Array"
      }
    ],
    "output": "Class",
    "colour": "#5B80A5",
    "tooltip": "Creates a new namedtuple. Provide a list of strings for field names.",
    "helpUrl": "https://docs.python.org/3/library/collections.html#collections.namedtuple"
  }
]);

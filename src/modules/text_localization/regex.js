import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "text_re_search",
    "message0": "search regex %1 in text %2 with flags %3",
    "args0": [
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "FLAGS"
      }
    ],
    "output": null,
    "colour": "#D3425C",
    "tooltip": "Searches for a regex pattern in a string."
  },
  {
    "type": "text_re_match",
    "message0": "match regex %1 at start of text %2 with flags %3",
    "args0": [
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "FLAGS"
      }
    ],
    "output": null,
    "colour": "#D3425C",
    "tooltip": "Matches a regex pattern at the beginning of a string."
  },
  {
    "type": "text_re_findall",
    "message0": "find all regex %1 in text %2 with flags %3",
    "args0": [
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "FLAGS"
      }
    ],
    "output": "Array",
    "colour": "#D3425C",
    "tooltip": "Finds all occurrences of a regex pattern in a string."
  },
  {
    "type": "text_re_replace",
    "message0": "in text %1 replace regex %2 with %3 flags %4",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "REPL",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "FLAGS"
      }
    ],
    "output": "String",
    "colour": "#D3425C",
    "tooltip": "Replaces occurrences of a regex pattern in a string."
  },
  {
    "type": "text_re_split",
    "message0": "split text %1 by regex %2 with flags %3",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "FLAGS"
      }
    ],
    "output": "Array",
    "colour": "#D3425C",
    "tooltip": "Splits a string by a regex pattern."
  },
  {
    "type": "text_regex_flags",
    "message0": "regex flags %1",
    "args0": [{
        "type": "field_dropdown",
        "name": "FLAG",
        "options": [
          [
            "ignore case",
            "re.IGNORECASE"
          ],
          [
            "multiline",
            "re.MULTILINE"
          ],
          [
            "dot all",
            "re.DOTALL"
          ]
        ],
        "colour": "#D3425C"
      }],
    "output": "Number",
    "colour": "#D3425C",
    "tooltip": "Regex flags."
  }
]);
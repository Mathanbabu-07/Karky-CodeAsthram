import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "re_compile",
    "message0": "compile regex pattern %1",
    "args0": [{
        "type": "input_value",
        "name": "PATTERN",
        "check": "String",
        "colour": "#78909C"
      }],
    "output": "RegexObject",
    "colour": "#78909C",
    "tooltip": "Compiles a regular expression pattern into a regex object.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/re.html#re.compile"
  },
  {
    "type": "re_search",
    "message0": "search for pattern %1 in string %2",
    "args0": [
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": [
          "String",
          "RegexObject"
        ],
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "STRING",
        "check": "String"
      }
    ],
    "output": "MatchObject",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Scans through a string looking for the first location where the regular expression pattern produces a match.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/re.html#re.search"
  },
  {
    "type": "re_match",
    "message0": "match pattern %1 at start of string %2",
    "args0": [
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": [
          "String",
          "RegexObject"
        ],
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "STRING",
        "check": "String"
      }
    ],
    "output": "MatchObject",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "If zero or more characters at the beginning of string match the regular expression pattern, return a corresponding match object.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/re.html#re.match"
  },
  {
    "type": "re_findall",
    "message0": "find all matches for pattern %1 in string %2",
    "args0": [
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": [
          "String",
          "RegexObject"
        ],
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "STRING",
        "check": "String"
      }
    ],
    "output": "Array",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Return all non-overlapping matches of pattern in string, as a list of strings.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/re.html#re.findall"
  },
  {
    "type": "re_sub",
    "message0": "replace matches of pattern %1 with %2 in string %3",
    "args0": [
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": [
          "String",
          "RegexObject"
        ],
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "REPL",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "STRING",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#78909C",
    "inputsInline": false,
    "tooltip": "Return the string obtained by replacing the leftmost non-overlapping occurrences of pattern in string by the replacement repl.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/re.html#re.sub"
  },
  {
    "type": "re_split",
    "message0": "split string %1 by pattern %2",
    "args0": [
      {
        "type": "input_value",
        "name": "STRING",
        "check": "String",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": [
          "String",
          "RegexObject"
        ]
      }
    ],
    "output": "Array",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Split string by the occurrences of pattern.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/re.html#re.split"
  },
  {
    "type": "re_escape",
    "message0": "escape special characters in %1",
    "args0": [{
        "type": "input_value",
        "name": "PATTERN",
        "check": "String",
        "colour": "#78909C"
      }],
    "output": "String",
    "colour": "#78909C",
    "tooltip": "Escape special characters in a pattern.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/re.html#re.escape"
  },
  {
    "type": "re_match_group",
    "message0": "from match %1 get group %2",
    "args0": [
      {
        "type": "input_value",
        "name": "MATCH",
        "check": "MatchObject",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "GROUP",
        "check": "Number"
      }
    ],
    "output": "String",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Returns a specific subgroup of the match.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/re.html#re.Match.group"
  },
  {
    "type": "re_match_groups",
    "message0": "get all groups from match %1",
    "args0": [{
        "type": "input_value",
        "name": "MATCH",
        "check": "MatchObject",
        "colour": "#78909C"
      }],
    "output": "Tuple",
    "colour": "#78909C",
    "tooltip": "Returns a tuple containing all the subgroups of the match.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/re.html#re.Match.groups"
  }
]);
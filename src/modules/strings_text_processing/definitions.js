// src/modules/strings_text_processing/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  // Block for regex search
  {
    "type": "text_regex_search",
    "message0": "in text %1 find pattern %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": "String"
      }
    ],
    "output": null, // Returns a match object or None, can be used in boolean contexts
    "colour": "#4C97FF",
    "inputsInline": true,
    "tooltip": "Searches for a regex pattern in a string. Returns the match object or None.",
    "helpUrl": "https://docs.python.org/3/library/re.html#re.search"
  },
  // Block for regex replace
  {
    "type": "text_regex_replace",
    "message0": "in text %1 replace pattern %2 with %3",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "PATTERN",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "REPLACEMENT",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#4C97FF",
    "inputsInline": true,
    "tooltip": "Replaces all occurrences of a regex pattern in a string.",
    "helpUrl": "https://docs.python.org/3/library/re.html#re.sub"
  },
  // Block for unicodedata.normalize
  {
    "type": "text_normalize",
    "message0": "normalize %1 using form %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "FORM",
        "options": [
          ["NFC", "NFC"],
          ["NFKC", "NFKC"],
          ["NFD", "NFD"],
          ["NFKD", "NFKD"]
        ]
      }
    ],
    "output": "String",
    "colour": "#4C97FF",
    "tooltip": "Normalizes a Unicode string.",
    "helpUrl": "https://docs.python.org/3/library/unicodedata.html#unicodedata.normalize"
  },
  // Block for i18n
  {
    "type": "i18n_register_translation",
    "message0": "register translation for language %1 with dictionary %2",
    "args0": [
      {
        "type": "field_input",
        "name": "LANG",
        "text": "en"
      },
      {
        "type": "input_value",
        "name": "DICTIONARY",
        "check": "Object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4C97FF",
    "tooltip": "Registers a dictionary of translations for a language.",
    "helpUrl": ""
  },
  {
    "type": "i18n_translate",
    "message0": "translate key %1 to language %2 || with fallback %3",
    "args0": [
      {
        "type": "input_value",
        "name": "KEY",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "LANG",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "FALLBACK",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#4C97FF",
    "tooltip": "Translates a key to the specified language.",
    "helpUrl": ""
  },
  // Block for checking if a string is numeric
  {
    "type": "text_is_numeric",
    "message0": "is numeric %1",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "Boolean",
    "colour": "#4C97FF",
    "tooltip": "Checks if the string consists of only numeric characters.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#str.isnumeric"
  },
  // Block for finding all occurrences of a substring
  {
    "type": "text_find_all",
    "message0": "in text %1 find all occurrences of %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "SUBSTRING",
        "check": "String"
      }
    ],
    "output": "Array",
    "colour": "#4C97FF",
    "tooltip": "Finds all occurrences of a substring and returns a list of their starting indices.",
    "helpUrl": ""
  },
  // Block for case-insensitive string comparison
  {
    "type": "text_compare_case_insensitive",
    "message0": "is %1 equal to %2 (ignore case)",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT1",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "TEXT2",
        "check": "String"
      }
    ],
    "output": "Boolean",
    "colour": "#4C97FF",
    "inputsInline": true,
    "tooltip": "Compares two strings ignoring case.",
    "helpUrl": ""
  },
  // Block for str.swapcase()
  {
    "type": "text_swapcase",
    "message0": "swap case of %1",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#4C97FF",
    "tooltip": "Swaps the case of all characters in the string.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#str.swapcase"
  }
]);


import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "text_i18n_register",
    "message0": "register translations for lang %1 with mapping %2",
    "args0": [
      {
        "type": "field_input",
        "name": "LANG",
        "text": "en",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "MAPPING",
        "check": "Object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#D3425C",
    "tooltip": "Registers a dictionary of translations for a language."
  },
  {
    "type": "text_i18n_translate",
    "message0": "translate key %1 lang %2",
    "args0": [
      {
        "type": "input_value",
        "name": "KEY",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "LANG",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#D3425C",
    "tooltip": "Translates a key using the registered translations."
  },
  {
    "type": "text_i18n_plural",
    "message0": "pluralize for key %1 count %2 lang %3",
    "args0": [
      {
        "type": "input_value",
        "name": "KEY",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "N",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "LANG",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#D3425C",
    "tooltip": "Handles pluralization based on a count."
  },
  {
    "type": "text_i18n_set_locale",
    "message0": "set current locale to %1",
    "args0": [{
        "type": "input_value",
        "name": "LANG",
        "check": "String",
        "colour": "#D3425C"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#D3425C",
    "tooltip": "Sets the current language for translation."
  },
  {
    "type": "text_i18n_get_locale",
    "message0": "get current locale",
    "output": "String",
    "colour": "#D3425C",
    "tooltip": "Gets the current language for translation."
  },
  {
    "type": "text_alt_text_generate",
    "message0": "generate alt text from metadata %1 lang %2",
    "args0": [
      {
        "type": "input_value",
        "name": "METADATA",
        "check": "Object",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "LANG",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#D3425C",
    "tooltip": "Generates alternative text for an image from its metadata."
  }
]);
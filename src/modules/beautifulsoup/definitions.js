import * as Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([
  {
    "type": "beautifulsoup_parse_html",
    "message0": "parse HTML text %1 with parser %2",
    "args0": [
      {
        "type": "input_value",
        "name": "HTML_TEXT",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "PARSER",
        "options": [
          [
            "html.parser",
            "html.parser"
          ],
          [
            "lxml",
            "lxml"
          ],
          [
            "html5lib",
            "html5lib"
          ]
        ]
      }
    ],
    "output": "Soup",
    "colour": "#8D6E63",
    "tooltip": "Parse HTML content into a BeautifulSoup object.",
    "helpUrl": "https://www.crummy.com/software/BeautifulSoup/bs4/doc/#making-the-soup"
  },
  {
    "type": "beautifulsoup_find",
    "message0": "in soup %1 find first tag %2 with attributes %3",
    "args0": [
      {
        "type": "input_value",
        "name": "SOUP",
        "check": [
          "Soup",
          "Tag"
        ]
      },
      {
        "type": "input_value",
        "name": "TAG",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "ATTRS",
        "check": "Dictionary"
      }
    ],
    "output": "Tag",
    "colour": "#8D6E63",
    "inputsInline": false,
    "tooltip": "Find the first tag that matches the given criteria.",
    "helpUrl": "https://www.crummy.com/software/BeautifulSoup/bs4/doc/#find"
  },
  {
    "type": "beautifulsoup_find_all",
    "message0": "in soup %1 find all tags %2 with attributes %3 limit %4",
    "args0": [
      {
        "type": "input_value",
        "name": "SOUP",
        "check": [
          "Soup",
          "Tag"
        ]
      },
      {
        "type": "input_value",
        "name": "TAG",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "ATTRS",
        "check": "Dictionary"
      },
      {
        "type": "input_value",
        "name": "LIMIT",
        "check": "Number"
      }
    ],
    "output": "Array",
    "colour": "#8D6E63",
    "inputsInline": false,
    "tooltip": "Find all tags that match the given criteria.",
    "helpUrl": "https://www.crummy.com/software/BeautifulSoup/bs4/doc/#find-all"
  },
  {
    "type": "beautifulsoup_get_text",
    "message0": "get text from element %1",
    "args0": [{
        "type": "input_value",
        "name": "ELEMENT",
        "check": "Tag"
      }],
    "output": "String",
    "colour": "#8D6E63",
    "tooltip": "Get all the text from a tag or a soup object.",
    "helpUrl": "https://www.crummy.com/software/BeautifulSoup/bs4/doc/#get-text"
  },
  {
    "type": "beautifulsoup_get_attribute",
    "message0": "from element %1 get attribute %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ELEMENT",
        "check": "Tag"
      },
      {
        "type": "input_value",
        "name": "ATTRIBUTE",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#8D6E63",
    "inputsInline": true,
    "tooltip": "Get the value of an attribute from a tag.",
    "helpUrl": "https://www.crummy.com/software/BeautifulSoup/bs4/doc/#attributes"
  }
]);
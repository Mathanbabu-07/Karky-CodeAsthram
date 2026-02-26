import * as Blockly from 'blockly';
import { createPlusField } from '../../plugins/block-plus-minus/field_plus';
import { createMinusField } from '../../plugins/block-plus-minus/field_minus';
// Use the field package that is installed in package.json.
// The project dependency is @blockly/field-multilineinput (not field-multilinetext).
import '@blockly/field-multilineinput';
// Ensure the field class is explicitly registered with Blockly's field registry
// at module import time so blocks defined below can find it immediately.
// Some bundlers or package versions don't auto-register early enough.
try {
  // Prefer a named import; fall back to accessing the package global if needed.
  // eslint-disable-next-line import/no-extraneous-dependencies
  const FieldModule = require('@blockly/field-multilineinput');
  const FieldMultilineInput = FieldModule && (FieldModule.FieldMultilineInput || FieldModule.default || FieldModule);
  if (FieldMultilineInput) {
    if (!Blockly.fieldRegistry.get('field_multilineinput')) {
      Blockly.fieldRegistry.register('field_multilineinput', FieldMultilineInput);
    }
    // Register legacy key some older blocks may still reference.
    if (!Blockly.fieldRegistry.get('field_multilinetext')) {
      Blockly.fieldRegistry.register('field_multilinetext', FieldMultilineInput);
    }
  }
} catch (e) {
  // Non-fatal: if registration fails here, BlocklyEditor.jsx also tries to register.
  // eslint-disable-next-line no-console
  console.debug('Could not auto-register FieldMultilineInput in text module:', e && e.message ? e.message : e);
}

// Build the block JSONs first and only register those which are not already
// defined. This avoids duplicate-definition warnings when modules are loaded
// multiple times in dev/hot-reload scenarios or if the same block file is
// imported twice by mistake.
const textBlocks = [
  {
    "type": "text_literal",
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
        "text": ""
      }
    ],
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "A literal text string.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str"
  },
  {
    "type": "text_multiline",
    "message0": "%1",
    "args0": [
      {
        "type": "field_multilineinput",
        "name": "TEXT",
        "text": ""
      }
    ],
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "A multi-line text string.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str"
  },
  {
    "type": "text_concat",
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "Create a new text string by joining together any number of text strings.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str",
    "mutator": "text_concat_mutator"
  },
  {
    "type": "text_concat_item",
    "message0": "item",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "A string to be joined.",
    "enableContextMenu": false
  },
  {
    "type": "text_format",
    "message0": "format text %1 with",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "Format a text string with a variable number of arguments.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#str.format",
    "mutator": "text_format_mutator"
  },
  {
    "type": "text_format_item",
    "message0": "argument",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "An argument to be formatted into the text.",
    "enableContextMenu": false
  },
  {
    "type": "text_length",
    "message0": "length of %1",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      }
    ],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Returns the number of letters in the provided text.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#len"
  },
  {
    "type": "text_ord",
    "message0": "ASCII value of %1",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      }
    ],
    "output": "Number",
    "colour": "#4D6A94",
    "tooltip": "Returns the ASCII value of the first character in the text.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#ord"
  },
  {
    "type": "text_format_spec",
    "message0": "format %1 with spec %2",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "input_value",
        "name": "SPEC",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "Formats a value using a format specification string.",
    "helpUrl": "https://docs.python.org/3/library/string.html#format-specification-mini-language"
  },
  {
    "type": "text_substring",
    "message0": "in text %1 get substring from %2 %3 to %4 %5",
    "args0": [
      {
        "type": "input_value",
        "name": "STRING",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "WHERE1",
        "options": [
          ["from start", "FROM_START"],
          ["from end", "FROM_END"],
          ["first", "FIRST"]
        ]
      },
      {
        "type": "input_value",
        "name": "AT1"
      },
      {
        "type": "field_dropdown",
        "name": "WHERE2",
        "options": [
          ["from start", "FROM_START"],
          ["from end", "FROM_END"],
          ["last", "LAST"]
        ]
      },
      {
        "type": "input_value",
        "name": "AT2"
      }
    ],
    "inputsInline": true,
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "Returns a specific part of a text string.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str"
  },
  {
    "type": "text_search",
    "message0": "in text %1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "HAYSTACK",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "OPERATION",
        "options": [
          ["find first", "FIRST"],
          ["find last", "LAST"],
          ["contains", "CONTAINS"],
          ["starts with", "STARTSWITH"],
          ["ends with", "ENDSWITH"]
        ]
      },
      {
        "type": "input_value",
        "name": "NEEDLE",
        "check": "String"
      }
    ],
    "inputsInline": true,
    "output": [
      "Number",
      "Boolean"
    ],
    "colour": "#4D6A94",
    "tooltip": "Searches for a substring within a text string. Returns the position of the substring or a true/false value indicating whether the substring is present.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#string-methods"
  },
  {
    "type": "text_transform",
    "message0": "to %1 of %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OPERATION",
        "options": [
          ["UPPERCASE", "UPPERCASE"],
          ["lowercase", "LOWERCASE"],
          ["Title Case", "TITLECASE"],
          ["strip spaces", "STRIP"],
          ["strip spaces from left", "LSTRIP"],
          ["strip spaces from right", "RSTRIP"]
        ]
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "Applies a transformation to a text string, such as changing its case or removing whitespace.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#string-methods"
  },
  {
    "type": "text_split_join",
    "message0": "%1 %2 with delimiter %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MODE",
        "options": [
          ["split", "SPLIT"],
          ["join", "JOIN"]
        ]
      },
      {
        "type": "input_value",
        "name": "INPUT"
      },
      {
        "type": "input_value",
        "name": "DELIMITER",
        "check": "String"
      }
    ],
    "inputsInline": true,
    "output": [
      "Array",
      "String"
    ],
    "colour": "#4D6A94",
    "tooltip": "Splits a text string into a list of substrings, or joins a list of strings into a single text string.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#string-methods"
  },
  {
    "type": "text_replace",
    "message0": "in text %1 replace %2 with %3",
    "args0": [
      {
        "type": "input_value",
        "name": "HAYSTACK",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "NEEDLE",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "REPLACEMENT",
        "check": "String"
      }
    ],
    "message1": "number of replacements %1",
    "args1": [
      {
        "type": "input_value",
        "name": "COUNT",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "Replaces all or a specified number of occurrences of a substring with another string.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#str.replace"
  },
  {
    "type": "text_html_transform",
    "message0": "%1 HTML in %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OPERATION",
        "options": [
          ["escape", "ESCAPE"],
          ["unescape", "UNESCAPE"]
        ]
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "Escapes or unescapes HTML entities in a text string.",
    "helpUrl": "https://docs.python.org/3/library/html.html"
  },
  {
    "type": "text_is_empty",
    "message0": "is text %1 empty?",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      }
    ],
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Checks if a text string is empty.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str"
  },
  {
    "type": "text_newline",
    "message0": "newline",
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "A newline character (\\n). Useful for formatting multi-line output.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str"
  },
  {
    "type": "text_tab",
    "message0": "tab",
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "A horizontal tab character (\\t). Useful for indentation in output.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str"
  },
  {
    "type": "text_print",
    "message0": "print %1",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Prints the specified text, number, or other value to the console.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#print"
  },
  {
    "type": "text_print_fstring",
    "message0": "print f-string base %1",
    "args0": [{ "type": "input_value", "name": "BASE", "check": "String" }],
    "message1": "placeholders %1",
    "args1": [{ "type": "input_dummy", "name": "ITEMS" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Print using an f-string. Use { } in the base text for placeholders.",
    "helpUrl": "https://docs.python.org/3/reference/lexical_analysis.html#f-strings",
    "mutator": "text_print_fstring_mutator"
  },
  {
    "type": "text_print_with_newline",
    "message0": "print %1 with newline %2",
    "args0": [
      { "type": "input_value", "name": "TEXT" },
      { "type": "field_dropdown", "name": "POSITION", "options": [["before", "BEFORE"], ["after", "AFTER"], ["both", "BOTH"]] }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Prints text with configurable newline placement (before, after, or both).",
  },
  {
    "type": "text_check_type",
    "message0": "is %1 %2 ?",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": "String" },
      {
        "type": "field_dropdown",
        "name": "CHECK_TYPE",
        "options": [
          ["alphabetic", "ALPHA"],
          ["numeric", "DIGIT"],
          ["alphanumeric", "ALNUM"],
          ["whitespace only", "SPACE"],
          ["lowercase", "LOWER"],
          ["uppercase", "UPPER"],
          ["title case", "TITLE"],
          ["printable", "PRINTABLE"],
          ["identifier", "IDENTIFIER"],
          ["decimal", "DECIMAL"]
        ]
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": "#4D6A94",
    "tooltip": "Check if a string satisfies a specific property (alphabetic, numeric, etc.). Combines all .is*() string methods.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#string-methods"
  },
  {
    "type": "text_alignment",
    "message0": "%1 %2 to width %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ALIGN",
        "options": [
          ["center", "CENTER"],
          ["left justify", "LJUST"],
          ["right justify", "RJUST"],
          ["zero-pad", "ZFILL"]
        ]
      },
      { "type": "input_value", "name": "TEXT", "check": "String" },
      { "type": "input_value", "name": "WIDTH", "check": "Number" }
    ],
    "message1": "fill character %1",
    "args1": [
      { "type": "input_value", "name": "FILL", "check": "String" }
    ],
    "inputsInline": true,
    "output": "String",
    "colour": "#4D6A94",
    "tooltip": "Align or pad a string to a specified width. center(), ljust(), rjust(), or zfill() methods.",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#string-methods"
  },
  {
    "type": "text_partition",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "METHOD",
        "options": [
          ["partition", "PARTITION"],
          ["rpartition", "RPARTITION"]
        ]
      },
      { "type": "input_value", "name": "TEXT", "check": "String" }
    ],
    "message1": "separator %1",
    "args1": [
      { "type": "input_value", "name": "SEP", "check": "String" }
    ],
    "inputsInline": true,
    "output": "Array",
    "colour": "#4D6A94",
    "tooltip": "Split a string into a 3-tuple (before, separator, after) using partition() or rpartition().",
    "helpUrl": "https://docs.python.org/3/library/stdtypes.html#str.partition"
  }
];

// Filter out blocks that are already registered to avoid duplicate-definition
// warnings during hot-reload or multiple imports.
const blocksToRegister = textBlocks.filter(b => {
  if (!b || !b.type) return false;
  // Blockly.Blocks holds defined block constructors; if a key exists,
  // the block has been registered already.
  if (Blockly && Blockly.Blocks && Blockly.Blocks[b.type]) {
    // Use console.debug so this is visible in development without being too
    // noisy in production logs.
    // eslint-disable-next-line no-console
    console.debug(`Skipping block definition "${b.type}" — already registered.`);
    return false;
  }
  return true;
});

// Define mutators first
const textConcatMutator = {
  itemCount_: 2,

  saveExtraState: function () {
    return {
      'itemCount': this.itemCount_
    };
  },

  loadExtraState: function (state) {
    this.itemCount_ = state['itemCount'] || 2;
    this.updateShape_();
  },

  decompose: function (workspace) {
    const containerBlock = workspace.newBlock('text_concat_item');
    containerBlock.initSvg();
    let connection = containerBlock.nextConnection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('text_concat_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function (containerBlock) {
    let itemBlock = containerBlock.nextConnection.targetBlock();
    const connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = connections[i];
      if (connection) {
        const input = this.getInput('ADD' + i);
        if (input && input.connection) {
          input.connection.connect(connection);
        }
      }
    }
  },

  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.nextConnection.targetBlock();
    let i = 0;
    while (itemBlock) {
      const input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },

  updateShape_: function () {
    // Remove any obsolete input 'A' from old projects
    if (this.getInput('A')) {
      const oldInput = this.getInput('A');
      const targetConnection = oldInput.connection?.targetConnection;
      this.removeInput('A');
      // Migrate the old input to ADD0 if applicable
      if (!this.getInput('ADD0')) {
        const newInput = this.appendValueInput('ADD0').setAlign('RIGHT');
        if (targetConnection) newInput.connection.connect(targetConnection);
      }
    }

    // --- Existing logic below ---
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY').appendField('create empty text');
      if (this.getInput('WITH')) this.removeInput('WITH');
    } else {
      if (!this.getInput('WITH')) {
        const input = this.appendDummyInput('WITH');
        if (this.itemCount_ > 0) input.appendField('create text with');
        if (this.getInput('EMPTY')) this.removeInput('EMPTY');
      }
    }

    for (let i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        this.appendValueInput('ADD' + i).setAlign('RIGHT');
      }
    }
    for (let i = this.itemCount_; this.getInput('ADD' + i); i++) {
      this.removeInput('ADD' + i);
    }
  }
};

if (Blockly.Extensions.isRegistered('text_concat_mutator')) {
  // Skip re-registration
} else {
  Blockly.Extensions.registerMutator(
    'text_concat_mutator',
    textConcatMutator,
    function () {
      this.itemCount_ = 2;
      this.updateShape_();
    },
    ['text_concat_item']
  );
}

const textFormatMutator = {
  itemCount_: 0,

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10) || 0;
    this.updateShape_();
  },

  saveExtraState: function () {
    return {
      'items': this.itemCount_
    };
  },

  loadExtraState: function (state) {
    this.itemCount_ = state['items'] || 0;
    this.updateShape_();
  },

  decompose: function (workspace) {
    const containerBlock = workspace.newBlock('text_format_item');
    containerBlock.initSvg();
    let connection = containerBlock.nextConnection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('text_format_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function (containerBlock) {
    let itemBlock = containerBlock.nextConnection.targetBlock();
    const connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = this.getInput('ARG' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = connections[i];
      if (connection) {
        const input = this.getInput('ARG' + i);
        if (input && input.connection) {
          input.connection.connect(connection);
        }
      }
    }
  },

  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.nextConnection.targetBlock();
    let i = 0;
    while (itemBlock) {
      const input = this.getInput('ARG' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },

  updateShape_: function () {
    for (let i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ARG' + i)) {
        const input = this.appendValueInput('ARG' + i)
          .setAlign('RIGHT');
      }
    }
    for (let i = this.itemCount_; this.getInput('ARG' + i); i++) {
      this.removeInput('ARG' + i);
    }
  }
};

if (Blockly.Extensions.isRegistered('text_format_mutator')) {
  // Skip re-registration
} else {
  Blockly.Extensions.registerMutator(
    'text_format_mutator',
    textFormatMutator,
    function () {
      this.itemCount_ = 0;
      this.updateShape_();
    },
    ['text_format_item']
  );
}

// Mutator for text_print_fstring: dynamic ARG inputs replacing placeholders in f-string base
const textPrintFstringMutator = {
  itemCount_: 0,
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10) || 0;
    this.updateShape_();
  },
  saveExtraState: function () { return { itemCount: this.itemCount_ }; },
  loadExtraState: function (state) { this.itemCount_ = state.itemCount || 0; this.updateShape_(); },
  plus: function () { this.itemCount_++; this.updateShape_(); },
  minus: function () { if (this.itemCount_ > 0) { this.itemCount_--; this.updateShape_(); } },
  updateShape_: function () {
    // Ensure UI controls exist
    const itemsInput = this.getInput('ITEMS');
    if (itemsInput) {
      if (!this.getField('PLUS')) itemsInput.appendField(createPlusField(), 'PLUS');
      if (!this.getField('MINUS')) itemsInput.appendField(createMinusField(), 'MINUS');
    }
    // Add inputs ARG0..ARGn
    for (let i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ARG' + i)) {
        this.appendValueInput('ARG' + i).setAlign('RIGHT').appendField(i === 0 ? 'value' : '');
      }
    }
    // Remove extra inputs
    for (let i = this.itemCount_; this.getInput('ARG' + i); i++) {
      this.removeInput('ARG' + i);
    }
  }
};

if (!Blockly.Extensions.isRegistered('text_print_fstring_mutator')) {
  Blockly.Extensions.registerMutator(
    'text_print_fstring_mutator',
    textPrintFstringMutator,
    function () {
      this.itemCount_ = 0;
      const itemsInput = this.getInput('ITEMS');
      if (itemsInput) {
        if (!this.getField('PLUS')) itemsInput.appendField(createPlusField(), 'PLUS');
        if (!this.getField('MINUS')) itemsInput.appendField(createMinusField(), 'MINUS');
      }
      this.updateShape_();
    }
  );
}

if (blocksToRegister.length) {
  Blockly.defineBlocksWithJsonArray(blocksToRegister);
}

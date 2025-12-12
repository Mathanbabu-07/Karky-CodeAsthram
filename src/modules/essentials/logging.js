import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "essentials_log_info",
    "message0": "log info %1",
    "args0": [{
        "type": "input_value",
        "name": "MESSAGE",
        "colour": "#4D6A94"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Logs an informational message.",
    "helpUrl": ""
  },
  {
    "type": "essentials_log_warn",
    "message0": "log warning %1",
    "args0": [{
        "type": "input_value",
        "name": "MESSAGE",
        "colour": "#4D6A94"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Logs a warning message.",
    "helpUrl": ""
  },
  {
    "type": "essentials_log_error",
    "message0": "log error %1",
    "args0": [{
        "type": "input_value",
        "name": "MESSAGE",
        "colour": "#4D6A94"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Logs an error message.",
    "helpUrl": ""
  },
  {
    "type": "essentials_print_to_console",
    "message0": "print to console %1",
    "args0": [{
        "type": "input_value",
        "name": "MESSAGE",
        "colour": "#4D6A94"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D6A94",
    "tooltip": "Prints a message to the console.",
    "helpUrl": ""
  },
  {
    "type": "essentials_safe_input",
    "message0": "safe input with prompt %1 as %2",
    "args0": [
      {
        "type": "input_value",
        "name": "PROMPT",
        "colour": "#4D6A94"
      },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["text (str)", "str"],
          ["integer (int)", "int"],
          ["decimal (float)", "float"],
          ["boolean (bool)", "bool"]
        ]
      }
    ],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Safely gets input from the user.",
    "helpUrl": ""
  },
  {
    "type": "essentials_input_raw",
    "message0": "raw input prompt %1 as %2",
    "args0": [
      { "type": "input_value", "name": "PROMPT" },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["text (str)", "str"],
          ["integer (int)", "int"],
          ["decimal (float)", "float"],
          ["boolean (bool)", "bool"]
        ]
      }
    ],
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "Gets raw (unsafe) user input. Use only when you trust the source.",
    "helpUrl": "https://docs.python.org/3/library/functions.html#input"
  },
  {
    "type": "essentials_log_custom",
    "message0": "log with level %1 message %2",
    "args0": [
      {
        "type": "field_input",
        "name": "LEVEL",
        "text": "DEBUG"
      },
      {
        "type": "input_value",
        "name": "MESSAGE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Logs a message with a custom level.",
    "helpUrl": ""
  },
  {
    'type': 'essentials_logging_basic_config',
    'message0': 'logging basicConfig level %1 format %2 datefmt %3',
    'args0': [
      { 'type': 'field_dropdown', 'name': 'LEVEL', 'options': [['INFO','INFO'],['DEBUG','DEBUG'],['WARNING','WARNING'],['ERROR','ERROR'],['CRITICAL','CRITICAL']] },
      { 'type': 'input_value', 'name': 'FORMAT', 'check': 'String' },
      { 'type': 'input_value', 'name': 'DATEFMT', 'check': 'String' }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#6D4C41',
    'tooltip': 'Configure logging for basic usage.',
    'helpUrl': 'https://docs.python.org/3/library/logging.html#logging.basicConfig',
    'mutator': 'logging_basic_mutator'
  }
]);

// Mutator to toggle optional format/datefmt (object registration for Blockly v9+)
const LoggingBasicMutator = {
  mutationToDom: function() {
    const hasFmt = !!this.getInput('FORMAT');
    const hasDate = !!this.getInput('DATEFMT');
    const el = Blockly.utils.xml.createElement('mutation');
    el.setAttribute('hasFmt', hasFmt ? 'true' : 'false');
    el.setAttribute('hasDate', hasDate ? 'true' : 'false');
    return el;
  },
  domToMutation: function(xml) {
    const hasFmt = xml.getAttribute('hasFmt') === 'true';
    const hasDate = xml.getAttribute('hasDate') === 'true';
    this.updateShape_(hasFmt, hasDate);
  },
  decompose: function(ws) {
    const c = ws.newBlock('logging_basic_container'); c.initSvg();
    c.setFieldValue(this.getInput('FORMAT') ? 'TRUE' : 'FALSE', 'HAS_FMT');
    c.setFieldValue(this.getInput('DATEFMT') ? 'TRUE' : 'FALSE', 'HAS_DATE');
    return c;
  },
  compose: function(c) {
    const hasFmt = c.getFieldValue('HAS_FMT') === 'TRUE';
    const hasDate = c.getFieldValue('HAS_DATE') === 'TRUE';
    this.updateShape_(hasFmt, hasDate);
  },
  saveConnections: function() {},
  updateShape_: function(hasFmt, hasDate) {
    const fmt = this.getInput('FORMAT');
    const date = this.getInput('DATEFMT');
    if (hasFmt) { if (!fmt) this.appendValueInput('FORMAT').setCheck('String').appendField('format'); }
    else if (fmt) this.removeInput('FORMAT');
    if (hasDate) { if (!date) this.appendValueInput('DATEFMT').setCheck('String').appendField('datefmt'); }
    else if (date) this.removeInput('DATEFMT');
    if (this.rendered) this.render();
  }
};

Blockly.defineBlocksWithJsonArray([
  {
    'type': 'logging_basic_container',
    'message0': 'include format %1 include datefmt %2',
    'args0': [
      { 'type': 'field_dropdown', 'name': 'HAS_FMT', 'options': [['yes','TRUE'],['no','FALSE']] },
      { 'type': 'field_dropdown', 'name': 'HAS_DATE', 'options': [['yes','TRUE'],['no','FALSE']] }
    ],
    'colour': '#8D6E63',
    'tooltip': 'Toggle optional logging basicConfig arguments',
    'enableContextMenu': false
  }
]);

Blockly.Extensions.registerMutator('logging_basic_mutator', LoggingBasicMutator, undefined, ['logging_basic_container']);
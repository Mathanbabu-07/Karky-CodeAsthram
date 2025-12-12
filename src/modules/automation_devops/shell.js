import * as Blockly from 'blockly';
Blockly.defineBlocksWithJsonArray([
  {
    'type': 'automation_cmd_run_safe',
    'message0': 'run safe command %1 with args %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'CMD_KEY',
        'check': 'String',
        'colour': '#8D6E63'
      },
      {
        'type': 'input_value',
        'name': 'ARGS',
        'check': 'Array'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#8D6E63',
    'tooltip': 'Runs a pre-approved command from a safe list.'
  },
  {
    'type': 'automation_subprocess_run',
    'message0': 'subprocess run command %1 capture output %2 text %3',
    'args0': [
      { 'type': 'input_value', 'name': 'CMD', 'check': 'String' },
      { 'type': 'field_dropdown', 'name': 'CAPTURE', 'options': [['yes','TRUE'],['no','FALSE']] },
      { 'type': 'field_dropdown', 'name': 'TEXT', 'options': [['yes','TRUE'],['no','FALSE']] }
    ],
    'output': 'Object',
    'colour': '#8D6E63',
    'tooltip': 'Run a command with subprocess.run returning CompletedProcess.',
    'helpUrl': 'https://docs.python.org/3/library/subprocess.html#subprocess.run'
  },
  {
    'type': 'automation_cmd_user_confirm',
    'message0': 'confirm with user: %1',
    'args0': [{
        'type': 'input_value',
        'name': 'MESSAGE',
        'check': 'String',
        'colour': '#8D6E63'
      }],
    'output': 'Boolean',
    'colour': '#8D6E63',
    'tooltip': 'Asks the user for confirmation before proceeding.'
  },
  {
    'type': 'automation_cmd_capture_output',
    'message0': 'run safe command %1 and capture output',
    'args0': [{
        'type': 'input_value',
        'name': 'CMD_KEY',
        'check': 'String',
        'colour': '#8D6E63'
      }],
    'output': 'String',
    'colour': '#8D6E63',
    'tooltip': 'Runs a pre-approved command and captures its output.'
  },
  {
    'type': 'system_env_get',
    'message0': 'get env %1 default %2',
    'args0': [
      { 'type': 'input_value', 'name': 'KEY', 'check': 'String' },
      { 'type': 'input_value', 'name': 'DEFAULT' }
    ],
    'output': null,
    'colour': '#8D6E63',
    'tooltip': 'Get an environment variable (from os.environ) with optional default.',
    'helpUrl': 'https://docs.python.org/3/library/os.html#os.environ'
  }
]);
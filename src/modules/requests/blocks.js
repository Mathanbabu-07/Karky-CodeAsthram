import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([{
    'type': 'requests_get',
    'message0': 'send GET request to url %1',
    'args0': [{
        'type': 'input_value',
        'name': 'URL',
        'check': 'String',
        'colour': '#42A5F5'
      }],
    'output': 'Response',
    'colour': '#42A5F5',
    'tooltip': 'Sends a GET request.',
    'helpUrl': 'https://requests.readthedocs.io/en/latest/api/#requests.get'
  }]);
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([{
    'type': 'json_loads',
    'message0': 'parse JSON string %1',
    'args0': [{
        'type': 'input_value',
        'name': 'JSON_STRING',
        'check': 'String',
        'colour': '#78909C'
      }],
    'output': [
      'Object',
      'Array'
    ],
    'colour': '#78909C',
    'tooltip': 'Deserialize a JSON string to a Python object.',
    'helpUrl': 'https://docs.python.org/3/library/json.html#json.loads'
  }]);
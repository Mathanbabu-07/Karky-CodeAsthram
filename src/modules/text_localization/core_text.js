import * as Blockly from 'blockly';
Blockly.defineBlocksWithJsonArray([
  {
    'type': 'text_normalize_unicode',
    'message0': 'normalize unicode %1 to form %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'TEXT',
        'check': 'String',
        'colour': '#D3425C'
      },
      {
        'type': 'field_dropdown',
        'name': 'FORM',
        'options': [
          [
            'NFC',
            'NFC'
          ],
          [
            'NFKC',
            'NFKC'
          ],
          [
            'NFD',
            'NFD'
          ],
          [
            'NFKD',
            'NFKD'
          ]
        ]
      }
    ],
    'output': 'String',
    'colour': '#D3425C',
    'tooltip': 'Normalizes Unicode text to a standard form.'
  },
  {
    'type': 'text_remove_accents',
    'message0': 'remove accents from %1',
    'args0': [{
        'type': 'input_value',
        'name': 'TEXT',
        'check': 'String',
        'colour': '#D3425C'
      }],
    'output': 'String',
    'colour': '#D3425C',
    'tooltip': 'Removes accents from a string.'
  },
  {
    'type': 'text_slugify',
    'message0': 'slugify %1',
    'args0': [{
        'type': 'input_value',
        'name': 'TEXT',
        'check': 'String',
        'colour': '#D3425C'
      }],
    'output': 'String',
    'colour': '#D3425C',
    'tooltip': 'Converts a string into a URL-friendly slug.'
  },
  {
    'type': 'text_fix_encoding',
    'message0': 'fix encoding of %1',
    'args0': [{
        'type': 'input_value',
        'name': 'TEXT',
        'check': 'String',
        'colour': '#D3425C'
      }],
    'output': 'String',
    'colour': '#D3425C',
    'tooltip': 'Fixes mojibake and other encoding issues in text.'
  }
]);
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "security_jwt_encode",
    "message0": "JWT encode payload %1 with key %2 algorithm %3",
    "args0": [
      { "type": "input_value", "name": "PAYLOAD", "check": "Object" },
      { "type": "input_value", "name": "KEY_REF", "check": "SecretRef" },
      { "type": "field_input", "name": "ALG", "text": "HS256" }
    ],
    "output": "String",
    "colour": 0,
    "tooltip": "Encodes a JWT token."
  },
  {
    "type": "security_jwt_decode",
    "message0": "JWT decode token %1 with key %2",
    "args0": [
      { "type": "input_value", "name": "TOKEN", "check": "String" },
      { "type": "input_value", "name": "KEY_REF", "check": "SecretRef" }
    ],
    "output": "Object",
    "colour": 0,
    "tooltip": "Decodes a JWT token."
  }
]);

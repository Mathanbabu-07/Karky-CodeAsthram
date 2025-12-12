import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "security_encrypt_sym",
    "message0": "symmetrically encrypt %1 with key %2",
    "args0": [
      { "type": "input_value", "name": "PLAINTEXT" },
      { "type": "input_value", "name": "KEY_REF", "check": "SecretRef" }
    ],
    "output": "Bytes",
    "colour": 0,
    "tooltip": "Symmetrically encrypts data."
  },
  {
    "type": "security_decrypt_sym",
    "message0": "symmetrically decrypt %1 with key %2",
    "args0": [
      { "type": "input_value", "name": "CIPHERTEXT", "check": "Bytes" },
      { "type": "input_value", "name": "KEY_REF", "check": "SecretRef" }
    ],
    "output": "Bytes",
    "colour": 0,
    "tooltip": "Symmetrically decrypts data."
  }
]);

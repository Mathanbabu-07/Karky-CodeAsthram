import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "security_hash_sha256",
    "message0": "hash sha256 of %1",
    "args0": [
      { "type": "input_value", "name": "DATA" }
    ],
    "output": "String",
    "colour": 0,
    "tooltip": "Hashes data using SHA256."
  },
  {
    "type": "security_hmac_sha256",
    "message0": "hmac sha256 with key %1 data %2",
    "args0": [
      { "type": "input_value", "name": "KEY", "check": "String" },
      { "type": "input_value", "name": "DATA" }
    ],
    "output": "String",
    "colour": 0,
    "tooltip": "Creates an HMAC-SHA256 signature."
  },
  {
    "type": "security_generate_random_bytes",
    "message0": "generate %1 random bytes",
    "args0": [
      { "type": "input_value", "name": "N", "check": "Number" }
    ],
    "output": "Bytes",
    "colour": 0,
    "tooltip": "Generates a number of random bytes."
  },
  {
    "type": "security_secrets_store_save",
    "message0": "in secrets store save key %1 with secret %2",
    "args0": [
      { "type": "input_value", "name": "KEY_NAME", "check": "String" },
      { "type": "input_value", "name": "SECRET_REF" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0,
    "tooltip": "Saves a secret to the secret store."
  },
  {
    "type": "security_secrets_get_ref",
    "message0": "get secret reference for key %1",
    "args0": [
      { "type": "input_value", "name": "KEY_NAME", "check": "String" }
    ],
    "output": "SecretRef",
    "colour": 0,
    "tooltip": "Gets a reference to a secret, not the secret itself."
  }
]);

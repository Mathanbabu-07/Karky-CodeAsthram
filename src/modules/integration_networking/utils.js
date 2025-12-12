import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "net_http_auth_basic",
    "message0": "HTTP basic auth with user %1 pass %2",
    "args0": [
      { "type": "input_value", "name": "USER", "check": "String" },
      { "type": "input_value", "name": "PASS", "check": "String" }
    ],
    "output": "Object",
    "colour": 20,
    "tooltip": "Creates a basic HTTP authentication header."
  },
  {
    "type": "net_http_auth_bearer",
    "message0": "HTTP bearer auth with token %1",
    "args0": [
      { "type": "input_value", "name": "TOKEN", "check": "String" }
    ],
    "output": "Object",
    "colour": 20,
    "tooltip": "Creates a bearer token HTTP authentication header."
  },
  {
    "type": "net_request_sign",
    "message0": "sign request with key %1 data %2",
    "args0": [
      { "type": "input_value", "name": "KEY", "check": "String" },
      { "type": "input_value", "name": "DATA", "check": "Object" }
    ],
    "output": "Object",
    "colour": 20,
    "tooltip": "Signs a request (e.g., for an API)."
  },
  {
    "type": "net_multipart_upload",
    "message0": "multipart upload with files %1 data %2",
    "args0": [
      { "type": "input_value", "name": "FILES", "check": "Object" },
      { "type": "input_value", "name": "DATA", "check": "Object" }
    ],
    "output": null,
    "colour": 20,
    "tooltip": "Constructs data for a multipart/form-data upload."
  }
]);

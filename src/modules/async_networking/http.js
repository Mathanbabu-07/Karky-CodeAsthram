import * as Blockly from 'blockly/core';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "http_request_simple",
    "message0": "%1 %2",
    "args0": [
      { "type": "field_dropdown", "name": "METHOD", "options": [["GET","get"],["POST","post"],["PUT","put"],["DELETE","delete"]] },
      { "type": "input_value", "name": "URL", "check": "String" }
    ],
    "message1": "params (dict) %1",
    "args1": [ { "type": "input_value", "name": "PARAMS" } ],
    "output": "Response",
    "colour": "#26A69A",
    "tooltip": "HTTP request via requests library. Returns response object.",
    "helpUrl": "https://requests.readthedocs.io/en/latest/"
  }
]);

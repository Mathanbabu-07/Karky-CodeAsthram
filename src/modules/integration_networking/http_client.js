import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "net_http_get",
    "message0": "HTTP GET url %1 params %2 headers %3",
    "args0": [
      { "type": "input_value", "name": "URL", "check": "String" },
      { "type": "input_value", "name": "PARAMS", "check": "Object" },
      { "type": "input_value", "name": "HEADERS", "check": "Object" }
    ],
    "output": "String",
    "colour": 20,
    "tooltip": "Performs an HTTP GET request."
  },
  {
    "type": "net_http_post",
    "message0": "HTTP POST url %1 headers %2 body %3",
    "args0": [
      { "type": "input_value", "name": "URL", "check": "String" },
      { "type": "input_value", "name": "HEADERS", "check": "Object" },
      { "type": "input_value", "name": "BODY" }
    ],
    "output": "String",
    "colour": 20,
    "tooltip": "Performs an HTTP POST request."
  },
  {
    "type": "net_http_json_get",
    "message0": "HTTP GET JSON from url %1",
    "args0": [
      { "type": "input_value", "name": "URL", "check": "String" }
    ],
    "output": "Object",
    "colour": 20,
    "tooltip": "Performs an HTTP GET request and parses the response as JSON."
  },
  {
    "type": "net_http_json_post",
    "message0": "HTTP POST JSON to url %1 with data %2",
    "args0": [
      { "type": "input_value", "name": "URL", "check": "String" },
      { "type": "input_value", "name": "DATA", "check": "Object" }
    ],
    "output": "Object",
    "colour": 20,
    "tooltip": "Performs an HTTP POST request with JSON data."
  },
  {
    "type": "net_http_download_file",
    "message0": "download file from url %1 to path %2",
    "args0": [
      { "type": "input_value", "name": "URL", "check": "String" },
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Downloads a file to the virtual file system."
  },
  {
    "type": "net_http_with_retry",
    "message0": "HTTP request %1 with retries %2 backoff factor %3",
    "args0": [
      { "type": "input_statement", "name": "REQUEST" },
      { "type": "input_value", "name": "RETRIES", "check": "Number" },
      { "type": "input_value", "name": "BACKOFF", "check": "Number" }
    ],
    "output": null,
    "colour": 20,
    "tooltip": "Wraps an HTTP request with a retry mechanism."
  },
  {
    "type": "net_http_rate_limit",
    "message0": "rate-limit HTTP requests to %1 per second",
    "args0": [
      { "type": "input_value", "name": "RATE", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Rate-limits HTTP requests."
  }
]);

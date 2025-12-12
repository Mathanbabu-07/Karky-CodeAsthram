// src/modules/async_networking/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "async_function",
    "message0": "async function %1 ( %2 )",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "my_async_function" },
      { "type": "field_input", "name": "PARAMS", "text": "" }
    ],
    "message1": "do %1",
    "args1": [
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2CA5E2",
    "tooltip": "Defines an asynchronous function."
  },
  {
    "type": "async_await",
    "message0": "await %1",
    "args0": [
      { "type": "input_value", "name": "FUTURE" }
    ],
    "output": null,
    "colour": "#2CA5E2",
    "tooltip": "Waits for an awaitable object (like an async function call) to complete.",
    "helpUrl": "https://docs.python.org/3/reference/expressions.html#await"
  },
  {
    "type": "async_http_get",
    "message0": "async GET from url %1 with headers %2",
    "args0": [
      { "type": "input_value", "name": "URL", "check": "String" },
      { "type": "input_value", "name": "HEADERS", "check": "Object" }
    ],
    "output": "Future",
    "colour": "#2CA5E2",
    "inputsInline": true,
    "tooltip": "Makes an asynchronous GET request to a whitelisted URL.",
    "helpUrl": ""
  },
  {
    "type": "async_http_post",
    "message0": "async POST to url %1 with data %2 json %3 headers %4",
    "args0": [
      { "type": "input_value", "name": "URL", "check": "String" },
      { "type": "input_value", "name": "DATA", "check": "Object" },
      { "type": "input_value", "name": "JSON", "check": "Object" },
      { "type": "input_value", "name": "HEADERS", "check": "Object" }
    ],
    "output": "Future",
    "colour": "#2CA5E2",
    "tooltip": "Makes an asynchronous POST request to a whitelisted URL.",
    "helpUrl": ""
  }
]);

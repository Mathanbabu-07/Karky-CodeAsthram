import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "concurrency_async_def",
    "message0": "async define %1 with parameters %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "my_async_function",
        "colour": "#FF7043"
      },
      {
        "type": "input_dummy",
        "name": "PARAMS"
      }
    ],
    "message1": "do %1",
    "args1": [{
        "type": "input_statement",
        "name": "DO"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7043",
    "tooltip": "Defines an asynchronous function."
  },
  {
    "type": "concurrency_await_block",
    "message0": "await %1",
    "args0": [{
        "type": "input_value",
        "name": "EXPR",
        "colour": "#FF7043"
      }],
    "output": null,
    "colour": "#FF7043",
    "tooltip": "Awaits an awaitable object."
  },
  {
    "type": "concurrency_async_sleep",
    "message0": "async sleep for %1 seconds",
    "args0": [{
        "type": "input_value",
        "name": "SECONDS",
        "check": "Number",
        "colour": "#FF7043"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7043",
    "tooltip": "Asynchronously sleeps for a number of seconds."
  },
  {
    "type": "concurrency_async_gather",
    "message0": "async gather %1",
    "args0": [{
        "type": "input_value",
        "name": "TASKS",
        "check": "Array",
        "colour": "#FF7043"
      }],
    "output": "Array",
    "colour": "#FF7043",
    "tooltip": "Gathers results from multiple awaitable objects."
  },
  {
    "type": "concurrency_async_http_get",
    "message0": "async HTTP GET url %1",
    "args0": [{
        "type": "input_value",
        "name": "URL",
        "check": "String",
        "colour": "#FF7043"
      }],
    "output": "Object",
    "colour": "#FF7043",
    "tooltip": "Performs an asynchronous HTTP GET request."
  }
]);
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "net_ws_connect",
    "message0": "connect to websocket at url %1 and store in %2",
    "args0": [
      { "type": "input_value", "name": "URL", "check": "String" },
      { "type": "field_variable", "name": "VAR", "variable": "ws" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Connects to a websocket server and stores the connection."
  },
  {
    "type": "net_ws_send",
    "message0": "send to websocket %1 message %2",
    "args0": [
      { "type": "input_value", "name": "CONN" },
      { "type": "input_value", "name": "MSG", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Sends a message to a websocket."
  },
  {
    "type": "net_ws_receive",
    "message0": "from websocket %1 receive message into %2",
    "args0": [
      { "type": "input_value", "name": "CONN" },
      { "type": "field_variable", "name": "VAR", "variable": "msg" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Receives a message from a websocket and stores it in a variable."
  },
  {
    "type": "net_ws_close",
    "message0": "close websocket connection %1",
    "args0": [
      { "type": "input_value", "name": "CONN" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Closes a websocket connection."
  }
]);

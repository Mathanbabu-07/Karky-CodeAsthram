import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "net_socket_connect",
    "message0": "connect socket to host %1 port %2",
    "args0": [
      { "type": "input_value", "name": "HOST", "check": "String" },
      { "type": "input_value", "name": "PORT", "check": "Number" }
    ],
    "output": "Socket",
    "colour": 20,
    "tooltip": "Connects to a socket. (Admin gated)"
  },
  {
    "type": "net_socket_send",
    "message0": "send to socket %1 data %2",
    "args0": [
      { "type": "input_value", "name": "CONN", "check": "Socket" },
      { "type": "input_value", "name": "DATA", "check": "Bytes" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Sends data to a socket."
  },
  {
    "type": "net_socket_receive",
    "message0": "receive from socket %1 max bytes %2",
    "args0": [
      { "type": "input_value", "name": "CONN", "check": "Socket" },
      { "type": "input_value", "name": "MAX_BYTES", "check": "Number" }
    ],
    "output": "Bytes",
    "colour": 20,
    "tooltip": "Receives data from a socket."
  },
  {
    "type": "net_socket_close",
    "message0": "close socket connection %1",
    "args0": [
      { "type": "input_value", "name": "CONN", "check": "Socket" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Closes a socket connection."
  }
]);

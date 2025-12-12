import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "net_pubsub_publish",
    "message0": "publish to channel %1 message %2",
    "args0": [
      { "type": "input_value", "name": "CHANNEL", "check": "String" },
      { "type": "input_value", "name": "MESSAGE", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Publishes a message to a channel."
  },
  {
    "type": "net_pubsub_subscribe",
    "message0": "subscribe to channel %1 with callback %2",
    "args0": [
      { "type": "input_value", "name": "CHANNEL", "check": "String" },
      { "type": "input_value", "name": "CALLBACK" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Subscribes to a channel with a callback function."
  },
  {
    "type": "net_pubsub_unsubscribe",
    "message0": "unsubscribe from channel %1",
    "args0": [
      { "type": "input_value", "name": "CHANNEL", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Unsubscribes from a channel."
  }
]);

import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "enterprise_ros_init_node",
    "message0": "init ROS node %1",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "my_ros_node" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 30,
    "tooltip": "Initializes a ROS node. (Admin gated)"
  },
  {
    "type": "enterprise_ros_publish",
    "message0": "ROS publish to topic %1 message %2",
    "args0": [
      { "type": "input_value", "name": "TOPIC", "check": "String" },
      { "type": "input_value", "name": "MSG", "check": "Object" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 30,
    "tooltip": "Publishes a message to a ROS topic."
  }
]);

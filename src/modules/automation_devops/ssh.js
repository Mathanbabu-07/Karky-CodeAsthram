import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "automation_ssh_connect",
    "message0": "connect SSH to host %1",
    "args0": [{
        "type": "input_value",
        "name": "HOST_REF",
        "check": "String",
        "colour": "#8D6E63"
      }],
    "output": "SSHConnection",
    "colour": "#8D6E63",
    "tooltip": "Connects to a host via SSH. (Admin gated)"
  },
  {
    "type": "automation_ssh_run",
    "message0": "on SSH connection %1 run command %2",
    "args0": [
      {
        "type": "input_value",
        "name": "CONN",
        "check": "SSHConnection",
        "colour": "#8D6E63"
      },
      {
        "type": "input_value",
        "name": "CMD",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#8D6E63",
    "tooltip": "Runs a command on a remote host via SSH."
  },
  {
    "type": "automation_scp_upload",
    "message0": "on SSH connection %1 upload from %2 to %3",
    "args0": [
      {
        "type": "input_value",
        "name": "CONN",
        "check": "SSHConnection",
        "colour": "#8D6E63"
      },
      {
        "type": "input_value",
        "name": "SRC",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "DST",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8D6E63",
    "tooltip": "Uploads a file to a remote host via SCP."
  },
  {
    "type": "automation_scp_download",
    "message0": "on SSH connection %1 download from %2 to %3",
    "args0": [
      {
        "type": "input_value",
        "name": "CONN",
        "check": "SSHConnection",
        "colour": "#8D6E63"
      },
      {
        "type": "input_value",
        "name": "SRC",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "DST",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8D6E63",
    "tooltip": "Downloads a file from a remote host via SCP."
  }
]);
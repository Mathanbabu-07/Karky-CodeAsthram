import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "automation_docker_run",
    "message0": "docker run image %1 with args %2",
    "args0": [
      {
        "type": "input_value",
        "name": "IMAGE",
        "check": "String",
        "colour": "#8D6E63"
      },
      {
        "type": "input_value",
        "name": "ARGS",
        "check": "Array"
      }
    ],
    "output": "String",
    "colour": "#8D6E63",
    "tooltip": "Runs a Docker container. (Admin gated)"
  },
  {
    "type": "automation_terraform_apply",
    "message0": "terraform apply plan %1",
    "args0": [{
        "type": "input_value",
        "name": "PLAN_REF",
        "colour": "#8D6E63"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8D6E63",
    "tooltip": "Applies a Terraform plan. (Admin gated)"
  },
  {
    "type": "automation_ansible_run",
    "message0": "ansible run playbook %1",
    "args0": [{
        "type": "input_value",
        "name": "PLAYBOOK_REF",
        "colour": "#8D6E63"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8D6E63",
    "tooltip": "Runs an Ansible playbook. (Admin gated)"
  }
]);
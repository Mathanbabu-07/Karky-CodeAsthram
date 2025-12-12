import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "automation_ci_trigger",
    "message0": "trigger CI job %1 with params %2",
    "args0": [
      {
        "type": "input_value",
        "name": "JOB_NAME",
        "check": "String",
        "colour": "#8D6E63"
      },
      {
        "type": "input_value",
        "name": "PARAMS",
        "check": "Object"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8D6E63",
    "tooltip": "Triggers a CI\/CD job."
  },
  {
    "type": "automation_artifact_upload",
    "message0": "upload artifact at path %1",
    "args0": [{
        "type": "input_value",
        "name": "PATH",
        "check": "String",
        "colour": "#8D6E63"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8D6E63",
    "tooltip": "Uploads a build artifact."
  },
  {
    "type": "automation_artifact_download",
    "message0": "download artifact with id %1",
    "args0": [{
        "type": "input_value",
        "name": "ID",
        "check": "String",
        "colour": "#8D6E63"
      }],
    "output": "String",
    "colour": "#8D6E63",
    "tooltip": "Downloads a build artifact and returns its path."
  }
]);
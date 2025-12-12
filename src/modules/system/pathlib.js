import * as Blockly from 'blockly/core';

/* Pathlib utilities block: dropdown for common Path methods.
   Methods supported (subset for safety):
   - cwd()
   - home()
   - joinpath(base, segment)
   - suffix(path)
   - stem(path)
   - parent(path)
*/

Blockly.defineBlocksWithJsonArray([
  {
    "type": "system_pathlib_util",
    "message0": "pathlib %1 %2 %3",
    "args0": [
      { "type": "field_dropdown", "name": "METHOD", "options": [
        ["cwd","cwd"], ["home","home"], ["joinpath","joinpath"], ["suffix","suffix"], ["stem","stem"], ["parent","parent"]
      ]},
      { "type": "input_value", "name": "ARG1" },
      { "type": "input_value", "name": "ARG2" }
    ],
    "output": null,
    "colour": "#546E7A",
    "tooltip": "Common pathlib helper. joinpath/base operations accept arguments; cwd/home ignore them.",
    "helpUrl": "https://docs.python.org/3/library/pathlib.html",
    "mutator": "pathlib_util_mutator"
  }
]);

const PathlibUtilMutator = {
  mutationToDom: function() {
    const method = this.getFieldValue('METHOD');
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('method', method);
    return container;
  },
  domToMutation: function(xml) {
    this.updateShape_();
  },
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('pathlib_util_arg_config');
    containerBlock.initSvg();
    return containerBlock;
  },
  compose: function() {
    this.updateShape_();
  },
  saveConnections: function() {},
  updateShape_: function() {
    const method = this.getFieldValue('METHOD');
    if (['cwd','home'].includes(method)) {
      if (this.getInput('ARG1')) this.removeInput('ARG1');
      if (this.getInput('ARG2')) this.removeInput('ARG2');
    } else if (method === 'joinpath') {
      if (!this.getInput('ARG1')) this.appendValueInput('ARG1').appendField('base');
      if (!this.getInput('ARG2')) this.appendValueInput('ARG2').appendField('segment');
    } else {
      if (!this.getInput('ARG1')) this.appendValueInput('ARG1').appendField('path');
      if (this.getInput('ARG2')) this.removeInput('ARG2');
    }
    if (this.rendered) this.render();
  }
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "pathlib_util_arg_config",
    "message0": "pathlib arg config (auto)",
    "colour": "#78909C",
    "tooltip": "Configuration container (auto).",
    "enableContextMenu": false
  }
]);

Blockly.Extensions.registerMutator('pathlib_util_mutator', PathlibUtilMutator, undefined, ['pathlib_util_arg_config']);

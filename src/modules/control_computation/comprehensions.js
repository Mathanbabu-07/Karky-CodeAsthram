import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "control_list_comp",
    "message0": "list comprehension [ %1 for %2 in %3 if %4 ]",
    "args0": [
      {
        "type": "input_value",
        "name": "EXPR"
      },
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "item"
      },
      {
        "type": "input_value",
        "name": "ITER"
      },
      {
        "type": "input_value",
        "name": "COND",
        "check": "Boolean"
      }
    ],
    "output": "Array",
    "colour": "#7E57C2",
    "tooltip": "Creates a list using a list comprehension."
  },
  {
    "type": "control_dict_zip_comp",
    "message0": "dict comprehension { %1 : %2 for %3, %4 in zip( %5 , %6 ) if %7 }",
    "args0": [
      { "type": "input_value", "name": "KEY_EXPR" },
      { "type": "input_value", "name": "VALUE_EXPR" },
      { "type": "field_variable", "name": "VAR1", "variable": "k" },
      { "type": "field_variable", "name": "VAR2", "variable": "v" },
      { "type": "input_value", "name": "ITER1" },
      { "type": "input_value", "name": "ITER2" },
      { "type": "input_value", "name": "COND", "check": "Boolean" }
    ],
    "output": "Object",
    "colour": "#7E57C2",
    "tooltip": "Dictionary comprehension over two sequences zipped together.",
    "mutator": "dict_zip_comp_mutator"
  },
  {
    "type": "control_dict_comp",
    "message0": "dictionary comprehension { %1 : %2 for %3 in %4 if %5 }",
    "args0": [
      {
        "type": "input_value",
        "name": "KEY_EXPR"
      },
      {
        "type": "input_value",
        "name": "VALUE_EXPR"
      },
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "item"
      },
      {
        "type": "input_value",
        "name": "ITER"
      },
      {
        "type": "input_value",
        "name": "COND",
        "check": "Boolean"
      }
    ],
    "output": "Object",
    "colour": "#7E57C2",
    "tooltip": "Creates a dictionary using a dictionary comprehension."
  },
  {
    "type": "control_set_comp",
    "message0": "set comprehension { %1 for %2 in %3 if %4 }",
    "args0": [
      {
        "type": "input_value",
        "name": "EXPR"
      },
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "item"
      },
      {
        "type": "input_value",
        "name": "ITER"
      },
      {
        "type": "input_value",
        "name": "COND",
        "check": "Boolean"
      }
    ],
    "output": "Set",
    "colour": "#7E57C2",
    "tooltip": "Creates a set using a set comprehension."
  },
  {
    "type": "control_gen_expr",
    "message0": "generator expression ( %1 for %2 in %3 if %4 )",
    "args0": [
      {
        "type": "input_value",
        "name": "EXPR"
      },
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "item"
      },
      {
        "type": "input_value",
        "name": "ITER"
      },
      {
        "type": "input_value",
        "name": "COND",
        "check": "Boolean"
      }
    ],
    "output": null,
    "colour": "#7E57C2",
    "tooltip": "Creates a generator expression."
  }
]);

// Mutator to optionally include condition in dict zip comprehension (object form)
const DictZipCompMutator = {
  mutationToDom: function() {
    const hasCond = !!this.getInput('COND');
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('hasCond', hasCond ? 'true' : 'false');
    return container;
  },
  domToMutation: function(xmlElement) {
    const hasCond = xmlElement.getAttribute('hasCond') === 'true';
    this.updateShape_(hasCond);
  },
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('dict_zip_comp_if_container');
    containerBlock.initSvg();
    const hasCond = !!this.getInput('COND');
    containerBlock.setFieldValue(hasCond ? 'TRUE' : 'FALSE', 'HAS_COND');
    return containerBlock;
  },
  compose: function(containerBlock) {
    const hasCond = containerBlock.getFieldValue('HAS_COND') === 'TRUE';
    this.updateShape_(hasCond);
  },
  saveConnections: function() {},
  updateShape_: function(hasCond) {
    const condInput = this.getInput('COND');
    if (hasCond) {
      if (!condInput) {
        this.appendValueInput('COND').setCheck('Boolean').appendField('if');
      }
    } else if (condInput) {
      this.removeInput('COND');
    }
    if (this.rendered) this.render();
  }
}

Blockly.defineBlocksWithJsonArray([
  {
    "type": "dict_zip_comp_if_container",
    "message0": "dict zip comprehension settings  include if filter %1",
    "args0": [
      { "type": "field_dropdown", "name": "HAS_COND", "options": [["yes","TRUE"],["no","FALSE"]] }
    ],
    "colour": "#9575CD",
    "tooltip": "Toggle optional if condition in zipped dict comprehension.",
    "enableContextMenu": false
  }
]);

Blockly.Extensions.registerMutator('dict_zip_comp_mutator', DictZipCompMutator, undefined, ['dict_zip_comp_if_container']);
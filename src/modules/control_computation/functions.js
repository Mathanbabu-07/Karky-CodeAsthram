import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "control_lambda_expr",
    "message0": "lambda %1 : %2",
    "args0": [
      {
        "type": "field_input",
        "name": "ARGS",
        "text": "x",
        "colour": "#7E57C2"
      },
      {
        "type": "input_value",
        "name": "EXPR"
      }
    ],
    "output": null,
    "colour": "#7E57C2",
    "tooltip": "Creates a lambda function."
  },
  {
    "type": "control_partial_apply",
    "message0": "partially apply function %1 with pre-filled args %2",
    "args0": [
      {
        "type": "input_value",
        "name": "FUNC",
        "colour": "#7E57C2"
      },
      {
        "type": "input_value",
        "name": "ARGS"
      }
    ],
    "output": null,
    "colour": "#7E57C2",
    "tooltip": "Creates a new function with some arguments pre-filled."
  },
  {
    "type": "control_function_decorator",
    "message0": "@ %1",
    "args0": [{
        "type": "input_value",
        "name": "DECORATOR",
        "colour": "#7E57C2"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Applies a decorator to a function definition."
  },
  {
    "type": "control_function_docstring",
    "message0": "docstring %1",
    "args0": [{
        "type": "field_input",
        "name": "DOCSTRING",
        "text": "",
        "colour": "#7E57C2"
      }],
    "previousStatement": null,
    "colour": "#7E57C2",
    "tooltip": "Adds a docstring to a function. Must be the first statement in a function."
  },
  {
    "type": "control_function_def",
    "message0": "define %1 with parameters %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "my_function"
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
    "message2": "return %1",
    "args2": [{
        "type": "input_value",
        "name": "RETURN"
      }],
    "colour": 290,
    "tooltip": "Defines a function with parameters.",
    "mutator": "control_function_def_mutator"
  },
  {
    "type": "control_return",
    "message0": "return %1",
    "args0": [ { "type": "input_value", "name": "VALUE" } ],
    "previousStatement": null,
    "colour": 290,
    "tooltip": "Return from the current function (use a tuple to return multiple values).",
    "helpUrl": "https://docs.python.org/3/reference/simple_stmts.html#the-return-statement"
  }
]);
import { createPlusField } from "..\/..\/plugins\/block-plus-minus\/field_plus";
import { createMinusField } from "..\/..\/plugins\/block-plus-minus\/field_minus";
const functionDefMutator = {
  paramCount_: 0,
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("params", this.paramCount_);
    return container;
  },
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute("params"), 10);
    this.updateShape_(targetCount);
  },
  saveExtraState: function () {
    return { paramCount: this.paramCount_ };
  },
  loadExtraState: function (state) {
    this.updateShape_(state["paramCount"]);
  },
  updateShape_: function (targetCount) {
    while (this.paramCount_ < targetCount) {
      this.addPart_();
    }
    while (this.paramCount_ > targetCount) {
      this.removePart_();
    }
  },
  plus: function () {
    this.addPart_();
  },
  minus: function (index) {
    this.removePart_(index);
  },
  addPart_: function () {
    const i = this.paramCount_;
    this.appendValueInput("PARAM" + i).appendField("parameter").appendField(new Blockly.FieldVariable("p" + i), "VAR" + i).appendField("default").appendField(createMinusField(i), "MINUS" + i);
    this.moveInputBefore("PARAM" + i, "DO");
    this.paramCount_++;
  },
  removePart_: function (index) {
    this.paramCount_--;
    this.removeInput("PARAM" + index);
  }
};
const functionDefHelper = function () {
  this.getInput("PARAMS").appendField(createPlusField(), "PLUS");
};
Blockly.Extensions.registerMutator("control_function_def_mutator", functionDefMutator, functionDefHelper);
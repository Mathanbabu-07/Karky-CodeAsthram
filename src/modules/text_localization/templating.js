import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "text_template_render_jinja",
    "message0": "render jinja template %1 with context %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TEMPLATE",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "CONTEXT",
        "check": "Object"
      }
    ],
    "output": "String",
    "colour": "#D3425C",
    "tooltip": "Renders a Jinja2 template."
  },
  {
    "type": "text_template_safe_render",
    "message0": "safely render template %1 with context %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TEMPLATE",
        "check": "String",
        "colour": "#D3425C"
      },
      {
        "type": "input_value",
        "name": "CONTEXT",
        "check": "Object"
      }
    ],
    "output": "String",
    "colour": "#D3425C",
    "tooltip": "Safely renders a template in a sandboxed environment."
  }
]);
import * as Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([
  {
    "type": "fastapi_create_app",
    "message0": "create FastAPI app",
    "output": "FastAPI",
    "colour": "#607D8B",
    "tooltip": "Creates a FastAPI application instance.",
    "helpUrl": "https://fastapi.tiangolo.com/tutorial/first-steps/"
  },
  {
    "type": "fastapi_post_endpoint",
    "message0": "create FastAPI POST endpoint at %1",
    "args0": [{
        "type": "field_input",
        "name": "PATH",
        "text": "/items/"
      }],
    "message1": "with request body model %1",
    "args1": [{
        "type": "input_value",
        "name": "MODEL",
        "check": "PydanticModel"
      }],
    "message2": "do %1",
    "args2": [{
        "type": "input_statement",
        "name": "DO"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#607D8B",
    "tooltip": "Creates a FastAPI POST endpoint with a Pydantic model for the request body.",
    "helpUrl": "https://fastapi.tiangolo.com/tutorial/body/"
  }
]);
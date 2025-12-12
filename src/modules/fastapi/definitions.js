import * as Blockly from 'blockly';

const fastapiCategory = 'Web Server';
const fastapiColour = '#009688';

// Block for creating a FastAPI application
Blockly.Blocks['fastapi_create_app'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("create FastAPI app");
    this.setOutput(true, "FastAPIApp");
    this.setColour(fastapiColour);
    this.setTooltip("Creates a new FastAPI application instance.");
    this.setHelpUrl("https://fastapi.tiangolo.com/tutorial/first-steps/");
  }
};

// Block for adding an endpoint to a FastAPI app
Blockly.Blocks['fastapi_add_endpoint'] = {
  init: function() {
    this.appendValueInput("APP")
        .setCheck("FastAPIApp")
        .appendField("On app");
    this.appendValueInput("PATH")
        .setCheck("String")
        .appendField("add endpoint at path");
    this.appendDummyInput()
        .appendField("for methods")
        .appendField(new Blockly.FieldDropdown([
            ["GET", "GET"],
            ["POST", "POST"],
            ["PUT", "PUT"],
            ["DELETE", "DELETE"]
        ]), "METHODS");
    this.appendStatementInput("HANDLER")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(fastapiColour);
    this.setTooltip("Adds a new endpoint to the FastAPI application.");
    this.setHelpUrl("https://fastapi.tiangolo.com/tutorial/path-params/");
  }
};

// Block for running the FastAPI server
Blockly.Blocks['fastapi_run_server'] = {
  init: function() {
    this.appendValueInput("APP")
        .setCheck("FastAPIApp")
        .appendField("run app");
    this.appendDummyInput()
        .appendField("on host")
        .appendField(new Blockly.FieldTextInput("127.0.0.1"), "HOST");
    this.appendDummyInput()
        .appendField("on port")
        .appendField(new Blockly.FieldTextInput("8000"), "PORT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(fastapiColour);
    this.setTooltip("Runs the FastAPI server. This is a blocking call.");
    this.setHelpUrl("https://www.uvicorn.org/deployment/");
  }
};

// Block for stopping the FastAPI server
Blockly.Blocks['fastapi_stop_server'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("stop FastAPI server");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(fastapiColour);
    this.setTooltip("Stops the currently running FastAPI server.");
    this.setHelpUrl("");
  }
};
import * as Blockly from 'blockly';

const requestsCategory = 'Networking';
const requestsColour = '#4A90E2';

// Block for making a GET request
Blockly.Blocks['requests_get'] = {
  init: function() {
    this.appendValueInput("URL")
        .setCheck("String")
        .appendField("GET request to URL");
    this.appendValueInput("HEADERS")
        .setCheck("Object")
        .appendField("with headers");
    this.appendValueInput("PARAMS")
        .setCheck("Object")
        .appendField("with params");
    this.setOutput(true, null);
    this.setColour(requestsColour);
    this.setTooltip("Makes a GET request to the specified URL.");
    this.setHelpUrl("https://requests.readthedocs.io/en/latest/user/quickstart/#make-a-request");
  }
};

// Block for making a POST request
Blockly.Blocks['requests_post'] = {
  init: function() {
    this.appendValueInput("URL")
        .setCheck("String")
        .appendField("POST request to URL");
    this.appendValueInput("JSON_DATA")
        .setCheck(null) // Can be Object (dict) or String
        .appendField("with JSON data");
    this.appendValueInput("HEADERS")
        .setCheck("Object")
        .appendField("with headers");
    this.setOutput(true, null);
    this.setColour(requestsColour);
    this.setTooltip("Makes a POST request with a JSON payload.");
    this.setHelpUrl("https://requests.readthedocs.io/en/latest/user/quickstart/#make-a-request");
  }
};

// Block for making a PUT request
Blockly.Blocks['requests_put'] = {
    init: function() {
      this.appendValueInput("URL")
          .setCheck("String")
          .appendField("PUT request to URL");
      this.appendValueInput("JSON_DATA")
          .setCheck(null)
          .appendField("with JSON data");
      this.appendValueInput("HEADERS")
          .setCheck("Object")
          .appendField("with headers");
      this.setOutput(true, null);
      this.setColour(requestsColour);
      this.setTooltip("Makes a PUT request to update a resource.");
      this.setHelpUrl("https://requests.readthedocs.io/en/latest/user/quickstart/#make-a-request");
    }
  };

// Block for making a DELETE request
Blockly.Blocks['requests_delete'] = {
    init: function() {
        this.appendValueInput("URL")
            .setCheck("String")
            .appendField("DELETE request to URL");
        this.appendValueInput("HEADERS")
            .setCheck("Object")
            .appendField("with headers");
        this.setOutput(true, null);
        this.setColour(requestsColour);
        this.setTooltip("Makes a DELETE request to remove a resource.");
        this.setHelpUrl("https://requests.readthedocs.io/en/latest/user/quickstart/#make-a-request");
    }
};

// Helper block to get a value from a request response
Blockly.Blocks['requests_get_response_value'] = {
    init: function() {
        this.appendValueInput("RESPONSE")
            .setCheck(null)
            .appendField("In response");
        this.appendValueInput("KEY")
            .setCheck("String")
            .appendField("get value for key");
        this.setOutput(true, null);
        this.setColour(requestsColour);
        this.setTooltip("Gets a value from a JSON response dictionary using a key.");
        this.setHelpUrl("");
    }
};
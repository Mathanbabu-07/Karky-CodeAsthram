import * as Blockly from 'blockly/core';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "list_advanced_method",
    "message0": "list %1 . %2",
    "args0": [
      { "type": "input_value", "name": "LIST", "check": "Array" },
      {
        "type": "field_dropdown",
        "name": "METHOD",
        "options": [
          ["copy()", "COPY"],
          ["clear()", "CLEAR"]
        ]
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "List methods: copy() returns a shallow copy, clear() removes all items.",
    "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html"
  },
  {
    "type": "list_item_operation",
    "message0": "list %1 . %2",
    "args0": [
      { "type": "input_value", "name": "LIST", "check": "Array" },
      {
        "type": "field_dropdown",
        "name": "OPERATION",
        "options": [
          ["append", "APPEND"],
          ["extend with", "EXTEND"],
          ["insert at", "INSERT"],
          ["remove", "REMOVE"],
          ["pop", "POP"],
          ["count", "COUNT"]
        ]
      }
    ],
    "message1": "value %1",
    "args1": [{ "type": "input_value", "name": "VALUE" }],
    "message2": "index %1",
    "args2": [{ "type": "input_value", "name": "INDEX", "check": "Number" }],
    "inputsInline": true,
    "output": null,
    "colour": "#4D6A94",
    "tooltip": "List item operations: append, extend, insert, remove, pop, count.",
    "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html",
    "extensions": ["list_item_operation_extension"]
  }
]);

// Extension to show/hide inputs based on dropdown
if (Blockly.Extensions.isRegistered('list_item_operation_extension')) {
  Blockly.Extensions.unregister('list_item_operation_extension');
}
Blockly.Extensions.register('list_item_operation_extension', function() {
  const updateShape = () => {
    const op = this.getFieldValue('OPERATION');
    const valueInput = this.getInput('VALUE');
    const indexInput = this.getInput('INDEX');
    
    // Show VALUE for all except POP
    if (valueInput) valueInput.setVisible(op !== 'POP');
    
    // Show INDEX only for INSERT and POP
    if (indexInput) indexInput.setVisible(op === 'INSERT' || op === 'POP');
    
    // Set output type
    if (op === 'COUNT' || op === 'POP') {
      this.setOutput(true, null);
      if (this.previousConnection) {
        this.previousConnection.dispose();
        this.previousConnection = null;
      }
      if (this.nextConnection) {
        this.nextConnection.dispose();
        this.nextConnection = null;
      }
    } else {
      this.setOutput(false);
      if (!this.previousConnection) {
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      }
    }
  };
  
  this.getField('OPERATION').setValidator(function(newVal) {
    updateShape.call(this.getSourceBlock());
    return newVal;
  });
  
  updateShape.call(this);
});

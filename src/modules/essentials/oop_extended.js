import * as Blockly from "blockly/core";

// ==============================================================================
// OOP Extended Blocks - Object Member Access & Method Calls
// ==============================================================================

Blockly.defineBlocksWithJsonArray([
    // Issue 1: Access/assign object variables using self
    {
        "type": "oop_self_set_attribute",
        "message0": "set self.%1 to %2",
        "args0": [
            { "type": "field_input", "name": "ATTR", "text": "attribute" },
            { "type": "input_value", "name": "VALUE", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Assign a value to an object attribute using self.attribute = value",
        "helpUrl": "https://docs.python.org/3/tutorial/classes.html"
    },
    {
        "type": "oop_self_get_attribute",
        "message0": "self.%1",
        "args0": [
            { "type": "field_input", "name": "ATTR", "text": "attribute" }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Get the value of an object attribute using self.attribute",
        "helpUrl": "https://docs.python.org/3/tutorial/classes.html"
    },

    // Issue 2: Call methods on objects using self
    {
        "type": "oop_self_call_method",
        "message0": "self.%1 ( %2 )",
        "args0": [
            { "type": "field_input", "name": "METHOD", "text": "method" },
            { "type": "input_value", "name": "ARGS", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Call a method on self with arguments",
        "helpUrl": "https://docs.python.org/3/tutorial/classes.html"
    },
    {
        "type": "oop_self_call_method_statement",
        "message0": "call self.%1 ( %2 )",
        "args0": [
            { "type": "field_input", "name": "METHOD", "text": "method" },
            { "type": "input_value", "name": "ARGS", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Call a method on self with arguments as a statement",
        "helpUrl": "https://docs.python.org/3/tutorial/classes.html"
    },

    // Issue 4: Call method on class object (object.method())
    {
        "type": "oop_object_call_method",
        "message0": "%1.%2 ( %3 )",
        "args0": [
            { "type": "input_value", "name": "OBJECT", "check": null },
            { "type": "field_input", "name": "METHOD", "text": "method" },
            { "type": "input_value", "name": "ARGS", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Call a method on an object with arguments",
        "helpUrl": "https://docs.python.org/3/tutorial/classes.html"
    },
    {
        "type": "oop_object_call_method_statement",
        "message0": "call %1.%2 ( %3 )",
        "args0": [
            { "type": "input_value", "name": "OBJECT", "check": null },
            { "type": "field_input", "name": "METHOD", "text": "method" },
            { "type": "input_value", "name": "ARGS", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Call a method on an object with arguments as a statement",
        "helpUrl": "https://docs.python.org/3/tutorial/classes.html"
    },

    // Get/Set object attribute (for any object, not just self)
    {
        "type": "oop_object_set_attribute",
        "message0": "set %1.%2 to %3",
        "args0": [
            { "type": "input_value", "name": "OBJECT", "check": null },
            { "type": "field_input", "name": "ATTR", "text": "attribute" },
            { "type": "input_value", "name": "VALUE", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Set an attribute on any object",
        "helpUrl": "https://docs.python.org/3/tutorial/classes.html"
    },
    {
        "type": "oop_object_get_attribute",
        "message0": "%1.%2",
        "args0": [
            { "type": "input_value", "name": "OBJECT", "check": null },
            { "type": "field_input", "name": "ATTR", "text": "attribute" }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Get an attribute from any object",
        "helpUrl": "https://docs.python.org/3/tutorial/classes.html"
    },

    // Issue 3: Return inside condition
    {
        "type": "oop_return_conditional",
        "message0": "return %1",
        "args0": [
            { "type": "input_value", "name": "VALUE", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Return a value (can be used inside conditionals or anywhere)",
        "helpUrl": "https://docs.python.org/3/reference/simple_stmts.html#return"
    },

    // Issue 5: Custom expression / direct code
    {
        "type": "oop_custom_expression",
        "message0": "expression: %1",
        "args0": [
            { "type": "field_input", "name": "CODE", "text": "x + y" }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Write a custom Python expression directly. Use with caution.",
        "helpUrl": "https://docs.python.org/3/reference/expressions.html"
    },
    {
        "type": "oop_custom_statement",
        "message0": "code: %1",
        "args0": [
            { "type": "field_input", "name": "CODE", "text": "print('hello')" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Write a custom Python statement directly. Use with caution.",
        "helpUrl": "https://docs.python.org/3/reference/simple_stmts.html"
    }
]);


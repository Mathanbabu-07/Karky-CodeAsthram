import * as Blockly from "blockly/core";

// ==============================================================================
// Built-in Data Structure Methods - Issue 6
// ==============================================================================

Blockly.defineBlocksWithJsonArray([
    // ============================================================================
    // List Methods
    // ============================================================================
    {
        "type": "list_method_append",
        "message0": "%1 . append ( %2 )",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "input_value", "name": "ITEM", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Append an item to the end of a list",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        "type": "list_method_pop",
        "message0": "%1 . pop ( %2 )",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "input_value", "name": "INDEX", "check": "Number" }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Remove and return item at index (default -1)",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        "type": "list_method_remove",
        "message0": "%1 . remove ( %2 )",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "input_value", "name": "ITEM", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Remove first occurrence of item from list",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        "type": "list_method_insert",
        "message0": "%1 . insert ( %2 , %3 )",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "input_value", "name": "INDEX", "check": "Number" },
            { "type": "input_value", "name": "ITEM", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Insert item at specified index",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        "type": "list_method_extend",
        "message0": "%1 . extend ( %2 )",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "input_value", "name": "ITERABLE", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Extend list by appending all items from iterable",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        "type": "list_method_clear",
        "message0": "%1 . clear ( )",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Remove all items from list",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        "type": "list_method_count",
        "message0": "%1 . count ( %2 )",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "input_value", "name": "ITEM", "check": null }
        ],
        "output": "Number",
        "colour": "#4D6A94",
        "tooltip": "Return number of times item appears in list",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        "type": "list_method_sort",
        "message0": "%1 . sort ( reverse=%2 )",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "field_dropdown", "name": "REVERSE", "options": [["False", "False"], ["True", "True"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Sort list in place",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        "type": "list_method_reverse",
        "message0": "%1 . reverse ( )",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Reverse list in place",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        "type": "list_method_copy",
        "message0": "%1 . copy ( )",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Return a shallow copy of the list",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },

    // ============================================================================
    // Tuple Methods
    // ============================================================================
    {
        "type": "tuple_method_count",
        "message0": "%1 . count ( %2 )",
        "args0": [
            { "type": "input_value", "name": "TUPLE", "check": null },
            { "type": "input_value", "name": "ITEM", "check": null }
        ],
        "output": "Number",
        "colour": "#4D6A94",
        "tooltip": "Return number of times item appears in tuple",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        "type": "tuple_method_index",
        "message0": "%1 . index ( %2 )",
        "args0": [
            { "type": "input_value", "name": "TUPLE", "check": null },
            { "type": "input_value", "name": "ITEM", "check": null }
        ],
        "output": "Number",
        "colour": "#4D6A94",
        "tooltip": "Return index of first occurrence of item",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },

    // ============================================================================
    // Set Methods
    // ============================================================================
    {
        "type": "set_method_add",
        "message0": "%1 . add ( %2 )",
        "args0": [
            { "type": "input_value", "name": "SET", "check": null },
            { "type": "input_value", "name": "ITEM", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Add an element to the set",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },
    {
        "type": "set_method_remove",
        "message0": "%1 . remove ( %2 )",
        "args0": [
            { "type": "input_value", "name": "SET", "check": null },
            { "type": "input_value", "name": "ITEM", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Remove element from set (raises KeyError if not found)",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },
    {
        "type": "set_method_discard",
        "message0": "%1 . discard ( %2 )",
        "args0": [
            { "type": "input_value", "name": "SET", "check": null },
            { "type": "input_value", "name": "ITEM", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Remove element from set (no error if not found)",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },
    {
        "type": "set_method_pop",
        "message0": "%1 . pop ( )",
        "args0": [
            { "type": "input_value", "name": "SET", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Remove and return an arbitrary element from set",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },
    {
        "type": "set_method_clear",
        "message0": "%1 . clear ( )",
        "args0": [
            { "type": "input_value", "name": "SET", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Remove all elements from set",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },
    {
        "type": "set_method_union",
        "message0": "%1 . union ( %2 )",
        "args0": [
            { "type": "input_value", "name": "SET", "check": null },
            { "type": "input_value", "name": "OTHER", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Return union of two sets",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },
    {
        "type": "set_method_intersection",
        "message0": "%1 . intersection ( %2 )",
        "args0": [
            { "type": "input_value", "name": "SET", "check": null },
            { "type": "input_value", "name": "OTHER", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Return intersection of two sets",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },
    {
        "type": "set_method_difference",
        "message0": "%1 . difference ( %2 )",
        "args0": [
            { "type": "input_value", "name": "SET", "check": null },
            { "type": "input_value", "name": "OTHER", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Return difference of two sets",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },
    {
        "type": "set_method_update",
        "message0": "%1 . update ( %2 )",
        "args0": [
            { "type": "input_value", "name": "SET", "check": null },
            { "type": "input_value", "name": "OTHER", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Update set with union of itself and another",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },

    // ============================================================================
    // Dictionary Methods
    // ============================================================================
    {
        "type": "dict_method_get",
        "message0": "%1 . get ( %2 , %3 )",
        "args0": [
            { "type": "input_value", "name": "DICT", "check": null },
            { "type": "input_value", "name": "KEY", "check": null },
            { "type": "input_value", "name": "DEFAULT", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Get value for key, or default if key not found",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        "type": "dict_method_keys",
        "message0": "%1 . keys ( )",
        "args0": [
            { "type": "input_value", "name": "DICT", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Return dictionary keys as a view",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        "type": "dict_method_values",
        "message0": "%1 . values ( )",
        "args0": [
            { "type": "input_value", "name": "DICT", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Return dictionary values as a view",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        "type": "dict_method_items",
        "message0": "%1 . items ( )",
        "args0": [
            { "type": "input_value", "name": "DICT", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Return dictionary items (key-value pairs) as a view",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        "type": "dict_method_pop",
        "message0": "%1 . pop ( %2 , %3 )",
        "args0": [
            { "type": "input_value", "name": "DICT", "check": null },
            { "type": "input_value", "name": "KEY", "check": null },
            { "type": "input_value", "name": "DEFAULT", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Remove key and return its value, or default if not found",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        "type": "dict_method_update",
        "message0": "%1 . update ( %2 )",
        "args0": [
            { "type": "input_value", "name": "DICT", "check": null },
            { "type": "input_value", "name": "OTHER", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Update dictionary with key-value pairs from another dict",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        "type": "dict_method_clear",
        "message0": "%1 . clear ( )",
        "args0": [
            { "type": "input_value", "name": "DICT", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Remove all items from dictionary",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        "type": "dict_method_setdefault",
        "message0": "%1 . setdefault ( %2 , %3 )",
        "args0": [
            { "type": "input_value", "name": "DICT", "check": null },
            { "type": "input_value", "name": "KEY", "check": null },
            { "type": "input_value", "name": "DEFAULT", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Get value for key, or set and return default if not found",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        "type": "dict_method_popitem",
        "message0": "%1 . popitem ( )",
        "args0": [
            { "type": "input_value", "name": "DICT", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Remove and return an arbitrary (key, value) pair",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    }
]);

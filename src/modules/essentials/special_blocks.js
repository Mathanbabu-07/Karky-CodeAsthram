import * as Blockly from "blockly/core";

// ==============================================================================
// Special Blocks for Issues 7-10
// ==============================================================================

Blockly.defineBlocksWithJsonArray([
    // ============================================================================
    // Issue 7: Initialize list with object (e.g., queue = [self.root])
    // ============================================================================
    {
        "type": "list_create_with_values",
        "message0": "create list [ %1 ]",
        "args0": [
            { "type": "input_value", "name": "ITEMS", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Create a list with initial values (can include object attributes)",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        "type": "list_create_single_item",
        "message0": "[ %1 ]",
        "args0": [
            { "type": "input_value", "name": "ITEM", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Create a list with a single item (e.g., [self.root])",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },

    // ============================================================================
    // Issue 8: CSV Writer Blocks
    // ============================================================================
    {
        "type": "csv_writer_create",
        "message0": "create CSV writer for file %1",
        "args0": [
            { "type": "input_value", "name": "FILE", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Create a CSV writer object for a file",
        "helpUrl": "https://docs.python.org/3/library/csv.html"
    },
    {
        "type": "csv_writer_writerow",
        "message0": "%1 . writerow ( %2 )",
        "args0": [
            { "type": "input_value", "name": "WRITER", "check": null },
            { "type": "input_value", "name": "ROW", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Write a single row to CSV file",
        "helpUrl": "https://docs.python.org/3/library/csv.html#csv.writer.writerow"
    },
    {
        "type": "csv_writer_writerows",
        "message0": "%1 . writerows ( %2 )",
        "args0": [
            { "type": "input_value", "name": "WRITER", "check": null },
            { "type": "input_value", "name": "ROWS", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Write multiple rows to CSV file",
        "helpUrl": "https://docs.python.org/3/library/csv.html#csv.writer.writerows"
    },
    {
        "type": "csv_dictwriter_create",
        "message0": "create CSV DictWriter for file %1 with fieldnames %2",
        "args0": [
            { "type": "input_value", "name": "FILE", "check": null },
            { "type": "input_value", "name": "FIELDNAMES", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Create a CSV DictWriter object",
        "helpUrl": "https://docs.python.org/3/library/csv.html#csv.DictWriter"
    },
    {
        "type": "csv_dictwriter_writeheader",
        "message0": "%1 . writeheader ( )",
        "args0": [
            { "type": "input_value", "name": "WRITER", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Write the header row to CSV file",
        "helpUrl": "https://docs.python.org/3/library/csv.html#csv.DictWriter.writeheader"
    },
    {
        "type": "csv_reader_create",
        "message0": "create CSV reader for file %1",
        "args0": [
            { "type": "input_value", "name": "FILE", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Create a CSV reader object",
        "helpUrl": "https://docs.python.org/3/library/csv.html#csv.reader"
    },

    // ============================================================================
    // Issue 9: Check if file exists
    // ============================================================================
    {
        "type": "file_exists_check",
        "message0": "file %1 exists",
        "args0": [
            { "type": "input_value", "name": "PATH", "check": "String" }
        ],
        "output": "Boolean",
        "colour": "#4D6A94",
        "tooltip": "Check if a file or directory exists using os.path.exists",
        "helpUrl": "https://docs.python.org/3/library/os.path.html#os.path.exists"
    },
    {
        "type": "file_isfile_check",
        "message0": "%1 is a file",
        "args0": [
            { "type": "input_value", "name": "PATH", "check": "String" }
        ],
        "output": "Boolean",
        "colour": "#4D6A94",
        "tooltip": "Check if path is a file using os.path.isfile",
        "helpUrl": "https://docs.python.org/3/library/os.path.html#os.path.isfile"
    },
    {
        "type": "file_isdir_check",
        "message0": "%1 is a directory",
        "args0": [
            { "type": "input_value", "name": "PATH", "check": "String" }
        ],
        "output": "Boolean",
        "colour": "#4D6A94",
        "tooltip": "Check if path is a directory using os.path.isdir",
        "helpUrl": "https://docs.python.org/3/library/os.path.html#os.path.isdir"
    },

    // ============================================================================
    // Issue 10: Access 2D list element
    // ============================================================================
    {
        "type": "list_2d_get",
        "message0": "%1 [ %2 ] [ %3 ]",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "input_value", "name": "ROW", "check": "Number" },
            { "type": "input_value", "name": "COL", "check": "Number" }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Access element in 2D list (e.g., board[i][col])",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions"
    },
    {
        "type": "list_2d_set",
        "message0": "set %1 [ %2 ] [ %3 ] to %4",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "input_value", "name": "ROW", "check": "Number" },
            { "type": "input_value", "name": "COL", "check": "Number" },
            { "type": "input_value", "name": "VALUE", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Set element in 2D list (e.g., board[i][col] = value)",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions"
    },
    {
        "type": "list_2d_create",
        "message0": "create 2D list with %1 rows and %2 columns, initial value %3",
        "args0": [
            { "type": "input_value", "name": "ROWS", "check": "Number" },
            { "type": "input_value", "name": "COLS", "check": "Number" },
            { "type": "input_value", "name": "VALUE", "check": null }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Create a 2D list (matrix) with specified dimensions",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions"
    },

    // Additional utility blocks for better integration
    {
        "type": "list_nd_get",
        "message0": "%1 %2",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "field_input", "name": "INDICES", "text": "[0][0]" }
        ],
        "output": null,
        "colour": "#4D6A94",
        "tooltip": "Access multi-dimensional list element using custom indices (e.g., [i][j][k])",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html"
    },
    {
        "type": "list_nd_set",
        "message0": "set %1 %2 to %3",
        "args0": [
            { "type": "input_value", "name": "LIST", "check": null },
            { "type": "field_input", "name": "INDICES", "text": "[0][0]" },
            { "type": "input_value", "name": "VALUE", "check": null }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4D6A94",
        "tooltip": "Set multi-dimensional list element using custom indices",
        "helpUrl": "https://docs.python.org/3/tutorial/datastructures.html"
    }
]);

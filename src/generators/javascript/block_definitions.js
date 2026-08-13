import * as Blockly from 'blockly/core';

// Register JavaScript specific blocks
Blockly.defineBlocksWithJsonArray([
  // JS Variables & Types
  {
    "type": "js_var_let",
    "message0": "let %1 = %2",
    "args0": [
      { "type": "field_input", "name": "VAR", "text": "x" },
      { "type": "input_value", "name": "VALUE" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variable_blocks",
    "tooltip": "Declare a block-scoped variable with let"
  },
  {
    "type": "js_var_const",
    "message0": "const %1 = %2",
    "args0": [
      { "type": "field_input", "name": "VAR", "text": "PI" },
      { "type": "input_value", "name": "VALUE" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variable_blocks",
    "tooltip": "Declare a constant variable with const"
  },
  {
    "type": "js_var_assign",
    "message0": "%1 = %2",
    "args0": [
      { "type": "field_input", "name": "VAR", "text": "x" },
      { "type": "input_value", "name": "VALUE" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variable_blocks",
    "tooltip": "Assign a value to a variable"
  },
  {
    "type": "js_typeof",
    "message0": "typeof %1",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "output": "String",
    "style": "variable_blocks",
    "tooltip": "Get the type of a value"
  },
  {
    "type": "js_type_convert",
    "message0": "convert %1 to %2",
    "args0": [
      { "type": "input_value", "name": "VALUE" },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["Number", "Number"],
          ["String", "String"],
          ["Boolean", "Boolean"],
          ["parseInt", "parseInt"],
          ["parseFloat", "parseFloat"]
        ]
      }
    ],
    "output": null,
    "style": "variable_blocks",
    "tooltip": "Convert a value to a different type"
  },

  // JS Operators & Logic
  {
    "type": "js_math_arithmetic",
    "message0": "%1 %2 %3",
    "args0": [
      { "type": "input_value", "name": "A" },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["+", "+"],
          ["-", "-"],
          ["*", "*"],
          ["/", "/"],
          ["%", "%"],
          ["** (power)", "**"]
        ]
      },
      { "type": "input_value", "name": "B" }
    ],
    "output": "Number",
    "style": "math_blocks",
    "tooltip": "Perform arithmetic operations"
  },
  {
    "type": "js_logic_compare",
    "message0": "%1 %2 %3",
    "args0": [
      { "type": "input_value", "name": "A" },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["===", "==="],
          ["!==", "!=="],
          [">", ">"],
          ["<", "<"],
          [">=", ">="],
          ["<=", "<="]
        ]
      },
      { "type": "input_value", "name": "B" }
    ],
    "output": "Boolean",
    "style": "logic_blocks",
    "tooltip": "Strict equality and comparison operators"
  },
  {
    "type": "js_logic_operation",
    "message0": "%1 %2 %3",
    "args0": [
      { "type": "input_value", "name": "A" },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["&& (AND)", "&&"],
          ["|| (OR)", "||"]
        ]
      },
      { "type": "input_value", "name": "B" }
    ],
    "output": "Boolean",
    "style": "logic_blocks",
    "tooltip": "Logical operations"
  },
  {
    "type": "js_nullish_coalescing",
    "message0": "%1 ?? %2",
    "args0": [
      { "type": "input_value", "name": "A" },
      { "type": "input_value", "name": "B" }
    ],
    "output": null,
    "style": "logic_blocks",
    "tooltip": "Nullish coalescing operator"
  },
  {
    "type": "js_optional_chaining",
    "message0": "%1?.%2",
    "args0": [
      { "type": "input_value", "name": "OBJ" },
      { "type": "field_input", "name": "PROP", "text": "property" }
    ],
    "output": null,
    "style": "logic_blocks",
    "tooltip": "Optional chaining operator"
  },

  // JS Control & Loops
  {
    "type": "js_if_else",
    "message0": "if %1",
    "args0": [{ "type": "input_value", "name": "COND", "check": "Boolean" }],
    "message1": "do %1",
    "args1": [{ "type": "input_statement", "name": "THEN" }],
    "message2": "else %1",
    "args2": [{ "type": "input_statement", "name": "ELSE" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "logic_blocks",
    "tooltip": "If / Else condition"
  },
  {
    "type": "js_switch",
    "message0": "switch %1",
    "args0": [{ "type": "input_value", "name": "VAL" }],
    "message1": "do %1",
    "args1": [{ "type": "input_statement", "name": "CASES" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "logic_blocks",
    "tooltip": "Switch statement"
  },
  {
    "type": "js_for_loop",
    "message0": "for let %1 = %2 to %3 step %4",
    "args0": [
      { "type": "field_input", "name": "VAR", "text": "i" },
      { "type": "input_value", "name": "FROM" },
      { "type": "input_value", "name": "TO" },
      { "type": "input_value", "name": "STEP" }
    ],
    "message1": "do %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "tooltip": "Standard index for loop"
  },
  {
    "type": "js_for_of",
    "message0": "for const %1 of %2",
    "args0": [
      { "type": "field_input", "name": "ITEM", "text": "item" },
      { "type": "input_value", "name": "LIST" }
    ],
    "message1": "do %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "tooltip": "for...of loop for arrays"
  },
  {
    "type": "js_for_in",
    "message0": "for const %1 in %2",
    "args0": [
      { "type": "field_input", "name": "KEY", "text": "key" },
      { "type": "input_value", "name": "OBJ" }
    ],
    "message1": "do %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "tooltip": "for...in loop for objects"
  },
  {
    "type": "js_while",
    "message0": "while %1",
    "args0": [{ "type": "input_value", "name": "COND", "check": "Boolean" }],
    "message1": "do %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "tooltip": "While loop"
  },
  {
    "type": "js_break_continue",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ACTION",
        "options": [
          ["break", "break"],
          ["continue", "continue"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "tooltip": "Break or continue loop"
  },

  // JS Functions & Scope
  {
    "type": "js_function_decl",
    "message0": "function %1 ( %2 )",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "myFunction" },
      { "type": "field_input", "name": "PARAMS", "text": "a, b" }
    ],
    "message1": "body %1",
    "args1": [{ "type": "input_statement", "name": "BODY" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "procedure_blocks",
    "tooltip": "Declare a function"
  },
  {
    "type": "js_arrow_function",
    "message0": "( %1 ) =>",
    "args0": [
      { "type": "field_input", "name": "PARAMS", "text": "x, y" }
    ],
    "message1": "body %1",
    "args1": [{ "type": "input_statement", "name": "BODY" }],
    "output": null,
    "style": "procedure_blocks",
    "tooltip": "Arrow function expression"
  },
  {
    "type": "js_function_call",
    "message0": "call %1 ( %2 )",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "myFunction" },
      { "type": "input_value", "name": "ARGS" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "procedure_blocks",
    "tooltip": "Call a function"
  },
  {
    "type": "js_return",
    "message0": "return %1",
    "args0": [{ "type": "input_value", "name": "VALUE" }],
    "previousStatement": null,
    "style": "procedure_blocks",
    "tooltip": "Return value from function"
  },

  // JS Arrays & Methods
  {
    "type": "js_array_create",
    "message0": "[ %1 ]",
    "args0": [{ "type": "field_input", "name": "ITEMS", "text": "1, 2, 3" }],
    "output": "Array",
    "style": "list_blocks",
    "tooltip": "Create an array"
  },
  {
    "type": "js_array_push_pop",
    "message0": "%1 . %2 ( %3 )",
    "args0": [
      { "type": "input_value", "name": "ARR" },
      {
        "type": "field_dropdown",
        "name": "ACTION",
        "options": [
          ["push", "push"],
          ["pop", "pop"],
          ["shift", "shift"],
          ["unshift", "unshift"]
        ]
      },
      { "type": "input_value", "name": "VAL" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "Array push or pop"
  },
  {
    "type": "js_array_get_set",
    "message0": "%1 [ %2 ]",
    "args0": [
      { "type": "input_value", "name": "ARR" },
      { "type": "input_value", "name": "INDEX" }
    ],
    "output": null,
    "style": "list_blocks",
    "tooltip": "Get array element by index"
  },
  {
    "type": "js_array_length",
    "message0": "%1 .length",
    "args0": [{ "type": "input_value", "name": "ARR" }],
    "output": "Number",
    "style": "list_blocks",
    "tooltip": "Get array length"
  },
  {
    "type": "js_array_map_filter",
    "message0": "%1 . %2 ( %3 )",
    "args0": [
      { "type": "input_value", "name": "ARR" },
      {
        "type": "field_dropdown",
        "name": "METHOD",
        "options": [
          ["map", "map"],
          ["filter", "filter"],
          ["reduce", "reduce"],
          ["forEach", "forEach"]
        ]
      },
      { "type": "input_value", "name": "CALLBACK" }
    ],
    "output": "Array",
    "style": "list_blocks",
    "tooltip": "Array iterator method"
  },
  {
    "type": "js_array_includes",
    "message0": "%1 .includes ( %2 )",
    "args0": [
      { "type": "input_value", "name": "ARR" },
      { "type": "input_value", "name": "VAL" }
    ],
    "output": "Boolean",
    "style": "list_blocks",
    "tooltip": "Check if array includes value"
  },

  // JS Objects & JSON
  {
    "type": "js_object_create",
    "message0": "{ %1 }",
    "args0": [{ "type": "field_input", "name": "JSON_STR", "text": "key: 'value'" }],
    "output": "Object",
    "style": "variable_blocks",
    "tooltip": "Create an object literal"
  },
  {
    "type": "js_object_get_set",
    "message0": "%1 . %2",
    "args0": [
      { "type": "input_value", "name": "OBJ" },
      { "type": "field_input", "name": "PROP", "text": "property" }
    ],
    "output": null,
    "style": "variable_blocks",
    "tooltip": "Get object property"
  },
  {
    "type": "js_json_stringify",
    "message0": "JSON.stringify ( %1 )",
    "args0": [{ "type": "input_value", "name": "OBJ" }],
    "output": "String",
    "style": "text_blocks",
    "tooltip": "Convert object to JSON string"
  },
  {
    "type": "js_json_parse",
    "message0": "JSON.parse ( %1 )",
    "args0": [{ "type": "input_value", "name": "STR" }],
    "output": "Object",
    "style": "text_blocks",
    "tooltip": "Parse JSON string into object"
  },

  // JS Maps & Sets
  {
    "type": "js_map_create",
    "message0": "new Map()",
    "output": "Object",
    "style": "variable_blocks",
    "tooltip": "Create a new ES6 Map"
  },
  {
    "type": "js_map_set_get",
    "message0": "%1 . %2 ( %3 %4 )",
    "args0": [
      { "type": "input_value", "name": "MAP" },
      {
        "type": "field_dropdown",
        "name": "ACTION",
        "options": [
          ["set", "set"],
          ["get", "get"],
          ["has", "has"],
          ["delete", "delete"]
        ]
      },
      { "type": "input_value", "name": "KEY" },
      { "type": "input_value", "name": "VAL" }
    ],
    "output": null,
    "style": "variable_blocks",
    "tooltip": "Map operation"
  },
  {
    "type": "js_set_create",
    "message0": "new Set()",
    "output": "Object",
    "style": "variable_blocks",
    "tooltip": "Create a new ES6 Set"
  },
  {
    "type": "js_set_add_has",
    "message0": "%1 . %2 ( %3 )",
    "args0": [
      { "type": "input_value", "name": "SET" },
      {
        "type": "field_dropdown",
        "name": "ACTION",
        "options": [
          ["add", "add"],
          ["has", "has"],
          ["delete", "delete"]
        ]
      },
      { "type": "input_value", "name": "VAL" }
    ],
    "output": null,
    "style": "variable_blocks",
    "tooltip": "Set operation"
  },

  // JS OOP & Classes
  {
    "type": "js_class_define",
    "message0": "class %1",
    "args0": [{ "type": "field_input", "name": "NAME", "text": "MyClass" }],
    "message1": "body %1",
    "args1": [{ "type": "input_statement", "name": "BODY" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "procedure_blocks",
    "tooltip": "Define an ES6 Class"
  },
  {
    "type": "js_constructor",
    "message0": "constructor ( %1 )",
    "args0": [{ "type": "field_input", "name": "PARAMS", "text": "param1" }],
    "message1": "body %1",
    "args1": [{ "type": "input_statement", "name": "BODY" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "procedure_blocks",
    "tooltip": "Class constructor method"
  },
  {
    "type": "js_class_method",
    "message0": "%1 ( %2 )",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "myMethod" },
      { "type": "field_input", "name": "PARAMS", "text": "" }
    ],
    "message1": "body %1",
    "args1": [{ "type": "input_statement", "name": "BODY" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "procedure_blocks",
    "tooltip": "Class method"
  },
  {
    "type": "js_instantiate",
    "message0": "new %1 ( %2 )",
    "args0": [
      { "type": "field_input", "name": "CLASS", "text": "MyClass" },
      { "type": "input_value", "name": "ARGS" }
    ],
    "output": null,
    "style": "procedure_blocks",
    "tooltip": "Instantiate a class object"
  },
  {
    "type": "js_class_extends",
    "message0": "class %1 extends %2",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "ChildClass" },
      { "type": "field_input", "name": "PARENT", "text": "ParentClass" }
    ],
    "message1": "body %1",
    "args1": [{ "type": "input_statement", "name": "BODY" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "procedure_blocks",
    "tooltip": "Inherit from parent class"
  },

  // JS Console & I/O
  {
    "type": "js_console_log",
    "message0": "console.log ( %1 )",
    "args0": [{ "type": "input_value", "name": "TEXT" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "text_blocks",
    "tooltip": "Print output to console"
  },
  {
    "type": "js_console_error",
    "message0": "console.error ( %1 )",
    "args0": [{ "type": "input_value", "name": "TEXT" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "text_blocks",
    "tooltip": "Print error to console"
  },
  {
    "type": "js_prompt_input",
    "message0": "prompt ( %1 )",
    "args0": [{ "type": "input_value", "name": "TEXT" }],
    "output": "String",
    "style": "text_blocks",
    "tooltip": "Prompt user for input"
  },
  {
    "type": "js_alert",
    "message0": "alert ( %1 )",
    "args0": [{ "type": "input_value", "name": "TEXT" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "text_blocks",
    "tooltip": "Display alert popup"
  },

  // JS Async & Exceptions
  {
    "type": "js_try_catch",
    "message0": "try",
    "message1": "%1",
    "args1": [{ "type": "input_statement", "name": "TRY" }],
    "message2": "catch (err)",
    "message3": "%1",
    "args3": [{ "type": "input_statement", "name": "CATCH" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "logic_blocks",
    "tooltip": "Try catch exception handler"
  },
  {
    "type": "js_throw_error",
    "message0": "throw new Error ( %1 )",
    "args0": [{ "type": "input_value", "name": "TEXT" }],
    "previousStatement": null,
    "style": "logic_blocks",
    "tooltip": "Throw an Error"
  },
  {
    "type": "js_async_func",
    "message0": "async function %1 ( %2 )",
    "args0": [
      { "type": "field_input", "name": "NAME", "text": "fetchData" },
      { "type": "field_input", "name": "PARAMS", "text": "url" }
    ],
    "message1": "body %1",
    "args1": [{ "type": "input_statement", "name": "BODY" }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "procedure_blocks",
    "tooltip": "Async function declaration"
  },
  {
    "type": "js_await",
    "message0": "await %1",
    "args0": [{ "type": "input_value", "name": "VALUE" }],
    "output": null,
    "style": "procedure_blocks",
    "tooltip": "Await a promise"
  }
]);

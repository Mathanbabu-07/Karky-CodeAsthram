import * as Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([
  // Variable declaration: int x = 10;
  {
    "type": "java_var_declare",
    "message0": "declare %1 %2 = %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["double", "double"],
          ["boolean", "boolean"],
          ["char", "char"],
          ["String", "String"],
          ["var", "var"]
        ]
      },
      {
        "type": "field_input",
        "name": "VAR",
        "text": "x"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4A90E2",
    "tooltip": "Declare a typed Java variable with initial value."
  },
  // Variable assignment: x = 20;
  {
    "type": "java_var_assign",
    "message0": "set %1 = %2",
    "args0": [
      {
        "type": "field_input",
        "name": "VAR",
        "text": "x"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4A90E2",
    "tooltip": "Reassign an existing Java variable."
  },
  // Primitive type selector
  {
    "type": "java_primitive_type",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["double", "double"],
          ["boolean", "boolean"],
          ["char", "char"],
          ["String", "String"]
        ]
      }
    ],
    "output": "Type",
    "colour": "#4A90E2",
    "tooltip": "Primitive or Reference Type specifier."
  },
  // Type casting: (int) 3.14
  {
    "type": "java_type_cast",
    "message0": "(%1) %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["double", "double"],
          ["float", "float"],
          ["long", "long"],
          ["short", "short"],
          ["byte", "byte"],
          ["char", "char"],
          ["String", "String"]
        ]
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "output": null,
    "colour": "#4A90E2",
    "tooltip": "Cast a value to a Java type."
  },
  // Constant declaration: final double PI = 3.14159;
  {
    "type": "java_constant",
    "message0": "final %1 %2 = %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["double", "double"],
          ["int", "int"],
          ["boolean", "boolean"],
          ["String", "String"]
        ]
      },
      {
        "type": "field_input",
        "name": "VAR",
        "text": "MAX_VAL"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4A90E2",
    "tooltip": "Declare an immutable constant in Java."
  },

  // Control Flow: if / else if / else
  {
    "type": "java_if_else",
    "message0": "if %1 then %2",
    "args0": [
      { "type": "input_value", "name": "IF0", "check": "Boolean" },
      { "type": "input_statement", "name": "DO0" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6",
    "tooltip": "Java if conditional statement."
  },
  // Index-based For loop: for (int i = 0; i < n; i++)
  {
    "type": "java_for_loop",
    "message0": "for int %1 = %2 to %3 by %4 do %5",
    "args0": [
      { "type": "field_input", "name": "VAR", "text": "i" },
      { "type": "input_value", "name": "FROM" },
      { "type": "input_value", "name": "TO" },
      { "type": "input_value", "name": "BY" },
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6",
    "tooltip": "Java standard index-based for loop."
  },
  // Enhanced For-each loop: for (String item : list)
  {
    "type": "java_foreach",
    "message0": "for each %1 %2 in %3 do %4",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["String", "String"],
          ["int", "int"],
          ["double", "double"],
          ["Object", "Object"],
          ["var", "var"]
        ]
      },
      { "type": "field_input", "name": "VAR", "text": "item" },
      { "type": "input_value", "name": "COLLECTION" },
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6",
    "tooltip": "Java enhanced for-each loop over collection or array."
  },
  // Do-While loop: do { ... } while (cond);
  {
    "type": "java_do_while",
    "message0": "do %1 while %2",
    "args0": [
      { "type": "input_statement", "name": "DO" },
      { "type": "input_value", "name": "CONDITION", "check": "Boolean" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6",
    "tooltip": "Java do-while loop."
  },
  // Break / Continue
  {
    "type": "java_break_continue",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ACTION",
        "options": [
          ["break", "BREAK"],
          ["continue", "CONTINUE"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6",
    "tooltip": "Break out of or continue loop."
  },

  // Native Arrays
  {
    "type": "java_array_create",
    "message0": "new %1 [ %2 ]",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["double", "double"],
          ["boolean", "boolean"],
          ["char", "char"],
          ["String", "String"]
        ]
      },
      { "type": "input_value", "name": "SIZE" }
    ],
    "output": "Array",
    "colour": "#2ECC71",
    "tooltip": "Create fixed-size native Java array."
  },
  {
    "type": "java_array_get_set",
    "message0": "array %1 [ %2 ] = %3",
    "args0": [
      { "type": "input_value", "name": "ARRAY" },
      { "type": "input_value", "name": "INDEX" },
      { "type": "input_value", "name": "VALUE" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": "Set value at array index."
  },
  {
    "type": "java_array_length",
    "message0": "%1 .length",
    "args0": [
      { "type": "input_value", "name": "ARRAY" }
    ],
    "output": "Number",
    "colour": "#2ECC71",
    "tooltip": "Get native array length."
  },

  // ArrayList
  {
    "type": "java_arraylist_create",
    "message0": "new ArrayList< %1 >()",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["String", "String"],
          ["Integer", "Integer"],
          ["Double", "Double"],
          ["Boolean", "Boolean"],
          ["Object", "Object"]
        ]
      }
    ],
    "output": "ArrayList",
    "colour": "#2ECC71",
    "tooltip": "Instantiate Java ArrayList."
  },
  {
    "type": "java_arraylist_add",
    "message0": "%1 .add( %2 )",
    "args0": [
      { "type": "input_value", "name": "LIST" },
      { "type": "input_value", "name": "ITEM" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": "Append item to ArrayList."
  },
  {
    "type": "java_arraylist_get",
    "message0": "%1 .get( %2 )",
    "args0": [
      { "type": "input_value", "name": "LIST" },
      { "type": "input_value", "name": "INDEX" }
    ],
    "output": null,
    "colour": "#2ECC71",
    "tooltip": "Get item at index from ArrayList."
  },
  {
    "type": "java_arraylist_size",
    "message0": "%1 .size()",
    "args0": [
      { "type": "input_value", "name": "LIST" }
    ],
    "output": "Number",
    "colour": "#2ECC71",
    "tooltip": "Get ArrayList size."
  },

  // HashMap & HashSet
  {
    "type": "java_hashmap_create",
    "message0": "new HashMap< %1 , %2 >()",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "KEY_TYPE",
        "options": [["String", "String"], ["Integer", "Integer"], ["Double", "Double"], ["Object", "Object"]]
      },
      {
        "type": "field_dropdown",
        "name": "VAL_TYPE",
        "options": [["String", "String"], ["Integer", "Integer"], ["Double", "Double"], ["Object", "Object"]]
      }
    ],
    "output": "HashMap",
    "colour": "#F39C12",
    "tooltip": "Instantiate Java HashMap."
  },
  {
    "type": "java_hashmap_put",
    "message0": "%1 .put( %2 , %3 )",
    "args0": [
      { "type": "input_value", "name": "MAP" },
      { "type": "input_value", "name": "KEY" },
      { "type": "input_value", "name": "VALUE" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12",
    "tooltip": "Put key-value pair into HashMap."
  },
  {
    "type": "java_hashmap_get",
    "message0": "%1 .get( %2 )",
    "args0": [
      { "type": "input_value", "name": "MAP" },
      { "type": "input_value", "name": "KEY" }
    ],
    "output": null,
    "colour": "#F39C12",
    "tooltip": "Get value by key from HashMap."
  },
  {
    "type": "java_hashset_create",
    "message0": "new HashSet< %1 >()",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [["String", "String"], ["Integer", "Integer"], ["Double", "Double"], ["Object", "Object"]]
      }
    ],
    "output": "HashSet",
    "colour": "#F39C12",
    "tooltip": "Instantiate Java HashSet."
  },
  {
    "type": "java_hashset_add",
    "message0": "%1 .add( %2 )",
    "args0": [
      { "type": "input_value", "name": "SET" },
      { "type": "input_value", "name": "ITEM" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12",
    "tooltip": "Add item to HashSet."
  },

  // System I/O
  {
    "type": "java_print",
    "message0": "System.out.println( %1 )",
    "args0": [
      { "type": "input_value", "name": "TEXT" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#1ABC9C",
    "tooltip": "Print line to standard console."
  },
  {
    "type": "java_printf",
    "message0": "System.out.printf( %1 , %2 )",
    "args0": [
      { "type": "input_value", "name": "FORMAT" },
      { "type": "input_value", "name": "ARGS" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#1ABC9C",
    "tooltip": "Print formatted string to standard console."
  },
  {
    "type": "java_scanner_init",
    "message0": "new Scanner(System.in)",
    "output": "Scanner",
    "colour": "#1ABC9C",
    "tooltip": "Initialize standard input Scanner."
  },
  {
    "type": "java_scanner_read",
    "message0": "%1 . %2 ()",
    "args0": [
      { "type": "input_value", "name": "SCANNER" },
      {
        "type": "field_dropdown",
        "name": "METHOD",
        "options": [
          ["nextLine", "nextLine"],
          ["nextInt", "nextInt"],
          ["nextDouble", "nextDouble"],
          ["nextBoolean", "nextBoolean"],
          ["next", "next"]
        ]
      }
    ],
    "output": null,
    "colour": "#1ABC9C",
    "tooltip": "Read input token using Scanner."
  },

  // Sub-phase 5.1 & 5.2: OOP & Method Constructs
  {
    "type": "java_method_def",
    "message0": "%1 static %2 %3 ( %4 ) %5",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ACCESS",
        "options": [["public", "public"], ["private", "private"], ["protected", "protected"]]
      },
      {
        "type": "field_dropdown",
        "name": "RETURN_TYPE",
        "options": [["void", "void"], ["int", "int"], ["double", "double"], ["boolean", "boolean"], ["String", "String"], ["Object", "Object"]]
      },
      { "type": "field_input", "name": "NAME", "text": "myMethod" },
      { "type": "field_input", "name": "PARAMS", "text": "int a, int b" },
      { "type": "input_statement", "name": "STACK" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8E44AD",
    "tooltip": "Define a static Java method."
  },
  {
    "type": "java_class_define",
    "message0": "%1 class %2 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ACCESS",
        "options": [["public", "public"], ["package-private", ""]]
      },
      { "type": "field_input", "name": "NAME", "text": "MyClass" },
      { "type": "input_statement", "name": "MEMBERS" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8E44AD",
    "tooltip": "Define a custom Java class."
  },
  {
    "type": "java_field_define",
    "message0": "%1 %2 %3 %4 = %5",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ACCESS",
        "options": [["private", "private"], ["public", "public"], ["protected", "protected"]]
      },
      {
        "type": "field_dropdown",
        "name": "STATIC",
        "options": [["", ""], ["static", "static"]]
      },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [["int", "int"], ["double", "double"], ["boolean", "boolean"], ["String", "String"], ["Object", "Object"]]
      },
      { "type": "field_input", "name": "NAME", "text": "myField" },
      { "type": "input_value", "name": "VALUE" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8E44AD",
    "tooltip": "Define a Java class field/attribute."
  },
  {
    "type": "java_instantiate",
    "message0": "new %1 ( %2 )",
    "args0": [
      { "type": "field_input", "name": "CLASS", "text": "MyClass" },
      { "type": "input_value", "name": "ARGS" }
    ],
    "output": "Object",
    "colour": "#8E44AD",
    "tooltip": "Instantiate an object of a class."
  },

  // Sub-phase 6.2: Exception Handling
  {
    "type": "java_try_catch",
    "message0": "try %1 catch ( %2 %3 ) %4",
    "args0": [
      { "type": "input_statement", "name": "TRY" },
      {
        "type": "field_dropdown",
        "name": "EX_TYPE",
        "options": [["Exception", "Exception"], ["IllegalArgumentException", "IllegalArgumentException"], ["NullPointerException", "NullPointerException"], ["IOException", "IOException"]]
      },
      { "type": "field_input", "name": "VAR", "text": "e" },
      { "type": "input_statement", "name": "CATCH" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E74C3C",
    "tooltip": "Try-Catch Exception Handling block."
  },
  {
    "type": "java_throw",
    "message0": "throw new %1 ( %2 )",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "EX_TYPE",
        "options": [["Exception", "Exception"], ["IllegalArgumentException", "IllegalArgumentException"], ["RuntimeException", "RuntimeException"]]
      },
      { "type": "input_value", "name": "MSG" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E74C3C",
    "tooltip": "Throw an exception."
  },

  // Sub-phase 6.3: Math & String Helpers
  {
    "type": "java_math_pow",
    "message0": "Math.pow( %1 , %2 )",
    "args0": [
      { "type": "input_value", "name": "BASE" },
      { "type": "input_value", "name": "EXP" }
    ],
    "output": "Number",
    "colour": "#34495E",
    "tooltip": "Calculate base raised to power exponent."
  },
  {
    "type": "java_math_sqrt",
    "message0": "Math.sqrt( %1 )",
    "args0": [
      { "type": "input_value", "name": "NUM" }
    ],
    "output": "Number",
    "colour": "#34495E",
    "tooltip": "Square root function."
  },
  {
    "type": "java_string_contains",
    "message0": "%1 .contains( %2 )",
    "args0": [
      { "type": "input_value", "name": "TEXT" },
      { "type": "input_value", "name": "SUB" }
    ],
    "output": "Boolean",
    "colour": "#34495E",
    "tooltip": "Check if string contains substring."
  },
  {
    "type": "java_string_split",
    "message0": "%1 .split( %2 )",
    "args0": [
      { "type": "input_value", "name": "TEXT" },
      { "type": "input_value", "name": "DELIM" }
    ],
    "output": "Array",
    "colour": "#34495E",
    "tooltip": "Split string by regex delimiter into array."
  }
]);

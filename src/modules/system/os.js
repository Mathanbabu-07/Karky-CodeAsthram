import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "system_os_getenv",
    "message0": "get environment variable %1",
    "args0": [{
        "type": "input_value",
        "name": "VAR",
        "check": "String"
      }],
    "output": "String",
    "colour": 230,
    "tooltip": "Gets the value of an environment variable.",
    "helpUrl": ""
  },
  {
    "type": "system_os_system",
    "message0": "run shell command %1",
    "args0": [{
        "type": "input_value",
        "name": "CMD",
        "check": "String"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Executes a shell command.",
    "helpUrl": ""
  },
  {
    "type": "os_path_join",
    "message0": "join path components %1",
    "args0": [{
        "type": "input_value",
        "name": "PATHS",
        "check": "Array",
        "colour": "#78909C"
      }],
    "output": "String",
    "colour": "#78909C",
    "tooltip": "Joins one or more path components intelligently.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/os.path.html#os.path.join"
  },
  {
    "type": "os_path_exists",
    "message0": "path exists %1",
    "args0": [{
        "type": "input_value",
        "name": "PATH",
        "check": "String",
        "colour": "#78909C"
      }],
    "output": "Boolean",
    "colour": "#78909C",
    "tooltip": "Return True if path refers to an existing path or an open file descriptor.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/os.path.html#os.path.exists"
  },
  {
    "type": "os_path_basename",
    "message0": "base name of path %1",
    "args0": [{
        "type": "input_value",
        "name": "PATH",
        "check": "String",
        "colour": "#78909C"
      }],
    "output": "String",
    "colour": "#78909C",
    "tooltip": "Return the base name of pathname path.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/os.path.html#os.path.basename"
  },
  {
    "type": "os_path_dirname",
    "message0": "directory name of path %1",
    "args0": [{
        "type": "input_value",
        "name": "PATH",
        "check": "String",
        "colour": "#78909C"
      }],
    "output": "String",
    "colour": "#78909C",
    "tooltip": "Return the directory name of pathname path.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/os.path.html#os.path.dirname"
  },
  {
    "type": "os_path_splitext",
    "message0": "split extension of path %1",
    "args0": [{
        "type": "input_value",
        "name": "PATH",
        "check": "String",
        "colour": "#78909C"
      }],
    "output": "Tuple",
    "colour": "#78909C",
    "tooltip": "Split the pathname path into a pair (root, ext).",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/os.path.html#os.path.splitext"
  },
  {
    "type": "os_mkdir",
    "message0": "create directory at path %1",
    "args0": [{
        "type": "input_value",
        "name": "PATH",
        "check": "String",
        "colour": "#78909C"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "tooltip": "Create a directory.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/os.html#os.mkdir"
  },
  {
    "type": "os_makedirs",
    "message0": "create directory (and parents) at path %1",
    "args0": [{
        "type": "input_value",
        "name": "PATH",
        "check": "String",
        "colour": "#78909C"
      }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "tooltip": "Recursive directory creation function.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/os.html#os.makedirs"
  },
  {
    "type": "os_rename",
    "message0": "rename from %1 to %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SRC",
        "check": "String",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "DST",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Rename the file or directory src to dst.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/os.html#os.rename"
  },
  {
    "type": "os_path_isfile",
    "message0": "is path %1 a file?",
    "args0": [{
        "type": "input_value",
        "name": "PATH",
        "check": "String",
        "colour": "#78909C"
      }],
    "output": "Boolean",
    "colour": "#78909C",
    "tooltip": "Return True if path is an existing regular file.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/os.path.html#os.path.isfile"
  },
  {
    "type": "os_path_isdir",
    "message0": "is path %1 a directory?",
    "args0": [{
        "type": "input_value",
        "name": "PATH",
        "check": "String",
        "colour": "#78909C"
      }],
    "output": "Boolean",
    "colour": "#78909C",
    "tooltip": "Return True if path is an existing directory.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/os.path.html#os.path.isdir"
  }
  ,
  {
    "type": "system_os_getcwd",
    "message0": "get current working directory",
    "output": "String",
    "colour": 230,
    "tooltip": "Returns the current working directory.",
    "helpUrl": "https://docs.python.org/3/library/os.html#os.getcwd"
  }
]);
import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "sys_argv",
    "message0": "command-line arguments",
    "output": "Array",
    "colour": "#78909C",
    "tooltip": "Returns the list of command-line arguments passed to a Python script.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/sys.html#sys.argv"
  },
  {
    "type": "sys_platform",
    "message0": "platform identifier",
    "output": "String",
    "colour": "#78909C",
    "tooltip": "Returns a string identifying the platform (e.g., 'linux', 'win32').",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/sys.html#sys.platform"
  }
  ,
  {
    "type": "system_sys_exit",
    "message0": "exit program status %1",
    "args0": [ { "type": "input_value", "name": "CODE", "check": "Number" } ],
    "previousStatement": null,
    "colour": "#78909C",
    "tooltip": "Exit the program optionally with a status code.",
    "helpUrl": "https://docs.python.org/3/library/sys.html#sys.exit"
  }
]);
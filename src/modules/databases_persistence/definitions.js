// src/modules/databases_persistence/definitions.js
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "db_execute",
    "message0": "DB execute %1 with params %2",
    "args0": [
      { "type": "input_value", "name": "QUERY", "check": "String" },
      { "type": "input_value", "name": "PARAMS", "check": "Array" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#A55B80",
    "tooltip": "Executes a query (e.g., CREATE, INSERT, UPDATE, DELETE) against the sandboxed database.",
    "helpUrl": ""
  },
  {
    "type": "db_query_all",
    "message0": "DB query all %1 with params %2",
    "args0": [
      { "type": "input_value", "name": "QUERY", "check": "String" },
      { "type": "input_value", "name": "PARAMS", "check": "Array" }
    ],
    "output": "Array",
    "colour": "#A55B80",
    "tooltip": "Executes a SELECT query and returns all rows as a list of dictionaries.",
    "helpUrl": ""
  },
  {
    "type": "sqlite_connect",
    "message0": "sqlite3 connect to %1",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "output": null,
    "colour": "#A55B80",
    "tooltip": "Create a connection to a SQLite database at the given path.",
    "helpUrl": ""
  },
  {
    "type": "sqlite_execute",
    "message0": "execute %2 on conn %1 params %3",
    "args0": [
      { "type": "input_value", "name": "CONN" },
      { "type": "input_value", "name": "QUERY", "check": "String" },
      { "type": "input_value", "name": "PARAMS" }
    ],
    "output": null,
    "colour": "#A55B80",
    "tooltip": "Execute a SQL statement on the connection and return a cursor.",
    "helpUrl": ""
  },
  {
    "type": "sqlite_fetchall",
    "message0": "fetch all from cursor %1",
    "args0": [
      { "type": "input_value", "name": "CURSOR" }
    ],
    "output": "Array",
    "colour": "#A55B80",
    "tooltip": "Fetch all rows from the given cursor.",
    "helpUrl": ""
  },
  {
    "type": "sqlite_close",
    "message0": "close sqlite3 connection %1",
    "args0": [
      { "type": "input_value", "name": "CONN" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#A55B80",
    "tooltip": "Close a SQLite database connection.",
    "helpUrl": ""
  }
]);

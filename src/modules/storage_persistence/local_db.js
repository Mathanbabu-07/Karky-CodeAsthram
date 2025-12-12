import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "storage_db_connect_sqlite",
    "message0": "connect to sqlite db at path %1",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "output": "Connection",
    "colour": 230,
    "tooltip": "Connects to a SQLite database."
  },
  {
    "type": "storage_db_query",
    "message0": "on connection %1 execute query %2 with params %3",
    "args0": [
      { "type": "input_value", "name": "CONN", "check": "Connection" },
      { "type": "input_value", "name": "SQL", "check": "String" },
      { "type": "input_value", "name": "PARAMS", "check": "Array" }
    ],
    "output": "Array",
    "colour": 230,
    "tooltip": "Executes a SQL query and returns the results."
  },
  {
    "type": "storage_db_select",
    "message0": "on connection %1 select from %2 where %3",
    "args0": [
      { "type": "input_value", "name": "CONN", "check": "Connection" },
      { "type": "input_value", "name": "TABLE", "check": "String" },
      { "type": "input_value", "name": "WHERE", "check": "String" }
    ],
    "output": "Array",
    "colour": 230,
    "tooltip": "Selects rows from a table."
  },
  {
    "type": "storage_db_insert",
    "message0": "on connection %1 insert into %2 data %3",
    "args0": [
      { "type": "input_value", "name": "CONN", "check": "Connection" },
      { "type": "input_value", "name": "TABLE", "check": "String" },
      { "type": "input_value", "name": "DATA", "check": "Object" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Inserts a new row into a table."
  },
  {
    "type": "storage_db_update",
    "message0": "on connection %1 update %2 set %3 where %4",
    "args0": [
      { "type": "input_value", "name": "CONN", "check": "Connection" },
      { "type": "input_value", "name": "TABLE", "check": "String" },
      { "type": "input_value", "name": "DATA", "check": "Object" },
      { "type": "input_value", "name": "WHERE", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Updates rows in a table."
  },
  {
    "type": "storage_db_transaction",
    "message0": "on connection %1 do in transaction %2",
    "args0": [
      { "type": "input_value", "name": "CONN", "check": "Connection" },
      { "type": "input_statement", "name": "DO" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Executes a block of code in a database transaction."
  }
]);

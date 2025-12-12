import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "storage_migrate_schema",
    "message0": "migrate schema with adapter %1",
    "args0": [
      { "type": "input_value", "name": "ADAPTER" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Migrates the database schema."
  },
  {
    "type": "storage_backup_db",
    "message0": "backup database to path %1",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Backs up the database to a file."
  },
  {
    "type": "storage_restore_db",
    "message0": "restore database from path %1",
    "args0": [
      { "type": "input_value", "name": "PATH", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Restores the database from a file."
  }
]);

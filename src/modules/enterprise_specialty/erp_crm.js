import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "enterprise_odoo_connect",
    "message0": "connect to Odoo",
    "output": "OdooConnection",
    "colour": 30,
    "tooltip": "Connects to an Odoo instance. (Admin gated)"
  },
  {
    "type": "enterprise_odoo_search_create",
    "message0": "in Odoo connection %1 search/create %2 with data %3",
    "args0": [
      { "type": "input_value", "name": "CONN", "check": "OdooConnection" },
      { "type": "input_value", "name": "MODEL", "check": "String" },
      { "type": "input_value", "name": "DATA", "check": "Object" }
    ],
    "output": null,
    "colour": 30,
    "tooltip": "Searches for or creates a record in Odoo."
  }
]);

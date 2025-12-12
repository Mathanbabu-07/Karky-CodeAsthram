import * as Blockly from 'blockly';

const dbCategory = 'Database';
const dbColour = '#DB7093';

// Block for creating a database engine
Blockly.Blocks['db_create_engine'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("create database engine");
    this.appendValueInput("CONNECTION_STRING")
        .setCheck("String")
        .appendField("with connection string");
    this.setOutput(true, "DBEngine");
    this.setColour(dbColour);
    this.setTooltip("Creates a SQLAlchemy database engine. Defaults to in-memory SQLite.");
    this.setHelpUrl("https://docs.sqlalchemy.org/en/20/core/engines.html");
  }
};

// Block for defining a database table
Blockly.Blocks['db_define_table'] = {
  init: function() {
    this.appendValueInput("ENGINE")
        .setCheck("DBEngine")
        .appendField("On engine");
    this.appendDummyInput()
        .appendField("define table named")
        .appendField(new Blockly.FieldTextInput("my_table"), "TABLE_NAME");
    this.appendStatementInput("COLUMNS")
        .setCheck("DBColumn")
        .appendField("with columns");
    this.setOutput(true, "DBTable");
    this.setColour(dbColour);
    this.setTooltip("Defines a new database table and its columns.");
    this.setHelpUrl("https://docs.sqlalchemy.org/en/20/core/metadata.html");
  }
};

// Block for defining a column
Blockly.Blocks['db_column_def'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("column")
        .appendField(new Blockly.FieldTextInput("name"), "COLUMN_NAME")
        .appendField("of type")
        .appendField(new Blockly.FieldDropdown([
            ["String", "STRING"],
            ["Integer", "INTEGER"],
            ["Float", "FLOAT"],
            ["Boolean", "BOOLEAN"]
        ]), "COLUMN_TYPE");
    this.appendDummyInput()
        .appendField("Primary Key?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "IS_PRIMARY_KEY");
    this.setPreviousStatement(true, "DBColumn");
    this.setNextStatement(true, "DBColumn");
    this.setColour(dbColour);
    this.setTooltip("Defines a column for a database table.");
    this.setHelpUrl("https://docs.sqlalchemy.org/en/20/core/metadata.html#sqlalchemy.schema.Column");
  }
};

// Block for an insert statement
Blockly.Blocks['db_insert'] = {
  init: function() {
    this.appendValueInput("TABLE")
        .setCheck("DBTable")
        .appendField("insert into");
    this.appendValueInput("VALUES")
        .setCheck("Object") // This will connect to a dictionary block
        .appendField("with values");
    this.setOutput(true, "DBStatement");
    this.setColour(dbColour);
    this.setTooltip("Creates an INSERT statement.");
    this.setHelpUrl("https://docs.sqlalchemy.org/en/20/core/dml.html#sqlalchemy.sql.expression.Insert");
  }
};

// Block for a select statement
Blockly.Blocks['db_select'] = {
    init: function() {
      this.appendValueInput("TABLE")
          .setCheck("DBTable")
          .appendField("select from");
      this.appendValueInput("WHERE")
          .setCheck("Boolean") // Connect to a comparison block
          .appendField("where");
      this.setOutput(true, "DBStatement");
      this.setColour(dbColour);
      this.setTooltip("Creates a SELECT statement.");
      this.setHelpUrl("https://docs.sqlalchemy.org/en/20/core/dml.html#sqlalchemy.sql.expression.Select");
    }
  };

// Block for an update statement
Blockly.Blocks['db_update'] = {
    init: function() {
        this.appendValueInput("TABLE")
            .setCheck("DBTable")
            .appendField("update");
        this.appendValueInput("VALUES")
            .setCheck("Object")
            .appendField("set values");
        this.appendValueInput("WHERE")
            .setCheck("Boolean")
            .appendField("where");
        this.setOutput(true, "DBStatement");
        this.setColour(dbColour);
        this.setTooltip("Creates an UPDATE statement.");
        this.setHelpUrl("https://docs.sqlalchemy.org/en/20/core/dml.html#sqlalchemy.sql.expression.Update");
    }
};

// Block for a delete statement
Blockly.Blocks['db_delete'] = {
    init: function() {
        this.appendValueInput("TABLE")
            .setCheck("DBTable")
            .appendField("delete from");
        this.appendValueInput("WHERE")
            .setCheck("Boolean")
            .appendField("where");
        this.setOutput(true, "DBStatement");
        this.setColour(dbColour);
        this.setTooltip("Creates a DELETE statement.");
        this.setHelpUrl("https://docs.sqlalchemy.org/en/20/core/dml.html#sqlalchemy.sql.expression.Delete");
    }
};

// Block to execute a statement
Blockly.Blocks['db_execute_statement'] = {
  init: function() {
    this.appendValueInput("ENGINE")
        .setCheck("DBEngine")
        .appendField("On engine");
    this.appendValueInput("STATEMENT")
        .setCheck("DBStatement")
        .appendField("execute statement");
    this.setOutput(true, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(dbColour);
    this.setTooltip("Executes an INSERT, UPDATE, or DELETE statement.");
  }
};

// Block to fetch results from a select statement
Blockly.Blocks['db_fetch'] = {
    init: function() {
        this.appendValueInput("ENGINE")
            .setCheck("DBEngine")
            .appendField("On engine");
        this.appendValueInput("STATEMENT")
            .setCheck("DBStatement")
            .appendField("fetch from");
        this.appendDummyInput()
            .appendField("result type")
            .appendField(new Blockly.FieldDropdown([
                ["all rows", "ALL"],
                ["first row", "ONE"]
            ]), "FETCH_TYPE");
        this.setOutput(true, null);
        this.setColour(dbColour);
        this.setTooltip("Fetches results from a SELECT statement.");
    }
};
import * as Blockly from 'blockly';

const seabornColour = "#4C97FF";

Blockly.Blocks['seaborn_load_dataset'] = {
  init: function() {
    this.jsonInit({
      "message0": "load seaborn dataset named %1",
      "args0": [
        { "type": "field_input", "name": "NAME", "text": "tips" }
      ],
      "output": "DataFrame",
      "colour": seabornColour,
      "tooltip": "Loads a dataset from the seaborn online repository.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.load_dataset.html"
    });
  }
};

Blockly.Blocks['seaborn_set_theme'] = {
  init: function() {
    this.jsonInit({
      "message0": "set seaborn theme to %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "THEME",
          "options": [["darkgrid", "darkgrid"], ["whitegrid", "whitegrid"], ["dark", "dark"], ["white", "white"], ["ticks", "ticks"]]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": seabornColour,
      "tooltip": "Set the aesthetic style of the plots.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.set_theme.html"
    });
  }
};

Blockly.Blocks['seaborn_lineplot'] = {
  init: function() {
    this.jsonInit({
      "message0": "create a line plot with data %1 x-axis %2 y-axis %3",
      "args0": [
        { "type": "input_value", "name": "DATA", "check": "DataFrame" },
        { "type": "input_value", "name": "X", "check": "String" },
        { "type": "input_value", "name": "Y", "check": "String" }
      ],
      "message1": "hue %1",
      "args1": [
          { "type": "input_value", "name": "HUE", "check": "String" }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": seabornColour,
      "tooltip": "Draw a line plot with possibilities of several semantic groupings.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.lineplot.html"
    });
  }
};

Blockly.Blocks['seaborn_scatterplot'] = {
  init: function() {
    this.jsonInit({
      "message0": "create a scatter plot with data %1 x-axis %2 y-axis %3",
      "args0": [
        { "type": "input_value", "name": "DATA", "check": "DataFrame" },
        { "type": "input_value", "name": "X", "check": "String" },
        { "type": "input_value", "name": "Y", "check": "String" }
      ],
      "message1": "hue %1",
      "args1": [{ "type": "input_value", "name": "HUE", "check": "String" }],
      "message2": "size %1",
      "args2": [{ "type": "input_value", "name": "SIZE", "check": "String" }],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": seabornColour,
      "tooltip": "Draw a scatter plot with possibilities of several semantic groupings.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.scatterplot.html"
    });
  }
};

Blockly.Blocks['seaborn_barplot'] = {
  init: function() {
    this.jsonInit({
      "message0": "create a bar plot with data %1 x-axis %2 y-axis %3",
      "args0": [
        { "type": "input_value", "name": "DATA", "check": "DataFrame" },
        { "type": "input_value", "name": "X", "check": "String" },
        { "type": "input_value", "name": "Y", "check": "String" }
      ],
      "message1": "hue %1",
      "args1": [{ "type": "input_value", "name": "HUE", "check": "String" }],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": seabornColour,
      "tooltip": "Show point estimates and confidence intervals as rectangular bars.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.barplot.html"
    });
  }
};

Blockly.Blocks['seaborn_histogram'] = {
  init: function() {
    this.jsonInit({
      "message0": "create a histogram with data %1 x-axis %2",
      "args0": [
        { "type": "input_value", "name": "DATA", "check": "DataFrame" },
        { "type": "input_value", "name": "X", "check": "String" }
      ],
      "message1": "hue %1",
      "args1": [{ "type": "input_value", "name": "HUE", "check": "String" }],
      "message2": "bins %1",
      "args2": [{ "type": "input_value", "name": "BINS", "check": "Number" }],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": seabornColour,
      "tooltip": "Plot univariate or bivariate histograms to show distributions of datasets.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.histplot.html"
    });
  }
};

Blockly.Blocks['seaborn_boxplot'] = {
  init: function() {
    this.jsonInit({
      "message0": "create a box plot with data %1 x-axis %2 y-axis %3",
      "args0": [
        { "type": "input_value", "name": "DATA", "check": "DataFrame" },
        { "type": "input_value", "name": "X", "check": "String" },
        { "type": "input_value", "name": "Y", "check": "String" }
      ],
      "message1": "hue %1",
      "args1": [{ "type": "input_value", "name": "HUE", "check": "String" }],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": seabornColour,
      "tooltip": "Draw a box plot to show distributions with respect to categories.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.boxplot.html"
    });
  }
};

Blockly.Blocks['seaborn_violinplot'] = {
  init: function() {
    this.jsonInit({
      "message0": "create a violin plot with data %1 x-axis %2 y-axis %3",
      "args0": [
        { "type": "input_value", "name": "DATA", "check": "DataFrame" },
        { "type": "input_value", "name": "X", "check": "String" },
        { "type": "input_value", "name": "Y", "check": "String" }
      ],
      "message1": "hue %1",
      "args1": [{ "type": "input_value", "name": "HUE", "check": "String" }],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": seabornColour,
      "tooltip": "Draw a combination of boxplot and kernel density estimate.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.violinplot.html"
    });
  }
};

Blockly.Blocks['seaborn_pairplot'] = {
  init: function() {
    this.jsonInit({
      "message0": "create a pair plot with data %1",
      "args0": [
        { "type": "input_value", "name": "DATA", "check": "DataFrame" }
      ],
      "message1": "hue %1",
      "args1": [{ "type": "input_value", "name": "HUE", "check": "String" }],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": seabornColour,
      "tooltip": "Plot pairwise relationships in a dataset.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.pairplot.html"
    });
  }
};

Blockly.Blocks['seaborn_jointplot'] = {
  init: function() {
    this.jsonInit({
      "message0": "create a joint plot with data %1 x-axis %2 y-axis %3",
      "args0": [
        { "type": "input_value", "name": "DATA", "check": "DataFrame" },
        { "type": "input_value", "name": "X", "check": "String" },
        { "type": "input_value", "name": "Y", "check": "String" }
      ],
      "message1": "kind %1",
      "args1": [
        {
          "type": "field_dropdown", "name": "KIND",
          "options": [["scatter", "scatter"], ["kde", "kde"], ["hist", "hist"], ["hex", "hex"], ["reg", "reg"], ["resid", "resid"]]
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": seabornColour,
      "tooltip": "Draw a plot of two variables with bivariate and univariate graphs.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.jointplot.html"
    });
  }
};

Blockly.Blocks['seaborn_heatmap'] = {
  init: function() {
    this.jsonInit({
      "message0": "create a heatmap with data %1",
      "args0": [
        { "type": "input_value", "name": "DATA", "check": "DataFrame" }
      ],
      "message1": "annot %1",
      "args1": [{ "type": "input_value", "name": "ANNOT", "check": "Boolean" }],
      "message2": "cmap %1",
      "args2": [{ "type": "input_value", "name": "CMAP", "check": "String" }],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": seabornColour,
      "tooltip": "Plot rectangular data as a color-encoded matrix.",
      "helpUrl": "https://seaborn.pydata.org/generated/seaborn.heatmap.html"
    });
  }
};
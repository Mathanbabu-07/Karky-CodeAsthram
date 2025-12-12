import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    'type': 'matplotlib_plot',
    'message0': 'plot x %1 y %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'X',
        'check': [
          'Array',
          'DataFrame'
        ]
      },
      {
        'type': 'input_value',
        'name': 'Y',
        'check': [
          'Array',
          'DataFrame'
        ]
      }
    ],
    'message1': 'label %1 style %2 color %3 marker %4',
    'args1': [
      {
        'type': 'field_input',
        'name': 'LABEL',
        'text': ''
      },
      {
        'type': 'field_dropdown',
        'name': 'STYLE',
        'options': [
          [
            'solid line',
            '\'-\''
          ],
          [
            'dashed line',
            '\'--\''
          ],
          [
            'dotted line',
            '\':\''
          ],
          [
            'dash-dot line',
            '\'-.\''
          ],
          [
            'none',
            '\'\''
          ]
        ]
      },
      {
        'type': 'input_value',
        'name': 'COLOR',
        'check': 'String'
      },
      {
        'type': 'field_dropdown',
        'name': 'MARKER',
        'options': [
          [
            'none',
            '\'\''
          ],
          [
            'point',
            '\'.\''
          ],
          [
            'pixel',
            '\',\''
          ],
          [
            'circle',
            '\'o\''
          ],
          [
            'triangle down',
            '\'v\''
          ],
          [
            'triangle up',
            '\'^\''
          ],
          [
            'square',
            '\'s\''
          ],
          [
            'plus',
            '\'+\''
          ],
          [
            'x',
            '\'x\''
          ],
          [
            'diamond',
            '\'D\''
          ]
        ]
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Plot y versus x as lines and/or markers.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html'
  },
  {
    'type': 'matplotlib_show',
    'message0': 'show plot',
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Display all open figures.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.show.html'
  },
  {
    'type': 'matplotlib_title',
    'message0': 'set plot title to %1',
    'args0': [{
        'type': 'input_value',
        'name': 'TITLE',
        'check': 'String'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Set a title for the axes.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.title.html'
  },
  {
    'type': 'matplotlib_xlabel',
    'message0': 'set x-axis label to %1',
    'args0': [{
        'type': 'input_value',
        'name': 'LABEL',
        'check': 'String'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Set the label for the x-axis.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.xlabel.html'
  },
  {
    'type': 'matplotlib_ylabel',
    'message0': 'set y-axis label to %1',
    'args0': [{
        'type': 'input_value',
        'name': 'LABEL',
        'check': 'String'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Set the label for the y-axis.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.ylabel.html'
  },
  {
    'type': 'matplotlib_legend',
    'message0': 'show plot legend',
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Place a legend on the axes.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.legend.html'
  },
  {
    'type': 'matplotlib_scatter',
    'message0': 'scatter plot x %1 y %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'X',
        'check': [
          'Array',
          'DataFrame'
        ]
      },
      {
        'type': 'input_value',
        'name': 'Y',
        'check': [
          'Array',
          'DataFrame'
        ]
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'A scatter plot of y vs. x with varying marker size and/or color.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.scatter.html'
  },
  {
    'type': 'matplotlib_bar',
    'message0': 'bar chart categories %1 values %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'X',
        'check': [
          'Array',
          'DataFrame'
        ]
      },
      {
        'type': 'input_value',
        'name': 'Y',
        'check': [
          'Array',
          'DataFrame'
        ]
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Make a bar plot.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.bar.html'
  },
  {
    'type': 'matplotlib_hist',
    'message0': 'histogram of %1 bins %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DATA',
        'check': [
          'Array',
          'DataFrame'
        ]
      },
      {
        'type': 'input_value',
        'name': 'BINS',
        'check': 'Number'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Plot a histogram.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.hist.html'
  },
  {
    'type': 'matplotlib_figure',
    'message0': 'create figure with size width %1 height %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'WIDTH',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'HEIGHT',
        'check': 'Number'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'inputsInline': true,
    'tooltip': 'Create a new figure, or activate an existing figure.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.figure.html'
  },
  {
    'type': 'matplotlib_subplot',
    'message0': 'create subplot at row %1 col %2 index %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'ROW',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'COL',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'INDEX',
        'check': 'Number'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'inputsInline': true,
    'tooltip': 'Add a subplot to the current figure.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.subplot.html'
  },
  {
    'type': 'matplotlib_grid',
    'message0': 'show grid %1',
    'args0': [{
        'type': 'field_checkbox',
        'name': 'VISIBLE',
        'checked': true
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Configure the grid lines.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.grid.html'
  },
  {
    'type': 'matplotlib_xlim',
    'message0': 'set x-axis limits from %1 to %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'LEFT',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'RIGHT',
        'check': 'Number'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'inputsInline': true,
    'tooltip': 'Get or set the x-limits of the current axes.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.xlim.html'
  },
  {
    'type': 'matplotlib_ylim',
    'message0': 'set y-axis limits from %1 to %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'BOTTOM',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'TOP',
        'check': 'Number'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'inputsInline': true,
    'tooltip': 'Get or set the y-limits of the current axes.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.ylim.html'
  },
  {
    'type': 'matplotlib_savefig',
    'message0': 'save figure to %1',
    'args0': [{
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Save the current figure.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.savefig.html'
  },
  {
    'type': 'matplotlib_subplots',
    'message0': 'create subplots nrows %1 ncols %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'NROWS',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'NCOLS',
        'check': 'Number'
      }
    ],
    'output': 'Tuple',
    'colour': '#AB47BC',
    'inputsInline': true,
    'tooltip': 'Create a figure and a set of subplots.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.subplots.html'
  },
  {
    'type': 'matplotlib_pie',
    'message0': 'pie chart with values %1 labels %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'VALUES',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'LABELS',
        'check': 'Array'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Plot a pie chart.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.pie.html'
  },
  {
    'type': 'matplotlib_imshow',
    'message0': 'show image %1',
    'args0': [{
        'type': 'input_value',
        'name': 'IMAGE',
        'check': 'Array'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Display data as an image.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.imshow.html'
  },
  {
    'type': 'matplotlib_tight_layout',
    'message0': 'apply tight layout',
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#AB47BC',
    'tooltip': 'Adjust the padding between and around subplots.',
    'helpUrl': 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.tight_layout.html'
  }
]);
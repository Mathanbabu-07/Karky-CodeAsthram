import * as Blockly from 'blockly/core';

Blockly.defineBlocksWithJsonArray([
  {
    'type': 'pandas_sort_values',
    'message0': 'sort dataframe %1 by %2 ascending %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'BY',
        'check': [
          'String',
          'Array'
        ]
      },
      {
        'type': 'field_checkbox',
        'name': 'ASCENDING',
        'checked': true
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Sort by the values along either axis.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.sort_values.html'
  },
  {
    'type': 'pandas_value_counts',
    'message0': 'count unique values in column %1 of dataframe %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'COL',
        'check': 'String'
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': 'Series',
    'colour': '#2E7D32',
    'inputsInline': true,
    'tooltip': 'Return a Series containing counts of unique values.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.value_counts.html'
  },
  {
    'type': 'pandas_corr',
    'message0': 'compute pairwise correlation of columns in dataframe %1',
    'args0': [{
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Compute pairwise correlation of columns, excluding NA/null values.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.corr.html'
  },
  {
    'type': 'pandas_drop',
    'message0': 'from dataframe %1 drop labels %2 from axis %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'LABELS',
        'check': [
          'String',
          'Array'
        ]
      },
      {
        'type': 'field_dropdown',
        'name': 'AXIS',
        'options': [
          [
            'rows',
            '0'
          ],
          [
            'columns',
            '1'
          ]
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'inputsInline': true,
    'tooltip': 'Drop specified labels from rows or columns.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.drop.html'
  },
  {
    'type': 'pandas_rename',
    'message0': 'in dataframe %1 rename with mapper %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'MAPPER',
        'check': 'Object'
      }
    ],
    'message1': 'on axis %1',
    'args1': [{
        'type': 'field_dropdown',
        'name': 'AXIS',
        'options': [
          [
            'index',
            'index'
          ],
          [
            'columns',
            'columns'
          ]
        ]
      }],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Alter axes labels.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.rename.html'
  },
  {
    'type': 'pandas_to_numpy',
    'message0': 'convert dataframe %1 to numpy array',
    'args0': [{
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }],
    'output': 'Array',
    'colour': '#2E7D32',
    'tooltip': 'Category: Encoding & Utilities — Get the numpy representation of the DataFrame.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_numpy.html'
  },
  {
    'type': 'pandas_get_dummies',
    'message0': 'get dummy variables for %1',
    'args0': [{
      'type': 'input_value',
      'name': 'DF',
      'check': ['DataFrame', 'Series']
    }],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Encoding & Utilities — Convert categorical variable into dummy/indicator variables.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.get_dummies.html'
  },
  {
    'type': 'pandas_factorize',
    'message0': 'factorize %1',
    'args0': [{
      'type': 'input_value',
      'name': 'SERIES',
      'check': 'Series'
    }],
    'output': 'Array',
    'colour': '#2E7D32',
    'tooltip': 'Category: Encoding & Utilities — Encode the object as an enumerated type or categorical variable.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.factorize.html'
  },
  {
    'type': 'pandas_squeeze',
    'message0': 'squeeze %1',
    'args0': [{
      'type': 'input_value',
      'name': 'DF',
      'check': 'DataFrame'
    }],
    'output': 'Series',
    'colour': '#2E7D32',
    'tooltip': 'Category: Encoding & Utilities — Squeeze 1 dimensional axis objects into scalars.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.squeeze.html'
  },
  {
    'type': 'pandas_compare',
    'message0': 'compare dataframe %1 with %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF1',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'DF2',
        'check': 'DataFrame'
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Encoding & Utilities — Compare to another DataFrame and show the differences.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.compare.html'
  },
      {
    'type': 'pandas_set_index',
    'message0': 'set index of dataframe %1 to %2',
    'args0': [
      { 'type': 'input_value', 'name': 'DF', 'check': 'DataFrame' },
      { 'type': 'input_value', 'name': 'KEYS', 'check': ['String', 'Array'] }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Index Operations — Set the DataFrame index using existing columns.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.set_index.html'
      },
      {
    'type': 'pandas_reset_index',
    'message0': 'reset index of dataframe %1',
    'args0': [{ 'type': 'input_value', 'name': 'DF', 'check': 'DataFrame' }],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Index Operations — Reset the index of the DataFrame.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.reset_index.html'
  },
  {
    'type': 'pandas_reindex',
    'message0': 'reindex dataframe %1 with labels %2',
    'args0': [
      { 'type': 'input_value', 'name': 'DF', 'check': 'DataFrame' },
      { 'type': 'input_value', 'name': 'LABELS', 'check': 'Array' }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Index Operations — Conform DataFrame to new index with optional filling logic.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.reindex.html'
  },
  {
    'type': 'pandas_sort_index',
    'message0': 'sort dataframe %1 by index',
    'args0': [{ 'type': 'input_value', 'name': 'DF', 'check': 'DataFrame' }],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Index Operations — Sort object by labels (along an axis).',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.sort_index.html'
  },
  {
    'type': 'pandas_isin',
    'message0': 'filter %1 where values are in %2',
    'args0': [
      { 'type': 'input_value', 'name': 'DF', 'check': ['DataFrame', 'Series'] },
      { 'type': 'input_value', 'name': 'VALUES', 'check': 'Array' }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Conditionals — Whether each element in the DataFrame is contained in values.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.isin.html'
  },
  {
    'type': 'pandas_where',
    'message0': 'in %1 where %2, replace with %3',
    'args0': [
      { 'type': 'input_value', 'name': 'DF', 'check': ['DataFrame', 'Series'] },
      { 'type': 'input_value', 'name': 'COND', 'check': 'Boolean' },
      { 'type': 'input_value', 'name': 'OTHER' }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Conditionals — Replace values where the condition is False.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.where.html'
  },
  {
    'type': 'pandas_mask',
    'message0': 'in %1 where %2, replace with %3',
    'args0': [
      { 'type': 'input_value', 'name': 'DF', 'check': ['DataFrame', 'Series'] },
      { 'type': 'input_value', 'name': 'COND', 'check': 'Boolean' },
      { 'type': 'input_value', 'name': 'OTHER' }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Conditionals — Replace values where the condition is True.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.mask.html'
  },
  {
    'type': 'pandas_take',
    'message0': 'take elements from %1 at indices %2',
    'args0': [
      { 'type': 'input_value', 'name': 'DF', 'check': ['DataFrame', 'Series'] },
      { 'type': 'input_value', 'name': 'INDICES', 'check': 'Array' }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Conditionals — Return the elements in the given positional indices along an axis.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.take.html'
  },
  {
    'type': 'pandas_drop_duplicates',
    'message0': 'from dataframe %1 drop duplicates',
    'args0': [{
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }],
    'message1': 'keep %1',
    'args1': [
      {
        'type': 'field_dropdown',
        'name': 'KEEP',
        'options': [
          ['first', 'first'],
          ['last', 'last']
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Return DataFrame with duplicate rows removed.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.drop_duplicates.html'
  },
  {
    'type': 'pandas_duplicated',
    'message0': 'check for duplicate rows in %1',
    'args0': [{
      'type': 'input_value',
      'name': 'DF',
      'check': 'DataFrame'
    }],
    'output': 'Series',
    'colour': '#2E7D32',
    'tooltip': 'Category: Data Cleaning — Returns a Boolean Series indicating duplicate rows.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.duplicated.html'
  },
  {
    'type': 'pandas_astype',
    'message0': 'change data type of %1 to %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': ['DataFrame', 'Series']
      },
      {
        'type': 'field_dropdown',
        'name': 'TYPE',
        'options': [
          ['integer', 'int'],
          ['float', 'float'],
          ['string', 'str']
        ]
      }
    ],
    'message1': 'coerce to numeric %1',
    'args1': [
      {
        'type': 'field_checkbox',
        'name': 'COERCE',
        'checked': false
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Data Cleaning — Change the data type of a DataFrame or Series.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.astype.html'
  },
  {
    'type': 'pandas_round',
    'message0': 'round values in %1 to %2 decimals',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': ['DataFrame', 'Series']
      },
      {
        'type': 'field_number',
        'name': 'DECIMALS',
        'value': 0
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Data Cleaning — Rounds all numeric values to N decimal places.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.round.html'
  },
  {
    'type': 'pandas_clip',
    'message0': 'clip values in %1 between %2 and %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': ['DataFrame', 'Series']
      },
      {
        'type': 'input_value',
        'name': 'MIN',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'MAX',
        'check': 'Number'
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'inputsInline': true,
    'tooltip': 'Category: Data Cleaning — Sets a minimum and maximum boundary for values.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.clip.html'
  },
  {
    'type': 'pandas_replace',
    'message0': 'in %1 replace %2 with %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': ['DataFrame', 'Series']
      },
      {
        'type': 'input_value',
        'name': 'OLD'
      },
      {
        'type': 'input_value',
        'name': 'NEW'
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'inputsInline': true,
    'tooltip': 'Category: Data Cleaning — Replaces a specified value or list of values with a new value.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.replace.html'
      },
      {
    'type': 'pandas_str_strip',
    'message0': 'strip whitespace from column %1 of %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'COL',
        'check': 'String'
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': 'Series',
    'colour': '#2E7D32',
    'inputsInline': true,
    'tooltip': 'Category: Data Cleaning — Removes leading/trailing whitespace from strings in a column.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.strip.html'
      },
      {
    'type': 'pandas_str_replace',
    'message0': 'in column %1 of %2 replace %3 with %4',
    'args0': [
      {
        'type': 'input_value',
        'name': 'COL',
        'check': 'String'
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'OLD',
        'check': 'String'
      },
      {
        'type': 'input_value',
        'name': 'NEW',
        'check': 'String'
      }
    ],
    'output': 'Series',
    'colour': '#2E7D32',
    'inputsInline': true,
    'tooltip': 'Category: Data Cleaning — Replaces all occurrences of a substring within a column\'s strings.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.replace.html'
      },
      {
    'type': 'pandas_merge_advanced',
    'message0': 'advanced merge of %1 and %2 on %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'LEFT_DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'RIGHT_DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'ON',
        'check': 'String'
      }
    ],
    'message1': 'logic %1',
    'args1': [
      {
        'type': 'field_dropdown',
        'name': 'LOGIC',
        'options': [
          ['nearest key', 'asof'],
          ['ordered fill', 'ordered']
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Joining & Merging — Advanced time-series and fuzzy merging.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.merge_asof.html'
  },
      {
    'type': 'pandas_pivot',
    'message0': 'pivot dataframe %1 index %2 columns %3 values %4',
    'args0': [
      { 'type': 'input_value', 'name': 'DF', 'check': 'DataFrame' },
      { 'type': 'input_value', 'name': 'INDEX', 'check': 'String' },
      { 'type': 'input_value', 'name': 'COLUMNS', 'check': 'String' },
      { 'type': 'input_value', 'name': 'VALUES', 'check': 'String' }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'inputsInline': true,
    'tooltip': 'Category: Reshaping & Pivoting — Return reshaped DataFrame organized by given index / column values.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.pivot.html'
      },
      {
    'type': 'pandas_melt',
    'message0': 'melt dataframe %1 id_vars %2 value_vars %3',
    'args0': [
      { 'type': 'input_value', 'name': 'DF', 'check': 'DataFrame' },
      { 'type': 'input_value', 'name': 'ID_VARS', 'check': ['String', 'Array'] },
      { 'type': 'input_value', 'name': 'VALUE_VARS', 'check': ['String', 'Array'] }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'inputsInline': true,
    'tooltip': 'Category: Reshaping & Pivoting — Unpivot a DataFrame from wide to long format.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.melt.html'
      },
      {
    'type': 'pandas_explode',
    'message0': 'explode dataframe %1 column %2',
    'args0': [
      { 'type': 'input_value', 'name': 'DF', 'check': 'DataFrame' },
      { 'type': 'input_value', 'name': 'COLUMN', 'check': 'String' }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Reshaping & Pivoting — Transform each element of a list-like to a row.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.explode.html'
  },
  {
    'type': 'pandas_transpose',
    'message0': 'transpose dataframe %1',
    'args0': [{ 'type': 'input_value', 'name': 'DF', 'check': 'DataFrame' }],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Reshaping & Pivoting — Reflect the DataFrame over its main diagonal.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.transpose.html'
  },
      {
    'type': 'pandas_crosstab',
    'message0': 'compute a cross-tabulation of two factors: index %1 columns %2',
    'args0': [
      { 'type': 'input_value', 'name': 'INDEX', 'check': 'Series' },
      { 'type': 'input_value', 'name': 'COLUMNS', 'check': 'Series' }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: Reshaping & Pivoting — Build a crosstab table that shows the frequency with which certain groups of data appear.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.crosstab.html'
  },
  {
    'type': 'pandas_apply',
    'message0': 'in dataframe %1 apply function %2 on axis %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'FUNC',
        'check': 'Function'
      },
      {
        'type': 'field_dropdown',
        'name': 'AXIS',
        'options': [
          [
            'rows',
            '0'
          ],
          [
            'columns',
            '1'
          ]
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Apply a function along an axis of the DataFrame.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.apply.html'
  },
  {
    'type': 'pandas_pivot_table',
    'message0': 'create pivot table from dataframe %1 with values %2 index %3 columns %4',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'VALUES',
        'check': [
          'String',
          'Array'
        ]
      },
      {
        'type': 'input_value',
        'name': 'INDEX',
        'check': [
          'String',
          'Array'
        ]
      },
      {
        'type': 'input_value',
        'name': 'COLUMNS',
        'check': [
          'String',
          'Array'
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Create a spreadsheet-style pivot table as a DataFrame.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.pivot_table.html'
  },
  {
    'type': 'pandas_to_datetime',
    'message0': 'convert %1 to datetime',
    'args0': [{
        'type': 'input_value',
        'name': 'ARG',
        'check': [
          'String',
          'Array',
          'Series'
        ]
      }],
    'message1': 'on error %1',
    'args1': [{
        'type': 'field_dropdown',
        'name': 'ERRORS',
        'options': [
          ['raise', 'raise'],
          ['coerce', 'coerce'],
          ['ignore', 'ignore']
        ]
    }],
    'output': 'Series',
    'colour': '#2E7D32',
    'tooltip': 'Convert argument to datetime.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.to_datetime.html'
  },
  {
    'type': 'pandas_to_dict',
    'message0': 'convert dataframe %1 to dictionary',
    'args0': [{
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }],
    'output': 'Object',
    'colour': '#2E7D32',
    'tooltip': 'Convert the DataFrame to a dictionary.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_dict.html'
  },
  {
    'type': 'pandas_idxmin',
    'message0': 'get index of minimum value for each column in dataframe %1',
    'args0': [{
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }],
    'output': 'Series',
    'colour': '#2E7D32',
    'tooltip': 'Category: Statistical Summary — Returns the index label of the minimum value for each column.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.idxmin.html'
  },
  {
    'type': 'pandas_idxmax',
    'message0': 'get index of maximum value for each column in dataframe %1',
    'args0': [{
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }],
    'output': 'Series',
    'colour': '#2E7D32',
    'tooltip': 'Category: Statistical Summary — Returns the index label of the maximum value for each column.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.idxmax.html'
  },
  {
    'type': 'pandas_unique',
    'message0': 'get unique values in column %1 of dataframe %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'COL',
        'check': 'String'
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': 'Array',
    'colour': '#2E7D32',
    'inputsInline': true,
    'tooltip': 'Category: Column Value Analysis — Returns a list of all unique values in the specified column.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.unique.html'
  },
  {
    'type': 'pandas_nunique',
    'message0': 'get number of unique values in column %1 of dataframe %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'COL',
        'check': 'String'
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': 'Number',
    'colour': '#2E7D32',
    'inputsInline': true,
    'tooltip': 'Category: Column Value Analysis — Returns the number of distinct unique values in the specified column.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.nunique.html'
  },
  {
    'type': 'pandas_interval',
    'message0': 'create interval from %1 to %2 closed %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'LEFT',
      },
      {
        'type': 'input_value',
        'name': 'RIGHT',
      },
      {
        'type': 'field_dropdown',
        'name': 'CLOSED',
        'options': [
          ['right', 'right'],
          ['left', 'left'],
          ['both', 'both'],
          ['neither', 'neither'],
        ],
      },
    ],
    'output': 'Interval',
    'colour': '#2E7D32',
    'tooltip': 'Create a pandas Interval.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Interval.html',
  },
  {
    'type': 'pandas_windowing',
    'message0': 'on dataframe %1 create %2 window with size %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['rolling', 'rolling'],
          ['expanding', 'expanding'],
          ['ewm', 'ewm'],
        ],
      },
      {
        'type': 'input_value',
        'name': 'SIZE',
        'check': 'Number'
      }
    ],
    'message1': 'and apply aggregation %1',
    'args1': [
      {
        'type': 'field_dropdown',
        'name': 'AGG_FUNC',
        'options': [
          ['mean', 'mean'],
          ['sum', 'sum'],
          ['std', 'std'],
          ['count', 'count'],
          ['max', 'max'],
          ['min', 'min']
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Create a rolling, expanding, or ewm window and apply an aggregation.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/user_guide/window.html',
  },
  {
    'type': 'pandas_resample',
    'message0': 'on dataframe %1 resample by rule %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'RULE',
        'check': 'String'
      }
    ],
    'message1': 'and apply aggregation %1',
    'args1': [
      {
        'type': 'field_dropdown',
        'name': 'AGG_FUNC',
        'options': [
          ['mean', 'mean'],
          ['sum', 'sum'],
          ['std', 'std'],
          ['count', 'count'],
          ['max', 'max'],
          ['min', 'min'],
          ['first', 'first'],
          ['last', 'last']
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Resample time-series data and apply an aggregation.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.resample.html',
  },
  {
    'type': 'pandas_time_series_operations',
    'message0': 'on dataframe %1 perform %2 with periods %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['shift', 'shift'],
          ['diff', 'diff'],
          ['pct_change', 'pct_change'],
        ],
      },
      {
        'type': 'input_value',
        'name': 'PERIODS',
        'check': 'Number'
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Perform a time-series operation.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.shift.html',
  },
  {
    'type': 'pandas_first_last',
    'message0': 'on dataframe %1 get %2 with offset %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['first', 'first'],
          ['last', 'last'],
        ],
      },
      {
        'type': 'input_value',
        'name': 'OFFSET',
        'check': 'String'
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Select initial or final periods of time series data based on a date offset.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.first.html',
  },
  {
    'type': 'pandas_set_freq',
    'message0': 'on dataframe %1 set frequency to %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'FREQ',
        'check': 'String'
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Convert time series to specified frequency. (Deprecated in favor of asfreq)',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.asfreq.html',
  },
  {
    'type': 'dataframe_peek',
    'message0': 'inspect dataframe %1 by showing %2 %3 rows',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['head', 'head'],
          ['tail', 'tail'],
          ['sample', 'sample'],
        ],
      },
      {
        'type': 'field_number',
        'name': 'N',
        'value': 5,
        'min': 1,
      },
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Inspects a DataFrame by showing a subset of rows. Choose head for the top rows, tail for the bottom rows, or sample for a random set of rows. Specify the number of rows (N).',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.head.html',
  },
  {
    'type': 'missing_data_handler',
    'message0': 'handle missing data in %1 with operation %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': ['DataFrame', 'Series']
      },
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['check null', 'isnull'],
          ['check not null', 'notnull'],
          ['count nulls', 'isnull_sum'],
          ['drop nulls', 'dropna'],
          ['fill nulls', 'fillna'],
          ['interpolate', 'interpolate']
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Handles missing data (NaN) in a DataFrame. Select an operation to check, count, drop, fill, or interpolate missing values.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/user_guide/missing_data.html',
    'extensions': ['missing_data_handler_extension']
  },
  {
    'type': 'series_str_accessor',
    'message0': 'on series %1 perform string operation %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SERIES',
        'check': 'Series'
      },
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['lower', 'lower'],
          ['upper', 'upper'],
          ['strip', 'strip'],
          ['length', 'len'],
          ['get', 'get'],
          ['contains', 'contains'],
          ['replace', 'replace'],
          ['split', 'split'],
          ['extract', 'extract'],
          ['find all', 'findall'],
          ['capitalize', 'capitalize'],
          ['title', 'title'],
          ['swapcase', 'swapcase'],
          ['is_numeric', 'isnumeric'],
          ['is_alpha', 'isalpha'],
          ['is_digit', 'isdigit'],
          ['is_lower', 'islower'],
          ['is_upper', 'isupper']
        ]
      }
    ],
    'output': 'Series',
    'colour': '#2E7D32',
    'tooltip': 'Performs a string operation on a Series. Select an operation and provide any required arguments.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/user_guide/text.html',
    'extensions': ['series_str_accessor_mutator']
  },
  {
    'type': 'series_cat_accessor',
    'message0': 'on series %1 perform categorical operation %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SERIES',
        'check': 'Series'
      },
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['codes', 'codes'],
          ['categories', 'categories'],
          ['ordered', 'ordered'],
          ['add categories', 'add_categories'],
          ['remove categories', 'remove_categories'],
          ['reorder categories', 'reorder_categories']
        ]
      }
    ],
    'output': null,
    'colour': '#2E7D32',
    'tooltip': 'Performs a categorical operation on a Series.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/user_guide/categorical.html',
    'extensions': ['series_cat_accessor_mutator']
  },
  {
    'type': 'pandas_astype_category',
    'message0': 'convert series %1 to category',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SERIES',
        'check': 'Series'
      }
    ],
    'output': null,
    'colour': '#2E7D32',
    'tooltip': 'Convert a Series to the category data type.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.astype.html'
  },
  {
    'type': 'dataframe_xs',
    'message0': 'from dataframe %1 select cross-section %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'KEY',
        'check': ['String', 'Array']
      }
    ],
    'output': null,
    'colour': '#2E7D32',
    'tooltip': 'Select a cross-section from a DataFrame.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.xs.html'
  },
  {
    'type': 'dataframe_pipe',
    'message0': 'pipe dataframe %1 through function %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'FUNC'
      }
    ],
    'colour': '#2E7D32',
    'tooltip': 'Apply a function to a DataFrame.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.pipe.html',
    'previousStatement': null,
    'nextStatement': null
  },
  {
    'type': 'pandas_eval',
    'message0': 'evaluate expression %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'EXPR',
        'check': 'String'
      }
    ],
    'colour': '#2E7D32',
    'tooltip': 'Evaluate a Python expression as a string.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.eval.html',
    'previousStatement': null,
    'nextStatement': null
  },
  {
    'type': 'pandas_json_normalize',
    'message0': 'normalize json %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'JSON',
        'check': ['String', 'Object']
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Category: I/O — Flatten a semi-structured JSON data into a flat table.',
    'helpUrl': 'https://pandas.pydata.org/docs/reference/api/pandas.json_normalize.html'
  },
  {
    'type': 'series_map',
    'message0': 'map series %1 with %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SERIES',
        'check': 'Series'
      },
      {
        'type': 'input_value',
        'name': 'ARG',
        'check': ['Function', 'Object']
      }
    ],
    'output': 'Series',
    'colour': '#2E7D32',
    'tooltip': 'Map values of Series according to input correspondence.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.map.html'
  },
  {
    'type': 'combine_dataframes',
    'message0': 'combine dataframes with operation %1',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['merge', 'MERGE'],
          ['join', 'JOIN'],
          ['concat', 'CONCAT']
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Combines DataFrames using merge, join, or concat. Shape changes based on selection.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/user_guide/merging.html',
    'extensions': ['combine_dataframes_extension']
  },
  {
    'type': 'dataframe_swaplevel',
    'message0': 'swap levels %1 and %2 of %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'I',
        'check': ['Number', 'String']
      },
      {
        'type': 'input_value',
        'name': 'J',
        'check': ['Number', 'String']
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Swap levels i and j in a MultiIndex.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.swaplevel.html'
  },
  {
    'type': 'dataframe_droplevel',
    'message0': 'drop level %1 from %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'LEVEL',
        'check': ['Number', 'String']
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Return DataFrame with requested index / column level(s) removed.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.droplevel.html'
  },
  {
    'type': 'dataframe_set_names',
    'message0': 'set names %1 for levels of %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'NAMES',
        'check': ['String', 'Array']
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Set new names on index or column levels.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.set_names.html'
  },
  {
    'type': 'pandas_dt_strftime',
    'message0': 'format datetime series %1 with format %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SERIES',
        'check': 'Series'
      },
      {
        'type': 'input_value',
        'name': 'FORMAT',
        'check': 'String'
      }
    ],
    'output': 'Series',
    'colour': '#2E7D32',
    'tooltip': 'Format datetime objects in a Series as strings.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.dt.strftime.html'
  },
  {
    'type': 'pandas_plot',
    'message0': 'plot dataframe %1 as %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'field_dropdown',
        'name': 'PLOT_TYPE',
        'options': [
          ['line', 'line'],
          ['bar', 'bar'],
          ['scatter', 'scatter'],
          ['histogram', 'hist'],
          ['box', 'box']
        ]
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#2E7D32',
    'tooltip': 'Generate a plot from a DataFrame.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.plot.html',
    'extensions': ['pandas_plot_extension']
  }
]);

const COMBINE_DATAFRAMES_MIXIN = {
  updateShape_: function(operation) {
    // Clean up previous inputs
    let i = 1;
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }

    if (operation === 'MERGE') {
      this.appendValueInput('ARG1')
          .setCheck('DataFrame')
          .appendField('left');
      this.appendValueInput('ARG2')
          .setCheck('DataFrame')
          .appendField('right');
      this.appendDummyInput('ARG3')
          .appendField('how')
          .appendField(new Blockly.FieldDropdown([
            ['inner', 'inner'],
            ['left', 'left'],
            ['right', 'right'],
            ['outer', 'outer']
          ]), 'HOW');
      this.appendValueInput('ARG4')
          .setCheck(['String', 'Array'])
          .appendField('on');
    } else if (operation === 'JOIN') {
      this.appendValueInput('ARG1')
          .setCheck('DataFrame')
          .appendField('left');
      this.appendValueInput('ARG2')
          .setCheck('DataFrame')
          .appendField('right');
      this.appendDummyInput('ARG3')
          .appendField('how')
          .appendField(new Blockly.FieldDropdown([
            ['left', 'left'],
            ['right', 'right'],
            ['outer', 'outer'],
            ['inner', 'inner']
          ]), 'HOW');
    } else if (operation === 'CONCAT') {
      this.appendValueInput('ARG1')
          .setCheck('Array')
          .appendField('dataframes');
      this.appendDummyInput('ARG2')
          .appendField('axis')
          .appendField(new Blockly.FieldDropdown([
            ['rows (0)', '0'],
            ['columns (1)', '1']
          ]), 'AXIS');
    }
  }
};

const COMBINE_DATAFRAMES_EXTENSION = function() {
  this.mixin(COMBINE_DATAFRAMES_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'OPERATION') {
      this.updateShape_(this.getFieldValue('OPERATION'));
    }
  });

  this.updateShape_(this.getFieldValue('OPERATION'));
};

Blockly.Extensions.register('combine_dataframes_extension', COMBINE_DATAFRAMES_EXTENSION);

const MISSING_DATA_HANDLER_MIXIN = {
  updateShape_: function(operation) {
    // Remove existing inputs if they exist
    if (this.getInput('VALUE')) {
      this.removeInput('VALUE');
    }
    if (this.getInput('METHOD')) {
      this.removeInput('METHOD');
    }

    // Add inputs based on the operation
    if (operation === 'fillna') {
      this.appendValueInput('VALUE')
          .setCheck(null)
          .appendField('with value');
      this.appendDummyInput('METHOD')
          .appendField('or method')
          .appendField(new Blockly.FieldDropdown([
            ['none', 'none'],
            ['forward fill', 'ffill'],
            ['backward fill', 'bfill']
          ]), 'METHOD_DROPDOWN');
    }

    if (operation === 'isnull' || operation === 'notnull') {
      this.setOutput(true, 'DataFrame');
    } else if (operation === 'isnull_sum') {
        this.setOutput(true, 'Series');
    } else {
        this.setOutput(true, 'DataFrame');
    }
  }
};

const MISSING_DATA_HANDLER_EXTENSION = function() {
  this.mixin(MISSING_DATA_HANDLER_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'OPERATION') {
      this.updateShape_(this.getFieldValue('OPERATION'));
    }
  });
  this.updateShape_(this.getFieldValue('OPERATION'));
};

Blockly.Extensions.register('missing_data_handler_extension', MISSING_DATA_HANDLER_EXTENSION);

const SERIES_STR_ACCESSOR_MUTATOR = {
  // The logic to add/remove inputs
  updateShape_: function(operation) {
    // Remove existing inputs if they exist
    if (this.getInput('SUBSTRING')) this.removeInput('SUBSTRING');
    if (this.getInput('OLD')) this.removeInput('OLD');
    if (this.getInput('NEW')) this.removeInput('NEW');
    if (this.getInput('SEPARATOR')) this.removeInput('SEPARATOR');
    if (this.getInput('PATTERN')) this.removeInput('PATTERN');
    if (this.getInput('INDEX')) this.removeInput('INDEX');

    // Add inputs based on the operation
    if (operation === 'contains' || operation === 'extract' || operation === 'findall') {
      this.appendValueInput('PATTERN')
          .setCheck('String')
          .appendField('pattern');
    } else if (operation === 'replace') {
      this.appendValueInput('OLD')
          .setCheck('String')
          .appendField('replace');
      this.appendValueInput('NEW')
          .setCheck('String')
          .appendField('with');
    } else if (operation === 'split') {
        this.appendValueInput('SEPARATOR')
            .setCheck('String')
            .appendField('by');
    } else if (operation === 'get') {
        this.appendValueInput('INDEX')
            .setCheck('Number')
            .appendField('at index');
    }
  }
};

const SERIES_STR_ACCESSOR_EXTENSION = function() {
  this.mixin(SERIES_STR_ACCESSOR_MUTATOR);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'OPERATION') {
      this.updateShape_(this.getFieldValue('OPERATION'));
    }
  });

  this.updateShape_(this.getFieldValue('OPERATION'));
};

Blockly.Extensions.register('series_str_accessor_mutator', SERIES_STR_ACCESSOR_EXTENSION);

const SERIES_CAT_ACCESSOR_MUTATOR = {
  updateShape_: function(operation) {
    // Clean up previous inputs
    if (this.getInput('CATEGORIES')) this.removeInput('CATEGORIES');

    // Add inputs based on the operation
    if (operation === 'add_categories' || operation === 'remove_categories' || operation === 'reorder_categories') {
      this.appendValueInput('CATEGORIES')
          .setCheck('Array')
          .appendField('categories');
    }
  }
};

const SERIES_CAT_ACCESSOR_EXTENSION = function() {
  this.mixin(SERIES_CAT_ACCESSOR_MUTATOR);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'OPERATION') {
      this.updateShape_(this.getFieldValue('OPERATION'));
    }
  });

  this.updateShape_(this.getFieldValue('OPERATION'));
};

Blockly.Extensions.register('series_cat_accessor_mutator', SERIES_CAT_ACCESSOR_EXTENSION);

const PANDAS_PLOT_MIXIN = {
  updateShape_: function(plotType) {
    const xyExists = this.getInput('X_Y_INPUTS');

    if (plotType === 'scatter') {
      if (!xyExists) {
        this.appendDummyInput('X_Y_INPUTS')
            .appendField('x:')
            .appendField(new Blockly.FieldTextInput('col1'), 'X_COL')
            .appendField('y:')
            .appendField(new Blockly.FieldTextInput('col2'), 'Y_COL');
      }
    } else {
      if (xyExists) {
        this.removeInput('X_Y_INPUTS');
      }
    }
  }
};

const PANDAS_PLOT_EXTENSION = function() {
  this.mixin(PANDAS_PLOT_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'PLOT_TYPE') {
      this.updateShape_(this.getFieldValue('PLOT_TYPE'));
    }
  });

  this.updateShape_(this.getFieldValue('PLOT_TYPE'));
};

Blockly.Extensions.register('pandas_plot_extension', PANDAS_PLOT_EXTENSION);

const PANDAS_GROUPBY_MIXIN = {
  updateShape_: function(operation) {
    // Clean up previous inputs
    if (this.getInput('AGG_INPUT')) this.removeInput('AGG_INPUT');
    if (this.getInput('FUNC_INPUT')) this.removeInput('FUNC_INPUT');

    if (operation === 'agg') {
      this.appendValueInput('AGG_INPUT')
          .setCheck('Object')
          .appendField('with');
      this.setOutput(true, 'DataFrame');
    } else if (operation === 'transform' || operation === 'filter') {
      this.appendValueInput('FUNC_INPUT')
          .appendField('with function');
      this.setOutput(true, 'DataFrame');
    } else if (operation === 'cumcount') {
      this.setOutput(true, 'Series');
    } else if (operation === 'ngroups') {
        this.setOutput(true, 'Number');
    } else { // first, last
        this.setOutput(true, 'DataFrame');
    }
  }
};

const PANDAS_GROUPBY_EXTENSION = function() {
  this.mixin(PANDAS_GROUPBY_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'OPERATION') {
      this.updateShape_(this.getFieldValue('OPERATION'));
    }
  });

  this.updateShape_(this.getFieldValue('OPERATION'));
};

Blockly.Extensions.register('pandas_groupby_extension', PANDAS_GROUPBY_EXTENSION);

const DATAFRAME_PROPERTY_OR_METADATA_MIXIN = {
  updateShape_: function(property) {
    if (property === 'info') {
      this.setOutput(false);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    } else {
      this.setOutput(true);
      this.setPreviousStatement(false);
      this.setNextStatement(false);
    }

    if (property === 'shape' || property === 'axes' || property === 'columns' || property === 'index') {
        this.setOutput(true, 'Array');
    } else if (property === 'size' || property === 'ndim') {
        this.setOutput(true, 'Number');
    } else if (property === 'dtypes') {
        this.setOutput(true, 'Series');
    } else if (property === 'describe') {
        this.setOutput(true, 'DataFrame');
    }
  }
};

const DATAFRAME_PROPERTY_OR_METADATA_EXTENSION = function() {
  this.mixin(DATAFRAME_PROPERTY_OR_METADATA_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'PROPERTY') {
      this.updateShape_(this.getFieldValue('PROPERTY'));
    }
  });

  this.updateShape_(this.getFieldValue('PROPERTY'));
};

Blockly.Extensions.register('dataframe_property_or_metadata_extension', DATAFRAME_PROPERTY_OR_METADATA_EXTENSION);

const PANDAS_MANAGE_OPTION_MIXIN = {
  updateShape_: function(operation) {
    const valueInputExists = this.getInput('VALUE');

    if (operation === 'SET') {
      this.setOutput(false);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      if (!valueInputExists) {
        this.appendValueInput('VALUE').appendField('to');
      }
    } else if (operation === 'GET') {
      this.setOutput(true);
      this.setPreviousStatement(false);
      this.setNextStatement(false);
      if (valueInputExists) {
        this.removeInput('VALUE');
      }
    } else { // RESET
      this.setOutput(false);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      if (valueInputExists) {
        this.removeInput('VALUE');
      }
    }
  }
};

const PANDAS_MANAGE_OPTION_EXTENSION = function() {
  this.mixin(PANDAS_MANAGE_OPTION_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'OPERATION') {
      this.updateShape_(this.getFieldValue('OPERATION'));
    }
  });

  this.updateShape_(this.getFieldValue('OPERATION'));
};

Blockly.Extensions.register('pandas_manage_option_extension', PANDAS_MANAGE_OPTION_EXTENSION);

const PANDAS_IO_FORMAT_TRANSFER_MIXIN = {
  updateShape_: function(operation, format) {
    // Clean up previous inputs
    if (this.getInput('DF_INPUT')) this.removeInput('DF_INPUT');
    if (this.getInput('PATH')) this.removeInput('PATH');
    if (this.getInput('TABLE')) this.removeInput('TABLE');
    if (this.getInput('CONN')) this.removeInput('CONN');

    // Add inputs based on operation
    if (operation === 'WRITE') {
      this.setOutput(false);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.appendValueInput('DF_INPUT').setCheck('DataFrame').appendField('with dataframe');
    } else { // READ
      this.setOutput(true, 'DataFrame');
      this.setPreviousStatement(false);
      this.setNextStatement(false);
    }

    // Add inputs based on format
    if (format === 'SQL') {
      this.appendValueInput('TABLE').setCheck('String').appendField('table');
      this.appendValueInput('CONN').appendField('connection');
    } else {
      this.appendValueInput('PATH').setCheck('String').appendField('path');
    }
  }
};

const PANDAS_IO_FORMAT_TRANSFER_EXTENSION = function() {
  this.mixin(PANDAS_IO_FORMAT_TRANSFER_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && (event.name === 'OPERATION' || event.name === 'FORMAT')) {
      this.updateShape_(this.getFieldValue('OPERATION'), this.getFieldValue('FORMAT'));
    }
  });

  this.updateShape_(this.getFieldValue('OPERATION'), this.getFieldValue('FORMAT'));
};

Blockly.Extensions.register('pandas_io_format_transfer_extension', PANDAS_IO_FORMAT_TRANSFER_EXTENSION);

const PANDAS_STRUCTURE_FACTORY_MIXIN = {
  updateShape_: function(structureType) {
    // Clean up previous inputs
    const inputs = ['DICT', 'DATA', 'INDEX', 'TUPLES', 'START', 'END', 'FREQ', 'VALUE', 'UNIT', 'LEFT', 'RIGHT', 'CLOSED'];
    inputs.forEach(input => {
      if (this.getInput(input)) this.removeInput(input);
    });

    // Add inputs based on structure type
    switch (structureType) {
      case 'DATAFRAME':
        this.appendValueInput('DICT').setCheck('Object').appendField('from dictionary');
        this.setOutput(true, 'DataFrame');
        break;
      case 'SERIES':
        this.appendValueInput('DATA').setCheck(['Array', 'Object']).appendField('with data');
        this.appendValueInput('INDEX').setCheck('Array').appendField('and index');
        this.setOutput(true, 'Series');
        break;
      case 'INDEX':
        this.appendValueInput('DATA').setCheck('Array').appendField('with data');
        this.setOutput(true, 'Index');
        break;
      case 'MULTIINDEX':
        this.appendValueInput('TUPLES').setCheck('Array').appendField('from list of tuples');
        this.setOutput(true, 'Index');
        break;
      case 'DATERANGE':
        this.appendValueInput('START').setCheck('String').appendField('from');
        this.appendValueInput('END').setCheck('String').appendField('to');
        this.appendDummyInput('FREQ').appendField('with frequency').appendField(new Blockly.FieldTextInput('D'), 'FREQ');
        this.setOutput(true, 'Index');
        break;
      case 'TIMEDELTA':
        this.appendValueInput('VALUE').setCheck('Number').appendField('of');
        this.appendDummyInput('UNIT').appendField(new Blockly.FieldDropdown([
          ['days', 'D'], ['hours', 'h'], ['minutes', 'm'], ['seconds', 's']
        ]), 'UNIT');
        this.setOutput(true, 'Timedelta');
        break;
      case 'INTERVAL':
        this.appendValueInput('LEFT').appendField('from');
        this.appendValueInput('RIGHT').appendField('to');
        this.appendDummyInput('CLOSED').appendField('closed').appendField(new Blockly.FieldDropdown([
          ['right', 'right'], ['left', 'left'], ['both', 'both'], ['neither', 'neither']
        ]), 'CLOSED');
        this.setOutput(true, 'Interval');
        break;
      case 'PERIODINDEX':
        this.appendValueInput('DATA').setCheck('Array').appendField('with data');
        this.setOutput(true, 'Index');
        break;
      case 'TIMEDELTAINDEX':
        this.appendValueInput('DATA').setCheck('Array').appendField('with data');
        this.setOutput(true, 'Index');
        break;
    }
  }
};

const PANDAS_STRUCTURE_FACTORY_EXTENSION = function() {
  this.mixin(PANDAS_STRUCTURE_FACTORY_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'STRUCTURE_TYPE') {
      this.updateShape_(this.getFieldValue('STRUCTURE_TYPE'));
    }
  });

  this.updateShape_(this.getFieldValue('STRUCTURE_TYPE'));
};

Blockly.Extensions.register('pandas_structure_factory_extension', PANDAS_STRUCTURE_FACTORY_EXTENSION);

const TIMESERIES_DT_ACCESSOR_UNIFIED_MIXIN = {
  updateShape_: function(operation) {
    // Clean up previous inputs
    if (this.getInput('TZ')) this.removeInput('TZ');
    if (this.getInput('FORMAT')) this.removeInput('FORMAT');

    // Add inputs based on operation
    if (operation === 'tz_localize' || operation === 'tz_convert') {
      this.appendValueInput('TZ').setCheck('String').appendField('timezone');
    } else if (operation === 'strftime') {
      this.appendValueInput('FORMAT').setCheck('String').appendField('format');
    }
  }
};

const TIMESERIES_DT_ACCESSOR_UNIFIED_EXTENSION = function() {
  this.mixin(TIMESERIES_DT_ACCESSOR_UNIFIED_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'OPERATION') {
      this.updateShape_(this.getFieldValue('OPERATION'));
    }
  });

  this.updateShape_(this.getFieldValue('OPERATION'));
};

Blockly.Extensions.register('timeseries_dt_accessor_unified_extension', TIMESERIES_DT_ACCESSOR_UNIFIED_EXTENSION);

const DATAFRAME_DATA_SELECTOR_MIXIN = {
  updateShape_: function(accessMethod) {
    // Clean up previous inputs
    const inputs = ['COL', 'ROWS', 'COLS', 'CONDITION', 'INDICES'];
    inputs.forEach(input => {
      if (this.getInput(input)) this.removeInput(input);
    });

    // Add inputs based on access method
    switch (accessMethod) {
      case 'COLUMN':
        this.appendValueInput('COL').setCheck('String').appendField('select column');
        this.setOutput(true, 'Series');
        break;
      case 'LOC':
        this.appendValueInput('ROWS').appendField('select rows by label');
        this.appendValueInput('COLS').appendField('and columns');
        this.setOutput(true, 'DataFrame');
        break;
      case 'ILOC':
        this.appendValueInput('ROWS').appendField('select rows by position');
        this.appendValueInput('COLS').appendField('and columns');
        this.setOutput(true, 'DataFrame');
        break;
      case 'FILTER':
        this.appendValueInput('CONDITION').setCheck('Boolean').appendField('where');
        this.setOutput(true, 'DataFrame');
        break;
      case 'TAKE':
        this.appendValueInput('INDICES').setCheck('Array').appendField('at indices');
        this.setOutput(true, 'DataFrame');
        break;
    }
  }
};

const DATAFRAME_DATA_SELECTOR_EXTENSION = function() {
  this.mixin(DATAFRAME_DATA_SELECTOR_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'ACCESS_METHOD') {
      this.updateShape_(this.getFieldValue('ACCESS_METHOD'));
    }
  });

  this.updateShape_(this.getFieldValue('ACCESS_METHOD'));
};

Blockly.Extensions.register('dataframe_data_selector_extension', DATAFRAME_DATA_SELECTOR_EXTENSION);

const DATAFRAME_SIMPLE_STATISTIC_MIXIN = {
  updateShape_: function(stat) {
    const quantileInputExists = this.getInput('QUANTILE');

    if (stat === 'quantile') {
      if (!quantileInputExists) {
        this.appendValueInput('QUANTILE')
            .setCheck('Number')
            .appendField('q');
      }
    } else {
      if (quantileInputExists) {
        this.removeInput('QUANTILE');
      }
    }
  }
};

const DATAFRAME_SIMPLE_STATISTIC_EXTENSION = function() {
  this.mixin(DATAFRAME_SIMPLE_STATISTIC_MIXIN);

  this.setOnChange(function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'STAT') {
      this.updateShape_(this.getFieldValue('STAT'));
    }
  });

  this.updateShape_(this.getFieldValue('STAT'));
};

Blockly.Extensions.register('dataframe_simple_statistic_extension', DATAFRAME_SIMPLE_STATISTIC_EXTENSION);


Blockly.defineBlocksWithJsonArray([
  {
    'type': 'dataframe_select_dtypes',
    'message0': 'from dataframe %1 select columns of type %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'field_dropdown',
        'name': 'DTYPE',
        'options': [
          ['number', 'number'],
          ['object', 'object'],
          ['category', 'category']
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Select columns of a DataFrame based on their data type.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.select_dtypes.html'
  },
  {
    'type': 'validate_property',
    'message0': 'check if %1 is %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SERIES',
        'check': ['Series', 'Index']
      },
      {
        'type': 'field_dropdown',
        'name': 'PROPERTY',
        'options': [
          ['unique', 'is_unique'],
          ['monotonic increasing', 'is_monotonic_increasing'],
          ['monotonic decreasing', 'is_monotonic_decreasing']
        ]
      }
    ],
    'output': 'Boolean',
    'colour': '#2E7D32',
    'tooltip': 'Check a boolean property of a Series or Index.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.is_unique.html'
  },
  {
    'type': 'dataframe_iterrows',
    'message0': 'iterate over rows of dataframe %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': 'Iterator',
    'colour': '#2E7D32',
    'tooltip': 'Iterate over DataFrame rows as (index, Series) pairs.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.iterrows.html'
  },
  {
    'type': 'dataframe_itertuples',
    'message0': 'iterate over rows of dataframe %1 as named tuples',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': 'Iterator',
    'colour': '#2E7D32',
    'tooltip': 'Iterate over DataFrame rows as namedtuples.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.itertuples.html'
  },
  {
    'type': 'dataframe_applymap',
    'message0': 'in dataframe %1 apply function %2 element-wise',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'FUNC',
        'check': 'Function'
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Apply a function to a Dataframe element-wise.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.applymap.html'
  },
  {
    'type': 'dataframe_simple_statistic',
    'message0': 'calculate %1 of %2',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'STAT',
        'options': [
          ['mean', 'mean'],
          ['median', 'median'],
          ['standard deviation', 'std'],
          ['variance', 'var'],
          ['sum', 'sum'],
          ['min', 'min'],
          ['max', 'max'],
          ['count', 'count'],
          ['index of min', 'idxmin'],
          ['index of max', 'idxmax'],
          ['mean absolute deviation', 'mad'],
          ['quantile', 'quantile']
        ]
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': ['DataFrame', 'Series']
      }
    ],
    'output': 'Series',
    'colour': '#2E7D32',
    'tooltip': 'Calculate a simple statistic for a DataFrame or Series.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.mean.html',
    'extensions': ['dataframe_simple_statistic_extension']
  },
  {
    'type': 'dataframe_property_or_metadata',
    'message0': 'get %1 of %2',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'PROPERTY',
        'options': [
          ['info', 'info'],
          ['describe', 'describe'],
          ['shape', 'shape'],
          ['size', 'size'],
          ['number of dimensions', 'ndim'],
          ['axes', 'axes'],
          ['data types', 'dtypes'],
          ['columns', 'columns'],
          ['index', 'index']
        ]
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': null,
    'colour': '#2E7D32',
    'tooltip': 'Get a property or metadata from a DataFrame.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html',
    'extensions': ['dataframe_property_or_metadata_extension']
  },
  {
    'type': 'pandas_stack_unstack',
    'message0': '%1 %2',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['stack', 'stack'],
          ['unstack', 'unstack'],
        ],
      },
      {
        'type': 'input_value',
        'name': 'DF',
        'check': ['DataFrame', 'Series']
      }
    ],
    'output': ['DataFrame', 'Series'],
    'colour': '#2E7D32',
    'tooltip': 'Stack or unstack a DataFrame or Series.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.stack.html'
  },
  {
    'type': 'pandas_period_index',
    'message0': 'create period index from %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DATA',
        'check': 'Array'
      }
    ],
    'output': 'Index',
    'colour': '#2E7D32',
    'tooltip': 'Create a PeriodIndex.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.PeriodIndex.html'
  },
  {
    'type': 'pandas_timedelta_index',
    'message0': 'create timedelta index from %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DATA',
        'check': 'Array'
      }
    ],
    'output': 'Index',
    'colour': '#2E7D32',
    'tooltip': 'Create a TimedeltaIndex.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.TimedeltaIndex.html'
  },
  {
    'type': 'pandas_groupby',
    'message0': 'in dataframe %1 group by %2 and %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'input_value',
        'name': 'BY',
        'check': ['String', 'Array']
      },
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['aggregate', 'agg'],
          ['transform', 'transform'],
          ['filter', 'filter'],
          ['get first', 'first'],
          ['get last', 'last'],
          ['cumulative count', 'cumcount'],
          ['get number of groups', 'ngroups']
        ]
      }
    ],
    'output': 'DataFrame',
    'colour': '#2E7D32',
    'tooltip': 'Group a DataFrame and perform an operation on the groups.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.groupby.html',
    'extensions': ['pandas_groupby_extension']
  },
  {
    'type': 'pandas_manage_option',
    'message0': '%1 pandas option %2',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['set', 'SET'],
          ['get', 'GET'],
          ['reset', 'RESET']
        ]
      },
      {
        'type': 'field_dropdown',
        'name': 'OPTION',
        'options': [
          ['display.max_rows', 'display.max_rows'],
          ['display.max_columns', 'display.max_columns'],
          ['display.width', 'display.width']
        ]
      }
    ],
    'colour': '#2E7D32',
    'tooltip': 'Manage pandas display options.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/user_guide/options.html',
    'extensions': ['pandas_manage_option_extension']
  },
  {
    'type': 'pandas_io_format_transfer',
    'message0': '%1 data %2',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['read', 'READ'],
          ['write', 'WRITE']
        ]
      },
      {
        'type': 'field_dropdown',
        'name': 'FORMAT',
        'options': [
          ['csv', 'CSV'],
          ['excel', 'EXCEL'],
          ['json', 'JSON'],
          ['sql', 'SQL'],
          ['parquet', 'PARQUET'],
          ['pickle', 'PICKLE']
        ]
      }
    ],
    'colour': '#2E7D32',
    'tooltip': 'Read data from or write data to various structured file formats. Select the Operation and Format, and inputs will adjust for file-specific options.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/user_guide/io.html',
    'extensions': ['pandas_io_format_transfer_extension']
  },
  {
    'type': 'pandas_structure_factory',
    'message0': 'create pandas %1',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'STRUCTURE_TYPE',
        'options': [
          ['DataFrame', 'DATAFRAME'],
          ['Series', 'SERIES'],
          ['Index', 'INDEX'],
          ['MultiIndex', 'MULTIINDEX'],
          ['DateRange', 'DATERANGE'],
          ['Timedelta', 'TIMEDELTA'],
          ['Interval', 'INTERVAL'],
          ['PeriodIndex', 'PERIODINDEX'],
          ['TimedeltaIndex', 'TIMEDELTAINDEX']
        ]
      }
    ],
    'colour': '#2E7D32',
    'tooltip': 'Create a fundamental Pandas object or index type from scratch. Select the structure and provide the necessary input data and configuration.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/getting_started/dsintro.html',
    'extensions': ['pandas_structure_factory_extension']
  },
  {
    'type': 'timeseries_dt_accessor_unified',
    'message0': 'from series %1 get %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SERIES',
        'check': 'Series'
      },
      {
        'type': 'field_dropdown',
        'name': 'OPERATION',
        'options': [
          ['year', 'year'], ['month', 'month'], ['day', 'day'], ['hour', 'hour'], ['minute', 'minute'], ['second', 'second'],
          ['microsecond', 'microsecond'], ['nanosecond', 'nanosecond'], ['dayofweek', 'dayofweek'], ['weekday', 'weekday'],
          ['isoweekday', 'isoweekday'], ['day_name', 'day_name'], ['dayofyear', 'dayofyear'], ['month_name', 'month_name'],
          ['quarter', 'quarter'], ['weekofyear', 'weekofyear'], ['date', 'date'], ['time', 'time'], ['timezone', 'tz'],
          ['days', 'days'], ['seconds', 'seconds'],
          ['is month start', 'is_month_start'], ['is month end', 'is_month_end'], ['is quarter start', 'is_quarter_start'],
          ['is quarter end', 'is_quarter_end'], ['is year start', 'is_year_start'], ['is year end', 'is_year_end'],
          ['to period', 'to_period'], ['to timestamp', 'to_timestamp'],
          ['localize timezone', 'tz_localize'], ['convert timezone', 'tz_convert'],
          ['normalize', 'normalize'], ['isocalendar', 'isocalendar'], ['strftime', 'strftime']
        ]
      }
    ],
    'output': null,
    'colour': '#2E7D32',
    'tooltip': 'Access and manipulate the date and time components of a Series using the .dt accessor. Select the specific component or operation from the dropdown.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/series.html#datetime-properties',
    'extensions': ['timeseries_dt_accessor_unified_extension']
  },
  {
    'type': 'dataframe_data_selector',
    'message0': 'from dataframe %1 %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      },
      {
        'type': 'field_dropdown',
        'name': 'ACCESS_METHOD',
        'options': [
          ['select column', 'COLUMN'],
          ['slice by label (loc)', 'LOC'],
          ['slice by position (iloc)', 'ILOC'],
          ['filter by condition', 'FILTER'],
          ['select by index array (take)', 'TAKE']
        ]
      }
    ],
    'output': null,
    'colour': '#2E7D32',
    'tooltip': 'Select, slice, or filter data from a DataFrame or Series. Choose to select columns, slice by label (loc), slice by position (iloc), select by index array (take), or filter by condition.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html',
    'extensions': ['dataframe_data_selector_extension']
  },
  {
    'type': 'pandas_date_offset',
    'message0': 'create date offset with %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'KWARGS',
        'check': 'Object'
      }
    ],
    'output': 'DateOffset',
    'colour': '#2E7D32',
    'tooltip': 'Create a DateOffset object for time series operations.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DateOffset.html'
  },
  {
    'type': 'dataframe_items',
    'message0': 'iterate over columns of dataframe %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'DF',
        'check': 'DataFrame'
      }
    ],
    'output': 'Iterator',
    'colour': '#2E7D32',
    'tooltip': 'Iterate over DataFrame columns as (column_name, Series) pairs.',
    'helpUrl': 'https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.items.html'
  }
]);
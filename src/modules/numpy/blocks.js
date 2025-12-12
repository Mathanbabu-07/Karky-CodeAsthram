import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    'type': 'numpy_array',
    'message0': 'create numpy array from %1 with data type %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'LIST',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'DTYPE',
        'check': 'String'
      }
    ],
    'output': 'Array',
    'colour': '#FFA000',
    'inputsInline': true,
    'tooltip': 'Create a new numpy array from a list, with an optional data type.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.array.html'
  },
  {
    'type': 'numpy_arange',
    'message0': 'numpy array from range start %1 stop %2 step %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'START',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'STOP',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'STEP',
        'check': 'Number'
      }
    ],
    'output': 'Array',
    'colour': '#FFA000',
    'inputsInline': true,
    'tooltip': 'Return evenly spaced values within a given interval.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.arange.html'
  },
  {
    'type': 'numpy_reshape',
    'message0': 'reshape numpy array %1 to shape %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'ARRAY',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'SHAPE',
        'check': [
          'Array',
          'Tuple'
        ]
      }
    ],
    'output': 'Array',
    'colour': '#FFA000',
    'tooltip': 'Gives a new shape to an array without changing its data.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.reshape.html'
  },
  {
    'type': 'numpy_zeros',
    'message0': 'create numpy array of zeros with shape %1',
    'args0': [{
        'type': 'input_value',
        'name': 'SHAPE',
        'check': [
          'Array',
          'Tuple'
        ]
      }],
    'output': 'Array',
    'colour': '#FFA000',
    'tooltip': 'Return a new array of given shape and type, filled with zeros.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.zeros.html'
  },
  {
    'type': 'numpy_ones',
    'message0': 'create numpy array of ones with shape %1',
    'args0': [{
        'type': 'input_value',
        'name': 'SHAPE',
        'check': [
          'Array',
          'Tuple'
        ]
      }],
    'output': 'Array',
    'colour': '#FFA000',
    'tooltip': 'Return a new array of given shape and type, filled with ones.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.ones.html'
  },
  {
    'type': 'numpy_concatenate',
    'message0': 'concatenate numpy arrays %1 on axis %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'ARRAYS',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'AXIS',
        'check': 'Number'
      }
    ],
    'output': 'Array',
    'colour': '#FFA000',
    'tooltip': 'Join a sequence of arrays along an existing axis.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.concatenate.html'
  },
  {
    'type': 'numpy_vstack',
    'message0': 'stack arrays vertically %1',
    'args0': [{
        'type': 'input_value',
        'name': 'ARRAYS',
        'check': 'Array'
      }],
    'output': 'Array',
    'colour': '#FFA000',
    'tooltip': 'Stack arrays in sequence vertically (row wise).',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.vstack.html'
  },
  {
    'type': 'numpy_hstack',
    'message0': 'stack arrays horizontally %1',
    'args0': [{
        'type': 'input_value',
        'name': 'ARRAYS',
        'check': 'Array'
      }],
    'output': 'Array',
    'colour': '#FFA000',
    'tooltip': 'Stack arrays in sequence horizontally (column wise).',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.hstack.html'
  },
  {
    'type': 'numpy_split',
    'message0': 'split array %1 into %2 sections on axis %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'ARRAY',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'SECTIONS',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'AXIS',
        'check': 'Number'
      }
    ],
    'output': 'Array',
    'colour': '#FFA000',
    'tooltip': 'Split an array into multiple sub-arrays.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.split.html'
  },
  {
    'type': 'numpy_sum',
    'message0': 'sum of numpy array %1',
    'args0': [{
        'type': 'input_value',
        'name': 'ARRAY',
        'check': 'Array'
      }],
    'output': 'Number',
    'colour': '#FFA000',
    'tooltip': 'Sum of array elements over a given axis.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.sum.html'
  },
  {
    'type': 'numpy_mean',
    'message0': 'mean of numpy array %1',
    'args0': [{
        'type': 'input_value',
        'name': 'ARRAY',
        'check': 'Array'
      }],
    'output': 'Number',
    'colour': '#FFA000',
    'tooltip': 'Compute the arithmetic mean along the specified axis.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.mean.html'
  },
  {
    'type': 'numpy_std',
    'message0': 'standard deviation of numpy array %1',
    'args0': [{
        'type': 'input_value',
        'name': 'ARRAY',
        'check': 'Array'
      }],
    'output': 'Number',
    'colour': '#FFA000',
    'tooltip': 'Compute the standard deviation along the specified axis.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.std.html'
  },
  {
    'type': 'numpy_dot',
    'message0': 'dot product of %1 and %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'A',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'B',
        'check': 'Array'
      }
    ],
    'output': [
      'Number',
      'Array'
    ],
    'colour': '#FFA000',
    'inputsInline': true,
    'tooltip': 'Dot product of two arrays.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/generated/numpy.dot.html'
  },
  {
    'type': 'numpy_elementwise_op',
    'message0': '%1 %2 %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'A',
        'check': 'Array'
      },
      {
        'type': 'field_dropdown',
        'name': 'OP',
        'options': [
          [
            '+',
            'add'
          ],
          [
            '-',
            'subtract'
          ],
          [
            '*',
            'multiply'
          ],
          [
            '/',
            'divide'
          ]
        ]
      },
      {
        'type': 'input_value',
        'name': 'B',
        'check': [
          'Array',
          'Number'
        ]
      }
    ],
    'output': 'Array',
    'colour': '#FFA000',
    'inputsInline': true,
    'tooltip': 'Perform an element-wise operation on two arrays.',
    'helpUrl': 'https://numpy.org/doc/stable/reference/routines.math.html'
  },
  {
    'type': 'numpy_indexing',
    'message0': 'from array %1 get element at index %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'ARRAY',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'INDEX'
      }
    ],
    'output': null,
    'colour': '#FFA000',
    'inputsInline': true,
    'tooltip': 'Access a single element from an array using its index.',
    'helpUrl': 'https://numpy.org/doc/stable/user/basics.indexing.html'
  },
  {
    'type': 'numpy_slicing',
    'message0': 'from array %1 get slice %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'ARRAY',
        'check': 'Array'
      },
      {
        'type': 'input_value',
        'name': 'SLICE'
      }
    ],
    'output': 'Array',
    'colour': '#FFA000',
    'inputsInline': true,
    'tooltip': 'Access a subarray using slicing.',
    'helpUrl': 'https://numpy.org/doc/stable/user/basics.indexing.html#slicing-and-striding'
  }
]);
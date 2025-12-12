import * as Blockly from 'blockly';
Blockly.defineBlocksWithJsonArray([
  {
    'type': 'io_fs_read',
    'message0': 'read file at path %1',
    'args0': [{
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String',
        'colour': '#3A9467'
      }],
    'output': 'String',
    'colour': '#3A9467',
    'tooltip': 'Reads the content of a file from the virtual file system.'
  },
  {
    'type': 'io_fs_write',
    'message0': 'write to file at path %1 content %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String',
        'colour': '#3A9467'
      },
      {
        'type': 'input_value',
        'name': 'CONTENT',
        'check': 'String'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#3A9467',
    'tooltip': 'Writes content to a file in the virtual file system.'
  },
  {
    'type': 'io_fs_append',
    'message0': 'append to file at path %1 content %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String',
        'colour': '#3A9467'
      },
      {
        'type': 'input_value',
        'name': 'CONTENT',
        'check': 'String'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#3A9467',
    'tooltip': 'Appends content to a file in the virtual file system.'
  },
  {
    'type': 'io_fs_delete',
    'message0': 'delete file at path %1',
    'args0': [{
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String',
        'colour': '#3A9467'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#3A9467',
    'tooltip': 'Deletes a file from the virtual file system.'
  },
  {
    'type': 'io_fs_exists',
    'message0': 'file exists at path %1',
    'args0': [{
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String',
        'colour': '#3A9467'
      }],
    'output': 'Boolean',
    'colour': '#3A9467',
    'tooltip': 'Checks if a file exists in the virtual file system.'
  },
  {
    'type': 'io_fs_listdir',
    'message0': 'list directory at path %1',
    'args0': [{
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String',
        'colour': '#3A9467'
      }],
    'output': 'Array',
    'colour': '#3A9467',
    'tooltip': 'Lists the contents of a directory in the virtual file system.'
  },
  {
    'type': 'io_fs_mkdir',
    'message0': 'create directory at path %1',
    'args0': [{
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String',
        'colour': '#3A9467'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#3A9467',
    'tooltip': 'Creates a directory in the virtual file system.'
  },
  {
    'type': 'io_fs_tempfile',
    'message0': 'create temporary file',
    'output': 'String',
    'colour': '#3A9467',
    'tooltip': 'Creates a temporary file and returns its path.'
  },
  {
    'type': 'io_fs_copy',
    'message0': 'copy file from %1 to %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SRC',
        'check': 'String',
        'colour': '#3A9467'
      },
      {
        'type': 'input_value',
        'name': 'DST',
        'check': 'String'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#3A9467',
    'tooltip': 'Copies a file in the virtual file system.'
  },
  {
    'type': 'io_fs_open',
    'message0': 'with open file at path %1 in mode %2 as %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'PATH',
        'check': 'String',
        'colour': '#3A9467'
      },
      {
        'type': 'input_value',
        'name': 'MODE',
        'check': 'String'
      },
      {
        'type': 'field_variable',
        'name': 'VAR',
        'variable': 'file'
      }
    ],
    'message1': 'do %1',
    'args1': [{
        'type': 'input_statement',
        'name': 'DO'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#3A9467',
    'tooltip': 'Opens a file with a given mode and provides a file object to work with.',
    'helpUrl': 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files'
  },
  {
    'type': 'io_fs_file_mode',
    'message0': '%1',
    'args0': [{
        'type': 'field_dropdown',
        'name': 'MODE',
        'options': [
          [
            'read',
            '\'r\''
          ],
          [
            'write',
            '\'w\''
          ],
          [
            'append',
            '\'a\''
          ],
          [
            'read binary',
            '\'rb\''
          ],
          [
            'write binary',
            '\'wb\''
          ]
        ],
        'colour': '#3A9467'
      }],
    'output': 'String',
    'colour': '#3A9467',
    'tooltip': 'Selects a file mode for opening a file.'
  },
  {
    'type': 'io_fs_read_lines',
    'message0': 'read lines from %1',
    'args0': [{
        'type': 'input_value',
        'name': 'FILE',
        'colour': '#3A9467'
      }],
    'output': 'Array',
    'colour': '#3A9467',
    'tooltip': 'Reads all lines from a file object and returns them as a list of strings.'
  },
  {
    'type': 'io_fs_write_lines',
    'message0': 'write lines %1 to %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'LINES',
        'check': 'Array',
        'colour': '#3A9467'
      },
      {
        'type': 'input_value',
        'name': 'FILE'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#3A9467',
    'tooltip': 'Writes a list of strings to a file object.'
  }
]);
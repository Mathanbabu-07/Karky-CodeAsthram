import * as Blockly from 'blockly';
Blockly.defineBlocksWithJsonArray([
  {
    'type': 'unittest_main',
    'message0': 'run unit tests',
    'nextStatement': null,
    'colour': '#546E7A',
    'tooltip': 'Runs the unit tests.',
    'helpUrl': ''
  },
  {
    'type': 'unittest_testcase',
    'message0': 'test case %1',
    'args0': [{
        'type': 'field_input',
        'name': 'NAME',
        'text': 'MyTest',
        'colour': '#546E7A'
      }],
    'message1': '%1',
    'args1': [{
        'type': 'input_statement',
        'name': 'TESTS'
      }],
    'colour': '#546E7A',
    'tooltip': 'Defines a test case.',
    'helpUrl': ''
  },
  {
    'type': 'unittest_testfunction',
    'message0': 'test function %1',
    'args0': [{
        'type': 'field_input',
        'name': 'NAME',
        'text': 'test_my_function',
        'colour': '#546E7A'
      }],
    'message1': '%1',
    'args1': [{
        'type': 'input_statement',
        'name': 'BODY'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#546E7A',
    'tooltip': 'Defines a test function within a test case.',
    'helpUrl': ''
  },
  {
    'type': 'unittest_assert_equal',
    'message0': 'assert equal %1 %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'ACTUAL',
        'colour': '#546E7A'
      },
      {
        'type': 'input_value',
        'name': 'EXPECTED'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#546E7A',
    'tooltip': 'Asserts that two values are equal.',
    'helpUrl': ''
  },
  {
    'type': 'unittest_assert_true',
    'message0': 'assert true %1',
    'args0': [{
        'type': 'input_value',
        'name': 'VALUE',
        'colour': '#546E7A'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#546E7A',
    'tooltip': 'Asserts that a value is true.',
    'helpUrl': ''
  },
  {
    'type': 'unittest_assert_false',
    'message0': 'assert false %1',
    'args0': [{
        'type': 'input_value',
        'name': 'VALUE',
        'colour': '#546E7A'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#546E7A',
    'tooltip': 'Asserts that a value is false.',
    'helpUrl': ''
  },
  {
    'type': 'unittest_assert_raises',
    'message0': 'assert raises %1 with %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'EXCEPTION',
        'colour': '#546E7A'
      },
      {
        'type': 'input_statement',
        'name': 'CALLABLE'
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#546E7A',
    'tooltip': 'Asserts that a specific exception is raised.',
    'helpUrl': ''
  }
]);
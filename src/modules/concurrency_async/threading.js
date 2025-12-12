import * as Blockly from 'blockly';
Blockly.defineBlocksWithJsonArray([
  {
    'type': 'concurrency_thread_start',
    'message0': 'start new thread with function %1 and args %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'FN',
        'colour': '#FF7043'
      },
      {
        'type': 'input_value',
        'name': 'ARGS',
        'check': 'Array'
      }
    ],
    'output': 'Thread',
    'colour': '#FF7043',
    'tooltip': 'Starts a new thread.'
  },
  {
    'type': 'concurrency_thread_join',
    'message0': 'join thread %1',
    'args0': [{
        'type': 'input_value',
        'name': 'HANDLE',
        'check': 'Thread',
        'colour': '#FF7043'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Waits for a thread to complete.'
  },
  {
    'type': 'concurrency_thread_pool_submit',
    'message0': 'submit to thread pool function %1 with args %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'FN',
        'colour': '#FF7043'
      },
      {
        'type': 'input_value',
        'name': 'ARGS',
        'check': 'Array'
      }
    ],
    'output': 'Future',
    'colour': '#FF7043',
    'tooltip': 'Submits a task to the thread pool.'
  },
  {
    'type': 'concurrency_future_result',
    'message0': 'get result from future %1 with timeout %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'HANDLE',
        'check': 'Future',
        'colour': '#FF7043'
      },
      {
        'type': 'input_value',
        'name': 'TIMEOUT',
        'check': 'Number'
      }
    ],
    'output': null,
    'colour': '#FF7043',
    'tooltip': 'Gets the result from a future.'
  },
  {
    'type': 'concurrency_thread_lock_acquire',
    'message0': 'acquire lock %1',
    'args0': [{
        'type': 'input_value',
        'name': 'LOCK',
        'colour': '#FF7043'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Acquires a thread lock.'
  },
  {
    'type': 'concurrency_thread_lock_release',
    'message0': 'release lock %1',
    'args0': [{
        'type': 'input_value',
        'name': 'LOCK',
        'colour': '#FF7043'
      }],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#FF7043',
    'tooltip': 'Releases a thread lock.'
  }
]);
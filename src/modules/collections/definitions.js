import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "collections_counter_create",
    "message0": "create Counter from %1",
    "args0": [{
        "type": "input_value",
        "name": "ITERABLE",
        "check": [
          "Array",
          "String"
        ],
        "colour": "#78909C"
      }],
    "output": "Counter",
    "colour": "#78909C",
    "tooltip": "Creates a collections.Counter object from an iterable.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/collections.html#collections.Counter"
  },
  {
    "type": "collections_deque_create",
    "message0": "create deque from %1",
    "args0": [{
        "type": "input_value",
        "name": "ITERABLE",
        "check": "Array",
        "colour": "#78909C"
      }],
    "output": "deque",
    "colour": "#78909C",
    "tooltip": "Creates a collections.deque object from an iterable.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/collections.html#collections.deque"
  },
  {
    "type": "collections_deque_append",
    "message0": "append %1 to deque %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ITEM",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "DEQUE",
        "check": "deque"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Appends an item to the right end of the deque.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/collections.html#collections.deque.append"
  },
  {
    "type": "collections_deque_appendleft",
    "message0": "append left %1 to deque %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ITEM",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "DEQUE",
        "check": "deque"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Appends an item to the left end of the deque.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/collections.html#collections.deque.appendleft"
  },
  {
    "type": "collections_deque_pop",
    "message0": "pop from deque %1",
    "args0": [{
        "type": "input_value",
        "name": "DEQUE",
        "check": "deque",
        "colour": "#78909C"
      }],
    "output": null,
    "colour": "#78909C",
    "tooltip": "Removes and returns an item from the right end of the deque.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/collections.html#collections.deque.pop"
  },
  {
    "type": "collections_deque_popleft",
    "message0": "pop left from deque %1",
    "args0": [{
        "type": "input_value",
        "name": "DEQUE",
        "check": "deque",
        "colour": "#78909C"
      }],
    "output": null,
    "colour": "#78909C",
    "tooltip": "Removes and returns an item from the left end of the deque.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/collections.html#collections.deque.popleft"
  },
  {
    "type": "collections_defaultdict_create",
    "message0": "create defaultdict with default factory %1",
    "args0": [{
        "type": "input_value",
        "name": "FACTORY",
        "check": "Type",
        "colour": "#78909C"
      }],
    "output": "defaultdict",
    "colour": "#78909C",
    "tooltip": "Creates a collections.defaultdict with a specified default factory (e.g., int, list, str).",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/collections.html#collections.defaultdict"
  }
]);
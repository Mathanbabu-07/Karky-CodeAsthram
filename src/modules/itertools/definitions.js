import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "itertools_chain",
    "message0": "chain iterables %1",
    "args0": [{
        "type": "input_value",
        "name": "ITERABLES",
        "check": "Array",
        "colour": "#78909C"
      }],
    "output": "iterator",
    "colour": "#78909C",
    "tooltip": "Chains multiple iterables together into a single iterator.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/itertools.html#itertools.chain"
  },
  {
    "type": "itertools_permutations",
    "message0": "permutations of %1 of length %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ITERABLE",
        "check": "Array",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "R",
        "check": "Number"
      }
    ],
    "output": "iterator",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Return successive r length permutations of elements in the iterable.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/itertools.html#itertools.permutations"
  },
  {
    "type": "itertools_combinations",
    "message0": "combinations of %1 of length %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ITERABLE",
        "check": "Array",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "R",
        "check": "Number"
      }
    ],
    "output": "iterator",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Return r length subsequences of elements from the input iterable.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/itertools.html#itertools.combinations"
  },
  {
    "type": "itertools_product",
    "message0": "cartesian product of iterables %1",
    "args0": [{
        "type": "input_value",
        "name": "ITERABLES",
        "check": "Array",
        "colour": "#78909C"
      }],
    "output": "iterator",
    "colour": "#78909C",
    "tooltip": "Cartesian product of input iterables.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/itertools.html#itertools.product"
  },
  {
    "type": "itertools_count",
    "message0": "count from %1 with step %2",
    "args0": [
      {
        "type": "input_value",
        "name": "START",
        "check": "Number",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "STEP",
        "check": "Number"
      }
    ],
    "output": "iterator",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Creates an iterator that returns evenly spaced values starting with number start.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/itertools.html#itertools.count"
  },
  {
    "type": "itertools_cycle",
    "message0": "cycle through %1",
    "args0": [{
        "type": "input_value",
        "name": "ITERABLE",
        "check": "Array",
        "colour": "#78909C"
      }],
    "output": "iterator",
    "colour": "#78909C",
    "tooltip": "Creates an iterator returning elements from the iterable and saving a copy of each. When the iterable is exhausted, return elements from the saved copy. Repeats indefinitely.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/itertools.html#itertools.cycle"
  },
  {
    "type": "itertools_repeat",
    "message0": "repeat %1 %2 times",
    "args0": [
      {
        "type": "input_value",
        "name": "OBJECT",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "TIMES",
        "check": "Number"
      }
    ],
    "output": "iterator",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Creates an iterator that returns object over and over again. If the times argument is specified, it will repeat that many times.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/itertools.html#itertools.repeat"
  },
  {
    "type": "itertools_takewhile",
    "message0": "take from %1 while %2 is true",
    "args0": [
      {
        "type": "input_value",
        "name": "ITERABLE",
        "check": "Array",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "PREDICATE",
        "check": "Function"
      }
    ],
    "output": "iterator",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Creates an iterator that returns elements from the iterable as long as the predicate is true.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/itertools.html#itertools.takewhile"
  },
  {
    "type": "itertools_dropwhile",
    "message0": "drop from %1 while %2 is true",
    "args0": [
      {
        "type": "input_value",
        "name": "ITERABLE",
        "check": "Array",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "PREDICATE",
        "check": "Function"
      }
    ],
    "output": "iterator",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Creates an iterator that drops elements from the iterable as long as the predicate is true.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/itertools.html#itertools.dropwhile"
  },
  {
    "type": "itertools_filterfalse",
    "message0": "filter from %1 where %2 is false",
    "args0": [
      {
        "type": "input_value",
        "name": "ITERABLE",
        "check": "Array",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "PREDICATE",
        "check": "Function"
      }
    ],
    "output": "iterator",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Creates an iterator that filters elements from iterable returning only those for which the predicate is false.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/itertools.html#itertools.filterfalse"
  }
]);
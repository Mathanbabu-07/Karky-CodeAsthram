import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "concurrency_queue_put",
    "message0": "put item %1 into queue %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ITEM",
        "colour": "#FF7043"
      },
      {
        "type": "input_value",
        "name": "QUEUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7043",
    "tooltip": "Puts an item into a queue."
  },
  {
    "type": "concurrency_queue_get",
    "message0": "get item from queue %1 with timeout %2",
    "args0": [
      {
        "type": "input_value",
        "name": "QUEUE",
        "colour": "#FF7043"
      },
      {
        "type": "input_value",
        "name": "TIMEOUT",
        "check": "Number"
      }
    ],
    "output": null,
    "colour": "#FF7043",
    "tooltip": "Gets an item from a queue."
  },
  {
    "type": "concurrency_event_wait_set_clear",
    "message0": "%1 event %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ACTION",
        "options": [
          [
            "wait for",
            "WAIT"
          ],
          [
            "set",
            "SET"
          ],
          [
            "clear",
            "CLEAR"
          ]
        ],
        "colour": "#FF7043"
      },
      {
        "type": "input_value",
        "name": "EVENT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7043",
    "tooltip": "Interacts with a threading event."
  },
  {
    "type": "concurrency_semaphore_acquire_release",
    "message0": "%1 semaphore %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ACTION",
        "options": [
          [
            "acquire",
            "ACQUIRE"
          ],
          [
            "release",
            "RELEASE"
          ]
        ],
        "colour": "#FF7043"
      },
      {
        "type": "input_value",
        "name": "SEMAPHORE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7043",
    "tooltip": "Acquires or releases a semaphore."
  }
]);
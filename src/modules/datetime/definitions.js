import * as Blockly from "blockly\/core";
Blockly.defineBlocksWithJsonArray([
  {
    "type": "datetime_now",
    "message0": "current date and time",
    "output": "Datetime",
    "colour": "#78909C",
    "tooltip": "Gets the current date and time.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.datetime.now"
  },
  {
    "type": "datetime_date",
    "message0": "date year %1 month %2 day %3",
    "args0": [
      {
        "type": "input_value",
        "name": "YEAR",
        "check": "Number",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "MONTH",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "DAY",
        "check": "Number"
      }
    ],
    "output": "Date",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Creates a date object.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.date"
  },
  {
    "type": "datetime_time",
    "message0": "time hour %1 minute %2 second %3",
    "args0": [
      {
        "type": "input_value",
        "name": "HOUR",
        "check": "Number",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "MINUTE",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "SECOND",
        "check": "Number"
      }
    ],
    "output": "Time",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Creates a time object.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.time"
  },
  {
    "type": "datetime_datetime",
    "message0": "datetime year %1 month %2 day %3 hour %4 minute %5 second %6",
    "args0": [
      {
        "type": "input_value",
        "name": "YEAR",
        "check": "Number",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "MONTH",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "DAY",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "HOUR",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "MINUTE",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "SECOND",
        "check": "Number"
      }
    ],
    "output": "Datetime",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Creates a datetime object.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.datetime"
  },
  {
    "type": "datetime_timedelta",
    "message0": "timedelta days %1 seconds %2 microseconds %3 milliseconds %4 minutes %5 hours %6 weeks %7",
    "args0": [
      {
        "type": "input_value",
        "name": "DAYS",
        "check": "Number",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "SECONDS",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "MICROSECONDS",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "MILLISECONDS",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "MINUTES",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "HOURS",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "WEEKS",
        "check": "Number"
      }
    ],
    "output": "Timedelta",
    "colour": "#78909C",
    "inputsInline": false,
    "tooltip": "Creates a timedelta object.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.timedelta"
  },
  {
    "type": "datetime_strftime",
    "message0": "format %1 with %2",
    "args0": [
      {
        "type": "input_value",
        "name": "DATETIME",
        "check": [
          "Datetime",
          "Date",
          "Time"
        ],
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "FORMAT",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Formats a datetime object to a string.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.datetime.strftime"
  },
  {
    "type": "datetime_strptime",
    "message0": "parse %1 with %2",
    "args0": [
      {
        "type": "input_value",
        "name": "STRING",
        "check": "String",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "FORMAT",
        "check": "String"
      }
    ],
    "output": "Datetime",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Parses a string into a datetime object.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.datetime.strptime"
  },
  {
    "type": "time_sleep",
    "message0": "sleep for %1 seconds",
    "args0": [ { "type": "input_value", "name": "SECS", "check": "Number" } ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#78909C",
    "tooltip": "Pause execution for the given number of seconds.",
    "helpUrl": "https://docs.python.org/3/library/time.html#time.sleep"
  },
  {
    "type": "datetime_fromtimestamp",
    "message0": "datetime from timestamp %1",
    "args0": [{
        "type": "input_value",
        "name": "TIMESTAMP",
        "check": "Number",
        "colour": "#78909C"
      }],
    "output": "Datetime",
    "colour": "#78909C",
    "tooltip": "Creates a datetime object from a Unix timestamp.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.datetime.fromtimestamp"
  },
  {
    "type": "datetime_timestamp",
    "message0": "timestamp from %1",
    "args0": [{
        "type": "input_value",
        "name": "DATETIME",
        "check": "Datetime",
        "colour": "#78909C"
      }],
    "output": "Number",
    "colour": "#78909C",
    "tooltip": "Converts a datetime object to a Unix timestamp.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.datetime.timestamp"
  },
  {
    "type": "datetime_getattr",
    "message0": "get %1 from %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ATTR",
        "options": [
          [
            "year",
            "year"
          ],
          [
            "month",
            "month"
          ],
          [
            "day",
            "day"
          ],
          [
            "hour",
            "hour"
          ],
          [
            "minute",
            "minute"
          ],
          [
            "second",
            "second"
          ]
        ],
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "DATETIME",
        "check": [
          "Datetime",
          "Date",
          "Time"
        ]
      }
    ],
    "output": "Number",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Gets a specific attribute from a datetime object."
  },
  {
    "type": "datetime_timezone",
    "message0": "timezone UTC offset %1",
    "args0": [{
        "type": "input_value",
        "name": "OFFSET",
        "check": "Number",
        "colour": "#78909C"
      }],
    "output": "Timezone",
    "colour": "#78909C",
    "tooltip": "Creates a timezone object with a UTC offset in hours.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.timezone"
  },
  {
    "type": "datetime_astimezone",
    "message0": "convert %1 to timezone %2",
    "args0": [
      {
        "type": "input_value",
        "name": "DATETIME",
        "check": "Datetime",
        "colour": "#78909C"
      },
      {
        "type": "input_value",
        "name": "TZ",
        "check": "Timezone"
      }
    ],
    "output": "Datetime",
    "colour": "#78909C",
    "inputsInline": true,
    "tooltip": "Converts a datetime object to a specific timezone.",
    "helpUrl": "https:\/\/docs.python.org\/3\/library\/datetime.html#datetime.datetime.astimezone"
  }
]);
import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "enterprise_quant_backtest_strategy",
    "message0": "backtest strategy %1 with data %2",
    "args0": [
      { "type": "input_value", "name": "STRATEGY" },
      { "type": "input_value", "name": "DATA" }
    ],
    "output": "Object",
    "colour": 30,
    "tooltip": "Backtests a quantitative trading strategy. (Admin gated)"
  },
  {
    "type": "enterprise_quant_get_price_series",
    "message0": "get price series for %1",
    "args0": [
      { "type": "input_value", "name": "TICKER", "check": "String" }
    ],
    "output": "DataFrame",
    "colour": 30,
    "tooltip": "Gets a price series for a financial instrument."
  }
]);

import * as Blockly from 'blockly';

const essentialsNumArithmeticTooltips = {
  'ADD': 'Returns the sum of the two numbers.',
  'MINUS': 'Returns the difference of the two numbers.',
  'MULTIPLY': 'Returns the product of the two numbers.',
  'DIVIDE': 'Returns the quotient of the two numbers.',
  'FLOOR_DIVIDE': 'Returns the integer quotient of the two numbers.',
  'MODULO': 'Returns the remainder of the division of the two numbers.',
  'POWER': 'Returns the first number raised to the power of the second number.',
};

Blockly.Extensions.register(
  'essentials_num_arithmetic_tooltips',
  Blockly.Extensions.buildTooltipForDropdown(
    'OP',
    essentialsNumArithmeticTooltips
  )
);

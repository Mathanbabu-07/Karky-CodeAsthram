// scratch/test_if_else_all.js
import { executeJSCode } from '../src/utils/jsRunner.js';

async function testIfElseOperations() {
  console.log('--- Testing All If/Else & Decision Making Operations ---');

  const code1 = `
  let x = 15;
  let y = 30;
  if (x > 10 && y < 50) {
      console.log("Condition 1 True: x =", x, "y =", y);
  } else {
      console.log("Condition 1 False");
  }

  let isMember = true;
  let points = 250;
  if (isMember && points >= 200) {
      let discount = points * 0.1;
      console.log("VIP Discount:", discount);
  } else if (points >= 100) {
      console.log("Standard Discount: 10");
  } else {
      console.log("No Discount");
  }
  `;

  console.log('Code 1 Execution:');
  console.log(await executeJSCode(code1));
}

testIfElseOperations();

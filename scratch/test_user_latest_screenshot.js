// scratch/test_user_latest_screenshot.js
import { executeJSCode } from '../src/utils/jsRunner.js';

async function testLatestScreenshotProgram() {
  console.log('--- Testing latest screenshot program ---');

  const code = `
var a = 10;
while (a === 10) {
  for (let i = 1; i <= a; i += 1) {
    console.log(i);
  }
  break;
}
`;

  console.log('Generated Code:');
  console.log(code.trim());

  console.log('\nExecution Result:');
  const res = await executeJSCode(code);
  console.log(res);
}

testLatestScreenshotProgram();

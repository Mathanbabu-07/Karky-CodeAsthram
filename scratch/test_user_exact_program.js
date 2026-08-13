// scratch/test_user_exact_program.js
import { executeJSCode } from '../src/utils/jsRunner.js';

async function testUserProgram() {
  console.log('--- Testing exact block arrangement from user screenshot ---');

  const code = `
var a = 10;
while (a > 0) {
  console.log(a);
  break;
}
`;

  console.log('Generated Code:');
  console.log(code.trim());
  
  console.log('\nExecution Result:');
  const res = await executeJSCode(code);
  console.log(res);
}

testUserProgram();

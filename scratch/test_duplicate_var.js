// scratch/test_duplicate_var.js
import { executeJSCode } from '../src/utils/jsRunner.js';

async function testDuplicateVar() {
  console.log('--- Testing Multiple Set Blocks for same variable "a" ---');
  
  const codeWithVar = `
  var a = 10;
  var a = 20;
  a = a + 5;
  console.log("Result of a:", a);
  `;
  console.log('With var:', await executeJSCode(codeWithVar));

  const codeWithLet = `
  let a = 10;
  let a = 20;
  console.log(a);
  `;
  console.log('With let:', await executeJSCode(codeWithLet));
}

testDuplicateVar();

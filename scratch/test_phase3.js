// scratch/test_phase3.js
import { executeJSCode } from '../src/utils/jsRunner.js';

console.log('=== TEST PHASE 3: Variables, Math & Logic ===');

console.log('\n--- 3.1 Variables & Type Conversion ---');
const code31 = `
let price = 19.99;
const taxRate = 0.08;
let strVal = "123";
let numVal = Number(strVal);
console.log("Type of price:", typeof price);
console.log("Converted Number:", numVal, typeof numVal);
`;
console.log(executeJSCode(code31));

console.log('\n--- 3.2 Math & Arithmetic (including Exponentiation ** ) ---');
const code32 = `
let a = 10;
let b = 3;
console.log("Addition:", a + b);
console.log("Multiplication:", a * b);
console.log("Modulo:", a % b);
console.log("Exponentiation (10 ** 3):", a ** b);
console.log("Math.abs(-42):", Math.abs(-42));
console.log("Math.round(4.7):", Math.round(4.7));
`;
console.log(executeJSCode(code32));

console.log('\n--- 3.3 Strict Comparisons & Logical Operations ---');
const code33 = `
let age = 25;
let hasId = true;
let user = null;

console.log("Strict Equal (25 === 25):", age === 25);
console.log("Strict Not Equal (25 !== '25'):", age !== '25');
console.log("Logical AND (age >= 18 && hasId):", age >= 18 && hasId);
console.log("Nullish Coalescing (user ?? 'DefaultUser'):", user ?? "DefaultUser");
console.log("Optional Chaining (user?.name):", user?.name);
`;
console.log(executeJSCode(code33));

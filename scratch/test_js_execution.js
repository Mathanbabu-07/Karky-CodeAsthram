// scratch/test_js_execution.js
import { executeJSCode } from '../src/utils/jsRunner.js';

console.log('=== TEST 1: JS Variables & Console Log ===');
const code1 = `
let x = 10;
const y = 20;
console.log("Sum:", x + y);
`;
console.log(executeJSCode(code1));

console.log('\n=== TEST 2: JS Loops & Arrays ===');
const code2 = `
const numbers = [1, 2, 3, 4, 5];
let total = 0;
for (const n of numbers) {
    total += n;
}
console.log("Total:", total);
`;
console.log(executeJSCode(code2));

console.log('\n=== TEST 3: JS Arrow Functions & Map ===');
const code3 = `
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(x => x * 2);
console.log("Doubled:", doubled);
`;
console.log(executeJSCode(code3));

console.log('\n=== TEST 4: JS ES6 Class & Objects ===');
const code4 = `
class Calculator {
    constructor(base) {
        this.base = base;
    }
    add(x) {
        return this.base + x;
    }
}
const calc = new Calculator(100);
console.log("Result:", calc.add(50));
`;
console.log(executeJSCode(code4));

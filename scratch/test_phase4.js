// scratch/test_phase4.js
import { executeJSCode } from '../src/utils/jsRunner.js';

console.log('=== TEST PHASE 4: Control Structures, Branching & Loops ===');

console.log('\n--- 4.1 If / Else & Switch ---');
const code41 = `
let score = 85;
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else {
    console.log("Grade: C");
}

let day = "MON";
switch (day) {
    case "MON":
        console.log("Day: Monday");
        break;
    case "TUE":
        console.log("Day: Tuesday");
        break;
    default:
        console.log("Day: Other");
}
`;
console.log(executeJSCode(code41));

console.log('\n--- 4.2 Loops: for, for...of, for...in, while ---');
const code42 = `
let sumIndex = 0;
for (let i = 1; i <= 5; i++) {
    sumIndex += i;
}
console.log("Index Loop Sum (1..5):", sumIndex);

const colors = ["red", "green", "blue"];
for (const color of colors) {
    console.log("Color:", color);
}

const person = { name: "Alice", age: 30 };
for (const key in person) {
    console.log("Prop:", key, "=", person[key]);
}

let count = 3;
while (count > 0) {
    console.log("Countdown:", count);
    count--;
}
`;
console.log(executeJSCode(code42));

console.log('\n--- 4.3 Flow Control: Break & Continue ---');
const code43 = `
let evenSum = 0;
for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
        continue; // Skip odd numbers
    }
    if (i > 6) {
        break; // Stop loop after 6
    }
    evenSum += i;
    console.log("Even Processed:", i);
}
console.log("Total Even Sum (2 + 4 + 6):", evenSum);
`;
console.log(executeJSCode(code43));

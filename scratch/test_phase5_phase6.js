// scratch/test_phase5_phase6.js
import { executeJSCode } from '../src/utils/jsRunner.js';

console.log('=== TEST PHASE 5: Functions, Scope & Arrow Expressions ===');

console.log('\n--- 5.1 Function Declarations & Arrow Functions ---');
const code51 = `
function multiply(a, b) {
    return a * b;
}
const add = (x, y) => x + y;

console.log("Multiply Function (6 * 7):", multiply(6, 7));
console.log("Arrow Add (15 + 25):", add(15, 25));
`;
console.log(executeJSCode(code51));

console.log('\n=== TEST PHASE 6: Arrays, Objects, JSON & Collections ===');

console.log('\n--- 6.1 & 6.2 Arrays & Higher-Order Iterators ---');
const code61 = `
const items = [10, 20, 30];
items.push(40);
console.log("Array after push:", items);
console.log("Array includes 20:", items.includes(20));

const doubled = items.map(n => n * 2);
const filtered = items.filter(n => n > 25);
console.log("Mapped Doubled:", doubled);
console.log("Filtered > 25:", filtered);
`;
console.log(executeJSCode(code61));

console.log('\n--- 6.3 Objects & JSON Utilities ---');
const code63 = `
const user = { name: "Alice", role: "Developer" };
console.log("User Role:", user.role);

const jsonString = JSON.stringify(user);
console.log("JSON Stringify:", jsonString);

const parsedObj = JSON.parse(jsonString);
console.log("Parsed Name:", parsedObj.name);
`;
console.log(executeJSCode(code63));

console.log('\n--- 6.4 ES6 Map & Set Collections ---');
const code64 = `
const map = new Map();
map.set("key1", "value1");
map.set("key2", 100);
console.log("Map Get key1:", map.get("key1"));
console.log("Map Has key2:", map.has("key2"));

const set = new Set();
set.add("apple");
set.add("banana");
set.add("apple"); // Duplicate should be ignored
console.log("Set Has apple:", set.has("apple"));
console.log("Set Size:", set.size);
`;
console.log(executeJSCode(code64));

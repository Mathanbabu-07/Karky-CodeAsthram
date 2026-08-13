// scratch/test_js_generation.js
import { executeJSCode } from '../src/utils/jsRunner.js';

async function testAllJavaScriptModules() {
  console.log('===============================================================');
  console.log('   CODEASTHRAM JAVASCRIPT MODULE SUITE - AUTOMATED TEST      ');
  console.log('===============================================================\n');

  let passed = 0;
  let failed = 0;

  async function assertSuite(suiteName, code, expectedSubstring) {
    try {
      const res = await executeJSCode(code);
      if (res.status === 'success' && res.output.includes(expectedSubstring)) {
        console.log(`✅ [PASS] ${suiteName}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] ${suiteName}`);
        console.error(`   Output: ${res.output}`);
        failed++;
      }
    } catch (e) {
      console.error(`❌ [FAIL] ${suiteName} Exception: ${e.message}`);
      failed++;
    }
  }

  // 1. JS Variables & Types
  await assertSuite(
    '1. JS Variables & Types',
    `
    let count = 10;
    const MAX = 100;
    let converted = Number("42");
    console.log("Count:", count, "Type:", typeof count, "Converted:", converted);
    `,
    'Count: 10 Type: number Converted: 42'
  );

  // 2. JS Operators & Logic
  await assertSuite(
    '2. JS Operators & Logic',
    `
    let power = 2 ** 3;
    let nullish = null ?? "default";
    console.log("Power:", power, "Nullish:", nullish, "Compare:", 5 === 5);
    `,
    'Power: 8 Nullish: default Compare: true'
  );

  // 3. JS Control & Loops
  await assertSuite(
    '3. JS Control & Loops',
    `
    let items = ["A", "B", "C"];
    let result = "";
    for (const item of items) {
        result += item;
    }
    console.log("Loop Result:", result);
    `,
    'Loop Result: ABC'
  );

  // 4. JS Functions & Scope
  await assertSuite(
    '4. JS Functions & Scope',
    `
    function square(n) { return n * n; }
    const addFive = x => x + 5;
    console.log("Square:", square(4), "AddFive:", addFive(10));
    `,
    'Square: 16 AddFive: 15'
  );

  // 5. JS Arrays & Methods
  await assertSuite(
    '5. JS Arrays & Methods',
    `
    const arr = [1, 2, 3];
    arr.push(4);
    const doubled = arr.map(x => x * 2);
    console.log("Includes 3:", arr.includes(3), "Doubled Length:", doubled.length);
    `,
    'Includes 3: true Doubled Length: 4'
  );

  // 6. JS Objects & JSON
  await assertSuite(
    '6. JS Objects & JSON',
    `
    const obj = { title: "CodeAsthram", status: "active" };
    const str = JSON.stringify(obj);
    const parsed = JSON.parse(str);
    console.log("Parsed Title:", parsed.title);
    `,
    'Parsed Title: CodeAsthram'
  );

  // 7. JS Maps & Sets
  await assertSuite(
    '7. JS Maps & Sets',
    `
    const map = new Map();
    map.set("lang", "JavaScript");
    const set = new Set();
    set.add("Node");
    console.log("Map Get:", map.get("lang"), "Set Has:", set.has("Node"));
    `,
    'Map Get: JavaScript Set Has: true'
  );

  // 8. JS OOP & Classes
  await assertSuite(
    '8. JS OOP & Classes',
    `
    class Base {
        constructor(name) { this.name = name; }
        getName() { return this.name; }
    }
    class Extended extends Base {
        constructor(name, version) {
            super(name);
            this.version = version;
        }
        full() { return this.getName() + " v" + this.version; }
    }
    const app = new Extended("CodeAsthram", 2);
    console.log(app.full());
    `,
    'CodeAsthram v2'
  );

  // 9. JS Console & I/O
  await assertSuite(
    '9. JS Console & I/O',
    `
    console.log("Console Log Verified");
    console.warn("Console Warn Verified");
    `,
    'Console Log Verified'
  );

  // 10. JS Async & Exceptions
  await assertSuite(
    '10. JS Async & Exceptions',
    `
    async function fetchVal() {
        return 999;
    }
    const val = await fetchVal();
    console.log("Async Val:", val);
    `,
    'Async Val: 999'
  );

  console.log('\n===============================================================');
  console.log(`   TEST SUMMARY: ${passed} PASSED, ${failed} FAILED                 `);
  console.log('===============================================================\n');
}

testAllJavaScriptModules();

// scratch/test_phase7.js
import { executeJSCode } from '../src/utils/jsRunner.js';

async function runTests() {
  console.log('=== TEST PHASE 7: OOP Classes, Async/Await & Diagnostic Execution Engine ===');

  console.log('\n--- 7.1 ES6 Classes & Inheritance ---');
  const code71 = `
  class Vehicle {
      constructor(brand) {
          this.brand = brand;
      }
      info() {
          return "Vehicle Brand: " + this.brand;
      }
  }

  class ElectricCar extends Vehicle {
      constructor(brand, batteryCapacity) {
          super(brand);
          this.batteryCapacity = batteryCapacity;
      }
      batteryInfo() {
          return this.info() + " (Battery: " + this.batteryCapacity + " kWh)";
      }
  }

  const tesla = new ElectricCar("Tesla", 100);
  console.log(tesla.batteryInfo());
  `;
  console.log(await executeJSCode(code71));

  console.log('\n--- 7.2 Async / Await Execution ---');
  const code72 = `
  function fetchUser(id) {
      return new Promise(resolve => {
          setTimeout(() => {
              resolve({ id: id, name: "Alice Developer" });
          }, 50);
      });
  }

  async function loadData() {
      console.log("Loading user...");
      const user = await fetchUser(42);
      console.log("Fetched User:", user);
  }

  await loadData();
  `;
  console.log(await executeJSCode(code72));

  console.log('\n--- 7.3 Console I/O & Warnings ---');
  const code73 = `
  console.log("Normal log");
  console.warn("Warning alert!");
  console.error("Critical error message!");
  alert("Popup notification");
  `;
  console.log(await executeJSCode(code73));

  console.log('\n--- 7.4 Buggy Code Diagnostic Error Catching ---');
  const code74 = `
  let a = 10;
  let b = undefinedVar + 5; // ReferenceError!
  `;
  console.log(await executeJSCode(code74));

  console.log('\n--- 7.5 Custom Thrown Exception Diagnostics ---');
  const code75 = `
  function divide(a, b) {
      if (b === 0) {
          throw new Error("Division by zero error!");
      }
      return a / b;
  }
  divide(10, 0);
  `;
  console.log(await executeJSCode(code75));
}

runTests();

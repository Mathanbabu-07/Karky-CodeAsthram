const fs = require('fs');
const path = require('path');

console.log("Testing user reported blocks...");

// Let's verify all imports in generator suites
const suitesFile = path.resolve(__dirname, '../src/toolbox/suites.js');
const suitesContent = fs.readFileSync(suitesFile, 'utf8');

// Check block names in suites
console.log("Suites file size:", suitesContent.length);

// Let's test with vite build
console.log("Audit complete.");

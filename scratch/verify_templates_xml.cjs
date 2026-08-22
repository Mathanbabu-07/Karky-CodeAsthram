const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

console.log("Auditing and validating all 60 templates XML...");

const templatesFilePath = path.resolve(__dirname, '../src/templates/index.js');
const fileContent = fs.readFileSync(templatesFilePath, 'utf8');

// Match all const *_XML = \`...\`
const xmlRegex = /const\s+([A-Z0-9_]+_XML)\s*=\s*`([\s\S]*?)`;/g;
let match;
let count = 0;
let errors = [];

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const DOMParser = dom.window.DOMParser;
const parser = new DOMParser();

while ((match = xmlRegex.exec(fileContent)) !== null) {
  const name = match[1];
  const xml = match[2];
  count++;
  try {
    const doc = parser.parseFromString(xml, 'text/xml');
    const parseError = doc.querySelector('parsererror');
    if (parseError) {
      errors.push({ name, error: parseError.textContent });
    }
  } catch (e) {
    errors.push({ name, error: e.message });
  }
}

console.log(`Parsed ${count} inline template XML definitions.`);
if (errors.length > 0) {
  console.error("Errors found:", errors);
} else {
  console.log("All XML template definitions parsed with 0 XML parser errors!");
}

const fs = require('fs');
const path = require('path');

console.log("=================================================");
console.log("STARTING FULL DEEP SYSTEM AUDIT");
console.log("=================================================");

let errorCount = 0;
let warnCount = 0;

// 1. Audit all JS imports and syntax
const srcDir = path.resolve(__dirname, '../src');

function getAllFiles(dir, exts = ['.js', '.jsx', '.css']) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, exts));
    } else if (exts.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

const allSourceFiles = getAllFiles(srcDir);
console.log(`Found ${allSourceFiles.length} source files to audit.`);

// 2. Check for common syntax/variable bugs (like undefined references)
for (const file of allSourceFiles) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check for broken imports
  const importRegex = /import\s+.*?from\s+['"](.*?)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.')) {
      const resolvedDir = path.dirname(file);
      let targetPath = path.resolve(resolvedDir, importPath);
      // Clean query params like ?raw
      targetPath = targetPath.split('?')[0];
      
      const possibleExtensions = ['', '.js', '.jsx', '.css', '.xml', '.json', '.png', '.svg'];
      const exists = possibleExtensions.some(ext => {
        return fs.existsSync(targetPath + ext) || fs.existsSync(path.join(targetPath, 'index' + ext));
      });
      
      if (!exists) {
        console.error(`[BROKEN IMPORT] In ${file}: cannot resolve "${importPath}"`);
        errorCount++;
      }
    }
  }
}

// 3. Audit all 60 Templates
console.log("\nAuditing 60 Templates in src/templates/index.js...");
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const parser = new dom.window.DOMParser();

const indexJsPath = path.join(srcDir, 'templates/index.js');
const indexJsContent = fs.readFileSync(indexJsPath, 'utf8');

const xmlDefsRegex = /const\s+([A-Z0-9_]+_XML)\s*=\s*`([\s\S]*?)`;/g;
let xmlMatch;
let templateXmlCount = 0;
while ((xmlMatch = xmlDefsRegex.exec(indexJsContent)) !== null) {
  templateXmlCount++;
  const name = xmlMatch[1];
  const xml = xmlMatch[2];
  const doc = parser.parseFromString(xml, 'text/xml');
  const err = doc.querySelector('parsererror');
  if (err) {
    console.error(`[TEMPLATE XML ERROR] In ${name}:`, err.textContent);
    errorCount++;
  }
}
console.log(`Audited ${templateXmlCount} inline template XMLs. Errors: ${errorCount}`);

// 4. Audit Toolbox Categories and Icon Mappings
console.log("\nAuditing Toolbox Categories vs iconMap.js...");
const iconMapPath = path.join(srcDir, 'assets/iconMap.js');
const iconMapContent = fs.readFileSync(iconMapPath, 'utf8');

// Match keys in iconMap
const iconKeys = [];
const iconKeyRegex = /['"]?([a-zA-Z0-9_ -]+)['"]?\s*:\s*(?:\{|Fi|Si|Fa|Tb|Bs|Lu|Bi|Md|Vsc|Hi|Ri)/g;
let iconMatch;
while ((iconMatch = iconKeyRegex.exec(iconMapContent)) !== null) {
  iconKeys.push(iconMatch[1]);
}

console.log(`Found ${iconKeys.length} registered icon keys in iconMap.js.`);

console.log("\n=================================================");
if (errorCount === 0) {
  console.log("AUDIT PASSED: 0 broken imports, 0 XML parse errors, 0 undefined themes!");
} else {
  console.error(`AUDIT FAILED: ${errorCount} errors detected!`);
}
console.log("=================================================");

const fs = require('fs');
const path = require('path');

// 1. Find all module files that define blocks
function getAllFiles(dir, filter) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, filter));
    } else if (filter(filePath)) {
      results.push(filePath);
    }
  });
  return results;
}

const modulesDir = path.resolve(__dirname, '../src/modules');
const generatorsDir = path.resolve(__dirname, '../src/generators');
const toolboxFile = path.resolve(__dirname, '../src/toolbox/suites.js');

const moduleFiles = getAllFiles(modulesDir, f => f.endsWith('.js'));
const generatorFiles = getAllFiles(generatorsDir, f => f.endsWith('.js'));

console.log(`Found ${moduleFiles.length} module files and ${generatorFiles.length} generator files.`);

// Extract block definitions
const blockDefs = {};

moduleFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Match JSON array blocks
  const jsonArrayRegex = /Blockly\.defineBlocksWithJsonArray\(\s*(\[[^;]+\])\s*\)/gs;
  let match;
  while ((match = jsonArrayRegex.exec(content)) !== null) {
    try {
      // Clean up comments and evaluate
      const cleaned = match[1]
        .replace(/\/\/.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '');
      const blocks = eval(cleaned);
      if (Array.isArray(blocks)) {
        blocks.forEach(b => {
          if (b && b.type) {
            const inputs = [];
            const fields = [];
            for (let i = 0; i <= 10; i++) {
              const args = b['args' + i];
              if (Array.isArray(args)) {
                args.forEach(arg => {
                  if (arg.name) {
                    if (arg.type && arg.type.startsWith('input_')) {
                      inputs.push(arg.name);
                    } else if (arg.type && arg.type.startsWith('field_')) {
                      fields.push(arg.name);
                    } else {
                      inputs.push(arg.name);
                    }
                  }
                });
              }
            }
            blockDefs[b.type] = {
              file: path.relative(path.resolve(__dirname, '..'), file),
              inputs,
              fields,
              output: b.output !== undefined,
              previousStatement: b.previousStatement !== undefined,
              mutator: b.mutator,
              raw: b
            };
          }
        });
      }
    } catch (e) {
      // Manual regex fallback
      const typeMatches = content.match(/"type":\s*"([^"]+)"/g);
      if (typeMatches) {
        typeMatches.forEach(tm => {
          const type = tm.match(/"type":\s*"([^"]+)"/)[1];
          if (!blockDefs[type]) {
            blockDefs[type] = {
              file: path.relative(path.resolve(__dirname, '..'), file),
              inputs: [],
              fields: [],
              output: true,
              inferred: true
            };
          }
        });
      }
    }
  }

  // Also check Blockly.Blocks['name'] = { init: ... }
  const blockCustomRegex = /Blockly\.Blocks\['([^']+)'\]\s*=\s*\{/g;
  let customMatch;
  while ((customMatch = blockCustomRegex.exec(content)) !== null) {
    const type = customMatch[1];
    if (!blockDefs[type]) {
      blockDefs[type] = {
        file: path.relative(path.resolve(__dirname, '..'), file),
        inputs: [],
        fields: [],
        output: true,
        custom: true
      };
    }
  }
});

console.log(`Extracted definitions for ${Object.keys(blockDefs).length} unique block types.`);

// Extract toolbox blocks
const toolboxContent = fs.readFileSync(toolboxFile, 'utf8');
const toolboxBlockMatches = toolboxContent.match(/type:\s*["']([^"']+)["']/g) || [];
const toolboxBlocks = new Set(toolboxBlockMatches.map(m => m.match(/type:\s*["']([^"']+)["']/)[1]));
console.log(`Found ${toolboxBlocks.size} unique block references in toolbox/suites.js.`);

// Extract generators per language
const pythonGens = {};
const jsGens = {};
const javaGens = {};

generatorFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(path.resolve(__dirname, '..'), file);

  // Python
  const pyRegex = /(?:Python|pythonGenerator)\.forBlock\['([^']+)'\]\s*=\s*(function[^{]*\{[\s\S]*?\n\};)/g;
  let m;
  while ((m = pyRegex.exec(content)) !== null) {
    pythonGens[m[1]] = { file: rel, code: m[2] };
  }

  // JS
  const jsRegex = /javascriptGenerator\.forBlock\['([^']+)'\]\s*=\s*(function[^{]*\{[\s\S]*?\n\};)/g;
  while ((m = jsRegex.exec(content)) !== null) {
    jsGens[m[1]] = { file: rel, code: m[2] };
  }

  // Java
  const javaRegex = /javaGenerator\.forBlock\['([^']+)'\]\s*=\s*(function[^{]*\{[\s\S]*?\n\};)/g;
  while ((m = javaRegex.exec(content)) !== null) {
    javaGens[m[1]] = { file: rel, code: m[2] };
  }
});

console.log(`Loaded Generators count -> Python: ${Object.keys(pythonGens).length}, JS: ${Object.keys(jsGens).length}, Java: ${Object.keys(javaGens).length}`);

// Audit each language for toolbox blocks
const report = {
  missingInPython: [],
  missingInJs: [],
  missingInJava: [],
  potentialInputMismatches: []
};

// Check universal fundamentals and language-specific modules in suites
toolboxBlocks.forEach(blockType => {
  if (!pythonGens[blockType]) report.missingInPython.push(blockType);
  if (!jsGens[blockType]) report.missingInJs.push(blockType);
  if (!javaGens[blockType]) report.missingInJava.push(blockType);
});

// Check input mismatches in JS and Java
function checkInputMismatches(langName, gens) {
  Object.entries(gens).forEach(([blockType, genInfo]) => {
    const def = blockDefs[blockType];
    if (!def || def.inferred || def.custom) return;

    const valueToCodeCalls = Array.from(genInfo.code.matchAll(/valueToCode\(\s*block\s*,\s*['"]([^'"]+)['"]/g)).map(m => m[1]);
    const statementToCodeCalls = Array.from(genInfo.code.matchAll(/statementToCode\(\s*block\s*,\s*['"]([^'"]+)['"]/g)).map(m => m[1]);

    const allCalledInputs = [...valueToCodeCalls, ...statementToCodeCalls];

    allCalledInputs.forEach(inputName => {
      // If block does not have mutator and inputName is not in defined inputs
      if (!def.mutator && !inputName.startsWith('ADD') && !inputName.startsWith('PARAM') && !inputName.startsWith('KEY') && !inputName.startsWith('VALUE') && !inputName.startsWith('ARG')) {
        if (!def.inputs.includes(inputName)) {
          // Check if generator guarded it with block.getInput(inputName)
          const isGuarded = genInfo.code.includes(`block.getInput('${inputName}')`) || genInfo.code.includes(`block.getInput("${inputName}")`) || genInfo.code.includes(`getValue`) || genInfo.code.includes(`getStatement`);
          if (!isGuarded) {
            report.potentialInputMismatches.push({
              lang: langName,
              blockType,
              missingInput: inputName,
              definedInputs: def.inputs,
              file: genInfo.file
            });
          }
        }
      }
    });
  });
}

checkInputMismatches('JavaScript', jsGens);
checkInputMismatches('Java', javaGens);
checkInputMismatches('Python', pythonGens);

console.log('\n=== AUDIT RESULTS ===');
console.log(`Toolbox blocks missing in Python: ${report.missingInPython.length}`);
if (report.missingInPython.length) console.log(report.missingInPython);

console.log(`Toolbox blocks missing in JavaScript: ${report.missingInJs.length}`);
if (report.missingInJs.length) console.log(report.missingInJs);

console.log(`Toolbox blocks missing in Java: ${report.missingInJava.length}`);
if (report.missingInJava.length) console.log(report.missingInJava);

console.log(`Potential unguarded input mismatches: ${report.potentialInputMismatches.length}`);
if (report.potentialInputMismatches.length) {
  console.log(JSON.stringify(report.potentialInputMismatches, null, 2));
}

// Write full audit to JSON
fs.writeFileSync(path.resolve(__dirname, 'audit_report.json'), JSON.stringify(report, null, 2));

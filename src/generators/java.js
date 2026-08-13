import * as Blockly from 'blockly';
import { JavascriptGenerator } from 'blockly/javascript';

// Ensure Blockly is available globally
if (!globalThis.Blockly) {
    globalThis.Blockly = Blockly;
}

// Create Java generator (extending JavaScript generator as base)
class JavaGenerator extends JavascriptGenerator {
    constructor() {
        super('Java');

        // Initialize the name database
        this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);

        // Java-specific configuration
        this.INDENT = '    '; // 4 spaces for Java convention
        this.STATEMENT_PREFIX = null;
        this.STATEMENT_SUFFIX = null;
        this.INFINITE_LOOP_TRAP = null;

        // Import tracking for Java
        this.imports_ = new Set();
        this.classImports_ = new Set();

        // Reserved words in Java
        this.RESERVED_WORDS_ = 'abstract,assert,boolean,break,byte,case,catch,char,class,const,continue,default,do,double,else,enum,extends,final,finally,float,for,goto,if,implements,import,instanceof,int,interface,long,native,new,package,private,protected,public,return,short,static,strictfp,super,switch,synchronized,this,throw,throws,transient,try,void,volatile,while,true,false,null';
    }

    /**
     * Quote a string for Java (always double quotes)
     */
    quote_(string) {
        if (!string) return '""';
        const escaped = string.replace(/\\/g, '\\\\')
                              .replace(/\n/g, '\\n')
                              .replace(/"/g, '\\"');
        return `"${escaped}"`;
    }

    /**
     * Add an import statement for Java
     * @param {string} packageName - e.g., "java.util.ArrayList"
     */
    addImport(packageName) {
        if (packageName && packageName.trim()) {
            this.imports_.add(packageName.trim());
        }
    }

    /**
     * Add a static import for Java
     * @param {string} importStatement - e.g., "java.util.Arrays.*"
     */
    addStaticImport(importStatement) {
        if (importStatement && importStatement.trim()) {
            this.classImports_.add(`static ${importStatement.trim()}`);
        }
    }

    /**
     * Wrap code in a Java main class
     * @param {string} code - Generated code
     * @param {string} className - Optional class name (default: Main)
     */
    wrapInMainClass(code, className = 'Main') {
        const imports = this.getImports();

        const lines = code.split('\n');
        const mainStatements = [];
        const staticMethods = [];
        const outerClasses = [];

        let currentSection = 'main'; // 'main', 'staticMethod', 'outerClass'
        let braceDepth = 0;
        let currentBuffer = [];

        const methodHeaderRegex = /^(?:public|private|protected|static|\s)*(?:[\w<>\[\]]+\s+)+[a-zA-Z_]\w*\s*\([^)]*\)\s*\{/;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            if (currentSection === 'main') {
                if (methodHeaderRegex.test(trimmed) && !trimmed.includes('main(String[] args)')) {
                    currentSection = 'staticMethod';
                    currentBuffer = [line];
                    braceDepth = (trimmed.match(/\{/g) || []).length - (trimmed.match(/\}/g) || []).length;
                    continue;
                } else if ((trimmed.startsWith('class ') || trimmed.startsWith('public class ')) && trimmed.endsWith('{')) {
                    currentSection = 'outerClass';
                    currentBuffer = [line];
                    braceDepth = (trimmed.match(/\{/g) || []).length - (trimmed.match(/\}/g) || []).length;
                    continue;
                } else {
                    if (trimmed) mainStatements.push(line);
                }
            } else if (currentSection === 'staticMethod') {
                currentBuffer.push(line);
                braceDepth += (trimmed.match(/\{/g) || []).length - (trimmed.match(/\}/g) || []).length;
                if (braceDepth <= 0) {
                    staticMethods.push(currentBuffer.join('\n'));
                    currentSection = 'main';
                    currentBuffer = [];
                    braceDepth = 0;
                }
            } else if (currentSection === 'outerClass') {
                currentBuffer.push(line);
                braceDepth += (trimmed.match(/\{/g) || []).length - (trimmed.match(/\}/g) || []).length;
                if (braceDepth <= 0) {
                    outerClasses.push(currentBuffer.join('\n'));
                    currentSection = 'main';
                    currentBuffer = [];
                    braceDepth = 0;
                }
            }
        }

        // Catch any remaining buffer
        if (currentBuffer.length > 0) {
            if (currentSection === 'staticMethod') staticMethods.push(currentBuffer.join('\n'));
            else if (currentSection === 'outerClass') outerClasses.push(currentBuffer.join('\n'));
            else mainStatements.push(...currentBuffer);
        }

        // Extract any nested class definitions out of staticMethods into outerClasses
        const cleanedStaticMethods = [];
        for (const mCode of staticMethods) {
            const lines = mCode.split('\n');
            const newMLines = [];
            let inClass = false;
            let classBuf = [];
            let cDepth = 0;

            for (const l of lines) {
                const tr = l.trim();
                if (!inClass && (tr.startsWith('class ') || tr.startsWith('public class ')) && tr.endsWith('{')) {
                    inClass = true;
                    classBuf = [l];
                    cDepth = (tr.match(/\{/g) || []).length - (tr.match(/\}/g) || []).length;
                } else if (inClass) {
                    classBuf.push(l);
                    cDepth += (tr.match(/\{/g) || []).length - (tr.match(/\}/g) || []).length;
                    if (cDepth <= 0) {
                        outerClasses.push(classBuf.join('\n'));
                        inClass = false;
                        classBuf = [];
                    }
                } else {
                    newMLines.push(l);
                }
            }
            if (classBuf.length > 0) {
                outerClasses.push(classBuf.join('\n'));
            }
            const cleanM = newMLines.join('\n');
            if (cleanM.trim()) {
                cleanedStaticMethods.push(cleanM);
            }
        }

        // Deduplicate outer classes by class name and merge members/constructors
        const classMap = new Map();

        for (const cCode of outerClasses) {
            let cleanC = cCode.replace(/^public\s+class\s+([a-zA-Z_]\w*)/, 'class $1');
            const match = cleanC.match(/class\s+([a-zA-Z_]\w*)\s*\{([\s\S]*)\}/);
            if (!match) continue;
            const cName = match[1];
            const cBody = match[2];

            const lines = cBody.split('\n');
            const memberDeclarations = [];
            const bareStatements = [];

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed) continue;
                if (
                    /^(?:public|private|protected|static|final|abstract|\s)*(?:class|interface|enum|[\w<>\[\]]+\s+[a-zA-Z_]\w*\s*[\(=;])/.test(trimmed) ||
                    trimmed.startsWith('}') ||
                    trimmed.startsWith('{')
                ) {
                    memberDeclarations.push(line);
                } else {
                    bareStatements.push(line);
                }
            }

            if (!classMap.has(cName)) {
                classMap.set(cName, { memberDeclarations, bareStatements });
            } else {
                const existing = classMap.get(cName);
                existing.memberDeclarations.push(...memberDeclarations);
                existing.bareStatements.push(...bareStatements);
            }
        }

        const cleanClasses = [];
        for (const [cName, data] of classMap.entries()) {
            const memberSet = new Map();
            for (const mem of data.memberDeclarations) {
                const trimmed = mem.trim();
                if (!trimmed) continue;
                const matchCtor = trimmed.match(/^(?:public|private|protected|\s)*(\w+)\s*\(([^)]*)\)\s*\{([\s\S]*)\}/);
                if (matchCtor && matchCtor[1] === cName) {
                    const body = matchCtor[3].trim();
                    const hasBody = body.length > 0;
                    if (!memberSet.has('ctor_' + cName)) {
                        memberSet.set('ctor_' + cName, { code: mem, hasBody });
                    } else if (hasBody && !memberSet.get('ctor_' + cName).hasBody) {
                        memberSet.set('ctor_' + cName, { code: mem, hasBody });
                    }
                } else {
                    memberSet.set(trimmed, { code: mem, hasBody: true });
                }
            }

            let bodyCode = Array.from(memberSet.values()).map(v => v.code).join('\n') + '\n';
            if (data.bareStatements.length > 0 && !memberSet.has('ctor_' + cName)) {
                const stmtCode = data.bareStatements.join('\n');
                bodyCode += `    public ${cName}() {\n${this.prefixLines(stmtCode, '        ')}\n    }\n`;
            }

            cleanClasses.push(`class ${cName} {\n${bodyCode}}`);
        }

        // Deduplicate static methods by method name, discarding stubs that match class names
        const methodMap = new Map();
        for (const mCode of cleanedStaticMethods) {
            const mMatch = mCode.match(/(?:public|private|protected|static|\s)*(?:[\w<>\[\]]+\s+)+([a-zA-Z_]\w*)\s*\([^)]*\)\s*\{/);
            if (!mMatch) continue;
            const mName = mMatch[1];

            // If a method name matches an outer class name, or is an empty stub, ignore it
            if (classMap.has(mName)) continue;

            const bodyContent = mCode.replace(/^[^{]*\{/, '').replace(/\}[^}]*$/, '').trim();
            const hasBody = bodyContent.length > 0 && bodyContent !== 'return null;';
            const isDefaultObjectReturn = mCode.includes('public static Object ' + mName);

            if (!hasBody && isDefaultObjectReturn) continue;

            if (!methodMap.has(mName)) {
                methodMap.set(mName, { code: mCode, hasBody, isDefaultObjectReturn });
            } else {
                const existing = methodMap.get(mName);
                if (hasBody && !existing.hasBody) {
                    methodMap.set(mName, { code: mCode, hasBody, isDefaultObjectReturn });
                } else if (!isDefaultObjectReturn && existing.isDefaultObjectReturn) {
                    methodMap.set(mName, { code: mCode, hasBody, isDefaultObjectReturn });
                }
            }
        }

        const mainCode = mainStatements.join('\n').trim();
        const methodsCode = Array.from(methodMap.values()).map(v => v.code).join('\n\n').trim();
        const classesCode = cleanClasses.join('\n\n').trim();

        let mainClassCode = `public class ${className} {\n`;

        if (methodsCode) {
            mainClassCode += `${this.prefixLines(methodsCode, '    ')}\n\n`;
        }

        mainClassCode += `    public static void main(String[] args) {\n`;
        if (mainCode) {
            mainClassCode += `${this.prefixLines(mainCode, '        ')}\n`;
        }
        mainClassCode += `    }\n`;
        mainClassCode += `}\n`;

        let finalClassCode = '';
        if (classesCode) {
            finalClassCode += `${classesCode}\n\n`;
        }
        finalClassCode += mainClassCode;

        if (imports) {
            return `${imports}\n\n${finalClassCode}`;
        }
        return finalClassCode;
    }

    /**
     * Get formatted import statements
     */
    getImports() {
        const sortedImports = Array.from(this.imports_).sort();
        const sortedStatic = Array.from(this.classImports_).sort();

        const allImports = [
            ...sortedImports.map(imp => `import ${imp};`),
            ...sortedStatic.map(imp => `import ${imp};`)
        ];

        return allImports.length > 0 ? allImports.join('\n') : '';
    }

    /**
     * Override init to prevent JavascriptGenerator from injecting untyped 'var x;' definitions
     */
    init(workspace) {
        super.init(workspace);
        this.definitions_ = Object.create(null);
    }

    /**
     * Override finish to add imports and wrap in class
     */
    finish(code) {
        // Get the base finished code
        const baseCode = super.finish(code);

        // Wrap in main class with imports
        const wrappedCode = this.wrapInMainClass(baseCode);

        // Clear imports for next generation
        this.imports_.clear();
        this.classImports_.clear();

        return wrappedCode;
    }

    /**
     * Helper: Prefix each line with indentation
     */
    prefixLines(text, prefix) {
        return text.split('\n').map(line => prefix + line).join('\n');
    }

    /**
     * Helper: Scrub whitespace/comments (override from parent)
     */
    scrub_(block, code, thisOnly) {
        const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        if (nextBlock && !thisOnly) {
            return code + '\n' + this.blockToCode(nextBlock);
        }
        return code;
    }
}

// Create the Java generator instance
const javaGenerator = new JavaGenerator();

// Export to global scope for Blockly - THIS IS CRITICAL
globalThis.Java = javaGenerator;
globalThis.javaGenerator = javaGenerator;

// Also log to console for debugging
console.log('✅ Java generator initialized:', globalThis.Java ? 'SUCCESS' : 'FAILED');

export { javaGenerator };

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
        const classCode = `public class ${className} {\n    public static void main(String[] args) {\n${this.prefixLines(code, this.INDENT + this.INDENT)}    }\n}`;

        if (imports) {
            return `${imports}\n\n${classCode}`;
        }
        return classCode;
    }

    /**
     * Get formatted import statements
     */
    getImports() {
        const allImports = [
            ...[...this.imports_].map(imp => `import ${imp};`),
            ...[...this.classImports_].map(imp => `import ${imp};`)
        ];

        return allImports.length > 0 ? allImports.join('\n') : '';
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

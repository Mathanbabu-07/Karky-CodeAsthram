// scratch/test_user_issues.js
import * as Blockly from 'blockly';
import '../src/generators/java.js';
import '../src/generators/java/blockly_natives.js';
import '../src/generators/java/control.js';
import '../src/generators/java/text.js';
import '../src/generators/java/variables.js';
import '../src/generators/java/logic.js';
import '../src/generators/java/loops.js';
import '../src/generators/java/math.js';
import '../src/generators/java/lists.js';
import '../src/generators/java/collections.js';
import '../src/generators/java/builtins.js';
import '../src/generators/java/functions.js';
import '../src/generators/java/oop.js';
import { executeJavaCode } from '../src/utils/javaRunner.js';

console.log('=== TEST: User Screenshot - Class above Main & Constructor deduplication ===');
const inputCode = `
public class MyClass {
    System.out.println("hi");
}

public static Object MyClass() {
}

System.out.println(new MyClass());
`;

const javaCode = globalThis.Java.wrapInMainClass(inputCode);
console.log('--- Generated Java Code ---');
console.log(javaCode);

console.log('--- Execution Output ---');
const res = executeJavaCode(javaCode);
console.log('Status:', res.status);
console.log('Output:\n' + res.output.replace(/<br>/g, '\n'));

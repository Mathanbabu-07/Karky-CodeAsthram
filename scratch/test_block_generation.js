// scratch/test_block_generation.js
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

Blockly.defineBlocksWithJsonArray([
  {
    "type": "java_method_def",
    "message0": "%1 static %2 %3(%4) %5",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ACCESS",
        "options": [["public", "public"], ["private", "private"], ["protected", "protected"]]
      },
      {
        "type": "field_dropdown",
        "name": "RETURN_TYPE",
        "options": [["int", "int"], ["void", "void"], ["String", "String"], ["double", "double"]]
      },
      {
        "type": "field_input",
        "name": "NAME",
        "text": "myMethod"
      },
      {
        "type": "field_input",
        "name": "PARAMS",
        "text": ""
      },
      {
        "type": "input_statement",
        "name": "STACK"
      }
    ],
    "colour": 290
  },
  {
    "type": "control_return",
    "message0": "return %1",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290
  }
]);

console.log('=== TEST 1: User Screenshot - myMethod() placed above main() ===');
const workspace1 = new Blockly.Workspace();

const methodBlock = workspace1.newBlock('java_method_def');
methodBlock.setFieldValue('public', 'ACCESS');
methodBlock.setFieldValue('int', 'RETURN_TYPE');
methodBlock.setFieldValue('myMethod', 'NAME');

// set a to [ create list with 0, 1, 2, 3 ]
const varSet = workspace1.newBlock('variables_set');
varSet.setFieldValue('a', 'VAR');

const listCreate = workspace1.newBlock('lists_create_with');
listCreate.itemCount_ = 4;
for (let i = 0; i < 4; i++) {
    const num = workspace1.newBlock('math_number');
    num.setFieldValue(String(i), 'NUM');
    listCreate.appendValueInput('ADD' + i);
    listCreate.getInput('ADD' + i).connection.connect(num.outputConnection);
}
varSet.getInput('VALUE').connection.connect(listCreate.outputConnection);

// for each item j in list a do return j
const forEach = workspace1.newBlock('controls_forEach');
forEach.setFieldValue('j', 'VAR');
const varGetA = workspace1.newBlock('variables_get');
varGetA.setFieldValue('a', 'VAR');
forEach.getInput('LIST').connection.connect(varGetA.outputConnection);

const retBlock = workspace1.newBlock('control_return');
const varGetJ = workspace1.newBlock('variables_get');
varGetJ.setFieldValue('j', 'VAR');
retBlock.getInput('VALUE').connection.connect(varGetJ.outputConnection);

forEach.getInput('DO').connection.connect(retBlock.previousConnection);
varSet.nextConnection.connect(forEach.previousConnection);

methodBlock.getInput('STACK').connection.connect(varSet.previousConnection);

// Main call: print myMethod()
const printBlock = workspace1.newBlock('text_print');
const callBlock = workspace1.newBlock('procedures_callreturn');
callBlock.setFieldValue('myMethod', 'NAME');
printBlock.getInput('TEXT').connection.connect(callBlock.outputConnection);

const javaCode1 = globalThis.Java.workspaceToCode(workspace1);
console.log('--- Generated Java Code ---');
console.log(javaCode1);

console.log('--- Execution Output ---');
const res1 = executeJavaCode(javaCode1);
console.log('Status:', res1.status);
console.log('Output:\n' + res1.output.replace(/<br>/g, '\n'));

console.log('\n=== TEST 2: User Calculator Class & Method Example ===');
const javaCode2 = `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int sum = calc.add(5, 10);
        System.out.println("Sum: " + sum);
    }
}`;

console.log('--- Java Code ---');
console.log(javaCode2);

console.log('--- Execution Output ---');
const res2 = executeJavaCode(javaCode2);
console.log('Status:', res2.status);
console.log('Output:\n' + res2.output.replace(/<br>/g, '\n'));

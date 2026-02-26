import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Class definition
javaGenerator.forBlock['oop_class'] = function (block, generator) {
    const className = block.getFieldValue('NAME') || 'MyClass';
    const superClass = block.getFieldValue('EXTENDS');
    const body = generator.statementToCode(block, 'MEMBERS');

    let code = `class ${className}`;
    if (superClass) {
        code += ` extends ${superClass}`;
    }
    code += ` {\n${body}}\n`;
    return code;
};

// Constructor
javaGenerator.forBlock['oop_constructor'] = function (block, generator) {
    const className = block.getFieldValue('CLASS') || 'MyClass';
    const args = [];

    for (let i = 0; i < block.arguments_.length; i++) {
        args.push('var ' + generator.nameDB_.getName(block.arguments_[i], Blockly.Names.NameType.VARIABLE));
    }

    const body = generator.statementToCode(block, 'STACK');
    const code = `    public ${className}(${args.join(', ')}) {\n${generator.prefixLines(body, '    ')}    }\n`;
    return code;
};

// Method definition
javaGenerator.forBlock['oop_method'] = function (block, generator) {
    const methodName = block.getFieldValue('NAME') || 'myMethod';
    const args = [];

    for (let i = 0; i < block.arguments_.length; i++) {
        args.push('var ' + generator.nameDB_.getName(block.arguments_[i], Blockly.Names.NameType.VARIABLE));
    }

    const body = generator.statementToCode(block, 'STACK');
    const returnType = block.hasReturn_ ? 'Object' : 'void';

    const code = `    public ${returnType} ${methodName}(${args.join(', ')}) {\n${generator.prefixLines(body, '    ')}    }\n`;
    return code;
};

// Super init call
javaGenerator.forBlock['oop_super_init'] = function (block, generator) {
    const args = [];
    for (let i = 0; i < block.argCount_; i++) {
        args.push(generator.valueToCode(block, 'ARG' + i, Order.NONE) || 'null');
    }
    return `super(${args.join(', ')});\n`;
};

// Super method call
javaGenerator.forBlock['oop_super_call'] = function (block, generator) {
    const method = block.getFieldValue('METHOD') || 'method';
    const args = [];
    for (let i = 0; i < block.argCount_; i++) {
        args.push(generator.valueToCode(block, 'ARG' + i, Order.NONE) || 'null');
    }
    return [`super.${method}(${args.join(', ')})`, Order.MEMBER];
};

// File I/O - Log statements
javaGenerator.forBlock['essentials_log_info'] = function (block, generator) {
    const msg = generator.valueToCode(block, 'MESSAGE', Order.NONE) || '""';
    return `System.out.println("[INFO] " + ${msg});\n`;
};

javaGenerator.forBlock['essentials_log_warn'] = function (block, generator) {
    const msg = generator.valueToCode(block, 'MESSAGE', Order.NONE) || '""';
    return `System.out.println("[WARN] " + ${msg});\n`;
};

javaGenerator.forBlock['essentials_log_error'] = function (block, generator) {
    const msg = generator.valueToCode(block, 'MESSAGE', Order.NONE) || '""';
    return `System.err.println("[ERROR] " + ${msg});\n`;
};

// Input (Scanner)
javaGenerator.forBlock['essentials_safe_input'] = function (block, generator) {
    const prompt = generator.valueToCode(block, 'PROMPT', Order.NONE) || '""';
    generator.addImport('java.util.Scanner');

    const code = `new Scanner(System.in).nextLine()`;
    return [code, Order.FUNCTION_CALL];
};

javaGenerator.forBlock['essentials_input_raw'] = function (block, generator) {
    generator.addImport('java.util.Scanner');
    return [`new Scanner(System.in).nextLine()`, Order.FUNCTION_CALL];
};

// Error handling - Try/Catch
javaGenerator.forBlock['control_try_except'] = function (block, generator) {
    const tryBranch = generator.statementToCode(block, 'TRY');
    const catchBranch = generator.statementToCode(block, 'EXCEPT');
    const exceptionType = block.getFieldValue('EXCEPTION') || 'Exception';
    const exceptionVar = generator.nameDB_.getDistinctName('e', Blockly.Names.NameType.VARIABLE);

    const code = `try {\n${tryBranch}} catch (${exceptionType} ${exceptionVar}) {\n${catchBranch}}\n`;
    return code;
};

javaGenerator.forBlock['control_try_except_finally'] = function (block, generator) {
    const tryBranch = generator.statementToCode(block, 'TRY');
    const catchBranch = generator.statementToCode(block, 'EXCEPT');
    const finallyBranch = generator.statementToCode(block, 'FINALLY');
    const exceptionType = block.getFieldValue('EXCEPTION') || 'Exception';
    const exceptionVar = generator.nameDB_.getDistinctName('e', Blockly.Names.NameType.VARIABLE);

    const code = `try {\n${tryBranch}} catch (${exceptionType} ${exceptionVar}) {\n${catchBranch}} finally {\n${finallyBranch}}\n`;
    return code;
};

javaGenerator.forBlock['control_raise_exception'] = function (block, generator) {
    const exceptionType = block.getFieldValue('EXCEPTION') || 'Exception';
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || '""';
    return `throw new ${exceptionType}(${message});\n`;
};

export { javaGenerator };

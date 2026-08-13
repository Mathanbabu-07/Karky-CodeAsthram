import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Dedicated Java class definition
function formatClassBody(className, rawBody, generator) {
    if (!rawBody || !rawBody.trim()) return '';
    const lines = rawBody.split('\n');
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

    let result = '';
    if (memberDeclarations.length > 0) {
        result += memberDeclarations.join('\n') + '\n';
    }
    if (bareStatements.length > 0) {
        const stmtCode = bareStatements.join('\n');
        result += `    public ${className}() {\n${generator.prefixLines(stmtCode, '        ')}\n    }\n`;
    }
    return result;
}

// Dedicated Java class definition
javaGenerator.forBlock['java_class_define'] = function (block, generator) {
    const access = block.getFieldValue('ACCESS');
    const accessPrefix = access ? `${access} ` : '';
    const name = block.getFieldValue('NAME') || 'MyClass';
    const body = generator.statementToCode(block, 'MEMBERS');
    const formattedBody = formatClassBody(name, body, generator);
    return `${accessPrefix}class ${name} {\n${formattedBody}}\n`;
};

// Dedicated Java field definition
javaGenerator.forBlock['java_field_define'] = function (block, generator) {
    const access = block.getFieldValue('ACCESS') || 'private';
    const isStatic = block.getFieldValue('STATIC');
    const staticPrefix = isStatic ? ' static' : '';
    const type = block.getFieldValue('TYPE') || 'int';
    const name = block.getFieldValue('NAME') || 'myField';
    const value = generator.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || '0';
    return `${access}${staticPrefix} ${type} ${name} = ${value};\n`;
};

// Dedicated Java object instantiation: new MyClass(args)
javaGenerator.forBlock['java_instantiate'] = function (block, generator) {
    const className = block.getFieldValue('CLASS') || 'MyClass';
    const args = generator.valueToCode(block, 'ARGS', Order.NONE) || '';
    return [`new ${className}(${args})`, Order.FUNCTION_CALL];
};

// Class definition (generic)
javaGenerator.forBlock['oop_class'] = function (block, generator) {
    const className = block.getFieldValue('NAME') || 'MyClass';
    const superClass = block.getFieldValue('EXTENDS');
    const body = generator.statementToCode(block, 'MEMBERS');
    const formattedBody = formatClassBody(className, body, generator);

    let code = `class ${className}`;
    if (superClass) {
        code += ` extends ${superClass}`;
    }
    code += ` {\n${formattedBody}}\n`;
    return code;
};

// Constructor
javaGenerator.forBlock['oop_constructor'] = function (block, generator) {
    const className = block.getFieldValue('CLASS') || 'MyClass';
    const args = [];

    for (let i = 0; i < block.arguments_.length; i++) {
        args.push('var ' + generator.nameDB_.getName(block.arguments_[i], 'VARIABLE'));
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
        args.push('var ' + generator.nameDB_.getName(block.arguments_[i], 'VARIABLE'));
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

// Dedicated System.out.println
javaGenerator.forBlock['java_print'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    return `System.out.println(${text});\n`;
};

// Dedicated System.out.printf
javaGenerator.forBlock['java_printf'] = function (block, generator) {
    const format = generator.valueToCode(block, 'FORMAT', Order.NONE) || '""';
    const args = generator.valueToCode(block, 'ARGS', Order.NONE) || '';
    const argsCode = args ? `, ${args}` : '';
    return `System.out.printf(${format}${argsCode});\n`;
};

// Dedicated Scanner init
javaGenerator.forBlock['java_scanner_init'] = function (block, generator) {
    generator.addImport('java.util.Scanner');
    return ['new Scanner(System.in)', Order.FUNCTION_CALL];
};

// Dedicated Scanner read
javaGenerator.forBlock['java_scanner_read'] = function (block, generator) {
    generator.addImport('java.util.Scanner');
    const scanner = generator.valueToCode(block, 'SCANNER', Order.MEMBER) || 'scanner';
    const method = block.getFieldValue('METHOD') || 'nextLine';
    return [`${scanner}.${method}()`, Order.MEMBER];
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
    const exceptionVar = generator.nameDB_.getDistinctName('e', 'VARIABLE');

    const code = `try {\n${tryBranch}} catch (${exceptionType} ${exceptionVar}) {\n${catchBranch}}\n`;
    return code;
};

javaGenerator.forBlock['control_try_except_finally'] = function (block, generator) {
    const tryBranch = generator.statementToCode(block, 'TRY');
    const catchBranch = generator.statementToCode(block, 'EXCEPT');
    const finallyBranch = generator.statementToCode(block, 'FINALLY');
    const exceptionType = block.getFieldValue('EXCEPTION') || 'Exception';
    const exceptionVar = generator.nameDB_.getDistinctName('e', 'VARIABLE');

    const code = `try {\n${tryBranch}} catch (${exceptionType} ${exceptionVar}) {\n${catchBranch}} finally {\n${finallyBranch}}\n`;
    return code;
};

javaGenerator.forBlock['control_raise_exception'] = function (block, generator) {
    const exceptionType = block.getFieldValue('EXCEPTION') || 'Exception';
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || '""';
    return `throw new ${exceptionType}(${message});\n`;
};

export { javaGenerator };

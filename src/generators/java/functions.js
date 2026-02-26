import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Function definition
javaGenerator.forBlock['essentials_function_def'] = function (block, generator) {
    const funcName = generator.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Names.NameType.PROCEDURE);
    const args = [];

    // Get arguments
    for (let i = 0; i < block.arguments_.length; i++) {
        args.push('var ' + generator.nameDB_.getName(block.arguments_[i], Blockly.Names.NameType.VARIABLE));
    }

    const branch = generator.statementToCode(block, 'STACK');
    const returnType = block.hasReturn_ ? 'Object' : 'void';

    let code = `public static ${returnType} ${funcName}(${args.join(', ')}) {\n${branch}`;
    if (!block.hasReturn_) {
        code += '}\n';
    } else {
        code += '    return null; // TODO: Add return statement\n}\n';
    }
    return code;
};

// Procedure call (no return)
javaGenerator.forBlock['procedures_callnoreturn'] = function (block, generator) {
    const funcName = generator.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Names.NameType.PROCEDURE);
    const args = [];

    for (let i = 0; i < block.arguments_.length; i++) {
        args.push(generator.valueToCode(block, 'ARG' + i, Order.NONE) || 'null');
    }

    return `${funcName}(${args.join(', ')});\n`;
};

// Procedure call (with return)
javaGenerator.forBlock['procedures_callreturn'] = function (block, generator) {
    const funcName = generator.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Names.NameType.PROCEDURE);
    const args = [];

    for (let i = 0; i < block.arguments_.length; i++) {
        args.push(generator.valueToCode(block, 'ARG' + i, Order.NONE) || 'null');
    }

    return [`${funcName}(${args.join(', ')})`, Order.FUNCTION_CALL];
};

// Lambda expression (Java 8+)
javaGenerator.forBlock['control_lambda_expr'] = function (block, generator) {
    const args = [];
    for (let i = 0; i < block.arguments_.length; i++) {
        args.push(generator.nameDB_.getName(block.arguments_[i], Blockly.Names.NameType.VARIABLE));
    }

    const expression = generator.valueToCode(block, 'RETURN', Order.NONE) || 'null';
    const code = `(${args.join(', ')}) -> ${expression}`;
    return [code, Order.LAMBDA];
};

// Return statement
javaGenerator.forBlock['control_return'] = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.NONE);
    if (value) {
        return `return ${value};\n`;
    }
    return 'return;\n';
};

// Function callable check (not really applicable in Java, but we can check for null)
javaGenerator.forBlock['functions_callable'] = function (block, generator) {
    const value = generator.valueToCode(block, 'FUNCTION', Order.RELATIONAL) || 'null';
    return [`${value} != null`, Order.RELATIONAL];
};

// Function decorator (Java uses annotations)
javaGenerator.forBlock['control_function_decorator'] = function (block, generator) {
    const decorator = block.getFieldValue('DECORATOR') || 'Override';
    return `@${decorator}\n`;
};

// Function docstring (Java uses /** */ comments)
javaGenerator.forBlock['control_function_docstring'] = function (block, generator) {
    const docstring = block.getFieldValue('DOCSTRING') || '';
    return `/**\n * ${docstring}\n */\n`;
};

// Partial apply (not directly supported in Java, but can use lambdas)
javaGenerator.forBlock['control_partial_apply'] = function (block, generator) {
    const func = generator.valueToCode(block, 'FUNCTION', Order.MEMBER) || 'null';
    const args = [];

    for (let i = 0; i < block.argCount_; i++) {
        args.push(generator.valueToCode(block, 'ARG' + i, Order.NONE) || 'null');
    }

    // Create a lambda that captures the arguments
    const code = `() -> ${func}(${args.join(', ')})`;
    return [code, Order.LAMBDA];
};

export { javaGenerator };

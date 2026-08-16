import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

function getStatement(generator, block, ...names) {
    for (const name of names) {
        if (block.getInput(name)) {
            return generator.statementToCode(block, name) || '';
        }
    }
    return '';
}

function getValue(generator, block, order, ...names) {
    for (const name of names) {
        if (block.getInput(name)) {
            return generator.valueToCode(block, name, order) || '';
        }
    }
    return '';
}

// Dedicated Java method definition
javaGenerator.forBlock['java_method_def'] = function (block, generator) {
    const access = block.getFieldValue('ACCESS') || 'public';
    const staticField = block.getFieldValue('STATIC');
    const isStatic = staticField === 'false' || staticField === false ? '' : 'static ';
    const returnType = block.getFieldValue('RETURN_TYPE') || 'void';
    const name = block.getFieldValue('NAME') || 'myMethod';
    const params = block.getFieldValue('PARAMS') || '';
    const body = getStatement(generator, block, 'DO', 'STACK', 'BODY', 'DO0');
    return `${access} ${isStatic}${returnType} ${name}(${params}) {\n${body}}\n`;
};

// Function definition (generic)
javaGenerator.forBlock['essentials_function_def'] = function (block, generator) {
    const funcName = generator.nameDB_.getName(block.getFieldValue('NAME') || 'myFunc', 'PROCEDURE');
    const args = [];

    for (let i = 0; i < (block.arguments_ || []).length; i++) {
        args.push('Object ' + generator.nameDB_.getName(block.arguments_[i], 'VARIABLE'));
    }

    const branch = getStatement(generator, block, 'STACK', 'DO', 'BODY', 'DO0');
    const returnType = block.hasReturn_ ? 'Object' : 'void';

    return `public static ${returnType} ${funcName}(${args.join(', ')}) {\n${branch}}\n`;
};

// Procedure call (no return)
javaGenerator.forBlock['procedures_callnoreturn'] = function (block, generator) {
    const funcName = generator.nameDB_.getName(block.getFieldValue('NAME') || 'myFunc', 'PROCEDURE');
    const args = [];

    for (let i = 0; i < (block.arguments_ || []).length; i++) {
        args.push(generator.valueToCode(block, 'ARG' + i, Order.NONE) || 'null');
    }

    return `${funcName}(${args.join(', ')});\n`;
};

// Procedure call (with return)
javaGenerator.forBlock['procedures_callreturn'] = function (block, generator) {
    const funcName = generator.nameDB_.getName(block.getFieldValue('NAME') || 'myFunc', 'PROCEDURE');
    const args = [];

    for (let i = 0; i < (block.arguments_ || []).length; i++) {
        args.push(generator.valueToCode(block, 'ARG' + i, Order.NONE) || 'null');
    }

    return [`${funcName}(${args.join(', ')})`, Order.FUNCTION_CALL];
};

// Lambda expression (Java 8+)
javaGenerator.forBlock['control_lambda_expr'] = function (block, generator) {
    const args = [];
    const blockArgs = block.arguments_ || [];
    for (let i = 0; i < blockArgs.length; i++) {
        args.push(generator.nameDB_.getName(blockArgs[i], 'VARIABLE'));
    }

    const retInput = block.getInput('RETURN') ? 'RETURN' : (block.getInput('VALUE') ? 'VALUE' : (block.getInput('EXPR') ? 'EXPR' : null));
    const expression = retInput ? (generator.valueToCode(block, retInput, Order.NONE) || 'null') : 'null';
    const code = `(${args.join(', ')}) -> ${expression}`;
    return [code, Order.FUNCTION_CALL];
};

// Return statement
javaGenerator.forBlock['control_return'] = function (block, generator) {
    const valInput = block.getInput('VALUE') ? 'VALUE' : (block.getInput('VAL') ? 'VAL' : (block.getInput('EXPR') ? 'EXPR' : null));
    const value = valInput ? generator.valueToCode(block, valInput, Order.NONE) : null;
    if (value) {
        return `return ${value};\n`;
    }
    return 'return;\n';
};

// Function callable check (not really applicable in Java, but we can check for null)
javaGenerator.forBlock['functions_callable'] = function (block, generator) {
    const fInput = block.getInput('FUNC') ? 'FUNC' : (block.getInput('FUNCTION') ? 'FUNCTION' : (block.getInput('VALUE') ? 'VALUE' : null));
    const value = fInput ? (generator.valueToCode(block, fInput, Order.RELATIONAL) || 'null') : 'null';
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
    const fInput = block.getInput('FUNC') ? 'FUNC' : (block.getInput('FUNCTION') ? 'FUNCTION' : (block.getInput('VALUE') ? 'VALUE' : null));
    const func = fInput ? (generator.valueToCode(block, fInput, Order.MEMBER) || 'null') : 'null';
    const args = [];

    let i = 0;
    while (block.getInput('ARG' + i) || block.getInput('ADD' + i)) {
        const inp = block.getInput('ARG' + i) ? ('ARG' + i) : ('ADD' + i);
        args.push(generator.valueToCode(block, inp, Order.NONE) || 'null');
        i++;
    }

    const code = `() -> ${func}(${args.join(', ')})`;
    return [code, Order.FUNCTION_CALL];
};

export { javaGenerator };

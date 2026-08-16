import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

// Dedicated String contains
javaGenerator.forBlock['java_string_contains'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.MEMBER) || '""';
    const sub = generator.valueToCode(block, 'SUB', Order.NONE) || '""';
    return [`${text}.contains(${sub})`, Order.MEMBER];
};

// Dedicated String split
javaGenerator.forBlock['java_string_split'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.MEMBER) || '""';
    const delim = generator.valueToCode(block, 'DELIM', Order.NONE) || '" "';
    return [`${text}.split(${delim})`, Order.MEMBER];
};

// Standard Blockly text block ("hello")
javaGenerator.forBlock['text'] = function (block, generator) {
    const textValue = block.getFieldValue('TEXT') || '';
    const code = generator.quote_(textValue);
    return [code, Order.ATOMIC];
};

// Standard Blockly text_join block
javaGenerator.forBlock['text_join'] = function (block, generator) {
    const itemCount = block.itemCount_ || 0;
    if (itemCount === 0) {
        return ['""', Order.ATOMIC];
    } else if (itemCount === 1) {
        const element = generator.valueToCode(block, 'ADD0', Order.NONE) || '""';
        return [`String.valueOf(${element})`, Order.FUNCTION_CALL];
    } else {
        const elements = [];
        for (let i = 0; i < itemCount; i++) {
            const element = generator.valueToCode(block, 'ADD' + i, Order.NONE) || '""';
            elements.push(`String.valueOf(${element})`);
        }
        return [elements.join(' + '), Order.ADDITION];
    }
};

// Standard Blockly text_append block
javaGenerator.forBlock['text_append'] = function (block, generator) {
    const varName = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
    const value = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    return `${varName} += String.valueOf(${value});\n`;
};

// Essentials print block
javaGenerator.forBlock['essentials_print'] = function (block, generator) {
    const msg = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    return `System.out.println(${msg});\n`;
};

// Text literal
javaGenerator.forBlock['text_literal'] = function (block, generator) {
    const text = block.getFieldValue('TEXT');
    const code = generator.quote_(text);
    return [code, Order.ATOMIC];
};

// Text multiline
javaGenerator.forBlock['text_multiline'] = function (block, generator) {
    const text = block.getFieldValue('TEXT');
    // Java doesn't have template literals like JS, use concatenation for multiline
    const lines = text.split('\n');
    if (lines.length === 1) {
        return [generator.quote_(text), Order.ATOMIC];
    }
    const code = lines.map(line => generator.quote_(line)).join(' + "\\n" + ');
    return [code, Order.ADDITION];
};

// Text concatenation
javaGenerator.forBlock['text_concat'] = function (block, generator) {
    if (block.getInput('A') || block.getInput('B')) {
        const text1 = block.getInput('A') ? (generator.valueToCode(block, 'A', Order.ADDITION) || '""') : '""';
        const text2 = block.getInput('B') ? (generator.valueToCode(block, 'B', Order.ADDITION) || '""') : '""';
        return [`${text1} + ${text2}`, Order.ADDITION];
    }
    const elements = [];
    let i = 0;
    while (block.getInput('ADD' + i)) {
        elements.push(`String.valueOf(${generator.valueToCode(block, 'ADD' + i, Order.NONE) || '""'})`);
        i++;
    }
    if (elements.length === 0) return ['""', Order.ATOMIC];
    if (elements.length === 1) return [elements[0], Order.ATOMIC];
    return [elements.join(' + '), Order.ADDITION];
};

// Text format (using String.format)
javaGenerator.forBlock['text_format'] = function (block, generator) {
    const tInput = block.getInput('TEMPLATE') ? 'TEMPLATE' : (block.getInput('TEXT') ? 'TEXT' : (block.getInput('FSTRING') ? 'FSTRING' : null));
    const template = tInput ? (generator.valueToCode(block, tInput, Order.NONE) || '""') : '""';
    const vInput = block.getInput('VALUES') ? 'VALUES' : (block.getInput('VALUE') ? 'VALUE' : null);
    const values = vInput ? (generator.valueToCode(block, vInput, Order.NONE) || '""') : '""';
    return [`String.format(${template}, ${values})`, Order.FUNCTION_CALL];
};

// Text length
javaGenerator.forBlock['text_length'] = function (block, generator) {
    const tInput = block.getInput('TEXT') ? 'TEXT' : (block.getInput('VALUE') ? 'VALUE' : (block.getInput('STRING') ? 'STRING' : null));
    const text = tInput ? (generator.valueToCode(block, tInput, Order.MEMBER) || '""') : '""';
    const code = `${text}.length()`;
    return [code, Order.MEMBER];
};

// Text substring
javaGenerator.forBlock['text_substring'] = function (block, generator) {
    const sInput = block.getInput('STRING') ? 'STRING' : (block.getInput('TEXT') ? 'TEXT' : (block.getInput('VALUE') ? 'VALUE' : null));
    const text = sInput ? (generator.valueToCode(block, sInput, Order.MEMBER) || '""') : '""';
    const fInput = block.getInput('FROM') ? 'FROM' : (block.getInput('AT') ? 'AT' : (block.getInput('START') ? 'START' : null));
    const start = fInput ? (generator.valueToCode(block, fInput, Order.NONE) || '0') : '0';
    const tInput = block.getInput('TO') ? 'TO' : (block.getInput('END') ? 'END' : null);
    const end = tInput ? generator.valueToCode(block, tInput, Order.NONE) : null;

    let code;
    if (end) {
        code = `${text}.substring(${start}, ${end})`;
    } else {
        code = `${text}.substring(${start})`;
    }
    return [code, Order.MEMBER];
};

// Text transform (toUpperCase, toLowerCase)
javaGenerator.forBlock['text_transform'] = function (block, generator) {
    const tInput = block.getInput('TEXT') ? 'TEXT' : (block.getInput('VALUE') ? 'VALUE' : null);
    const text = tInput ? (generator.valueToCode(block, tInput, Order.MEMBER) || '""') : '""';
    const mode = block.getFieldValue('MODE');

    let code;
    switch (mode) {
        case 'UPPER':
            code = `${text}.toUpperCase()`;
            break;
        case 'LOWER':
            code = `${text}.toLowerCase()`;
            break;
        case 'TITLE':
            generator.addImport && generator.addImport('java.util.stream.Collectors');
            generator.addImport && generator.addImport('java.util.Arrays');
            code = `Arrays.stream(${text}.split(" ")).map(w -> w.isEmpty() ? w : Character.toUpperCase(w.charAt(0)) + w.substring(1).toLowerCase()).collect(Collectors.joining(" "))`;
            break;
        default:
            code = text;
    }
    return [code, Order.MEMBER];
};

// Text replace
javaGenerator.forBlock['text_replace'] = function (block, generator) {
    const tInput = block.getInput('TEXT') ? 'TEXT' : (block.getInput('STRING') ? 'STRING' : (block.getInput('VALUE') ? 'VALUE' : null));
    const text = tInput ? (generator.valueToCode(block, tInput, Order.MEMBER) || '""') : '""';
    const fromInput = block.getInput('FROM') ? 'FROM' : (block.getInput('OLD') ? 'OLD' : null);
    const from = fromInput ? (generator.valueToCode(block, fromInput, Order.NONE) || '""') : '""';
    const toInput = block.getInput('TO') ? 'TO' : (block.getInput('NEW') ? 'NEW' : null);
    const to = toInput ? (generator.valueToCode(block, toInput, Order.NONE) || '""') : '""';
    const code = `${text}.replace(${from}, ${to})`;
    return [code, Order.MEMBER];
};

// Text split
javaGenerator.forBlock['text_split_join'] = function (block, generator) {
    const mode = block.getFieldValue('MODE') || 'SPLIT';
    const sInput = block.getInput('STRING') ? 'STRING' : (block.getInput('TEXT') ? 'TEXT' : (block.getInput('INPUT') ? 'INPUT' : null));
    const text = sInput ? (generator.valueToCode(block, sInput, Order.MEMBER) || '""') : '""';
    const dInput = block.getInput('DELIM') ? 'DELIM' : (block.getInput('DELIMITER') ? 'DELIMITER' : (block.getInput('SEP') ? 'SEP' : null));
    const delimiter = dInput ? (generator.valueToCode(block, dInput, Order.NONE) || '" "') : '" "';

    let code;
    if (mode === 'SPLIT') {
        code = `${text}.split(${delimiter})`;
        generator.addImport && generator.addImport('java.util.Arrays');
    } else { // JOIN
        generator.addImport && generator.addImport('java.lang.String');
        code = `String.join(${delimiter}, ${text})`;
    }
    return [code, Order.MEMBER];
};

// Text print
javaGenerator.forBlock['text_print'] = function (block, generator) {
    const tInput = block.getInput('TEXT') ? 'TEXT' : (block.getInput('VALUE') ? 'VALUE' : null);
    const msg = tInput ? (generator.valueToCode(block, tInput, Order.NONE) || '""') : '""';
    return `System.out.println(${msg});\n`;
};

// Text print with f-string (use String.format)
javaGenerator.forBlock['text_print_fstring'] = function (block, generator) {
    const tInput = block.getInput('TEXT') ? 'TEXT' : (block.getInput('TEMPLATE') ? 'TEMPLATE' : (block.getInput('FSTRING') ? 'FSTRING' : null));
    const template = tInput ? (generator.valueToCode(block, tInput, Order.NONE) || '""') : '""';
    const vInput = block.getInput('VALUES') ? 'VALUES' : (block.getInput('VALUE') ? 'VALUE' : null);
    const values = vInput ? generator.valueToCode(block, vInput, Order.NONE) : '';

    if (values) {
        return `System.out.println(String.format(${template}, ${values}));\n`;
    }
    return `System.out.println(${template});\n`;
};

// Text is empty
javaGenerator.forBlock['text_is_empty'] = function (block, generator) {
    const tInput = block.getInput('TEXT') ? 'TEXT' : (block.getInput('VALUE') ? 'VALUE' : (block.getInput('STRING') ? 'STRING' : null));
    const text = tInput ? (generator.valueToCode(block, tInput, Order.MEMBER) || '""') : '""';
    const code = `${text}.isEmpty()`;
    return [code, Order.MEMBER];
};

// Text search/find
javaGenerator.forBlock['text_search'] = function (block, generator) {
    const tInput = block.getInput('TEXT') ? 'TEXT' : (block.getInput('STRING') ? 'STRING' : (block.getInput('VALUE') ? 'VALUE' : null));
    const text = tInput ? (generator.valueToCode(block, tInput, Order.MEMBER) || '""') : '""';
    const fInput = block.getInput('FIND') ? 'FIND' : (block.getInput('SUB') ? 'SUB' : (block.getInput('SEARCH') ? 'SEARCH' : null));
    const search = fInput ? (generator.valueToCode(block, fInput, Order.NONE) || '""') : '""';
    const mode = block.getFieldValue('MODE') || 'CONTAINS';

    let code;
    switch (mode) {
        case 'CONTAINS':
            code = `${text}.contains(${search})`;
            break;
        case 'STARTS_WITH':
            code = `${text}.startsWith(${search})`;
            break;
        case 'ENDS_WITH':
            code = `${text}.endsWith(${search})`;
            break;
        case 'INDEX_OF':
            code = `${text}.indexOf(${search})`;
            break;
        default:
            code = `${text}.contains(${search})`;
    }
    return [code, Order.MEMBER];
};

export { javaGenerator };

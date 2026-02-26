import { javaGenerator } from '../java.js';
import { Order } from 'blockly/javascript';

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
    const text1 = generator.valueToCode(block, 'A', Order.ADDITION) || '""';
    const text2 = generator.valueToCode(block, 'B', Order.ADDITION) || '""';
    const code = `${text1} + ${text2}`;
    return [code, Order.ADDITION];
};

// Text format (using String.format)
javaGenerator.forBlock['text_format'] = function (block, generator) {
    const template = generator.valueToCode(block, 'TEMPLATE', Order.NONE) || '""';
    const values = generator.valueToCode(block, 'VALUES', Order.NONE) || '""';
    const code = `String.format(${template}, ${values})`;
    return [code, Order.FUNCTION_CALL];
};

// Text length
javaGenerator.forBlock['text_length'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.MEMBER) || '""';
    const code = `${text}.length()`;
    return [code, Order.MEMBER];
};

// Text substring
javaGenerator.forBlock['text_substring'] = function (block, generator) {
    const text = generator.valueToCode(block, 'STRING', Order.MEMBER) || '""';
    const start = generator.valueToCode(block, 'FROM', Order.NONE) || '0';
    const end = generator.valueToCode(block, 'TO', Order.NONE);

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
    const text = generator.valueToCode(block, 'TEXT', Order.MEMBER) || '""';
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
            // Java doesn't have built-in title case, use simple implementation
            generator.addImport('java.util.stream.Collectors');
            generator.addImport('java.util.Arrays');
            code = `Arrays.stream(${text}.split(" ")).map(w -> w.isEmpty() ? w : Character.toUpperCase(w.charAt(0)) + w.substring(1).toLowerCase()).collect(Collectors.joining(" "))`;
            break;
        default:
            code = text;
    }
    return [code, Order.MEMBER];
};

// Text replace
javaGenerator.forBlock['text_replace'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.MEMBER) || '""';
    const from = generator.valueToCode(block, 'FROM', Order.NONE) || '""';
    const to = generator.valueToCode(block, 'TO', Order.NONE) || '""';
    const code = `${text}.replace(${from}, ${to})`;
    return [code, Order.MEMBER];
};

// Text split
javaGenerator.forBlock['text_split_join'] = function (block, generator) {
    const mode = block.getFieldValue('MODE');
    const text = generator.valueToCode(block, 'STRING', Order.MEMBER) || '""';
    const delimiter = generator.valueToCode(block, 'DELIM', Order.NONE) || '" "';

    let code;
    if (mode === 'SPLIT') {
        code = `${text}.split(${delimiter})`;
        generator.addImport('java.util.Arrays');
    } else { // JOIN
        generator.addImport('java.lang.String');
        code = `String.join(${delimiter}, ${text})`;
    }
    return [code, Order.MEMBER];
};

// Text print
javaGenerator.forBlock['text_print'] = function (block, generator) {
    const msg = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    return `System.out.println(${msg});\n`;
};

// Text print with f-string (use String.format)
javaGenerator.forBlock['text_print_fstring'] = function (block, generator) {
    const template = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    const values = generator.valueToCode(block, 'VALUES', Order.NONE) || '';

    if (values) {
        return `System.out.println(String.format(${template}, ${values}));\n`;
    }
    return `System.out.println(${template});\n`;
};

// Text is empty
javaGenerator.forBlock['text_is_empty'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.MEMBER) || '""';
    const code = `${text}.isEmpty()`;
    return [code, Order.MEMBER];
};

// Text search/find
javaGenerator.forBlock['text_search'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.MEMBER) || '""';
    const search = generator.valueToCode(block, 'FIND', Order.NONE) || '""';
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

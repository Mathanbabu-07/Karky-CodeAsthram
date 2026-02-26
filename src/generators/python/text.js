import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['text_literal'] = function (block) {
    const code = Python.quote_(block.getFieldValue('TEXT'));
    return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['text_multiline'] = function (block) {
    // For multi-line strings, we use triple quotes.
    const code = `"""${block.getFieldValue('TEXT')}"""`;
    return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['text_concat'] = function (block) {
    if (block.itemCount_ === 0) {
        return ['\'\'', Python.ORDER_ATOMIC];
    }

    const elements = new Array(block.itemCount_);
    for (let i = 0; i < block.itemCount_; i++) {
        elements[i] = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || '\'\'';
    }

    // The generated code will be a series of string additions.
    // To ensure correct precedence and type, we cast each element to a string.
    const code = elements.map(element => `str(${element})`).join(' + ');
    return [code, Python.ORDER_ADDITIVE];
};

Python.forBlock['text_format'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || '\'\'';
    const args = [];
    for (let i = 0; i < block.itemCount_; i++) {
        args[i] = Python.valueToCode(block, 'ARG' + i, Python.ORDER_NONE) || 'None';
    }
    const code = `${text}.format(${args.join(', ')})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_length'] = function (block) {
    const text = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || '\'\'';
    const code = `len(${text})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_substring'] = function (block) {
    const text = Python.valueToCode(block, 'STRING', Python.ORDER_MEMBER) || '\'\'';
    const where1 = block.getFieldValue('WHERE1');
    const where2 = block.getFieldValue('WHERE2');

    let at1;
    switch (where1) {
        case 'FROM_START':
            at1 = Python.valueToCode(block, 'AT1', Python.ORDER_NONE) || '1';
            // User is 1-based, Python is 0-based.
            if (String(at1).match(/^\d+$/)) {
                at1 = String(parseInt(at1, 10) - 1);
            } else {
                at1 = `${at1} - 1`;
            }
            break;
        case 'FROM_END':
            at1 = Python.valueToCode(block, 'AT1', Python.ORDER_UNARY_SIGN) || '1';
            at1 = `-${at1}`;
            break;
        case 'FIRST':
            at1 = '0';
            break;
        default:
            throw Error('Unhandled option (text_substring).');
    }

    let at2;
    switch (where2) {
        case 'FROM_START':
            at2 = Python.valueToCode(block, 'AT2', Python.ORDER_NONE) || '1';
            break;
        case 'FROM_END':
            at2 = Python.valueToCode(block, 'AT2', Python.ORDER_UNARY_SIGN) || '1';
            at2 = `-${at2}`;
            break;
        case 'LAST':
            at2 = ''; // Slice to the end of the string.
            break;
        default:
            throw Error('Unhandled option (text_substring).');
    }
    const code = `${text}[${at1 || '0'}:${at2}]`;
    return [code, Python.ORDER_MEMBER];
};

Python.forBlock['text_search'] = function (block) {
    const operator = block.getFieldValue('OPERATION');
    const needle = Python.valueToCode(block, 'NEEDLE', Python.ORDER_NONE) || '\'\'';
    const haystack = Python.valueToCode(block, 'HAYSTACK', Python.ORDER_MEMBER) || '\'\'';

    let code, order;
    switch (operator) {
        case 'FIRST':
            // find() returns -1 on failure, which becomes 0 for 1-based Blockly.
            code = `(${haystack}.find(${needle}) + 1)`;
            order = Python.ORDER_ADDITIVE;
            break;
        case 'LAST':
            // rfind() returns -1 on failure, which becomes 0 for 1-based Blockly.
            code = `(${haystack}.rfind(${needle}) + 1)`;
            order = Python.ORDER_ADDITIVE;
            break;
        case 'CONTAINS':
            code = `${needle} in ${haystack}`;
            order = Python.ORDER_RELATIONAL;
            break;
        case 'STARTSWITH':
            code = `${haystack}.startswith(${needle})`;
            order = Python.ORDER_FUNCTION_CALL;
            break;
        case 'ENDSWITH':
            code = `${haystack}.endswith(${needle})`;
            order = Python.ORDER_FUNCTION_CALL;
            break;
        default:
            throw Error('Unknown operator.');
    }
    return [code, order];
};

Python.forBlock['text_transform'] = function (block) {
    const operator = block.getFieldValue('OPERATION');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || '\'\'';

    const opMap = {
        'UPPERCASE': '.upper()',
        'LOWERCASE': '.lower()',
        'TITLECASE': '.title()',
        'STRIP': '.strip()',
        'LSTRIP': '.lstrip()',
        'RSTRIP': '.rstrip()',
    };

    const code = text + opMap[operator];
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_split_join'] = function (block) {
    const mode = block.getFieldValue('MODE');
    const delimiter = Python.valueToCode(block, 'DELIMITER', Python.ORDER_NONE) || '\'\'';
    const input = Python.valueToCode(block, 'INPUT', Python.ORDER_MEMBER) || '[]';

    let code, order;
    if (mode === 'SPLIT') {
        code = `${input}.split(${delimiter})`;
        order = Python.ORDER_FUNCTION_CALL;
    } else if (mode === 'JOIN') {
        code = `${delimiter}.join(${input})`;
        order = Python.ORDER_FUNCTION_CALL;
    } else {
        throw Error('Unknown mode: ' + mode);
    }

    return [code, order];
};

Python.forBlock['text_html_transform'] = function (block) {
    // Requires 'import html'
    Python.definitions_['import_html'] = 'import html';
    const operator = block.getFieldValue('OPERATION');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || '\'\'';

    const funcName = (operator === 'ESCAPE') ? 'escape' : 'unescape';
    const code = `html.${funcName}(str(${text}))`;

    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_is_empty'] = function (block) {
    const text = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || '\'\'';
    // In Python, an empty string is falsy.
    const code = `not ${text}`;
    return [code, Python.ORDER_LOGICAL_NOT];
};

Python.forBlock['text_print'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_ATOMIC) || "''";
    const code = `print(${text})\n`;
    return code;
};

Python.forBlock['text_print_fstring'] = function (block) {
    // Build a single f-string intelligently.
    let base = Python.valueToCode(block, 'BASE', Python.ORDER_NONE) || "''";
    // Strip surrounding quotes if base is a literal string already quoted, so we can safely inject placeholders.
    const m = base.match(/^(['"])([\s\S]*)\1$/);
    let literalInner = m ? m[2] : null;
    const values = [];
    for (let i = 0; typeof block.itemCount_ === 'number' && i < block.itemCount_; i++) {
        const val = Python.valueToCode(block, 'ARG' + i, Python.ORDER_NONE) || 'None';
        values.push(val);
    }
    if (values.length) {
        if (literalInner !== null && !/{.*}/.test(literalInner)) {
            // If user didn't include explicit braces, append placeholders sequentially.
            literalInner += values.map((_, idx) => `{${idx}}`).join('');
            base = `f"${literalInner}"`;
            // Now format indexes replaced by actual expressions via .format equivalent approach inside f-string using expression tuple.
            // Replace {0},{1}... with expressions by rebuilding.
            // Simpler: build f-string with direct expressions separated: f"<prefix>{expr0}{expr1}..."
            const prefixEscaped = literalInner.replace(/\{\d+\}/g, '');
            const dynamicPart = values.map(v => `{${v}}`).join('');
            base = `f"${prefixEscaped}${dynamicPart}"`;
        } else if (literalInner === null) {
            // Non-literal expression: concatenate f-string of base plus injected expressions.
            base = `(str(${base}) + ${values.map(v => `str(${v})`).join(' + ')})`;
            return `print(${base})\n`;
        } else {
            // Base already has braces or is literal; just append expressions.
            const dynamicPart = values.map(v => `{${v}}`).join('');
            base = `f${m ? m[1] + literalInner + dynamicPart + m[1] : '"' + base + dynamicPart + '"'}`;
        }
    } else {
        // No extra values: if not already f-prefixed and contains braces, prefix with f
        if (/^["']/.test(base) && /\{.*\}/.test(base) && !/^f/.test(base)) {
            base = 'f' + base;
        }
    }
    return `print(${base})\n`;
};

Python.forBlock['text_newline'] = function (block) {
    return ["'\\n'", Python.ORDER_ATOMIC];
};

Python.forBlock['text_tab'] = function (block) {
    return ["'\\t'", Python.ORDER_ATOMIC];
};

Python.forBlock['text_print_with_newline'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
    const pos = block.getFieldValue('POSITION') || 'AFTER';
    if (pos === 'BEFORE') {
        return `print("\\n" + str(${text}))\n`;
    }
    if (pos === 'BOTH') {
        return `print("\\n" + str(${text}) + "\\n")\n`;
    }
    // AFTER (default): rely on print's newline behavior
    return `print(${text})\n`;
};

Python.forBlock['text_check_type'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const checkType = block.getFieldValue('CHECK_TYPE');

    const methodMap = {
        'ALPHA': '.isalpha()',
        'DIGIT': '.isdigit()',
        'ALNUM': '.isalnum()',
        'SPACE': '.isspace()',
        'LOWER': '.islower()',
        'UPPER': '.isupper()',
        'TITLE': '.istitle()',
        'PRINTABLE': '.isprintable()',
        'IDENTIFIER': '.isidentifier()',
        'DECIMAL': '.isdecimal()'
    };

    const method = methodMap[checkType] || '.isalpha()';
    const code = `${text}${method}`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_alignment'] = function (block) {
    const alignMethod = block.getFieldValue('ALIGN');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_NONE) || '0';
    const fill = Python.valueToCode(block, 'FILL', Python.ORDER_NONE);

    let code;
    if (alignMethod === 'ZFILL') {
        code = `${text}.zfill(${width})`;
    } else {
        const methodMap = {
            'CENTER': 'center',
            'LJUST': 'ljust',
            'RJUST': 'rjust'
        };
        const method = methodMap[alignMethod];

        if (fill) {
            code = `${text}.${method}(${width}, ${fill})`;
        } else {
            code = `${text}.${method}(${width})`;
        }
    }

    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_partition'] = function (block) {
    const method = block.getFieldValue('METHOD');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const separator = Python.valueToCode(block, 'SEP', Python.ORDER_NONE) || "''";

    const methodName = method === 'PARTITION' ? 'partition' : 'rpartition';
    const code = `${text}.${methodName}(${separator})`;

    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_i18n_plural'] = function (block) {
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
    const n = Python.valueToCode(block, 'N', Python.ORDER_NONE) || 0;
    const lang = Python.valueToCode(block, 'LANG', Python.ORDER_NONE) || 'None';
    const helperName = '_i18n_registry';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    return [`${helperName}.get(${lang}, {}).get(${key} + ('_plural' if ${n} != 1 else ''), ${key})`, Python.ORDER_CONDITIONAL];
};

Python.forBlock['text_i18n_set_locale'] = function (block) {
    Python.addImport('import locale');
    const lang = Python.valueToCode(block, 'LANG', Python.ORDER_NONE) || "''";
    return `locale.setlocale(locale.LC_ALL, ${lang})\n`;
};

Python.forBlock['text_i18n_get_locale'] = function (block) {
    Python.addImport('import locale');
    return [`locale.getlocale()[0]`, Python.ORDER_MEMBER];
};

Python.forBlock['text_alt_text_generate'] = function (block) {
    const metadata = Python.valueToCode(block, 'METADATA', Python.ORDER_NONE) || '{}';
    const lang = Python.valueToCode(block, 'LANG', Python.ORDER_NONE) || 'None';
    return [`f"Image: {str(${metadata}.get('description', 'No description'))}"`, Python.ORDER_ATOMIC];
};

Python.forBlock['text_to_lines'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    return [`${text}.splitlines()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_indent'] = function (block) {
    Python.addImport('import textwrap');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
    const prefix = Python.valueToCode(block, 'PREFIX', Python.ORDER_NONE) || "'    '";
    return [`textwrap.indent(${text}, ${prefix})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_unindent'] = function (block) {
    Python.addImport('import textwrap');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
    return [`textwrap.dedent(${text})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_preview'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const limit = Python.valueToCode(block, 'LIMIT', Python.ORDER_NONE) || '100';
    return [`${text}[:${limit}] + ('...' if len(${text}) > ${limit} else '')`, Python.ORDER_ADDITIVE];
};

Python.forBlock['media_nlp_tokenize'] = function (block) {
    Python.addImport('import nltk');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
    return [`nltk.word_tokenize(${text})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_nlp_sentences'] = function (block) {
    Python.addImport('import nltk');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
    return [`nltk.sent_tokenize(${text})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_nlp_pos_tag'] = function (block) {
    Python.addImport('import nltk');
    const tokens = Python.valueToCode(block, 'TOKENS', Python.ORDER_NONE) || '[]';
    return [`nltk.pos_tag(${tokens})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_nlp_lemmatize'] = function (block) {
    Python.addImport('from nltk.stem import WordNetLemmatizer');
    const token = Python.valueToCode(block, 'TOKEN', Python.ORDER_NONE) || "''";
    const helperName = '_lemmatizer';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = WordNetLemmatizer()\n`;
    }
    return [`${helperName}.lemmatize(${token})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['python_text'] = function (block) {
    const text = block.getFieldValue('TEXT');
    return [JSON.stringify(text), Python.ORDER_ATOMIC];
};

Python.forBlock['text_ord'] = function (block) {
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || "''";
    return [`ord(${value})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_format_spec'] = function (block) {
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
    const spec = Python.valueToCode(block, 'SPEC', Python.ORDER_NONE) || "''";
    return [`format(${value}, ${spec})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_replace'] = function (block) {
    // Guard inputs (CRITICAL)
    const text = block.getInput('HAYSTACK')
        ? Python.valueToCode(block, 'HAYSTACK', Python.ORDER_MEMBER)
        : "''";

    const oldStr = block.getInput('NEEDLE')
        ? Python.valueToCode(block, 'NEEDLE', Python.ORDER_NONE)
        : "''";

    const newStr = block.getInput('REPLACEMENT')
        ? Python.valueToCode(block, 'REPLACEMENT', Python.ORDER_NONE)
        : "''";

    const count = block.getInput('COUNT')
        ? Python.valueToCode(block, 'COUNT', Python.ORDER_NONE)
        : null;

    let code;
    if (count) {
        code = `${text}.replace(${oldStr}, ${newStr}, ${count})`;
    } else {
        code = `${text}.replace(${oldStr}, ${newStr})`;
    }

    return [code, Python.ORDER_MEMBER];
};

// Additional Text blocks moved from python.js

Python.forBlock['text_is_numeric'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const code = `${text}.isnumeric()`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_find_all'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
    const substring = Python.valueToCode(block, 'SUBSTRING', Python.ORDER_NONE) || "''";
    const code = `[i for i in range(len(${text})) if ${text}.startswith(${substring}, i)]`;
    return [code, Python.ORDER_LIST_COMPREHENSION];
};

Python.forBlock['text_compare_case_insensitive'] = function (block) {
    const text1 = Python.valueToCode(block, 'TEXT1', Python.ORDER_MEMBER) || "''";
    const text2 = Python.valueToCode(block, 'TEXT2', Python.ORDER_MEMBER) || "''";
    const code = `${text1}.lower() == ${text2}.lower()`;
    return [code, Python.ORDER_RELATIONAL];
};

Python.forBlock['text_count_simple'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const sub = Python.valueToCode(block, 'SUB', Python.ORDER_NONE) || "''";
    const code = `${text}.count(${sub})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_swapcase'] = function (block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const code = `${text}.swapcase()`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_fstring'] = function (block) {
    const template = Python.valueToCode(block, 'TEMPLATE', Python.ORDER_NONE) || "''";
    const values = Python.valueToCode(block, 'VALUES', Python.ORDER_NONE) || '{}';
    const code = `${template}.format(**${values})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_regex_search'] = function (block) {
    Python.addImport('import re');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
    const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
    const code = `re.search(${pattern}, ${text})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_regex_replace'] = function (block) {
    Python.addImport('import re');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
    const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
    const replacement = Python.valueToCode(block, 'REPLACEMENT', Python.ORDER_NONE) || "''";
    const code = `re.sub(${pattern}, ${replacement}, ${text})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_normalize'] = function (block) {
    Python.addImport('import unicodedata');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
    const form = block.getFieldValue('FORM');
    const code = `unicodedata.normalize('${form}', ${text})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['i18n_register_translation'] = function (block) {
    const lang = block.getFieldValue('LANG');
    const dictionary = Python.valueToCode(block, 'DICTIONARY', Python.ORDER_NONE) || '{}';
    const helperName = '_i18n_registry';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    return `${helperName}['${lang}'] = ${dictionary}\n`;
};

Python.forBlock['i18n_translate'] = function (block) {
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
    const lang = Python.valueToCode(block, 'LANG', Python.ORDER_NONE) || "''";
    const fallback = Python.valueToCode(block, 'FALLBACK', Python.ORDER_NONE) || 'None';
    const helperName = '_i18n_registry';
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helperName]) {
        Python.definitions_[helperName] = `${helperName} = {}\n`;
    }
    const code = `${helperName}.get(${lang}, {}).get(${key}, ${fallback} if ${fallback} is not None else ${key})`;
    return [code, Python.ORDER_CONDITIONAL];
};

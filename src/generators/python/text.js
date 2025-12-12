import { pythonGenerator as Python } from 'blockly/python';

Python.forBlock['text_literal'] = function(block) {
  const code = Python.quote_(block.getFieldValue('TEXT'));
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['text_multiline'] = function(block) {
  // For multi-line strings, we use triple quotes.
  const code = `"""${block.getFieldValue('TEXT')}"""`;
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['text_concat'] = function(block) {
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

Python.forBlock['text_format'] = function(block) {
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || '\'\'';
  const args = [];
  for (let i = 0; i < block.itemCount_; i++) {
    args[i] = Python.valueToCode(block, 'ARG' + i, Python.ORDER_NONE) || 'None';
  }
  const code = `${text}.format(${args.join(', ')})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_length'] = function(block) {
  const text = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || '\'\'';
  const code = `len(${text})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_substring'] = function(block) {
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

Python.forBlock['text_search'] = function(block) {
  const operator = block.getFieldValue('OPERATION');
  const needle = Python.valueToCode(block, 'NEEDLE', Python.ORDER_NONE) || '\'\'';
  const haystack = Python.valueToCode(block, 'HAYSTACK', Python.ORDER_MEMBER) || '\'\'';

  let code, order;
  switch(operator) {
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

Python.forBlock['text_transform'] = function(block) {
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

Python.forBlock['text_split_join'] = function(block) {
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

Python.forBlock['text_replace'] = function(block) {
    const haystack = Python.valueToCode(block, 'HAYSTACK', Python.ORDER_MEMBER) || '\'\'';
    const needle = Python.valueToCode(block, 'NEEDLE', Python.ORDER_NONE) || '\'\'';
    const replacement = Python.valueToCode(block, 'REPLACEMENT', Python.ORDER_NONE) || '\'\'';
    const count = Python.valueToCode(block, 'COUNT', Python.ORDER_NONE);

    let code;
    // If count is provided and is a valid number, use it. Otherwise, replace all.
    if (count) {
        code = `${haystack}.replace(${needle}, ${replacement}, ${count})`;
    } else {
        code = `${haystack}.replace(${needle}, ${replacement})`;
    }

    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_html_transform'] = function(block) {
    // Requires 'import html'
    Python.definitions_['import_html'] = 'import html';
    const operator = block.getFieldValue('OPERATION');
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || '\'\'';

    const funcName = (operator === 'ESCAPE') ? 'escape' : 'unescape';
    const code = `html.${funcName}(str(${text}))`;

    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_is_empty'] = function(block) {
    const text = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || '\'\'';
    // In Python, an empty string is falsy.
    const code = `not ${text}`;
    return [code, Python.ORDER_LOGICAL_NOT];
};

Python.forBlock['text_print'] = function(block) {
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_ATOMIC) || "''";
  const code = `print(${text})\n`;
  return code;
};

Python.forBlock['text_print_fstring'] = function(block) {
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

Python.forBlock['text_newline'] = function(block) {
    return ["'\\n'", Python.ORDER_ATOMIC];
};

Python.forBlock['text_tab'] = function(block) {
    return ["'\\t'", Python.ORDER_ATOMIC];
};

Python.forBlock['text_print_with_newline'] = function(block) {
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


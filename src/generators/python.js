import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';

import './python/system.js';
import './python/graphics.js';
import './python/pandas.js';
import './python/numpy.js';
import './python/matplotlib.js';
import './python/seaborn.js';
import './python/sklearn.js';
import './python/tensorflow.js';
import './python/torch.js';
import './python/collections.js';
import './python/cv2.js';
import './python/datetime.js';
import './python/itertools.js';
import './python/re.js';
import './python/pillow.js';
import './python/beautifulsoup.js';
import './python/transformers.js';
import './python/requests.js';
import './python/fastapi.js';
import './python/pydantic.js';
import './python/json.js';
import './python/unittest.js';
import './python/logging.js';
import './python/argparse.js';
import './python/sqlalchemy.js';
import './python/itertools.js';
import './python/essentials.js';
import './python/oop.js';
import './python/comprehensions.js';

globalThis.Blockly = Blockly;
const Python = pythonGenerator;
globalThis.Python = Python;

// Custom import handling
pythonGenerator.imports_ = new Set();
pythonGenerator.addImport = function(module) {
  this.imports_.add(module);
};



const originalFinish = pythonGenerator.finish;
pythonGenerator.finish = function(code) {
  const imports = [...this.imports_].map(m => `import ${m}`).join('\n');
  this.imports_.clear(); // Clear for next generation
  const finalCode = originalFinish.call(this, code);
  if (imports) {
    return imports + '\n' + finalCode;
  }
  return finalCode;
};

Python.forBlock['python_text'] = function(block) {
  const text = block.getFieldValue('TEXT');
  return [JSON.stringify(text), Python.ORDER_ATOMIC];
};

Python.forBlock['python_number'] = function(block) {
  const num = block.getFieldValue('NUM');
  return [Number(num), Python.ORDER_ATOMIC];
};

Python.forBlock['python_boolean'] = function(block) {
  const bool = block.getFieldValue('BOOL') === 'TRUE';
  return [bool ? 'True' : 'False', Python.ORDER_ATOMIC];
};

Python.forBlock['python_list'] = function(block) {
  const items = Python.statementToCode(block, 'ITEMS');
  return [`[\\n${items}]`, Python.ORDER_ATOMIC];
};

Python.forBlock['python_dict'] = function(block) {
    const items = Python.statementToCode(block, 'ITEMS');
    return [`{\\n${items}}`, Python.ORDER_ATOMIC];
};

Python.forBlock['python_key_value'] = function(block) {
    const key = block.getFieldValue('KEY');
    const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC);
    return `${JSON.stringify(key)}: ${value},\\n`;
};


Python.forBlock['math_pi'] = function(block) {
  pythonGenerator.addImport('math');
  return ['math.pi', Python.ORDER_MEMBER];
};

Python.forBlock['math_sqrt'] = function(block) {
  pythonGenerator.addImport('math');
  const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
  return [`math.sqrt(${num})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['math_single'] = function(block) {
  const operator = block.getFieldValue('OP');
  const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
  let code;
  switch (operator) {
    case 'ROOT':
      pythonGenerator.addImport('math');
      code = `math.sqrt(${num})`;
      break;
    case 'ABS':
      code = `abs(${num})`;
      break;
    case 'NEG':
      code = `-(${num})`;
      break;
    case 'LN':
      pythonGenerator.addImport('math');
      code = `math.log(${num})`;
      break;
    case 'LOG10':
      pythonGenerator.addImport('math');
      code = `math.log10(${num})`;
      break;
    case 'EXP':
      pythonGenerator.addImport('math');
      code = `math.exp(${num})`;
      break;
    case 'POW10':
      code = `10 ** ${num}`;
      break;
    case 'SIN':
      pythonGenerator.addImport('math');
      code = `math.sin(${num})`;
      break;
    case 'COS':
      pythonGenerator.addImport('math');
      code = `math.cos(${num})`;
      break;
    case 'TAN':
      pythonGenerator.addImport('math');
      code = `math.tan(${num})`;
      break;
    case 'ASIN':
      pythonGenerator.addImport('math');
      code = `math.asin(${num})`;
      break;
    case 'ACOS':
      pythonGenerator.addImport('math');
      code = `math.acos(${num})`;
      break;
    case 'ATAN':
      pythonGenerator.addImport('math');
      code = `math.atan(${num})`;
      break;
    case 'DEGREES':
      pythonGenerator.addImport('math');
      code = `math.degrees(${num})`;
      break;
    case 'RADIANS':
      pythonGenerator.addImport('math');
      code = `math.radians(${num})`;
      break;
    default:
      throw Error('Unknown operator: ' + operator);
  }
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['math_ops_multi'] = function(block) {
  pythonGenerator.addImport('math');
  const op = block.getFieldValue('OP');
  const A = Python.valueToCode(block, 'A', Python.ORDER_NONE) || '0';
  const B = Python.valueToCode(block, 'B', Python.ORDER_NONE) || '0';
  switch(op) {
    case 'sin': return [`math.sin(${A})`, Python.ORDER_FUNCTION_CALL];
    case 'cos': return [`math.cos(${A})`, Python.ORDER_FUNCTION_CALL];
    case 'sqrt': return [`math.sqrt(${A})`, Python.ORDER_FUNCTION_CALL];
    case 'pow': return [`math.pow(${A}, ${B})`, Python.ORDER_FUNCTION_CALL];
  }
  return ['0', Python.ORDER_ATOMIC];
};



// Python.forBlock['essentials_text_literal'] = function(block) {
//   const text = block.getFieldValue('TEXT');
//   return [JSON.stringify(text), Python.ORDER_ATOMIC];
// };

// Python.forBlock['essentials_text_empty'] = function(block) {
//   return ["''", Python.ORDER_ATOMIC];
// };

// Python.forBlock['essentials_text_concat'] = function(block) {
//   const elements = [];
//   for (let i = 0; i < block.itemCount_; i++) {
//     const code = pythonGenerator.valueToCode(block, 'ADD' + i, pythonGenerator.ORDER_NONE) || "''";
//     elements.push(code);
//   }
//   const code = "''.join(str(x) for x in [" + elements.join(', ') + "])";
//   return [code, pythonGenerator.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_format_fstring'] = function(block) {
//   const template = Python.valueToCode(block, 'TEMPLATE', Python.ORDER_NONE) || "''";
//   const variables = Python.valueToCode(block, 'VARS', Python.ORDER_NONE) || '{}';
//   return [`f${template}.format(**${variables})`, Python.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_len'] = function(block) {
//   const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || "''";
//   return [`len(${value})`, Python.ORDER_FUNCTION_CALL];
// };

Python.forBlock['text_ord'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || "''";
  return [`ord(${value})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_format_spec'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const spec = Python.valueToCode(block, 'SPEC', Python.ORDER_NONE) || "''";
  return [`format(${value}, ${spec})`, Python.ORDER_FUNCTION_CALL];
};

// Python.forBlock['essentials_text_slice'] = function(block) {
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
//   const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || 'None';
//   const end = Python.valueToCode(block, 'END', Python.ORDER_NONE) || 'None';
//   return [`${text}[${start}:${end}]`, Python.ORDER_MEMBER];
// };

// Python.forBlock['essentials_text_substr'] = function(block) {
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
//   const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0';
//   const length = Python.valueToCode(block, 'LENGTH', Python.ORDER_NONE) || '0';
//   return [`${text}[${index}:${index} + ${length}]`, Python.ORDER_MEMBER];
// };

// Python.forBlock['essentials_text_index_of'] = function(block) {
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
//   const substring = Python.valueToCode(block, 'SUBSTRING', Python.ORDER_NONE) || "''";
//   return [`${text}.find(${substring})`, Python.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_contains'] = function(block) {
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
//   const substring = Python.valueToCode(block, 'SUBSTRING', Python.ORDER_NONE) || "''";
//   return [`${substring} in ${text}`, Python.ORDER_RELATIONAL];
// };

// Python.forBlock['essentials_text_startswith'] = function(block) {
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
//   const substring = Python.valueToCode(block, 'SUBSTRING', Python.ORDER_NONE) || "''";
//   return [`${text}.startswith(${substring})`, Python.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_endswith'] = function(block) {
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
//   const substring = Python.valueToCode(block, 'SUBSTRING', Python.ORDER_NONE) || "''";
//   return [`${text}.endswith(${substring})`, Python.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_change_case'] = function(block) {
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
//   const caseType = block.getFieldValue('CASE');
//   let methodName;
//   switch (caseType) {
//     case 'UPPERCASE':
//       methodName = 'upper';
//       break;
//     case 'LOWERCASE':
//       methodName = 'lower';
//       break;
//     case 'TITLECASE':
//       methodName = 'title';
//       break;
//   }
//   return [`${text}.${methodName}()`, Python.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_strip'] = function(block) {
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
//   return [`${text}.strip()`, Python.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_split'] = function(block) {
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
//   const separator = Python.valueToCode(block, 'SEPARATOR', Python.ORDER_NONE) || "''";
//   return [`${text}.split(${separator})`, Python.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_join'] = function(block) {
//   const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
//   const separator = Python.valueToCode(block, 'SEPARATOR', Python.ORDER_NONE) || "''";
//   return [`${separator}.join(${list})`, Python.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_replace'] = function(block) {
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
//   const old_ = Python.valueToCode(block, 'OLD', Python.ORDER_NONE) || "''";
//   const new_ = Python.valueToCode(block, 'NEW', Python.ORDER_NONE) || "''";
//   return [`${text}.replace(${old_}, ${new_})`, Python.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_escape_html'] = function(block) {
//   pythonGenerator.addImport('html');
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
//   return [`html.escape(${text})`, Python.ORDER_FUNCTION_CALL];
// };

// Python.forBlock['essentials_text_unescape_html'] = function(block) {
//   pythonGenerator.addImport('html');
//   const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
//   return [`html.unescape(${text})`, Python.ORDER_FUNCTION_CALL];
// };



Python.forBlock['essentials_num_literal'] = function(block) {
  const num = block.getFieldValue('NUM');
  return [Number(num), Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_num_arithmetic'] = function(block) {
  const operator = block.getFieldValue('OP') || 'ADD';

  const OPERATORS = {
    'ADD': [' + ', Python.ORDER_ADDITIVE],
    'MINUS': [' - ', Python.ORDER_SUBTRACTIVE],
    'MULTIPLY': [' * ', Python.ORDER_MULTIPLICATIVE],
    'DIVIDE': [' / ', Python.ORDER_DIVISION],
    'FLOOR_DIVIDE': [' // ', Python.ORDER_DIVISION],
    'MODULO': [' % ', Python.ORDER_MODULUS],
    'POWER': [' ** ', Python.ORDER_EXPONENTIATION],
  };

  const tuple = OPERATORS[operator];
  if (!tuple) {
    console.warn('Unknown operator in essentials_num_arithmetic:', operator);
    return ['0', Python.ORDER_ATOMIC];
  }

  const opToken = tuple[0];
  const order = tuple[1] ?? Python.ORDER_ATOMIC;
  // Ask children for code using the same precedence so Blockly wraps with
  // parentheses whenever needed. This improves BODMAS clarity.
  const A = Python.valueToCode(block, 'A', order) || '0';
  const B = Python.valueToCode(block, 'B', order) || '0';

  const code = `${A}${opToken}${B}`;
  return [code, order];
};

Python.forBlock['essentials_expr_group'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || '0';
  // Always wrap in parentheses; this is explicit grouping requested by the user.
  return [`(${expr})`, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_num_neg'] = function(block) {
  const num = Python.valueToCode(block, 'NUM', Python.ORDER_UNARY_SIGN) || '0';
  return [`-${num}`, Python.ORDER_UNARY_SIGN];
};

Python.forBlock['essentials_num_abs'] = function(block) {
  const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
  return [`abs(${num})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_round'] = function(block) {
  const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
  return [`round(${num})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_clamp'] = function(block) {
  const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
  const min = Python.valueToCode(block, 'MIN', Python.ORDER_NONE) || '0';
  const max = Python.valueToCode(block, 'MAX', Python.ORDER_NONE) || '0';
  return [`max(${min}, min(${num}, ${max}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_compare'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_RELATIONAL) || '0';
  const b = Python.valueToCode(block, 'B', Python.ORDER_RELATIONAL) || '0';
  const op = block.getFieldValue('OP');
  const OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  return [`${a} ${OPERATORS[op]} ${b}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_num_min'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_NONE) || '0';
  const b = Python.valueToCode(block, 'B', Python.ORDER_NONE) || '0';
  return [`min(${a}, ${b})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_max'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_NONE) || '0';
  const b = Python.valueToCode(block, 'B', Python.ORDER_NONE) || '0';
  return [`max(${a}, ${b})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_rand_int'] = function(block) {
  pythonGenerator.addImport('random');
  const a = Python.valueToCode(block, 'A', Python.ORDER_NONE) || '0';
  const b = Python.valueToCode(block, 'B', Python.ORDER_NONE) || '0';
  return [`random.randint(${a}, ${b})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_num_rand_float'] = function(block) {
  pythonGenerator.addImport('random');
  return ['random.random()', Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_create'] = function(block) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    // Support both ITEMi (current block definition) and ADDi (legacy templates)
    let code = Python.valueToCode(block, 'ITEM' + i, Python.ORDER_NONE);
    if (!code) {
      code = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE);
    }
    if (!code) {
      code = 'None';
    }
    elements.push(code);
  }
  const code = '[' + elements.join(', ') + ']';
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_list_from_range'] = function(block) {
  const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || '0';
  const end = Python.valueToCode(block, 'END', Python.ORDER_NONE) || '0';
  const step = Python.valueToCode(block, 'STEP', Python.ORDER_NONE) || '1';
  return [`list(range(${start}, ${end}, ${step}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_range'] = function(block) {
  const mode = block.getFieldValue('MODE') || 'STOP';
  if (mode === 'STOP') {
    const stop = Python.valueToCode(block, 'STOP', Python.ORDER_NONE) || '0';
    return [`range(${stop})`, Python.ORDER_FUNCTION_CALL];
  }
  if (mode === 'START_STOP') {
    const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || '0';
    const stop = Python.valueToCode(block, 'STOP', Python.ORDER_NONE) || '0';
    return [`range(${start}, ${stop})`, Python.ORDER_FUNCTION_CALL];
  }
  // START_STOP_STEP
  const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || '0';
  const stop = Python.valueToCode(block, 'STOP', Python.ORDER_NONE) || '0';
  const step = Python.valueToCode(block, 'STEP', Python.ORDER_NONE) || '1';
  return [`range(${start}, ${stop}, ${step})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_length'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  return [`len(${list})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_get'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0';
  return [`${list}[${index}]`, Python.ORDER_MEMBER];
};

Python.forBlock['essentials_list_set'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  const where = block.getFieldValue('WHERE');
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';

  let code;
  switch (where) {
    case 'FIRST':
      code = `${list}[0] = ${value}`;
      break;
    case 'LAST':
      code = `${list}.append(${value})`;
      break;
    case 'FROM_START':
      index = Python.valueToCode(block, 'AT', Python.ORDER_NONE) || '0';
      // User is 1-based, Python is 0-based.
      if (String(index).match(/^\d+$/)) {
        index = String(parseInt(index, 10) - 1);
      } else {
        index = `${index} - 1`;
      }
      code = `${list}[${index}] = ${value}`;
      break;
    case 'FROM_END':
      index = Python.valueToCode(block, 'AT', Python.ORDER_UNARY_SIGN) || '1';
      index = `len(${list}) - ${index}`;
      code = `${list}[${index}] = ${value}`;
      break;
    case 'RANDOM':
      Python.addImport('random');
      index = `random.randint(0, len(${list}) - 1)`;
      code = `${list}[${index}] = ${value}`;
      break;
    default:
      throw Error('Unhandled option (list_set).');
  }

  return code + '\n';
};

Python.forBlock['essentials_list_statements'] = function(block) {
  const op = block.getFieldValue('OP');
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
  const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0';

  let code;
  switch (op) {
    case 'APPEND':
      code = `${list}.append(${item})`;
      break;
    case 'INSERT':
      code = `${list}.insert(${index}, ${item})\\n`;
      break;
    case 'REMOVE':
      code = `${list}.remove(${item})\\n`;
      break;
    default:
      return '';
  }
  return code;
};

Python.forBlock['essentials_list_expressions'] = function(block) {
  const op = block.getFieldValue('OP');
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0';

  let code;
  switch (op) {
    case 'POP':
      code = [`${list}.pop(${index})`, Python.ORDER_FUNCTION_CALL];
      break;
    default:
      return ['', Python.ORDER_ATOMIC];
  }
  return code;
};

Python.forBlock['essentials_list_index_of'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
  return [`${list}.index(${item})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_slice'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || 'None';
  const end = Python.valueToCode(block, 'END', Python.ORDER_NONE) || 'None';
  return [`${list}[${start}:${end}]`, Python.ORDER_MEMBER];
};

Python.forBlock['essentials_list_sort'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
  const reverse = block.getFieldValue('REVERSE') === 'TRUE';
  return `${list}.sort(key=${key}, reverse=${reverse})\n`;
};

Python.forBlock['essentials_list_reverse'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  return `${list}.reverse()\n`;
};

Python.forBlock['essentials_list_map'] = function(block) {
  const func = Python.valueToCode(block, 'FUNCTION', Python.ORDER_NONE) || 'None';
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  return [`list(map(${func}, ${list}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_filter'] = function(block) {
  const func = Python.valueToCode(block, 'FUNCTION', Python.ORDER_NONE) || 'None';
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  return [`list(filter(${func}, ${list}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_reduce'] = function(block) {
  pythonGenerator.addImport('functools');
  const func = Python.valueToCode(block, 'FUNCTION', Python.ORDER_NONE) || 'None';
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  const initial = Python.valueToCode(block, 'INITIAL', Python.ORDER_NONE) || 'None';
  return [`functools.reduce(${func}, ${list}, ${initial})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_flatten'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  return [`[item for sublist in ${list} for item in sublist]`, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_list_unique'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  return [`list(set(${list}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_list_chunk'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_NONE) || '1';
  return [`[${list}[i:i + ${size}] for i in range(0, len(${list}), ${size})]`, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_list_enumerate'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  return [`list(enumerate(${list}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_tuple_create'] = function(block) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const code = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || 'None';
    elements.push(code);
  }
  if (elements.length === 0) {
    return ['()', Python.ORDER_ATOMIC];
  }
  if (elements.length === 1) {
    return [`(${elements[0]},)`, Python.ORDER_ATOMIC];
  }
  const code = '(' + elements.join(', ') + ')';
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_tuple_from_list'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  return [`tuple(${list})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_registry_create'] = function(block) {
  return ['{}', Python.ORDER_ATOMIC];
};

Python.forBlock['data_structures_registry_register'] = function(block) {
  const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
  const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
  return `${registry}[${key}] = ${fn}\n`;
};

Python.forBlock['data_structures_registry_unregister'] = function(block) {
  const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
  return `del ${registry}[${key}]\n`;
};

Python.forBlock['data_structures_registry_list'] = function(block) {
  const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
  return [`list(${registry}.keys())`, Python.ORDER_FUNCTION_CALL];
};

// --- Control & Computation ---

Python.forBlock['control_match'] = function(block) {
  const subject = Python.valueToCode(block, 'SUBJECT', Python.ORDER_NONE) || 'None';
  const cases = Python.statementToCode(block, 'CASES');
  return `match ${subject}:\n${cases}`;
};

Python.forBlock['control_case'] = function(block) {
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || '_';
  const statements = Python.statementToCode(block, 'DO') || 'pass';
  return `case ${pattern}:\n${pythonGenerator.prefixLines(statements, pythonGenerator.INDENT)}\n`;
};

// Condition Expression: comparisons, membership, identity
Python.forBlock['control_condition_expr'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_RELATIONAL) || 'None';
  const b = Python.valueToCode(block, 'B', Python.ORDER_RELATIONAL) || 'None';
  const op = block.getFieldValue('OP');
  const MAP = {
    'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>=',
    'IN': 'in', 'NOT_IN': 'not in', 'IS': 'is', 'IS_NOT': 'is not'
  };
  const pyOp = MAP[op] || '==';
  return [`${a} ${pyOp} ${b}`, Python.ORDER_RELATIONAL];
};

// Logical Combination: and/or/not with right operand optional for NOT
Python.forBlock['control_logical_combine'] = function(block) {
  const op = block.getFieldValue('LOGICAL_OP');
  const left = Python.valueToCode(block, 'LEFT', op === 'NOT' ? Python.ORDER_LOGICAL_NOT : Python.ORDER_LOGICAL_AND) || 'False';
  if (op === 'NOT') {
    return [`not ${left}`, Python.ORDER_LOGICAL_NOT];
  }
  const right = Python.valueToCode(block, 'RIGHT', op === 'AND' ? Python.ORDER_LOGICAL_AND : Python.ORDER_LOGICAL_OR) || 'False';
  const pyOp = (op === 'AND') ? 'and' : 'or';
  const order = (op === 'AND') ? Python.ORDER_LOGICAL_AND : Python.ORDER_LOGICAL_OR;
  return [`${left} ${pyOp} ${right}`, order];
};

// 4) Truthy/Falsy simplified IF
Python.forBlock['control_if_truthy'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'False';
  const branch = Python.statementToCode(block, 'DO') || '';
  let code = `if ${expr}:\n`;
  code += Python.prefixLines(branch.trim() ? branch : 'pass\n', Python.INDENT);
  return code;
};

Python.forBlock['control_for_indexed'] = function(block) {
  const indexVar = pythonGenerator.getVariableName(block.getFieldValue('INDEX_VAR'));
  const valueVar = pythonGenerator.getVariableName(block.getFieldValue('VALUE_VAR'));
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  const branch = Python.statementToCode(block, 'DO') || 'pass';
  return `for ${indexVar}, ${valueVar} in enumerate(${list}):\n${pythonGenerator.prefixLines(branch, pythonGenerator.INDENT)}\n`;
};

Python.forBlock['control_for_zip'] = function(block) {
  const vars = block.getFieldValue('VARS');
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const code = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || '[]';
    elements.push(code);
  }
  const lists = elements.join(', ');
  const branch = Python.statementToCode(block, 'DO') || 'pass';
  return `for ${vars} in zip(${lists}):\n${pythonGenerator.prefixLines(branch, pythonGenerator.INDENT)}\n`;
};

Python.forBlock['control_lambda_expr'] = function(block) {
  const args = block.getFieldValue('ARGS');
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'None';
  return [`lambda ${args}: ${expr}`, Python.ORDER_LAMBDA];
};

Python.forBlock['control_partial_apply'] = function(block) {
  pythonGenerator.addImport('functools');
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_NONE) || 'None';
  const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
  return [`functools.partial(${func}, *${args})`, Python.ORDER_FUNCTION_CALL];
};

// Robust generator for control_function_def — paste into python.js near other generators
Python.forBlock['control_function_def'] = function(block) {
  // helper: safe getFieldValue that returns null if field doesn't exist
  function fieldVal(name) {
    try { return block.getFieldValue(name); } catch (e) { return null; }
  }

  // simple indent function (4 spaces)
  function indent(text, nSpaces = 4) {
    if (!text) return '';
    const pad = ' '.repeat(nSpaces);
    // ensure we keep trailing newline if present
    return text.split('\n').map(function(line){
      return line.length ? pad + line : line;
    }).join('\n') + (text.endsWith('\n') ? '' : '\n');
  }

  // function name
  const name = fieldVal('NAME') || 'my_function';

  // Collect params from mutator inputs named PARAM0, PARAM1, ...
  const paramsArr = [];
  let i = 0;
  while (true) {
    const inputName = 'PARAM' + i;
    if (!block.getInput(inputName)) break;

    // variable name field (VAR{i}), type field (TYPE{i}), default field (MINUS{i})
    const varName = fieldVal('VAR' + i);
    const typeAnn = fieldVal('TYPE' + i); // optional type annotation
    const minusDefault = fieldVal('MINUS' + i); // default stored as a field (string)
    // default provided by a connected value block (preferred)
    let defaultCode = '';
    try {
      defaultCode = Python.valueToCode(block, inputName, Python.ORDER_NONE) || '';
    } catch (e) {
      // if Python.valueToCode isn't available for some reason, leave defaultCode ''
      defaultCode = '';
    }

    // Use connected value first; if not present, fall back to MINUS field value
    let finalDefault = defaultCode.trim() ? defaultCode.trim() : (minusDefault ? minusDefault : null);

    // Build param text
    // fallback variable name if not provided
    const argName = varName || ('arg' + i);
    let paramText = argName;

    if (typeAnn) paramText += `: ${typeAnn}`;
    if (finalDefault !== null && finalDefault !== undefined) {
      // if default looks like a bare string without quotes, keep as-is (assume user provided proper literal)
      paramText += `=${finalDefault}`;
    }

    paramsArr.push({
      text: paramText,
      rawName: argName
    });
    i++;
  }

  // Support positional-only (/) and keyword-only (*) markers if mutator stored split indices:
  // - POSONLY: index (integer) after which we should insert '/'
  // - KWONLY: index (integer) before which we should insert '*'
  // These fields are optional; if not present, no markers are emitted.
  const posOnlyIndexRaw = fieldVal('POSONLY'); // e.g. "2" means first 2 args are positional-only -> place '/' after index 2
  const kwOnlyIndexRaw = fieldVal('KWONLY');   // e.g. "2" means args from index 2 onwards are keyword-only -> place '*' before index 2

  // convert to integers when possible
  const posOnlyIndex = posOnlyIndexRaw ? parseInt(posOnlyIndexRaw, 10) : null;
  const kwOnlyIndex = kwOnlyIndexRaw ? parseInt(kwOnlyIndexRaw, 10) : null;

  // Build final params string with markers
  const parts = [];
  for (let idx = 0; idx < paramsArr.length; idx++) {
    // insert '*' marker before kwOnlyIndex if kwOnlyIndex equals current index
    if (kwOnlyIndex !== null && idx === kwOnlyIndex) {
      // If '*' would collide with positional-only '/', Python allows "/, *" only in specific orders;
      // here we just insert '*' where requested.
      parts.push('*');
    }

    parts.push(paramsArr[idx].text);

    // insert '/' after posOnlyIndex (posOnlyIndex is count of positional-only args)
    if (posOnlyIndex !== null && idx === (posOnlyIndex - 1)) {
      parts.push('/');
    }
  }

  // Edge cases:
  // - If posOnlyIndex equals number of params, ensure trailing '/' is added.
  if (posOnlyIndex !== null && posOnlyIndex === paramsArr.length) {
    // if not already added
    if (parts[parts.length - 1] !== '/') parts.push('/');
  }

  const paramsCode = parts.length ? parts.join(', ') : '';

  // function body
  let branch = '';
  try {
    branch = Python.statementToCode(block, 'DO') || '';
  } catch (e) {
    branch = '';
  }
  if (!branch.trim()) {
    branch = indent('pass\n');
  } else {
    // ensure branch lines are indented (statementToCode usually returns already-indented code; but re-indent to be safe)
    branch = indent(branch.replace(/\n+$/,'')) ;
  }

  // optional return value input
  let returnExpr = '';
  try {
    returnExpr = Python.valueToCode(block, 'RETURN', Python.ORDER_NONE) || '';
  } catch (e) {
    returnExpr = '';
  }
  let returnLine = '';
  if (returnExpr && returnExpr.trim()) {
    returnLine = indent(`return ${returnExpr.trim()}\n`);
  }

  // assemble function definition
  let code = `def ${name}(${paramsCode}):\n`;
  code += branch;
  if (returnLine) code += returnLine;

  // two newlines to separate functions (match typical generator style)
  return `\n${code}\n`;
};


Python.forBlock['control_function_decorator'] = function(block) {
  const decorator = Python.valueToCode(block, 'DECORATOR', Python.ORDER_NONE) || 'None';
  return `@${decorator}\n`;
};

Python.forBlock['control_function_docstring'] = function(block) {
  const docstring = block.getFieldValue('DOCSTRING');
  return `"""${docstring}"""\n`;
};

Python.forBlock['control_list_comp'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'None';
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  const iter = Python.valueToCode(block, 'ITER', Python.ORDER_NONE) || '[]';
  const cond = Python.valueToCode(block, 'COND', Python.ORDER_NONE) || null;
  let code = `[${expr} for ${varName} in ${iter}`;
  if (cond) {
    code += ` if ${cond}`;
  }
  code += ']';
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['control_dict_comp'] = function(block) {
  const keyExpr = Python.valueToCode(block, 'KEY_EXPR', Python.ORDER_NONE) || 'None';
  const valueExpr = Python.valueToCode(block, 'VALUE_EXPR', Python.ORDER_NONE) || 'None';
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  const iter = Python.valueToCode(block, 'ITER', Python.ORDER_NONE) || '[]';
  const cond = Python.valueToCode(block, 'COND', Python.ORDER_NONE) || null;
  let code = `{${keyExpr}: ${valueExpr} for ${varName} in ${iter}`;
  if (cond) {
    code += ` if ${cond}`;
  }
  code += '}';
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['control_set_comp'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'None';
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  const iter = Python.valueToCode(block, 'ITER', Python.ORDER_NONE) || '[]';
  const cond = Python.valueToCode(block, 'COND', Python.ORDER_NONE) || null;
  let code = `{${expr} for ${varName} in ${iter}`;
  if (cond) {
    code += ` if ${cond}`;
  }
  code += '}';
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['control_gen_expr'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'None';
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  const iter = Python.valueToCode(block, 'ITER', Python.ORDER_NONE) || '[]';
  const cond = Python.valueToCode(block, 'COND', Python.ORDER_NONE) || null;
  let code = `(${expr} for ${varName} in ${iter}`;
  if (cond) {
    code += ` if ${cond}`;
  }
  code += ')';
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['controls_if'] = function(block) {
  let code = '';
  const hasExplicitElse = !!block.getInput('ELSE');

  // Count IFx inputs (IF0 always exists)
  let countIFs = 0;
  while (block.getInput('IF' + countIFs)) countIFs++;

  // if head
  const ifCond = Python.valueToCode(block, 'IF0', Python.ORDER_NONE) || 'False';
  const ifBranch = Python.statementToCode(block, 'DO0') || '';
  code += `if ${ifCond}:\n`;
  code += Python.prefixLines(ifBranch.trim() ? ifBranch : 'pass\n', Python.INDENT);

  // elif chain (IF1..IF{n-1})
  for (let n = 1; n < countIFs; n++) {
    const cond = Python.valueToCode(block, 'IF' + n, Python.ORDER_NONE) || 'False';
    const body = Python.statementToCode(block, 'DO' + n) || '';
    code += `elif ${cond}:\n`;
    code += Python.prefixLines(body.trim() ? body : 'pass\n', Python.INDENT);
  }

  // explicit else only
  if (hasExplicitElse) {
    const elseBranch = Python.statementToCode(block, 'ELSE') || '';
    code += `else:\n`;
    code += Python.prefixLines(elseBranch.trim() ? elseBranch : 'pass\n', Python.INDENT);
  }

  return code;
};

// Reuse the same logic for the project-owned if_block alias.
Python.forBlock['if_block'] = function(block) {
  // Mirror controls_if exactly to keep behavior standardized across projects
  let code = '';
  const hasExplicitElse = !!block.getInput('ELSE');

  let countIFs = 0;
  while (block.getInput('IF' + countIFs)) countIFs++;

  const ifCond = Python.valueToCode(block, 'IF0', Python.ORDER_NONE) || 'False';
  const ifBranch = Python.statementToCode(block, 'DO0') || '';
  code += `if ${ifCond}:\n`;
  code += Python.prefixLines(ifBranch.trim() ? ifBranch : 'pass\n', Python.INDENT);

  for (let n = 1; n < countIFs; n++) {
    const cond = Python.valueToCode(block, 'IF' + n, Python.ORDER_NONE) || 'False';
    const body = Python.statementToCode(block, 'DO' + n) || '';
    code += `elif ${cond}:\n`;
    code += Python.prefixLines(body.trim() ? body : 'pass\n', Python.INDENT);
  }

  if (hasExplicitElse) {
    const elseBranch = Python.statementToCode(block, 'ELSE') || '';
    code += `else:\n`;
    code += Python.prefixLines(elseBranch.trim() ? elseBranch : 'pass\n', Python.INDENT);
  }

  return code;
};

Python.forBlock['control_math_stats'] = function(block) {
  const op = block.getFieldValue('OP');
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';

  switch (op) {
    case 'MAX':
      return [`max(${list})`, Python.ORDER_FUNCTION_CALL];
    case 'MIN':
      return [`min(${list})`, Python.ORDER_FUNCTION_CALL];
    case 'SUM':
      return [`sum(${list})`, Python.ORDER_FUNCTION_CALL];
    case 'MEAN':
    case 'MEDIAN':
    case 'STDDEV':
      pythonGenerator.addImport('statistics');
      let func = '';
      switch (op) {
        case 'MEAN': func = 'mean'; break;
        case 'MEDIAN': func = 'median'; break;
        case 'STDDEV': func = 'stdev'; break;
      }
      return [`statistics.${func}(${list})`, Python.ORDER_FUNCTION_CALL];
  }
};

Python.forBlock['control_decimal_create'] = function(block) {
  pythonGenerator.addImport('from decimal import Decimal');
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || '0';
  return [`Decimal(str(${value}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['control_fraction_create'] = function(block) {
  pythonGenerator.addImport('from fractions import Fraction');
  const num = Python.valueToCode(block, 'NUMERATOR', Python.ORDER_NONE) || '0';
  const den = Python.valueToCode(block, 'DENOMINATOR', Python.ORDER_NONE) || '1';
  return [`Fraction(${num}, ${den})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['control_complex_create'] = function(block) {
  const real = Python.valueToCode(block, 'REAL', Python.ORDER_NONE) || '0';
  const imag = Python.valueToCode(block, 'IMAG', Python.ORDER_NONE) || '0';
  return [`complex(${real}, ${imag})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['control_accumulate'] = function(block) {
  pythonGenerator.addImport('from itertools import accumulate');
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_NONE) || 'None';
  return [`list(accumulate(${iterable}, func=${func}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['control_try_except'] = function(block) {
  const tryBlock = Python.statementToCode(block, 'TRY') || 'pass';
  let code = `try:\n${pythonGenerator.prefixLines(tryBlock, pythonGenerator.INDENT)}\n`;
  const exceptCount = block.exceptCount_ || 0;
  for (let i = 0; i < exceptCount; i++) {
    const exception = block.getFieldValue('EXCEPTION' + i) || 'Exception';
    const varField = block.getField('VAR' + i);
    const varName = varField ? pythonGenerator.getVariableName(varField.getValue()) : 'e';
    const catchBlock = Python.statementToCode(block, 'EXCEPT' + i) || 'pass';
    code += `except ${exception} as ${varName}:\n${pythonGenerator.prefixLines(catchBlock, pythonGenerator.INDENT)}\n`;
  }
  return code;
};

Python.forBlock['control_try_except_finally'] = function(block) {
  const tryBlock = Python.statementToCode(block, 'TRY') || 'pass';
  const exception = Python.valueToCode(block, 'EXCEPTION', Python.ORDER_NONE) || 'Exception';
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  const catchBlock = Python.statementToCode(block, 'CATCH') || 'pass';
  const finallyBlock = Python.statementToCode(block, 'FINALLY') || 'pass';
  return `try:\n${pythonGenerator.prefixLines(tryBlock, pythonGenerator.INDENT)}\nexcept ${exception} as ${varName}:\n${pythonGenerator.prefixLines(catchBlock, pythonGenerator.INDENT)}\nfinally:\n${pythonGenerator.prefixLines(finallyBlock, pythonGenerator.INDENT)}\n`;
};

Python.forBlock['control_try_except_else_finally'] = function(block) {
  const tryBlock = Python.statementToCode(block, 'TRY') || 'pass';
  const exception = Python.valueToCode(block, 'EXCEPTION', Python.ORDER_NONE) || 'Exception';
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  const catchBlock = Python.statementToCode(block, 'CATCH') || 'pass';
  const elseBlock = Python.statementToCode(block, 'ELSE') || '';
  const finallyBlock = Python.statementToCode(block, 'FINALLY') || '';
  let code = `try:\n${pythonGenerator.prefixLines(tryBlock, pythonGenerator.INDENT)}\n`;
  code += `except ${exception} as ${varName}:\n${pythonGenerator.prefixLines(catchBlock, pythonGenerator.INDENT)}\n`;
  if (elseBlock) {
    code += `else:\n${pythonGenerator.prefixLines(elseBlock, pythonGenerator.INDENT)}\n`;
  }
  if (finallyBlock) {
    code += `finally:\n${pythonGenerator.prefixLines(finallyBlock, pythonGenerator.INDENT)}\n`;
  }
  return code;
};

Python.forBlock['control_raise_exception'] = function(block) {
  const exception = Python.valueToCode(block, 'EXCEPTION', Python.ORDER_NONE) || 'Exception';
  const message = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || '';
  return `raise ${exception}(${message})\n`;
};

Python.forBlock['control_assert_block'] = function(block) {
  const condition = Python.valueToCode(block, 'CONDITION', Python.ORDER_NONE) || 'False';
  const message = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || '';
  return `assert ${condition}, ${message}\n`;
};

Python.forBlock['control_flow_break_continue'] = function(block) {
  const flow = block.getFieldValue('FLOW') || 'BREAK';
  return (flow === 'BREAK' ? 'break' : 'continue') + '\n';
};

// --- Text & Localization ---

Python.forBlock['text_normalize_unicode'] = function(block) {
  pythonGenerator.addImport('unicodedata');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const form = block.getFieldValue('FORM');
  return [`unicodedata.normalize('${form}', ${text})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_remove_accents'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.remove_accents(${text})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_slugify'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.slugify(${text})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_fix_encoding'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.fix_encoding(${text})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_re_search'] = function(block) {
  pythonGenerator.addImport('re');
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const flags = Python.valueToCode(block, 'FLAGS', Python.ORDER_NONE) || '0';
  return [`re.search(${pattern}, ${text}, flags=${flags})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_re_match'] = function(block) {
  pythonGenerator.addImport('re');
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const flags = Python.valueToCode(block, 'FLAGS', Python.ORDER_NONE) || '0';
  return [`re.match(${pattern}, ${text}, flags=${flags})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_re_findall'] = function(block) {
  pythonGenerator.addImport('re');
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const flags = Python.valueToCode(block, 'FLAGS', Python.ORDER_NONE) || '0';
  return [`re.findall(${pattern}, ${text}, flags=${flags})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_re_replace'] = function(block) {
  pythonGenerator.addImport('re');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const repl = Python.valueToCode(block, 'REPL', Python.ORDER_NONE) || "''";
  const flags = Python.valueToCode(block, 'FLAGS', Python.ORDER_NONE) || '0';
  return [`re.sub(${pattern}, ${repl}, ${text}, flags=${flags})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_re_split'] = function(block) {
  pythonGenerator.addImport('re');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const flags = Python.valueToCode(block, 'FLAGS', Python.ORDER_NONE) || '0';
  return [`re.split(${pattern}, ${text}, flags=${flags})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_regex_flags'] = function(block) {
  pythonGenerator.addImport('re');
  const flag = block.getFieldValue('FLAG');
  return [flag, Python.ORDER_MEMBER];
};

Python.forBlock['text_template_render_jinja'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const template = Python.valueToCode(block, 'TEMPLATE', Python.ORDER_NONE) || "''";
  const context = Python.valueToCode(block, 'CONTEXT', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.render_jinja(${template}, ${context})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_template_safe_render'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const template = Python.valueToCode(block, 'TEMPLATE', Python.ORDER_NONE) || "''";
  const context = Python.valueToCode(block, 'CONTEXT', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.render_safe_template(${template}, ${context})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_i18n_register'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const lang = block.getFieldValue('LANG');
  const mapping = Python.valueToCode(block, 'MAPPING', Python.ORDER_NONE) || '{}';
  return `blocks_runtime.register_translation('${lang}', ${mapping})\n`;
};

Python.forBlock['text_i18n_translate'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
  const lang = Python.valueToCode(block, 'LANG', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.translate(${key}, ${lang})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_i18n_plural'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
  const n = Python.valueToCode(block, 'N', Python.ORDER_NONE) || 0;
  const lang = Python.valueToCode(block, 'LANG', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.pluralize(${key}, ${n}, ${lang})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_i18n_set_locale'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const lang = Python.valueToCode(block, 'LANG', Python.ORDER_NONE) || "''";
  return `blocks_runtime.set_locale(${lang})\n`;
};

Python.forBlock['text_i18n_get_locale'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  return [`blocks_runtime.get_locale()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_alt_text_generate'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const metadata = Python.valueToCode(block, 'METADATA', Python.ORDER_NONE) || '{}';
  const lang = Python.valueToCode(block, 'LANG', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.generate_alt_text(${metadata}, ${lang})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_to_lines'] = function(block) {
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
  return [`${text}.splitlines()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_indent'] = function(block) {
  pythonGenerator.addImport('textwrap');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const prefix = Python.valueToCode(block, 'PREFIX', Python.ORDER_NONE) || "'    '";
  return [`textwrap.indent(${text}, ${prefix})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_unindent'] = function(block) {
  pythonGenerator.addImport('textwrap');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  return [`textwrap.dedent(${text})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_preview'] = function(block) {
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
  const limit = Python.valueToCode(block, 'LIMIT', Python.ORDER_NONE) || '100';
  return [`${text}[:${limit}] + ('...' if len(${text}) > ${limit} else '')`, Python.ORDER_ADDITIVE];
};

// --- I/O & Formats ---

Python.forBlock['io_fs_open'] = function(block) {
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  const mode = Python.valueToCode(block, 'MODE', Python.ORDER_NONE) || "'r'";
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  const branch = Python.statementToCode(block, 'DO') || '  pass';
  return `with open(${path}, ${mode}) as ${varName}:\n${branch}`;
};

Python.forBlock['io_fs_file_mode'] = function(block) {
  const mode = block.getFieldValue('MODE');
  return [mode, Python.ORDER_ATOMIC];
};

Python.forBlock['io_fs_read_lines'] = function(block) {
  const file = Python.valueToCode(block, 'FILE', Python.ORDER_MEMBER) || 'None';
  return [`${file}.readlines()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_write_lines'] = function(block) {
  const file = Python.valueToCode(block, 'FILE', Python.ORDER_MEMBER) || 'None';
  const lines = Python.valueToCode(block, 'LINES', Python.ORDER_NONE) || '[]';
  return `${file}.writelines(${lines})\n`;
};

Python.forBlock['io_fs_read'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.read_file(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_write'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  const content = Python.valueToCode(block, 'CONTENT', Python.ORDER_NONE) || "''";
  return `blocks_runtime.write_file(${path}, ${content})\n`;
};

Python.forBlock['io_fs_append'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  const content = Python.valueToCode(block, 'CONTENT', Python.ORDER_NONE) || "''";
  return `blocks_runtime.append_file(${path}, ${content})\n`;
};

Python.forBlock['io_fs_delete'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return `blocks_runtime.delete_file(${path})\n`;
};

Python.forBlock['io_fs_exists'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.file_exists(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_listdir'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.list_dir(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_mkdir'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return `blocks_runtime.mkdir(${path})\n`;
};

Python.forBlock['io_fs_tempfile'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  return [`blocks_runtime.temp_file()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_fs_copy'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const src = Python.valueToCode(block, 'SRC', Python.ORDER_NONE) || "''";
  const dst = Python.valueToCode(block, 'DST', Python.ORDER_NONE) || "''";
  return `blocks_runtime.copy_file(${src}, ${dst})\n`;
};

Python.forBlock['io_json_load'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const source = Python.valueToCode(block, 'SOURCE', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.load_json(${source})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_json_dump'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const obj = Python.valueToCode(block, 'OBJECT', Python.ORDER_NONE) || '{}';
  const dest = Python.valueToCode(block, 'DEST', Python.ORDER_NONE) || 'None';
  const indent = Python.valueToCode(block, 'INDENT', Python.ORDER_NONE) || 'None';
  const sort_keys = Python.valueToCode(block, 'SORT_KEYS', Python.ORDER_NONE) || 'False';
  return `blocks_runtime.dump_json(${obj}, ${dest}, indent=${indent}, sort_keys=${sort_keys})\n`;
};

Python.forBlock['io_csv_read'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  const delimiter = Python.valueToCode(block, 'DELIMITER', Python.ORDER_NONE) || "','";
  return [`blocks_runtime.read_csv(${path}, delimiter=${delimiter})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_csv_write'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const rows = Python.valueToCode(block, 'ROWS', Python.ORDER_NONE) || '[]';
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  const delimiter = Python.valueToCode(block, 'DELIMITER', Python.ORDER_NONE) || "','";
  return `blocks_runtime.write_csv(${path}, ${rows}, delimiter=${delimiter})\n`;
};

Python.forBlock['io_yaml_load'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const source = Python.valueToCode(block, 'SOURCE', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.load_yaml(${source})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_yaml_dump'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const obj = Python.valueToCode(block, 'OBJECT', Python.ORDER_NONE) || '{}';
  const dest = Python.valueToCode(block, 'DEST', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.dump_yaml(${obj}, ${dest})\n`;
};

Python.forBlock['io_bytes_from_text'] = function(block) {
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
  const encoding = block.getFieldValue('ENCODING');
  return [`${text}.encode('${encoding}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_text_from_bytes'] = function(block) {
  const bytes = Python.valueToCode(block, 'BYTES', Python.ORDER_MEMBER) || "b''";
  const encoding = block.getFieldValue('ENCODING');
  return [`${bytes}.decode('${encoding}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_stream_read_chunk'] = function(block) {
  const stream = Python.valueToCode(block, 'STREAM', Python.ORDER_MEMBER) || 'None';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_NONE) || '1024';
  return [`${stream}.read(${size})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_stream_write_chunk'] = function(block) {
  const stream = Python.valueToCode(block, 'STREAM', Python.ORDER_MEMBER) || 'None';
  const chunk = Python.valueToCode(block, 'CHUNK', Python.ORDER_NONE) || "b''";
  return `${stream}.write(${chunk})\n`;
};

Python.forBlock['io_serialize_json_safe'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const obj = Python.valueToCode(block, 'OBJECT', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.to_json(${obj})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_deserialize_json_safe'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const json = Python.valueToCode(block, 'JSON', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.from_json(${json})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['io_serialize_msgpack'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const obj = Python.valueToCode(block, 'OBJECT', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.serialize_msgpack(${obj})`, Python.ORDER_FUNCTION_CALL];
};

// --- Integration & Networking ---

Python.forBlock['net_http_get'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || 'None';
  const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.http_get(${url}, params=${params}, headers=${headers})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_http_post'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_NONE) || 'None';
  const body = Python.valueToCode(block, 'BODY', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.http_post(${url}, headers=${headers}, data=${body})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_http_json_get'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.http_get_json(${url})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_http_json_post'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.http_post_json(${url}, json=${data})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_http_download_file'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return `blocks_runtime.http_download_file(${url}, ${path})\n`;
};

Python.forBlock['net_http_with_retry'] = function(block) {
  return '# http_with_retry block is not fully implemented yet.\n';
};

Python.forBlock['net_http_rate_limit'] = function(block) {
  return '# http_rate_limit block is not fully implemented yet.\n';
};

Python.forBlock['net_ws_connect'] = function(block) {
  pythonGenerator.addImport('websockets');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  return `${varName} = await websockets.connect(${url})\n`;
};

Python.forBlock['net_ws_send'] = function(block) {
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const msg = Python.valueToCode(block, 'MSG', Python.ORDER_NONE) || "''";
  return `await ${conn}.send(${msg})\n`;
};

Python.forBlock['net_ws_receive'] = function(block) {
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  return `${varName} = await ${conn}.recv()\n`;
};

Python.forBlock['net_ws_close'] = function(block) {
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  return `await ${conn}.close()\n`;
};

Python.forBlock['net_pubsub_publish'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const channel = Python.valueToCode(block, 'CHANNEL', Python.ORDER_NONE) || "''";
  const message = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || "''";
  return `blocks_runtime.pubsub_publish(${channel}, ${message})\n`;
};

Python.forBlock['net_pubsub_subscribe'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const channel = Python.valueToCode(block, 'CHANNEL', Python.ORDER_NONE) || "''";
  const callback = Python.valueToCode(block, 'CALLBACK', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.pubsub_subscribe(${channel}, ${callback})\n`;
};

Python.forBlock['net_pubsub_unsubscribe'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const channel = Python.valueToCode(block, 'CHANNEL', Python.ORDER_NONE) || "''";
  return `blocks_runtime.pubsub_unsubscribe(${channel})\n`;
};

Python.forBlock['net_socket_connect'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const host = Python.valueToCode(block, 'HOST', Python.ORDER_NONE) || "''";
  const port = Python.valueToCode(block, 'PORT', Python.ORDER_NONE) || '0';
  return [`blocks_runtime.socket_connect(${host}, ${port})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_socket_send'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || "b''";
  return `blocks_runtime.socket_send(${conn}, ${data})\n`;
};

Python.forBlock['net_socket_receive'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const max_bytes = Python.valueToCode(block, 'MAX_BYTES', Python.ORDER_NONE) || '1024';
  return [`blocks_runtime.socket_receive(${conn}, ${max_bytes})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_socket_close'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.socket_close(${conn})\n`;
};

Python.forBlock['net_http_auth_basic'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const user = Python.valueToCode(block, 'USER', Python.ORDER_NONE) || "''";
  const pass = Python.valueToCode(block, 'PASS', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.http_auth_basic(${user}, ${pass})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_http_auth_bearer'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const token = Python.valueToCode(block, 'TOKEN', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.http_auth_bearer(${token})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_request_sign'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.request_sign(${key}, ${data})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['net_multipart_upload'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const files = Python.valueToCode(block, 'FILES', Python.ORDER_NONE) || '{}';
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.multipart_upload(${files}, ${data})`, Python.ORDER_FUNCTION_CALL];
};

// --- Storage & Persistence ---

Python.forBlock['storage_db_connect_sqlite'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "':memory:'";
  return [`blocks_runtime.db_connect_sqlite(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_db_query'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const sql = Python.valueToCode(block, 'SQL', Python.ORDER_NONE) || "''";
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || '[]';
  return [`blocks_runtime.db_query(${conn}, ${sql}, ${params})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_db_select'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const table = Python.valueToCode(block, 'TABLE', Python.ORDER_NONE) || "''";
  const where = Python.valueToCode(block, 'WHERE', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.db_select(${conn}, ${table}, where=${where})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_db_insert'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const table = Python.valueToCode(block, 'TABLE', Python.ORDER_NONE) || "''";
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
  return `blocks_runtime.db_insert(${conn}, ${table}, ${data})\n`;
};

Python.forBlock['storage_db_update'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const table = Python.valueToCode(block, 'TABLE', Python.ORDER_NONE) || "''";
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
  const where = Python.valueToCode(block, 'WHERE', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.db_update(${conn}, ${table}, ${data}, where=${where})\n`;
};

Python.forBlock['storage_db_transaction'] = function(block) {
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const branch = Python.statementToCode(block, 'DO') || 'pass';
  return `with ${conn}:\n${pythonGenerator.prefixLines(branch, pythonGenerator.INDENT)}\n`;
};

Python.forBlock['storage_cache_set'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const ttl = Python.valueToCode(block, 'TTL', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.cache_set(${key}, ${value}, ${ttl})\n`;
};

Python.forBlock['storage_cache_get'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.cache_get(${key})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_cache_delete'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
  return `blocks_runtime.cache_delete(${key})\n`;
};

Python.forBlock['storage_cache_incr'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
  const by = Python.valueToCode(block, 'BY', Python.ORDER_NONE) || '1';
  return [`blocks_runtime.cache_incr(${key}, ${by})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_orm_model_define'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const name = block.getFieldValue('NAME');
  const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.orm_model_define('${name}', ${fields})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_orm_create'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const session = Python.valueToCode(block, 'SESSION', Python.ORDER_NONE) || 'None';
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || 'None';
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
  return `blocks_runtime.orm_create(${session}, ${model}, ${data})\n`;
};

Python.forBlock['storage_orm_query'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const session = Python.valueToCode(block, 'SESSION', Python.ORDER_NONE) || 'None';
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || 'None';
  const filters = Python.valueToCode(block, 'FILTERS', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.orm_query(${session}, ${model}, ${filters})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['storage_migrate_schema'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const adapter = Python.valueToCode(block, 'ADAPTER', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.migrate_schema(${adapter})\n`;
};

Python.forBlock['storage_backup_db'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return `blocks_runtime.backup_db(${path})\n`;
};

Python.forBlock['storage_restore_db'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return `blocks_runtime.restore_db(${path})\n`;
};

// --- Concurrency & Async ---

Python.forBlock['concurrency_thread_start'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
  const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
  return [`blocks_runtime.thread_start(${fn}, ${args})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_thread_join'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const handle = Python.valueToCode(block, 'HANDLE', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.thread_join(${handle})\n`;
};

Python.forBlock['concurrency_thread_pool_submit'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
  const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
  return [`blocks_runtime.submit_task(${fn}, *${args})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_future_result'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const handle = Python.valueToCode(block, 'HANDLE', Python.ORDER_NONE) || 'None';
  const timeout = Python.valueToCode(block, 'TIMEOUT', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.get_future_result(${handle}, timeout=${timeout})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_thread_lock_acquire'] = function(block) {
  const lock = Python.valueToCode(block, 'LOCK', Python.ORDER_MEMBER) || 'None';
  return `${lock}.acquire()\n`;
};

Python.forBlock['concurrency_thread_lock_release'] = function(block) {
  const lock = Python.valueToCode(block, 'LOCK', Python.ORDER_MEMBER) || 'None';
  return `${lock}.release()\n`;
};

Python.forBlock['concurrency_async_def'] = function(block) {
  // Add mutator for params later
  const name = block.getFieldValue('NAME');
  const branch = Python.statementToCode(block, 'DO') || '  pass';
  return `async def ${name}():\n${branch}\n`;
};

Python.forBlock['concurrency_await_block'] = function(block) {
  const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || 'None';
  return [`await ${expr}`, Python.ORDER_AWAIT];
};

Python.forBlock['concurrency_async_sleep'] = function(block) {
  pythonGenerator.addImport('asyncio');
  const seconds = Python.valueToCode(block, 'SECONDS', Python.ORDER_NONE) || '0';
  return `await asyncio.sleep(${seconds})\n`;
};

Python.forBlock['concurrency_async_gather'] = function(block) {
  pythonGenerator.addImport('asyncio');
  const tasks = Python.valueToCode(block, 'TASKS', Python.ORDER_NONE) || '[]';
  return [`await asyncio.gather(*${tasks})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_async_http_get'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  return [`await blocks_runtime.async_http_get(${url})`, Python.ORDER_AWAIT];
};

Python.forBlock['concurrency_queue_put'] = function(block) {
  const queue = Python.valueToCode(block, 'QUEUE', Python.ORDER_MEMBER) || 'None';
  const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
  return `${queue}.put(${item})\n`;
};

Python.forBlock['concurrency_queue_get'] = function(block) {
  const queue = Python.valueToCode(block, 'QUEUE', Python.ORDER_MEMBER) || 'None';
  const timeout = Python.valueToCode(block, 'TIMEOUT', Python.ORDER_NONE) || 'None';
  return [`${queue}.get(timeout=${timeout})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_event_wait_set_clear'] = function(block) {
  const action = block.getFieldValue('ACTION');
  const event = Python.valueToCode(block, 'EVENT', Python.ORDER_MEMBER) || 'None';
  let code = '';
  if (action === 'WAIT') {
    code = `${event}.wait()`;
  } else if (action === 'SET') {
    code = `${event}.set()`;
  } else if (action === 'CLEAR') {
    code = `${event}.clear()`;
  }
  return code + '\n';
};

Python.forBlock['concurrency_schedule_every'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
  const interval = Python.valueToCode(block, 'INTERVAL', Python.ORDER_NONE) || '1';
  return `blocks_runtime.schedule_every(${interval}, ${fn})\n`;
};

Python.forBlock['concurrency_schedule_once'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
  const delay = Python.valueToCode(block, 'DELAY', Python.ORDER_NONE) || '1';
  return `blocks_runtime.schedule_once(${delay}, ${fn})\n`;
};

// --- Automation & DevOps ---

Python.forBlock['automation_cmd_run_safe'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const cmd_key = Python.valueToCode(block, 'CMD_KEY', Python.ORDER_NONE) || "''";
  const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
  return `blocks_runtime.cmd_run_safe(${cmd_key}, ${args})\n`;
};

Python.forBlock['automation_cmd_user_confirm'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const message = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.cmd_user_confirm(${message})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_cmd_capture_output'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const cmd_key = Python.valueToCode(block, 'CMD_KEY', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.cmd_capture_output(${cmd_key})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_ssh_connect'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const host_ref = Python.valueToCode(block, 'HOST_REF', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.ssh_connect(${host_ref})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_ssh_run'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const cmd = Python.valueToCode(block, 'CMD', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.ssh_run(${conn}, ${cmd})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_scp_upload'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const src = Python.valueToCode(block, 'SRC', Python.ORDER_NONE) || "''";
  const dst = Python.valueToCode(block, 'DST', Python.ORDER_NONE) || "''";
  return `blocks_runtime.scp_upload(${conn}, ${src}, ${dst})\n`;
};

Python.forBlock['automation_scp_download'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const src = Python.valueToCode(block, 'SRC', Python.ORDER_NONE) || "''";
  const dst = Python.valueToCode(block, 'DST', Python.ORDER_NONE) || "''";
  return `blocks_runtime.scp_download(${conn}, ${src}, ${dst})\n`;
};

Python.forBlock['automation_docker_run'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const image = Python.valueToCode(block, 'IMAGE', Python.ORDER_NONE) || "''";
  const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
  return [`blocks_runtime.docker_run(${image}, ${args})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_terraform_apply'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const plan_ref = Python.valueToCode(block, 'PLAN_REF', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.terraform_apply(${plan_ref})\n`;
};

Python.forBlock['automation_ansible_run'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const playbook_ref = Python.valueToCode(block, 'PLAYBOOK_REF', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.ansible_run(${playbook_ref})\n`;
};

// --- Data Science & ML ---

Python.forBlock['datasci_df_load_csv'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.df_load_csv(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_head'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const n = Python.valueToCode(block, 'N', Python.ORDER_NONE) || '5';
  const df = Python.valueToCode(block, 'DF', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.df_head(${df}, ${n})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_filter'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_NONE) || 'None';
  const condition = Python.valueToCode(block, 'CONDITION', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.df_filter(${df}, ${condition})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_groupby_agg'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_NONE) || 'None';
  const cols = Python.valueToCode(block, 'COLS', Python.ORDER_NONE) || '[]';
  const ops = Python.valueToCode(block, 'OPS', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.df_groupby_agg(${df}, ${cols}, ${ops})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_merge'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const df1 = Python.valueToCode(block, 'DF1', Python.ORDER_NONE) || 'None';
  const df2 = Python.valueToCode(block, 'DF2', Python.ORDER_NONE) || 'None';
  const on = Python.valueToCode(block, 'ON', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.df_merge(${df1}, ${df2}, on=${on})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_to_dict_list'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_NONE) || 'None';
  const format = block.getFieldValue('FORMAT');
  return [`blocks_runtime.df_to_dict_list(${df}, '${format}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_df_apply'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const df = Python.valueToCode(block, 'DF', Python.ORDER_NONE) || 'None';
  const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.df_apply(${df}, ${fn})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_create_from_list'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  return [`blocks_runtime.array_create_from_list(${list})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_shape'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.array_shape(${array})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_reshape'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_NONE) || 'None';
  const shape = Python.valueToCode(block, 'SHAPE', Python.ORDER_NONE) || '()';
  return [`blocks_runtime.array_reshape(${array}, ${shape})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_sum'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.array_sum(${array})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_mean'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.array_mean(${array})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_slice'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const array = Python.valueToCode(block, 'ARRAY', Python.ORDER_NONE) || 'None';
  const indices = Python.valueToCode(block, 'INDICES', Python.ORDER_NONE) || '()';
  return [`blocks_runtime.array_slice(${array}, ${indices})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_array_dot'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const array1 = Python.valueToCode(block, 'ARRAY1', Python.ORDER_NONE) || 'None';
  const array2 = Python.valueToCode(block, 'ARRAY2', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.array_dot(${array1}, ${array2})`, Python.ORDER_FUNCTION_CALL];
};

// --- Media & Perception ---

Python.forBlock['media_img_load'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.img_load(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_resize'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const img = Python.valueToCode(block, 'IMG', Python.ORDER_NONE) || 'None';
  const width = Python.valueToCode(block, 'WIDTH', Python.ORDER_NONE) || '0';
  const height = Python.valueToCode(block, 'HEIGHT', Python.ORDER_NONE) || '0';
  return [`blocks_runtime.img_resize(${img}, (${width}, ${height}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_crop'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const img = Python.valueToCode(block, 'IMG', Python.ORDER_NONE) || 'None';
  const box = Python.valueToCode(block, 'BOX', Python.ORDER_NONE) || '()';
  return [`blocks_runtime.img_crop(${img}, ${box})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_save'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const img = Python.valueToCode(block, 'IMG', Python.ORDER_NONE) || 'None';
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return `blocks_runtime.img_save(${img}, ${path})\n`;
};

Python.forBlock['media_img_to_bytes'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const img = Python.valueToCode(block, 'IMG', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.img_to_bytes(${img})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_thumbnail'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const img = Python.valueToCode(block, 'IMG', Python.ORDER_NONE) || 'None';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_NONE) || '()';
  return [`blocks_runtime.img_thumbnail(${img}, ${size})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_convert_format'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const img = Python.valueToCode(block, 'IMG', Python.ORDER_NONE) || 'None';
  const format = block.getFieldValue('FORMAT');
  return [`blocks_runtime.img_convert_format(${img}, '${format}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_audio_load'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.audio_load(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_audio_trim'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const audio = Python.valueToCode(block, 'AUDIO', Python.ORDER_NONE) || 'None';
  const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || '0';
  const end = Python.valueToCode(block, 'END', Python.ORDER_NONE) || '0';
  return [`blocks_runtime.audio_trim(${audio}, ${start}, ${end})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_audio_save'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const audio = Python.valueToCode(block, 'AUDIO', Python.ORDER_NONE) || 'None';
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return `blocks_runtime.audio_save(${audio}, ${path})\n`;
};

Python.forBlock['media_video_load'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.video_load(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_video_extract_frames'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const video = Python.valueToCode(block, 'VIDEO', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.video_extract_frames(${video})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_detect_edges'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const img = Python.valueToCode(block, 'IMG', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.img_detect_edges(${img})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_img_to_gray'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const img = Python.valueToCode(block, 'IMG', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.img_to_gray(${img})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_ocr_extract_text'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const img = Python.valueToCode(block, 'IMAGE', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.ocr_extract_text(${img})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_face_detect'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const img = Python.valueToCode(block, 'IMAGE', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.face_detect(${img})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_nlp_tokenize'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.nlp_tokenize(${text})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_nlp_sentences'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.nlp_sentences(${text})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_nlp_pos_tag'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const tokens = Python.valueToCode(block, 'TOKENS', Python.ORDER_NONE) || '[]';
  return [`blocks_runtime.nlp_pos_tag(${tokens})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['media_nlp_lemmatize'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const token = Python.valueToCode(block, 'TOKEN', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.nlp_lemmatize(${token})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_model_define'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const type = block.getFieldValue('TYPE');
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.model_define('${type}', ${params})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_model_train'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || 'None';
  const x = Python.valueToCode(block, 'X', Python.ORDER_NONE) || 'None';
  const y = Python.valueToCode(block, 'Y', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.model_train(${model}, ${x}, ${y})\n`;
};

Python.forBlock['datasci_model_predict'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || 'None';
  const x = Python.valueToCode(block, 'X', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.model_predict(${model}, ${x})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_model_save'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || 'None';
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return `blocks_runtime.model_save(${model}, ${path})\n`;
};

Python.forBlock['datasci_model_load'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.model_load(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_model_eval'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const metrics = Python.valueToCode(block, 'METRICS', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.model_eval(${metrics})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['datasci_plot_line'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const x = Python.valueToCode(block, 'X', Python.ORDER_NONE) || '[]';
  const y = Python.valueToCode(block, 'Y', Python.ORDER_NONE) || '[]';
  return `blocks_runtime.plot_line(${x}, ${y})\n`;
};

Python.forBlock['datasci_plot_hist'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const values = Python.valueToCode(block, 'VALUES', Python.ORDER_NONE) || '[]';
  return `blocks_runtime.plot_hist(${values})\n`;
};

Python.forBlock['datasci_plot_scatter'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const x = Python.valueToCode(block, 'X', Python.ORDER_NONE) || '[]';
  const y = Python.valueToCode(block, 'Y', Python.ORDER_NONE) || '[]';
  return `blocks_runtime.plot_scatter(${x}, ${y})\n`;
};

// --- Security & Keys ---

Python.forBlock['security_hash_sha256'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || "b''";
  return [`blocks_runtime.hash_sha256(${data})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_hmac_sha256'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || "b''";
  return [`blocks_runtime.hmac_sha256(${key}, ${data})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_generate_random_bytes'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const n = Python.valueToCode(block, 'N', Python.ORDER_NONE) || '16';
  return [`blocks_runtime.generate_random_bytes(${n})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_secrets_store_save'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key_name = Python.valueToCode(block, 'KEY_NAME', Python.ORDER_NONE) || "''";
  const secret_ref = Python.valueToCode(block, 'SECRET_REF', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.secrets_store_save(${key_name}, ${secret_ref})\n`;
};

Python.forBlock['security_secrets_get_ref'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key_name = Python.valueToCode(block, 'KEY_NAME', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.secrets_get_ref(${key_name})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_jwt_encode'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const payload = Python.valueToCode(block, 'PAYLOAD', Python.ORDER_NONE) || '{}';
  const key_ref = Python.valueToCode(block, 'KEY_REF', Python.ORDER_NONE) || 'None';
  const alg = block.getFieldValue('ALG');
  return [`blocks_runtime.jwt_encode(${payload}, ${key_ref}, '${alg}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_jwt_decode'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const token = Python.valueToCode(block, 'TOKEN', Python.ORDER_NONE) || "''";
  const key_ref = Python.valueToCode(block, 'KEY_REF', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.jwt_decode(${token}, ${key_ref})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_encrypt_sym'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const plaintext = Python.valueToCode(block, 'PLAINTEXT', Python.ORDER_NONE) || "b''";
  const key_ref = Python.valueToCode(block, 'KEY_REF', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.encrypt_sym(${plaintext}, ${key_ref})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['security_decrypt_sym'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const ciphertext = Python.valueToCode(block, 'CIPHERTEXT', Python.ORDER_NONE) || "b''";
  const key_ref = Python.valueToCode(block, 'KEY_REF', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.decrypt_sym(${ciphertext}, ${key_ref})`, Python.ORDER_FUNCTION_CALL];
};

// --- Tools/Testing ---

Python.forBlock['tools_test_define_case'] = function(block) {
  const name = block.getFieldValue('NAME');
  const branch = Python.statementToCode(block, 'DO') || '  pass';
  return `def test_${name}():\n${pythonGenerator.prefixLines(branch, pythonGenerator.INDENT)}\n`;
};

Python.forBlock['tools_assert_equal'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_NONE) || 'None';
  const b = Python.valueToCode(block, 'B', Python.ORDER_NONE) || 'None';
  return `assert ${a} == ${b}\n`;
};

Python.forBlock['tools_assert_true'] = function(block) {
  const cond = Python.valueToCode(block, 'COND', Python.ORDER_NONE) || 'False';
  return `assert ${cond}\n`;
};

Python.forBlock['tools_run_tests'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  return [`blocks_runtime.run_tests(globals())`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tools_test_fixture'] = function(block) {
  return '# test_fixture block is not fully implemented yet.\n';
};

Python.forBlock['tools_log_debug'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const msg = Python.valueToCode(block, 'MSG', Python.ORDER_NONE) || "''";
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.log_debug(${msg}, ${data})\n`;
};

Python.forBlock['tools_log_to_file'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const msg = Python.valueToCode(block, 'MSG', Python.ORDER_NONE) || "''";
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return `blocks_runtime.log_to_file(${path}, ${msg})\n`;
};

Python.forBlock['tools_capture_stacktrace'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  return [`blocks_runtime.capture_stacktrace()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tools_timeit_block'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const branch = Python.statementToCode(block, 'DO') || 'pass';
  const funcName = pythonGenerator.provideFunction_(
      'timeit_func',
      [`def ${pythonGenerator.FUNCTION_NAME_PLACEHOLDER_}():`,
       `  ${branch}`]);
  return [`blocks_runtime.timeit_block(${funcName})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tools_profile_start_stop'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const action = block.getFieldValue('ACTION');
  if (action === 'START') {
    return 'blocks_runtime.profile_start()\n';
  } else {
    return 'blocks_runtime.profile_stop()\n';
  }
};

Python.forBlock['tools_memory_snapshot'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  return [`blocks_runtime.memory_snapshot()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tools_trace_function'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const fn = Python.valueToCode(block, 'FN', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.trace_function(${fn})\n`;
};

Python.forBlock['tools_argparse_define'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const arg = Python.valueToCode(block, 'ARG', Python.ORDER_NONE) || "''";
  return `blocks_runtime.argparse_define(${arg})\n`;
};

Python.forBlock['tools_argparse_parse'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  return [`blocks_runtime.argparse_parse()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tools_print_help'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  return `blocks_runtime.print_help()\n`;
};

// --- Enterprise & Specialty ---

Python.forBlock['enterprise_odoo_connect'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  return [`blocks_runtime.odoo_connect()`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['enterprise_odoo_search_create'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const conn = Python.valueToCode(block, 'CONN', Python.ORDER_NONE) || 'None';
  const model = Python.valueToCode(block, 'MODEL', Python.ORDER_NONE) || "''";
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.odoo_search_create(${conn}, ${model}, ${data})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['enterprise_ros_init_node'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const name = block.getFieldValue('NAME');
  return `blocks_runtime.ros_init_node('${name}')\n`;
};

Python.forBlock['enterprise_ros_publish'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const topic = Python.valueToCode(block, 'TOPIC', Python.ORDER_NONE) || "''";
  const msg = Python.valueToCode(block, 'MSG', Python.ORDER_NONE) || '{}';
  return `blocks_runtime.ros_publish(${topic}, ${msg})\n`;
};

Python.forBlock['enterprise_quant_backtest_strategy'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const strategy = Python.valueToCode(block, 'STRATEGY', Python.ORDER_NONE) || 'None';
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.quant_backtest_strategy(${strategy}, ${data})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['enterprise_quant_get_price_series'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const ticker = Python.valueToCode(block, 'TICKER', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.quant_get_price_series(${ticker})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['automation_ci_trigger'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const job_name = Python.valueToCode(block, 'JOB_NAME', Python.ORDER_NONE) || "''";
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || '{}';
  return `blocks_runtime.ci_trigger(${job_name}, ${params})\n`;
};

Python.forBlock['automation_artifact_upload'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return `blocks_runtime.artifact_upload(${path})\n`;
};

Python.forBlock['automation_artifact_download'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const id = Python.valueToCode(block, 'ID', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.artifact_download(${id})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_semaphore_acquire_release'] = function(block) {
  const action = block.getFieldValue('ACTION');
  const semaphore = Python.valueToCode(block, 'SEMAPHORE', Python.ORDER_MEMBER) || 'None';
  let code = '';
  if (action === 'ACQUIRE') {
    code = `${semaphore}.acquire()`;
  } else if (action === 'RELEASE') {
    code = `${semaphore}.release()`;
  }
  return code + '\n';
};

Python.forBlock['essentials_tuple_to_list'] = function(block) {
  const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_NONE) || '()';
  return [`list(${tuple})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_tuple_unpack'] = function(block) {
  const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_NONE) || '()';
  const vars = (block.getFieldValue('VARS') || '').trim();
  // Split variables by comma. If a single variable, do a normal assignment.
  const names = vars.split(',').map(s => s.trim()).filter(Boolean);
  if (names.length <= 1) {
    const target = names[0] || Python.nameDB_.getDistinctName('_unpack', 'VARIABLE');
    return `${target} = ${tuple}\n`;
  }
  // Multiple targets: avoid tuple-unpack in a single assignment. Assign sequentially.
  const temp = Python.nameDB_.getDistinctName('_unpack', 'VARIABLE');
  let code = `${temp} = ${tuple}\n`;
  names.forEach((n, i) => {
    const safe = Python.nameDB_.getDistinctName(n, 'VARIABLE');
    code += `${safe} = ${temp}[${i}]\n`;
  });
  return code;
};

Python.forBlock['essentials_namedtuple_define'] = function(block) {
  pythonGenerator.addImport('from collections import namedtuple');
  const name = block.getFieldValue('NAME');
  const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
  return [`namedtuple('${name}', ${fields})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dataclass_stub'] = function(block) {
  pythonGenerator.addImport('from dataclasses import make_dataclass');
  const name = block.getFieldValue('NAME');
  const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
  return [`make_dataclass('${name}', ${fields})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_set_create'] = function(block) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const code = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || 'None';
    elements.push(code);
  }
  if (elements.length === 0) {
    return ['set()', Python.ORDER_FUNCTION_CALL];
  }
  const code = '{' + elements.join(', ') + '}';
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_set_add'] = function(block) {
  const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
  const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
  return `${set}.add(${item})\n`;
};

Python.forBlock['essentials_set_remove'] = function(block) {
  const set = Python.valueToCode(block, 'SET', Python.ORDER_MEMBER) || 'set()';
  const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
  return `${set}.remove(${item})\n`;
};

Python.forBlock['essentials_set_union'] = function(block) {
  const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
  const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
  return [`${set1} | ${set2}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_set_intersection'] = function(block) {
  const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
  const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
  return [`${set1} & ${set2}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_set_difference'] = function(block) {
  const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
  const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
  return [`${set1} - ${set2}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_set_symmetric_difference'] = function(block) {
  const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
  const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
  return [`${set1} ^ ${set2}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_set_contains'] = function(block) {
  const set = Python.valueToCode(block, 'SET', Python.ORDER_RELATIONAL) || 'set()';
  const item = Python.valueToCode(block, 'ITEM', Python.ORDER_RELATIONAL) || 'None';
  return [`${item} in ${set}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_set_is_subset'] = function(block) {
  const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
  const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
  return [`${set1}.issubset(${set2})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_set_is_superset'] = function(block) {
  const set1 = Python.valueToCode(block, 'SET1', Python.ORDER_RELATIONAL) || 'set()';
  const set2 = Python.valueToCode(block, 'SET2', Python.ORDER_RELATIONAL) || 'set()';
  return [`${set1}.issuperset(${set2})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dict_create'] = function(block) {
  const pairs = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const key = Python.valueToCode(block, 'KEY' + i, Python.ORDER_NONE) || 'None';
    const value = Python.valueToCode(block, 'VALUE' + i, Python.ORDER_NONE) || 'None';
    if (key !== 'None' && value !== 'None') {
        pairs.push(`${key}: ${value}`);
    }
  }
  const code = '{' + pairs.join(', ') + '}';
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_dict_statements'] = function(block) {
  const op = block.getFieldValue('OP');
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';

  let code;
  switch (op) {
    case 'SET':
      code = `${dict}[${key}] = ${value}\\n`;
      break;
    default:
      return '';
  }
  return code;
};

Python.forBlock['essentials_dict_expressions'] = function(block) {
  const op = block.getFieldValue('OP');
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';

  let code;
  switch (op) {
    case 'GET':
      code = [`${dict}.get(${key})`, Python.ORDER_FUNCTION_CALL];
      break;
    case 'POP':
      code = [`${dict}.pop(${key})`, Python.ORDER_FUNCTION_CALL];
      break;
    case 'KEYS':
      code = [`list(${dict}.keys())`, Python.ORDER_FUNCTION_CALL];
      break;
    case 'VALUES':
      code = [`list(${dict}.values())`, Python.ORDER_FUNCTION_CALL];
      break;
    case 'ITEMS':
      code = [`list(${dict}.items())`, Python.ORDER_FUNCTION_CALL];
      break;
    default:
      return ['', Python.ORDER_ATOMIC];
  }
  return code;
};

Python.forBlock['essentials_dict_update'] = function(block) {
  const dict1 = Python.valueToCode(block, 'DICT1', Python.ORDER_MEMBER) || '{}';
  const dict2 = Python.valueToCode(block, 'DICT2', Python.ORDER_NONE) || '{}';
  return `${dict1}.update(${dict2})\n`;
};

Python.forBlock['essentials_dict_merge_shallow'] = function(block) {
  const dict1 = Python.valueToCode(block, 'DICT1', Python.ORDER_NONE) || '{}';
  const dict2 = Python.valueToCode(block, 'DICT2', Python.ORDER_NONE) || '{}';
  return [`{**${dict1}, **${dict2}}`, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_dict_deep_merge'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const dict1 = Python.valueToCode(block, 'DICT1', Python.ORDER_NONE) || '{}';
  const dict2 = Python.valueToCode(block, 'DICT2', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.deep_merge(${dict1}, ${dict2})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dict_setdefault'] = function(block) {
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
  const default_val = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
  return [`${dict}.setdefault(${key}, ${default_val})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dict_pop'] = function(block) {
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
  return [`${dict}.pop(${key})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dict_get_nested'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || '[]';
  const default_val = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.get_nested(${dict}, ${path}, ${default_val})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_registry_register'] = function(block) {
  const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  return `${registry}[${key}] = ${value}\n`;
};

Python.forBlock['essentials_registry_call'] = function(block) {
  const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
  const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
  const kwargs = Python.valueToCode(block, 'KWARGS', Python.ORDER_NONE) || '{}';
  return [`${registry}[${key}](*${args}, **${kwargs})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_var_set'] = function(block) {
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC) || 'None';
  return `${varName} = ${value}\n`;
};

Python.forBlock['essentials_var_get'] = function(block) {
  const varName = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  return [varName, Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_var_undefined'] = function(block) {
  return ['None', Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_is_instance'] = function(block) {
  const obj = Python.valueToCode(block, 'OBJ', Python.ORDER_NONE) || 'None';
  const type = Python.valueToCode(block, 'TYPE', Python.ORDER_NONE) || 'None';
  return [`isinstance(${obj}, ${type})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_type_of'] = function(block) {
  const obj = Python.valueToCode(block, 'OBJ', Python.ORDER_NONE) || 'None';
  return [`type(${obj})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_cast'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const type = block.getFieldValue('TYPE');
  return [`${type}(${value})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_default_if_none'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const default_val = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
  return [`${value} if ${value} is not None else ${default_val}`, Python.ORDER_CONDITIONAL];
};

Python.forBlock['essentials_bool_true'] = function(block) {
  return ['True', Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_bool_false'] = function(block) {
  return ['False', Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_logic_and'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_LOGICAL_AND) || 'False';
  const b = Python.valueToCode(block, 'B', Python.ORDER_LOGICAL_AND) || 'False';
  return [`${a} and ${b}`, Python.ORDER_LOGICAL_AND];
};

Python.forBlock['essentials_logic_or'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_LOGICAL_OR) || 'False';
  const b = Python.valueToCode(block, 'B', Python.ORDER_LOGICAL_OR) || 'False';
  return [`${a} or ${b}`, Python.ORDER_LOGICAL_OR];
};

Python.forBlock['essentials_logic_not'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_LOGICAL_NOT) || 'True';
  return [`not ${a}`, Python.ORDER_LOGICAL_NOT];
};

Python.forBlock['essentials_compare'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_RELATIONAL) || '0';
  const b = Python.valueToCode(block, 'B', Python.ORDER_RELATIONAL) || '0';
  const op = block.getFieldValue('OP');
  const OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  return [`${a} ${OPERATORS[op]} ${b}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_in_operator'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_RELATIONAL) || 'None';
  const b = Python.valueToCode(block, 'B', Python.ORDER_RELATIONAL) || '[]';
  return [`${a} in ${b}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_not_in_operator'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_RELATIONAL) || 'None';
  const b = Python.valueToCode(block, 'B', Python.ORDER_RELATIONAL) || '[]';
  return [`${a} not in ${b}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_ternary'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_CONDITIONAL) || 'None';
  const condition = Python.valueToCode(block, 'CONDITION', Python.ORDER_CONDITIONAL) || 'False';
  const b = Python.valueToCode(block, 'B', Python.ORDER_CONDITIONAL) || 'None';
  return [`${a} if ${condition} else ${b}`, Python.ORDER_CONDITIONAL];
};

Python.forBlock['essentials_assert'] = function(block) {
  const condition = Python.valueToCode(block, 'CONDITION', Python.ORDER_NONE) || 'False';
  const message = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || '';
  return `assert ${condition}, ${message}\n`;
};


Python.forBlock['essentials_log_info'] = function(block) {
  pythonGenerator.addImport('logging');
  const msg = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || "''";
  return `logging.info(${msg})\n`;
};

Python.forBlock['essentials_log_warn'] = function(block) {
  pythonGenerator.addImport('logging');
  const msg = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || "''";
  return `logging.warning(${msg})\n`;
};

Python.forBlock['essentials_log_error'] = function(block) {
  pythonGenerator.addImport('logging');
  const msg = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || "''";
  return `logging.error(${msg})\n`;
};

Python.forBlock['essentials_print_to_console'] = function(block) {
  const msg = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || "''";
  return `print(${msg})\n`;
};

Python.forBlock['essentials_safe_input'] = function(block) {
  const prompt = Python.valueToCode(block, 'PROMPT', Python.ORDER_NONE) || "''";
  const type = (block.getFieldValue && block.getFieldValue('TYPE')) || null;
  // Backward compatible: if no TYPE field, return string input
  if (!type || type === 'str') {
    return [`input(${prompt})`, Python.ORDER_FUNCTION_CALL];
  }
  if (type === 'int') {
    return [`int(input(${prompt}))`, Python.ORDER_FUNCTION_CALL];
  }
  if (type === 'float') {
    return [`float(input(${prompt}))`, Python.ORDER_FUNCTION_CALL];
  }
  if (type === 'bool') {
    // Interpret common truthy strings; fallback to False
    const code = `lambda s: s.strip().lower() in ("true","1","yes","y")`;
    const helper = Python.nameDB_.getDistinctName('_to_bool', 'VARIABLE');
    const def = `${helper} = ${code}\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helper]) {
      Python.definitions_[helper] = def;
    }
    return [`${helper}(input(${prompt}))`, Python.ORDER_FUNCTION_CALL];
  }
  // Unknown type fallback
  return [`input(${prompt})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_input_raw'] = function(block) {
  const prompt = Python.valueToCode(block, 'PROMPT', Python.ORDER_NONE) || "''";
  const type = (block.getFieldValue && block.getFieldValue('TYPE')) || 'str';
  if (type === 'str') return [`input(${prompt})`, Python.ORDER_FUNCTION_CALL];
  if (type === 'int') return [`int(input(${prompt}))`, Python.ORDER_FUNCTION_CALL];
  if (type === 'float') return [`float(input(${prompt}))`, Python.ORDER_FUNCTION_CALL];
  if (type === 'bool') {
    const helper = Python.nameDB_.getDistinctName('_to_bool', 'VARIABLE');
    const def = `${helper} = lambda s: s.strip().lower() in ("true","1","yes","y")\n`;
    Python.definitions_ = Python.definitions_ || Object.create(null);
    if (!Python.definitions_[helper]) Python.definitions_[helper] = def;
    return [`${helper}(input(${prompt}))`, Python.ORDER_FUNCTION_CALL];
  }
  return [`input(${prompt})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_type_as_string'] = function(block) {
  const obj = Python.valueToCode(block, 'OBJ', Python.ORDER_NONE) || 'None';
  return [`type(${obj}).__name__`, Python.ORDER_MEMBER];
};

Python.forBlock['essentials_is_none'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_RELATIONAL) || 'None';
  return [`${value} is None`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_is_not_none'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_RELATIONAL) || 'None';
  return [`${value} is not None`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_text_multiline'] = function(block) {
  const text = block.getFieldValue('TEXT');
  return [JSON.stringify(text), Python.ORDER_ATOMIC];
};

Python.forBlock['essentials_text_is_empty'] = function(block) {
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  return [`not ${text}`, Python.ORDER_LOGICAL_NOT];
};

Python.forBlock['essentials_num_property'] = function(block) {
  const num = Python.valueToCode(block, 'NUM', Python.ORDER_NONE) || '0';
  const property = block.getFieldValue('PROPERTY');
  let code;
  switch (property) {
    case 'EVEN':
      code = `${num} % 2 == 0`;
      break;
    case 'ODD':
      code = `${num} % 2 != 0`;
      break;
    case 'POSITIVE':
      code = `${num} > 0`;
      break;
    case 'NEGATIVE':
      code = `${num} < 0`;
      break;
    case 'PRIME':
      pythonGenerator.addImport('blocks_runtime');
      code = `blocks_runtime._is_prime(${num})`;
      break;
  }
  return [code, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_num_is_divisible_by'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_MODULUS) || '0';
  const b = Python.valueToCode(block, 'B', Python.ORDER_MODULUS) || '1';
  return [`${a} % ${b} == 0`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_list_is_empty'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  return [`not ${list}`, Python.ORDER_LOGICAL_NOT];
};

Python.forBlock['essentials_tuple_length'] = function(block) {
  const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_NONE) || '()';
  return [`len(${tuple})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_tuple_get'] = function(block) {
  const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_MEMBER) || '()';
  const index = Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0';
  return [`${tuple}[${index}]`, Python.ORDER_MEMBER];
};

Python.forBlock['essentials_set_length'] = function(block) {
  const set = Python.valueToCode(block, 'SET', Python.ORDER_NONE) || 'set()';
  return [`len(${set})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_dict_has_key'] = function(block) {
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_RELATIONAL) || '{}';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_RELATIONAL) || 'None';
  return [`${key} in ${dict}`, Python.ORDER_RELATIONAL];
};

Python.forBlock['essentials_logic_is_truthy'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'False';
  return [`bool(${value})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['essentials_log_custom'] = function(block) {
  pythonGenerator.addImport('logging');
  const level = block.getFieldValue('LEVEL');
  const msg = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || "''";
  return `logging.log(logging.getLevelName('${level.toUpperCase()}'), ${msg})\n`;
};

// --- Core Fundamentals ---

Python.forBlock['core_none'] = function(block) {
  return ['None', Python.ORDER_ATOMIC];
};

Python.forBlock['core_type'] = function(block) {
  const value = Python.valueToCode(block, 'VAR', Python.ORDER_NONE) || 'None';
  return [`type(${value})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['core_isinstance'] = function(block) {
  const obj = Python.valueToCode(block, 'OBJ', Python.ORDER_NONE) || 'None';
  const cls = Python.valueToCode(block, 'CLASS', Python.ORDER_NONE) || 'None';
  return [`isinstance(${obj}, ${cls})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['core_enum'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const name = block.getFieldValue('NAME');
  const members = Python.valueToCode(block, 'MEMBERS', Python.ORDER_NONE) || '[]';
  const code = `blocks_runtime.create_enum('${name}', ${members})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['core_dataclass'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const name = block.getFieldValue('NAME');
  const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
  const code = `blocks_runtime.create_dataclass('${name}', ${fields})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['core_namedtuple'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const name = block.getFieldValue('NAME');
  const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
  const code = `blocks_runtime.create_namedtuple('${name}', ${fields})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Variables & Basic Types ---

Python.forBlock['variables_cast'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const type = block.getFieldValue('TYPE');
  const code = `${type}(${value})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['variables_get_with_default'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  const defaultValue = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
  // This generates the 'value if value is not None else defaultValue' pattern
  const code = `${value} if ${value} is not None else ${defaultValue}`;
  return [code, Python.ORDER_CONDITIONAL];
};

// --- Strings & Text Processing ---

Python.forBlock['text_is_numeric'] = function(block) {
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
  const code = `${text}.isnumeric()`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_find_all'] = function(block) {
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const substring = Python.valueToCode(block, 'SUBSTRING', Python.ORDER_NONE) || "''";
  const code = `[i for i in range(len(${text})) if ${text}.startswith(${substring}, i)]`;
  return [code, Python.ORDER_LIST_COMPREHENSION];
};

Python.forBlock['text_compare_case_insensitive'] = function(block) {
  const text1 = Python.valueToCode(block, 'TEXT1', Python.ORDER_MEMBER) || "''";
  const text2 = Python.valueToCode(block, 'TEXT2', Python.ORDER_MEMBER) || "''";
  const code = `${text1}.lower() == ${text2}.lower()`;
  return [code, Python.ORDER_RELATIONAL];
};

Python.forBlock['text_count_simple'] = function(block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const sub = Python.valueToCode(block, 'SUB', Python.ORDER_NONE) || "''";
    const code = `${text}.count(${sub})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_partition'] = function(block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const sep = Python.valueToCode(block, 'SEP', Python.ORDER_NONE) || "''";
    const code = `${text}.partition(${sep})`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_swapcase'] = function(block) {
    const text = Python.valueToCode(block, 'TEXT', Python.ORDER_MEMBER) || "''";
    const code = `${text}.swapcase()`;
    return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_fstring'] = function(block) {
  const template = Python.valueToCode(block, 'TEMPLATE', Python.ORDER_NONE) || "''";
  const values = Python.valueToCode(block, 'VALUES', Python.ORDER_NONE) || '{}';
  const code = `${template}.format(**${values})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_regex_search'] = function(block) {
  pythonGenerator.addImport('re');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const code = `re.search(${pattern}, ${text})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_regex_replace'] = function(block) {
  pythonGenerator.addImport('re');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const pattern = Python.valueToCode(block, 'PATTERN', Python.ORDER_NONE) || "''";
  const replacement = Python.valueToCode(block, 'REPLACEMENT', Python.ORDER_NONE) || "''";
  const code = `re.sub(${pattern}, ${replacement}, ${text})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['text_normalize'] = function(block) {
  pythonGenerator.addImport('unicodedata');
  const text = Python.valueToCode(block, 'TEXT', Python.ORDER_NONE) || "''";
  const form = block.getFieldValue('FORM');
  const code = `unicodedata.normalize('${form}', ${text})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['i18n_register_translation'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const lang = block.getFieldValue('LANG');
  const dictionary = Python.valueToCode(block, 'DICTIONARY', Python.ORDER_NONE) || '{}';
  return `blocks_runtime.register_translation('${lang}', ${dictionary})\n`;
};

Python.forBlock['i18n_translate'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || "''";
  const lang = Python.valueToCode(block, 'LANG', Python.ORDER_NONE) || "''";
  const fallback = Python.valueToCode(block, 'FALLBACK', Python.ORDER_NONE) || 'None';
  const code = `blocks_runtime.translate(${key}, ${lang}, fallback=${fallback})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Math & Numeric ---

Python.forBlock['math_decimal'] = function(block) {
  pythonGenerator.addImport('from decimal import Decimal');
  const value = block.getFieldValue('VALUE');
  return [`Decimal('${value}')`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['math_random_item'] = function(block) {
  pythonGenerator.addImport('random');
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  return [`random.choice(${list})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['lists_shuffle_in_place'] = function(block) {
  pythonGenerator.addImport('random');
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  return `random.shuffle(${list})\n`;
};

// --- Lists & Sequence Operations ---


Python.forBlock['lists_comprehension'] = function(block) {
    const output = Python.valueToCode(block, 'OUTPUT', Python.ORDER_NONE) || 'None';
    const variable = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const condition = Python.valueToCode(block, 'IF', Python.ORDER_NONE) || '';

    let code = `[${output} for ${variable} in ${list}`;
    if (condition) {
        code += ` if ${condition}`;
    }
    code += ']';
    return [code, Python.ORDER_ATOMIC];
};

// --- Tuples, NamedTuples & Struct-like ---

Python.forBlock['tuples_index'] = function(block) {
  const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_MEMBER) || '()';
  const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
  const code = `${tuple}.index(${item})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['tuples_create_with'] = function(block) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const element = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || 'None';
    elements.push(element);
  }
  if (elements.length === 0) {
    return ['()', Python.ORDER_ATOMIC];
  }
  if (elements.length === 1) {
    return [`(${elements[0]},)`, Python.ORDER_ATOMIC];
  }
  const code = `(${elements.join(', ')})`;
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['tuples_unpack'] = function(block) {
  const tuple = Python.valueToCode(block, 'TUPLE', Python.ORDER_NONE) || '()';
  const vars = block.getFieldValue('VARS');
  return `${vars} = ${tuple}\n`;
};

Python.forBlock['tuples_create_simplenamespace'] = function(block) {
  pythonGenerator.addImport('from types import SimpleNamespace');
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  return [`SimpleNamespace(**${dict})`, Python.ORDER_FUNCTION_CALL];
};

// --- Dictionaries & Mappings ---


Python.forBlock['dicts_register_handler'] = function(block) {
  const registry = Python.valueToCode(block, 'REGISTRY', Python.ORDER_MEMBER) || '{}';
  const handler = Python.valueToCode(block, 'HANDLER', Python.ORDER_NONE) || 'None';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
  return `${registry}[${key}] = ${handler}\n`;
};

// --- Control Flow & Logic ---
// Note: controls_if generator is defined earlier in this file with full support
// for implicit else rules and explicit ELSE handling. Avoid redefining it here.

Python.forBlock['logic_ternary'] = function(block) {
  const value_if = Python.valueToCode(block, 'IF', Python.ORDER_CONDITIONAL) || 'None';
  const condition = Python.valueToCode(block, 'CONDITION', Python.ORDER_CONDITIONAL) || 'False';
  const value_else = Python.valueToCode(block, 'ELSE', Python.ORDER_CONDITIONAL) || 'None';
  const code = `${value_if} if ${condition} else ${value_else}`;
  return [code, Python.ORDER_CONDITIONAL];
};

// Note: Match/case is provided by 'control_match' and 'control_case' blocks.
// The older 'logic_match' variants were removed to avoid duplication.

// --- Loops & Iteration ---

Python.forBlock['loops_for_each_safe'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const variable = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  const limit = Python.valueToCode(block, 'LIMIT', Python.ORDER_NONE) || '1000';
  const branch = Python.statementToCode(block, 'DO') || Python.PASS;
  const limited_iterable = `blocks_runtime.limited_iterator(${list}, ${limit})`;
  return `for ${variable} in ${limited_iterable}:\n${branch}`;
};

Python.forBlock['loops_while_safe'] = function(block) {
  const limit = Python.valueToCode(block, 'LIMIT', Python.ORDER_NONE) || '1000';
  const condition = Python.valueToCode(block, 'BOOL', Python.ORDER_NONE) || 'False';
  const branch = Python.statementToCode(block, 'DO') || Python.PASS;

  let code = `_loop_count = 0\n`;
  code += `while ${condition}:\n`;
  code += Python.prefixLines(`if _loop_count >= ${limit}:\n`, Python.INDENT);
  code += Python.prefixLines(`  raise Exception(f"Loop exceeded max iterations of {${limit}}")\n`, Python.INDENT);
  code += Python.prefixLines(`_loop_count += 1\n`, Python.INDENT);
  code += branch;
  return code;
};

Python.forBlock['loops_enumerate'] = function(block) {
  const index_var = pythonGenerator.getVariableName(block.getFieldValue('INDEX_VAR'));
  const item_var = pythonGenerator.getVariableName(block.getFieldValue('ITEM_VAR'));
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  const branch = Python.statementToCode(block, 'DO') || Python.PASS;
  return `for ${index_var}, ${item_var} in enumerate(${list}):\n${branch}`;
};

Python.forBlock['loops_zip'] = function(block) {
  const vars = block.getFieldValue('VARS');
  const lists = Python.valueToCode(block, 'LISTS', Python.ORDER_MEMBER) || '[]';
  const branch = Python.statementToCode(block, 'DO') || Python.PASS;
  return `for ${vars} in zip(*${lists}):\n${branch}`;
};

// --- Functions & Callables ---

Python.forBlock['functions_lambda'] = function(block) {
  const args = block.getFieldValue('ARGS');
  const expression = Python.valueToCode(block, 'EXPRESSION', Python.ORDER_NONE) || 'None';
  return [`lambda ${args}: ${expression}`, Python.ORDER_LAMBDA];
};

Python.forBlock['functions_decorator'] = function(block) {
  const decorator = Python.valueToCode(block, 'DECORATOR', Python.ORDER_NONE) || 'my_decorator';
  const func = Python.statementToCode(block, 'FUNCTION');
  return `@${decorator}\n${func}`;
};

Python.forBlock['functions_call_with_kwargs'] = function(block) {
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_FUNCTION_CALL) || 'my_function';
  const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
  const kwargs = Python.valueToCode(block, 'KWARGS', Python.ORDER_NONE) || '{}';
  const code = `${func}(*${args}, **${kwargs})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['functions_callable'] = function(block) {
  const item = Python.valueToCode(block, 'ITEM', Python.ORDER_NONE) || 'None';
  const code = `callable(${item})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};


// --- Iterators & Generators ---

Python.forBlock['iterators_yield'] = function(block) {
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  return `yield ${value}\n`;
};

Python.forBlock['iterators_yield_from'] = function(block) {
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  return `yield from ${iterable}\n`;
};

Python.forBlock['iterators_generator_function'] = function(block) {
  const name = block.getFieldValue('NAME');
  const params = block.getFieldValue('PARAMS');
  const branch = Python.statementToCode(block, 'DO') || Python.PASS;
  const code = `def ${name}(${params}):\n${branch}`;
  return `\n${code}\n`;
};

Python.forBlock['iterators_safe_next'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const iterator = Python.valueToCode(block, 'ITERATOR', Python.ORDER_NONE) || 'iter([])';
  const defaultValue = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
  const code = `blocks_runtime.safe_next(${iterator}, ${defaultValue})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['iterators_generator_expression'] = function(block) {
    const output = Python.valueToCode(block, 'OUTPUT', Python.ORDER_NONE) || 'None';
    const variable = pythonGenerator.getVariableName(block.getFieldValue('VAR'));
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
    const condition = Python.valueToCode(block, 'IF', Python.ORDER_NONE) || '';

    let code = `(${output} for ${variable} in ${list}`;
    if (condition) {
        code += ` if ${condition}`;
    }
    code += ')';
    return [code, Python.ORDER_ATOMIC];
};

// --- Concurrency & Parallelism ---

Python.forBlock['concurrency_submit_task'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const func = Python.valueToCode(block, 'FUNC', Python.ORDER_NONE) || 'None';
  const args = Python.valueToCode(block, 'ARGS', Python.ORDER_NONE) || '[]';
  const code = `blocks_runtime.submit_task(${func}, *${args})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_get_future_result'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const future = Python.valueToCode(block, 'FUTURE', Python.ORDER_NONE) || 'None';
  const timeout = Python.valueToCode(block, 'TIMEOUT', Python.ORDER_NONE) || 'None';
  const code = `blocks_runtime.get_future_result(${future}, timeout=${timeout})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['concurrency_is_future_done'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const future = Python.valueToCode(block, 'FUTURE', Python.ORDER_NONE) || 'None';
  const code = `blocks_runtime.is_future_done(${future})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Async & Networking ---

Python.forBlock['async_function'] = function(block) {
  const name = block.getFieldValue('NAME');
  const params = block.getFieldValue('PARAMS');
  const branch = Python.statementToCode(block, 'DO') || Python.PASS;
  const code = `async def ${name}(${params}):\n${branch}`;
  return `\n${code}\n`;
};

Python.forBlock['async_await'] = function(block) {
  const future = Python.valueToCode(block, 'FUTURE', Python.ORDER_NONE) || 'None';
  return [`await ${future}`, Python.ORDER_AWAIT];
};

Python.forBlock['async_http_get'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_NONE) || 'None';
  const code = `blocks_runtime.async_http_get(url=${url}, headers=${headers})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['async_http_post'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const url = Python.valueToCode(block, 'URL', Python.ORDER_NONE) || "''";
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || 'None';
  const json = Python.valueToCode(block, 'JSON', Python.ORDER_NONE) || 'None';
  const headers = Python.valueToCode(block, 'HEADERS', Python.ORDER_NONE) || 'None';
  const code = `blocks_runtime.async_http_post(url=${url}, data=${data}, json=${json}, headers=${headers})`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Filesystem & I/O ---

Python.forBlock['filesystem_read_file'] = function(block) {
    pythonGenerator.addImport('blocks_runtime');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`blocks_runtime.read_file(${path})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['filesystem_write_file'] = function(block) {
    pythonGenerator.addImport('blocks_runtime');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    const content = Python.valueToCode(block, 'CONTENT', Python.ORDER_NONE) || "''";
    return `blocks_runtime.write_file(${path}, ${content})\n`;
};

Python.forBlock['filesystem_list_dir'] = function(block) {
    pythonGenerator.addImport('blocks_runtime');
    const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
    return [`blocks_runtime.list_dir(${path})`, Python.ORDER_FUNCTION_CALL];
};

// --- Serialization & Data Formats ---

Python.forBlock['serialization_to_json'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.to_json(${data})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['serialization_from_json'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const json_string = Python.valueToCode(block, 'JSON_STRING', Python.ORDER_NONE) || '""';
  return [`blocks_runtime.from_json(${json_string})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['serialization_write_csv'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '[]';
  return `blocks_runtime.write_csv(${path}, ${data})\n`;
};

Python.forBlock['serialization_read_csv'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || "''";
  return [`blocks_runtime.read_csv(${path})`, Python.ORDER_FUNCTION_CALL];
};

// --- Databases & Persistence ---

Python.forBlock['db_execute'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const query = Python.valueToCode(block, 'QUERY', Python.ORDER_NONE) || "''";
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || '()';
  return `blocks_runtime.db_execute(${query}, ${params})\n`;
};

Python.forBlock['db_query_all'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const query = Python.valueToCode(block, 'QUERY', Python.ORDER_NONE) || "''";
  const params = Python.valueToCode(block, 'PARAMS', Python.ORDER_NONE) || '()';
  return [`blocks_runtime.db_query_all(${query}, ${params})`, Python.ORDER_FUNCTION_CALL];
};

// --- Logging, Observability & Monitoring ---

Python.forBlock['logging_log'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const message = Python.valueToCode(block, 'MESSAGE', Python.ORDER_NONE) || "''";
  const level = block.getFieldValue('LEVEL');
  return `blocks_runtime.log_${level}(${message})\n`;
};

Python.forBlock['monitoring_metric_increment'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const name = Python.valueToCode(block, 'NAME', Python.ORDER_NONE) || "''";
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || '1';
  return `blocks_runtime.metric_increment(${name}, ${value})\n`;
};

Python.forBlock['monitoring_trace_span'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const name = Python.valueToCode(block, 'NAME', Python.ORDER_NONE) || "''";
  const branch = Python.statementToCode(block, 'DO') || Python.PASS;

  let code = `blocks_runtime.trace_start(${name})\n`;
  code += `try:\n`;
  code += Python.prefixLines(branch, Python.INDENT);
  code += `finally:\n`;
  code += Python.prefixLines(`blocks_runtime.trace_stop(${name})\n`, Python.INDENT);
  return code;
};

// --- Testing & Quality ---

Python.forBlock['testing_test_case'] = function(block) {
  const name = block.getFieldValue('NAME');
  const branch = Python.statementToCode(block, 'DO') || Python.PASS;
  const code = `def ${name}():\n${branch}`;
  return `\n${code}\n`;
};

Python.forBlock['testing_run_tests'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const code = `blocks_runtime.run_tests(globals())`;
  return [code, Python.ORDER_FUNCTION_CALL];
};

// --- Data Structures & Shapes ---

Python.forBlock['data_structures_seq_concat'] = function(block) {
  const a = Python.valueToCode(block, 'A', Python.ORDER_ADDITIVE) || '[]';
  const b = Python.valueToCode(block, 'B', Python.ORDER_ADDITIVE) || '[]';
  return [`${a} + ${b}`, Python.ORDER_ADDITIVE];
};

Python.forBlock['data_structures_seq_repeat'] = function(block) {
  const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_MULTIPLICATIVE) || '[]';
  const times = Python.valueToCode(block, 'TIMES', Python.ORDER_MULTIPLICATIVE) || '0';
  return [`${seq} * ${times}`, Python.ORDER_MULTIPLICATIVE];
};

Python.forBlock['data_structures_seq_slice_step'] = function(block) {
  const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_MEMBER) || '[]';
  const start = Python.valueToCode(block, 'START', Python.ORDER_NONE) || 'None';
  const end = Python.valueToCode(block, 'END', Python.ORDER_NONE) || 'None';
  const step = Python.valueToCode(block, 'STEP', Python.ORDER_NONE) || 'None';
  return [`${seq}[${start}:${end}:${step}]`, Python.ORDER_MEMBER];
};

Python.forBlock['data_structures_seq_sorted_by'] = function(block) {
  const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_NONE) || '[]';
  const key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || 'None';
  return [`sorted(${seq}, key=${key})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_seq_zip'] = function(block) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const code = Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || '[]';
    elements.push(code);
  }
  return [`list(zip(${elements.join(', ')}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_seq_transpose'] = function(block) {
  const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_NONE) || '[]';
  return [`list(zip(*${seq}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_seq_chunk'] = function(block) {
  const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_NONE) || '[]';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_NONE) || '1';
  return [`[${seq}[i:i + ${size}] for i in range(0, len(${seq}), ${size})]`, Python.ORDER_ATOMIC];
};

Python.forBlock['data_structures_seq_window'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const seq = Python.valueToCode(block, 'SEQ', Python.ORDER_NONE) || '[]';
  const size = Python.valueToCode(block, 'SIZE', Python.ORDER_NONE) || '1';
  const step = Python.valueToCode(block, 'STEP', Python.ORDER_NONE) || '1';
  return [`blocks_runtime.sliding_window(${seq}, ${size}, ${step})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_get_path'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || '[]';
  const default_val = Python.valueToCode(block, 'DEFAULT', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.get_nested(${dict}, ${path}, ${default_val})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_set_path'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  const path = Python.valueToCode(block, 'PATH', Python.ORDER_NONE) || '[]';
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || 'None';
  return `blocks_runtime.set_nested(${dict}, ${path}, ${value})\n`;
};

Python.forBlock['data_structures_map_flatten'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.flatten_dict(${dict})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_unflatten'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.unflatten_dict(${dict})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_filter_by_value'] = function(block) {
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  const condition = Python.valueToCode(block, 'CONDITION', Python.ORDER_NONE) || 'lambda v: True';
  return [`{k: v for k, v in ${dict}.items() if (${condition})(v)}`, Python.ORDER_ATOMIC];
};

Python.forBlock['data_structures_map_keys_to_list'] = function(block) {
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
  return [`list(${dict}.keys())`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_items_to_list'] = function(block) {
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_MEMBER) || '{}';
  return [`list(${dict}.items())`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_map_invert'] = function(block) {
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  return [`{v: k for k, v in ${dict}.items()}`, Python.ORDER_ATOMIC];
};

Python.forBlock['data_structures_record_define_namedtuple'] = function(block) {
  pythonGenerator.addImport('from collections import namedtuple');
  const name = block.getFieldValue('NAME');
  const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
  return [`namedtuple('${name}', ${fields})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_record_define_dataclass'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const name = block.getFieldValue('NAME');
  const fields = Python.valueToCode(block, 'FIELDS', Python.ORDER_NONE) || '[]';
  const defaults = Python.valueToCode(block, 'DEFAULTS', Python.ORDER_NONE) || '{}';
  return [`blocks_runtime.create_dataclass_with_defaults('${name}', ${fields}, ${defaults})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_record_instantiate'] = function(block) {
  const a_class = Python.valueToCode(block, 'CLASS', Python.ORDER_FUNCTION_CALL) || 'None';
  const values = Python.valueToCode(block, 'VALUES', Python.ORDER_NONE) || '{}';
  return [`${a_class}(**${values})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_record_to_dict'] = function(block) {
  pythonGenerator.addImport('blocks_runtime');
  const record = Python.valueToCode(block, 'RECORD', Python.ORDER_NONE) || 'None';
  return [`blocks_runtime.record_to_dict(${record})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_record_from_dict'] = function(block) {
  const a_class = Python.valueToCode(block, 'CLASS', Python.ORDER_FUNCTION_CALL) || 'None';
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  return [`${a_class}(**${dict})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_frozen_map'] = function(block) {
  const dict = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  return [`frozenset(${dict}.items())`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['data_structures_frozen_list'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_NONE) || '[]';
  return [`tuple(${list})`, Python.ORDER_FUNCTION_CALL];
};

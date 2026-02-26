import { pythonGenerator as Python } from 'blockly/python';
// Helper to extract key and reverse values if present on mutator-enabled blocks
function getKeyAndReverse(block) {
  let key = null;
  if (block.getInput && block.getInput('KEY')) {
    key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || null;
  }
  let reverse = null;
  if (block.getInput && block.getInput('REVERSE')) {
    reverse = Python.valueToCode(block, 'REVERSE', Python.ORDER_NONE) || null;
  }
  return { key, reverse };
}

Python.forBlock['sorted_block'] = function(block) {
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  const { key, reverse } = getKeyAndReverse(block);
  let args = `${iterable}`;
  if (key) args += `, key=${key}`;
  if (reverse !== null) args += `, reverse=${reverse}`; else args += `, reverse=False`;
  return [`sorted(${args})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['list_sort_block'] = function(block) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_MEMBER) || '[]';
  const { key, reverse } = getKeyAndReverse(block);
  const keyArg = key ? `key=${key}` : 'key=None';
  const revArg = reverse !== null ? `reverse=${reverse}` : 'reverse=False';
  return `${list}.sort(${keyArg}, ${revArg})\n`;
};

// (Removed legacy key_* and lambda blocks; replaced by key_builder_block)

Python.forBlock['multi_key_sort_block'] = function(block) {
  const data = Python.valueToCode(block, 'DATA', Python.ORDER_NONE) || '[]';
  // Collect KEY0..KEY{n-1}; if none, default to identity x.
  const keys = [];
  let i = 0; while (block.getInput && block.getInput('KEY' + i)) { i++; }
  const count = i;
  if (count === 0) {
    const t = Python.nameDB_.getDistinctName('_x', 'VARIABLE');
    return [`sorted(${data}, key=(lambda ${t}: ${t}))`, Python.ORDER_FUNCTION_CALL];
  }
  const v = Python.nameDB_.getDistinctName('x', 'VARIABLE');
  const parts = [];
  for (let k = 0; k < count; k++) {
    const expr = Python.valueToCode(block, 'KEY' + k, Python.ORDER_NONE) || v;
    parts.push(`${expr}`);
  }
  // Optional REVERSE
  let reverse = null;
  if (block.getInput && block.getInput('REVERSE')) reverse = Python.valueToCode(block, 'REVERSE', Python.ORDER_NONE) || null;
  const reverseArg = reverse !== null ? `, reverse=${reverse}` : '';
  return [`sorted(${data}, key=(lambda ${v}: (${parts.join(', ')}))${reverseArg})`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['reverse_view_block'] = function(block) {
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  let key = null;
  if (block.getInput && block.getInput('KEY')) key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || null;
  const keyArg = key ? `, key=${key}` : '';
  return [`reversed(sorted(${iterable}${keyArg}))`, Python.ORDER_FUNCTION_CALL];
};

Python.forBlock['argsort_helper_block'] = function(block) {
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  let key = null;
  if (block.getInput && block.getInput('KEY')) key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || null;
  const v = Python.nameDB_.getDistinctName('x', 'VARIABLE');
  const i = Python.nameDB_.getDistinctName('i', 'VARIABLE');
  // If user supplied a key function (like lambda), use it directly; otherwise index into pair second element.
  // Wrap non-call expressions so that bare 'len' or 'abs' become callable: (lambda x: (KEY)(x))
  let keyWrapper;
  if (key) {
    // Heuristic: if key starts with '('lambda' treat as lambda already.
    if (/^\(lambda\b/.test(key.trim())) {
      keyWrapper = key;
    } else {
      keyWrapper = `(lambda ${v}: (${key})(${v}))`;
    }
  } else {
    keyWrapper = `(lambda ${v}: ${v}[1])`;
  }
  const pairExpr = keyWrapper;
  const code = `[${i} for ${i}, ${v} in sorted(enumerate(${iterable}), key=${pairExpr})]`;
  return [code, Python.ORDER_ATOMIC];
};

Python.forBlock['stable_sort_info_block'] = function(block) {
  // No code emitted; informational block only.
  return '';
};

Python.forBlock['sorting_master_block'] = function(block) {
  const mode = block.getFieldValue('MODE') || 'SORTED';
  const target = Python.valueToCode(block, 'TARGET', Python.ORDER_NONE) || '[]';
  // Optional KEY/REVERSE
  let key = null, reverse = null;
  if (block.getInput && block.getInput('KEY')) key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || null;
  if (block.getInput && block.getInput('REVERSE')) reverse = Python.valueToCode(block, 'REVERSE', Python.ORDER_NONE) || null;
  if (mode === 'SORTED') {
    let args = `${target}`;
    if (key) args += `, key=${key}`;
    if (reverse !== null) args += `, reverse=${reverse}`;
    return [`sorted(${args})`, Python.ORDER_FUNCTION_CALL];
  }
  // INPLACE
  const keyArg = key ? `key=${key}` : '';
  const revArg = reverse !== null ? `reverse=${reverse}` : '';
  const sep = keyArg && revArg ? ', ' : '';
  const argList = keyArg || revArg ? `(${keyArg}${sep}${revArg})` : '()';
  return `${target}.sort${argList === '()' ? '()' : argList}\n`;
};

// New generators
Python.forBlock['reverse_toggle_block'] = function(block) {
  const v = block.getFieldValue('VAL') === 'True' ? 'True' : 'False';
  return [v, Python.ORDER_ATOMIC];
};

Python.forBlock['key_dict_item_block'] = function(block) {
  const dictCode = Python.valueToCode(block, 'DICT', Python.ORDER_NONE) || '{}';
  const mode = block.getFieldValue('MODE') || 'KEY';
  const idx = mode === 'KEY' ? '0' : '1';
  const t = Python.nameDB_.getDistinctName('kv', 'VARIABLE');
  return [`sorted(${dictCode}.items(), key=(lambda ${t}: ${t}[${idx}]))`, Python.ORDER_FUNCTION_CALL];
};

// (Removed legacy heapq_nsmallest_block / heapq_nlargest_block; replaced by heapq_select_block)

// Consolidated heapq select
Python.forBlock['heapq_select_block'] = function(block) {
  Python.addImport('import heapq');
  const mode = block.getFieldValue('MODE') || 'NSMALLEST';
  const n = Python.valueToCode(block, 'N', Python.ORDER_NONE) || '1';
  const iterable = Python.valueToCode(block, 'ITERABLE', Python.ORDER_NONE) || '[]';
  let key = null;
  if (block.getInput && block.getInput('KEY')) key = Python.valueToCode(block, 'KEY', Python.ORDER_NONE) || null;
  const keyArg = key ? `, key=${key}` : '';
  const func = mode === 'NLARGEST' ? 'nlargest' : 'nsmallest';
  return [`heapq.${func}(${n}, ${iterable}${keyArg})`, Python.ORDER_FUNCTION_CALL];
};

// Consolidated key builder
Python.forBlock['key_builder_block'] = function(block) {
  const kind = block.getFieldValue('KIND');
  switch (kind) {
    case 'IDENTITY': {
      const v = Python.nameDB_.getDistinctName('x', 'VARIABLE');
      return [`(lambda ${v}: ${v})`, Python.ORDER_LAMBDA];
    }
    case 'LEN': return ['len', Python.ORDER_ATOMIC];
    case 'ABS': return ['abs', Python.ORDER_ATOMIC];
    case 'CMP_TO_KEY': {
      Python.addImport('from functools import cmp_to_key');
      const comp = Python.valueToCode(block, 'COMPARATOR', Python.ORDER_NONE) || 'None';
      return [`cmp_to_key(${comp})`, Python.ORDER_FUNCTION_CALL];
    }
    case 'LAMBDA': {
      const v = block.getFieldValue('VAR') || 'x';
      const expr = Python.valueToCode(block, 'EXPR', Python.ORDER_NONE) || v;
      return [`(lambda ${v}: ${expr})`, Python.ORDER_LAMBDA];
    }
    case 'ITEMGETTER': {
      Python.addImport('from operator import itemgetter');
      const indices = [];
      if (block.getInput('INDEX')) {
        indices.push(Python.valueToCode(block, 'INDEX', Python.ORDER_NONE) || '0');
      } else {
        let i = 0; while (block.getInput('INDEX' + i)) { indices.push(Python.valueToCode(block, 'INDEX' + i, Python.ORDER_NONE) || '0'); i++; }
        if (!indices.length) indices.push('0');
      }
      return [`itemgetter(${indices.join(', ')})`, Python.ORDER_FUNCTION_CALL];
    }
    case 'ATTRGETTER': {
      Python.addImport('from operator import attrgetter');
      const attrs = [];
      if (block.getInput('ATTRIBUTE')) {
        attrs.push(Python.valueToCode(block, 'ATTRIBUTE', Python.ORDER_NONE) || "'name'" );
      } else {
        let i = 0; while (block.getInput('ATTRIBUTE' + i)) { attrs.push(Python.valueToCode(block, 'ATTRIBUTE' + i, Python.ORDER_NONE) || "'name'" ); i++; }
        if (!attrs.length) attrs.push("'name'");
      }
      return [`attrgetter(${attrs.join(', ')})`, Python.ORDER_FUNCTION_CALL];
    }
  }
  return ['len', Python.ORDER_ATOMIC]; // fallback
};

import * as Blockly from 'blockly/core';
import { createPlusField } from '../../plugins/block-plus-minus/field_plus';
import { createMinusField } from '../../plugins/block-plus-minus/field_minus';

// Simple mutator template for optional KEY and REVERSE inputs.
function makeOptionalParamsMutator(kind) {
  return {
    hasKey_: false,
    hasReverse_: false,
    mutationToDom: function() {
      if (!this.hasKey_ && !this.hasReverse_) return null;
      const m = Blockly.utils.xml.createElement('mutation');
      if (this.hasKey_) m.setAttribute('key', 1);
      if (this.hasReverse_) m.setAttribute('reverse', 1);
      return m;
    },
    domToMutation: function(xml) {
      this.hasKey_ = !!parseInt(xml.getAttribute('key'), 10);
      this.hasReverse_ = !!parseInt(xml.getAttribute('reverse'), 10);
      this.updateShape_();
    },
    saveExtraState: function() {
      if (!this.hasKey_ && !this.hasReverse_) return null;
      return { hasKey: this.hasKey_, hasReverse: this.hasReverse_ };
    },
    loadExtraState: function(state) {
      this.hasKey_ = !!state.hasKey;
      this.hasReverse_ = !!state.hasReverse;
      this.updateShape_();
    },
    updateShape_: function() {
      // KEY socket
      if (this.hasKey_) {
        if (!this.getInput('KEY')) this.appendValueInput('KEY').setAlign(Blockly.ALIGN_RIGHT).appendField('key');
      } else if (this.getInput('KEY')) {
        this.removeInput('KEY');
      }
      // REVERSE socket
      if (this.hasReverse_) {
        if (!this.getInput('REVERSE')) {
          const inp = this.appendValueInput('REVERSE').setAlign(Blockly.ALIGN_RIGHT).appendField('reverse');
          // Inject shadow reverse_toggle_block
          const shadow = Blockly.utils.xml.createElement('shadow');
          shadow.setAttribute('type', 'reverse_toggle_block');
          const field = Blockly.utils.xml.createElement('field');
          field.setAttribute('name', 'VAL');
          field.textContent = 'False';
          shadow.appendChild(field);
          inp.connection.setShadowDom(shadow);
        }
      } else if (this.getInput('REVERSE')) {
        this.removeInput('REVERSE');
      }
    },
    plus: function(arg) {
      // Toggle add KEY first, then REVERSE
      if (!this.hasKey_) this.hasKey_ = true; else if (!this.hasReverse_) this.hasReverse_ = true;
      this.updateShape_();
    },
    minus: function(arg) {
      // Remove REVERSE first, then KEY
      if (this.hasReverse_) this.hasReverse_ = false; else if (this.hasKey_) this.hasKey_ = false;
      this.updateShape_();
    },
  };
}

// Blocks
Blockly.defineBlocksWithJsonArray([
  {
    type: 'sorted_block',
    message0: 'sorted %1',
    args0: [ { type: 'input_value', name: 'ITERABLE' } ],
    output: 'Array',
    inputsInline: true,
    colour: 210,
    tooltip: 'Return a new sorted list from the items in an iterable.',
    helpUrl: 'https://docs.python.org/3/library/functions.html#sorted',
    mutator: 'sorted_mutator'
  },
  {
    type: 'list_sort_block',
    message0: 'sort list %1',
    args0: [ { type: 'input_value', name: 'LIST', check: 'Array' } ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 210,
    tooltip: 'Sort the list in place.',
    helpUrl: 'https://docs.python.org/3/library/stdtypes.html#list.sort',
    mutator: 'list_sort_mutator'
  },
  {
    type: 'multi_key_sort_block',
    message0: 'multi-key sorted data %1',
    args0: [ { type: 'input_value', name: 'DATA' } ],
    output: 'Array',
    colour: '#4D6A94',
    tooltip: 'Sort DATA by multiple key expressions (tuple key). Use + to add key expressions.',
    helpUrl: 'https://docs.python.org/3/library/functions.html#sorted',
    mutator: 'multi_key_sort_mutator'
  }
  ,
  {
    type: 'reverse_view_block',
    message0: 'reverse view of sorted %1',
    args0: [ { type: 'input_value', name: 'ITERABLE' } ],
    output: 'Array',
    colour: '#4D6A94',
    tooltip: 'Return a reversed iterator over a newly sorted sequence.',
    helpUrl: 'https://docs.python.org/3/library/functions.html#sorted',
    mutator: 'reverse_view_mutator'
  }
  ,
  {
    type: 'argsort_helper_block',
    message0: 'argsort indices of %1',
    args0: [ { type: 'input_value', name: 'ITERABLE' } ],
    output: 'Array',
    colour: '#4D6A94',
    tooltip: 'Return indices that would sort the iterable.',
    helpUrl: 'https://numpy.org/doc/stable/reference/generated/numpy.argsort.html',
    mutator: 'argsort_mutator'
  }
  ,
  {
    type: 'stable_sort_info_block',
    message0: 'Python sort is stable',
    colour: '#4D6A94',
    tooltip: 'Informational block: Python sorting is stable (equal keys preserve original order).',
    helpUrl: 'https://docs.python.org/3/howto/sorting.html',
    nextStatement: null,
    previousStatement: null
  }
  ,
  {
    type: 'sorting_master_block',
    message0: 'sort mode %1 target %2',
    args0: [
      { type: 'field_dropdown', name: 'MODE', options: [[ 'sorted()', 'SORTED' ], [ 'list.sort()', 'INPLACE' ]] },
      { type: 'input_value', name: 'TARGET' }
    ],
    colour: '#4D6A94',
    tooltip: 'Unified sorting block: returns sorted(...) or performs in-place sort depending on mode.',
    helpUrl: 'https://docs.python.org/3/howto/sorting.html',
    mutator: 'sorting_master_mutator',
    extensions: ['sorting_master_shape']
  }
]);

// Attach mutators
const sortedMutator = makeOptionalParamsMutator('sorted');
const listSortMutator = makeOptionalParamsMutator('list_sort');

const helper = function() {
  const firstValueInput = this.inputList.find(inp => inp.type === Blockly.INPUT_VALUE);
  if (firstValueInput) {
    if (!this.getField('PLUS')) firstValueInput.insertFieldAt(0, createPlusField(), 'PLUS');
    if (!this.getField('MINUS')) firstValueInput.insertFieldAt(1, createMinusField(), 'MINUS');
  }
};

if (Blockly.Extensions.isRegistered('sorted_mutator')) Blockly.Extensions.unregister('sorted_mutator');
Blockly.Extensions.registerMutator('sorted_mutator', sortedMutator, helper);

if (Blockly.Extensions.isRegistered('list_sort_mutator')) Blockly.Extensions.unregister('list_sort_mutator');
Blockly.Extensions.registerMutator('list_sort_mutator', listSortMutator, helper);

// Multi-key sort mutator (adds KEY inputs KEY0, KEY1, ...)
const multiKeySortMutator = {
  keyCount_: 0,
  hasReverse_: false,
  mutationToDom: function() {
    if (!this.keyCount_ && !this.hasReverse_) return null;
    const m = Blockly.utils.xml.createElement('mutation');
    if (this.keyCount_) m.setAttribute('keys', this.keyCount_);
    if (this.hasReverse_) m.setAttribute('reverse', 1);
    return m;
  },
  domToMutation: function(xml) {
    this.keyCount_ = parseInt(xml.getAttribute('keys'), 10) || 0;
    this.hasReverse_ = !!parseInt(xml.getAttribute('reverse'), 10);
    this.updateShape_();
  },
  saveExtraState: function() {
    const s = {};
    if (this.keyCount_) s.keyCount = this.keyCount_;
    if (this.hasReverse_) s.hasReverse = true;
    return Object.keys(s).length ? s : null;
  },
  loadExtraState: function(state) {
    this.keyCount_ = state.keyCount || 0;
    this.hasReverse_ = !!state.hasReverse;
    this.updateShape_();
  },
  updateShape_: function() {
    // Remove surplus key inputs
    for (let i = this.keyCount_; this.getInput('KEY' + i); i++) {
      this.removeInput('KEY' + i);
    }
    // Add required key inputs
    for (let i = 0; i < this.keyCount_; i++) {
      if (!this.getInput('KEY' + i)) {
        this.appendValueInput('KEY' + i).appendField(i === 0 ? 'primary key' : 'key ' + (i+1));
      }
    }
    // REVERSE socket (value input expecting boolean)
    if (this.hasReverse_) {
      if (!this.getInput('REVERSE')) {
        const inp = this.appendValueInput('REVERSE').setAlign(Blockly.ALIGN_RIGHT).appendField('reverse');
        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'reverse_toggle_block');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'VAL');
        field.textContent = 'False';
        shadow.appendChild(field);
        inp.connection.setShadowDom(shadow);
      }
    } else if (this.getInput('REVERSE')) {
      this.removeInput('REVERSE');
    }
    // Insert + / - on DATA input (for adding/removing key inputs)
    const dataInput = this.getInput('DATA');
    if (dataInput && !this.getField('PLUS')) {
      dataInput.insertFieldAt(0, createPlusField(), 'PLUS');
      dataInput.insertFieldAt(1, createMinusField(), 'MINUS');
    }
  },
  plus: function() { this.keyCount_++; this.updateShape_(); },
  minus: function() {
    if (this.keyCount_ > 0) {
      this.keyCount_--;
      this.updateShape_();
    } else if (this.hasReverse_) {
      this.hasReverse_ = false;
      this.updateShape_();
    }
  }
};
if (Blockly.Extensions.isRegistered('multi_key_sort_mutator')) Blockly.Extensions.unregister('multi_key_sort_mutator');
Blockly.Extensions.registerMutator('multi_key_sort_mutator', multiKeySortMutator);

// Simple key-only mutators for reverse view & argsort (reuse optional KEY pattern)
function makeKeyOnlyMutator(inputName) {
  return {
    hasKey_: false,
    mutationToDom: function() { if (!this.hasKey_) return null; const m = Blockly.utils.xml.createElement('mutation'); m.setAttribute('key', 1); return m; },
    domToMutation: function(xml) { this.hasKey_ = !!parseInt(xml.getAttribute('key'), 10); this.updateShape_(); },
    saveExtraState: function() { return this.hasKey_ ? { hasKey: true } : null; },
    loadExtraState: function(state) { this.hasKey_ = !!state.hasKey; this.updateShape_(); },
    updateShape_: function() {
      if (this.hasKey_) { if (!this.getInput('KEY')) this.appendValueInput('KEY').appendField('key'); }
      else if (this.getInput('KEY')) this.removeInput('KEY');
      const head = this.getInput(inputName);
      if (head && !this.getField('PLUS')) {
        head.insertFieldAt(0, createPlusField(), 'PLUS');
        head.insertFieldAt(1, createMinusField(), 'MINUS');
      }
    },
    plus: function() { if (!this.hasKey_) { this.hasKey_ = true; this.updateShape_(); } },
    minus: function() { if (this.hasKey_) { this.hasKey_ = false; this.updateShape_(); } }
  };
}
const reverseViewMutator = makeKeyOnlyMutator('ITERABLE');
const argsortMutator = makeKeyOnlyMutator('ITERABLE');
if (Blockly.Extensions.isRegistered('reverse_view_mutator')) Blockly.Extensions.unregister('reverse_view_mutator');
Blockly.Extensions.registerMutator('reverse_view_mutator', reverseViewMutator);
if (Blockly.Extensions.isRegistered('argsort_mutator')) Blockly.Extensions.unregister('argsort_mutator');
Blockly.Extensions.registerMutator('argsort_mutator', argsortMutator);

// Sorting master block mutator (optional KEY & REVERSE similar to earlier optional params)
const sortingMasterMutator = makeOptionalParamsMutator('sorting_master');
if (Blockly.Extensions.isRegistered('sorting_master_mutator')) Blockly.Extensions.unregister('sorting_master_mutator');
Blockly.Extensions.registerMutator('sorting_master_mutator', sortingMasterMutator, helper);

// Dynamic shape extension for sorting_master_block (value vs statement)
if (Blockly.Extensions.isRegistered('sorting_master_shape')) {
  Blockly.Extensions.unregister('sorting_master_shape');
}
Blockly.Extensions.register('sorting_master_shape', function() {
  const update = () => {
    const mode = this.getFieldValue('MODE');
    if (mode === 'SORTED') {
      // Ensure output exists
      if (!this.outputConnection) this.setOutput(true, 'Array');
      if (this.previousConnection) this.setPreviousStatement(false);
      if (this.nextConnection) this.setNextStatement(false);
    } else {
      // INPLACE: statement shape
      if (this.outputConnection) this.setOutput(false);
      if (!this.previousConnection) this.setPreviousStatement(true);
      if (!this.nextConnection) this.setNextStatement(true);
    }
    this.render && this.render();
  };
  this.setOnChange(function(e) {
    if (!e || e.type !== Blockly.Events.BLOCK_CHANGE) return;
    if (e.name === 'MODE' && e.blockId === this.id) update();
  });
  update();
});

// New: reverse_toggle_block (boolean True/False)
Blockly.defineBlocksWithJsonArray([
  {
    type: 'reverse_toggle_block',
    message0: 'reverse %1',
    args0: [ { type: 'field_dropdown', name: 'VAL', options: [[ 'False', 'False' ], [ 'True', 'True' ]] } ],
    output: 'Boolean',
    colour: '#4D6A94',
    tooltip: 'Toggle ascending/descending order.',
    helpUrl: 'https://docs.python.org/3/howto/sorting.html'
  }
]);

// New: key_dict_item_block (sort dict by key or value)
Blockly.defineBlocksWithJsonArray([
  {
    type: 'key_dict_item_block',
    message0: 'sorted dict %1 by %2',
    args0: [
      { type: 'input_value', name: 'DICT' },
      { type: 'field_dropdown', name: 'MODE', options: [[ 'Key', 'KEY' ], [ 'Value', 'VALUE' ]] }
    ],
    output: 'Array',
    colour: '#4D6A94',
    tooltip: 'Sort dictionary by key or value returning list of (key, value) tuples.',
    helpUrl: 'https://docs.python.org/3/library/stdtypes.html#dict.items'
  }
]);

// New: heapq nsmallest / nlargest with optional KEY
// (Removed legacy heapq_nsmallest_block / heapq_nlargest_block)

// (Removed legacy itemgetter/attrgetter mutators; key_builder_block handles these)

// Consolidated key builder block to minimize redundancy across key_* blocks
Blockly.defineBlocksWithJsonArray([
  {
    type: 'key_builder_block',
    message0: 'key %1',
    args0: [
      { type: 'field_dropdown', name: 'KIND', options: [
        [ 'identity (lambda x: x)', 'IDENTITY' ],
        [ 'len', 'LEN' ],
        [ 'abs', 'ABS' ],
        [ 'itemgetter', 'ITEMGETTER' ],
        [ 'attrgetter', 'ATTRGETTER' ],
        [ 'cmp_to_key', 'CMP_TO_KEY' ],
        [ 'lambda', 'LAMBDA' ]
      ]}
    ],
    output: null,
    colour: '#4D6A94',
    tooltip: 'Build a sort key function: identity/len/abs/itemgetter/attrgetter/cmp_to_key/lambda.',
    helpUrl: 'https://docs.python.org/3/howto/sorting.html',
    mutator: 'key_builder_mutator'
  }
]);

// Mutator/extension for key_builder_block
const keyBuilderMutator = {
  count_: 1, // for multi index/attribute when applicable
  mutationToDom: function() {
    const m = Blockly.utils.xml.createElement('mutation');
    m.setAttribute('count', this.count_);
    return m;
  },
  domToMutation: function(xml) {
    this.count_ = parseInt(xml.getAttribute('count'), 10) || 1;
    this.updateShape_();
  },
  saveExtraState: function() { return { count: this.count_ }; },
  loadExtraState: function(state) { this.count_ = state.count || 1; this.updateShape_(); },
  updateShape_: function() {
    const kind = this.getFieldValue('KIND');
    // Clear dynamic inputs
    const inputNames = ['EXPR','COMPARATOR','INDEX','ATTRIBUTE'];
    for (const name of inputNames) {
      if (this.getInput(name)) this.removeInput(name);
      let i = 0; while (this.getInput(name + i)) { this.removeInput(name + i); i++; }
    }
    if (this.getField('VAR')) this.removeField('VAR');

    // Build according to kind
    if (kind === 'LAMBDA') {
      this.appendDummyInput().appendField('lambda').appendField(new Blockly.FieldTextInput('x'), 'VAR').appendField(':');
      this.appendValueInput('EXPR');
    } else if (kind === 'CMP_TO_KEY') {
      this.appendValueInput('COMPARATOR').appendField('of');
    } else if (kind === 'ITEMGETTER') {
      if (this.count_ <= 1) {
        this.appendValueInput('INDEX').appendField('index');
      } else {
        for (let i = 0; i < this.count_; i++) {
          this.appendValueInput('INDEX' + i).appendField(i === 0 ? 'index' : 'index ' + (i+1));
        }
      }
      const first = this.getInput('INDEX') || this.getInput('INDEX0');
      if (first && !this.getField('PLUS')) {
        first.insertFieldAt(0, createPlusField(), 'PLUS');
        first.insertFieldAt(1, createMinusField(), 'MINUS');
      }
    } else if (kind === 'ATTRGETTER') {
      if (this.count_ <= 1) {
        this.appendValueInput('ATTRIBUTE').appendField('attribute');
      } else {
        for (let i = 0; i < this.count_; i++) {
          this.appendValueInput('ATTRIBUTE' + i).appendField(i === 0 ? 'attribute' : 'attribute ' + (i+1));
        }
      }
      const first = this.getInput('ATTRIBUTE') || this.getInput('ATTRIBUTE0');
      if (first && !this.getField('PLUS')) {
        first.insertFieldAt(0, createPlusField(), 'PLUS');
        first.insertFieldAt(1, createMinusField(), 'MINUS');
      }
    }
    // LEN, ABS, IDENTITY require no extra inputs
  },
  plus: function() {
    // Only meaningful for ITEMGETTER/ATTRGETTER
    const kind = this.getFieldValue('KIND');
    if (kind === 'ITEMGETTER' || kind === 'ATTRGETTER') {
      this.count_++;
      this.updateShape_();
    }
  },
  minus: function() {
    const kind = this.getFieldValue('KIND');
    if ((kind === 'ITEMGETTER' || kind === 'ATTRGETTER') && this.count_ > 1) {
      this.count_--;
      this.updateShape_();
    }
  }
};
if (Blockly.Extensions.isRegistered('key_builder_mutator')) Blockly.Extensions.unregister('key_builder_mutator');
Blockly.Extensions.registerMutator('key_builder_mutator', keyBuilderMutator, function() {
  // Listen for mode changes to rebuild shape
  this.setOnChange((e) => {
    if (e && e.type === Blockly.Events.BLOCK_CHANGE && e.blockId === this.id && e.name === 'KIND') {
      // Reset count on change to avoid stale inputs
      this.count_ = 1;
      this.updateShape_();
    }
  });
});

// Consolidated heapq select block
Blockly.defineBlocksWithJsonArray([
  {
    type: 'heapq_select_block',
    message0: '%1 %2 from %3',
    args0: [
      { type: 'field_dropdown', name: 'MODE', options: [[ 'n smallest', 'NSMALLEST' ], [ 'n largest', 'NLARGEST' ]] },
      { type: 'input_value', name: 'N' },
      { type: 'input_value', name: 'ITERABLE' }
    ],
    output: 'Array',
    colour: '#4D6A94',
    tooltip: 'Select N smallest or largest elements using heapq.',
    helpUrl: 'https://docs.python.org/3/library/heapq.html',
    mutator: 'heapq_select_mutator'
  }
]);
const heapqSelectMut = makeKeyOnlyMutator('ITERABLE');
if (Blockly.Extensions.isRegistered('heapq_select_mutator')) Blockly.Extensions.unregister('heapq_select_mutator');
Blockly.Extensions.registerMutator('heapq_select_mutator', heapqSelectMut);


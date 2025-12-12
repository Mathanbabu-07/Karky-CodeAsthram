import * as Blockly from 'blockly';
import { createPlusField } from '../../plugins/block-plus-minus/field_plus';
import { createMinusField } from '../../plugins/block-plus-minus/field_minus';
Blockly.defineBlocksWithJsonArray([
  {
    'type': 'data_structures_seq_concat',
    'message0': 'concatenate sequences %1 and %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'A',
        'check': [
          'Array',
          'Tuple'
        ],
        'colour': '#3A8A9E'
      },
      {
        'type': 'input_value',
        'name': 'B',
        'check': [
          'Array',
          'Tuple'
        ]
      }
    ],
    'output': 'Array',
    'colour': '#3A8A9E',
    'tooltip': 'Concatenates two sequences (lists or tuples).'
  },
  {
    'type': 'data_structures_seq_repeat',
    'message0': 'repeat sequence %1 %2 times',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SEQ',
        'check': [
          'Array',
          'Tuple'
        ],
        'colour': '#3A8A9E'
      },
      {
        'type': 'input_value',
        'name': 'TIMES',
        'check': 'Number'
      }
    ],
    'output': 'Array',
    'colour': '#3A8A9E',
    'tooltip': 'Repeats a sequence a number of times.'
  },
  {
    'type': 'data_structures_seq_slice_step',
    'message0': 'slice of %1 from %2 to %3 with step %4',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SEQ',
        'check': [
          'Array',
          'Tuple'
        ],
        'colour': '#3A8A9E'
      },
      {
        'type': 'input_value',
        'name': 'START',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'END',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'STEP',
        'check': 'Number'
      }
    ],
    'output': 'Array',
    'colour': '#3A8A9E',
    'tooltip': 'Creates a slice with a custom step.'
  },
  {
    'type': 'data_structures_seq_sorted_by',
    'message0': 'sort %1 by key %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SEQ',
        'check': [
          'Array',
          'Tuple'
        ],
        'colour': '#3A8A9E'
      },
      {
        'type': 'input_value',
        'name': 'KEY'
      }
    ],
    'output': 'Array',
    'colour': '#3A8A9E',
    'tooltip': 'Sorts a sequence using a key function.'
  },
  {
    'type': 'data_structures_seq_zip',
    'message0': 'zip sequences %1',
    'args0': [{
        'type': 'input_dummy',
        'name': 'EMPTY',
        'colour': '#3A8A9E'
      }],
    'output': 'Array',
    'colour': '#3A8A9E',
    'mutator': 'data_structures_seq_zip_mutator',
    'tooltip': 'Zips multiple sequences together.'
  },
  {
    'type': 'data_structures_seq_transpose',
    'message0': 'transpose %1',
    'args0': [{
        'type': 'input_value',
        'name': 'SEQ',
        'check': [
          'Array',
          'Tuple'
        ],
        'colour': '#3A8A9E'
      }],
    'output': 'Array',
    'colour': '#3A8A9E',
    'tooltip': 'Transposes a list of lists (matrix).'
  },
  {
    'type': 'data_structures_seq_chunk',
    'message0': 'chunk %1 into size %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SEQ',
        'check': [
          'Array',
          'Tuple'
        ],
        'colour': '#3A8A9E'
      },
      {
        'type': 'input_value',
        'name': 'SIZE',
        'check': 'Number'
      }
    ],
    'output': 'Array',
    'colour': '#3A8A9E',
    'tooltip': 'Splits a sequence into chunks of a given size.'
  },
  {
    'type': 'data_structures_seq_window',
    'message0': 'sliding window over %1 size %2 step %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'SEQ',
        'check': [
          'Array',
          'Tuple'
        ],
        'colour': '#3A8A9E'
      },
      {
        'type': 'input_value',
        'name': 'SIZE',
        'check': 'Number'
      },
      {
        'type': 'input_value',
        'name': 'STEP',
        'check': 'Number'
      }
    ],
    'output': 'Array',
    'colour': '#3A8A9E',
    'tooltip': 'Creates a sliding window over a sequence.'
  }
]);
const seqZipMutator = {
  itemCount_: 2,
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },
  saveExtraState: function () {
    return { itemCount: this.itemCount_ };
  },
  loadExtraState: function (state) {
    this.updateShape_(state['itemCount']);
  },
  updateShape_: function (targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
    this.updateMinus_();
  },
  plus: function () {
    this.addPart_();
    this.updateMinus_();
  },
  minus: function () {
    if (this.itemCount_ > 0) {
      this.removePart_();
      this.updateMinus_();
    }
  },
  addPart_: function () {
    if (this.itemCount_ === 0) {
      this.removeInput('EMPTY');
      this.topInput_ = this.appendValueInput('ADD0').appendField('zip sequences');
      this.topInput_.appendField(createPlusField(), 'PLUS');
    } else {
      this.appendValueInput('ADD' + this.itemCount_);
    }
    this.itemCount_++;
  },
  removePart_: function () {
    if (this.itemCount_ === 0)
      return;
    this.itemCount_--;
    this.removeInput('ADD' + this.itemCount_);
    if (this.itemCount_ === 0) {
      this.topInput_ = this.appendDummyInput('EMPTY').appendField('zip sequences').appendField(createPlusField(), 'PLUS');
    }
  },
  updateMinus_: function () {
    const minusField = this.getField('MINUS');
    if (this.topInput_) {
      if (!minusField && this.itemCount_ > 0) {
        this.topInput_.insertFieldAt(1, createMinusField(), 'MINUS');
      } else if (minusField && this.itemCount_ === 0) {
        this.topInput_.removeField('MINUS');
      }
    }
  }
};
const seqZipHelper = function () {
  this.getInput('EMPTY').appendField('zip sequences');
  this.getInput('EMPTY').appendField(createPlusField(), 'PLUS');
  this.updateShape_(2);
};
Blockly.Extensions.registerMutator('data_structures_seq_zip_mutator', seqZipMutator, seqZipHelper);
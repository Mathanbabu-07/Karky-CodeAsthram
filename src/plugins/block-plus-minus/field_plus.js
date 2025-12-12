/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A field for a plus button used for mutation.
 */
'use strict';

import * as Blockly from 'blockly';
import {getExtraBlockState} from './serialization_helper';

/**
 * Creates a plus image field used for mutation.
 * @param {Object=} args Untyped args passed to block.minus when the field
 *     is clicked.
 * @returns {Blockly.FieldImage} The Plus field.
 */
export function createPlusField(args = undefined) {
  const plus = new Blockly.FieldImage(plusImage, 15, 15, undefined, onClick_);
  /**
   * Untyped args passed to block.plus when the field is clicked.
   * @type {?(Object|undefined)}
   * @private
   */
  plus.args_ = args;
  return plus;
}

/**
 * Calls block.plus(args) when the plus field is clicked.
 * @param {!Blockly.FieldImage} plusField The field being clicked.
 * @private
 */
function onClick_(plusField) {
  // Defer mutation to the next tick to avoid interfering with the active
  // pointer/gesture lifecycle (prevents "gesture started twice" issues).
  const block = plusField.getSourceBlock();
  if (block.isInFlyout) return;

  const mutate = () => {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(block);
    if (typeof block.plus === 'function') {
      block.plus(plusField.args_);
    }
    const newExtraState = getExtraBlockState(block);
    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          block,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
    // Re-render to ensure inputs/fields are positioned correctly after mutation.
    if (block.render) block.render();
  };

  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    window.requestAnimationFrame(mutate);
  } else {
    setTimeout(mutate, 0);
  }
}

// A valid Base64 data URI for a white plus icon.
const plusImage =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTkgMTNoLTZ2NmgtMnYtNkg1di0yaDZWN2gydjZoNnYyeiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=';

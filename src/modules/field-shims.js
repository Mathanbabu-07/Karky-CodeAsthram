import * as Blockly from 'blockly';
// Import the official multiline field and register it under both the
// modern and legacy registry keys. This file is intended to be imported
// before any blocks are defined so registration is guaranteed.
import * as FieldPkg from '@blockly/field-multilineinput';

const FieldMultilineInput = FieldPkg.FieldMultilineInput || FieldPkg.default || FieldPkg;
// Debug info to help track why registry lookups may fail at runtime.
// This prints the package's exported keys and the resolved field constructor type.
// If you still see registry errors, paste this output here.
try {
  // eslint-disable-next-line no-console
  console.debug('field-shims: @blockly/field-multilineinput exports:', FieldPkg && Object.keys(FieldPkg));
  // eslint-disable-next-line no-console
  console.debug('field-shims: resolved FieldMultilineInput type:', typeof FieldMultilineInput);
} catch (e) {
  // ignore
}

if (FieldMultilineInput) {
  try {
    if (!Blockly.fieldRegistry.get('field_multilineinput')) {
      Blockly.fieldRegistry.register('field_multilineinput', FieldMultilineInput);
    }
    if (!Blockly.fieldRegistry.get('field_multilinetext')) {
      Blockly.fieldRegistry.register('field_multilinetext', FieldMultilineInput);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.debug('field-shims: failed to register FieldMultilineInput:', e && e.message ? e.message : e);
  }
} else {
  // eslint-disable-next-line no-console
  console.debug('field-shims: @blockly/field-multilineinput did not export a field class.');
}

# Risk analysis

## High

- `modules/initializer.js` registers a Blockly field without importing `Blockly`; verify immediately in a browser.
- The editor continuously emits Python even after Java/JavaScript selection; XML/new/template paths also regenerate Python.
- Remote execution trusts an external API and displays `output_html`; execution sandboxing and HTML sanitization are security-critical.
- XML templates/tutorials are tightly coupled to custom types/input names and have no version or validation.
- `pandas/blocks.js` is 2,245 lines; custom block and generator coverage is not automatically tested.

## Medium

- Duplicate startup imports and global singleton generators make import order behavior fragile.
- Toolbox categories, theme styles, icons and registration use the same string names in separate sources.
- Theme tooling reads browser DOM at module evaluation; SSR/test portability is low.
- Load clears current data before compatibility validation; save strips IDs/coordinates by design, reducing fidelity.
- Tutorial key handling can react outside a focused panel; action XML errors are logged rather than presented.

## Low

- Stale README, unused/legacy components/themes and zero-byte placeholder files increase ambiguity.
- No dedicated storage/session manager is integrated despite component names.

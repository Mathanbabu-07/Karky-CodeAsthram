# Technical debt

1. Side-effect modules, globals, and string-typed contracts replace explicit interfaces.
2. Python is duplicated across UI, generator, content, styles, images, events, and execution.
3. The two toolbox representations (`suites.js`, legacy backup/XML helpers) create maintenance drift.
4. Huge heterogeneous files (`pandas/blocks.js`, `original_suites_backup.js`, `Toolbar.jsx`, tutorials) have low modification safety.
5. No test, lint, format, type-check, or CI scripts exist.
6. Package dependencies include parsers/CSV packages whose application use should be audited; README mentions an unavailable Lucide dependency.
7. Both `blockly` and `blockly/core` are used, increasing upgrade ambiguity.

Prioritize contracts and tests over adding new target languages.

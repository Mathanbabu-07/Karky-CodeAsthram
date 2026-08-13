# Dependency graph

## Runtime graph

```text
main.jsx
 ├─ modules/initializer.js ──> modules/** (Blockly block registrations)
 │                            └─ generators/python/** (some direct registrations)
 ├─ utils/theme.js
 └─ App.jsx
    ├─ toolbox/toolbox.jsx ──> toolbox/suites.js
    │                           └─ themes/{toolboxTheme,glassHorizonTheme}
    ├─ BlocklyEditor ──> Blockly + plugins + Python generator + themes
    ├─ Toolbar ──> LanguageSelector + theme utility
    ├─ CodePanel ──> Prism + Axios -> execution API
    ├─ TemplatesList ──> templates/index.js -> raw XML
    └─ TutorialController ──> tutorialActions -> Blockly XML/actions
```

## Generator graph

```text
Blockly block type
  -> module definition (Blockly.Blocks[type])
  -> toolbox suite entry (discoverability)
  -> target adapter: Python.forBlock[type] / Java.forBlock[type]
  -> generator workspaceToCode
  -> CodePanel/download/remote run
```

There is no enforced graph edge from block definition to generator handler or toolbox entry. Missing one yields a runtime-visible but late failure (unknown block, absent toolbox entry, or invalid/empty code).

## Bottlenecks and cycles

- `modules/initializer.js` is the highest fan-out registration bottleneck.
- `toolbox/suites.js` feeds toolbox and themes; metadata edits can affect both behavior and visual styles.
- `App.jsx` is the orchestration bottleneck and owns cross-cutting concerns.
- Python generator files and block files form a logical circular dependency through shared type strings, but not an ES import cycle. This implicit string contract is more fragile than an explicit schema.
- `glassHorizonTheme -> suites -> React icon imports` makes a Blockly theme depend on React catalog data.
- No direct ES-module import cycles were observed in the primary startup chain; dynamic/global coupling prevents static analysis from proving correctness.

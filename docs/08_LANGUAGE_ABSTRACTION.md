# Language abstraction audit

## Hard-coded locations

| Location | Python coupling | Required abstraction |
|---|---|---|
| `App.jsx` | default language, fallback generators, XML/template/load/new regeneration, filenames | `LanguageDescriptor.generate`, `fileExtension`, workspace compatibility policy |
| `BlocklyEditor.jsx` | always imports/calls Python generator and dispatches Python theme event | target-aware generator adapter and generic theme event |
| `CodePanel.jsx` | Python Prism grammar, icon, text, run endpoint semantics | highlighter/icon/runner capability per language |
| `generators/python.js`, `generators/python/**` | singleton Python emitter/syntax/imports | generator adapters from shared semantic blocks |
| `modules/**` | Python labels, default values, library/API block types | declarative semantic schema + target-specific presentation/translation |
| `toolbox/suites.js` | Python library categories/type set | language package manifests with availability/compatibility |
| templates/tutorials | Python project XML/tutorial text | `language`, schema version, requirements, migration transform |
| theme names/assets/events | `python-*` palette keys, `py.*`, `python-pop-theme-change` | neutral brand/theme identifiers |
| `python/blocks_runtime.py`, proxy | Python runtime/executor | separate execution adapters and security policies |

## Abstraction rule

Never let a UI language switch directly select globals. It should select a validated descriptor with generator, toolbox modules, syntax highlighting, execution policy, download settings, block support predicate, templates/tutorials, and migrations. Blocks should state either a target-independent semantic operation or target-specific identity; they must not pretend to be shared merely because the same Blockly type is reused.

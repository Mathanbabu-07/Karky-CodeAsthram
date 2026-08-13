# CodeAsthram project overview

## Scope and audit basis

CodeAsthram is a Vite single-page application that presents a Blockly workspace, continuously converts the workspace to source code, and provides Python-oriented learning content. This audit inspected the 334 repository files present on 2026-08-01, excluding installed third-party `node_modules`. Binary assets were inventory-inspected; source, configuration, markup, styles, XML, Python, and content files were read as project inputs.

The only implementation added by this task is this documentation set. No production behavior was changed.

## Product capabilities

- React 19 application shell, toolbar, Blockly canvas, overlay code panel, templates, and tutorials.
- Blockly v12 custom block registration through side-effect imports and a manually curated toolbox.
- Python is the actual primary target: `blockly/python` plus many custom `forBlock` generators.
- Java has a partial custom generator and selector entry, but the block catalog, execution UI, highlighting, templates, and import/load paths remain Python-centric.
- JavaScript appears in the language selector/toolbox shape but has no project generator or implementation.
- XML save/load, PNG workspace capture, browser download, and optional remote Python execution are browser-side workflows.

## Runtime boundary

```text
Browser
  React -> Blockly workspace -> Blockly/Python generator -> CodePanel
                              -> XML save/load / template XML / tutorial actions
                              -> html-to-image PNG
  CodePanel -> POST /api/run and /api/input -> external Python execution service
```

The repository does not contain that execution service. `python/blocks_runtime.py` is a helper library for a Python runtime, not an HTTP server.

## Implementation status

| Area | Status | Evidence |
|---|---|---|
| Python blocks and generation | substantial but inconsistent | `src/modules`, `src/generators/python*` |
| Java generation | partial/prototype | `src/generators/java*`; eagerly imported in `App.jsx` |
| JavaScript generation | absent | selector/toolbox names only |
| Tests/lint/CI | absent | `package.json` has build/dev/preview/start only |
| Persistent workspace storage | absent | XML download/upload only |
| Backend execution | external dependency | `CodePanel.jsx`, `vite.config.mjs` |

## Architectural conclusion

The app has the necessary conceptual seams for a multi-language platform (language state, module suite arrays, toolbox selection, independent generator folders), but those seams are not a registry. The current implementation is an import-order-driven Python application with a partially overlaid language switch. Refactor the registration and language descriptor architecture before completing Java or beginning JavaScript.

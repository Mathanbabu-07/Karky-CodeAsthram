# Python implementation blueprint

## Target setup

`src/generators/python.js` imports `pythonGenerator` from `blockly/python`, loads custom emitter modules, adds Python-specific reserved words/helpers, and publishes the generator as `globalThis.Python`. Each domain generator assigns functions to `Python.forBlock[blockType]`. Generators use Blockly precedence constants plus `valueToCode` and `statementToCode`, accumulating imports/helper definitions in the generator's definition stores.

## Participating layers

```text
modules/** (register Python-oriented block shapes)
  + toolbox/suites.js (exposes blocks in categories)
  + generators/python/** (emit Python syntax/imports)
  + generators/python.js (assembles Python singleton)
  -> BlocklyEditor/App (workspaceToCode)
  -> CodePanel (Prism Python / .py download / run API)
  -> python/blocks_runtime.py (optional helper APIs available to runner)
```

## Coverage by concern

| Concern | Blocks/generators |
|---|---|
| Core syntax | essentials text/numbers/logic/variables/lists/dicts/sets/tuples, `python/{essentials,text,variables,math,control,structures}` |
| Flow/functions/exceptions | control computation modules, `python/control.js`, `tools.js`, `special_blocks.js` |
| OOP | essentials OOP modules, `python/oop.js`, `oop_extended.js` |
| Imports/system/files | imports/system/filesystem/storage/networking generators and corresponding modules |
| Standard libraries | datetime, itertools, re, json, argparse, logging, unittest, turtle, collections, sqlite3 |
| Third-party libraries | pandas, numpy, matplotlib, seaborn, sklearn, TensorFlow, Torch, OpenCV, Pillow, Requests, FastAPI, Pydantic, SQLAlchemy, BeautifulSoup, Transformers |
| Specialty | automation/devops, concurrency, media, security, enterprise/data science |

## Python-only assumptions

Python spelling/syntax occurs in block labels/default fields, `Python.forBlock`, `globalThis.Python`, `.py` filename, Prism Python grammar, `AlivePythonIcon`, running the generated source via Python API, template/tutorial block XML, imports, indentation, `None`, tuples, comprehensions, `self`, decorators, `asyncio`, `turtle`, and Python library categories. Shared-looking categories therefore are not automatically portable.

## Runtime helper library

`python/blocks_runtime.py` contains execution helpers for optional modules (data structures, regex, itertools, OS/path, pandas/numpy/ML/plotting, Pillow, BeautifulSoup and more). It defensively imports optional packages in many places, but no versioned dependency manifest or server integration is supplied. Treat it as a distinct Python runtime package, with compatibility tests against generated code.

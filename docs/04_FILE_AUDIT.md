# File audit

## Reading convention and scores

All files in the inventory were inspected. The compact records below apply the following fields: **D** dependencies, **I/O** importing/exporting or external interaction, **C** complexity, **Coupling**, **Reuse**, **Safety**, **Language**, and **Migration**. Scores use 1 (low)–5 (high); safety is safe-to-modify, while migration is difficulty. `P` means Python-assuming and must become language-neutral when its feature is shared.

## Application, UI, configuration, and utilities

| File(s) | Purpose / internal logic / D and I/O | C / Coupling / Reuse / Safety / Language / Migration | Improvement |
|---|---|---|
| `index.html`, `public/index.html` | HTML entry documents; root mount/static fallback. Imported by Vite/browser. | 1/1/2/5/neutral/1 | Maintain one authoritative entry page. |
| `src/main.jsx` | Initializes block side effects and theme, mounts App. D: React, initializer, theme. | 2/4/1/3/P/3 | Make startup registry explicit and idempotent. |
| `src/App.jsx` | Application coordinator: workspace/code/language state, XML IO, templates, tutorials, downloads, screenshot. D: UI, toolbox, global Blockly/generators. | 5/5/2/2/P/5 | Split workspace service, language service, and modal state; remove Python hard-coding. |
| `src/config.js` | Feature flags. Exported configuration. | 1/2/3/5/neutral/1 | Use typed per-language capability flags. |
| `src/boards/profiles.js` | Board choices/default metadata. Exported to App/BoardSelector. | 2/2/3/4/neutral/2 | Connect selection to Blockly configuration or remove dead UI. |
| `src/components/BlocklyEditor.jsx` | Injects/disposes Blockly and plugins; debounced code generation/theme/icon hooks. D: Blockly/plugins/theme/utils. | 5/5/2/2/P/5 | Receive a language adapter and generation callback; avoid prototype patching. |
| `src/components/Toolbar.jsx`, `Toolbar.css` | Toolbar controls, logo, animated canvas, theme/language/menu events. | 5/3/2/3/mostly neutral/3 | Extract animation; use semantic command registry. |
| `src/components/CodePanel.jsx`, `src/CodePanel.css`, `AlivePythonIcon.jsx`, `AlivePythonIcon.css` | Read-only Prism Python editor, copy/download/run, remote execution session/input UX, Python icon. | 5/5/2/2/P/5 | Use language highlighter/runner descriptors; sanitize output and make protocol versioned. |
| `src/components/LanguageSelector.jsx`, `.css` | Controlled selector for Python/Java/JavaScript. | 1/2/4/5/neutral/2 | Drive options from registry/capabilities. |
| `src/components/BoardSelector.jsx`, `FundamentalsModeToggle.jsx`, `.css`, `SessionManager.jsx`, `.css`, `DashboardLayout.jsx` | Small/legacy UI components; some are not mounted by App. | 1–2/1/2/4/mixed/2 | Remove or integrate; Dashboard calls an absent/obsolete toolbox API. |
| `src/components/Tooltip.jsx`, `.css` | Tooltip presentation. | 1/1/4/5/neutral/1 | Prefer shared accessible tooltip behavior. |
| `src/components/modals/CodeExecutionModal.jsx`, `InputPromptModal.jsx` | Execution and input modal rendering. | 2/2/3/4/neutral/2 | Contract-test modal data; do not render untrusted HTML unsafely. |
| `src/components/modals/TemplatesList.jsx` | Search/filter/paginate in-bundle template catalog. D: Framer Motion, Fuse-like local filtering, templates. | 4/3/3/3/P metadata/3 | Add language/required-block compatibility. |
| `src/components/tutorials/TutorialController.jsx`, `TutorialStep.jsx`, `TutorialControls.jsx`, `TutorialsList.jsx` | Tutorial chooser/progress/panel; applies imperative workspace steps. | 3/4/3/3/P content/4 | Schema-validate steps and scope keyboard shortcut listener. |
| `src/utils/theme.js`, `colorUtils.js`, `toolboxIconInjector.js` | DOM/localStorage theme switching, color math, MutationObserver toolbox icon placement. | 2/3/3/3/neutral/3 | Namespace events and avoid DOM-selector coupling. |
| `src/utils/tutorialActions.js`, `tutorialManager.js` | XML block insertion/connection/actions and JSON tutorial import/export; manager is a small tutorial helper. | 3/4/3/3/P block XML/4 | Validate XML/action schemas, IDs, and connection types. |
| `src/modules/screenshot.js` | Captures visible workspace via html-to-image and download. | 4/3/3/3/neutral/2 | Test large workspaces/CORS assets; expose errors to UI. |
| `src/assets/iconMap.js`, `src/search/index.json` | Icon mapping and static search data. | 1/2/3/4/mixed/2 | Generate from catalog to prevent drift. |

## Blockly registration and plugin records

Each file below registers Blockly definitions through import side effects; its export surface is normally empty. D is `blockly`/`blockly/core`, plus listed local mutator fields where present. Consumers are `modules/initializer.js` and, indirectly, `BlocklyEditor`.

| Files (each independently audited) | Responsibility / language / risk / migration |
|---|---|
| `src/modules/initializer.js`, `field-shims.js` | Master registration import list and multiline-field compatibility. **P**, C5/coupling5/reuse1/safety1/migration5. It references `Blockly.fieldRegistry` without importing Blockly: probable startup failure unless a non-module global happens to exist. Replace with explicit `registerBlocks(language)` functions. |
| `src/modules/essentials/{text,numbers,lists,tuples,sets,dicts,variables,logic,logging,definitions,mutators,tooltips,list_operations,dict_operations,imports,oop,oop_extended,builtin_methods,special_blocks,sorting,list_advanced}.js` | Largest core catalog: literals, collections, names, operators, logging, imports, OOP, mutation and Python conveniences. P or pseudo-universal; C2–5/coupling4/safety2/migration5. Several share plus/minus fields. Split semantic block schemas from Python labels/defaults. |
| `src/modules/control_computation/{conditionals,loops,functions,comprehensions,adv_math,error_handling}.js` | Flow/function/comprehension/error blocks. Comprehensions and Python-style exception behavior are P; others require cross-target semantic contracts. C3–4/coupling4/safety2/migration5. |
| `src/modules/data_structures/{sequences,mappings,records,immutable,registry}.js` | Advanced structural/data blocks. P defaults and mutators; C2–4/coupling3/safety3/migration4. Model immutable/record differences per target. |
| `src/modules/{core_fundamentals,strings_text_processing,math_numeric,control_flow_logic,variables_basic_types,lists_sequences,tuples_structs,dicts_maps,loops_iteration,functions_callables,iterators_generators,concurrency_parallelism,async_networking,filesystem_io,serialization_data,databases_persistence,logging_monitoring,testing_quality,collections,datetime,itertools,requests,re,pillow,beautifulsoup,unittest,argparse,sqlalchemy}/definitions.js` and `src/modules/{core_fundamentals/builtins,math_numeric/builtins,control_flow_logic/assert,async_networking/http,requests/blocks,fastapi/{blocks,definitions},json/blocks,pydantic/blocks}.js` | Secondary/overlapping block-definition taxonomy. Most assume Python library names and syntax. C1–4/coupling3–4/safety2–3/migration4–5. Consolidate into library manifests and eliminate duplicate domain families. |
| `src/modules/{io_formats/{file_system,data_formats,streams,serialization},integration_networking/{http_client,websockets,messaging,sockets,utils},storage_persistence/{local_db,cache,orm,persistence_utils},concurrency_async/{threading,asyncio,queues,scheduling},automation_devops/{shell,ssh,containers,helpers},system/{os,sys,io,pathlib},graphics/turtle}.js` | Python standard-library/domain blocks; import-less side effects. P, C2–4/coupling3/safety3/migration4. Represent as optional language library packages. |
| `src/modules/{pandas,numpy,matplotlib,seaborn,sklearn,tensorflow,torch,cv2,transformers}/blocks.js` | Third-party Python science/ML block libraries. `pandas/blocks.js` is 2,245 lines: C5/coupling5/reuse1/safety1/P/migration5. Break into feature files and test fixtures. |
| `src/modules/media_perception/{image,audio_video,cv_ocr,nlp}.js`, `security_keys/{hashing,jwt,encryption}.js`, `tools_testing/{testing,logging,profiling,cli}.js`, `enterprise_specialty/{erp_crm,robotics,finance}.js`, `turtle/blocks.js` | Optional Python-specialty blocks. C2–4/coupling3/safety3/P/migration4. Put behind library capability descriptors. |
| `src/plugins/block-plus-minus/{index,if,list_create,text_join,field_plus,field_minus,serialization_helper}.js` | Dynamic-shape block mutations and extra-state serialization. D: Blockly, fields. C4/coupling5/reuse4/safety2/semantic but P labels/migration4. Convert to reusable Blockly extension package with tests. |
| `src/plugins/custom-toolbox/CustomCollapsibleCategory.js` | Custom Blockly toolbox category. C2/coupling4/reuse3/safety3/neutral/migration2. Keep renderer behavior separate from language data. |

## Generator records

| Files (each independently audited) | Responsibility / scores / migration |
|---|---|
| `src/generators/python.js` | Imports custom Python emitters, adds reserved words/helpers, exposes `globalThis.Python`. C4/coupling5/reuse1/safety2/P/migration5. It omits several generator files that exist, while initializer imports some directly. |
| `src/generators/python/{argparse,automation_devops,beautifulsoup,builtin_methods,builtins,collections,concurrency,control,cv2,datasci,datetime,enterprise,essentials,fastapi,filesystem,graphics,itertools,json,list_advanced,logging,math,matplotlib,media,networking,numpy,oop,oop_extended,pandas,pillow,pydantic,re,requests,seaborn,security,sklearn,sorting,special_blocks,sqlalchemy,sqlite3,storage,structures,system,tensorflow,text,tools,torch,transformers,turtle,unittest,variables}.js` | Per-domain assignments to Blockly's singleton `pythonGenerator.forBlock`, typically using `valueToCode`, `statementToCode`, `definitions_`, and order constants. C1–5/coupling4–5/reuse2/safety2/P/migration5. Split syntax-independent IR from per-target printers; replace private generator maps with documented helpers. |
| `src/generators/java.js` | Instantiates Java generator by extending/using Blockly JavaScript generator machinery, exposes global Java. C3/coupling5/reuse2/safety2/Java/migration4. Name/order/backend assumptions need formalization. |
| `src/generators/java/{builtins,blockly_natives,text,math,logic,loops,control,variables,functions,lists,collections,oop}.js` | Partial Java mappings for native/custom blocks. C2–4/coupling4/safety2/Java/migration4. Must be checked against every shared block and Java compilation tests before claiming support. |

## Toolbox, themes, content, styles, and assets

| Files (each independently audited) | Responsibility / risk / improvement |
|---|---|
| `src/toolbox/suites.js`, `toolbox.jsx`, `xmlBuilders.js`, `index.js`, `original_suites_backup.js` | Catalog, language filter and toolbox config; XML helper/legacy backup. `suites.js` (401 lines) and 1,195-line backup are tightly coupled to type strings/icons/themes. Move to language manifests; delete/archive backup after verification. |
| `src/themes/{glassHorizonTheme,toolboxTheme,PremiumDarkTheme,EricssonBlueTheme}.js` | Blockly themes; active path is CSS-derived Glass Horizon. Other themes appear alternate/unused. Decouple category styles from suite data and centralize theme selection. |
| `src/templates/index.js` and all 20 `src/templates/*.xml` listed in `21_COMPLETE_FILE_MANIFEST.md` | Template metadata/raw workspace XML. P block IDs; C1–3/coupling4/safety3/migration5. Add version, language, required libraries, and migration transforms. |
| `src/tutorials/index.js` | Four in-code Python tutorial objects with action XML. C4/coupling4/safety2/P/migration5. Externalize/version content and validate actions. |
| `src/styles.css`, `src/styles/{toolbox,custom-accordion,templates,tutorials,theme_variables}.css`, component CSS files | Global and component styling; CSS custom properties drive theme. C1–4/coupling3/safety3/neutral/migration2. Adopt naming/layer conventions and reduce global selectors. |
| `python/blocks_runtime.py`, `python/README.md` | Python execution helper functions/brief runtime doc. C5/coupling3/safety2/P/migration3. Package/version dependencies and test against generator output. |
| `vite.config.mjs`, `package.json`, `package-lock.json`, `.env.local`, `.env.production`, `.gitignore`, `README.md` | Build, proxy/CSP/dependency/environment and onboarding configuration. C1–3/coupling2–4/safety3/neutral/migration2. `.env*` values are environment-specific; avoid committing secrets. README is stale (mentions Lucide/`blocks/`). |
| `public/assets/icons/*.svg`, `public/media/*`, `public/{codeasthram.png,favicon.ico}`, root logo PNGs, `src/assets/{code_favicon_1.png,Logic.png,py.svg,py.gif}`, `arduino-blockly-builder@1.0.0`, `vite` | Icons/media/cursors/audio/branding and zero-byte placeholder files. Binary/static, C1/coupling1–2/reuse2/safety4. Keep only referenced assets; remove/track placeholders intentionally. |

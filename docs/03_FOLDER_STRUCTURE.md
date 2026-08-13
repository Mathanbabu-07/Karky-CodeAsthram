# Folder structure

```text
.
├─ src/
│  ├─ main.jsx, App.jsx                 startup and application orchestration
│  ├─ components/                       React UI and modal/tutorial components
│  ├─ modules/                          Blockly custom-block definitions
│  ├─ generators/                       Python and partial Java emitters
│  ├─ toolbox/                          module-suite catalog and toolbox builder
│  ├─ themes/, styles/, utils/          presentation and browser helpers
│  ├─ templates/, tutorials/            in-bundle learning content
│  ├─ plugins/                          custom Blockly extensions
│  ├─ boards/, assets/, search/         board metadata, visuals, static index
├─ python/                              runtime helper functions for executed Python
├─ public/                              served Blockly media and product assets
├─ package.json, vite.config.mjs        build/dependency/server configuration
└─ docs/                                architecture audit (this deliverable)
```

`modules/` is organized both by broad domains (`essentials`, `control_computation`, `io_formats`) and by named libraries (`pandas`, `numpy`, `requests`). The two schemes overlap. A module normally registers block JSON/init functions through side effects; it is not a React module and it is not necessarily a one-to-one match with a generator file.

`toolbox/suites.js` is a user-facing catalog of block types. It is the current source of toolbox grouping and theming names, not a reliable capability registry: some entries are language-specific, shared blocks encode Python syntax, and registration/generation coverage must be validated separately.

# Architecture

## Startup and rendering flow

```text
index.html (#root)
  -> src/main.jsx
     -> static module registration: modules/initializer.js
     -> initTheme()
     -> ReactDOM.createRoot(...).render(<App />)
        -> App owns code, workspace, modal, tutorial, and selected-language state
           -> Toolbar
           -> BlocklyEditor (injects one Blockly workspace)
           -> CodePanel
           -> optional TutorialController / TutorialsList / TemplatesList
```

`main.jsx` imports the initializer before React renders. The initializer is a large side-effect import hub; its imports call Blockly APIs to register custom blocks. `App.jsx` redundantly imports several registries/generators, including the Java generator files. `BlocklyEditor` injects the workspace once (`useEffect([])`), so changing `toolboxConfig` props does not itself reinject/update the workspace; App separately calls `workspace.updateToolbox` after a language change.

## Blockly lifecycle

1. Static imports register fields, custom blocks, mutators, Python generators, and Java generator handlers.
2. `BlocklyEditor` sets English Blockly messages, makes compatibility monkey patches to `Workspace.prototype`, builds a CSS-derived Blockly theme, and calls `Blockly.inject`.
3. The editor installs Workspace Search, Zoom-to-Fit, Backpack, custom toolbox category behavior, icon injection, a resize handler, and a theme-change handler.
4. Every workspace change schedules Python generation after 80 ms. It calls `globalThis.Python.workspaceToCode`, regardless of selected language.
5. App retains the workspace reference; its language effect can regenerate via `globalThis.Python`, `Java`, or `JavaScript` and update the toolbox.
6. Cleanup disposes plugins/workspace and listeners on editor unmount.

## State and event ownership

| State / event | Owner | Consumers | Concern |
|---|---|---|---|
| `mainWorkspace` | App | file/template/tutorial handlers, language effects | state holds mutable third-party object |
| generated code | App | CodePanel/download | two competing generation paths |
| selected language | App | Toolbar/toolbox/generator/download | editor listener ignores it |
| editor internal workspace | BlocklyEditor ref | Blockly plugins | not exposed through a stable controller |
| theme | DOM `data-theme` + localStorage | theme utility, Toolbar, editor | DOM event coupling |
| tutorials/templates | local React state | modal/controller | no persistence/validation |

## Storage, import/export, and screenshot

- Save: App serializes `Blockly.Xml.workspaceToDom`, clones it, strips namespaces/block IDs/coordinates, pretty-prints, downloads `workspace.xml`.
- Load: App parses a file with `DOMParser`, clears and loads XML, then regenerates **Python** code after 100 ms.
- Templates: raw XML modules are imported by `templates/index.js`; App loads one through `Blockly.Xml.clearWorkspaceAndLoadFromXml`.
- Tutorials: JSON-like in-code objects encode XML snippets and imperative action steps, applied directly to the live workspace.
- Screenshot: `modules/screenshot.js` uses `html-to-image` to render the Blockly container and excludes the code panel.

## Theme lifecycle

`utils/theme.js` reads/writes `localStorage`, sets `data-theme`, and dispatches `python-pop-theme-change`. `glassHorizonTheme.js` rebuilds Blockly theme data from CSS variables and suite metadata; the editor receives the custom event and calls `workspace.setTheme`. The event name is product/language-specific and should be renamed.

## Core design constraints

- Registration is side-effect and global (`Blockly.Blocks`, generator instances, `globalThis`). It is order-sensitive and difficult to isolate or test.
- Workspace XML identifies blocks, not language semantics. A language switch can expose an incompatible toolbox while retaining old blocks.
- Browser code execution is not sandboxed by the frontend; safe execution depends entirely on the remote service.

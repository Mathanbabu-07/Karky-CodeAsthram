# Blockly architecture

## Definitions and registration

Custom blocks reside in `src/modules/**` and call Blockly registration APIs when imported. `modules/initializer.js` statically imports them. Core blocks come from `blockly/blocks`. The field shim registers `field_multilineinput`; plus/minus plugins implement dynamic inputs and extra-state serializers.

Block discovery is independent: `toolbox/suites.js` stores category/module objects with type strings. `toolbox/toolbox.jsx` turns them into Blockly JSON toolbox entries, using a manually generated category and block style name.

## Connections, fields, mutation, serialization

- Blocks declare statement, previous/next, output, and typed input connections in their individual definition files.
- Native Blockly field types and custom multiline/plus/minus fields appear throughout.
- Dynamic lists, text joins, if branches, loops, tuples, functions and similar blocks rely on mutation/extra state. `plugins/block-plus-minus/serialization_helper.js` is critical to preserving shape through XML.
- Workspace export/import uses Blockly XML; templates/tutorial XML uses exact block type, input, field, and mutation names. These strings are API contracts.
- No centralized validation verifies that an XML document references registered blocks or that a block is legal for selected language.

## Events/plugins

`BlocklyEditor` subscribes to all workspace changes for debounced generation and to window resize/theme events. It installs Workspace Search, Zoom To Fit, Backpack, toolbox-search, and a custom collapsible category. Icon insertion observes Blockly-generated toolbox DOM via `MutationObserver`.

## Risks

1. Blockly is used through `blockly`, `blockly/core`, globals, and compatibility monkey patches; normalize to one API boundary.
2. `initializer.js` has a missing Blockly import at its multiline field registration line.
3. Custom fields/mutations lack serialized fixture tests.
4. Toolboxes can display type strings that did not register, and target generators can lack handlers.
5. XML load clears a workspace before proving the imported document is compatible.

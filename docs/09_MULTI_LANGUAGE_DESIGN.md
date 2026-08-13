# Multi-language design

Use a language registry as the only language-selection surface:

```ts
LanguageDescriptor = {
  id, displayName, fileExtension, generator, highlighter, runner,
  modules, supportsBlock(type), workspacePolicy, templates, tutorials,
  migrations, reservedWords, libraryPackages
}
```

At startup, register only block schemas and target adapters. A schema declares semantic inputs/outputs and an optional support matrix. Target adapters generate source, imports, helper declarations and packaging metadata. Toolbox building filters descriptors by `supportsBlock`; it never relies on a switch statement.

On language change, choose one explicit policy: preserve only compatible blocks and report unsupported ones; create a translated workspace; or require a new workspace. Do not silently keep a Python workspace while showing a Java toolbox.

Use a serialized workspace envelope rather than bare XML:

```json
{ "format": 1, "language": "python", "blockSet": "core@1", "workspaceXml": "..." }
```

Preserve XML internally if desired, but validate the envelope before clearing the current workspace.

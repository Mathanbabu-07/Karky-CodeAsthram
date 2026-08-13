# Shared language engine

## Proposed ownership model

```text
BlockSchemaRegistry       semantic IDs, inputs, types, shape/mutation
LanguageRegistry          descriptor lookup and capabilities
GeneratorRegistry         semantic ID -> target printer
LibraryRegistry           packages, imports, blocks, target support
ToolboxRegistry           category metadata independent of React icons
ContentRegistry           versioned templates/tutorials by language
WorkspaceService          serialize/validate/migrate/load/clear transactionally
ExecutionRegistry         endpoint/sandbox protocol by language/runtime
ThemeRegistry             brand + category style mapping
```

Adapters should return a structured generation result (`source`, `imports`, `helpers`, `diagnostics`, `requirements`) before assembling final source. This makes Java package/class wrapping, JavaScript module mode, and Python imports explicit and testable.

Use IDs such as `core.text.concat` instead of emergent names like `essentials_*`; retain legacy Blockly types via migration aliases. The user-facing toolbox category can map one semantic operation to a target-specific block presentation where direct sharing is misleading.

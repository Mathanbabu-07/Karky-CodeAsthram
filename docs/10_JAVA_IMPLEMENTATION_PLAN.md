# Java implementation plan

## Foundation phases

1. **Contract audit (high difficulty):** classify every current block as semantic-shared, Python-only, Java-only, or unsupported. Compile a handler-coverage matrix; do not expose Java until complete for the supported core.
2. **Generator foundation (high):** replace global Java generator with a `JavaAdapter`; define precedence, escaped strings, reserved words, declarations, imports, package/class wrapper and one entry-point policy.
3. **Core language (high):** variables/types, operators, branching, loops, functions/methods, arrays/`ArrayList`, strings, I/O, exceptions, classes/constructors/inheritance/interfaces/enums/access modifiers.
4. **Type system (high):** choose typed versus beginner inference blocks, generic parameters, `null`, primitive/wrapper mapping, casts, overload constraints, and diagnostics.
5. **JDK packages (medium/high):** `java.util` collections/streams/optional, time, files/NIO, regex, networking, concurrency/executors, JSON strategy, testing and logging. Make each an optional package manifest.
6. **Advanced Java (high):** lambdas/method references, streams, annotations, records/sealed types if target JDK permits, modules only if a packaging model needs them.
7. **Content/runtime (medium):** Java templates, tutorials, Prism grammar, `.java` download, build/run adapter with sandboxed compiler/JRE.
8. **Quality (high):** golden generated-source tests, `javac` compile tests, behavior tests, XML migration tests and accessibility review.

## Folder target

```text
src/languages/java/{descriptor,generator,syntax,libraries,templates,tutorials,migrations}.ts
src/blocks/{core,java}/
```

Current `src/generators/java*` is useful reference material but should be moved behind this contract after tests establish its supported subset.

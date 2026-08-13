# JavaScript implementation plan

1. Define target modes: browser ESM, Node ESM, and optionally CommonJS; make mode a project setting, not a hidden generator choice.
2. Implement descriptor/generator with precedence, strict escaping, reserved names, semicolons/style policy, `let`/`const`, undefined/null, arrays/objects/Map/Set, classes, destructuring, spread/rest, arrow functions/closures, modules, JSON, errors and async/await/Promises.
3. Separate browser packages (DOM, events, fetch, storage, canvas) from Node packages (fs, path, HTTP, process). The toolbox must expose only compatible modules.
4. Design callback/event blocks and asynchronous control flow explicitly; never map Python synchronous blocks mechanically to promises.
5. Add JavaScript templates/tutorials with language-tagged workspace envelopes and highlight via Prism JavaScript.
6. Add a sandboxed runner appropriate to the selected mode, then golden source and runtime tests.

Difficulty is high because JavaScript's dynamic semantics differ sharply from Python and Java. Begin with a documented core subset, not feature-parity with the current Python library catalog.

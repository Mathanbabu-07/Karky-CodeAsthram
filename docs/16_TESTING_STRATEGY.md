# Testing strategy

- Unit-test every block schema/mutator serialization and each target generator handler with table-driven input/output fixtures.
- Add a manifest test: every toolbox type exists, every supported type has a target handler, every template/tutorial type is registered, and every required library is declared.
- Snapshot workspace envelopes/XML after migration; test malformed XML is rejected without clearing current workspace.
- Integration-test workspace inject/dispose, language switches, theme changes, toolbox updates, plugin initialization, XML save/load, screenshot failures, and tutorial navigation.
- Compile generated Java with `javac`; parse/run JavaScript in chosen environments; execute Python in an isolated test runtime.
- Mock the execution API; add contract tests for `/run` and `/input`; test untrusted HTML output handling.
- Add Playwright accessibility tests for keyboard, modal focus, responsive overlay behavior, and screen-reader labels.
- CI should run format/lint/type checking, unit tests, production build, dependency audit, and representative browser tests.

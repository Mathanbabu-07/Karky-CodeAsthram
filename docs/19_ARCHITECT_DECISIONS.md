# Architecture decisions

## ADR-001: Adopt registry-based language descriptors

**Decision:** Replace language switches/globals with a descriptor registry. **Why:** a target requires more than a generator: toolbox, highlighting, runtime, files, content and compatibility all vary. **Status:** proposed.

## ADR-002: Preserve Blockly XML but wrap it in versioned metadata

**Decision:** Use an envelope with language/blockset/version. **Why:** raw XML cannot state compatibility or support migrations. **Status:** proposed.

## ADR-003: Separate semantic blocks from target syntax

**Decision:** only genuinely common concepts share schemas; target-specific features remain target-specific. **Why:** prevents Python semantics leaking into Java/JavaScript. **Status:** proposed.

## ADR-004: Treat execution as a security boundary

**Decision:** runners are capability-specific, remote output is untrusted, and backend sandboxing is mandatory. **Status:** required before broader execution support.

## ADR-005: Establish coverage tests before feature parity work

**Decision:** prevent a toolbox entry, block registration and generator handler from drifting. **Status:** highest implementation priority.

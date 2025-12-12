# Schema Mismatch Report

**Audit Date:** 2025-10-31

This report documents the inconsistencies found between the project's block definitions (`src/modules/`) and the requirements of the project templates.

| Block Type | Mismatch Type | Severity | Description | Required Action |
| :--- | :--- | :--- | :--- | :--- |
| `text_format` | **Missing Mutator** | **Critical** | The block definition lacks the mutator logic required to dynamically add `VAR#` inputs. | Modify `src/modules/essentials/text.js` to add the `text_format_mutator` extension. |
| `essentials_list_create`| **Missing Mutator** | **Critical** | The block definition lacks the mutator logic to dynamically add `ITEM#` inputs. | Modify `src/modules/essentials/lists.js` to add the `essentials_list_create_mutator` extension. |
| `essentials_list_set` | **Missing Field** | **Critical** | The block definition does not have a `WHERE` field to specify the position of the set operation (e.g., `'LAST'` for append). | Modify the block definition in `src/modules/essentials/lists.js` to include the `WHERE` dropdown field. |
| `control_try_except`| **Missing Input** | **Major** | The block definition only has a `TRY` input. The `EXCEPT` input is missing. | Modify the block definition in `src/modules/control_computation/error_handling.js` to include the `EXCEPT` statement input. |
| `tuples_count` | **Missing Block** | **Critical** | The entire block is missing from the project. | Create the block definition in `src/modules/essentials/tuples.js`, the generator in `src/generators/python/essentials.js`, and register it in `src/toolbox/suites.js`. |
| `control_math_stats` | **Invalid Field Value** | **Major** | The dropdown options in the block definition are uppercase, but the XML requires lowercase. | No fix needed in the block definition, but the XML must be corrected to use lowercase values (`min`, `max`, `average`). |
| `math_single` | **Invalid Field Value** | **Major** | The dropdown options in the block definition are uppercase, and the XML is correct. | No fix needed. |

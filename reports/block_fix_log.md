# Block Fix Log

**Date:** 2025-10-31

This report documents the repairs made to the project's block definitions to bring them into compliance with the schema requirements.

| Block Name | File Modified | Action Taken |
| :--- | :--- | :--- |
| `text_format` | `src/modules/essentials/text.js` | Added the `text_format_mutator` extension to dynamically handle `VAR#` inputs. |
| `essentials_list_create`| `src/modules/essentials/lists.js` | Added the `essentials_list_create_mutator` extension to dynamically handle `ITEM#` inputs. |
| `essentials_list_set` | `src/modules/essentials/lists.js` | Modified the block definition to include a `WHERE` dropdown field, enabling append functionality. |
| `control_try_except`| `src/modules/control_computation/error_handling.js` | Modified the `init` function to include both `TRY` and `EXCEPT` statement inputs. |
| `tuples_count` | `src/modules/essentials/tuples.js` | **Created new block.** Added the full JSON definition for the missing `tuples_count` block. |
| `tuples_count` | `src/generators/python/essentials.js`| **Created new generator.** Added the Python generator for the new `tuples_count` block. |
| `tuples_count` | `src/toolbox/suites.js` | **Registered new block.** Added the `tuples_count` block to the "Tuples" category in the "Essentials" suite. |

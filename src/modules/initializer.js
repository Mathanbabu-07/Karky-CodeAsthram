// This file will be populated with the new Python modules.
// Import shims first so field registrations happen before any block definitions.
import './field-shims.js';
import './essentials/text.js';
import './essentials/numbers.js';
import './essentials/lists.js';
import './essentials/tuples.js';
import './essentials/sets.js';
import './essentials/dicts.js';
import './essentials/variables.js';
import './essentials/logic.js';
import './essentials/logging.js';
import './essentials/definitions.js';
import './essentials/mutators.js';
import './essentials/tooltips.js';
import './essentials/list_operations.js';
import './essentials/dict_operations.js';
import './essentials/imports.js';

import './data_structures/sequences.js';
import './data_structures/mappings.js';
import './data_structures/records.js';
import './data_structures/immutable.js';
import './data_structures/registry.js';

import './essentials/sorting.js';
import '../generators/python/sorting.js';

import './control_computation/conditionals.js';
import './control_computation/loops.js';
import './control_computation/functions.js';
import './control_computation/comprehensions.js';
import './control_computation/adv_math.js';
import './control_computation/error_handling.js';

import './text_localization/core_text.js';
import './text_localization/regex.js';
import './text_localization/templating.js';
import './text_localization/i18n.js';
import './text_localization/text_utils.js';

import './io_formats/file_system.js';
import './io_formats/data_formats.js';
import './io_formats/streams.js';
import './io_formats/serialization.js';

import './integration_networking/http_client.js';
import './integration_networking/websockets.js';
import './integration_networking/messaging.js';
import './integration_networking/sockets.js';
import './integration_networking/utils.js';

import './storage_persistence/local_db.js';
import './storage_persistence/cache.js';
import './storage_persistence/orm.js';
import './storage_persistence/persistence_utils.js';

import './concurrency_async/threading.js';
import './concurrency_async/asyncio.js';
import './concurrency_async/queues.js';
import './concurrency_async/scheduling.js';

import './automation_devops/shell.js';
import './automation_devops/ssh.js';
import './automation_devops/containers.js';
import './automation_devops/helpers.js';

import './pandas/blocks.js';
import './numpy/blocks.js';
import './matplotlib/blocks.js';
import './seaborn/blocks.js';
import './sklearn/blocks.js';
import './tensorflow/blocks.js';
import './torch/blocks.js';
import './cv2/blocks.js';
import './transformers/blocks.js';
import './requests/blocks.js';
import './fastapi/blocks.js';
import './json/blocks.js';

import './media_perception/image.js';
import './media_perception/audio_video.js';
import './media_perception/cv_ocr.js';
import './media_perception/nlp.js';

import './security_keys/hashing.js';
import './security_keys/jwt.js';
import './security_keys/encryption.js';

import './tools_testing/testing.js';
import './tools_testing/logging.js';
import './tools_testing/profiling.js';
import './tools_testing/cli.js';

import './enterprise_specialty/erp_crm.js';
import './enterprise_specialty/robotics.js';
import './enterprise_specialty/finance.js';

import './core_fundamentals/builtins.js';
import './core_fundamentals/definitions.js';
import './strings_text_processing/definitions.js';
import './math_numeric/definitions.js';
import './control_flow_logic/assert.js';
import './control_flow_logic/definitions.js';
import './variables_basic_types/definitions.js';
import './lists_sequences/definitions.js';
import './tuples_structs/definitions.js';
import './dicts_maps/definitions.js';
import './loops_iteration/definitions.js';
import './functions_callables/definitions.js';
import './iterators_generators/definitions.js';
import './concurrency_parallelism/definitions.js';
import './async_networking/definitions.js';
import './async_networking/http.js';
import './filesystem_io/definitions.js';
import './serialization_data/definitions.js';
import './databases_persistence/definitions.js';
import './logging_monitoring/definitions.js';
import './testing_quality/definitions.js';
import './collections/definitions.js';
import './datetime/definitions.js';
import './itertools/definitions.js';
import './requests/definitions.js';
import '../generators/python/requests.js';
import './fastapi/definitions.js';
import '../generators/python/fastapi.js';
import './sqlalchemy/definitions.js';
import '../generators/python/sqlalchemy.js';
import '../generators/python/builtins.js';
import '../generators/python/sqlite3.js';
import './re/definitions.js';
import './pillow/definitions.js';
import './beautifulsoup/definitions.js';
import './unittest/definitions.js';
import './argparse/definitions.js';

import '../generators/python/text.js';
import '../generators/python/variables.js';
import '../generators/python/comprehensions.js';
import '../generators/python/system.js';
import '../generators/python/argparse.js';

import './system/os.js';
import './system/sys.js';
import './system/io.js';
import './system/pathlib.js';
import './graphics/turtle.js';

import '../generators/python/oop.js';
import './essentials/oop.js';

import './turtle/blocks.js';
import '../generators/python/turtle.js';
import '../generators/python/automation_devops.js';

import {FieldMultilineInput} from '@blockly/field-multilineinput';

Blockly.fieldRegistry.register('field_multilineinput', FieldMultilineInput);

export const initializeAllModules = () => {
  // All modules are imported statically, so this function is just a placeholder
  // to make sure the imports are not tree-shaken away.
};

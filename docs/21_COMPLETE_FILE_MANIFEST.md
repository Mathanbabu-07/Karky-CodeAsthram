# Complete audited file manifest

This is the path-level index for the audit snapshot. Every listed source/content/static file was inspected; file-specific architectural assessment is in [04_FILE_AUDIT.md](04_FILE_AUDIT.md), where records are grouped only when files have the same implementation role and dependency pattern. Output documentation itself is excluded from its own audit.

## Root and public

` .env.local`, `.env.production`, `.gitignore`, `arduino-blockly-builder@1.0.0`, `CodeAsthram_full_logo.png`, `CodeAsthram_short_logo.png`, `index.html`, `package.json`, `package-lock.json`, `README.md`, `task.md`, `vite`, `vite.config.mjs`.

`public/codeasthram.png`, `public/favicon.ico`, `public/index.html`.

`public/assets/icons/automation_devops.svg`, `concurrency_async.svg`, `control_computation.svg`, `data_structures.svg`, `database.svg`, `essentials.svg`, `image_manipulation.svg`, `io_formats.svg`, `matplotlib.svg`, `networking.svg`, `numpy.svg`, `opencv.svg`, `pandas.svg`, `pytorch.svg`, `scikit_learn.svg`, `standard_library.svg`, `tensorflow.svg`, `text_localization.svg`, `tools_testing.svg`, `transformers.svg`, `web.svg`, `web_scraping.svg`, `web_server.svg`.

`public/media/1x1.gif`, `click.mp3`, `click.ogg`, `click.wav`, `delete.mp3`, `delete.ogg`, `delete.wav`, `delete-icon.svg`, `disconnect.mp3`, `disconnect.ogg`, `disconnect.wav`, `dropdown-arrow.svg`, `foldout-icon.svg`, `handclosed.cur`, `handdelete.cur`, `handopen.cur`, `pilcrow.png`, `quote0.png`, `quote1.png`, `resize-handle.svg`, `sprites.png`, `sprites.svg`.

## Application, components, styles, assets and configuration

`src/main.jsx`, `src/App.jsx`, `src/config.js`, `src/AlivePythonIcon.css`, `src/CodePanel.css`, `src/styles.css`.

`src/components/AlivePythonIcon.jsx`, `BlocklyEditor.jsx`, `BoardSelector.jsx`, `CodePanel.jsx`, `DashboardLayout.jsx`, `FundamentalsModeToggle.jsx`, `FundamentalsModeToggle.css`, `LanguageSelector.jsx`, `LanguageSelector.css`, `SessionManager.jsx`, `SessionManager.css`, `Toolbar.jsx`, `Toolbar.css`, `Tooltip.jsx`, `Tooltip.css`.

`src/components/modals/CodeExecutionModal.jsx`, `InputPromptModal.jsx`, `TemplatesList.jsx`.

`src/components/tutorials/TutorialController.jsx`, `TutorialControls.jsx`, `TutorialsList.jsx`, `TutorialStep.jsx`.

`src/styles/custom-accordion.css`, `templates.css`, `theme_variables.css`, `toolbox.css`, `tutorials.css`.

`src/assets/code_favicon_1.png`, `iconMap.js`, `Logic.png`, `py.gif`, `py.svg`; `src/boards/profiles.js`; `src/search/index.json`.

## Utilities, themes, toolbox and plugins

`src/utils/colorUtils.js`, `theme.js`, `toolboxIconInjector.js`, `tutorialActions.js`, `tutorialManager.js`.

`src/themes/EricssonBlueTheme.js`, `glassHorizonTheme.js`, `PremiumDarkTheme.js`, `toolboxTheme.js`.

`src/toolbox/index.js`, `original_suites_backup.js`, `suites.js`, `toolbox.jsx`, `xmlBuilders.js`.

`src/plugins/block-plus-minus/field_minus.js`, `field_plus.js`, `if.js`, `index.js`, `list_create.js`, `serialization_helper.js`, `text_join.js`; `src/plugins/custom-toolbox/CustomCollapsibleCategory.js`.

## Generators

`src/generators/python.js`, `src/generators/java.js`.

`src/generators/java/blockly_natives.js`, `builtins.js`, `collections.js`, `control.js`, `functions.js`, `lists.js`, `logic.js`, `loops.js`, `math.js`, `oop.js`, `text.js`, `variables.js`.

`src/generators/python/argparse.js`, `automation_devops.js`, `beautifulsoup.js`, `builtin_methods.js`, `builtins.js`, `collections.js`, `concurrency.js`, `control.js`, `cv2.js`, `datasci.js`, `datetime.js`, `enterprise.js`, `essentials.js`, `fastapi.js`, `filesystem.js`, `graphics.js`, `itertools.js`, `json.js`, `list_advanced.js`, `logging.js`, `math.js`, `matplotlib.js`, `media.js`, `networking.js`, `numpy.js`, `oop.js`, `oop_extended.js`, `pandas.js`, `pillow.js`, `pydantic.js`, `re.js`, `requests.js`, `seaborn.js`, `security.js`, `sklearn.js`, `sorting.js`, `special_blocks.js`, `sqlalchemy.js`, `sqlite3.js`, `storage.js`, `structures.js`, `system.js`, `tensorflow.js`, `text.js`, `tools.js`, `torch.js`, `transformers.js`, `turtle.js`, `unittest.js`, `variables.js`.

## Blockly module definitions

`src/modules/initializer.js`, `field-shims.js`, `screenshot.js`.

`src/modules/argparse/definitions.js`; `async_networking/definitions.js`, `async_networking/http.js`; `automation_devops/containers.js`, `helpers.js`, `shell.js`, `ssh.js`; `beautifulsoup/definitions.js`; `collections/definitions.js`.

`src/modules/concurrency_async/asyncio.js`, `queues.js`, `scheduling.js`, `threading.js`; `concurrency_parallelism/definitions.js`; `control_computation/adv_math.js`, `comprehensions.js`, `conditionals.js`, `error_handling.js`, `functions.js`, `loops.js`; `control_flow_logic/assert.js`, `definitions.js`; `core_fundamentals/builtins.js`, `definitions.js`; `cv2/blocks.js`.

`src/modules/data_structures/immutable.js`, `mappings.js`, `records.js`, `registry.js`, `sequences.js`; `databases_persistence/definitions.js`; `datetime/definitions.js`; `dicts_maps/definitions.js`; `enterprise_specialty/erp_crm.js`, `finance.js`, `robotics.js`.

`src/modules/essentials/builtin_methods.js`, `definitions.js`, `dict_operations.js`, `dicts.js`, `imports.js`, `list_advanced.js`, `list_operations.js`, `lists.js`, `logging.js`, `logic.js`, `mutators.js`, `numbers.js`, `oop.js`, `oop_extended.js`, `sets.js`, `sorting.js`, `special_blocks.js`, `text.js`, `tooltips.js`, `tuples.js`, `variables.js`.

`src/modules/fastapi/blocks.js`, `definitions.js`; `filesystem_io/definitions.js`; `functions_callables/definitions.js`; `graphics/turtle.js`; `integration_networking/http_client.js`, `messaging.js`, `sockets.js`, `utils.js`, `websockets.js`; `io_formats/data_formats.js`, `file_system.js`, `serialization.js`, `streams.js`; `iterators_generators/definitions.js`; `itertools/definitions.js`; `json/blocks.js`; `lists_sequences/definitions.js`; `logging_monitoring/definitions.js`; `loops_iteration/definitions.js`; `math_numeric/builtins.js`, `definitions.js`.

`src/modules/matplotlib/blocks.js`; `media_perception/audio_video.js`, `cv_ocr.js`, `image.js`, `nlp.js`; `numpy/blocks.js`; `pandas/blocks.js`; `pillow/definitions.js`; `pydantic/blocks.js`; `re/definitions.js`; `requests/blocks.js`, `definitions.js`; `seaborn/blocks.js`; `security_keys/encryption.js`, `hashing.js`, `jwt.js`; `serialization_data/definitions.js`; `sklearn/blocks.js`; `sqlalchemy/definitions.js`.

`src/modules/storage_persistence/cache.js`, `local_db.js`, `orm.js`, `persistence_utils.js`; `strings_text_processing/definitions.js`; `system/io.js`, `os.js`, `pathlib.js`, `sys.js`; `tensorflow/blocks.js`; `testing_quality/definitions.js`; `text_localization/core_text.js`, `i18n.js`, `regex.js`, `templating.js`, `text_utils.js`; `tools_testing/cli.js`, `logging.js`, `profiling.js`, `testing.js`; `torch/blocks.js`; `transformers/blocks.js`; `tuples_structs/definitions.js`; `turtle/blocks.js`; `unittest/definitions.js`; `variables_basic_types/definitions.js`.

## Content and Python runtime

`src/templates/index.js`, `src/templates/aquarium_ecosystem.xml`, `digestive_path.xml`, `dna_copying_simulator.xml`, `exothermic_reaction.xml`, `guitar_string.xml`, `hydrogen_fuel_cell.xml`, `magic_square_detective.xml`, `project12_robot_arm.xml`, `project13_binary_whisper.xml`, `project14_tuple_tracker.xml`, `project15_rule_maker.xml`, `project16_vote_counter.xml`, `project17_river_journey.xml`, `project18_weather_detectives.xml`, `project19_festival_discount.xml`, `project20_smart_city_alert.xml`, `rocket_launch_height.xml`, `ropeway_ride.xml`, `speedy_science.xml`, `treasure_coordinates.xml`.

`src/tutorials/index.js`; `python/README.md`, `python/blocks_runtime.py`.

## Audit metadata

- Custom block definition files have no normal exported API: their external interaction is the global Blockly registry at module evaluation.
- Python generator files likewise export little/no normal API: they mutate the shared `pythonGenerator` handler map.
- XML templates are raw workspace documents imported as Vite `?raw` strings by `templates/index.js`.
- Static assets are browser-served or bundled visuals/media; they have no code exports.
- The zero-length root files `vite` and `arduino-blockly-builder@1.0.0` and the legacy suite backup were specifically inspected as anomalous/legacy artifacts.

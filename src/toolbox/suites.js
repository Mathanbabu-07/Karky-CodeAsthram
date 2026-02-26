import {
  PiBracketsCurly, PiTreeStructure, PiFlowArrow, PiTextT, PiFile, PiGlobe,
  PiDatabase, PiHourglass, PiRobot, PiCamera, PiKey,
  PiTestTube, PiBuildings, PiPaintBrush, PiWifiHigh, PiHardDrives,
  PiChartBar, PiFunction, PiGraph, PiBrain, PiCircuitry, PiPersonSimpleWalk
} from "react-icons/pi";
import { SiPandas, SiNumpy, SiPytorch, SiTensorflow, SiScikitlearn } from "react-icons/si";

// SECTION 2: UNIVERSAL FUNDAMENTALS (Multi-language compatible)
// These modules work across Python, Java, and JavaScript
export const UNIVERSAL_MODULES = [
  {
    name: "Text",
    icon: PiTextT,
    themeKey: "essentials",
    blocks: [
      { "type": "text_literal" },
      { "type": "text_multiline" },
      { "type": "text_concat" },
      { "type": "text_format" },
      { "type": "text_length" },
      { "type": "text_substring" },
      { "type": "text_search" },
      { "type": "text_transform" },
      { "type": "text_split_join" },
      { "type": "text_replace" },
      { "type": "text_html_transform" },
      { "type": "text_is_empty" },
      { "type": "text_newline" },
      { "type": "text_tab" },
      { "type": "text_print" },
      { "type": "text_print_fstring" },
    ],
  },
  {
    name: "Math",
    icon: PiFunction,
    themeKey: "essentials",
    blocks: [
      { type: "essentials_num_literal" },
      { type: "essentials_num_arithmetic" },
      { type: "essentials_num_neg" },
      { type: "essentials_num_abs" },
      { type: "essentials_num_round" },
      { type: "essentials_num_clamp" },
      { type: "essentials_num_compare" },
      { type: "essentials_num_min" },
      { type: "essentials_num_max" },
      { type: "essentials_num_rand_int" },
      { type: "essentials_num_rand_float" },
      { type: "essentials_expr_group" },
      { type: "math_single" },
      { type: "math_ops_multi" },
      { type: "control_math_stats" },
      { type: "control_decimal_create" },
      { type: "control_fraction_create" },
      { type: "control_complex_create" },
      { type: "control_accumulate" },
    ],
  },
  {
    name: "Logic",
    icon: PiGraph,
    themeKey: "essentials",
    blocks: [
      { type: "essentials_bool_true" },
      { type: "essentials_bool_false" },
      { type: "essentials_logic_and" },
      { type: "essentials_logic_or" },
      { type: "essentials_logic_not" },
      { type: "essentials_compare" },
      { type: "essentials_in_operator" },
      { type: "essentials_not_in_operator" },
      { type: "essentials_ternary" },
      { type: "essentials_assert" },
    ],
  },
  {
    name: "Loops",
    icon: PiHourglass,
    themeKey: "control_computation",
    blocks: [
      { type: "controls_repeat_ext" },
      { type: "controls_whileUntil" },
      { type: "controls_for" },
      { type: "controls_forEach" },
      { type: "controls_flow_statements" },
      { type: "control_for_indexed" },
      { type: "control_for_zip" },
      { type: "control_flow_break_continue" },
      { type: "control_while_true_inline" },
    ],
  },
  {
    name: "If/Else",
    icon: PiFlowArrow,
    themeKey: "control_computation",
    blocks: [
      { type: "if_block" },
      { type: "control_match" },
      { type: "control_condition_expr" },
      { type: "control_logical_combine" },
      { type: "control_if_truthy" },
      { type: "control_if_main" },
      { type: "control_pass_simple" }
    ],
  },
  {
    name: "Functions",
    icon: PiFunction,
    themeKey: "control_computation",
    blocks: [
      { type: "essentials_function_def" },
      { type: "procedures_callnoreturn" },
      { type: "procedures_callreturn" },
      { type: "control_lambda_expr" },
      { type: "control_partial_apply" },
      { type: "control_function_decorator" },
      { type: "control_function_docstring" },
      { type: "functions_callable" },
      { type: "control_return" }
    ],
  },
  {
    name: "Sorting",
    icon: PiChartBar,
    themeKey: "essentials",
    blocks: [
      { type: "sorted_block" },
      { type: "list_sort_block" },
      { type: "key_builder_block" },
      { type: "multi_key_sort_block" },
      { type: "reverse_view_block" },
      { type: "argsort_helper_block" },
      { type: "stable_sort_info_block" },
      { type: "sorting_master_block" },
      { type: "reverse_toggle_block" },
      { type: "key_dict_item_block" },
      { type: "heapq_select_block" }
    ],
  },
  {
    name: "Lists",
    icon: PiTreeStructure,
    themeKey: "essentials",
    blocks: [
      { type: "essentials_list_create" },
      { type: "essentials_list_from_range" },
      { type: "essentials_list_length" },
      { type: "essentials_list_get" },
      { type: "essentials_list_set" },
      { type: "essentials_list_statements" },
      { type: "essentials_list_expressions" },
      { type: "essentials_list_index_of" },
      { type: "essentials_list_slice" },
      { type: "essentials_list_sort" },
      { type: "essentials_list_reverse" },
      { type: "essentials_list_map" },
      { type: "essentials_list_filter" },
      { type: "essentials_list_reduce" },
      { type: "essentials_list_flatten" },
      { type: "essentials_list_unique" },
      { type: "essentials_list_chunk" },
      { type: "essentials_list_enumerate" },
      { type: "lists_shuffle_in_place" },
    ],
  },
  {
    name: "Dictionaries",
    icon: PiDatabase,
    themeKey: "essentials",
    blocks: [
      { type: "essentials_dict_create" },
      { type: "essentials_dict_statements" },
      { type: "essentials_dict_expressions" },
      { type: "essentials_dict_update" },
      { type: "essentials_dict_merge_shallow" },
      { type: "essentials_dict_deep_merge" },
      { type: "essentials_dict_get_nested" },
      { type: "essentials_registry_register" },
      { type: "essentials_registry_call" },
    ],
  },
  {
    name: "Sets",
    icon: PiCircuitry,
    themeKey: "essentials",
    blocks: [
      { type: "essentials_set_create" },
      { type: "essentials_set_add" },
      { type: "essentials_set_remove" },
      { type: "essentials_set_union" },
      { type: "essentials_set_intersection" },
      { type: "essentials_set_difference" },
      { type: "essentials_set_symmetric_difference" },
      { type: "essentials_set_contains" },
      { type: "essentials_set_is_subset" },
      { type: "essentials_set_is_superset" },
    ],
  },
  {
    name: "Variables",
    icon: PiKey,
    themeKey: "essentials",
    blocks: [
      { type: "essentials_import_simple" },
      { type: "essentials_scope_keyword" },
      { type: "essentials_var_set" },
      { type: "essentials_var_get" },
      { type: "essentials_var_undefined" },
      { type: "essentials_is_instance" },
      { type: "essentials_type_of" },
      { type: "essentials_cast" },
      { type: "essentials_default_if_none" },
    ],
  },
  {
    name: "Classes",
    icon: PiBuildings,
    themeKey: "essentials",
    blocks: [
      { type: "oop_class" },
      { type: "oop_constructor" },
      { type: "oop_method" },
      { type: "oop_super_init" },
      { type: "oop_super_call" }
    ],
  },
  {
    name: "Files",
    icon: PiFile,
    themeKey: "essentials",
    blocks: [
      { type: "essentials_log_info" },
      { type: "essentials_log_warn" },
      { type: "essentials_log_error" },
      { type: "essentials_safe_input" },
      { type: "essentials_input_raw" },
      { type: "essentials_logging_basic_config" },
    ],
  },
  {
    name: "Tools",
    icon: PiTestTube,
    themeKey: "control_computation",
    blocks: [
      { type: "control_try_except" },
      { type: "control_try_except_finally" },
      { type: "control_try_except_else_finally" },
      { type: "control_raise_exception" },
      { type: "iterators_yield" },
      { type: "iterators_yield_from" },
      { type: "iterators_generator_function" },
      { type: "iterators_safe_next" },
      { type: "iterators_generator_expression" },
    ],
  },
]; // End of UNIVERSAL_MODULES

// SECTION 3: LANGUAGE-SPECIFIC MODULES
// PYTHON-SPECIFIC MODULES (Library-dependent, Python only)
export const PYTHON_MODULES = [
  {
    name: "Graphics",
    icon: PiPaintBrush,
    themeKey: "python_graphics",
    blocks: [
      { type: "graphics_turtle_create" },
      { type: "graphics_turtle_forward" },
      { type: "graphics_turtle_backward" },
      { type: "graphics_turtle_right" },
      { type: "graphics_turtle_left" },
      { type: "graphics_turtle_penup" },
      { type: "graphics_turtle_pendown" },
      { type: "graphics_turtle_done" }
    ],
  },
  // === PYTHON-SPECIFIC LANGUAGE FEATURES ===

  // Comprehensions - Python only
  {
    name: "Comprehensions",
    icon: PiFlowArrow,
    themeKey: "control_computation",
    blocks: [
      { type: "control_list_comp" },
      { type: "control_dict_comp" },
      { type: "control_dict_zip_comp" },
      { type: "control_set_comp" },
      { type: "control_gen_expr" }
    ],
  },
  // Tuples - Python only
  {
    name: "Tuples",
    icon: PiBracketsCurly,
    themeKey: "essentials",
    blocks: [
      { type: "essentials_tuple_create" },
      { type: "essentials_tuple_from_list" },
      { type: "essentials_tuple_to_list" },
      { type: "essentials_tuple_unpack" },
      { type: "essentials_namedtuple_define" },
      { type: "essentials_dataclass_stub" },
      { type: "tuples_count" },
      { type: "tuples_index" },
    ],
  },

  // === ESSENTIAL PYTHON LIBRARIES FOR STUDENTS ===

  // Pandas - Data Analysis (essential blocks for students)
  {
    name: "Pandas",
    icon: SiPandas,
    themeKey: "python_pandas",
    blocks: [
      { type: "pandas_io_format_transfer" },
      { type: "pandas_structure_factory" },
      { type: "dataframe_peek" },
      { type: "dataframe_property_or_metadata" },
      { type: "dataframe_data_selector" },
      { type: "pandas_sort_values" },
      { type: "pandas_groupby" },
      { type: "dataframe_simple_statistic" },
      { type: "pandas_plot" },
    ],
  },
  // NumPy - Numerical Computing
  {
    name: "NumPy",
    icon: SiNumpy,
    themeKey: "python_numpy",
    blocks: [
      { type: "numpy_array" },
      { type: "numpy_arange" },
      { type: "numpy_reshape" },
      { type: "numpy_zeros" },
      { type: "numpy_ones" },
      { type: "numpy_concatenate" },
      { type: "numpy_sum" },
      { type: "numpy_mean" },
      { type: "numpy_std" },
      { type: "numpy_dot" },
    ],
  },
  // Matplotlib - Data Visualization
  {
    name: "Matplotlib",
    icon: PiGraph,
    themeKey: "python_matplotlib",
    blocks: [
      { type: "matplotlib_plot" },
      { type: "matplotlib_scatter" },
      { type: "matplotlib_bar" },
      { type: "matplotlib_hist" },
      { type: "matplotlib_pie" },
      { type: "matplotlib_show" },
      { type: "matplotlib_title" },
      { type: "matplotlib_xlabel" },
      { type: "matplotlib_ylabel" },
      { type: "matplotlib_legend" },
      { type: "matplotlib_savefig" },
    ],
  },
  // Scikit-learn - Machine Learning (basics for students)
  {
    name: "Scikit-learn",
    icon: SiScikitlearn,
    themeKey: "python_sklearn",
    blocks: [
      { type: "sklearn_train_test_split" },
      { type: "sklearn_standard_scaler" },
      { type: "sklearn_random_forest_classifier" },
      { type: "sklearn_logistic_regression" },
      { type: "sklearn_linear_regression" },
      { type: "sklearn_accuracy_score" },
      { type: "sklearn_confusion_matrix" },
      { type: "sklearn_mean_squared_error" },
    ],
  },
  // Requests - HTTP/Web (for API learning)
  {
    name: "Requests",
    icon: PiWifiHigh,
    themeKey: "python_requests",
    blocks: [
      { type: "requests_get" },
      { type: "http_request_simple" }, // Alternative simple request block
    ],
  },
];

// JAVA-SPECIFIC MODULES (To be implemented)
export const JAVA_MODULES = [];

// JAVASCRIPT-SPECIFIC MODULES (To be implemented)
export const JAVASCRIPT_MODULES = [];

// Backwards compatibility: Combine all modules for theme
// FUNDAMENTAL_MODULES = UNIVERSAL + PYTHON (for now, until we have dynamic theming)
export const FUNDAMENTAL_MODULES = [...UNIVERSAL_MODULES, ...PYTHON_MODULES];

// For the theme: wrap each module as a suite with one module inside
export const SUITES = FUNDAMENTAL_MODULES.map(module => ({
  name: module.name,
  icon: module.icon,
  themeKey: module.themeKey,
  modules: [module] // Wrap the module in an array so theme can iterate
}));




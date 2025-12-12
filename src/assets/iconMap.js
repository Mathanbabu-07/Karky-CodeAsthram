// src/assets/iconMap.js

/**
 * Maps the themeKey of each main category to its corresponding SVG icon filename.
 * The icon files are located in `public/assets/icons/`.
 * This mapping is used by the toolboxIconInjector to dynamically add icons to the UI.
 */
const iconMap = {
  essentials: 'essentials.svg',
  data_structures: 'data_structures.svg',
  control_computation: 'control_computation.svg',
  text_localization: 'text_localization.svg',
  io_formats: 'io_formats.svg',
  networking: 'networking.svg',
  web_server: 'web_server.svg',
  database: 'database.svg',
  concurrency_async: 'concurrency_async.svg',
  automation_devops: 'automation_devops.svg',
  pandas: 'pandas.svg',
  numpy: 'numpy.svg',
  matplotlib: 'matplotlib.svg',
  scikit_learn: 'scikit_learn.svg',
  tensorflow: 'tensorflow.svg',
  pytorch: 'pytorch.svg',
  transformers: 'transformers.svg',
  opencv: 'opencv.svg',
  image_manipulation: 'image_manipulation.svg',
  web: 'web.svg',
  web_scraping: 'web_scraping.svg',
  standard_library: 'standard_library.svg',
  tools_testing: 'tools_testing.svg',
  // Note: 'variables' and 'functions' are handled as special categories by Blockly
  // and do not have icons in this map.
};

export default iconMap;

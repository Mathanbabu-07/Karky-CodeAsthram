import { UNIVERSAL_MODULES, PYTHON_MODULES, JAVA_MODULES, JAVASCRIPT_MODULES } from "./suites.js";

/**
 * Creates a slug from a string for use as a theme key.
 * @param {string} str The string to slugify.
 * @returns {string} The slugified string.
 */
const slugify = (str) => str.toLowerCase().replace(/\s+/g, '_').replace(/[&/]/g, 'and');

/**
 * Get language-specific modules based on selected language
 * @param {string} language - The currently selected language ('python', 'java', 'javascript')
 * @returns {Array} Array of language-specific modules
 */
const getLanguageSpecificModules = (language) => {
  switch (language) {
    case 'python':
      return PYTHON_MODULES;
    case 'java':
      return JAVA_MODULES;
    case 'javascript':
      return JAVASCRIPT_MODULES;
    default:
      return PYTHON_MODULES; // Default to Python
  }
};

/**
 * Renders module blocks in the toolbox
 * @param {Array} modules - Array of modules to render
 * @returns {Array} Toolbox configuration for modules
 */
const renderModules = (modules) => {
  return modules.flatMap((module) => {
    const moduleSlug = slugify(module.name);
    const themeKey = module.themeKey;
    const categoryStyle = `${themeKey}_${moduleSlug}_category`;
    const blockStyle = `${themeKey}_${moduleSlug}_blocks`;

    return [
      {
        kind: "category",
        name: module.name,
        categorystyle: categoryStyle,
        "css-container": `module-${moduleSlug}`,
        contents: (module.blocks || []).map((b) => ({
          kind: "block",
          type: b.type,
          blockstyle: blockStyle,
        })),
      },
      { kind: "sep" }, // divider between categories
    ];
  });
};

// 3-Section toolbox definition
export const getToolboxConfig = (currentLanguage = 'python') => {
  const languageSpecificModules = getLanguageSpecificModules(currentLanguage);

  return {
    kind: "categoryToolbox",
    contents: [
      // ==================== SECTION 1: SEARCH + VARIABLES ====================
      {
        kind: "search",
        name: "Search",
        "css-label": "toolbox-search-label",
      },
      {
        kind: "sep",
      },
      {
        kind: "category",
        name: "Variables",
        custom: "VARIABLE",
        categorystyle: "variables_category",
      },
      {
        kind: "sep",
        "css-container": "section-divider-universal",
        "css-label": "Universal Fundamentals",
      },

      // ==================== SECTION 2: UNIVERSAL FUNDAMENTALS ====================
      ...renderModules(UNIVERSAL_MODULES),

      // ==================== SECTION 3: LANGUAGE-SPECIFIC MODULES ====================
      ...(languageSpecificModules.length > 0 ? [
        {
          kind: "sep",
          "css-container": "section-divider-language",
          "css-label": `${currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)} Libraries`,
        },
        ...renderModules(languageSpecificModules),
      ] : []),
    ],
  };
};

export const MASTER_TOOLBOX_CONFIG = getToolboxConfig(); // Default export for backwards compatibility

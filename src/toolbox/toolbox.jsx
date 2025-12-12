import { SUITES } from "./suites.js";

/**
 * Creates a slug from a string for use as a theme key.
 * @param {string} str The string to slugify.
 * @returns {string} The slugified string.
 */
const slugify = (str) => str.toLowerCase().replace(/\s+/g, '_').replace(/[&/]/g, 'and');

// Master toolbox definition using the new theme engine
export const MASTER_TOOLBOX_CONFIG = {
  kind: "categoryToolbox",
  contents: [
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
    },
    // Map over the SUITES array to create the unified toolbox structure
    ...SUITES.map((suite) => {
      const suiteThemeKey = suite.themeKey;
      const categoryStyle = `${suiteThemeKey}_category`;

      return {
        kind: "custom_collapsible_category",
        name: suite.name,
        categorystyle: categoryStyle,
        "css-container": `category-${suiteThemeKey}`,
        id: `cat_${suiteThemeKey}`,
        contents: suite.modules.flatMap((mod) => {
          const modSlug = slugify(mod.name);
          const subCategoryStyle = `${suiteThemeKey}_${modSlug}_category`;
          // This is the crucial change: define the block style on a per-submodule basis
          const subBlockStyle = `${suiteThemeKey}_${modSlug}_blocks`;

          return [
            {
              kind: "category",
              name: mod.name,
              categorystyle: subCategoryStyle,
              "css-container": `subcategory-${modSlug}`,
              contents: (mod.blocks || []).map((b) => ({
                kind: "block",
                type: b.type,
                blockstyle: subBlockStyle, // Assign the submodule-specific block style
              })),
            },
          ];
        }),
      };
    }),
  ],
};

/**
 * Generates the final toolbox configuration.
 * @returns {Object} The Blockly toolbox definition object.
 */
export const getToolboxConfig = () => {
  return MASTER_TOOLBOX_CONFIG;
};

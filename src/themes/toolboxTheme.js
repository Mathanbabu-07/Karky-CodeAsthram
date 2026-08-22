// src/themes/toolboxTheme.js
import { SUITES } from "../toolbox/suites.js";
import { adjustColor, hexToHsl } from "../utils/colorUtils.js";

// Read a CSS variable from :root and return the raw value (e.g., "#306998").
const getCssVar = (name, fallback = "") => {
  if (typeof window === "undefined" || !document?.documentElement) return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

// Choose readable text color (white vs base text) for a given hex background
const getReadableText = (bgHex) => {
  const textDefault = getCssVar("--text", "#0B1B2B");
  const textWhite = getCssVar("--text-white", "#FFFFFF");
  try {
    const { l } = hexToHsl(bgHex);
    // On darker backgrounds, prefer white text
    return l < 55 ? textWhite : textDefault;
  } catch {
    return textWhite;
  }
};

// Build a base palette from current CSS tokens with harmonic semantic distribution
const buildBasePaletteFromCss = () => {
  const primary = getCssVar("--primary-500", "#2563eb");
  const accent = getCssVar("--accent-500", "#f59e0b");

  const semanticHues = {
    essentials: '#2563eb',          // Vibrant Indigo Blue
    data_science: '#059669',        // Emerald Green
    web_dev: '#7c3aed',             // Purple Violet
    software_engineering: '#0284c7',// Sky Blue
    cloud_devops: '#d97706',        // Warm Amber
    database: '#0891b2',            // Cyan Teal
    testing: '#10b981',             // Mint Green
    advanced: '#64748b',            // Slate Grey
    variables: '#3b82f6',
    functions: '#ec4899',
    logic: '#0284c7',
    math: '#8b5cf6',
    text: '#059669',
    loops: '#d97706'
  };

  const base = {};
  const hueKeys = ['#2563eb', '#059669', '#7c3aed', '#0284c7', '#d97706', '#0891b2', '#10b981', '#ec4899'];

  SUITES.forEach((suite, idx) => {
    if (!suite || typeof suite !== 'object') return;
    const themeKey = suite.themeKey || `suite_${idx}`;
    const baseColor = semanticHues[themeKey] || hueKeys[idx % hueKeys.length];
    base[themeKey] = baseColor;
  });

  // Assign standard builtins
  Object.assign(base, semanticHues);
  base.default = primary;
  return base;
};

/**
 * A cyclical list of adjustments to apply to submodule colors.
 * This creates visual variety without being random.
 */
const submoduleAdjustments = [
  { lightness: +8, saturation: -5 },
  { lightness: -8, saturation: +5 },
  { lightness: +5, saturation: +10 },
  { lightness: -5, saturation: -10 },
];

/**
 * Generates a complete, hierarchical theme palette from a base palette.
 * It creates colors for main categories and programmatically derives tones for submodules.
 * @param {Object} basePalette The base color set for top-level categories.
 * @returns {Object} A full theme object with hierarchical color definitions.
 */
const generateFullPalette = (basePalette) => {
  const fullPalette = {};

  SUITES.forEach((suite, suiteIdx) => {
    if (!suite || typeof suite !== 'object') return; // Guard
    const themeKey = suite.themeKey || `suite_${suiteIdx}`;
    const primaryColor = basePalette[themeKey] || basePalette.default;
    const suiteColors = {
      primary: primaryColor,
      block: adjustColor(primaryColor, { lightness: +15 }),
      dark: adjustColor(primaryColor, { lightness: -15 }),
      contrastText: getReadableText(primaryColor),
      submodules: {},
    };
    if (Array.isArray(suite.modules)) {
      suite.modules.forEach((mod, index) => {
        if (!mod || typeof mod !== 'object') return;
        const adjustment = submoduleAdjustments[index % submoduleAdjustments.length];
        const modColor = adjustColor(primaryColor, adjustment);
        const modName = mod.name || `module_${index}`;
        suiteColors.submodules[modName] = {
          primary: modColor,
          block: adjustColor(modColor, { lightness: +15 }),
          dark: adjustColor(modColor, { lightness: -15 }),
          contrastText: getReadableText(modColor),
        };
      });
    }

    fullPalette[themeKey] = suiteColors;
  });

  // Also add standalone colors for variables, etc.
  fullPalette.variables = { primary: basePalette.variables, contrastText: getReadableText(basePalette.variables) };
  fullPalette.functions = { primary: basePalette.functions, contrastText: getReadableText(basePalette.functions) };

  return fullPalette;
};

// Generate and export the final themes from current CSS variables.
// Note: both keys use current CSS var values; dark will be rebuilt on page reload under dark mode.
const currentBase = buildBasePaletteFromCss();
export const themes = {
  light: generateFullPalette(currentBase),
  dark: generateFullPalette(currentBase),
};

// Optional: on-demand builder that reads current CSS variables (useful after theme toggle)
export const getToolboxThemesFromCss = () => {
  const base = buildBasePaletteFromCss();
  return {
    light: generateFullPalette(base),
    dark: generateFullPalette(base),
  };
};

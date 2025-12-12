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

// Build a base palette from current CSS tokens with a standardized alternation
// Even-indexed suites -> primary family; odd-indexed suites -> accent family
const buildBasePaletteFromCss = () => {
  const primary = getCssVar("--primary-500", "#306998");
  const accent = getCssVar("--accent-500", "#FFD43B");

  const base = {};
  SUITES.forEach((suite, idx) => {
    if (!suite || typeof suite !== 'object') return; // Skip malformed entries
    const themeKey = suite.themeKey || `suite_${idx}`;
    const isEven = idx % 2 === 0;
    const baseHue = isEven ? primary : accent;
    const lightness = isEven ? (-6 - (idx % 3) * 4) : (-4 - (idx % 3) * 3);
    base[themeKey] = adjustColor(baseHue, { lightness });
  });
  // Consistent assignments for common categories
  base.variables = accent;
  base.functions = primary;
  base.default = adjustColor(primary, { lightness: -6 });
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

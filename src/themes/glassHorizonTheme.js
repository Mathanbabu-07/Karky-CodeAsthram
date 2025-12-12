// src/themes/glassHorizonTheme.js
import * as Blockly from 'blockly';
import { SUITES } from '../toolbox/suites.js';
import { getToolboxThemesFromCss } from './toolboxTheme.js';

function getVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name);
  return (v && v.trim().length) ? v.trim() : fallback;
}

function alpha(hexOrVar, alpha = 0.4) {
  // Supports CSS color string or hex; for CSS var assume pre-blended from CSS.
  if (hexOrVar.startsWith('var(')) return hexOrVar; // Expect pre-defined rgba vars
  // Basic hex to rgba
  const hex = hexOrVar.replace('#','');
  const bigint = parseInt(hex.length === 3 ? hex.split('').map(c=>c+c).join('') : hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getGlassHorizonTheme() {
  const primary = getVar('--primary-500', '#306998');
  const info = getVar('--info', '#4584B6');
  const bg = getVar('--workspace-bg', '#ffffff');
  const toolboxBg = getVar('--toolbox-bg', '#E6EEF9');
  const toolboxFg = getVar('--toolbox-fg', '#0B1B2B');
  const gutter = getVar('--editor-gutter', '#E1E8F2');
  // Build category styles from current CSS duotone palette
  const toolboxPalette = getToolboxThemesFromCss().light; // CSS-driven palette
  const categoryStyles = {};
  const slugify = (str) => str.toLowerCase().replace(/\s+/g, '_').replace(/[&/]/g, 'and');
  SUITES.forEach((suite) => {
    // Guard against stray block objects accidentally left at top-level in SUITES.
    if (!suite || typeof suite !== 'object' || !suite.themeKey || !Array.isArray(suite.modules)) {
      return; // Skip malformed entries to keep theme generation resilient.
    }
    const suiteKey = suite.themeKey;
    const suitePalette = toolboxPalette[suiteKey] || {};
    const suiteColour = suitePalette.primary || primary;
    categoryStyles[`${suiteKey}_category`] = { colour: suiteColour };
    suite.modules.forEach((mod) => {
      if (!mod || !mod.name) return;
      const modSlug = slugify(mod.name);
      const subKey = `${suiteKey}_${modSlug}_category`;
      const subPalette = (suitePalette.submodules && suitePalette.submodules[mod.name]) || {};
      const subColour = subPalette.primary || suiteColour;
      categoryStyles[subKey] = { colour: subColour };
    });
  });

  // Ensure builtin category styles exist (Variables, Logic, Math, etc.)
  // to satisfy any core or plugin expectations.
  categoryStyles['variables_category'] = categoryStyles['variables_category'] || { colour: primary };
  categoryStyles['logic_category'] = categoryStyles['logic_category'] || { colour: info };
  categoryStyles['math_category'] = categoryStyles['math_category'] || { colour: getVar('--pink-500', '#F472B6') };

  return Blockly.Theme.defineTheme('glassHorizon', {
    base: Blockly.Themes.Classic,
    componentStyles: {
      workspaceBackgroundColour: bg,
      toolboxBackgroundColour: toolboxBg,
      toolboxForegroundColour: toolboxFg,
      flyoutBackgroundColour: toolboxBg,
      flyoutForegroundColour: toolboxFg,
      scrollbarColour: alpha(primary, 0.4),
      insertionMarkerColour: primary,
    },
    fontStyle: {
      family: 'Inter, sans-serif',
      weight: '500',
      size: 12,
    },
    categoryStyles,
  });
}

// Default export for initial load
const glassHorizonTheme = getGlassHorizonTheme();
export default glassHorizonTheme;

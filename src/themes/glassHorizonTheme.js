// src/themes/glassHorizonTheme.js
import * as Blockly from 'blockly';
import { SUITES } from '../toolbox/suites.js';
import { getToolboxThemesFromCss } from './toolboxTheme.js';

function getVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name);
  return (v && v.trim().length) ? v.trim() : fallback;
}

function alpha(hexOrVar, alphaValue = 0.4) {
  if (!hexOrVar || typeof hexOrVar !== 'string') return '#306998';
  // Supports CSS color string or hex; for CSS var assume pre-blended from CSS.
  if (hexOrVar.startsWith('var(')) return hexOrVar; // Expect pre-defined rgba vars

  // Parse hex color
  const hex = hexOrVar.replace('#', '');
  const bigint = parseInt(hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex, 16);
  if (isNaN(bigint)) return '#306998';
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Blend with white background based on alpha (simulate transparency)
  // This creates a lighter shade instead of using rgba
  const blend = (channel) => Math.round(channel + (255 - channel) * (1 - alphaValue));
  const newR = blend(r);
  const newG = blend(g);
  const newB = blend(b);

  // Convert back to hex
  const toHex = (val) => val.toString(16).padStart(2, '0');
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

export function getGlassHorizonTheme() {
  const primary = getVar('--primary-500', '#306998');
  const info = getVar('--info', '#4584B6');
  const bg = getVar('--workspace-bg', '#ffffff');
  const toolboxBg = getVar('--toolbox-bg', '#E6EEF9');
  const toolboxFg = getVar('--toolbox-fg', '#0B1B2B');
  const gutter = getVar('--editor-gutter', '#E1E8F2');
  // Build category styles AND block styles from current CSS duotone palette
  const toolboxPalette = getToolboxThemesFromCss().light; // CSS-driven palette
  const categoryStyles = {};
  const blockStyles = {};
  const slugify = (str) => str.toLowerCase().replace(/\s+/g, '_').replace(/[&/]/g, 'and');

  SUITES.forEach((suite) => {
    // Guard against stray block objects accidentally left at top-level in SUITES.
    if (!suite || typeof suite !== 'object' || !suite.themeKey || !Array.isArray(suite.modules)) {
      return; // Skip malformed entries to keep theme generation resilient.
    }
    const suiteKey = suite.themeKey;
    const suitePalette = toolboxPalette[suiteKey] || {};
    const suiteColour = suitePalette.primary || primary;

    // Suite-level category style
    categoryStyles[`${suiteKey}_category`] = { colour: suiteColour };

    // Suite-level block style (fallback)
    const suiteBlockColour = suitePalette.block || suiteColour;
    blockStyles[`${suiteKey}_blocks`] = {
      colourPrimary: suiteBlockColour,
      colourSecondary: alpha(suiteBlockColour, 0.8),
      colourTertiary: alpha(suiteBlockColour, 0.6)
    };

    suite.modules.forEach((mod) => {
      if (!mod || !mod.name) return;
      const modSlug = slugify(mod.name);

      const subKeyCategory = `${suiteKey}_${modSlug}_category`;
      const subKeyBlock = `${suiteKey}_${modSlug}_blocks`;

      const subPalette = (suitePalette.submodules && suitePalette.submodules[mod.name]) || {};
      const subColour = subPalette.primary || suiteColour;
      const subBlockColour = subPalette.block || subColour;

      // Submodule category style
      categoryStyles[subKeyCategory] = { colour: subColour };

      // Submodule block style
      blockStyles[subKeyBlock] = {
        colourPrimary: subBlockColour,
        colourSecondary: alpha(subBlockColour, 0.8),
        colourTertiary: alpha(subBlockColour, 0.6)
      };
    });
  });

  // Ensure builtin category styles exist (Variables, Logic, Math, etc.)
  // to satisfy any core or plugin expectations.
  categoryStyles['variables_category'] = categoryStyles['variables_category'] || { colour: primary };
  categoryStyles['logic_category'] = categoryStyles['logic_category'] || { colour: info };
  categoryStyles['math_category'] = categoryStyles['math_category'] || { colour: getVar('--pink-500', '#F472B6') };

  // Builtin/fallback block styles
  blockStyles['variables_blocks'] = { colourPrimary: primary, colourSecondary: alpha(primary, 0.8), colourTertiary: alpha(primary, 0.6) };
  blockStyles['logic_blocks'] = { colourPrimary: info, colourSecondary: alpha(info, 0.8), colourTertiary: alpha(info, 0.6) };
  blockStyles['math_blocks'] = { colourPrimary: getVar('--pink-500', '#F472B6'), colourSecondary: getVar('--pink-400', '#F687C1'), colourTertiary: getVar('--pink-300', '#F9A8D4') };

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
    blockStyles,
  });
}

// Default export for initial load
const glassHorizonTheme = getGlassHorizonTheme();
export default glassHorizonTheme;

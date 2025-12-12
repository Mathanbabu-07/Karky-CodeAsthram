import * as Blockly from 'blockly';
import { SUITES } from '../toolbox/suites.js';
import { themes as toolboxThemes } from './toolboxTheme.js';

const blockStyles = {};
const categoryStyles = {};

// Helper to create a slug consistent with toolbox generation
const slugify = (str) => str.toLowerCase().replace(/\s+/g, '_').replace(/[&/]/g, 'and');

// Use the generated toolbox theme palette when available; fall back to a sensible default.
const palette = toolboxThemes && toolboxThemes.light ? toolboxThemes.light : {};

SUITES.forEach((suite) => {
  const suiteKey = suite.themeKey;
  const suitePalette = palette[suiteKey] || {};
  const suiteColour = suitePalette.primary || '#4C97FF';

  // Top-level category style
  categoryStyles[`${suiteKey}_category`] = { colour: suiteColour };

  // Generate submodule (subcategory) styles
  suite.modules.forEach((mod) => {
    const modSlug = slugify(mod.name);
    const subKey = `${suiteKey}_${modSlug}_category`;
    const subPalette = (suitePalette.submodules && suitePalette.submodules[mod.name]) || {};
    const subColour = subPalette.primary || suiteColour;
    categoryStyles[subKey] = { colour: subColour };

    // Also provide a block style name for blocks under this submodule so blocks get coloured consistently.
    const blockStyleName = `${suiteKey}_${modSlug}_blocks`;
    blockStyles[blockStyleName] = { colourPrimary: subColour };
  });
});

export const EricssonBlueTheme = Blockly.Theme.defineTheme('ericssonBlue', {
  base: Blockly.Themes.Classic, // Geras renderer base
  blockStyles: blockStyles,
  categoryStyles: categoryStyles,
  componentStyles: {
    workspaceBackgroundColour: '#F8F9FA',
    toolboxBackgroundColour: '#FFFFFF',
    toolboxForegroundColour: '#343A40',
    flyoutBackgroundColour: '#F1F3F5',
    flyoutForegroundColour: '#343A40',
    flyoutOpacity: 1,
    scrollbarColour: '#CED4DA',
    insertionMarkerColour: '#002561', // Ericsson Blue
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.6,
    cursorColour: '#002561',
  },
  fontStyle: {
    family: "'Roboto', sans-serif",
    weight: 'normal',
    size: 11,
  },
  startHats: true,
});

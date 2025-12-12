import * as Blockly from 'blockly';

const darkNavy = '#1E293B';
const darkPanel = '#2A3A52';
const accentBlue = '#38BDF8'; // A bright, glowing blue
const offWhite = '#F1F5F9';
const lightGray = '#94A3B8';

export const PremiumDarkTheme = Blockly.Theme.defineTheme('premiumDark', {
  base: Blockly.Themes.Classic,

  blockStyles: {
    'logic_blocks': { 'colourPrimary': '#38BDF8', 'colourSecondary': '#0EA5E9', 'colourTertiary': '#0284C7' },
    'loops_blocks': { 'colourPrimary': '#34D399', 'colourSecondary': '#10B981', 'colourTertiary': '#059669' },
    'math_blocks': { 'colourPrimary': '#F472B6', 'colourSecondary': '#EC4899', 'colourTertiary': '#DB2777' },
    'text_blocks': { 'colourPrimary': '#FBBF24', 'colourSecondary': '#F59E0B', 'colourTertiary': '#D97706' },
    'list_blocks': { 'colourPrimary': '#A78BFA', 'colourSecondary': '#8B5CF6', 'colourTertiary': '#7C3AED' },
    'colour_blocks': { 'colourPrimary': '#F87171', 'colourSecondary': '#EF4444', 'colourTertiary': '#DC2626' },
    'variable_blocks': { 'colourPrimary': '#F97316', 'colourSecondary': '#EA580C', 'colourTertiary': '#C2410C' },
    'procedure_blocks': { 'colourPrimary': '#60A5FA', 'colourSecondary': '#3B82F6', 'colourTertiary': '#2563EB' },
    'output_blocks': { 'colourPrimary': '#A3A3A3', 'colourSecondary': '#8A8A8A', 'colourTertiary': '#707070' },
    'functions_blocks': { 'colourPrimary': '#60A5FA', 'colourSecondary': '#3B82F6', 'colourTertiary': '#2563EB' },
  },

  categoryStyles: {
    'logic_category': { 'colour': '#38BDF8' },
    'loops_category': { 'colour': '#34D399' },
    'math_category': { 'colour': '#F472B6' },
    'text_category': { 'colour': '#FBBF24' },
    'list_category': { 'colour': '#A78BFA' },
    'colour_category': { 'colour': '#F87171' },
    'variable_category': { 'colour': '#F97316' },
    'procedure_category': { 'colour': '#60A5FA' },
    'output_category': { 'colour': '#A3A3A3' },
    'functions_category': { 'colour': '#60A5FA' },
  },

  componentStyles: {
    'workspaceBackgroundColour': darkNavy,
    'toolboxBackgroundColour': darkPanel,
    'toolboxForegroundColour': offWhite,
    'flyoutBackgroundColour': darkPanel,
    'flyoutForegroundColour': offWhite,
    'flyoutOpacity': 1,
    'scrollbarColour': 'rgba(148, 163, 184, 0.3)',
    'insertionMarkerColour': accentBlue,
    'insertionMarkerOpacity': 0.5,
    'scrollbarOpacity': 0.4,
    'cursorColour': accentBlue,
    'selectedGlowColour': accentBlue,
    'selectedGlowOpacity': 0.3,
    'replacementGlowColour': '#FBBF24',
    'replacementGlowOpacity': 0.3,
  },

  fontStyle: {
    'family': "'Roboto', sans-serif", // Will be overridden by Inter if loaded
    'weight': 'normal',
    'size': 12,
  },

  startHats: true,
});

// Custom grid settings for the "blueprint" feel
PremiumDarkTheme.grid_ = {
  ...PremiumDarkTheme.grid_,
  colour: 'rgba(148, 163, 184, 0.1)', // Subtle grid lines
  spacing: 25,
  length: 1,
  snap: true,
};

// Custom connection marker to be styled via CSS
PremiumDarkTheme.connection_marker = {
  ...PremiumDarkTheme.connection_marker,
  colour: "transparent", // We will style this with CSS filter/stroke
};

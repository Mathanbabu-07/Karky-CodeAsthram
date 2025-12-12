# Color Audit Log - Python Pop Theme Migration

Date: 2025-11-03

This log documents replacements of hard-coded colors with Python Pop tokens across the frontend.

Summary
- Added Python Pop token palette and dark mode to `src/styles/theme_variables.css`.
- Mapped legacy app variables (workspace, toolbox, panel, text) to tokens for smooth migration.
- Replaced inline and CSS hex/rgba in key UI: toolbar, toolbox, code panel, modals, tutorials, and icon.
- Standardized shadows to `--shadow-1` and focus states to `--focus-ring`.

Files Updated

1) src/styles/theme_variables.css
- Added tokens: --primary-500/600, --accent-500/600, --bg-0, --surface-1, --muted-1, --text, --muted-text, --success, --danger, --info, --focus-ring, --shadow-1, editor tokens.
- Added migration aliases: --workspace-bg, --toolbox-bg/fg/border, --toolbar-bg/text/border, --panel-bg/border, etc.
- Added alpha helpers: --primary-a04/a08/a12/a16/a30, --accent-a15.

2) src/styles.css
- Toolbar: gradient → solid `--surface-1`, border `--primary-500`, shadow `--shadow-1`.
- Toolbox: bg `--muted-1`, selected `--primary-500` with white text; hover uses primary alpha.
- Code panel: bg `--panel-bg`, border `--panel-border`, stripe `--accent-500`.
- Scrollbars: thumb `--primary-500` / hover `--primary-600`, track `--primary-a04`.
- Modal overlay: rgba(0,0,0,0.6); modal bg `--surface-1`, text `--text`.
- Alerts: danger/info colors via tokens with color-mix backgrounds.
- Inputs: bg `--surface-1`, border `--panel-border`, focus `--focus-ring`.
- Buttons: primary `--primary-500`/`--primary-600`, secondary outlined `--primary-500` → filled on hover.

3) src/CodePanel.css
- Replaced bespoke blues with `--editor-*`, `--primary-*` alphas.
- Prism token colors sourced from new `--syntax-*` variables.
- Shadows unified to `--shadow-1`.

4) src/components/AlivePythonIcon.jsx and src/AlivePythonIcon.css
- SVG gradient stops now use `--primary-*` and `--accent-*`.
- Drop-shadows use primary/accent alpha helpers to avoid overpowering logo.

5) src/components/Toolbar.css
- Gradient and decorative strokes now use primary token alphas.
- Icon/text colors use `--text`; shadows use `--shadow-1`.

6) src/components/Toolbar.jsx
- SVG gradients and connection lines converted to use CSS variables with opacity attributes.
- Added a Theme toggle button (Sun/Moon) wired to the theme system.

7) src/components/BlocklyEditor.jsx & src/themes/glassHorizonTheme.js
- Blockly theme rebuilt from CSS variables at runtime via `getGlassHorizonTheme()`.
- Listens for `python-pop-theme-change` to re-apply theme on toggle.

8) src/styles/toolbox.css
- Borders/hover/selected states use tokens; search input themed to surface/text/focus-ring.

9) src/styles/tutorials.css
- Tutorial palette mapped to tokens; shadows and hovers standardized.

10) src/themes/toolboxTheme.js
- Removed hard-coded hex palette. Categories now derive from CSS tokens (duotone: primary/accent) with programmatic lightness shifts.
- Contrast text chosen automatically per category using HSL lightness heuristic and `--text`/`--text-white` tokens.

11) src/utils/colorUtils.js
- Replaced `#000000` fallback in `adjustColor` with a CSS variable fallback to `--text` (defaults to `#0B1B2B` if tokens unavailable).

Notable Literal → Token Replacements (examples)
- #003A70, #001F3F, rgba(0, 191, 255, X) → --primary-500/600 or primary alpha helpers.
- #0d1a2e, #1a3a6e → --surface-1 / --editor-gutter.
- #e0f4ff, #8cb2d4 → --text / --muted-text depending on context.
- #FF5C5C and variants → --danger; #4584B6 → --info.

Validation
- Contrast script added: `Frontend/scripts/contrast-check.mjs` to verify AA/AAA thresholds for core pairs.
- Manual checks recommended on toolbar, toolbox, main panels, and modal text.

Pending/Follow-ups
- Review remaining CSS (e.g., templates.css, any inline styles in other components) for leftover literals.
- Expand contrast checks to include disabled states and chip/badge variants as needed.
 - Legacy Blockly theme files (`src/themes/EricssonBlueTheme.js`, `src/themes/PremiumDarkTheme.js`) contain literals but appear unused; consider deprecating or migrating to tokens if kept.

---

Changelog – 2025-11-03 (later pass)
- Toolbar
	- Light: buttons default to blue with white icons; hover/active switch to gold with dark icons for stronger visibility.
	- Dark: buttons default to gold with dark icons; hover/active switch to blue with white icons.
	- Logos: white assets retained; CSS filter inverts to black in light mode, none in dark mode.
- Code Panel
	- Increased header/body contrast via theme-aware `--codepanel-header-bg` (light: subtle gold tint; dark: subtle blue tint).
	- Action buttons mirror toolbar duo-tone behavior per theme, ensuring consistent affordances.

// src/utils/toolboxIconInjector.js

/**
 * A utility to safely inject custom icons into the Blockly toolbox categories.
 * It operates on the rendered DOM to avoid interfering with Blockly's internal toolbox management.
 */

/**
 * Injects custom SVG icons into the main toolbox categories.
 * It iterates through the provided icon map, finds the corresponding category element by its ID,
 * and prepends the icon image if it's not already present.
 *
 * @param {Object.<string, string>} iconMap - A map where keys are category themeKeys (e.g., "essentials")
 *   and values are the corresponding icon filenames (e.g., "essentials.svg").
 */
export function injectCategoryIcons(iconMap) {
  // Iterate over the map of icons to be injected
  for (const [key, iconFile] of Object.entries(iconMap)) {
    // Construct the stable ID for the category's DOM element
    const categoryId = `cat_${key}`;
    const categoryEl = document.getElementById(categoryId);

    if (categoryEl) {
      // Find the label element within the category row
      const label = categoryEl.querySelector('.blocklyTreeLabel');
      if (!label) continue;

      // Prevent re-injection by checking if an icon already exists
      if (label.querySelector('.category-icon')) continue;

      // Create the image element for the icon
      const img = document.createElement('img');
      img.src = `/assets/icons/${iconFile}`;
      img.className = 'category-icon';
      img.setAttribute('aria-hidden', 'true');

      // Prepend the icon to the label for proper alignment
      label.prepend(img);
    }
  }
}

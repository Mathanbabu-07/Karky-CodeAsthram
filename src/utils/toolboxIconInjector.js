// src/utils/toolboxIconInjector.js

/**
 * Utility to safely inject custom icon pods into Blockly toolbox categories.
 * Creates the rounded dark pod badge and vector icon next to category labels matching Image 1.
 */

const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, '_').replace(/[&/]/g, 'and');

export function injectCategoryIcons(iconMap) {
  const categories = document.querySelectorAll('.blocklyToolboxCategory, .blocklyTreeRow');
  categories.forEach((categoryEl) => {
    const label = categoryEl.querySelector('.blocklyToolboxCategoryLabel, .blocklyTreeLabel');
    if (!label) return;

    if (categoryEl.querySelector('.category-icon-pod') || categoryEl.closest('.toolbox-search-label') || categoryEl.id === 'toolbox-search-input') {
      return;
    }

    const text = label.textContent.trim();
    if (!text) return;
    const slug = slugify(text);

    const iconFile = iconMap[slug] || `${slug}.svg`;

    // Hide default Blockly category icon
    const defaultIcon = categoryEl.querySelector('.blocklyToolboxCategoryIcon, .blocklyTreeIcon');
    if (defaultIcon) {
      defaultIcon.style.display = 'none';
    }

    // Remove any legacy chevron element if present
    const chevron = categoryEl.querySelector('.category-chevron');
    if (chevron) {
      chevron.remove();
    }

    // Create left group wrapper for icon pod + label
    const leftGroup = document.createElement('div');
    leftGroup.className = 'category-left-group';

    // Create rounded icon pod container
    const pod = document.createElement('div');
    pod.className = 'category-icon-pod';

    const img = document.createElement('img');
    img.src = `/assets/icons/${iconFile}`;
    img.className = 'category-icon';
    img.setAttribute('aria-hidden', 'true');
    img.onerror = () => {
      img.src = '/assets/icons/essentials.svg';
    };

    pod.appendChild(img);
    leftGroup.appendChild(pod);

    // Move label into left group
    if (label.parentNode) {
      label.parentNode.insertBefore(leftGroup, label);
      leftGroup.appendChild(label);
    }
  });
}

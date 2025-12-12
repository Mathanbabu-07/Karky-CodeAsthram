// src/plugins/custom-toolbox/CustomCollapsibleCategory.js
import * as Blockly from 'blockly';

export class CustomCollapsibleCategory extends Blockly.CollapsibleToolboxCategory {
  /** @override */
  createDom_() {
    super.createDom_();

    // Add a custom class to the main row element for styling
    this.rowDiv_.classList.add('custom-category-row');

    // Create a container for the animated expand/collapse icon
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('custom-category-icon-container');

    // Create the animated icon elements
    const iconBar1 = document.createElement('div');
    iconBar1.classList.add('custom-category-icon-bar', 'bar1');
    const iconBar2 = document.createElement('div');
    iconBar2.classList.add('custom-category-icon-bar', 'bar2');

    iconContainer.appendChild(iconBar1);
    iconContainer.appendChild(iconBar2);

    // Replace the default expand/collapse icon with our custom one
    const defaultIcon = this.rowDiv_.querySelector('.blocklyTreeIcon');
    if (defaultIcon) {
      defaultIcon.style.display = 'none'; // Hide the default arrow
      this.rowDiv_.insertBefore(iconContainer, this.label_.nextSibling);
    }

    return this.rowDiv_;
  }

  /** @override */
  setSelected(isSelected) {
    super.setSelected(isSelected);
    // Toggle a class on the icon container for open/close animation
    const iconContainer = this.rowDiv_.querySelector('.custom-category-icon-container');
    if (iconContainer) {
      if (isSelected) {
        iconContainer.classList.add('is-open');
        setTimeout(() => {
          this.rowDiv_.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
      } else {
        iconContainer.classList.remove('is-open');
      }
    }
  }
}

// Register the custom category with Blockly
Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  'custom_collapsible_category',
  CustomCollapsibleCategory
);

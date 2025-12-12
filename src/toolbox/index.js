// src/toolbox/index.js
import { TOOLBOX_CATEGORIES_XML } from './xmlBuilders';

export function buildToolboxXml({ modules, board }) {
  // gather categories from modules (some may return board-aware categories)
  const categories = modules
    .map(m => (m.getCategory ? m.getCategory(board) : null))
    .filter(Boolean);

  return TOOLBOX_CATEGORIES_XML(categories);
}

// Allow icons if you want later; keep your injectCategoryIcons logic unchanged if you like.

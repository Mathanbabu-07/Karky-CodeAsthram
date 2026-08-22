// src/utils/toolboxIconInjector.js

/**
 * Utility to safely inject custom icon pods into Blockly toolbox categories.
 * Creates the rounded dark pod badge and vector icon next to category labels.
 */

const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, '_').replace(/[&/]/g, 'and').replace(/_+/g, '_');

const resolveIconFile = (text, slug, iconMap) => {
  if (iconMap && iconMap[slug]) return iconMap[slug];

  const lower = text.toLowerCase();
  if (lower.includes('variable') || lower.includes('type')) return 'variables.svg';
  if (lower.includes('operator') || lower.includes('logic')) return 'logic.svg';
  if (lower.includes('loop') || lower.includes('control')) return 'loops.svg';
  if (lower.includes('function') || lower.includes('method')) return 'functions.svg';
  if (lower.includes('array') || lower.includes('list')) return 'lists.svg';
  if (lower.includes('object') || lower.includes('json') || lower.includes('dict')) return 'dicts.svg';
  if (lower.includes('map') || lower.includes('set')) return 'sets.svg';
  if (lower.includes('class') || lower.includes('oop')) return 'classes.svg';
  if (lower.includes('io') || lower.includes('i/o') || lower.includes('console') || lower.includes('system') || lower.includes('file')) return 'io_formats.svg';
  if (lower.includes('async') || lower.includes('concurr') || lower.includes('thread')) return 'concurrency_async.svg';
  if (lower.includes('exception') || lower.includes('test') || lower.includes('util')) return 'tools_testing.svg';
  if (lower.includes('tool')) return 'tools.svg';
  if (lower.includes('math') || lower.includes('number')) return 'math.svg';
  if (lower.includes('text') || lower.includes('string')) return 'text.svg';
  if (lower.includes('sort')) return 'sorting.svg';

  return `${slug}.svg`;
};

export function injectCategoryIcons(iconMap) {
  // ── Purge any stray pods that were injected into the search row ──────────
  // The search row's label carries the class "toolbox-search-label" (set via
  // the toolbox JSON "css-label" field) from the very first DOM render — even
  // before the <input> is placed by @blockly/toolbox-search. Use that class
  // as the definitive marker to remove any accidentally injected pods.
  document
    .querySelectorAll('.toolbox-search-label .category-icon-pod, .toolbox-search-label ~ * .category-icon-pod')
    .forEach((el) => el.remove());

  // Also purge by :has(input) for good measure (runs after input is in DOM)
  document
    .querySelectorAll('.blocklyToolboxCategory:has(#toolbox-search-input) .category-icon-pod')
    .forEach((el) => el.remove());

  const categories = document.querySelectorAll('.blocklyToolboxCategory, .blocklyTreeRow');
  categories.forEach((categoryEl) => {
    // ── Skip the search category via every possible signal ───────────────────
    // 1. Already has a pod injected
    if (categoryEl.querySelector('.category-icon-pod')) return;

    // 2. Contains an input (the @blockly/toolbox-search input) — covers the
    //    case where the MutationObserver fires AFTER the input is placed
    if (categoryEl.querySelector('input') || categoryEl.querySelector('#toolbox-search-input')) return;

    // 3. Contains a label with the "toolbox-search-label" class — this is set
    //    by Blockly from the toolbox JSON "css-label" field and is present from
    //    the very first render, BEFORE the input is injected. Most reliable guard.
    if (categoryEl.querySelector('.toolbox-search-label')) return;

    // 4. The element itself or an ancestor carries the search label class
    if (
      categoryEl.classList.contains('toolbox-search-label') ||
      categoryEl.closest('.toolbox-search-label')
    ) return;

    const label = categoryEl.querySelector('.blocklyToolboxCategoryLabel, .blocklyTreeLabel');
    if (!label) return;

    // 5. Label carries the search CSS class directly (belt-and-suspenders)
    if (label.classList.contains('toolbox-search-label')) return;

    const text = label.textContent.trim();
    if (!text || text.toLowerCase() === 'search') return;

    const slug = slugify(text);
    const iconFile = resolveIconFile(text, slug, iconMap);

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

    // Create rounded icon pod container with slug-specific class for distinct accents
    const pod = document.createElement('div');
    pod.className = `category-icon-pod category-pod-${slug}`;

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

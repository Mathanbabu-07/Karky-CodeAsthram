// src/toolbox/xmlBuilders.js
export function TOOLBOX_CATEGORIES_XML(categories) {
  return `
  <xml id="toolbox" style="display:none">
    ${categories.map(cat => categoryToXml(cat)).join('\n')}
  </xml>`;
}

function categoryToXml(cat) {
  const { name, colour, custom, blocks } = cat;

  if (custom) {
    // e.g. Variables/Procedures custom categories
    return `<category name="${name}" colour="${colour}" custom="${custom}"></category>`;
  }

  const blocksXml = (blocks || [])
    .map(b => {
      if (typeof b === 'string') return `<block type="${b}" />`;
      if (b.xml) return b.xml; // allow raw XML (shadows etc.)
      return `<block type="${b.type}" />`;
    })
    .join('\n');

  return `<category name="${name}" colour="${colour}">
    ${blocksXml}
  </category>`;
}

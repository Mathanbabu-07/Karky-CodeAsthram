// scripts/contrast-check.mjs
// Simple WCAG AA contrast checks for Python Pop pairs

function parseColor(c) {
  // c like '#RRGGBB' or 'rgb(a)'
  if (c.startsWith('#')) {
    const hex = c.slice(1);
    const bigint = parseInt(hex.length === 3 ? hex.split('').map(x=>x+x).join('') : hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r,g,b];
  }
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const [r,g,b] = m[1].split(',').map(x=>parseFloat(x));
    return [r,g,b];
  }
  throw new Error('Unsupported color: ' + c);
}

function luminance([r,g,b]) {
  const srgb = [r,g,b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
  });
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}

function contrast(c1, c2) {
  const L1 = luminance(parseColor(c1));
  const L2 = luminance(parseColor(c2));
  const [min,max] = L1 > L2 ? [L2,L1] : [L1,L2];
  return (max + 0.05) / (min + 0.05);
}

function getVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function check(label, fg, bg, required = 4.5) {
  const ratio = contrast(fg, bg);
  const pass = ratio >= required;
  console.log(`${label}: ${ratio.toFixed(2)} ${pass ? 'PASS' : 'FAIL (need ' + required + ')'}`);
}

export function runContrastChecks() {
  const pairs = [
    ['Body text', getVar('--text'), getVar('--bg-0'), 4.5],
    ['Muted text on surface', getVar('--muted-text'), getVar('--surface-1'), 4.5],
    ['Toolbar text', getVar('--text'), getVar('--surface-1'), 4.5],
    ['Primary Button', '#FFFFFF', getVar('--primary-500'), 4.5],
    ['Secondary Button text', getVar('--primary-500'), getVar('--surface-1'), 4.5],
    ['Sidebar text', getVar('--text'), getVar('--muted-1'), 4.5],
  ];
  pairs.forEach(([label, fg, bg, need]) => check(label, fg, bg, need));
  console.log('UI element (3:1) checks:');
  const uiPairs = [
    ['Toolbar border', getVar('--primary-500'), getVar('--surface-1'), 3.0],
    ['Info stripe', getVar('--info'), getVar('--surface-1'), 3.0],
  ];
  uiPairs.forEach(([label, fg, bg, need]) => check(label, fg, bg, need));
}

// Auto-run in browser console when imported via dev tools
if (typeof window !== 'undefined' && !window.__ranContrastChecks) {
  window.__ranContrastChecks = true;
  // Delay to ensure styles are applied
  setTimeout(runContrastChecks, 0);
}

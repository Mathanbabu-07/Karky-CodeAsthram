// src/utils/colorUtils.js

/**
 * Converts a hex color string to an HSL object.
 * @param {string} hex The hex color string (e.g., "#RRGGBB").
 * @returns {{h: number, s: number, l: number}} The HSL representation.
 */
export function hexToHsl(hex) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Converts an HSL color object to a hex string.
 * @param {{h: number, s: number, l: number}} hsl The HSL color object.
 * @returns {string} The hex color string.
 */
export function hslToHex({ h, s, l }) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHex = (c) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r + m)}${toHex(g + m)}${toHex(b + m)}`;
}

/**
 * Adjusts the HSL values of a hex color.
 * @param {string} hex The base hex color.
 * @param {{lightness?: number, saturation?: number, hue?: number}} adjustments
 * @returns {string} The adjusted hex color.
 */
export function adjustColor(hex, { lightness = 0, saturation = 0, hue = 0 }) {
  if (!hex) {
    console.warn('adjustColor received a null or undefined hex value.');
    // Fallback to the base text color token to avoid hardcoded literals
    try {
      const v = typeof window !== 'undefined' && document?.documentElement
        ? getComputedStyle(document.documentElement).getPropertyValue('--text').trim()
        : '';
      return v || '#0B1B2B';
    } catch {
      return '#0B1B2B';
    }
  }
  const hsl = hexToHsl(hex);
  return hslToHex({
    h: (hsl.h + hue + 360) % 360,
    s: Math.max(0, Math.min(100, hsl.s + saturation)),
    l: Math.max(0, Math.min(100, hsl.l + lightness)),
  });
}

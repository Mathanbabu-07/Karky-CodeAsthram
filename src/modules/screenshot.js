// src/modules/screenshot.js
import { toPng } from 'html-to-image';

/**
 * Fallback: Direct SVG to Canvas renderer for Blockly workspace
 */
async function captureSvgFallback(targetEl, fileName, isDark) {
  const svgEl = targetEl.querySelector('.blocklySvg') || targetEl.querySelector('svg');
  if (!svgEl) throw new Error('No SVG workspace found');

  const rect = targetEl.getBoundingClientRect();
  const width = rect.width || 1200;
  const height = rect.height || 800;

  const canvas = document.createElement('canvas');
  const scale = 2; // 2x Retina
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // Background
  ctx.fillStyle = isDark ? '#0b1220' : '#f8fafc';
  ctx.fillRect(0, 0, width, height);

  // Clone SVG
  const clonedSvg = svgEl.cloneNode(true);
  clonedSvg.setAttribute('width', width);
  clonedSvg.setAttribute('height', height);

  const xml = new XMLSerializer().serializeToString(clonedSvg);
  const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}

/**
 * High-reliability workspace screenshot capturer with CSP-safe font handling & SVG fallback
 */
export const captureWorkspaceScreenshot = async (
  elementSelector = '.blockly-container',
  fileName = 'code-asthram-workspace.png',
  elementsToHide = []
) => {
  const targetEl = document.querySelector(elementSelector);

  if (!targetEl) {
    console.error('Screenshot error: Could not find target element', elementSelector);
    return false;
  }

  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const bgColor = isDark ? '#080d19' : '#f8fafc';

  // Elements to temporarily hide during screenshot
  const hiddenElements = [];
  elementsToHide.forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) {
      hiddenElements.push({ element: el, originalDisplay: el.style.display });
      el.style.display = 'none';
    }
  });

  try {
    // Primary strategy: html-to-image with CSP-safe options
    const dataUrl = await toPng(targetEl, {
      backgroundColor: bgColor,
      pixelRatio: 2,
      cacheBust: true,
      skipFonts: true, // Prevents CSP violations from attempting to fetch remote fonts
      fontEmbedCSS: '', // Prevents font network requests
      filter: (node) => {
        // Exclude unwanted floating overlays, tooltips, or modals
        if (node.classList) {
          if (
            node.classList.contains('code-panel') ||
            node.classList.contains('custom-tooltip') ||
            node.classList.contains('code-execution-modal-overlay') ||
            node.classList.contains('workspace-transition-overlay') ||
            node.classList.contains('modern-toast-card')
          ) {
            return false;
          }
        }
        return true;
      },
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.warn('html-to-image primary capture failed, attempting SVG fallback...', error);
    try {
      await captureSvgFallback(targetEl, fileName, isDark);
      return true;
    } catch (fallbackError) {
      console.error('All screenshot strategies failed:', fallbackError);
      return false;
    }
  } finally {
    // Restore hidden elements
    hiddenElements.forEach(({ element, originalDisplay }) => {
      try {
        element.style.display = originalDisplay;
      } catch (_) {}
    });
  }
};
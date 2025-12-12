import { toPng } from 'html-to-image';

// 1x1 transparent PNG data URI (used as placeholder when inlining fails)
const TRANSPARENT_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=';

/**
 * Helper: fetch URL and return dataURL, null on failure.
 */
async function fetchAsDataURL(url) {
  try {
    // avoid pulling blob: or data: with fetch (they can't be fetched)
    if (!url || url.startsWith('data:') || url.startsWith('blob:')) return null;
    const res = await fetch(url, { mode: 'cors' }); // requires remote server to allow CORS
    if (!res.ok) throw new Error('Fetch failed: ' + res.status);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn('Could not inline', url, err);
    return null;
  }
}

/**
 * Wait for an <img> element to settle (load or error).
 */
function waitForImage(img) {
  return new Promise((resolve) => {
    if (img.complete && (img.naturalWidth || img.naturalHeight)) return resolve({ img, ok: true });
    const onLoad = () => {
      cleanup();
      resolve({ img, ok: true });
    };
    const onErr = (ev) => {
      cleanup();
      resolve({ img, ok: false, ev });
    };
    const cleanup = () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onErr);
    };
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onErr);
    // safety: timeout in 6s
    setTimeout(() => resolve({ img, ok: !!(img.complete && (img.naturalWidth || img.naturalHeight)) }), 6000);
  });
}

/**
 * Inline background-image URLs in element's style by replacing with data URL (or placeholder).
 */
async function inlineBackgroundImages(el, replacedList) {
  const style = window.getComputedStyle(el);
  const bg = style.getPropertyValue('background-image');
  if (!bg || bg === 'none') return;
  // simple regex to extract url(s)
  const urls = Array.from(bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)).map((m) => m[1]);
  if (!urls.length) return;

  let newBg = bg;
  for (const url of urls) {
    const dataUrl = await fetchAsDataURL(url);
    if (dataUrl) {
      replacedList.push({ el, type: 'background-image', original: url, replacement: dataUrl });
      newBg = newBg.replace(url, dataUrl);
    } else {
      // replace with transparent placeholder for safety
      replacedList.push({ el, type: 'background-image', original: url, replacement: TRANSPARENT_PNG, failed: true });
      newBg = newBg.replace(url, TRANSPARENT_PNG);
    }
  }
  // inline by writing to style attribute (so we can restore later)
  const originalStyle = el.getAttribute('style') || '';
  el.setAttribute('data-original-style-for-screenshot', originalStyle);
  el.style.setProperty('background-image', newBg, 'important');
}

/**
 * Capture workspace to PNG with robust inlining + placeholders + logging.
 */
export const captureWorkspaceScreenshot = async (
  elementSelector,
  fileName = 'workspace.png',
  elementsToHide = []
) => {
  const targetEl = document.querySelector(elementSelector);

  if (!targetEl) {
    alert('Error: Could not find the element to capture.');
    return;
  }

  const hiddenElements = [];
  elementsToHide.forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) {
      hiddenElements.push({ element: el, originalDisplay: el.style.display });
      el.style.display = 'none';
    }
  });

  // gather candidates
  const imgEls = Array.from(targetEl.querySelectorAll('img'));
  const svgImageEls = Array.from(targetEl.querySelectorAll('image')); // svg <image>
  const allEls = Array.from(targetEl.querySelectorAll('*'));

  const replaced = []; // track changes to restore
  const report = { inlined: [], replacedWithPlaceholder: [], untouched: [] };

  try {
    // Inline <img> elements
    await Promise.all(
      imgEls.map(async (img) => {
        try {
          // hint for crossorigin if server supports it
          try { img.crossOrigin = 'anonymous'; } catch (_) {}
          const src = img.src;
          if (!src) return report.untouched.push({ type: 'img', src, reason: 'no-src' });

          const dataUrl = await fetchAsDataURL(src);
          if (dataUrl) {
            replaced.push({ el: img, attr: 'src', original: src });
            img.src = dataUrl;
            report.inlined.push({ type: 'img', original: src });
          } else {
            // failed to inline - replace with placeholder to avoid taint
            replaced.push({ el: img, attr: 'src', original: src });
            img.src = TRANSPARENT_PNG;
            report.replacedWithPlaceholder.push({ type: 'img', original: src });
          }
        } catch (err) {
          console.warn('Error inlining <img>', err);
        }
      })
    );

    // Inline SVG <image> hrefs
    await Promise.all(
      svgImageEls.map(async (svgImg) => {
        try {
          const href =
            svgImg.getAttribute('href') ||
            svgImg.getAttributeNS('http://www.w3.org/1999/xlink', 'href') ||
            svgImg.getAttribute('xlink:href') ||
            null;
          if (!href) return report.untouched.push({ type: 'svg-image', href: null });

          const dataUrl = await fetchAsDataURL(href);
          if (dataUrl) {
            replaced.push({ el: svgImg, attr: 'href', original: href });
            svgImg.setAttribute('href', dataUrl);
            try { svgImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataUrl); } catch (_) {}
            report.inlined.push({ type: 'svg-image', original: href });
          } else {
            // set href to transparent placeholder
            replaced.push({ el: svgImg, attr: 'href', original: href });
            svgImg.setAttribute('href', TRANSPARENT_PNG);
            try { svgImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', TRANSPARENT_PNG); } catch (_) {}
            report.replacedWithPlaceholder.push({ type: 'svg-image', original: href });
          }
        } catch (err) {
          console.warn('Error inlining SVG <image>', err);
        }
      })
    );

    // Inline background images (for all elements inside target)
    await Promise.all(
      allEls.map(async (el) => {
        try {
          await inlineBackgroundImages(el, replaced);
        } catch (err) {
          console.warn('Error inlining background for', el, err);
        }
      })
    );

    // Wait for all <img> elements inside the target to settle
    const imgsToWait = Array.from(targetEl.querySelectorAll('img'));
    const waitResults = await Promise.all(imgsToWait.map(waitForImage));

    // Report any final image load errors
    waitResults.forEach((r) => {
      if (!r.ok) {
        const src = r.img && r.img.src;
        console.warn('Image failed to load or errored before capture:', src, r.ev || '');
        report.replacedWithPlaceholder.push({ type: 'img-load-failed', original: src });
      }
    });

    // call html-to-image with transparent placeholder as fallback too
    const dataUrl = await toPng(targetEl, {
      backgroundColor: '#111827',
      pixelRatio: 2,
      cacheBust: true,
      imagePlaceholder: TRANSPARENT_PNG,
    });

    // download
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();

    console.group('screenshot capture report');
    console.log('Inlined resources:', report.inlined);
    console.log('Replaced with placeholder (to prevent taint):', report.replacedWithPlaceholder);
    console.log('Untouched (skipped):', report.untouched);
    console.groupEnd();
  } catch (error) {
    console.error('Error capturing element:', error);
    // better error hinting
    const msg = String(error).toLowerCase();
    if (msg.includes('taint') || msg.includes('securityerror') || msg.includes('insecure')) {
      alert(
        'Capture failed: canvas tainted by cross-origin resource(s). ' +
        'Check console report for the resources replaced/failed. ' +
        'If replacements exist but capture still fails, enable CORS or proxy those images server-side.'
      );
    } else {
      alert('Sorry, there was an error capturing the workspace. See console for details.');
    }
  } finally {
    // Restore replaced attributes and inline styles
    replaced.forEach(({ el, attr, original }) => {
      try {
        if (attr === 'src') el.src = original;
        else if (attr === 'href') {
          el.setAttribute('href', original);
          try { el.setAttributeNS('http://www.w3.org/1999/xlink', 'href', original); } catch (_) {}
        } else if (attr === 'background-image') {
          // handled through data-original-style-for-screenshot
        }
      } catch (_) {}
    });

    // Restore any inline style we stored
    Array.from(targetEl.querySelectorAll('[data-original-style-for-screenshot]')).forEach((el) => {
      const original = el.getAttribute('data-original-style-for-screenshot');
      if (original === null || original === '') el.removeAttribute('style');
      else el.setAttribute('style', original);
      el.removeAttribute('data-original-style-for-screenshot');
    });

    // Restore hidden elements
    hiddenElements.forEach(({ element, originalDisplay }) => {
      element.style.display = originalDisplay;
    });
  }
};
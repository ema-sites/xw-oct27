/* eslint-disable */
/* global WebImporter */

/**
 * WKND sections transformer.
 * Inserts section breaks (<hr>) before every non-first section in
 * beforeTransform (while parser target elements still exist), and adds
 * Section Metadata blocks for styled sections in afterTransform.
 */

const MARKER_ATTR = 'data-excat-section-id';

function findSectionElement(root, section) {
  const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
  for (const sel of selectors) {
    if (!sel) continue;
    try {
      const el = root.querySelector(sel);
      if (el) return el;
    } catch (e) {
      // invalid selector, try next
    }
  }
  return null;
}

export default function transform(hookName, element, payload) {
  const template = payload && payload.template;
  const sections = (template && template.sections) || [];
  if (sections.length < 2) return;

  const doc = element.ownerDocument || document;

  if (hookName === 'beforeTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const el = findSectionElement(element, section);
      if (!el || !el.parentNode) continue;

      if (i === 0) {
        // First section: no break, unless it is styled (temporary marker).
        if (section.style) {
          const hr = doc.createElement('hr');
          hr.setAttribute(MARKER_ATTR, section.id);
          el.parentNode.insertBefore(hr, el);
        }
        continue;
      }

      const hr = doc.createElement('hr');
      if (section.style) hr.setAttribute(MARKER_ATTR, section.id);
      el.parentNode.insertBefore(hr, el);
    }
  }

  if (hookName === 'afterTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue;

      const marker = element.querySelector(`hr[${MARKER_ATTR}="${section.id}"]`);
      const anchor = marker || findSectionElement(element, section);
      if (!anchor || !anchor.parentNode) continue;

      const meta = WebImporter.Blocks.createBlock(doc, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });

      // Place metadata at the end of the section: before the next section break,
      // or at the end of the container if this is the last section.
      let next = anchor.nextSibling;
      while (next && !(next.nodeType === 1 && next.tagName === 'HR')) next = next.nextSibling;
      if (next) {
        next.parentNode.insertBefore(meta, next);
      } else {
        anchor.parentNode.appendChild(meta);
      }

      if (marker) {
        if (i === 0) {
          marker.remove();
        } else {
          marker.removeAttribute(MARKER_ATTR);
        }
      }
    }

    // Safety: drop any leftover markers
    element.querySelectorAll(`hr[${MARKER_ATTR}]`).forEach((hr) => {
      if (hr.getAttribute(MARKER_ATTR) === sections[0].id) hr.remove();
      else hr.removeAttribute(MARKER_ATTR);
    });
  }
}

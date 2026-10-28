/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-boxed variant. Base: hero.
 * Source: https://wknd.site/us/en.html
 * Selector: .teaser.cmp-teaser--hero.cmp-teaser--imagebottom
 * Model: hero-boxed (image, imageAlt [collapsed], text).
 * Row 1: image. Row 2: h2, description, CTA.
 */
export default function parse(element, { document }) {
  const img = element.querySelector('.cmp-teaser__image img');
  const title = element.querySelector('.cmp-teaser__title');
  const desc = element.querySelector('.cmp-teaser__description');
  const cta = element.querySelector('.cmp-teaser__action-container a');

  // Row 1: image
  const imageFrag = document.createDocumentFragment();
  if (img) {
    imageFrag.appendChild(document.createComment(' field:image '));
    imageFrag.appendChild(img);
  }

  // Row 2: rich text
  const textFrag = document.createDocumentFragment();
  let hasText = false;
  if (title && title.textContent.trim()) {
    const h = document.createElement('h2');
    h.textContent = title.textContent.trim();
    textFrag.appendChild(h);
    hasText = true;
  }
  if (desc && desc.textContent.trim()) {
    const paras = Array.from(desc.querySelectorAll('p')).filter((p) => p.textContent.trim());
    if (paras.length) {
      paras.forEach((p) => textFrag.appendChild(p));
    } else {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textFrag.appendChild(p);
    }
    hasText = true;
  }
  if (cta && cta.textContent.trim()) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.setAttribute('href', cta.getAttribute('href'));
    a.textContent = cta.textContent.trim();
    p.appendChild(a);
    textFrag.appendChild(p);
    hasText = true;
  }
  if (hasText) {
    textFrag.insertBefore(document.createComment(' field:text '), textFrag.firstChild);
  }

  const cells = [[imageFrag], [textFrag]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-boxed', cells });
  element.replaceWith(block);
}

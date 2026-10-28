/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-featured variant. Base: columns.
 * Source: https://wknd.site/us/en.html
 * Selector: .teaser.cmp-teaser--featured
 * XWalk: Columns blocks take no field hints.
 * One row, two columns: image | eyebrow, h2, description, CTA.
 */
export default function parse(element, { document }) {
  const img = element.querySelector('.cmp-teaser__image img');
  const pretitle = element.querySelector('.cmp-teaser__pretitle');
  const title = element.querySelector('.cmp-teaser__title');
  const desc = element.querySelector('.cmp-teaser__description');
  const cta = element.querySelector('.cmp-teaser__action-container a');

  // Column 1: image
  const imageCell = [];
  if (img) imageCell.push(img);

  // Column 2: text content
  const textCell = [];
  if (pretitle && pretitle.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = pretitle.textContent.trim();
    textCell.push(p);
  }
  if (title && title.textContent.trim()) {
    const h = document.createElement('h2');
    h.textContent = title.textContent.trim();
    textCell.push(h);
  }
  if (desc && desc.textContent.trim()) {
    const paras = Array.from(desc.querySelectorAll('p')).filter((p) => p.textContent.trim());
    if (paras.length) {
      textCell.push(...paras);
    } else {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textCell.push(p);
    }
  }
  if (cta && cta.textContent.trim()) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.setAttribute('href', cta.getAttribute('href'));
    a.textContent = cta.textContent.trim();
    p.appendChild(a);
    textCell.push(p);
  }

  const cells = [[imageCell, textCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-featured', cells });
  element.replaceWith(block);
}

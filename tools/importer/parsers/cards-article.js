/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-article variant. Base: cards.
 * Source: https://wknd.site/us/en.html (used twice: Recent Articles, Next Adventures list)
 * Selector: .image-list.list
 * Model: cards-article-card (image, imageAlt [collapsed], text).
 * One row per card: image | linked title, description.
 */
export default function parse(element, { document }) {
  const cells = [];

  const items = Array.from(element.querySelectorAll('li.cmp-image-list__item'));

  items.forEach((item) => {
    const img = item.querySelector('.cmp-image-list__item-image img');
    const titleLink = item.querySelector('a.cmp-image-list__item-title-link');
    const imageLink = item.querySelector('a.cmp-image-list__item-image-link');
    const title = item.querySelector('.cmp-image-list__item-title');
    const desc = item.querySelector('.cmp-image-list__item-description');

    // Column 1: image
    const imageFrag = document.createDocumentFragment();
    if (img) {
      imageFrag.appendChild(document.createComment(' field:image '));
      imageFrag.appendChild(img);
    }

    // Column 2: text (linked title + description)
    const textFrag = document.createDocumentFragment();
    let hasText = false;
    const href = (titleLink && titleLink.getAttribute('href'))
      || (imageLink && imageLink.getAttribute('href'));
    const titleText = title ? title.textContent.trim() : '';
    if (titleText) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      if (href) {
        const a = document.createElement('a');
        a.setAttribute('href', href);
        a.textContent = titleText;
        strong.appendChild(a);
      } else {
        strong.textContent = titleText;
      }
      p.appendChild(strong);
      textFrag.appendChild(p);
      hasText = true;
    }
    if (desc && desc.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textFrag.appendChild(p);
      hasText = true;
    }
    if (hasText) {
      textFrag.insertBefore(document.createComment(' field:text '), textFrag.firstChild);
    }

    if (img || hasText) cells.push([imageFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}

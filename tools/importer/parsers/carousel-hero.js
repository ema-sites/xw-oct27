/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero variant. Base: carousel.
 * Source: https://wknd.site/us/en.html
 * Selector: .carousel.cmp-carousel--hero
 * Model: carousel-hero-item (media_image, media_imageAlt [collapsed], content_text).
 * One row per slide: image | heading, description, CTA.
 */
export default function parse(element, { document }) {
  const cells = [];

  const slides = Array.from(element.querySelectorAll('.cmp-carousel__item'));

  slides.forEach((slide) => {
    const img = slide.querySelector('.cmp-teaser__image img');
    const title = slide.querySelector('.cmp-teaser__title');
    const desc = slide.querySelector('.cmp-teaser__description');
    const cta = slide.querySelector('.cmp-teaser__action-container a');

    // Column 1: image (media_image)
    const imageFrag = document.createDocumentFragment();
    if (img) {
      imageFrag.appendChild(document.createComment(' field:media_image '));
      imageFrag.appendChild(img);
    }

    // Column 2: rich text (content_text)
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
      textFrag.insertBefore(document.createComment(' field:content_text '), textFrag.firstChild);
    }

    if (img || hasText) cells.push([imageFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}

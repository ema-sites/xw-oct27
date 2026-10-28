/**
 * columns-featured: one row, two cells.
 * Cell 1: image. Cell 2: eyebrow paragraph, heading, description, CTA link.
 * Unknown option classes on the block are ignored.
 */
export default function decorate(block) {
  const firstRow = block.firstElementChild;
  if (!firstRow) return;
  const cols = [...firstRow.children];
  block.classList.add(`columns-featured-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      const onlyPicture = pic && col.children.length === 1
        && (col.firstElementChild === pic || col.firstElementChild.contains(pic))
        && col.textContent.trim() === '';
      if (onlyPicture) {
        col.classList.add('columns-featured-img-col');
      } else {
        col.classList.add('columns-featured-text-col');
        // a short leading paragraph before the heading is the eyebrow
        const first = col.firstElementChild;
        const next = first?.nextElementSibling;
        if (first && first.tagName === 'P' && next && /^H[1-6]$/.test(next.tagName)) {
          first.classList.add('columns-featured-eyebrow');
        }
      }
    });
  });
}

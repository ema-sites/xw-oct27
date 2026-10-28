/**
 * hero-boxed: row 1 image, row 2 heading, description, CTA link.
 * Marks the image and content rows so the content box can overlap the image.
 * Unknown option classes on the block are ignored.
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    const hasPicture = !!row.querySelector('picture');
    const hasText = row.textContent.trim() !== '';
    if (hasPicture && !hasText) {
      row.classList.add('hero-boxed-image');
    } else if (hasText) {
      row.classList.add('hero-boxed-content');
    } else {
      // empty row (e.g. unset field in Universal Editor)
      row.classList.add('hero-boxed-empty');
    }
  });
}

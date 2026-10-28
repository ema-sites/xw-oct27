/* eslint-disable */
/* global WebImporter */

/**
 * WKND cleanup transformer.
 * Removes global chrome (header/footer experience fragments, mobile nav),
 * tracking iframes, and non-authorable widgets from the main content.
 * All selectors are taken from migration-work/cleaned.html.
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    WebImporter.DOMUtils.remove(element, [
      // Global header / footer experience fragments
      '.experiencefragment.cmp-experiencefragment--header',
      '.experiencefragment.cmp-experiencefragment--footer',
      '.cmp-experiencefragment--header',
      '.cmp-experiencefragment--footer',
      // Mobile navigation + toggle (outside main grid)
      '#toggleNav',
      '#mobileNav',
      '.cmp-navigation--mobile',
      // Adobe Audience Manager / demdex tracking iframe
      'iframe#destination_publishing_iframe_wkndsite_0',
      'iframe.aamIframeLoaded',
      'iframe[src*="demdex.net"]',
      // Sign-in buttons and language navigation (header widgets)
      '.sign-in-buttons',
      '.wknd-sign-in-buttons',
      '.languagenavigation',
      '.cmp-languagenavigation',
      // Carousel UI controls (not authorable content)
      '.cmp-carousel__actions',
      '.cmp-carousel__indicators',
    ]);
  }

  if (hookName === 'afterTransform') {
    WebImporter.DOMUtils.remove(element, [
      // Visual separators between components (section breaks come from the
      // sections transformer). Removed here, not in beforeTransform, because
      // section selectors use :nth-of-type() counts that include these divs.
      '.separator',
      '.cmp-separator',
      'header',
      'footer',
      'nav',
      'iframe',
      'noscript',
      'script',
      'style',
      'link',
      'button',
    ]);

    // Strip data-layer / tracking attributes
    element.querySelectorAll('[data-cmp-data-layer]').forEach((el) => el.removeAttribute('data-cmp-data-layer'));
    [
      'data-cmp-data-layer-enabled',
      'data-cmp-data-layer-name',
      'data-cmp-link-accessibility-enabled',
      'data-cmp-link-accessibility-text',
      'data-cmp-is',
      'data-cmp-clickable',
      'data-cmp-hook-carousel',
      'onclick',
    ].forEach((attr) => {
      element.querySelectorAll(`[${attr}]`).forEach((el) => el.removeAttribute(attr));
    });
  }
}

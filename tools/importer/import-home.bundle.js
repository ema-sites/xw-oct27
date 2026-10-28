/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document: document2 }) {
    const cells = [];
    const slides = Array.from(element.querySelectorAll(".cmp-carousel__item"));
    slides.forEach((slide) => {
      const img = slide.querySelector(".cmp-teaser__image img");
      const title = slide.querySelector(".cmp-teaser__title");
      const desc = slide.querySelector(".cmp-teaser__description");
      const cta = slide.querySelector(".cmp-teaser__action-container a");
      const imageFrag = document2.createDocumentFragment();
      if (img) {
        imageFrag.appendChild(document2.createComment(" field:media_image "));
        imageFrag.appendChild(img);
      }
      const textFrag = document2.createDocumentFragment();
      let hasText = false;
      if (title && title.textContent.trim()) {
        const h = document2.createElement("h2");
        h.textContent = title.textContent.trim();
        textFrag.appendChild(h);
        hasText = true;
      }
      if (desc && desc.textContent.trim()) {
        const paras = Array.from(desc.querySelectorAll("p")).filter((p) => p.textContent.trim());
        if (paras.length) {
          paras.forEach((p) => textFrag.appendChild(p));
        } else {
          const p = document2.createElement("p");
          p.textContent = desc.textContent.trim();
          textFrag.appendChild(p);
        }
        hasText = true;
      }
      if (cta && cta.textContent.trim()) {
        const p = document2.createElement("p");
        const a = document2.createElement("a");
        a.setAttribute("href", cta.getAttribute("href"));
        a.textContent = cta.textContent.trim();
        p.appendChild(a);
        textFrag.appendChild(p);
        hasText = true;
      }
      if (hasText) {
        textFrag.insertBefore(document2.createComment(" field:content_text "), textFrag.firstChild);
      }
      if (img || hasText) cells.push([imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-featured.js
  function parse2(element, { document: document2 }) {
    const img = element.querySelector(".cmp-teaser__image img");
    const pretitle = element.querySelector(".cmp-teaser__pretitle");
    const title = element.querySelector(".cmp-teaser__title");
    const desc = element.querySelector(".cmp-teaser__description");
    const cta = element.querySelector(".cmp-teaser__action-container a");
    const imageCell = [];
    if (img) imageCell.push(img);
    const textCell = [];
    if (pretitle && pretitle.textContent.trim()) {
      const p = document2.createElement("p");
      p.textContent = pretitle.textContent.trim();
      textCell.push(p);
    }
    if (title && title.textContent.trim()) {
      const h = document2.createElement("h2");
      h.textContent = title.textContent.trim();
      textCell.push(h);
    }
    if (desc && desc.textContent.trim()) {
      const paras = Array.from(desc.querySelectorAll("p")).filter((p) => p.textContent.trim());
      if (paras.length) {
        textCell.push(...paras);
      } else {
        const p = document2.createElement("p");
        p.textContent = desc.textContent.trim();
        textCell.push(p);
      }
    }
    if (cta && cta.textContent.trim()) {
      const p = document2.createElement("p");
      const a = document2.createElement("a");
      a.setAttribute("href", cta.getAttribute("href"));
      a.textContent = cta.textContent.trim();
      p.appendChild(a);
      textCell.push(p);
    }
    const cells = [[imageCell, textCell]];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-featured", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse3(element, { document: document2 }) {
    const cells = [];
    const items = Array.from(element.querySelectorAll("li.cmp-image-list__item"));
    items.forEach((item) => {
      const img = item.querySelector(".cmp-image-list__item-image img");
      const titleLink = item.querySelector("a.cmp-image-list__item-title-link");
      const imageLink = item.querySelector("a.cmp-image-list__item-image-link");
      const title = item.querySelector(".cmp-image-list__item-title");
      const desc = item.querySelector(".cmp-image-list__item-description");
      const imageFrag = document2.createDocumentFragment();
      if (img) {
        imageFrag.appendChild(document2.createComment(" field:image "));
        imageFrag.appendChild(img);
      }
      const textFrag = document2.createDocumentFragment();
      let hasText = false;
      const href = titleLink && titleLink.getAttribute("href") || imageLink && imageLink.getAttribute("href");
      const titleText = title ? title.textContent.trim() : "";
      if (titleText) {
        const p = document2.createElement("p");
        const strong = document2.createElement("strong");
        if (href) {
          const a = document2.createElement("a");
          a.setAttribute("href", href);
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
        const p = document2.createElement("p");
        p.textContent = desc.textContent.trim();
        textFrag.appendChild(p);
        hasText = true;
      }
      if (hasText) {
        textFrag.insertBefore(document2.createComment(" field:text "), textFrag.firstChild);
      }
      if (img || hasText) cells.push([imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-boxed.js
  function parse4(element, { document: document2 }) {
    const img = element.querySelector(".cmp-teaser__image img");
    const title = element.querySelector(".cmp-teaser__title");
    const desc = element.querySelector(".cmp-teaser__description");
    const cta = element.querySelector(".cmp-teaser__action-container a");
    const imageFrag = document2.createDocumentFragment();
    if (img) {
      imageFrag.appendChild(document2.createComment(" field:image "));
      imageFrag.appendChild(img);
    }
    const textFrag = document2.createDocumentFragment();
    let hasText = false;
    if (title && title.textContent.trim()) {
      const h = document2.createElement("h2");
      h.textContent = title.textContent.trim();
      textFrag.appendChild(h);
      hasText = true;
    }
    if (desc && desc.textContent.trim()) {
      const paras = Array.from(desc.querySelectorAll("p")).filter((p) => p.textContent.trim());
      if (paras.length) {
        paras.forEach((p) => textFrag.appendChild(p));
      } else {
        const p = document2.createElement("p");
        p.textContent = desc.textContent.trim();
        textFrag.appendChild(p);
      }
      hasText = true;
    }
    if (cta && cta.textContent.trim()) {
      const p = document2.createElement("p");
      const a = document2.createElement("a");
      a.setAttribute("href", cta.getAttribute("href"));
      a.textContent = cta.textContent.trim();
      p.appendChild(a);
      textFrag.appendChild(p);
      hasText = true;
    }
    if (hasText) {
      textFrag.insertBefore(document2.createComment(" field:text "), textFrag.firstChild);
    }
    const cells = [[imageFrag], [textFrag]];
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-boxed", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-cleanup.js
  function transform(hookName, element, payload) {
    if (hookName === "beforeTransform") {
      WebImporter.DOMUtils.remove(element, [
        // Global header / footer experience fragments
        ".experiencefragment.cmp-experiencefragment--header",
        ".experiencefragment.cmp-experiencefragment--footer",
        ".cmp-experiencefragment--header",
        ".cmp-experiencefragment--footer",
        // Mobile navigation + toggle (outside main grid)
        "#toggleNav",
        "#mobileNav",
        ".cmp-navigation--mobile",
        // Adobe Audience Manager / demdex tracking iframe
        "iframe#destination_publishing_iframe_wkndsite_0",
        "iframe.aamIframeLoaded",
        'iframe[src*="demdex.net"]',
        // Sign-in buttons and language navigation (header widgets)
        ".sign-in-buttons",
        ".wknd-sign-in-buttons",
        ".languagenavigation",
        ".cmp-languagenavigation",
        // Carousel UI controls (not authorable content)
        ".cmp-carousel__actions",
        ".cmp-carousel__indicators"
      ]);
    }
    if (hookName === "afterTransform") {
      WebImporter.DOMUtils.remove(element, [
        // Visual separators between components (section breaks come from the
        // sections transformer). Removed here, not in beforeTransform, because
        // section selectors use :nth-of-type() counts that include these divs.
        ".separator",
        ".cmp-separator",
        "header",
        "footer",
        "nav",
        "iframe",
        "noscript",
        "script",
        "style",
        "link",
        "button"
      ]);
      element.querySelectorAll("[data-cmp-data-layer]").forEach((el) => el.removeAttribute("data-cmp-data-layer"));
      [
        "data-cmp-data-layer-enabled",
        "data-cmp-data-layer-name",
        "data-cmp-link-accessibility-enabled",
        "data-cmp-link-accessibility-text",
        "data-cmp-is",
        "data-cmp-clickable",
        "data-cmp-hook-carousel",
        "onclick"
      ].forEach((attr) => {
        element.querySelectorAll(`[${attr}]`).forEach((el) => el.removeAttribute(attr));
      });
    }
  }

  // tools/importer/transformers/wknd-sections.js
  var MARKER_ATTR = "data-excat-section-id";
  function findSectionElement(root, section) {
    const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
    for (const sel of selectors) {
      if (!sel) continue;
      try {
        const el = root.querySelector(sel);
        if (el) return el;
      } catch (e) {
      }
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const template = payload && payload.template;
    const sections = template && template.sections || [];
    if (sections.length < 2) return;
    const doc = element.ownerDocument || document;
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const el = findSectionElement(element, section);
        if (!el || !el.parentNode) continue;
        if (i === 0) {
          if (section.style) {
            const hr2 = doc.createElement("hr");
            hr2.setAttribute(MARKER_ATTR, section.id);
            el.parentNode.insertBefore(hr2, el);
          }
          continue;
        }
        const hr = doc.createElement("hr");
        if (section.style) hr.setAttribute(MARKER_ATTR, section.id);
        el.parentNode.insertBefore(hr, el);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`hr[${MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || findSectionElement(element, section);
        if (!anchor || !anchor.parentNode) continue;
        const meta = WebImporter.Blocks.createBlock(doc, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        let next = anchor.nextSibling;
        while (next && !(next.nodeType === 1 && next.tagName === "HR")) next = next.nextSibling;
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
      element.querySelectorAll(`hr[${MARKER_ATTR}]`).forEach((hr) => {
        if (hr.getAttribute(MARKER_ATTR) === sections[0].id) hr.remove();
        else hr.removeAttribute(MARKER_ATTR);
      });
    }
  }

  // tools/importer/import-home.js
  var PAGE_TEMPLATE = {
    "name": "home",
    "urls": [
      "https://wknd.site/us/en.html"
    ],
    "representativeUrl": "https://wknd.site/us/en.html",
    "description": "WKND home page: hero carousel, featured article, recent articles cards, next adventure teaser, and adventure cards",
    "urlPattern": "/us/*",
    "blocks": [
      {
        "name": "carousel-hero",
        "instances": [
          ".carousel.cmp-carousel--hero"
        ]
      },
      {
        "name": "columns-featured",
        "instances": [
          ".teaser.cmp-teaser--featured"
        ]
      },
      {
        "name": "cards-article",
        "instances": [
          ".image-list.list"
        ]
      },
      {
        "name": "hero-boxed",
        "instances": [
          ".teaser.cmp-teaser--hero.cmp-teaser--imagebottom"
        ]
      }
    ],
    "sections": [
      {
        "id": "section-1",
        "name": "Hero carousel",
        "selector": [
          ".carousel.cmp-carousel--hero"
        ],
        "style": null,
        "blocks": [
          "carousel-hero"
        ],
        "defaultContent": []
      },
      {
        "id": "section-2",
        "name": "Featured article",
        "selector": [
          ".teaser.cmp-teaser--featured"
        ],
        "style": null,
        "blocks": [
          "columns-featured"
        ],
        "defaultContent": []
      },
      {
        "id": "section-3",
        "name": "Recent Articles",
        "selector": [
          ".cmp-layout-container--fixed:nth-of-type(1) .aem-Grid > .title.cmp-title--underline:nth-of-type(2)"
        ],
        "style": null,
        "blocks": [
          "cards-article"
        ],
        "defaultContent": [
          ".cmp-layout-container--fixed:nth-of-type(1) .aem-Grid > .title.cmp-title--underline:nth-of-type(2)",
          ".cmp-layout-container--fixed:nth-of-type(1) .aem-Grid > .button.cmp-button--primary"
        ]
      },
      {
        "id": "section-4",
        "name": "Next Adventures",
        "selector": [
          ".cmp-layout-container--fixed:nth-of-type(1) .aem-Grid > .title.cmp-title--underline:nth-of-type(6)"
        ],
        "style": null,
        "blocks": [
          "hero-boxed"
        ],
        "defaultContent": [
          ".cmp-layout-container--fixed:nth-of-type(1) .aem-Grid > .title.cmp-title--underline:nth-of-type(6)"
        ]
      },
      {
        "id": "section-5",
        "name": "Where do you want to go",
        "selector": [
          ".cmp-layout-container--fixed:nth-of-type(2) .aem-Grid > .title:not(.cmp-title--underline)"
        ],
        "style": null,
        "blocks": [
          "cards-article"
        ],
        "defaultContent": [
          ".cmp-layout-container--fixed:nth-of-type(2) .aem-Grid > .title:not(.cmp-title--underline)",
          ".cmp-layout-container--fixed:nth-of-type(2) .aem-Grid > .button.cmp-button--primary"
        ]
      }
    ]
  };
  var parsers = {
    "carousel-hero": parse,
    "columns-featured": parse2,
    "cards-article": parse3,
    "hero-boxed": parse4
  };
  var transformers = [transform, transform2];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((fn) => {
      try {
        fn(hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        document2.querySelectorAll(selector).forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element });
        });
      });
    });
    return pageBlocks;
  }
  var import_home_default = {
    transform: (payload) => {
      const { document: document2, url, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (!parser) return;
        try {
          parser(block.element, { document: document2, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      });
      executeTransformers("afterTransform", main, payload);
      main.appendChild(document2.createElement("hr"));
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: { title: document2.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();

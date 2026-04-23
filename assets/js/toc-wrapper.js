/**
 * TOC Wrapper - Creates the table of contents DOM structure
 * Generates links from h2 and descendant headings (h3, h4, h5, h6)
 * Excludes headings that are wrapped in divs
 */

class TOCWrapper {
  constructor() {
    this.headings = [];
  }

  /**
   * Check if a heading is wrapped in a non-content__entry div
   * (skip headings inside extra div wrappers, but keep headings in the content__entry container)
   */
  isHeadingWrappedInDiv(heading) {
    if (!heading.parentElement) return false;
    const parent = heading.parentElement;
    if (parent.tagName.toLowerCase() !== 'div') return false;
    if (parent.classList.contains('content__entry')) return false;
    return true;
  }

  /**
   * Collect all h2+ headings from .content__entry
   */
  collectHeadings() {
    this.headings = [];
    const contentEntry = document.querySelector('.content__entry');
    if (!contentEntry) return this.headings;

    const allHeadings = contentEntry.querySelectorAll('h2, h3, h4, h5, h6');
    let foundFirstH2 = false;

    for (let heading of allHeadings) {
      // Skip if wrapped in a div
      if (this.isHeadingWrappedInDiv(heading)) {
        continue;
      }

      // For h2, always include and mark that we've found the first one
      if (heading.tagName.toLowerCase() === 'h2') {
        foundFirstH2 = true;
        this.headings.push(heading);
      }
      // For h3+ only include if we've already found an h2
      else if (foundFirstH2) {
        this.headings.push(heading);
      }
    }

    return this.headings;
  }

  /**
   * Ensure each heading has a unique ID
   */
  ensureHeadingIds() {
    this.headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
    });
  }

  /**
   * Get the heading level (2-6) for proper nesting
   */
  getHeadingLevel(heading) {
    return parseInt(heading.tagName.toLowerCase().substring(1), 10);
  }

  /**
   * Create the TOC list structure
   */
  createTocList() {
    const ul = document.createElement('ul');

    if (this.headings.length === 0) {
      return ul;
    }

    let currentLevel = this.getHeadingLevel(this.headings[0]);
    let currentList = ul;
    const listStack = [{ level: currentLevel, list: ul }];

    this.headings.forEach((heading) => {
      const headingLevel = this.getHeadingLevel(heading);
      const targetLevel = Math.min(headingLevel, currentLevel + 1);

      // If going deeper, create nested lists
      while (targetLevel > currentLevel) {
        const newList = document.createElement('ul');
        if (currentList.lastElementChild) {
          currentList.lastElementChild.appendChild(newList);
        } else {
          currentList.appendChild(document.createElement('li')).appendChild(newList);
        }
        currentList = newList;
        currentLevel++;
        listStack.push({ level: currentLevel, list: newList });
      }

      // If going back up, pop from stack
      while (headingLevel < currentLevel && listStack.length > 1) {
        listStack.pop();
        currentList = listStack[listStack.length - 1].list;
        currentLevel = listStack[listStack.length - 1].level;
      }

      // Create the list item with link
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${heading.id}`;
      a.textContent = heading.textContent;
      li.appendChild(a);
      currentList.appendChild(li);
    });

    return ul;
  }

  /**
   * Create the complete TOC DOM structure
   */
  createTocStructure() {
    // Create wrapper
    const wrapper = document.createElement('aside');
    wrapper.className = 'toc-wrapper';
    wrapper.setAttribute('aria-label', 'Table of Contents');

    // Create header with toggle button
    const header = document.createElement('div');
    header.className = 'toc-header';

    const title = document.createElement('h3');
    title.className = 'toc-title';
    title.textContent = 'Contents';
    header.appendChild(title);

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'toc-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle table of contents');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.innerHTML = '<span class="toc-toggle-icon">✕</span>';
    header.appendChild(toggleBtn);

    wrapper.appendChild(header);

    // Create nav with TOC list
    const nav = document.createElement('nav');
    nav.className = 'toc-nav';
    const tocList = this.createTocList();
    nav.appendChild(tocList);

    wrapper.appendChild(nav);

    return wrapper;
  }

  /**
   * Insert the TOC into the main content
   */
  insertToc() {
    const contentEntry = document.querySelector('.content__entry');
    if (!contentEntry) return null;

    const tocStructure = this.createTocStructure();

    // Preferred: insert outside .content__inner, as sibling to that wrapper inside .content
    const contentInner = contentEntry.closest('.content__inner');
    if (contentInner) {
      const content = contentInner.closest('.content');
      if (content) {
        content.insertBefore(tocStructure, contentInner);
        return tocStructure;
      }
    }

    // Fallback 1: insert as sibling before .content__entry inside .content__inner
    const wrapperParent = contentEntry.parentElement;
    if (wrapperParent && wrapperParent.classList.contains('content__inner')) {
      wrapperParent.insertBefore(tocStructure, contentEntry);
      return tocStructure;
    }

    // Fallback 2: place inside contentEntry as last resort
    contentEntry.insertBefore(tocStructure, contentEntry.firstChild);
    return tocStructure;
  }

  /**
   * Full initialization
   */
  init() {
    this.collectHeadings();

    if (this.headings.length === 0) {
      return null;
    }

    this.ensureHeadingIds();
    const toc = this.insertToc();

    return toc;
  }
}
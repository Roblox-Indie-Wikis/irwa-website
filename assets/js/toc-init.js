/**
 * TOC Init - Auto-initialization on page load
 * Creates and initializes TOC for pages with h2 headings
 */

function initializeTOC() {
  // Check if TOC is enabled on this page
  const body = document.body;
  if (!body || !body.classList.contains('toc-enabled')) {
    return;
  }

  const contentEntry = document.querySelector('.content__entry');
  if (!contentEntry) return;

  // Check if page already has a TOC (skip re-initialization)
  if (contentEntry.querySelector('.toc-wrapper')) {
    return;
  }

  // Only initialize on pages that have h2 headings (excluding headings inside extra wrapper divs)
  const h2s = Array.from(contentEntry.querySelectorAll('h2')).filter((h2) => {
    if (!h2.parentElement) return false;
    if (h2.parentElement.classList.contains('content__entry')) return true;
    if (h2.parentElement.tagName.toLowerCase() !== 'div') return true;
    return false;
  });

  if (h2s.length === 0) {
    return;
  }

  // Check if TOCWrapper class exists
  if (typeof TOCWrapper === 'undefined') {
    return;
  }

  // Initialize TOC wrapper and sticky functionality
  const tocWrapper = new TOCWrapper();
  const toc = tocWrapper.init();

  if (toc && typeof TOCSticky !== 'undefined') {
    new TOCSticky(toc);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTOC);
} else {
  // DOM is already loaded
  initializeTOC();
}
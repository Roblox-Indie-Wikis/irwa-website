/**
 * TOC Sticky - Handles sticky positioning and mobile toggle functionality
 */

class TOCSticky {
  constructor(tocElement) {
    this.tocElement = tocElement;
    this.toggleBtn = tocElement.querySelector('.toc-toggle');
    this.tocNav = tocElement.querySelector('.toc-nav');
    this.isOpen = true;
    this.isMobile = null;

    this.init();
  }

  /**
   * Initialize event listeners
   */
  init() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleToc());
    }

    // Handle window resize for responsive behavior
    window.addEventListener('resize', () => this.handleResize());

    // Set initial state based on screen size
    this.setInitialState();

    // Handle scroll for active link highlighting
    this.setupScrollTracking();
  }

  /**
   * Determine initial state based on screen size
   */
  setInitialState() {
    const newIsMobile = window.innerWidth < 1024;

    if (newIsMobile === this.isMobile) return;

    this.isMobile = newIsMobile;
    if (this.isMobile) {
      this.closeToc();
    } else {
      this.openToc();
    }
  }

  /**
   * Handle window resize events
   */
  handleResize() {
    this.setInitialState();
  }

  /**
   * Toggle TOC visibility (mainly for mobile)
   */
  toggleToc() {
    if (this.isOpen) {
      this.closeToc();
    } else {
      this.openToc();
    }
  }

  /**
   * Close TOC
   */
  closeToc() {
    this.isOpen = false;
    this.tocElement.classList.add('is-closed');
    this.tocNav.setAttribute('aria-hidden', 'true');
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this.toggleBtn.innerHTML = '<span class="toc-toggle-icon">☰</span>';
  }

  /**
   * Open TOC
   */
  openToc() {
    this.isOpen = true;
    this.tocElement.classList.remove('is-closed');
    this.tocNav.setAttribute('aria-hidden', 'false');
    this.toggleBtn.setAttribute('aria-expanded', 'true');
    this.toggleBtn.innerHTML = '<span class="toc-toggle-icon">✕</span>';
  }

  /**
   * Track scroll position and update active link highlighting
   */
  setupScrollTracking() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -50% 0px', // Only consider top 50% as "in view"
        threshold: 0,
      }
    );

    // Observe only headings that are actually represented in the TOC
    this.tocElement.querySelectorAll('.toc-nav a[href^="#"]').forEach((link) => {
      const id = link.getAttribute('href').slice(1);
      const heading = document.getElementById(id);
      if (heading) {
        observer.observe(heading);
      }
    });
  }

  /**
   * Set the active link in TOC based on current scroll position
   */
  setActiveLink(headingId) {
    // Remove active class from all links
    this.tocElement.querySelectorAll('.toc-nav a').forEach((link) => {
      link.classList.remove('is-active');
    });

    // Add active class to the current heading's link
    const activeLink = this.tocElement.querySelector(
      `.toc-nav a[href="#${headingId}"]`
    );
    if (activeLink) {
      activeLink.classList.add('is-active');
    }
  }
}

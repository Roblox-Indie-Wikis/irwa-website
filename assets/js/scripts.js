// Dropdown menu
(function (menuConfig) {
	/**
	 * Merge default config with the theme overrided ones
	 */
	var defaultConfig = {
		// behaviour
		mobileMenuMode: 'overlay',
		animationSpeed: 300,
		submenuWidth: 300,
		doubleClickTime: 500,
		mobileMenuExpandableSubmenus: false,
		isHoverMenu: true,
		// selectors
		wrapperSelector: '.navbar',
		buttonSelector: '.navbar__toggle',
		menuSelector: '.navbar__menu',
		submenuSelector: '.navbar__submenu',
		mobileMenuSidebarLogoSelector: null,
		mobileMenuSidebarLogoUrl: null,
		relatedContainerForOverlayMenuSelector: null,
		// attributes
		ariaButtonAttribute: 'aria-haspopup',
		// CSS classes
		separatorItemClass: 'is-separator',
		parentItemClass: 'has-submenu',
		submenuLeftPositionClass: 'is-left-submenu',
		submenuRightPositionClass: 'is-right-submenu',
		mobileMenuOverlayClass: 'navbar_mobile_overlay',
		mobileMenuSubmenuWrapperClass: 'navbar__submenu_wrapper',
		mobileMenuSidebarClass: 'navbar_mobile_sidebar',
		mobileMenuSidebarOverlayClass: 'navbar_mobile_sidebar__overlay',
		hiddenElementClass: 'is-hidden',
		openedMenuClass: 'is-active',
		noScrollClass: 'no-scroll',
		relatedContainerForOverlayMenuClass: 'is-visible'
	};

	var config = {};

	Object.keys(defaultConfig).forEach(function (key) {
		config[key] = defaultConfig[key];
	});

	if (typeof menuConfig === 'object') {
		Object.keys(menuConfig).forEach(function (key) {
			config[key] = menuConfig[key];
		});
	}

	/**
	 * Menu initializer
	 */
	function init() {
		if (!document.querySelectorAll(config.wrapperSelector).length) {
			return;
		}

		initSubmenuPositions();

		if (config.mobileMenuMode === 'overlay') {
			initMobileMenuOverlay();
		} else if (config.mobileMenuMode === 'sidebar') {
			initMobileMenuSidebar();
		}

		initClosingMenuOnClickLink();

		if (!config.isHoverMenu) {
			initAriaAttributes();
		}
	};

	/**
	 * Function responsible for the submenu positions
	 */
	function initSubmenuPositions() {
		var submenuParents = document.querySelectorAll(config.wrapperSelector + ' .' + config.parentItemClass);

		for (var i = 0; i < submenuParents.length; i++) {
			var eventTrigger = config.isHoverMenu ? 'mouseenter' : 'click';

			submenuParents[i].addEventListener(eventTrigger, function () {
				var submenu = this.querySelector(config.submenuSelector);
				var itemPosition = this.getBoundingClientRect().left;
				var widthMultiplier = 2;

				if (this.parentNode === document.querySelector(config.menuSelector)) {
					widthMultiplier = 1;
				}

				if (config.submenuWidth !== 'auto') {
					var submenuPotentialPosition = itemPosition + (config.submenuWidth * widthMultiplier);

					if (window.innerWidth < submenuPotentialPosition) {
						submenu.classList.remove(config.submenuLeftPositionClass);
						submenu.classList.add(config.submenuRightPositionClass);
					} else {
						submenu.classList.remove(config.submenuRightPositionClass);
						submenu.classList.add(config.submenuLeftPositionClass);
					}
				} else {
					var submenuPotentialPosition = 0;
					var submenuPosition = 0;

					if (widthMultiplier === 1) {
						submenuPotentialPosition = itemPosition + submenu.clientWidth;
					} else {
						submenuPotentialPosition = itemPosition + this.clientWidth + submenu.clientWidth;
					}

					if (window.innerWidth < submenuPotentialPosition) {
						submenu.classList.remove(config.submenuLeftPositionClass);
						submenu.classList.add(config.submenuRightPositionClass);
						submenuPosition = -1 * submenu.clientWidth;
						submenu.removeAttribute('style');

						if (widthMultiplier === 1) {
							submenuPosition = 0;
							submenu.style.right = submenuPosition + 'px';
						} else {
							submenu.style.right = this.clientWidth + 'px';
						}
					} else {
						submenu.classList.remove(config.submenuRightPositionClass);
						submenu.classList.add(config.submenuLeftPositionClass);
						submenuPosition = this.clientWidth;

						if (widthMultiplier === 1) {
							submenuPosition = 0;
						}

						submenu.removeAttribute('style');
						submenu.style.left = submenuPosition + 'px';
					}
				}

				submenu.setAttribute('aria-hidden', false);
			});

			if (config.isHoverMenu) {
				submenuParents[i].addEventListener('mouseleave', function () {
					var submenu = this.querySelector(config.submenuSelector);
					submenu.removeAttribute('style');
					submenu.setAttribute('aria-hidden', true);
				});
			}
		}
	}

	/**
	 * Function used to init mobile menu - overlay mode
	 */
	function initMobileMenuOverlay() {
		var menuWrapper = document.createElement('div');
		menuWrapper.classList.add(config.mobileMenuOverlayClass);
		menuWrapper.classList.add(config.hiddenElementClass);
		var menuContentHTML = document.querySelector(config.menuSelector).outerHTML;
		menuWrapper.innerHTML = menuContentHTML;
		document.body.appendChild(menuWrapper);

		// Init toggle submenus
		if (config.mobileMenuExpandableSubmenus) {
			wrapSubmenusIntoContainer(menuWrapper);
			initToggleSubmenu(menuWrapper);
		} else {
			setAriaForSubmenus(menuWrapper);
		}

		// Init button events
		var button = document.querySelector(config.buttonSelector);

		button.addEventListener('click', function () {
			var relatedContainer = document.querySelector(config.relatedContainerForOverlayMenuSelector);
			menuWrapper.classList.toggle(config.hiddenElementClass);
			button.classList.toggle(config.openedMenuClass);
			button.setAttribute(config.ariaButtonAttribute, button.classList.contains(config.openedMenuClass));

			if (button.classList.contains(config.openedMenuClass)) {
				document.documentElement.classList.add(config.noScrollClass);

				if (relatedContainer) {
					relatedContainer.classList.add(config.relatedContainerForOverlayMenuClass);
				}
			} else {
				document.documentElement.classList.remove(config.noScrollClass);

				if (relatedContainer) {
					relatedContainer.classList.remove(config.relatedContainerForOverlayMenuClass);
				}
			}
		});
	}

	/**
	 * Function used to init mobile menu - sidebar mode
	 */
	function initMobileMenuSidebar() {
		// Create menu structure
		var menuWrapper = document.createElement('div');
		menuWrapper.classList.add(config.mobileMenuSidebarClass);
		menuWrapper.classList.add(config.hiddenElementClass);
		var menuContentHTML = '';

		if (config.mobileMenuSidebarLogoSelector !== null) {
			menuContentHTML = document.querySelector(config.mobileMenuSidebarLogoSelector).outerHTML;
		} else if (config.mobileMenuSidebarLogoUrl !== null) {
			menuContentHTML = '<img src="' + config.mobileMenuSidebarLogoUrl + '" alt="" />';
		}

		menuContentHTML += document.querySelector(config.menuSelector).outerHTML;
		menuWrapper.innerHTML = menuContentHTML;

		var menuOverlay = document.createElement('div');
		menuOverlay.classList.add(config.mobileMenuSidebarOverlayClass);
		menuOverlay.classList.add(config.hiddenElementClass);

		document.body.appendChild(menuOverlay);
		document.body.appendChild(menuWrapper);

		// Init toggle submenus
		if (config.mobileMenuExpandableSubmenus) {
			wrapSubmenusIntoContainer(menuWrapper);
			initToggleSubmenu(menuWrapper);
		} else {
			setAriaForSubmenus(menuWrapper);
		}

		// Menu events
		menuWrapper.addEventListener('click', function (e) {
			e.stopPropagation();
		});

		menuOverlay.addEventListener('click', function () {
			menuWrapper.classList.add(config.hiddenElementClass);
			menuOverlay.classList.add(config.hiddenElementClass);
			button.classList.remove(config.openedMenuClass);
			button.setAttribute(config.ariaButtonAttribute, false);
			document.documentElement.classList.remove(config.noScrollClass);
		});

		// Init button events
		var button = document.querySelector(config.buttonSelector);

		button.addEventListener('click', function () {
			menuWrapper.classList.toggle(config.hiddenElementClass);
			menuOverlay.classList.toggle(config.hiddenElementClass);
			button.classList.toggle(config.openedMenuClass);
			button.setAttribute(config.ariaButtonAttribute, button.classList.contains(config.openedMenuClass));
			document.documentElement.classList.toggle(config.noScrollClass);
		});
	}

	/**
	 * Set aria-hidden="false" for submenus
	 */
	function setAriaForSubmenus(menuWrapper) {
		var submenus = menuWrapper.querySelectorAll(config.submenuSelector);

		for (var i = 0; i < submenus.length; i++) {
			submenus[i].setAttribute('aria-hidden', false);
		}
	}

	/**
	 * Wrap all submenus into div wrappers
	 */
	function wrapSubmenusIntoContainer(menuWrapper) {
		var submenus = menuWrapper.querySelectorAll(config.submenuSelector);

		for (var i = 0; i < submenus.length; i++) {
			var submenuWrapper = document.createElement('div');
			submenuWrapper.classList.add(config.mobileMenuSubmenuWrapperClass);
			submenus[i].parentNode.insertBefore(submenuWrapper, submenus[i]);
			submenuWrapper.appendChild(submenus[i]);
		}
	}

	/**
	 * Initialize submenu toggle events
	 */
	function initToggleSubmenu(menuWrapper) {
		// Init parent menu item events
		var parents = menuWrapper.querySelectorAll('.' + config.parentItemClass);

		for (var i = 0; i < parents.length; i++) {
			// Add toggle events
			parents[i].addEventListener('click', function (e) {
				e.stopPropagation();
				var submenu = this.querySelector('.' + config.mobileMenuSubmenuWrapperClass);
				var content = submenu.firstElementChild;

				if (submenu.classList.contains(config.openedMenuClass)) {
					var height = content.clientHeight;
					submenu.style.height = height + 'px';

					setTimeout(function () {
						submenu.style.height = '0px';
					}, 0);

					setTimeout(function () {
						submenu.removeAttribute('style');
						submenu.classList.remove(config.openedMenuClass);
					}, config.animationSpeed);

					content.setAttribute('aria-hidden', true);
					content.parentNode.firstElementChild.setAttribute('aria-expanded', false);
				} else {
					var height = content.clientHeight;
					submenu.classList.add(config.openedMenuClass);
					submenu.style.height = '0px';

					setTimeout(function () {
						submenu.style.height = height + 'px';
					}, 0);

					setTimeout(function () {
						submenu.removeAttribute('style');
					}, config.animationSpeed);

					content.setAttribute('aria-hidden', false);
					content.parentNode.firstElementChild.setAttribute('aria-expanded', true);
				}
			});

			// Block links
			var childNodes = parents[i].children;

			for (var j = 0; j < childNodes.length; j++) {
				if (childNodes[j].tagName === 'A') {
					childNodes[j].addEventListener('click', function (e) {
						var lastClick = parseInt(this.getAttribute('data-last-click'), 10);
						var currentTime = +new Date();

						if (isNaN(lastClick)) {
							e.preventDefault();
							this.setAttribute('data-last-click', currentTime);
						} else if (lastClick + config.doubleClickTime <= currentTime) {
							e.preventDefault();
							this.setAttribute('data-last-click', currentTime);
						} else if (lastClick + config.doubleClickTime > currentTime) {
							e.stopPropagation();
							closeMenu(this, true);
						}
					});
				}
			}
		}
	}

	/**
	 * Set aria-* attributes according to the current activity state
	 */
	function initAriaAttributes() {
		var allAriaElements = document.querySelectorAll(config.wrapperSelector + ' ' + '*[aria-hidden]');

		for (var i = 0; i < allAriaElements.length; i++) {
			var ariaElement = allAriaElements[i];

			if (
				ariaElement.parentNode.classList.contains('active') ||
				ariaElement.parentNode.classList.contains('active-parent')
			) {
				ariaElement.setAttribute('aria-hidden', 'false');
				ariaElement.parentNode.firstElementChild.setAttribute('aria-expanded', true);
			} else {
				ariaElement.setAttribute('aria-hidden', 'true');
				ariaElement.parentNode.firstElementChild.setAttribute('aria-expanded', false);
			}
		}
	}

	/**
	 * Close menu on click link
	 */
	function initClosingMenuOnClickLink() {
		var links = document.querySelectorAll(config.menuSelector + ' a');

		for (var i = 0; i < links.length; i++) {
			if (links[i].parentNode.classList.contains(config.parentItemClass)) {
				continue;
			}

			links[i].addEventListener('click', function (e) {
				closeMenu(this, false);
			});
		}
	}

	/**
	 * Close menu
	 */
	function closeMenu(clickedLink, forceClose) {
		if (forceClose === false) {
			if (clickedLink.parentNode.classList.contains(config.parentItemClass)) {
				return;
			}
		}

		var relatedContainer = document.querySelector(config.relatedContainerForOverlayMenuSelector);
		var button = document.querySelector(config.buttonSelector);
		var menuWrapper = document.querySelector('.' + config.mobileMenuOverlayClass);

		if (!menuWrapper) {
			menuWrapper = document.querySelector('.' + config.mobileMenuSidebarClass);
		}

		menuWrapper.classList.add(config.hiddenElementClass);
		button.classList.remove(config.openedMenuClass);
		button.setAttribute(config.ariaButtonAttribute, false);
		document.documentElement.classList.remove(config.noScrollClass);

		if (relatedContainer) {
			relatedContainer.classList.remove(config.relatedContainerForOverlayMenuClass);
		}

		var menuOverlay = document.querySelector('.' + config.mobileMenuSidebarOverlayClass);

		if (menuOverlay) {
			menuOverlay.classList.add(config.hiddenElementClass);
		}
	}

	/**
	 * Run menu scripts
	 */
	init();
})(window.publiiThemeMenuConfig);

/**
 * Basic HTML sanitizer to allow safe formatting tags
 */
window.sanitizeHTML = function (html) {
	// If the string starts with &lt;, it was escaped by Liquid.
	// We need to unescape it first so DOMParser can see the tags.
	let unescaped = html;
	if (html.includes('&lt;') || html.includes('&gt;')) {
		const temp = document.createElement('div');
		temp.innerHTML = html;
		unescaped = temp.textContent;
	}

	const doc = new DOMParser().parseFromString(unescaped, 'text/html');
	const allowedTags = ['B', 'I', 'EM', 'STRONG', 'A', 'BR'];

	function clean(node) {
		for (let i = node.childNodes.length - 1; i >= 0; i--) {
			const child = node.childNodes[i];
			if (child.nodeType === 1) { // Element node
				if (!allowedTags.includes(child.tagName)) {
					const text = document.createTextNode(child.textContent);
					child.parentNode.replaceChild(text, child);
				} else {
					if (child.tagName === 'A') {
						const href = child.getAttribute('href');
						if (href && (href.startsWith('http') || href.startsWith('/') || href.startsWith('#'))) {
							// Strip all attributes except href
							while (child.attributes.length > 0) {
								child.removeAttribute(child.attributes[0].name);
							}
							child.setAttribute('href', href);

							// Only add target="_blank" and rel for external absolute URLs
							if (href.startsWith('http://') || href.startsWith('https://')) {
								try {
									const url = new URL(href);
									if (url.origin !== window.location.origin) {
										child.setAttribute('target', '_blank');
										child.setAttribute('rel', 'noopener noreferrer');
									}
								} catch (e) {
									// Invalid URL, don't add target/rel
								}
							}
						} else {
							const text = document.createTextNode(child.textContent);
							child.parentNode.replaceChild(text, child);
							continue;
						}
					}
					clean(child);
				}
			}
		}
	}

	clean(doc.body);
	return doc.body.innerHTML;
};

// Share buttons pop-up
(function () {
	// share popup
	const shareButton = document.querySelector('.js-content__share-button');
	const sharePopup = document.querySelector('.js-content__share-popup');

	if (shareButton && sharePopup) {
		sharePopup.addEventListener('click', function (e) {
			e.stopPropagation();
		});

		shareButton.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			sharePopup.classList.toggle('is-visible');
		});

		document.body.addEventListener('click', function () {
			sharePopup.classList.remove('is-visible');
		});
	}

	// link selector and pop-up window size
	const Config = {
		Link: ".js-share",
		Width: 500,
		Height: 500
	};

	// add handler to links
	const shareLinks = document.querySelectorAll(Config.Link);
	shareLinks.forEach(link => {
		link.addEventListener('click', PopupHandler);
	});

	// create popup
	function PopupHandler(e) {
		e.preventDefault();

		const target = e.target.closest(Config.Link);
		if (!target) return;

		// hide share popup
		if (sharePopup) {
			sharePopup.classList.remove('is-visible');
		}

		// popup position
		const px = Math.floor((window.innerWidth - Config.Width) / 2);
		const py = Math.floor((window.innerHeight - Config.Height) / 2);

		// open popup
		const linkHref = target.href;
		const popup = window.open(linkHref, "social", `
			  width=${Config.Width},
			  height=${Config.Height},
			  left=${px},
			  top=${py},
			  location=0,
			  menubar=0,
			  toolbar=0,
			  status=0,
			  scrollbars=1,
			  resizable=1
		 `);

		if (popup) {
			popup.focus();
		}
	}
})();

// Back to top
const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
	window.addEventListener('scroll', () => {
		if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
			backToTopButton.classList.add("is-visible");
		} else {
			backToTopButton.classList.remove("is-visible");
		}
	});

	backToTopButton.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}


/**
 * Responsive embeds script
 */
(function () {
	let wrappers = document.querySelectorAll('.post__video, .post__iframe');

	for (let i = 0; i < wrappers.length; i++) {
		let embed = wrappers[i].querySelector('iframe, embed, video, object');

		if (!embed) {
			continue;
		}

		if (embed.getAttribute('data-responsive') === 'false') {
			continue;
		}

		let w = embed.getAttribute('width');
		let h = embed.getAttribute('height');
		let ratio = false;

		if (!w || !h) {
			continue;
		}

		if (w.indexOf('%') > -1 && h.indexOf('%') > -1) { // percentage mode
			w = parseFloat(w.replace('%', ''));
			h = parseFloat(h.replace('%', ''));
			ratio = h / w;
		} else if (w.indexOf('%') === -1 && h.indexOf('%') === -1) { // pixels mode
			w = parseInt(w, 10);
			h = parseInt(h, 10);
			ratio = h / w;
		}

		if (ratio !== false) {
			let ratioValue = (ratio * 100) + '%';
			wrappers[i].setAttribute('style', '--embed-aspect-ratio:' + ratioValue);
		}
	}
})();

// Search
const searchButton = document.querySelector('.js-search-btn');
const searchOverlay = document.querySelector('.js-search-overlay');
const searchInput = document.querySelector('.search__input');

if (searchButton && searchOverlay) {
	searchButton.addEventListener('click', (e) => {
		e.stopPropagation();
		searchOverlay.classList.toggle('expanded');

		if (searchInput) {
			setTimeout(() => {
				if (searchOverlay.classList.contains('expanded')) {
					searchInput.focus();
				}
			}, 60);
		}
	});

	searchOverlay.addEventListener('click', (e) => {
		e.stopPropagation();
	});

	document.body.addEventListener('click', () => {
		searchOverlay.classList.remove('expanded');
	});
}


/**
 * Layout switcher
 */
(function () {
	let layoutButtons = document.querySelectorAll('.switchers__item');
	let contentWrapper = document.querySelector('.l-grid');
	let articles;

	if (contentWrapper) {
		articles = contentWrapper.querySelectorAll('.c-card');
	}

	if (!contentWrapper || !layoutButtons.length || (articles && !articles.length)) {
		return;
	}

	let gridBtn = layoutButtons[0];
	let rowsBtn = layoutButtons[1];

	gridBtn.addEventListener('click', e => {
		e.preventDefault();
		let isActive = gridBtn.classList.contains('is-active');

		if (!isActive) {
			setGridLayout();
		}
	});

	rowsBtn.addEventListener('click', e => {
		e.preventDefault();
		let isActive = rowsBtn.classList.contains('is-active');

		if (!isActive) {
			setRowsLayout();
		}
	});

	function setGridLayout() {
		gridBtn.classList.add('is-active');
		rowsBtn.classList.remove('is-active');
		contentWrapper.classList.remove('l-grid--1');
		articles = contentWrapper.querySelectorAll('.c-card');

		for (let i = 0; i < articles.length; i++) {
			articles[i].classList.remove('c-card--rows');
		}

		localStorage.setItem('persona-theme-selected-layout', 'grid');
		resetIsotopeLayout();
	}

	function setRowsLayout() {
		gridBtn.classList.remove('is-active');
		rowsBtn.classList.add('is-active');
		contentWrapper.classList.add('l-grid--1');
		articles = contentWrapper.querySelectorAll('.c-card');

		for (let i = 0; i < articles.length; i++) {
			articles[i].classList.add('c-card--rows');
		}

		localStorage.setItem('persona-theme-selected-layout', 'rows');
		resetIsotopeLayout();
	}

	function resetIsotopeLayout() {
		if (window.personaThemeIsotopeInstance) {
			if (document.querySelector('.filter__item.is-active')) {
				window.personaThemeIsotopeInstance.arrange({
					filter: document.querySelector('.filter__item.is-active').getAttribute('data-filter')
				});
			} else {
				window.personaThemeIsotopeInstance.arrange();
			}
		}
	}

	window.addEventListener("DOMContentLoaded", function () {
		setTimeout(() => {
			if (localStorage.getItem('persona-theme-selected-layout')) {
				let savedLayout = localStorage.getItem('persona-theme-selected-layout');

				if (savedLayout === 'grid') {
					setGridLayout();
				}

				if (savedLayout === 'rows') {
					setRowsLayout();
				}
			}
		}, 0);
	}, false);
})();

(function () {
	// Helper function to get the current logo URL for a member element
	const getCurrentLogo = (element) => {
		// Returns the logoWhite attribute directly
		return element.dataset.logo;
	};

	// Make it globally available for the modal
	window.getCurrentLogo = getCurrentLogo;
})();

(function () {
	const header = document.querySelector('.site-header');
	if (!header) return;
	window.addEventListener('scroll', () => {
		header.classList.toggle('scrolled', window.scrollY > 50);
	}, { passive: true });
})();

/**
 * Randomize the home page background image on each page load
 */
function initHomeBackgroundRotation() {
	var body = document.body;
	if (!body.classList.contains('home-template')) {
		return;
	}

	var baseUrl = document.documentElement.getAttribute('data-baseurl') || '/';
	if (!baseUrl.endsWith('/')) {
		baseUrl += '/';
	}

	var backgroundImages = [
		baseUrl + 'assets/backgrounds/Fisch_Ancient_Isle.png',
		baseUrl + 'assets/backgrounds/Fisch_Trade_Plaza.png',
		baseUrl + 'assets/backgrounds/Fisch_Toxic_Grove.png',
		baseUrl + 'assets/backgrounds/GBP_San_Sebastian.png',
		baseUrl + 'assets/backgrounds/GBP_London.png',
		baseUrl + 'assets/backgrounds/UTG_Raven_Ranch.png',
		baseUrl + 'assets/backgrounds/UTG_Tokyo_Town.png',
		baseUrl + 'assets/backgrounds/UTG_Skylands.png',
		baseUrl + 'assets/backgrounds/Dovedale_Central.png',
		baseUrl + 'assets/backgrounds/Dovedale_Sunset.png',
		baseUrl + 'assets/backgrounds/Dovedale_Tunnel.png',
		baseUrl + 'assets/backgrounds/Hybrid_Cafe_Indoors.png',
		baseUrl + 'assets/backgrounds/Hybrid_Cafe_Outdoors.png',
		baseUrl + 'assets/backgrounds/SEWH_Ravenrock_Island.png',
		baseUrl + 'assets/backgrounds/SEWH_Mountain_Lodge.png',
		baseUrl + 'assets/backgrounds/SEWH_Town.png',
		baseUrl + 'assets/backgrounds/Restaurant_Tycoon_3_Farm.png',
		baseUrl + 'assets/backgrounds/Restaurant_Tycoon_3_Restaurant.png',
		baseUrl + 'assets/backgrounds/3PS_Nature.png',
		baseUrl + 'assets/backgrounds/3PS_Sun.png',
		baseUrl + 'assets/backgrounds/3PS_Dirt_Thing.png',
		baseUrl + 'assets/backgrounds/PHIGHTING_Crossroads_v2.png',
		baseUrl + 'assets/backgrounds/PHIGHTING_Crossroads_v2_2.png',
		baseUrl + 'assets/backgrounds/PHIGHTING_Crossroads_v2_3.png',
		baseUrl + 'assets/backgrounds/D-DAY_Omaha_Beach.png',
		baseUrl + 'assets/backgrounds/Anime_Vanguards_BG.png',
		baseUrl + 'assets/backgrounds/Parkour_Reborn_Stack.png',
		baseUrl + 'assets/backgrounds/Parkour_Reborn_Fragment.png',
		baseUrl + 'assets/backgrounds/Parkour_Reborn_Day.png',
		baseUrl + 'assets/backgrounds/Ultimate_Mining_Tycoon_Billboard.png',
		baseUrl + 'assets/backgrounds/Ultimate_Mining_Tycoon_Outside.png',
		baseUrl + 'assets/backgrounds/Ultimate_Mining_Tycoon_Waterfall.png',
		baseUrl + 'assets/backgrounds/Item_Asylum_Dorfic.png',
		baseUrl + 'assets/backgrounds/Item_Asylum_Baseplate.png',
		baseUrl + 'assets/backgrounds/Item_Asylum_Final_Destination.png',
	];

	var lastIndex = null;
	try { lastIndex = localStorage.getItem('lastBgIndex'); } catch (e) { /* storage unavailable */ }
	var randomIndex;

	// keep picking a random number until it's different from the last one
	do {
		randomIndex = Math.floor(Math.random() * backgroundImages.length);
	} while (backgroundImages.length > 1 && String(randomIndex) === lastIndex);

	try { localStorage.setItem('lastBgIndex', randomIndex); } catch (e) { /* storage unavailable */ }

	var selectedImage = backgroundImages[randomIndex];
	document.documentElement.style.setProperty('--bg', "url('" + selectedImage + "')");
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initHomeBackgroundRotation);
} else {
	initHomeBackgroundRotation();
}

if (window.location.hostname === 'indierobloxwikis.org') {
    if (window.location.pathname.endsWith('/') && window.location.pathname !== '/') {
		window.location.replace(
            window.location.pathname.slice(0, -1) +
            window.location.search +
            window.location.hash
        );
    }
}

/* Confetti snippet from Star Citizen Tools. Thank you! */
/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/canvas-confetti@1.9.3/dist/confetti.browser.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(t,e){!function t(e,a,n,r){var o=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),i="function"==typeof Path2D&&"function"==typeof DOMMatrix,l=function(){if(!e.OffscreenCanvas)return!1;var t=new OffscreenCanvas(1,1),a=t.getContext("2d");a.fillRect(0,0,1,1);var n=t.transferToImageBitmap();try{a.createPattern(n,"no-repeat")}catch(t){return!1}return!0}();function s(){}function c(t){var n=a.exports.Promise,r=void 0!==n?n:e.Promise;return"function"==typeof r?new r(t):(t(s,s),null)}var h,f,u,d,m,g,p,b,M,v,y,w=(h=l,f=new Map,{transform:function(t){if(h)return t;if(f.has(t))return f.get(t);var e=new OffscreenCanvas(t.width,t.height);return e.getContext("2d").drawImage(t,0,0),f.set(t,e),e},clear:function(){f.clear()}}),x=(m=Math.floor(1e3/60),g={},p=0,"function"==typeof requestAnimationFrame&&"function"==typeof cancelAnimationFrame?(u=function(t){var e=Math.random();return g[e]=requestAnimationFrame((function a(n){p===n||p+m-1<n?(p=n,delete g[e],t()):g[e]=requestAnimationFrame(a)})),e},d=function(t){g[t]&&cancelAnimationFrame(g[t])}):(u=function(t){return setTimeout(t,m)},d=function(t){return clearTimeout(t)}),{frame:u,cancel:d}),C=(v={},function(){if(b)return b;if(!n&&o){var e=["var CONFETTI, SIZE = {}, module = {};","("+t.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join("\n");try{b=new Worker(URL.createObjectURL(new Blob([e])))}catch(t){return void 0!==typeof console&&"function"==typeof console.warn&&console.warn("🎊 Could not load worker",t),null}!function(t){function e(e,a){t.postMessage({options:e||{},callback:a})}t.init=function(e){var a=e.transferControlToOffscreen();t.postMessage({canvas:a},[a])},t.fire=function(a,n,r){if(M)return e(a,null),M;var o=Math.random().toString(36).slice(2);return M=c((function(n){function i(e){e.data.callback===o&&(delete v[o],t.removeEventListener("message",i),M=null,w.clear(),r(),n())}t.addEventListener("message",i),e(a,o),v[o]=i.bind(null,{data:{callback:o}})}))},t.reset=function(){for(var e in t.postMessage({reset:!0}),v)v[e](),delete v[e]}}(b)}return b}),I={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function T(t,e,a){return function(t,e){return e?e(t):t}(t&&null!=t[e]?t[e]:I[e],a)}function E(t){return t<0?0:Math.floor(t)}function P(t){return parseInt(t,16)}function S(t){return t.map(O)}function O(t){var e=String(t).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:P(e.substring(0,2)),g:P(e.substring(2,4)),b:P(e.substring(4,6))}}function k(t){t.width=document.documentElement.clientWidth,t.height=document.documentElement.clientHeight}function B(t){var e=t.getBoundingClientRect();t.width=e.width,t.height=e.height}function F(t,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var a=e.tick++/e.totalTicks,n=e.x+e.random*e.tiltCos,r=e.y+e.random*e.tiltSin,o=e.wobbleX+e.random*e.tiltCos,l=e.wobbleY+e.random*e.tiltSin;if(t.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-a)+")",t.beginPath(),i&&"path"===e.shape.type&&"string"==typeof e.shape.path&&Array.isArray(e.shape.matrix))t.fill(function(t,e,a,n,r,o,i){var l=new Path2D(t),s=new Path2D;s.addPath(l,new DOMMatrix(e));var c=new Path2D;return c.addPath(s,new DOMMatrix([Math.cos(i)*r,Math.sin(i)*r,-Math.sin(i)*o,Math.cos(i)*o,a,n])),c}(e.shape.path,e.shape.matrix,e.x,e.y,.1*Math.abs(o-n),.1*Math.abs(l-r),Math.PI/10*e.wobble));else if("bitmap"===e.shape.type){var s=Math.PI/10*e.wobble,c=.1*Math.abs(o-n),h=.1*Math.abs(l-r),f=e.shape.bitmap.width*e.scalar,u=e.shape.bitmap.height*e.scalar,d=new DOMMatrix([Math.cos(s)*c,Math.sin(s)*c,-Math.sin(s)*h,Math.cos(s)*h,e.x,e.y]);d.multiplySelf(new DOMMatrix(e.shape.matrix));var m=t.createPattern(w.transform(e.shape.bitmap),"no-repeat");m.setTransform(d),t.globalAlpha=1-a,t.fillStyle=m,t.fillRect(e.x-f/2,e.y-u/2,f,u),t.globalAlpha=1}else if("circle"===e.shape)t.ellipse?t.ellipse(e.x,e.y,Math.abs(o-n)*e.ovalScalar,Math.abs(l-r)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):function(t,e,a,n,r,o,i,l,s){t.save(),t.translate(e,a),t.rotate(o),t.scale(n,r),t.arc(0,0,1,i,l,s),t.restore()}(t,e.x,e.y,Math.abs(o-n)*e.ovalScalar,Math.abs(l-r)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if("star"===e.shape)for(var g=Math.PI/2*3,p=4*e.scalar,b=8*e.scalar,M=e.x,v=e.y,y=5,x=Math.PI/y;y--;)M=e.x+Math.cos(g)*b,v=e.y+Math.sin(g)*b,t.lineTo(M,v),g+=x,M=e.x+Math.cos(g)*p,v=e.y+Math.sin(g)*p,t.lineTo(M,v),g+=x;else t.moveTo(Math.floor(e.x),Math.floor(e.y)),t.lineTo(Math.floor(e.wobbleX),Math.floor(r)),t.lineTo(Math.floor(o),Math.floor(l)),t.lineTo(Math.floor(n),Math.floor(e.wobbleY));return t.closePath(),t.fill(),e.tick<e.totalTicks}function A(t,a){var i,l=!t,s=!!T(a||{},"resize"),h=!1,f=T(a,"disableForReducedMotion",Boolean),u=o&&!!T(a||{},"useWorker")?C():null,d=l?k:B,m=!(!t||!u)&&!!t.__confetti_initialized,g="function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion)").matches;function p(e,a,o){for(var l,s,h,f,u,m=T(e,"particleCount",E),g=T(e,"angle",Number),p=T(e,"spread",Number),b=T(e,"startVelocity",Number),M=T(e,"decay",Number),v=T(e,"gravity",Number),y=T(e,"drift",Number),C=T(e,"colors",S),I=T(e,"ticks",Number),P=T(e,"shapes"),O=T(e,"scalar"),k=!!T(e,"flat"),B=function(t){var e=T(t,"origin",Object);return e.x=T(e,"x",Number),e.y=T(e,"y",Number),e}(e),A=m,R=[],N=t.width*B.x,z=t.height*B.y;A--;)R.push((l={x:N,y:z,angle:g,spread:p,startVelocity:b,color:C[A%C.length],shape:P[(f=0,u=P.length,Math.floor(Math.random()*(u-f))+f)],ticks:I,decay:M,gravity:v,drift:y,scalar:O,flat:k},s=void 0,h=void 0,s=l.angle*(Math.PI/180),h=l.spread*(Math.PI/180),{x:l.x,y:l.y,wobble:10*Math.random(),wobbleSpeed:Math.min(.11,.1*Math.random()+.05),velocity:.5*l.startVelocity+Math.random()*l.startVelocity,angle2D:-s+(.5*h-Math.random()*h),tiltAngle:(.5*Math.random()+.25)*Math.PI,color:l.color,shape:l.shape,tick:0,totalTicks:l.ticks,decay:l.decay,drift:l.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:3*l.gravity,ovalScalar:.6,scalar:l.scalar,flat:l.flat}));return i?i.addFettis(R):(i=function(t,e,a,o,i){var l,s,h=e.slice(),f=t.getContext("2d"),u=c((function(e){function c(){l=s=null,f.clearRect(0,0,o.width,o.height),w.clear(),i(),e()}l=x.frame((function e(){!n||o.width===r.width&&o.height===r.height||(o.width=t.width=r.width,o.height=t.height=r.height),o.width||o.height||(a(t),o.width=t.width,o.height=t.height),f.clearRect(0,0,o.width,o.height),(h=h.filter((function(t){return F(f,t)}))).length?l=x.frame(e):c()})),s=c}));return{addFettis:function(t){return h=h.concat(t),u},canvas:t,promise:u,reset:function(){l&&x.cancel(l),s&&s()}}}(t,R,d,a,o),i.promise)}function b(a){var n=f||T(a,"disableForReducedMotion",Boolean),r=T(a,"zIndex",Number);if(n&&g)return c((function(t){t()}));l&&i?t=i.canvas:l&&!t&&(t=function(t){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=t,e}(r),document.body.appendChild(t)),s&&!m&&d(t);var o={width:t.width,height:t.height};function b(){if(u){var e={getBoundingClientRect:function(){if(!l)return t.getBoundingClientRect()}};return d(e),void u.postMessage({resize:{width:e.width,height:e.height}})}o.width=o.height=null}function M(){i=null,s&&(h=!1,e.removeEventListener("resize",b)),l&&t&&(document.body.contains(t)&&document.body.removeChild(t),t=null,m=!1)}return u&&!m&&u.init(t),m=!0,u&&(t.__confetti_initialized=!0),s&&!h&&(h=!0,e.addEventListener("resize",b,!1)),u?u.fire(a,o,M):p(a,o,M)}return b.reset=function(){u&&u.reset(),i&&i.reset()},b}function R(){return y||(y=A(null,{useWorker:!0,resize:!0})),y}a.exports=function(){return R().apply(this,arguments)},a.exports.reset=function(){R().reset()},a.exports.create=A,a.exports.shapeFromPath=function(t){if(!i)throw new Error("path confetti are not supported in this browser");var e,a;"string"==typeof t?e=t:(e=t.path,a=t.matrix);var n=new Path2D(e),r=document.createElement("canvas").getContext("2d");if(!a){for(var o,l,s=1e3,c=s,h=s,f=0,u=0,d=0;d<s;d+=2)for(var m=0;m<s;m+=2)r.isPointInPath(n,d,m,"nonzero")&&(c=Math.min(c,d),h=Math.min(h,m),f=Math.max(f,d),u=Math.max(u,m));o=f-c,l=u-h;var g=Math.min(10/o,10/l);a=[g,0,0,g,-Math.round(o/2+c)*g,-Math.round(l/2+h)*g]}return{type:"path",path:e,matrix:a}},a.exports.shapeFromText=function(t){var e,a=1,n="#000000",r='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';"string"==typeof t?e=t:(e=t.text,a="scalar"in t?t.scalar:a,r="fontFamily"in t?t.fontFamily:r,n="color"in t?t.color:n);var o=10*a,i=o+"px "+r,l=new OffscreenCanvas(o,o),s=l.getContext("2d");s.font=i;var c=s.measureText(e),h=Math.ceil(c.actualBoundingBoxRight+c.actualBoundingBoxLeft),f=Math.ceil(c.actualBoundingBoxAscent+c.actualBoundingBoxDescent),u=c.actualBoundingBoxLeft+2,d=c.actualBoundingBoxAscent+2;h+=4,f+=4,(s=(l=new OffscreenCanvas(h,f)).getContext("2d")).font=i,s.fillStyle=n,s.fillText(e,u,d);var m=1/a;return{type:"bitmap",bitmap:l.transferToImageBitmap(),matrix:[m,0,0,m,-h*m/2,-f*m/2]}}}(function(){return void 0!==t?t:"undefined"!=typeof self?self:this||{}}(),e,!1),t.confetti=e.exports}(window,{});
//# sourceMappingURL=/sm/0e9ac22f62a550282b886b288da51d7892173a94bbd286c2ffc6e7b881509c88.map

function confettiFromPageSide() {
	confetti({
		particleCount: 200,
		angle: 60,
		spread: 55,
		origin: { x: 0 },
	});
	confetti({
		particleCount: 200,
		angle: 120,
		spread: 55,
		origin: { x: 1 },
	});
}

window.confettiFromPageSide = confettiFromPageSide;

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('page-onboarding')) {
        confettiFromPageSide();
    }
});
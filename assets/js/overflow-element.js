/**
 * Manages the lifecycle of a single overflow element, composing wrapper
 * and state sub-modules. Handles observers, scroll events, and
 * resume/pause behavior.
 */
class OverflowElement {
	constructor( {
		document, window, IntersectionObserver, ResizeObserver,
		element, isPointerDevice, config
	} ) {
		this.document = document;
		this.window = window;
		this.IntersectionObserver = IntersectionObserver;
		this.ResizeObserver = ResizeObserver;
		this.element = element;
		this.isPointerDevice = isPointerDevice;
		this.config = config;
		this.onScroll = this._throttle( this.onScroll.bind( this ), 250 );
		this.onClick = this.onClick.bind( this );
	}

	/**
	 * Simple throttle implementation
	 */
	_throttle( func, limit ) {
		let inThrottle;
		return function() {
			const args = arguments;
			const context = this;
			if ( !inThrottle ) {
				func.apply( context, args );
				inThrottle = true;
				setTimeout( () => inThrottle = false, limit );
			}
		};
	}

	/**
	 * Scrolls the content element by the specified offset.
	 *
	 * @param {number} offset
	 */
	scrollContent( offset ) {
		const delta = this.content.scrollWidth - this.content.offsetWidth;
		const scrollLeft = Math.floor( this.content.scrollLeft ) + offset;

		this.window.requestAnimationFrame( () => {
			this.content.scrollLeft = Math.min( Math.max( scrollLeft, 0 ), delta );
		} );
	}

	/**
	 * Handles click events on navigation buttons.
	 *
	 * @param {Event} event
	 */
	onClick( event ) {
		const target = event.target;
		if ( !target.classList.contains( 'overflow-navButton' ) ) {
			return;
		}
		// Prevent triggering the form submit action
		event.preventDefault();
		const offset = this.wrapper.offsetWidth / 2;
		if ( target.classList.contains( 'overflow-navButton-left' ) ) {
			this.scrollContent( -offset );
		} else if ( target.classList.contains( 'overflow-navButton-right' ) ) {
			this.scrollContent( offset );
		}
	}

	/**
	 * Handles scroll events (throttled).
	 */
	onScroll() {
		this.state.updateState();
	}

	/**
	 * Resumes functionality: update state, add listeners, observe resize.
	 */
	resume() {
		this.state.updateState();
		this.content.addEventListener( 'scroll', this.onScroll );
		this.resizeObserver.observe( this.element );
		if ( this.isPointerDevice && this.nav ) {
			this.nav.addEventListener( 'click', this.onClick );
		}
	}

	/**
	 * Pauses functionality: remove listeners, unobserve resize.
	 */
	pause() {
		this.content.removeEventListener( 'scroll', this.onScroll );
		this.resizeObserver.unobserve( this.element );
		if ( this.isPointerDevice && this.nav ) {
			this.nav.removeEventListener( 'click', this.onClick );
		}
	}

	/**
	 * Initialize the overflow element: wrap, set up observers, resume.
	 */
	init() {
		const refs = createOverflowWrapper( {
			document: this.document,
			element: this.element,
			isPointerDevice: this.isPointerDevice,
			inheritedClasses: this.config.inheritedClasses || []
		} );
		if ( !refs ) {
			return;
		}

		this.wrapper = refs.wrapper;
		this.content = refs.content;
		this.nav = refs.nav;

		this.state = createOverflowState( {
			window: this.window,
			element: this.element,
			content: this.content,
			wrapper: this.wrapper,
			stickyHeader: null
		} );

		this.resizeObserver = new this.ResizeObserver( () => {
			this.state.updateState();
		} );

		this.intersectionObserver = new this.IntersectionObserver( ( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					this.resume();
				} else {
					this.pause();
				}
			} );
		} );
		this.intersectionObserver.observe( this.element );

		this.resume();
	}
}

/**
 * Initialize overflow element enhancements for all matching elements.
 *
 * @param {Object} params
 * @param {Document} params.document
 * @param {Window} params.window
 * @param {HTMLElement} params.bodyContent
 * @param {Object} params.config
 */
function initializeOverflow( {
	document, window, bodyContent, config
} ) {
	const nowrapClasses = config.nowrapClasses || [];
	const container = bodyContent || document.body;

	const tableSelector = container.classList.contains('robloxapi') ? 'table' : 'table.table-wrap';
	const overflowElements = container.querySelectorAll(tableSelector);
	if ( !overflowElements.length ) {
		return;
	}

	const isPointerDevice = window.matchMedia( '(hover: hover) and (pointer: fine)' ).matches;

	overflowElements.forEach( ( el ) => {
		if ( nowrapClasses.some( ( cls ) => el.classList.contains( cls ) ) ) {
			return;
		}

		new OverflowElement( {
			document, window, IntersectionObserver, ResizeObserver,
			element: el, isPointerDevice, config
		} ).init();
	} );
}

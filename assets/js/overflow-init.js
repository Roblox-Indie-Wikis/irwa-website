/**
 * Initialize table overflow wrapper when DOM is ready
 */
(function() {
	function init() {
		if ( !window.IntersectionObserver || !window.ResizeObserver ) {
			console.warn( '[Overflow] IntersectionObserver or ResizeObserver not supported' );
			return;
		}

		if ( typeof initializeOverflow !== 'function' ) {
			console.warn( '[Overflow] initializeOverflow is not loaded' );
			return;
		}

		initializeOverflow( {
			document: document,
			window: window,
			bodyContent: document.body,
			config: {
				nowrapClasses: [ 'nowrap' ],
				inheritedClasses: [ 'floatleft', 'floatright', 'floatcenter' ]
			}
		} );
	}

	// Run when DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
})();

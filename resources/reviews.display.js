/**
 * JavasSript for the Reviews MediaWiki extension.
 * @see https://www.mediawiki.org/wiki/Extension:Reviews
 *
 * @licence GNU GPL v3 or later
 * @author Jeroen De Dauw <jeroendedauw at gmail dot com>
 */

(function( $, mw ) {

	var _this = this;
	
	$( document ).ready( function() {

		$( '.review-rating-display' ).reviewRating();
		$( '.reviews-state-controls' ).reviewState();
	
		$( '.review-link-delete' ).click( function() {
			$this = $( this );
			if ( confirm( mw.msg( 'reviews-display-delete-confirm' ) ) ) {
				var review = new reviews.Review( { 'id': $this.attr( 'data-review-id' ) } );
				
				review.remove( function( success ) {
					if ( success ) {
						$tr = $this.closest( 'table' ).closest( 'tr' );
						
						if ( $( '.reviews-pager-table > tr' ).length > 1 ) {
							$tr.slideUp( 'slow', function() { $tr.remove(); } );
						}
						else {
							$table = $tr.closest( 'table' );
							$table.slideUp( 'slow', function() {
								$table.remove();
								$( '#reviewslist' ).remove();
							} );
						}
					}
					else {
						// TODO
						alert( 'The review could not be removed.' );
					}
				} );
			}
		} );
		
	} );
	
})( window.jQuery, window.mediaWiki );

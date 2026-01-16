<?php
/**
 * The template pour afficher les pages
 *
 * @package Motaphoto
 */

get_header();

/* Start the Loop */
while ( have_posts() ) :
	the_post();
	 echo '<h2>' . get_the_title() . '</h2>';
    the_content();

	// If comments are open or there is at least one comment, load up the comment template.
	if ( comments_open() || get_comments_number() ) {
		comments_template();
	}
endwhile; // End of the loop.
 
get_footer();

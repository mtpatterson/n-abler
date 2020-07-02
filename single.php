<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package _s
 */

get_header();
?>

	<div id="primary" class="content-area content-area pt-5">
		<main id="main" class="site-main">

			<?php while ( have_posts() ) :
				the_post();

				get_template_part( 'templates/content', get_post_type() );

			endwhile; ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer();

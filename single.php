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

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<div class="py-4 px-5 rounded shadow container bg-white">
				<a class="text-muted" href="/?s=">« Back to Search</a>
				<?php
				while ( have_posts() ) :
					the_post();

					get_template_part( 'templates/content', get_post_type() );

				endwhile; // End of the loop.
				?>
			</div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer();

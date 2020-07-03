<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _s
 */

get_header();
?>

	<div id="primary" class="content-area pt-5">
		<main id="main" class="site-main pt-4 pb-5 px-5 rounded shadow container bg-white">

		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'templates/content', 'page-contact' );

		endwhile; // End of the loop.
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer();

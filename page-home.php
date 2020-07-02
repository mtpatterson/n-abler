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

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'templates/content', 'page-home' );

		endwhile; // End of the loop.
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer(); ?>
<script type="text/javascript">
	_NA.home.initSwiper();
</script>

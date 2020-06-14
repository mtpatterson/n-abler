<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package _s
 */
$search_results = [];

get_header();
?>

	<section id="primary" class="content-area">
		<main id="main" class="site-main">

			<!-- container for React app -->
			<div class="na-search-page js-search-page">Loading...</div>

			<?php while ( have_posts() ) :
				the_post();

				// add data from WordPress to an array
				array_push($search_results, array(
					'id' => get_the_ID(),
					'title' => array(
						'rendered' => get_the_title(),
					),
					'_embedded' => array(
						'featured_media' => get_the_post_thumbnail_url(null, 'medium')
					)
				));

				// get_template_part( 'templates/content', 'search' );

			endwhile; ?>
		</main><!-- #main -->
	</section><!-- #primary -->

<?php
get_sidebar();
get_footer(); ?>

<script type="text/javascript">
	// pass data to the search page initialize function
	// this creates a React app
	_NA.search.initSearchPage(<?php echo json_encode($search_results); ?>);
</script>

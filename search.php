<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package _s
 */
global $wp_query;

$initial_posts = [];

while ( have_posts() ) :
	the_post();

	// add data from WordPress to an array
	array_push($initial_posts, array(
		'id' => get_the_ID(),
		'title' => array(
			'rendered' => get_the_title(),
		),
		'_embedded' => array(
			'wp:featuredmedia' => get_the_post_thumbnail_url(null),
			'wp:term' => array(
				get_the_category(),
				get_the_tags()
			)
		),

	));

endwhile;

get_header();
?>
	<section id="primary" class="content-area">
		<main id="main" class="site-main">

			<!-- container for React app -->
			<div class="na-search-page js-search-page">Loading...</div>

		</main><!-- #main -->
	</section><!-- #primary -->
<?php
get_sidebar();
get_footer(); ?>

<script type="text/javascript">
	// pass data to the search page initialize function
	// this creates a React app
	_NA.search.initSearchPage({
		posts: <?php echo json_encode($initial_posts); ?>,
		categories: <?php echo json_encode(get_categories()) ?>,
		tags: <?php echo json_encode(get_tags()) ?>,
		maxNumPages: <?php echo json_encode($wp_query->max_num_pages); ?>
	});
</script>

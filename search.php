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
$args = array(
	'post_type' => 'post',
	'post_status' => 'publish',
	'posts_per_page' => 10,
	'orderby' => 'name',
	'order' => 'ASC'
);
$query = new WP_Query($args);

if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
		// add data from WordPress to an array
		array_push($initial_posts, array(
			'id' => get_the_ID(),
			'slug'=> get_permalink(),
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
endif;

get_header();
?>
	<section id="primary" class="content-area">
		<main id="main" class="site-main">

			<!-- container for React app -->
			<div class="na-search-page js-search-page">
				<!-- show the short loading state -->
				<div class="py-4 px-5 mt-5 rounded shadow container bg-white">
					<div class="na-search-results col d-flex justify-content-center align-items-center">
						<i class="fa fa-spinner fa-2x fa-spin"></i>
					</div>
				</div>
			</div>

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
		categories: <?php echo json_encode(get_categories('exclude=1')) ?>,
		tags: <?php echo json_encode(get_tags()) ?>,
		maxNumPages: <?php echo json_encode($wp_query->max_num_pages); ?>
	});
</script>

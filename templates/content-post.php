<?php

/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _s
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header my-4">
		<?php the_title('<h1 class="entry-title">', '</h1>'); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<div class="row">
			<div class="col-12 col-xl-6 text-center">
				<img class="na-single-image" src="<?php echo get_the_post_thumbnail_url(null, array('768', '576')) ?>" alt="<?php the_title(); ?>">
			</div>
			<div class="col-12 col-xl-6 p-4">
				<?php the_content(); ?>
			</div>
		</div>
	</div><!-- .entry-content -->

</article><!-- #post-<?php the_ID(); ?> -->

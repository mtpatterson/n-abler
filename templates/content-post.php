<?php

/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _s
 */

?>

<article class="na-image-container" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="container mb-5">
		<div>
			<p>If you have any questions or would like to place an order, please <a href="/contact/">contact us.</a></p>
		</div>
		<div class="row na-image-text-container">
			<div class="col-xs-12  col-md-6 mb-4">
				<img src="<?php echo get_the_post_thumbnail_url(null, array('768', '576')); ?>" alt="<?php the_title(); ?>">
			</div>
			<div class="col-xs-12 col-md-6 p-5">
				<?php the_title('<h1 class="entry-title">', '</h1>'); ?>
				<?php the_content(); ?>
			</div>
		</div>
	</div>
</article>

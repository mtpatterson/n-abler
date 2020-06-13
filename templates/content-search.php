<?php

/**
 * Template part for displaying results in search pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _s
 */

?>

<div class="container">
    <p><?php the_title(); ?></p>
    <?php if (get_the_post_thumbnail_url()) : ?>
        <img src="<?php echo get_the_post_thumbnail_url(null, 'medium'); ?>" alt="<?php the_title(); ?>" />
    <?php endif; ?>
</div>

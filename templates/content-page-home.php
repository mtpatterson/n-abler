<?php

/**
 * Template part for displaying page content in page-home.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _s
 */

$image_1 = get_field('image_1');
$image_2 = get_field('image_2');
$image_3 = get_field('image_3');

?>

<div class="na-swiper-container swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">
            <img src="<?= $image_1['url'] ?>" alt="<?= $image_1['alt'] ?>">
        </div>
        <div class="swiper-slide">
            <img src="<?= $image_2['url'] ?>" alt="<?= $image_2['alt'] ?>">
        </div>
        <div class="swiper-slide">
            <img src="<?= $image_3['url'] ?>" alt="<?= $image_3['alt'] ?>">
        </div>
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>

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

<div class="na-home-container">
    <section class="container mb-5">
        <div class="jumbotron">
            <div class="jumbotron-inner">
                <h1 class="na-home-title">Texas Assistive Devices</h1>
                <h2>Manufacturers of Upper Extremity Components for Persons with Hand Dysfunction and Amputation.</h2>
                <p class="text-right"><a href="/?s=" class="btn btn-warning">Search Now</a></p>
                <p>If you would like to order a demo kit or place an order, please <a href="mailto:orders@n-abler.org">click</a></p>
                <p>If you would like a printed catalog of our product line sent to you, please <a href="mailto:orders@n-abler.org">click</a></p>
            </div>
        </div>
    </section>

    <section class="bg-light na-image-container">
        <div class="container mb-5">
            <div class="row na-image-text-container">
                <div class="col-xs-12 col-md-6 mb-4">
                    <?php if ($image_1['url']) : ?>
                        <img class="shadow rounded" src="<?= $image_1['url'] ?>" alt="<?= $image_1['alt'] ?>" />
                    <?php endif; ?>
                </div>
                <div class="col-xs-12 col-md-6 p-5">
                    <h2><?php the_field('title_1'); ?></h2>
                    <p><?php the_field('description_1'); ?></p>
                </div>
            </div>
        </div>
    </section>

    <section class="na-break-section">
        <h2 class="text-center">Award winning design</h2>
        <div class="na-break-line bg-success pb-1 mb-5 mt-4"></div>
        <div class="row">
            <div class="col-xs-12 col-md-4">
                <div class="col-12 text-center bg-light p-5">
                    <i class="fa fa-check fa-3x text-success mb-2"></i>
                    <div><b>Daily work made easy</b></div>
                </div>
            </div>
            <div class="col-xs-12 col-md-4">
                <div class="col-12 text-center bg-light p-5">
                    <i class="fa fa-star fa-3x text-success mb-2"></i>
                    <div><b>Flexible and safe</b></div>
                </div>
            </div>
            <div class="col-xs-12 col-md-4">
                <div class="col-12 text-center bg-light p-5">
                    <i class="fa fa-cogs fa-3x text-success mb-2"></i>
                    <div><b>Custom designs</b></div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-light na-image-container">
        <div class="container mb-5">
            <div class="row na-image-text-container">
                <div class="col-xs-12 col-md-6 mb-4 order-md-2">
                    <?php if ($image_2['url']) : ?>
                    <img class="shadow rounded" src="<?= $image_2['url'] ?>" alt="<?= $image_2['alt'] ?>" />
                    <?php endif; ?>
                </div>
                <div class="col-xs-12 col-md-6 p-5">
                    <h2><?php the_field('title_2'); ?></h2>
                    <p><?php the_field('description_2'); ?></p>
                </div>
            </div>
        </div>
    </section>

    <section class="container mb-5 na-image-container">
        <div class="row na-image-text-container">
            <div class="col-xs-12 col-md-6 mb-4">
                <?php if ($image_3['url']) : ?>
                    <img class="shadow rounded" src="<?= $image_3['url'] ?>" alt="<?= $image_3['alt'] ?>" />
                <?php endif; ?>
            </div>
            <div class="col-xs-12 col-md-6 p-5">
                <h2><?php the_field('title_3'); ?></h2>
                <p><?php the_field('description_3'); ?></p>
            </div>
        </div>
    </section>
</div>

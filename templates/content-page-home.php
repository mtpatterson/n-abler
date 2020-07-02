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
            <h1 class="na-home-title">Texas Assistive Devices</h1>
            <p>Manufacturers of Upper Extremity Components for Persons with Hand Dysfunction and Amputation</p>
            <p class="text-right"><a href="/?s=" class="btn btn-warning">Search Now</a></p>
        </div>
    </section>

    <section class="bg-light na-image-container">
        <div class="container mb-5">
            <div class="row na-image-text-container">
                <div class="col-xs-12  col-md-6 mb-4">
                    <img src="<?= $image_1['url'] ?>" alt="<?= $image_1['alt'] ?>" />
                </div>
                <div class="col-xs-12 col-md-6 p-5">
                    <h3>N-Abler II</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium alias placeat corporis, voluptates tempora quis explicabo est, eveniet veniam rem voluptatibus dolores quidem, dolor beatae sed quia fugiat quo. Autem?</p>
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
                    <img src="<?= $image_2['url'] ?>" alt="<?= $image_2['alt'] ?>" />
                </div>
                <div class="col-xs-12 col-md-6 p-5">
                    <h3>N-Abler III</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium alias placeat corporis, voluptates tempora quis explicabo est, eveniet veniam rem voluptatibus dolores quidem, dolor beatae sed quia fugiat quo. Autem?</p>
                </div>
            </div>
        </div>
    </section>

    <section class="container mb-5 na-image-container">
        <div class="row na-image-text-container">
            <div class="col-xs-12 col-md-6 mb-4">
                <img src="<?= $image_3['url'] ?>" alt="<?= $image_3['alt'] ?>" />
            </div>
            <div class="col-xs-12 col-md-6 p-5">
                <h3>N-Abler III</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium alias placeat corporis, voluptates tempora quis explicabo est, eveniet veniam rem voluptatibus dolores quidem, dolor beatae sed quia fugiat quo. Autem?</p>
            </div>
        </div>
    </section>
</div>

<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

?>

</div><!-- #content -->

</div><!-- #page -->

<footer id="colophon" class="site-footer">
    <div class="bg-light mt-5">
        <div class="na-break-section">
            <section class="row">
                <div class="col-xs-12 col-md-4">
                    <div class="col-12 text-center p-5">
                        <p>Have questions about our product?</p>
                        <a href="/contact">Contact us today</a>
                    </div>
                </div>
                <div class="col-xs-12 col-md-4">
                    <div class="col-12 text-center p-5">
                        <p>Interested in something specific?</p>
                        <a href="/?s=">Search our catalog</a>
                    </div>
                </div>
                <div class="col-xs-12 col-md-4">
                    <div class="col-12 text-center p-5">
                        <p>Want to learn more about us?</p>
                        <a href="/about">Hear from our team</a>
                    </div>
                </div>
            </section>
        </div>
	</div>

	<div class="site-info">
		<div class="row">
			<ul class="col-xs-12 col-md-2">
				<li><b class="na-footer-title">Tools</b></li>
				<li>
					<a href="/n-abler-ii">N-Abler II</a>
				</li>
				<li>
					<a href="/n-abler-iii">N-Abler III</a>
				</li>
				<li>
					<a href="/n-abler-iv">N-Abler IV</a>
				</li>
			</ul>
			<ul class="col-xs-12 col-md-2">
				<li><b class="na-footer-title">Learn</b></li>
				<li>
					<a href="/contact">Contact</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
				<li>
					<a href="/terms">Terms of Use</a>
				</li>
			</ul>
		</div>

		<div class="copyright p-2">
			<span>Texas Assistive Devices &copy; <?= date('Y') ?></span>
		</div>

	</div><!-- .site-info -->
</footer><!-- #colophon -->

<?php wp_footer(); ?>

</body>

</html>

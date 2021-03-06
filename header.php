<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="description" content="Manufacturers of Upper Extremity Components for Persons with Hand Dysfunction and Amputation" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="og:image" content="">
	<meta name="og:site_name": content="N-Abler">
	<meta name="og:title": content="N-Abler">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', '_s' ); ?></a>

	<header id="masthead" class="site-header">
		<nav class="navbar navbar-expand-lg navbar-dark">
			<div class="na-navbar-brand navbar-brand">
				<?php the_custom_logo(); ?>
			</div>

			<button
				class="na-navbar-toggler navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarItems"
				aria-controls="navbarItems"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse">
				<?php /* Primary navigation */
					wp_nav_menu( array(
						'theme_location'  => 'primary',
						'depth'           => 2, // 1 = no dropdowns, 2 = with dropdowns.
						'container'       => 'div',
						'container_class' => 'navbar-nav mr-auto',
						'container_id'    => 'navbarItems',
						'menu_class'      => 'navbar-nav mr-auto',
						'fallback_cb'     => 'WP_Bootstrap_Navwalker::fallback',
						'walker'          => new WP_Bootstrap_Navwalker(),
					) );
				?>
			</div>

			<?php get_template_part( 'templates/partials/search', 'form' ); ?>

		</nav>

	</header><!-- #masthead -->

	<div id="content" class="site-content full-page">

<!doctype html>
<html <?php language_attributes(); ?> >
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">

<header class="site-header">
    <div class="header-container">
		<img id="logo_nmota" src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" alt="Logo de Nathalie Mota">

		<nav class="site-navigation">
    		<?php
    			wp_nav_menu( array(
        			'theme_location' => 'motaphoto_menu',
        			'container'      => false,
        			'menu_class'     => 'menu'
    			) );
    		?>
		</nav>
	</div>
</header>

	<?php get_template_part( 'template-parts/header/site-header' ); ?>

	<div id="content" class="site-content">
		<div id="primary" class="content-area">

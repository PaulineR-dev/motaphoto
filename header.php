<!doctype html>
<html <?php language_attributes(); ?> >
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<?php wp_head(); ?>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">

<header class="site-header">
    <div class="header-container">
		<img id="logo_nmota" src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" alt="Logo de Nathalie Mota">

 		<input type="checkbox" id="menu-toggle" class="menu-toggle" aria-label="Ouvrir le menu" />
		<label for="menu-toggle" class="menu-btn">
  			<span></span>
  			<span></span>
  			<span></span>
		</label>

	
		<nav class="site-navigation">
    		<?php
    			wp_nav_menu( array(
        			'theme_location' => 'motaphoto_menu_header',
        			'container'      => false,
        			'menu_class'     => 'menu'
    			) );
    		?>
		</nav>
	</div>


<!-- Overlay mobile qui coulisse par-dessus -->
<div id="mobile-header-overlay" class="mobile-header-overlay">
  <img class="overlay-logo" src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" alt="Logo alternatif">
  <button class="overlay-close" aria-label="Fermer">
	<span></span>
    <span></span>
  </button>
</div>



</header>

	<div id="content" class="site-content">
		<div id="primary" class="content-area">

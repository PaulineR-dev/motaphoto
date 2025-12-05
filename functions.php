<?php
// Charger le style principal
function motaphoto_enqueue_styles() {
    wp_enqueue_style('motaphoto-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_styles');

// Charger le script principal
function motaphoto_enqueue_scripts() {
    wp_enqueue_script('motaphoto-scripts', // identifiant interne
        get_template_directory_uri() . '/js/scripts.js',
        array(), // Dépendances (ex: ['jquery'] si besoin)
        '1.0',   // Version
        true     // True = charger dans le footer
    );
}
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_scripts');

// Déclarer un emplacement pour les menus pour le thème enfant "motaphoto_menu"
function motaphoto_register_menus() {
    register_nav_menus(
        array(
            'motaphoto_menu_header' => __( 'Menu principal', 'motaphoto' ),
            'motaphoto_menu_footer' => __( 'Menu du footer', 'motaphoto' ),
        )
    );
}
add_action( 'after_setup_theme', 'motaphoto_register_menus' );

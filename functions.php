<?php
// Charger le style principal
function motaphoto_enqueue_styles() {
    wp_enqueue_style('motaphoto-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_styles');


// Déclarer un emplacement de menu pour le thème enfant "motaphoto_menu"
function motaphoto_register_menus() {
    register_nav_menus(
        array(
            'motaphoto_menu' => __( 'Menu Motaphoto', 'motaphoto' )
        )
    );
}
add_action( 'init', 'motaphoto_register_menus' );

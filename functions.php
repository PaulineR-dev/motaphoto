<?php
// Charger le style principal
function motaphoto_enqueue_styles() {
    wp_enqueue_style('motaphoto-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_styles');

// Charger le script principal
function motaphoto_enqueue_scripts() {
    wp_enqueue_script(
        'motaphoto-scripts',
        get_template_directory_uri() . '/js/scripts.js',
        array('jquery'),
        '1.0',
        true
    );

    // Variables envoyées au JS pour l'AJAX
    wp_localize_script(
        'motaphoto-scripts',
        'motaphotoInfinite',
        array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('load_more_photos'),
        )
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



// Charger la lightbox séparément
function motaphoto_enqueue_lightbox() {
    wp_enqueue_script(
        'motaphoto-lightbox', // Identifiant interne
        get_template_directory_uri() . '/js/modale-lightbox.js',
        array(), // Dépendances
        '1.0',   // Version
        true     // Charger dans le footer
    );
}
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_lightbox');


// AJAX : charger plus de photos + filtres + tri
function motaphoto_load_more_photos() {

    check_ajax_referer('load_more_photos', 'nonce');

    $paged  = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $cat    = isset($_POST['categorie']) ? sanitize_text_field($_POST['categorie']) : '';
    $format = isset($_POST['format']) ? sanitize_text_field($_POST['format']) : '';
    $order  = isset($_POST['order']) ? sanitize_text_field($_POST['order']) : 'desc';

    $args = array(
        'post_type'           => 'photo',
        'posts_per_page'      => 8,
        'paged'               => $paged,
        'orderby'             => 'date',
        'order'               => ($order === 'asc') ? 'ASC' : 'DESC',
        'ignore_sticky_posts' => true,
    );

    // Taxonomies
    $tax_query = array();

    if (!empty($cat)) {
        $tax_query[] = array(
            'taxonomy' => 'categorie',
            'field'    => 'slug',
            'terms'    => $cat,
        );
    }

    if (!empty($format)) {
        $tax_query[] = array(
            'taxonomy' => 'format',
            'field'    => 'slug',
            'terms'    => $format,
        );
    }

    if (!empty($tax_query)) {
        $args['tax_query'] = $tax_query;
    }

    $photos = new WP_Query($args);

 if ($photos->have_posts()) {

    echo '<div class="ajax-meta" 
            data-max-pages="' . esc_attr($photos->max_num_pages) . '" 
            data-current-page="' . esc_attr($paged) . '">
          </div>';

    while ($photos->have_posts()) {
        $photos->the_post();
        get_template_part('template-parts/photo-block');
    }

    wp_reset_postdata();
}


    wp_die();
}
add_action('wp_ajax_load_more_photos', 'motaphoto_load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'motaphoto_load_more_photos');

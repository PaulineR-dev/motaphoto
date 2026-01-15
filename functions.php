<?php
// Charger les styles
function motaphoto_enqueue_styles() {
    // Charge le fichier style.css du thème (get_stylesheet_uri() pointe vers style.css du thème enfant)
    wp_enqueue_style('motaphoto-style', get_stylesheet_uri());

    // Font Awesome (chargé via WordPress) 
    wp_enqueue_style( 
        'fontawesome', 
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css', 
         array(), 
        '6.5.0'
    );
}
// Exécution de la fonction au moment où WP charge les scripts et les styles
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_styles');


// Charger le script principal
function motaphoto_enqueue_scripts() {
    // Charge le fichier scripts.js situé dans /js/
    wp_enqueue_script(
        'motaphoto-scripts', // Identifiant interne du script
        get_template_directory_uri() . '/js/scripts.js', // URL du fichier JS
        array('jquery'), // Dépend de jQuery
        '1.0', // Version
        true // Chargé dans le footer
    );

    // Variables PHP envoyées au JS pour l'AJAX
    wp_localize_script(
        'motaphoto-scripts', // Script recevant les variables
        'motaphotoInfinite', // Nom de l'objet JS créé
        array(
            'ajax_url' => admin_url('admin-ajax.php'), // URL AJAX
            'nonce'    => wp_create_nonce('load_more_photos'), // Sécurité
        )
    );

    // Charger le fichier home.js
    wp_enqueue_script(
        'motaphoto-home',
        get_template_directory_uri() . '/js/home.js',
        array(), // Pas de dépendance
        '1.0',
        true
    );

    // Envoyer les variables AJAX à home.js
    wp_localize_script(
        'motaphoto-home',
        'motaphotoInfinite',
        array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('load_more_photos'),
        )
    );
}

// Exécution de la fonction au moment du chargement des scripts
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_scripts');


// Déclaration d'un emplacement pour les MENUS pour le thème enfant "motaphoto_menu"
function motaphoto_register_menus() {
    register_nav_menus(
        array(
            'motaphoto_menu_header' => __( 'Menu principal', 'motaphoto' ),
            'motaphoto_menu_footer' => __( 'Menu du footer', 'motaphoto' ),
        )
    );
}
add_action( 'after_setup_theme', 'motaphoto_register_menus' );



// Chargement de la LIGHTBOX
function motaphoto_enqueue_lightbox() {
    wp_enqueue_script(
        'motaphoto-lightbox', // Identifiant interne
        get_template_directory_uri() . '/js/modale-lightbox.js', // Chemin vers le fichier JS
        array(), // Dépendances
        '1.0',   // Version
        true     // Charger dans le footer
    );
}
// Chargement de la lightbox au moment de chargement des scripts
add_action('wp_enqueue_scripts', 'motaphoto_enqueue_lightbox');



// AJAX : charger plus de photos + filtres + tri
function motaphoto_load_more_photos() {

    // Vérification : nonce envoyé par le JS (nonce de sécurité obligatoire)
    check_ajax_referer('load_more_photos', 'nonce');

    // Récupération des paramètres envoyés par AJAX
    $paged  = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $cat    = isset($_POST['categorie']) ? sanitize_text_field($_POST['categorie']) : '';
    $format = isset($_POST['format']) ? sanitize_text_field($_POST['format']) : '';
    $order  = isset($_POST['order']) ? sanitize_text_field($_POST['order']) : 'desc';

    // Paramètres de la requête WP_QUERY
    $args = array(
        'post_type'           => 'photo', // Type de contenu à charger
        'posts_per_page'      => 8, // Nombre de photos par page
        'paged'               => $paged, // Page demandée
        'orderby'             => 'date', // Tri par date
        'order'               => ($order === 'asc') ? 'ASC' : 'DESC', // Sens du tri
        'ignore_sticky_posts' => true, // Ignore les éventuels articles mis en avant
    );

    // Filtres de taxonomies
    $tax_query = array();

    // Filtre par catégorie si sélectionnée
    if (!empty($cat)) {
        $tax_query[] = array(
            'taxonomy' => 'categorie', // Taxonomie utilisée
            'field'    => 'slug', // Filtre via le slug
            'terms'    => $cat, // Valeur envoyée par l'AJAX
        );
    }

    // Filtre par format si sélectionné
    if (!empty($format)) {
        $tax_query[] = array(
            'taxonomy' => 'format', // Taxonomie utilisée
            'field'    => 'slug', // Filtre via le slug
            'terms'    => $format, // Valeur envoyée par l'AJAX
        );
    }

    // Ajoute la tax_query seulement si au moins un filtre est sélectionné
    if (!empty($tax_query)) {
        $args['tax_query'] = $tax_query;
    }

    // Exécution de la requête
    $photos = new WP_Query($args);

    // Si des résultats existent (présence de photos)
    if ($photos->have_posts()) {

        // Envoi des informations de pagination au JS (nombre total de pages disponibles + page actuelle chargée par l'AJAX)
        echo '<div class="ajax-meta" 
                data-max-pages="' . esc_attr($photos->max_num_pages) . '"
                data-current-page="' . esc_attr($paged) . '">
        </div>';

        while ($photos->have_posts()) {
            $photos->the_post();
            get_template_part('template-parts/photo-block'); // Template d'une photo
        }

        // Réinitialisation de la requête globale
        wp_reset_postdata();
    }

    // Fin de la requête AJAX
    wp_die();
}
// Déclare l'action AJAX pour utilisateurs connectés
add_action('wp_ajax_load_more_photos', 'motaphoto_load_more_photos');
// Déclare l'action AJAX pour visiteurs non connectés
add_action('wp_ajax_nopriv_load_more_photos', 'motaphoto_load_more_photos');


function pm_fix_punctuation_in_titles( $title ) {
    // Espace insécable avant ! et ? notamment pour les h2 des titres des posts du CPT Photo
    $title = preg_replace('/\s+([!?])/', '$1', $title);
    return $title;
}
add_filter( 'the_title', 'pm_fix_punctuation_in_titles' );

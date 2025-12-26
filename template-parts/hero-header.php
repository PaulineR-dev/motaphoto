<?php
// Récupération de l'image choisie via Secure Custom Fields
$hero_image_id = get_post_meta(get_queried_object_id(), 'hero_header', true);

// Si l'administrateur a choisi une image
if (!empty($hero_image_id)) {
    // Alors conversion de l'ID de l'image en URL
    $hero_image = wp_get_attachment_image_url($hero_image_id, 'full');

} else {
    // Si pas de choix par l'admin alors sélection aléatoire parmi les photos en paysage du CPT "photo"
    $hero_query = new WP_Query([
        'post_type'      => 'photo', // CPT
        'posts_per_page' => 1, // Une photo affichée
        'orderby'        => 'rand', // Aléatoire
        'tax_query'      => [
            [
                'taxonomy' => 'format', // Taxonomie format
                'field'    => 'slug',
                'terms'    => 'paysage', // Filtre paysage
            ],
        ],
    ]);

    // Valeur par défaut si aucune image trouvée
    $hero_image = '';

    // Si une photo correspondante existe
    if ($hero_query->have_posts()) :
        $hero_query->the_post();
        // Récupération de l'URL de l'image mise en avant en photo
        $hero_image = get_the_post_thumbnail_url(get_the_ID(), 'full');
    endif;

    // Réinitialisation de la requête
    wp_reset_postdata();
}
?>

<section class="hero" style="background-image: url('<?php echo esc_url($hero_image); ?>');">
    <div class="hero__overlay"></div>
    <div class="hero__content">
        <h1 class="hero__title">PHOTOGRAPHE EVENT</h1>
    </div>
</section>

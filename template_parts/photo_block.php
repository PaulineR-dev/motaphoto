<h3 id="text-aimerezaussi">VOUS AIMEREZ AUSSI</h3>

<?php
// template_parts/photo_block.php

// Récupère l'ID de la photo actuelle affichée
$current_id = get_the_ID();
// Récupère les catégories de la photo affichée
$terms = get_the_terms($current_id, 'categorie');

// Vérifie que la photo a bien une catégorie et absence erreur
if ($terms && ! is_wp_error($terms)) {
    // Première catégorie sélectionnée, si plusieurs, ignore les autres
    $term_id = $terms[0]->term_id;

    // Préparation de la requête WP_QUERY pour récupérer les photos apparentées
    $args = array(
        'post_type'      => 'photo', // Cible le CPT "photo"
        'posts_per_page' => 2, // Limite à 2 photos apparentées
        'post__not_in'   => array($current_id), // Exclusion de la photo en cours
        'tax_query'      => array( // Filtre par catégorie identique
            array(
                'taxonomy' => 'categorie', // Taxonomie utilisée : catégorie
                'field'    => 'term_id', // Filtre par l'ID
                'terms'    => $term_id, // ID de la catégorie de la photo actuellement affichée
            ),
        ),
    );

    // Exécution de la requête
    $related = new WP_Query($args);

    // Vérifie si la requête retourne au moins une photo
    if ($related->have_posts()) {
        echo '<section class="related-photos">';
        echo '<div class="photo-grid">';

        // Boucle pour parcourir chaque photo trouvée
        while ($related->have_posts()) {
            $related->the_post(); // Prépare données globales WP
            ?>

            <!-- Affichage photo -->
            <article class="photo-block">
                <!-- Conteneur de la miniature -->
                <div class="photo-thumb"> 

                    <!-- Vérification si la photo a une image mise en avant -->
                    <?php if (has_post_thumbnail()) {
                        // Affichage de la miniature avec taille medium
                        the_post_thumbnail('medium', [
                            'class' => 'photo-thumb-img'
                        ]);
                    } ?>

                    <!-- Overlay contenant les icônes interactives -->
                    <div class="photo-overlay">
                        <!-- Overlay en cours -->

                        <!-- Icône oeil permettant lien vers la single-page de la photo -->
                        <a href="<?php the_permalink(); ?>" id="icon-eye" title="Infos">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/icon_eye.png" alt="Icône oeil" >
                        </a>

                        <!-- Icône plein écran permettant d'afficher la lightbox A VENIR -->
                        <!-- Plein écran mais EN COURS EN ATTENDANT LIGHTBOX -->
                        <a href="<?php echo esc_url(wp_get_attachment_url(get_post_thumbnail_id())); ?>" 
                            id="icon-fullscreen" 
                            data-lightbox="gallery" 
                            title="Voir en plein écran">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/Icon_fullscreen.png" alt="Plein écran">
                        </a>
                    </div>
                </div>
            </article>
         <?php
        } // Fin de la boucle

        echo '</div>'; // .photo-grid
        echo '</section>'; // .related-photos

        // Réinitialise les données globales WP 
        wp_reset_postdata();
    }
}
?>

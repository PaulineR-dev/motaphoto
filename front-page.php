<?php
get_header();

// Appel du Hero
get_template_part('template-parts/hero-header');
?>

<main class="site-main">

    <section class="photo-list container">

        <?php
        // Récupération du numéro de page actuel pour la pagination (si pagination existe, l'utilise, sinon page 1)
        $paged = get_query_var('paged') ? get_query_var('paged') : 1;

        // Requête pour récupérer les photos du CPT "photo"
        $args = array(
            'post_type'           => 'photo',
            'posts_per_page'      => 8,
            'paged'               => $paged, // Page actuelle
            'orderby'             => 'date', // Tri par date
            'order'               => 'DESC', // De manière descendante donc les plus récentes d'abord
            'ignore_sticky_posts' => true, // Ignore les éventuels posts mis en avant
        );

        // Exécution de la requête
        $photos = new WP_Query($args);

        // Si la requête contient au moins une photo
        if ($photos->have_posts()) :
        ?>

            <!-- Filtres -->
            <div class="photo-filters">

            <?php
            // Récupération de toutes les catégories (taxonomie et categorie)
            $categories = get_terms([
                'taxonomy'   => 'categorie',
                'hide_empty' => true, // N'affiche pas les éventuelles catégories vides
            ]);

            $formats = get_terms([
                'taxonomy'   => 'format',
                'hide_empty' => true,
            ]);
            ?>

            <!-- Bloc gauche : Catégories + Formats -->
            <div class="photo-filters-left">

                <!-- Sélections personnalisées pour les catégories -->
                <div class="custom-select" data-target="filter-categorie" data-placeholder="CATÉGORIES">
                    <div class="custom-select-trigger">
                        <span class="custom-select-label">CATÉGORIES</span>
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul class="custom-options">
                    <?php foreach ($categories as $cat): ?>
                        <li class="custom-option" data-value="<?php echo esc_attr($cat->slug); ?>">
                            <?php echo esc_html($cat->name); ?>
                        </li>
                    <?php endforeach; ?>
                    </ul>
                </div>
                <!-- Valeur sélectionnée stockée dans un input caché -->
                <input type="hidden" id="filter-categorie" value="">

                <!-- Sélections personnalisées pour les formats -->
                <div class="custom-select" data-target="filter-format" data-placeholder="FORMATS">
                    <div class="custom-select-trigger">
                        FORMATS
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul class="custom-options">
                        <?php foreach ($formats as $format): ?>
                            <li class="custom-option" data-value="<?php echo esc_attr($format->slug); ?>">
                                <?php echo esc_html($format->name); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <!-- Valeur sélectionnée stockée dans un input caché -->
                <input type="hidden" id="filter-format" value="">

            </div>


            <!-- Bloc droit : Tri par date -->
            <div class="photo-filters-right">

                <div class="custom-select" data-target="sort-date" data-placeholder="TRIER PAR">
                    <div class="custom-select-trigger">
                        TRIER PAR
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul class="custom-options">
                        <li class="custom-option" data-value="desc">À partir des plus récentes</li>
                        <li class="custom-option" data-value="asc">À partir des plus anciennes</li>
                    </ul>
                </div>
                <!-- Valeur sélectionnée stockée dans un input caché -->
                <input type="hidden" id="sort-date" value="">

            </div>

        </div>


            <?php
                // Affichage de la grille
                echo '<div class="photo-grid">';
                    // Boucle sur les photos des posts du CPT "photo"
                    while ($photos->have_posts()) :
                        $photos->the_post();
                        // Chargement du template d'une photo individuelle
                        get_template_part('template-parts/photo-block');
                    endwhile;

                echo '</div>'; // .photo-grid
            ?>

            <?php if ($photos->max_num_pages > 1) : ?>
                <!-- Bouton "Charger plus" pour la pagination AJAX, page actuelle et nombre total de pages -->
                <button 
                    id="load-more-photos"
                    data-current-page="<?php echo esc_attr($paged); ?>" 
                    data-max-pages="<?php echo esc_attr($photos->max_num_pages); ?>">
                    Charger plus
                </button>
            <?php endif; ?>

        <?php
            wp_reset_postdata(); // Réinitialisation de la requête
            else :
                echo '<p>Aucune photo trouvée.</p>';
        endif;
        ?>

    </section>

</main>

<?php
get_footer();

<?php
get_header();

// Appel du Hero
get_template_part('template-parts/hero-header');
?>

<main class="site-main">

    <section class="photo-list container">

        <?php
        // Page courante
        $paged = get_query_var('paged') ? get_query_var('paged') : 1;

        // Requête pour récupérer les photos du CPT "photo"
        $args = array(
            'post_type'           => 'photo',
            'posts_per_page'      => 8,
            'paged'               => $paged,
            'orderby'             => 'date',
            'order'               => 'DESC',
            'ignore_sticky_posts' => true,
        );

        $photos = new WP_Query($args);

        if ($photos->have_posts()) :
        ?>

        <!-- ICI : les filtres, en dehors du PHP -->
        <div class="photo-filters">

        <!-- Filtre catégorie -->
          <select id="filter-categorie">
            <option value="" disabled selected hidden>CATÉGORIES</option>
            <?php
                $categories = get_terms(array(
                'taxonomy'   => 'categorie',
                'hide_empty' => true,
                ));
                foreach ($categories as $cat) {
                    echo '<option value="' . esc_attr($cat->slug) . '">' . esc_html($cat->name) . '</option>';
                }
            ?>
        </select>


        <!-- Filtre format -->
        <select id="filter-format">
            <option value="" disabled selected hidden>FORMATS</option>
            <?php
                $formats = get_terms(array(
                'taxonomy'   => 'format',
                'hide_empty' => true,
                ));
                foreach ($formats as $format) {
                echo '<option value="' . esc_attr($format->slug) . '">' . esc_html($format->name) . '</option>';
                }
            ?>
        </select>


        <!-- Tri par date -->
        <select id="sort-date">
            <option value="" disabled selected hidden>TRIER PAR</option>
            <option value="desc">À partir des plus récentes</option>
            <option value="asc">À partir des plus anciennes</option>
        </select>



        </div>

        <?php
            // On revient dans le PHP pour afficher la grille
            echo '<div class="photo-grid">';

            while ($photos->have_posts()) :
                $photos->the_post();
                get_template_part('template-parts/photo-block');
            endwhile;

            echo '</div>'; // .photo-grid
        ?>

        <?php if ($photos->max_num_pages > 1) : ?>
            <button 
                id="load-more-photos"
                data-current-page="<?php echo esc_attr($paged); ?>"
                data-max-pages="<?php echo esc_attr($photos->max_num_pages); ?>">
                Charger plus
            </button>
        <?php endif; ?>

        <?php
            wp_reset_postdata();

        else :
            echo '<p>Aucune photo trouvée.</p>';
        endif;
        ?>

    </section>

</main>

<?php
get_footer();

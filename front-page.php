<?php
get_header();

// Appel du Hero
get_template_part('template-parts/hero-header');
?>

<main class="site-main">

    <section class="photo-list container">

        <?php
        // Requête pour récupérer les photos du CPT "photo"
        $args = array(
            'post_type'      => 'photo',
            'posts_per_page' => -1, // plus tard pour la pagination infinie
        );

        $photos = new WP_Query($args);

        if ($photos->have_posts()) :

            echo '<div class="photo-grid">'; 

            // Loop permettant de parcourir les photos
            while ($photos->have_posts()) :
                $photos->the_post();

                // On réutilise le bloc d'affichage d'une photo
                get_template_part('template-parts/photo-block');

            endwhile;

            echo '</div>'; // .photo-grid

            wp_reset_postdata();

        else :
            echo '<p>Aucune photo trouvée.</p>';
        endif;
        ?>

    </section>

</main>

<?php
get_footer();

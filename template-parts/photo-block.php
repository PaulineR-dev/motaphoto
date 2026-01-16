<article class="photo-block">
    <div class="photo-thumb">

        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('large', ['class' => 'photo-thumb-img']); ?>
        <?php endif; ?>

        <div class="photo-overlay">

            <!-- Icône oeil -->
            <a href="<?php the_permalink(); ?>" id="icon-eye" title="Infos">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/icon_eye.png" alt="Icône oeil">
            </a>

           <!-- Icône plein écran -->
            <a href="#"
                class="icon-fullscreen"
                data-image="<?php echo esc_url(wp_get_attachment_url(get_post_thumbnail_id())); ?>"
                data-ref="<?php the_field('reference'); ?>"
                data-cat="<?php 
                    $cats = get_the_terms(get_the_ID(), 'categorie');
                    if ($cats) echo esc_html($cats[0]->name);
                    ?>"
                data-alt="<?php echo esc_attr( get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true ) ); ?>"
                data-single="<?php the_permalink(); ?>"
                title="Plein écran">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/Icon_fullscreen.png" alt="Icône plein écran">
            </a>

            <!-- Condition pour affichage référence et catégorie : pas sur single-photo -->
            <?php if ( ! is_singular('photo') ) : ?> 
                <!-- Titre photo en bas à gauche -->
                <div class="photo-ref">
                    <?php the_title(); ?>
                </div>
                <!-- Catégorie en bas à droite -->
                <div class="photo-cat">
                    <?php 
                        $cats = get_the_terms(get_the_ID(), 'categorie');
                        if ($cats) echo esc_html($cats[0]->name);
                    ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</article>

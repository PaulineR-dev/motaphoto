<article class="photo-block">
    <div class="photo-thumb">

        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('medium', ['class' => 'photo-thumb-img']); ?>
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
               title="Voir en plein écran">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/icons/Icon_fullscreen.png" alt="Plein écran">
            </a>

        </div>
    </div>
</article>

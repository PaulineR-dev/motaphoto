<h3>VOUS AIMEREZ AUSSI</h3>

<?php
// template_parts/photo_block.php


$current_id = get_the_ID();
$terms = get_the_terms($current_id, 'categorie');

if ($terms && ! is_wp_error($terms)) {
    $term_id = $terms[0]->term_id;

    $args = array(
        'post_type'      => 'photo',
        'posts_per_page' => 2,
        'post__not_in'   => array($current_id),
        'tax_query'      => array(
            array(
                'taxonomy' => 'categorie',
                'field'    => 'term_id',
                'terms'    => $term_id,
            ),
        ),
    );

    $related = new WP_Query($args);

    if ($related->have_posts()) {
        echo '<section class="related-photos">';
        echo '<div class="photo-grid">';

        while ($related->have_posts()) {
            $related->the_post();
            ?>
            <article class="photo-block">
                <div class="photo-thumb" style="width:564px; height:495px;">
                    <?php if (has_post_thumbnail()) {
                        the_post_thumbnail('medium', [
                          'style' => 'width:100%; height:100%; object-fit:cover;'
                            // Revoir style : en cours
                        ]);
                    } ?>
                    <div class="photo-overlay">
                        <!-- Overlay en cours -->
                        <a href="<?php the_permalink(); ?>" class="icon-eye" title="Infos">
                            <span class="dashicons dashicons-visibility"></span>
                        </a>
                        <a href="<?php echo esc_url(wp_get_attachment_url(get_post_thumbnail_id())); ?>" 
                           class="icon-fullscreen" 
                           data-lightbox="gallery" 
                           title="Voir en plein écran">
                            <span class="dashicons dashicons-fullscreen-alt"></span>
                        </a>
                    </div>
                </div>
            </article>
            <?php
        }

        echo '</div>';
        echo '</section>';
        wp_reset_postdata();
    }
}
?>

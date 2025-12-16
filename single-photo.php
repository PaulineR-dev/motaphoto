<?php get_header(); ?>

<main class="single-photo">
<?php while ( have_posts() ) : the_post(); ?>

    <!-- Partie principale single-photo -->
    <section class="photo-main">
        <?php the_content(); ?>
        <h1><?php the_title(); ?></h1>

        <ul class="photo-infos">
            <li>Référence : <?php the_field('reference'); ?></li>
            <li>Catégorie : <?php the_field('categorie'); ?></li>
            <li>Format : <?php the_field('format'); ?></li>
            <li>Type : <?php the_field('type'); ?></li>
            <li>Année : <?php the_field('annee'); ?></li>
        </ul>
    </section>

    <!-- Partie "Cette photo vous intéresse ?" -->
    <section class="photo-contact">
        <h2>Cette photo vous intéresse ?</h2>
        <button id="contact-button" data-ref-photo="<?php the_field('reference'); ?>">
            Contact
        </button>
		<!-- Petite photo (Réception) -->
		</div>
    </section>

    <!-- Partie "Vous aimerez aussi" -->
    <section class="autres-photos">
        <h2>VOUS AIMEREZ AUSSI</h2>
		<!-- Images de bas de page de la partie vous aimerez aussi -->
        
    </section>

<?php endwhile; ?>
</main>

<?php get_footer(); ?>

<?php get_header(); ?>

<main class="single-photo">
<?php while ( have_posts() ) : the_post(); ?>

    <!-- Partie principale single-photo -->
    <section class="photo-main">
        <?php the_content(); ?>
        <h1><?php the_title(); ?></h1>

        <ul class="photo-infos">
			<!-- Référence et type : champs/custom fields gérés par SCF -->
			<!-- Catégorie et format : taxonomies gérées par CPT UI -->
            <li>Référence : <?php the_field('reference'); ?></li> 
            <li>Catégorie :
        		<?php
        		$categories = get_the_terms(get_the_ID(), 'categorie');
        			if ($categories && ! is_wp_error($categories)) {
            			foreach ($categories as $categorie) {
                		echo esc_html($categorie->name) . ' ';
            		}
        		}
        		?>
    		</li>
            <li>Format :
        		<?php
        		$formats = get_the_terms(get_the_ID(), 'format');
        			if ($formats && ! is_wp_error($formats)) {
            		foreach ($formats as $format) {
                		echo esc_html($format->name) . ' ';
            		}
        			}
        		?>
            <li>Type : <?php the_field('type'); ?></li>

			<li>Année : <?php echo get_the_date('Y'); ?></li> 
			<!-- get_the_date('Y') renvoie uniquement l'année -->
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

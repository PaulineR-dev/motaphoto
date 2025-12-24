<?php get_header(); ?>

<main class="single-photo">
<?php while ( have_posts() ) : the_post(); ?>


	<div class="container-singlephoto">



		<div class="tailleecran">


	<div class="infoimg-top">
		<!-- Bloc gauche 50% de largeur : infos -->
		<div id="infophoto-singlephoto">
        	<h2 id="titre-singlephoto"><?php the_title(); ?></h2>
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
		</div>

		<!-- Bloc droite 50% de largeur : photo -->
		<div id="image-singlephoto">
        	<?php the_content(); ?>
		</div>	

					</div>
<!-- Bloc bas regroupant les interactions-->
	<div class="interactions-singlephoto">
		<!-- À gauche : contact -->
		<div class="contact-left">
        	<p id="question">Cette photo vous intéresse ?</p>
			<button id="contact-button-photo" data-ref-photo="<?php the_field('reference'); ?>">
        	Contact
    		</button>
		</div>

		<!-- À droite : navigation vers les autres photos -->
    	<div class="nav-right">
    		<?php
    			$prev_post = get_previous_post();
    			$next_post = get_next_post();
    		?>
    		<div class="photo-navigation">
        		<?php if ($prev_post): ?>
            		<a class="nav-photo prev" href="<?php echo esc_url(get_permalink($prev_post->ID)); ?>">
                	←
            		</a>
            		<div class="nav-thumbnail prev-thumb">
                	<?php echo get_the_post_thumbnail($prev_post->ID, 'thumbnail'); ?>
            		</div>
        		<?php endif; ?>

        		<?php if ($next_post): ?>
            		<a class="nav-photo next" href="<?php echo esc_url(get_permalink($next_post->ID)); ?>">
            		 →
            		</a>
            		<div class="nav-thumbnail next-thumb">
                	<?php echo get_the_post_thumbnail($next_post->ID, 'thumbnail'); ?>
            		</div>
        		<?php endif; ?>
    		</div>
		</div>



				</div>






	</div>



    

	<!-- Partie "Vous aimerez aussi" -->
	<?php get_template_part('template_parts/photo_block'); ?>
			</div>

<?php endwhile; ?>
</main>

<?php get_footer(); ?>

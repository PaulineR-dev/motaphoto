<?php get_header(); ?>

<main class="single-photo">
	<div class="container-singlephoto">
		<!-- Boucle pour parcourir tous les posts -->
		<?php while ( have_posts() ) : the_post(); ?> 
			<div class="tailleecran">
				<div class="infoimg-top">
					<!-- Bloc gauche 50% de largeur : infos -->
					<div id="infophoto-singlephoto">
						<h2 id="titre-singlephoto"><?php the_title(); ?></h2>
						<ul class="photo-infos">
							<!-- Référence et type : champs/custom fields gérés par SCF -->
							<!-- Catégorie et format : taxonomies gérées par CPT UI -->
							<li>Référence : <?php the_field('reference'); ?></li> 
							<!-- Affiche la référence de la photo via un champ personnalisé (SCF/ACF) -->
							<li>Catégorie :
								<?php
									$categories = get_the_terms(get_the_ID(), 'categorie');
									// Récupère les termes de la taxonomie "categorie" associés à la photo
									// Vérifie qu'il y a bien des termes et qu'il n'y a pas d'erreur
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
							</li>
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

					<!-- À droite : navigation -->
					<div class="nav-right">
						<?php
							$prev_post = get_previous_post();
							$next_post = get_next_post();
						?>

						<div class="nav-thumbnail-center">
							<img id="nav-thumb" src="" alt="Miniature de la photo" >
						</div>

						<div class="photo-navigation">
							<?php if ($prev_post): ?>
								<a class="nav-photo prev"
									href="<?php echo esc_url(get_permalink($prev_post->ID)); ?>"
									data-thumb="<?php echo get_the_post_thumbnail_url($prev_post->ID, 'thumbnail'); ?>">
									<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/icons/Line1.png' ); ?>">
								</a>
							<?php endif; ?>

							<?php if ($next_post): ?>
								<a class="nav-photo next"
									href="<?php echo esc_url(get_permalink($next_post->ID)); ?>"
									data-thumb="<?php echo get_the_post_thumbnail_url($next_post->ID, 'thumbnail'); ?>">
									<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/icons/Line2.png' ); ?>">
								</a>
							<?php endif; ?>
						</div> 
					</div> 
				</div> 
			</div> 						
		<?php endwhile; ?>

		<!-- Partie "Vous aimerez aussi" -->
		<h3 id="text-vousaimerezaussi">VOUS AIMEREZ AUSSI</h3>

			<div class="related-photos">
				<div class="photo-grid">

					<?php
						$current_id = get_the_ID(); // Récupération de l'ID de la photo affichée
						$terms = get_the_terms($current_id, 'categorie'); // Récupération de la catégorie de la photo affichée

						if ($terms && ! is_wp_error($terms)) { // Vérification : si pas d'erreur et si la photo a au moins une catégorie

							$term_id = $terms[0]->term_id; // Récupération de l'ID de premier terme de "catégorie"

							$args = [ // Arguments pour la requête WP_QUERY
								'post_type'      => 'photo', // Cible uniquement les contenus CPT "photo"
								'posts_per_page' => 2, // 2 photos affichées dans la partie "photos apparentées"
								'post__not_in'   => [$current_id], // Exclusion de la photo actuelle pour éviter de l'afficher en doublon
								'tax_query'      => [ // Filtre appliqué par la catégorie sur la photo actuelle
									[
									'taxonomy' => 'categorie', // Utilisation de la taxonomie "catégorie"
									'field'    => 'term_id', // Identification des termes par leur ID
									'terms'    => $term_id, // Indique l'ID du terme (catégorie) à inclure dans la requête
									],
								],
							];

							$related = new WP_Query($args); // Création d'une nouvelle requête Wordpress avec les arguments définis

							if ($related->have_posts()) : // Vérification : si la requête a trouvé au moins une photo
								while ($related->have_posts()) : // Boucle sur chaque photo qui correspond à la requête
									$related->the_post();

									get_template_part('template-parts/photo-block');

								endwhile;
								wp_reset_postdata(); // Remet les données de la boucle globale dans leur état initial
							endif;
						}
					?>
    			</div>
			</div>
	</div> 
</main>

<?php get_footer(); ?>
    </div><!-- #primary -->
  </div><!-- #content -->

    <footer class="site-footer">
        <div class="footer-container">
    
            <nav id="footer-navigation" class="site-navigation">
                <?php
                    wp_nav_menu( array(
                        'theme_location' => 'motaphoto_menu_footer',
                        'container'      => false,
                        'menu_class'     => 'menu',
					    'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s<li>TOUS DROITS RÉSERVÉS</li></ul>',
                    ) );
                ?>
            </nav>
        </div>
    </footer>

    <?php get_template_part('templates_part/modale-contact'); ?>

</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>

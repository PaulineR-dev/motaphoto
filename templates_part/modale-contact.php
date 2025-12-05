<!-- Modale contact qui peut être affichée sur toutes les pages -->
<div id="contact-modale" class="modale">
 
  <div class="modale-content">

 <div class="contact-header">
      <img src="<?php echo get_template_directory_uri(); ?>/assets/images/Contact-header.png" alt="Contact Header">
    </div>

    <?php
      echo do_shortcode('[contact-form-7 id="cf269bb" title="Modale contact"]');
    ?>
  </div>
</div>

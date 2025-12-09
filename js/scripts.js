document.addEventListener('DOMContentLoaded', function () { // Chargement du script après que tout le DOM soit chargé
  // Récupération des éléments nécessaires
  const modale = document.getElementById('contact-modale');
  const contactLink = document.querySelector('.modale-contact');
  const menuToggle = document.querySelector('.menu-toggle'); 
  const mobileHeaderOverlay = document.getElementById('mobile-header-overlay');
  const closeBtn = mobileHeaderOverlay.querySelector('.overlay-close');
  const body = document.body;

  // Vérifie si on est en version mobile ou pas
  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  // Animations pour version DESKTOP
  // Animation d'apparition Fade in en desktop
  function fadeIn(element, duration = 200) {
    element.style.display = 'flex';
    element.style.opacity = 0;
    element.style.transform = 'none'; // Reset les transformations
    let startfadeIn = null;

    // Fonction appelée à chaque frame
    function animateFadeIn(ts) {
      if (!startfadeIn) startfadeIn = ts; // Initialisation du temps de départ
      const progress = (ts - startfadeIn) / duration; // Calcul la progression de 0 jusqu'à 1
      element.style.opacity = Math.min(progress, 1); // Augmente l'opacité progressivement
      if (progress < 1) requestAnimationFrame(animateFadeIn); // Continue animation tant que pas terminé
    }
    requestAnimationFrame(animateFadeIn); // Lance l'animation
  }

  // Animation de disparition Fade out en desktop
  function fadeOut(element, duration = 200) {
    let startfadeOut = null;

    function animateFadeOut(ts) {
      if (!startfadeOut) startfadeOut = ts; // Initialisation du temps de départ
      const progress = (ts - startfadeOut) / duration; // Calcul la progression de 0 jusqu'à 1
      element.style.opacity = Math.max(1 - progress, 0); // Diminue l'opacité progressivement
      if (progress < 1) { // Continue animation tant que pas terminé
        requestAnimationFrame(animateFadeOut);
      } else {
        element.style.display = 'none'; // Cache l'élément une fois terminé
        element.style.transform = 'none'; // Reset les transformations
      }
    }
    requestAnimationFrame(animateFadeOut); // Lance l'animation
  }

  // Animation pour version MOBILE
  // Animation d'apparition de droite à gauche pour le menu mobile
  function fadeSlideIn(element, duration = 200) {
    element.style.display = 'flex';
    element.style.opacity = 0;
    element.style.transform = 'translateX(100%)';
    let startfadeSlideIn = null; // Variable pour stocker le temps de départ

    // Fonction interne appelée à chaque frame par requestAnimationFrame
    function animateFadeSlideIn(ts) {
      if (!startfadeSlideIn) startfadeSlideIn = ts; // Initialise le temps de départ à la première frame
      const progress = Math.min((ts - startfadeSlideIn) / duration, 1); // Calcule la progression de l'animation (entre 0 et 1)
      element.style.opacity = progress; // Augmente l'opacité progressivement (de 0 à 1)
      element.style.transform = `translateX(${100 - 100 * progress}%)`; // Déplace l'élément de 100% (hors écran) vers 0% (à sa place)

      if (progress < 1) requestAnimationFrame(animateFadeSlideIn); // Continue tant que l'animation n'est pas terminée
    }
    requestAnimationFrame(animateFadeSlideIn); // Lance la première frame de l'animation
  }

  // Animation de disparition de gauche à droite pour le menu mobile
  function fadeSlideOut(element, duration = 200) {
    let startfadeSlideOut = null; // Variable pour stocker le temps de départ

    // Fonction interne appelée à chaque frame
    function animateFadeSlideOut(ts) {
      if (!startfadeSlideOut) startfadeSlideOut = ts;  // Initialise le temps de départ
      const progress = Math.min((ts - startfadeSlideOut) / duration, 1); // Calcule la progression
      
      element.style.opacity = 1 - progress; // Diminue l'opacité progressivement (de 1 à 0)
      element.style.transform = `translateX(${100 * progress}%)`; // Déplace l'élément de 0% (sa place) vers 100% (hors écran à droite)
      if (progress < 1) {
        requestAnimationFrame(animateFadeSlideOut); // Continue tant que pas terminé
      } else {
        element.style.display = 'none'; // Cache l'élément une fois fini
        element.style.transform = 'translateX(100%)'; // Reset hors écran
        element.style.opacity = 0; // Reset transparent
      }
    }
    requestAnimationFrame(animateFadeSlideOut); // Lance la première frame de l'animation
  }

  // Gestion des événements
  // Ouverture de la modale au clic sur "Contact"
  if (contactLink && modale) { // Vérifie que le lien "Contact" et la modale existent bien dans le DOM

    // Ajoute un écouteur d'événement sur le lien "Contact"
    contactLink.addEventListener('click', function (event) {
      event.preventDefault(); // Empêche le comportement par défaut du lien
      
      // Vérifie si version mobile ou pas
      if (isMobile()) {

        // Sur mobile : ouverture de la modale avec animation "slide in"
        fadeSlideIn(modale, 200);
        // Vérifie si le menu burger existe
        if (menuToggle) {
          // Ferme le menu burger instantanément sans animation
          body.classList.add('no-transition'); // Ajoute une classe qui désactive les transitions
          menuToggle.checked = false; // Décoche le bouton burger donc ferme le menu
          // Retire la classe juste après pour rétablir les transitions normales après 50ms
          setTimeout(() => body.classList.remove('no-transition'), 50);
        }
      } else {
        // Sinon (donc desktop) : ouverture de la modale avec l'animation fade in
        fadeIn(modale, 200);
      }
    });
  }

  // Ferme la modale en cliquant sur l’overlay
  window.addEventListener('click', function (event) {
    if (modale && event.target === modale) { // Vérifie que le clic s'effectue bien sur l'overlay
      if (isMobile()) {
        fadeSlideOut(modale, 200); // Animation mobile : slide out
      } else {
        fadeOut(modale, 200); // Animation desktop : fade out
      }
    }
  });

// Menu qui se superpose et qui coulisse en mobile
  function showMenuOverlay() {
    mobileHeaderOverlay.classList.add('open'); // Ajout de la classe .open
  }

  function hideMenuOverlay() {
    mobileHeaderOverlay.classList.remove('open'); // Retire la classe .open
  }

  // Ouvrir/fermer via le burger
  menuToggle.addEventListener('change', () => {
    // Quand état du burger via checkbox change
    if (menuToggle.checked) { // Si coché
      showMenuOverlay();
    } else {
      hideMenuOverlay();
    }
  });

  // Fermer via la croix
  closeBtn.addEventListener('click', () => {
    menuToggle.checked = false; // Décoche le burger
    hideMenuOverlay(); // Cache l'overlay
    menuToggle.focus(); // Remet le focus sur le burger
  });

  // Referme si on passe en desktop
  window.addEventListener('resize', () => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      hideMenuOverlay(); // Cache l'overlay si desktop
      menuToggle.checked = false; // Vérifie burger décoché
    }
  });
});

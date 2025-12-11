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

  // ANIMATIONS POUR VERSION DESKTOP
  // Animation d'apparition Fade in (desktop)
  function fadeIn(element, duration = 300) {
    element.style.display = 'flex';
    element.animate([
      { opacity: 0, transform: 'none' }, // Départ : invisible
      { opacity: 1, transform: 'none' } // Arrivée : visible
    ], {
      duration: duration,
      easing: 'ease-out',
      fill: 'forwards'
    });
  }

  // Fade out (desktop)
  function fadeOut(element, duration = 300) {
    const animation = element.animate([
      { opacity: 1, transform: 'none' }, // Départ : visible
      { opacity: 0, transform: 'none' } // Arrivée : invisible
    ], {
      duration: duration,
      easing: 'ease-out',
      fill: 'forwards'
    });

    animation.onfinish = () => {
      element.style.display = 'none';
    };
  }

  // ANIMATIONS VERSION MOBILE
  // Animation d'apparition de droite à gauche pour le menu mobile
  function fadeSlideIn(element, duration = 300) {
    element.style.display = 'flex'; // Rend visible
    element.animate([
      { transform: 'translateX(100%)', opacity: 0 }, // Départ : hors écran, invisible
      { transform: 'translateX(0)', opacity: 1 } // Arrivée : en place, visible
    ], {
      duration: duration, // Durée de 300ms comme requis par la maquette Figma
      easing: 'ease-out', // Courbe d'animation comme requis sur Figma : démarre vite et ralentit progressivement
      fill: 'forwards' // Conserve l'état final
    });
  }

  // Animation de disparition de gauche à droite pour le menu mobile
  function fadeSlideOut(element, duration = 300) {
    const animation = element.animate([
      { transform: 'translateX(0)', opacity: 1 }, // Départ : en place, visible
      { transform: 'translateX(100%)', opacity: 0 } // Arrivée : hors écran, invisible
    ], {
      duration: duration,
      easing: 'ease-out',
      fill: 'forwards'
    });

    // Quand l'animation est terminée, on cache l'élément
    animation.onfinish = () => {
      element.style.display = 'none';
    };
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
        fadeSlideIn(modale, 300);
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
        fadeIn(modale, 300);
      }
    });
  }

  // Ferme la modale en cliquant sur l’overlay
  window.addEventListener('click', function (event) {
    if (modale && event.target === modale) { // Vérifie que le clic s'effectue bien sur l'overlay
      if (isMobile()) {
        fadeSlideOut(modale, 300); // Animation mobile : slide out
      } else {
        fadeOut(modale, 300); // Animation desktop : fade out
      }
    }
  });

  // Menu qui se superpose et qui coulisse en mobile
  function showMenuOverlay(element, duration = 300) {
    if (!element) return;
    element.style.display = 'flex';
    element.animate([
      { transform: 'translateX(100%)', opacity: 0, backgroundColor: 'transparent' }, 
      { transform: 'translateX(0)', opacity: 1, backgroundColor: '#fff' }
    ], {
      duration: duration,
      easing: 'ease-out',
      fill: 'forwards'
    });
  }

  // Cache l'overlay mobile avec coulissement et retour transparent
  function hideMenuOverlay(element, duration = 300) {
    if (!element) return;
      const animation = element.animate([
        { transform: 'translateX(0)', opacity: 1, backgroundColor: '#fff' },
        { transform: 'translateX(100%)', opacity: 0, backgroundColor: 'transparent' }
    ], {
      duration: duration,
      easing: 'ease-out',
      fill: 'forwards'
    });

    animation.onfinish = () => {
      element.style.display = 'none';
    };
  }

  // Ouvrir/fermer via le burger
  menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
      showMenuOverlay(mobileHeaderOverlay);
    } else {
      hideMenuOverlay(mobileHeaderOverlay);
    }
  });

  // Fermer via la croix
  closeBtn.addEventListener('click', () => {
    menuToggle.checked = false;
    hideMenuOverlay(mobileHeaderOverlay);
    menuToggle.focus();
  });

  // Referme si on passe en desktop
  window.addEventListener('resize', () => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      hideMenuOverlay(mobileHeaderOverlay);
      menuToggle.checked = false;
    }
  });
});

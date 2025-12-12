document.addEventListener('DOMContentLoaded', function () { // Chargement du script après que tout le DOM soit chargé
  // Récupération des éléments nécessaires
  const contactModale = document.getElementById('contact-modale');
  const contactLink = document.querySelector('.modale-contact');
  const menuToggle = document.querySelector('.menu-toggle'); 
  const mobileHeaderOverlay = document.getElementById('mobile-header-overlay');
  const closeBtn = document.querySelector('.overlay-close');
  const menuHeader = document.getElementById('menu-motaphoto_menu');
  // const body = document.body;

  // Vérifie si on est en version mobile ou pas
  function ecranMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }


  // ANIMATIONS POUR VERSION DESKTOP

  // Animation d'apparition Fade in (desktop)
  function fadeInContact() {
    contactModale.style.display = 'flex';
    contactModale.animate([
      { opacity: 0, transform: 'none' },
      { opacity: 1, transform: 'none' }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards' // L'élément conserve l'état final à la fin de l'animation
    });
  }

  // Animation de disparition Fade out (desktop)
  function fadeOutContact() {
    const animationFadeOutContact  = contactModale.animate([
      { opacity: 1, transform: 'none' },
      { opacity: 0, transform: 'none' }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards'
    });

    animationFadeOutContact.onfinish = () => {
      contactModale.style.display = 'none';
    };
  }


  // ANIMATIONS POUR VERSION MOBILE

  // Animation d'apparition de droite à gauche pour le menu mobile
  function showMenuMobile() {
    if (!mobileHeaderOverlay) return;
    mobileHeaderOverlay.style.display = 'flex';
    mobileHeaderOverlay.animate([
      { transform: 'translateX(100%)', opacity: 0, backgroundColor: 'transparent' },
      { transform: 'translateX(0)', opacity: 1, backgroundColor: '#fff' }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards'
    });
  }

  // Animation de disparition de gauche à droite pour le menu mobile
  function hideMenuMobile() {
    if (!mobileHeaderOverlay) return;
    const animationHideMenuMobile = mobileHeaderOverlay.animate([
      { transform: 'translateX(0)', opacity: 1, backgroundColor: '#fff' },
      { transform: 'translateX(100%)', opacity: 0, backgroundColor: 'transparent' }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards'
    });

    animationHideMenuMobile.onfinish = () => {
      mobileHeaderOverlay.style.display = 'none';
    };
  }

  // Animation d'apparition de droite à gauche pour la modale Contact (mobile)
  function fadeSlideInContact() {
    contactModale.style.display = 'flex';
    contactModale.animate([
      { transform: 'translateX(100%)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ], {
      duration: 300, // Comme défini sur maquette Figma
      easing: 'ease-out', // Comme défini sur maquette Figma
      fill: 'forwards'
    });
  }

  // Animation de disparition de gauche à droite pour la modale Contact (mobile)
  function fadeSlideOutContact() {
    const animationfadeSlideOutContact = contactModale.animate([
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(100%)', opacity: 0 }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards'
    });

    animationfadeSlideOutContact.onfinish = () => {
      contactModale.style.display = 'none';
    };
  }


  // GESTION DES EVENEMENTS

  // Ouverture de la modale au clic sur "Contact"
  contactLink.addEventListener('click', function (eventClicContact) {
    eventClicContact.preventDefault();

    if (ecranMobile()) {
      fadeSlideInContact();
        menuHeader.style.transition = 'none'; // Désactive les transitions du menu
        menuToggle.checked = false; // Ferme le menu burger
        mobileHeaderOverlay.style.display = 'none'; // Cache le menu overlay mobile sans transition
      // Réactive les transitions après un court délai
      setTimeout(() => {
        menuHeader.style.transition = ''; // Retour aux transitions CSS normales
      }, 50);

    } else {
      fadeInContact(); // Desktop
    }
  });

  // }

  // Fermeture de la modale en cliquant sur l’overlay
  window.addEventListener('click', function (event) {
    if (contactModale && event.target === contactModale) {
      if (ecranMobile()) {
        fadeSlideOutContact();
      } else {
        fadeOutContact();
      }
    }
  });

  // Ouverture et fermeture du menu burger
  menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
      showMenuMobile();
    } else {
      hideMenuMobile();
    }
  });

  // Fermeture du menu burger au clic sur la croix
  closeBtn.addEventListener('click', () => {
    menuToggle.checked = false;
    hideMenuMobile();
  });

  // Fermeture du menu burger si passe en desktop
  window.addEventListener('resize', () => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      hideMenuMobile();
      menuToggle.checked = false;
    }
  });
});
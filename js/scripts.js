document.addEventListener('DOMContentLoaded', function () { // Chargement du script après que tout le DOM soit chargé
  // Récupération des éléments nécessaires
  const contactModale = document.querySelector('.modale');
  const contactLink = document.querySelector('.modale-contact');
  const menuToggle = document.querySelector('.menu-toggle'); 
  const mobileHeaderOverlay = document.getElementById('mobile-header-overlay');
  const closeBtn = document.querySelector('.overlay-close');
  const menuHeader = document.getElementById('menu-motaphoto_menu');

  // Vérifie si on est en version mobile ou pas
  function isMobileScreen() {
    return window.matchMedia("(max-width: 768px)").matches;
  }


  // ANIMATIONS POUR VERSION DESKTOP
  // MODALE DESKTOP
  // Animation d'apparition Fade in de la modale (desktop)
  function fadeInContactModale() {
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

  // Animation de disparition Fade out de la modale (desktop)
  function fadeOutContactModale() {
    const animationFadeOutContactModale  = contactModale.animate([
      { opacity: 1, transform: 'none' },
      { opacity: 0, transform: 'none' }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards'
    });

    animationFadeOutContactModale.onfinish = () => {
      contactModale.style.display = 'none';
    };
  }


  // ANIMATIONS POUR VERSION MOBILE
  // MENU

  // Animation ouverture du menu burger (liste des liens)
  function openBurgerMenu() {
    menuHeader.style.display = 'flex';
    menuHeader.style.pointerEvents = 'auto';
    menuHeader.animate([
      { transform: 'translateX(100%)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards'
    });
  }

  function closeBurgerMenu() { 
    const animationcloseBurgerMenu = menuHeader.animate([
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(100%)', opacity: 0 }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards'
    });

  animationcloseBurgerMenu.onfinish = () => {
    menuHeader.style.pointerEvents = 'none';
    menuHeader.style.display = 'none';
  };
}

  // MENU OVERLAY (barre haute du menu avec logo et croix)
  // Animation d'apparition de droite à gauche pour le MENU OVERLAY (mobile))
  function openMenuMobileOverlay() {
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

  // Animation de disparition de gauche à droite pour le MENU OVERLAY (mobile)
  function closeMenuMobileOverlay() {
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

  // Animation d'apparition de droite à gauche pour la MODALE Contact (mobile)
  function slideInContactModale() {
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

  // Animation de disparition de gauche à droite pour la MODALE Contact (mobile)
  function slideOutContactModale() {
    const animationSlideOutContact = contactModale.animate([
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(100%)', opacity: 0 }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards'
    });

    animationSlideOutContact.onfinish = () => {
      contactModale.style.display = 'none';
    };
  }


  // GESTION DES EVENEMENTS
  // Ouverture de la MODALE au clic sur "Contact"
  contactLink.addEventListener('click', function (eventClicContact) {
  eventClicContact.preventDefault();

    if (isMobileScreen()) {
      slideInContactModale();
 
      menuHeader.style.display = 'none';
      menuHeader.style.pointerEvents = 'none';

      mobileHeaderOverlay.style.display = 'none';
      menuToggle.checked = false;

      // Désactive les transitions du menu temporairement
      menuHeader.style.transition = 'none';
      setTimeout(() => {
        menuHeader.style.transition = '';
      }, 50);
    } else {
      fadeInContactModale(); // Desktop
    }
  });

  // Fermeture de la modale en cliquant sur l’overlay
  window.addEventListener('click', function (event) {
    if (contactModale && event.target === contactModale) {
      if (isMobileScreen()) {
        slideOutContactModale();
      } else {
        fadeOutContactModale();
      }
    }
  });

  // Ouverture et fermeture du menu burger
  menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
      openMenuMobileOverlay();
      openBurgerMenu()
    } else {
      closeMenuMobileOverlay();
      closeBurgerMenu();
    }
  });

  // Fermeture du menu burger au clic sur la croix
  closeBtn.addEventListener('click', () => {
    menuToggle.checked = false;
    closeMenuMobileOverlay();
    closeBurgerMenu();
  });

  // Passage mobile à desktop
  function resetMenuForDesktop() {
    // Supprime les styles posés en mobile
    menuHeader.style.display = '';
    menuHeader.style.pointerEvents = '';
    menuHeader.style.opacity = '';
    menuHeader.style.transform = '';
    // Ferme aussi l’overlay mobile sans animation
    if (mobileHeaderOverlay) {
      mobileHeaderOverlay.style.display = '';
      mobileHeaderOverlay.style.opacity = '';
      mobileHeaderOverlay.style.transform = '';
    }

    // Décoche le toggle
    menuToggle.checked = false;
  }

  // Resize si version desktop
  window.addEventListener('resize', () => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      resetMenuForDesktop(); // Pas d’animation, juste reset menu quand passe de mobile à desktop
    }
  });
});
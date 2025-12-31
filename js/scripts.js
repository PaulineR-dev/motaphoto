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
      resetRefPhoto();
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
      resetRefPhoto();
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


  // Fonction commune aux différents boutons de contact
  function openContactModale() {
    if (isMobileScreen()) {
      slideInContactModale();
      menuHeader.style.display = 'none';
      menuHeader.style.pointerEvents = 'none';
      mobileHeaderOverlay.style.display = 'none';
      menuToggle.checked = false;
    } else {
      fadeInContactModale();
  }}

  // Réinitialisation du champ Référence photo : sélectionne la modale, trouve le champ de la ref. photo et vide la valeur
  function resetRefPhoto() {
    jQuery('.modale').find('input[name="ref_photo"]').val('');
  }

  // Ouverture via bouton Photo avec préremplissage automatique du champ Référence photo
  jQuery(function () {
    // Ecoute le clic sur le bouton contact du single-photo
    jQuery('#contact-button-photo').on('click', function (e) {
    e.preventDefault();
    openContactModale();
    const refPhoto = jQuery(this).attr('data-ref-photo'); // Récupère la référence de la photo 
    // Et injecte cette référence dans le champ du formulaire de la modale
    jQuery('.modale').find('input[name="ref_photo"]').val(refPhoto); // Sélectionne la modale, trouve le input[name="ref_photo"] et remplit avec la référence
    });
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



document.addEventListener("DOMContentLoaded", () => {
  const chargerPlusbtn = document.getElementById("load-more-photos");
  const photosGrid = document.querySelector(".photo-grid");
  const filterCategorie = document.getElementById("filter-categorie");
  const filterFormat = document.getElementById("filter-format");
  const filterOrder = document.getElementById("sort-date");

  // Si le bouton n'existe pas sur cette page, arrêt du script
  if (!chargerPlusbtn) return;

  // Récupération de la page actuelle depuis le bouton
  let currentOpenedPage = parseInt(chargerPlusbtn.dataset.currentPage);
  // Nombre total de pages (récupéré depuis le bouton)
  let maxPages = parseInt(chargerPlusbtn.dataset.maxPages);
  
  // Empêche de lancer plusieurs requêtes AJAX en même temps
  let loadingAjax = false;

  // Fonction qui récupère les valeurs des filtres
  function getFilters() {
    return {
      categorie: filterCategorie.value,
      format: filterFormat.value,
      order: filterOrder.value
    };
  }

  // Fonction qui charge les photos via AJAX avec nextPage pour le numéro de page à chager, append true pour ajout des photos et si false remplacement de la grille
  function loadPhotos(nextPage, append = true) {
  if (loadingAjax) return;// Si éventuelllement une requête est déjà en cours : ne fait rien

  // Indique requête en cours à l'exécution de la fonction
  loadingAjax = true;
        
  // Récupération des valeurs des filtres
  const filters = getFilters();

  // Ensemble des données à envoyer à WordPress
  const formData = new FormData();
  formData.append("action", "load_more_photos");
  formData.append("nonce", motaphotoInfinite.nonce);
  formData.append("page", nextPage);
  formData.append("categorie", filters.categorie);
  formData.append("format", filters.format);
  formData.append("order", filters.order);

  // Envoi de la requête AJAX
  fetch(motaphotoInfinite.ajax_url, {
    method: "POST",
    body: formData
  })
    .then(res => res.text()) // Récupération de la réponse traduite en HTML
    .then(html => {
      // Créateur d'un conteneur temporaire pour traiter le HTML reçu
      const temp = document.createElement("div");
      temp.innerHTML = html;

      // Récupération de la balise contenant le nombre total de pages
      const meta = temp.querySelector(".ajax-meta");

      // Si WordPress renvoie un nombre de pages, on le met à jour
      if (meta) {
        maxPages = parseInt(meta.dataset.maxPages);
        meta.remove(); // On retire cette balise du HTML
      }

      // Ajoute ou remplace les photos en fonction de si bouton cliqué pour charger plus ou si filtre(s) activé(s)
    if (append) {
      photosGrid.insertAdjacentHTML("beforeend", temp.innerHTML);
    } else {
      photosGrid.innerHTML = temp.innerHTML;
    }

      // Mise à jour de la page actuelle
      currentOpenedPage = nextPage;

      // Si on est à la dernière page alors le bouton est caché
      chargerPlusbtn.style.display = (currentOpenedPage >= maxPages) ? "none" : "block";
    })
    
      .finally(() => {
        // Indication de fin de requête pour en permettre éventuellement une autre
        loadingAjax = false;
      });
  }

  // Quand clic sur le bouton "Charger plus"
  chargerPlusbtn.addEventListener("click", () => {
    loadPhotos(currentOpenedPage + 1, true); // Charge la page suivante (true)
  });
    
  // Fonction appelée quand un filtre change
  function onFilterChange() {
    loadPhotos(1, false); // Rechargement depuis la page 1 et remplacement de la grille (false)
  }

  // Écoute les changements sur les filtres
  filterCategorie.addEventListener("change", onFilterChange);
  filterFormat.addEventListener("change", onFilterChange);
  filterOrder.addEventListener("change", onFilterChange);

});


document.addEventListener("DOMContentLoaded", () => {
    const thumb = document.getElementById("nav-thumb");
    const prev = document.querySelector(".nav-photo.prev");
    const next = document.querySelector(".nav-photo.next");

    if (!thumb) return;

    function showThumb(url) {
        thumb.src = url;
        thumb.style.display = "block";
    }

    function hideThumb() {
        thumb.style.display = "none";
        thumb.src = "";
    }

    if (prev) {
        prev.addEventListener("mouseenter", () => showThumb(prev.dataset.thumb));
        prev.addEventListener("mouseleave", hideThumb);
    }

    if (next) {
        next.addEventListener("mouseenter", () => showThumb(next.dataset.thumb));
        next.addEventListener("mouseleave", hideThumb);
    }
});


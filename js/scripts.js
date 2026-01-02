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
    }
  }

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



/* CUSTOM SELECTS */
document.addEventListener("DOMContentLoaded", () => {

    /* MARQUER LES PHOTOS INITIALES COMME "ANIMEES" */
    document.querySelectorAll(".photo-block").forEach(photo => {
        photo.classList.add("animated");
    });

    /* CUSTOM SELECT LOGIC */
    document.querySelectorAll(".custom-select").forEach(select => {

        const trigger = select.querySelector(".custom-select-trigger");
        const hiddenInput = document.getElementById(select.dataset.target);
        const placeholder = select.dataset.placeholder;

        /* OUVERTURE / RESET DU SELECT */
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();

            const selected = select.querySelector(".custom-option.selected");

            if (selected && trigger.textContent !== placeholder) {
                trigger.textContent = placeholder;
                select.classList.add("open");
                return;
            }

            if (trigger.textContent === placeholder && hiddenInput.value !== "") {
                select.querySelectorAll(".custom-option").forEach(o => o.classList.remove("selected"));
                hiddenInput.value = "";
                hiddenInput.dispatchEvent(new Event("change"));
                select.classList.add("open");
                return;
            }

            select.classList.toggle("open");
        });

        /* FERMETURE SI CLIC EN DEHORS */
        document.addEventListener("click", (e) => {
            if (!select.contains(e.target)) {
                select.classList.remove("open");
            }
        });

        /* CHOIX D’UNE OPTION */
        select.querySelectorAll(".custom-option").forEach(option => {
            option.addEventListener("click", () => {

                select.querySelectorAll(".custom-option").forEach(o => o.classList.remove("selected"));
                option.classList.add("selected");

                trigger.textContent = option.textContent.toUpperCase();
                hiddenInput.value = option.dataset.value;

                select.classList.remove("open");
                hiddenInput.dispatchEvent(new Event("change"));
            });
        });

    });

});

/* AJAX : CHARGEMENT DES PHOTOS */
const chargerPlusbtn = document.getElementById("load-more-photos");
const photosGrid = document.querySelector(".photo-grid");
const filterCategorie = document.getElementById("filter-categorie");
const filterFormat = document.getElementById("filter-format");
const filterOrder = document.getElementById("sort-date");

let currentOpenedPage = chargerPlusbtn ? parseInt(chargerPlusbtn.dataset.currentPage) : 1;
let maxPages = chargerPlusbtn ? parseInt(chargerPlusbtn.dataset.maxPages) : 1;
let loadingAjax = false;

function getFilters() {
    return {
        categorie: filterCategorie ? filterCategorie.value : "",
        format: filterFormat ? filterFormat.value : "",
        order: filterOrder ? filterOrder.value : ""
    };
}

function loadPhotos(nextPage, append = true) {
    if (loadingAjax) return;
    if (nextPage > maxPages) return;

    loadingAjax = true;

    const filters = getFilters();

    const formData = new FormData();
    formData.append("action", "load_more_photos");
    formData.append("nonce", motaphotoInfinite.nonce);
    formData.append("page", nextPage);
    formData.append("categorie", filters.categorie);
    formData.append("format", filters.format);
    formData.append("order", filters.order);

    fetch(motaphotoInfinite.ajax_url, {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(html => {

        const temp = document.createElement("div");
        temp.innerHTML = html;

        const meta = temp.querySelector(".ajax-meta");

        if (meta) {
            maxPages = parseInt(meta.dataset.maxPages);
            currentOpenedPage = parseInt(meta.dataset.currentPage);
            meta.remove();
        } else {
            console.warn("Pas de .ajax-meta dans la réponse AJAX");
            if (chargerPlusbtn) chargerPlusbtn.style.display = "none";
            return;
        }

        if (append) {
            photosGrid.insertAdjacentHTML("beforeend", temp.innerHTML);
        } else {
            photosGrid.innerHTML = temp.innerHTML;
        }

        initLightbox();

        /* FADE-IN DES NOUVELLES PHOTOS */
        const newPhotos = photosGrid.querySelectorAll(".photo-block:not(.animated)");
        newPhotos.forEach(photo => {
            photo.classList.add("animated");
            photo.animate([
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 350,
                easing: 'ease-out',
                fill: 'forwards'
            });
        });

        /* GESTION DU BOUTON CHARGER PLUS */
        if (currentOpenedPage >= maxPages) {

            const fadeOut = chargerPlusbtn.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(10px)' }
            ], {
                duration: 300,
                easing: 'ease-out',
                fill: 'forwards'
            });

            fadeOut.finished.then(() => {
                chargerPlusbtn.style.display = "none";
            });

        } else {
            chargerPlusbtn.style.display = "block";
            chargerPlusbtn.style.opacity = "1";
            chargerPlusbtn.style.transform = "translateY(0)";
        }

    })
    .finally(() => {
        loadingAjax = false;
    });
}


/* RESET + RECHARGEMENT */
function onFilterChange() {
    loadPhotos(1, false);
}

/* LISTENERS */
if (filterCategorie) filterCategorie.addEventListener("change", onFilterChange);
if (filterFormat) filterFormat.addEventListener("change", onFilterChange);
if (filterOrder) filterOrder.addEventListener("change", onFilterChange);

if (chargerPlusbtn) {
    chargerPlusbtn.addEventListener("click", () => {
        loadPhotos(currentOpenedPage + 1, true);
    });
}



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


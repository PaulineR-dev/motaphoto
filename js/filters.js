
/******* CUSTOM SELECTS ********/
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".photo-block").forEach(photo => {
        photo.classList.add("photo-already-loaded"); // Sert de marqueur afin de ne pas appliquer par la suite de fade in aux images déjà chargées
    });


    document.querySelectorAll(".custom-select").forEach(select => {

        const trigger = select.querySelector(".custom-select-trigger"); // Élément cliquable qui ouvre/ferme le menu
        const hiddenInput = document.getElementById(select.dataset.target); // Input caché qui stocke la vraie valeur du filtre
        const placeholder = select.dataset.placeholder; // Texte affiché quand aucune option n’est sélectionnée

        /* OUVERTURE / REINITIALISATION DU SELECT */
        trigger.addEventListener("click", (e) => {
            e.stopPropagation(); // Empêche la fermeture immédiate par le clic global sinon s'ouvrirait et se refermerait aussitôt

            // Récupère l'option actuellement sélectionnée (s'il y en a une)
            const selected = select.querySelector(".custom-option.selected");

            /* CAS 1 : si une option est déjà sélectionnée ET le trigger n'affiche pas le placeholder
            Si l'utilisateur reclique, on remet le placeholder (ex : "Catégorie")
            Puis ouverture pour lui permettre de choisir autre chose */
            if (selected && trigger.textContent !== placeholder) {
                trigger.textContent = placeholder; // Réaffiche le placeholder
                trigger.insertAdjacentHTML("beforeend", '<i class="fa-solid fa-angle-down"></i>');
                select.classList.add("open"); // Ouvre le menu
                return;
            }

            /* CAS 2 : le trigger affiche le placeholder MAIS un filtre est actif
            Cela signifie que l'utilisateur a déjà choisi une option auparavant (hiddenInput.value !== "")
            → Réinitialise complètement le select : retire la classe "selected", vide la valeur du filtre, déclenche un "change" pour relancer l'AJAX, rouvre le menu */
            if (trigger.textContent === placeholder && hiddenInput.value !== "") {
                select.querySelectorAll(".custom-option").forEach(o => o.classList.remove("selected"));
                hiddenInput.value = ""; // Reset du filtre
                hiddenInput.dispatchEvent(new Event("change")); // Recharge AJAX
                select.classList.add("open"); // Ouvre le menu
                return;
            }

            /* Si aucun cas particulier ci-dessus (pas de filtre, trigger affiche placeholder): ouverture/fermeture simplement du menu */
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

                // Retire la sélection précédente
                select.querySelectorAll(".custom-option").forEach(o => o.classList.remove("selected"));
                // Marque cette option comme sélectionnée
                option.classList.add("selected");

                // Affiche le texte choisi dans le trigger
                trigger.textContent = option.textContent.toUpperCase();

                // Réinjecte la flèche à droite 
                trigger.insertAdjacentHTML("beforeend", '<i class="fa-solid fa-angle-down"></i>');
          
                // Met à jour la valeur réelle du filtre (input caché)
                hiddenInput.value = option.dataset.value;

                // Ferme le menu
                select.classList.remove("open");
                // Déclenche l'événement "change" donc recharge AJAX
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

// Page actuelle et nombre total de pages (valeurs envoyées par PHP)
let currentOpenedPage = chargerPlusbtn ? parseInt(chargerPlusbtn.dataset.currentPage) : 1;
let maxPages = chargerPlusbtn ? parseInt(chargerPlusbtn.dataset.maxPages) : 1;
// Empêche plusieurs requêtes AJAX simultanées
let loadingAjax = false;

// Fonction pour récupérer les valeurs des filtres sélectionnés
function getFilters() {
    return {
        categorie: filterCategorie ? filterCategorie.value : "",
        format: filterFormat ? filterFormat.value : "",
        order: filterOrder ? filterOrder.value : ""
    };
}

// Fonction principale : chargement des photos via AJAX
function loadPhotos(nextPage, append = true) {
    // Empêche un double clic ou un spam de requêtes
    if (loadingAjax) return;
    // Si dépasse le nombre total de pages, stop
    if (nextPage > maxPages) return;

    loadingAjax = true;

    const filters = getFilters();

    // Préparation des données envoyées à WordPress
    const formData = new FormData();
    formData.append("action", "load_more_photos");
    formData.append("nonce", motaphotoInfinite.nonce); // Sécurité
    formData.append("page", nextPage);
    formData.append("categorie", filters.categorie);
    formData.append("format", filters.format);
    formData.append("order", filters.order);

    // ENVOI de la requête AJAX à WordPress
    fetch(motaphotoInfinite.ajax_url, {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(html => {
        // Réponse dans un conteneur temporaire
        const temp = document.createElement("div");
        temp.innerHTML = html;

        // Récupère les infos de pagination envoyées par PHP
        const meta = temp.querySelector(".ajax-meta");

        // Si la réponse AJAX contient le bloc .ajax-meta (infos de pagination)
        if (meta) {
            // Mise à jour du nombre total de pages disponibles
            maxPages = parseInt(meta.dataset.maxPages);
            // Mise à jour de la page actuellement chargée
            currentOpenedPage = parseInt(meta.dataset.currentPage);
            // Supprime le div .ajax-meta
            meta.remove();
        } else {
            console.warn("Pas de .ajax-meta dans la réponse AJAX");
            // Si le bouton existe, le cache
            if (chargerPlusbtn) chargerPlusbtn.style.display = "none";
            return;
        }

    // Si ajout ou remplacement des photos dans la grille
    if (append) {
      // append = true :  ajout des nouvelles photos à la suite dans le conteneur temporaire
      photosGrid.insertAdjacentHTML("beforeend", temp.innerHTML);
    } else {
      // append = false : remplacement du contenu (cas du changement de filtre)
      photosGrid.innerHTML = temp.innerHTML;
    }

    // Réinitialisation de la lightbox pour inclure les nouvelles photos ajoutées
    initLightbox();

    /* FADE-IN DES NOUVELLES PHOTOS */
    const newPhotos = photosGrid.querySelectorAll(".photo-block:not(.photo-already-loaded)");

    newPhotos.forEach(photo => {
        photo.classList.add("photo-already-loaded");
        photo.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        });
    });

    /* GESTION DU BOUTON CHARGER PLUS */
    if (currentOpenedPage >= maxPages) {

    const fadeOut = chargerPlusbtn.animate([
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards'
    });

    fadeOut.finished.then(() => {
        chargerPlusbtn.style.display = "none";
    });

    } else {

        // Le bouton reste visible, mais on lui applique une petite animation d'apparition
        chargerPlusbtn.style.display = "block";

        chargerPlusbtn.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards'
        });
    }
})
.finally(() => {
    loadingAjax = false;
  });
}

if (chargerPlusbtn) {
  chargerPlusbtn.addEventListener("click", () => {

    // Fade-out immédiat à chaque clic
    chargerPlusbtn.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 500,
      easing: 'ease-out',
      fill: 'forwards'
    });

    // Puis on charge la page suivante
    loadPhotos(currentOpenedPage + 1, true);
  });
}

/* RESET + RECHARGEMENT : fonction appelée quand changement d'un filtre*/
function onFilterChange() {
    loadPhotos(1, false);
}
// Quand la catégorie change = recharge la grille
if (filterCategorie) filterCategorie.addEventListener("change", onFilterChange);
// Quand le format change = recharge la grille
if (filterFormat) filterFormat.addEventListener("change", onFilterChange);
// Quand le tri change = recharge la grille
if (filterOrder) filterOrder.addEventListener("change", onFilterChange);
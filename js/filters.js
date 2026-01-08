// *** CUSTOM SELECTS ***
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".photo-block").forEach(photo => { // Sélectionne tous les éléments ayant la classe .photo-block
        photo.classList.add("photo-already-loaded"); // Sert de marqueur afin de ne pas appliquer par la suite de fade in aux images déjà chargées
    });

    document.querySelectorAll(".custom-select").forEach(select => { // Sélectionne chaque composant custom-select de la page
        const trigger = select.querySelector(".custom-select-trigger"); // Élément cliquable qui ouvre/ferme le menu
        const hiddenInput = document.getElementById(select.dataset.target); // Input caché qui stocke la valeur du filtre
        const placeholder = select.dataset.placeholder; // Texte affiché quand aucune option n’est sélectionnée

        // OUVERTURE / REINITIALISATION DU SELECT 
        trigger.addEventListener("click", (e) => {
            e.stopPropagation(); // Empêche la fermeture immédiate par le clic global sinon s'ouvrirait et se refermerait aussitôt

            // Récupère l'option actuellement sélectionnée (s'il y en a une)
            const selected = select.querySelector(".custom-option.selected");

            // * CAS 1 : si une option est déjà sélectionnée ET le trigger n'affiche pas le placeholder, si l'utilisateur reclique, on remet le placeholder (ex : "Catégorie") puis ouverture pour lui permettre nouveau choix
            if (selected && trigger.textContent !== placeholder) { // Si une option est sélectionnée et que le texte du trigger n’est pas le placeholder
                trigger.textContent = placeholder; // Remet le texte du trigger au placeholder (ex : "Catégorie")
                trigger.insertAdjacentHTML("beforeend", '<i class="fa-solid fa-angle-down"></i>'); // Réinjecte l’icône de flèche, supprimée par le textContent
                select.classList.add("open"); // Ouvre le menu
                return; // Sort de la fonction pour ne pas exécuter la suite
            }

            // * CAS 2 : le trigger affiche le placeholder MAIS un filtre est actif
            if (trigger.textContent === placeholder && hiddenInput.value !== "") { // Si le texte du trigger est le placeholder mais que l’input caché contient une valeur
                select.querySelectorAll(".custom-option").forEach(o => o.classList.remove("selected")); // Retire la classe "selected" de toutes les options pour réinitialiser l’état visuel
                hiddenInput.value = ""; // Vide la valeur du filtre dans l’input caché
                hiddenInput.dispatchEvent(new Event("change")); // Déclenche un événement "change" sur l’input pour relancer l’AJAX
                select.classList.add("open"); // Ouvre le menu
                return; // Sort de la fonction
            }

            // * CAS 3 : Si aucun cas particulier ci-dessus (pas de filtre, trigger affiche placeholder): ouverture/fermeture du menu
            select.classList.toggle("open");
        });


        // CHOIX D’UNE OPTION
        select.querySelectorAll(".custom-option").forEach(option => { // Sélectionne toutes les options du select personnalisé
            option.addEventListener("click", () => { // Ajoute un écouteur de clic sur chaque option

                select.querySelectorAll(".custom-option").forEach(o => o.classList.remove("selected")); // Retire la classe "selected" de toutes les options pour effacer la sélection précédente
                option.classList.add("selected"); // Ajoute la classe "selected" à l’option cliquée pour marquer la nouvelle sélection

                trigger.textContent = option.textContent.toUpperCase(); // Met à jour le texte du trigger avec le texte de l’option choisie, en majuscules

                trigger.insertAdjacentHTML("beforeend", '<i class="fa-solid fa-angle-down"></i>'); // Réinjecte l’icône de flèche dans le trigger
          
                hiddenInput.value = option.dataset.value; // Met à jour la valeur réelle du filtre (input caché : la valeur provient de l’attribut data-value de l’option)

                select.classList.remove("open"); // Ferme le menu
                
                hiddenInput.dispatchEvent(new Event("change")); // Déclenche l'événement "change" donc recharge AJAX
            });
        });
    });

    // FERMETURE GLOBALE DES SELECTS AU CLIC EN DEHORS
    document.addEventListener("click", (e) => { // Ajoute un écouteur de clic global sur le document
        document.querySelectorAll(".custom-select.open").forEach(select => { // Sélectionne tous les selects personnalisés actuellement ouverts
            if (!select.contains(e.target)) { // Si l’élément cliqué n’est pas à l’intérieur de ce select
                select.classList.remove("open"); // Ferme ce select
            }
        });
    });
});


// *** AJAX : CHARGEMENT DES PHOTOS ***
const chargerPlusbtn = document.getElementById("load-more-photos"); // Récupère le bouton "Charger plus" par son ID
const photosGrid = document.querySelector(".photo-grid"); // Récupère le conteneur principal de la grille de photos
const filterCategorie = document.getElementById("filter-categorie"); // Récupère l’input caché ou le champ lié au filtre de catégorie
const filterFormat = document.getElementById("filter-format"); // Récupère l’input caché ou le champ lié au filtre de format
const filterOrder = document.getElementById("sort-date"); // Récupère l’input caché ou le champ lié au tri (ordre par date)

// Page actuelle et nombre total de pages (valeurs envoyées par PHP)
let currentOpenedPage = chargerPlusbtn ? parseInt(chargerPlusbtn.dataset.currentPage) : 1; // Si le bouton existe, lecture de la page actuelle dans data-current-page, sinon met 1 par défaut
let maxPages = chargerPlusbtn ? parseInt(chargerPlusbtn.dataset.maxPages) : 1; // Si le bouton existe, lecture du nombre total de pages dans data-max-pages, sinon met 1 par défaut
let loadingAjax = false; // Indicateur booléen pour empêcher plusieurs requêtes AJAX simultanées

// Fonction pour récupérer les valeurs des filtres sélectionnés
function getFilters() {
    return { // Retourne un objet contenant les valeurs actuelles des filtres
        categorie: filterCategorie ? filterCategorie.value : "", // Si l’input de catégorie existe, renvoie sa valeur, sinon chaîne vide
        format: filterFormat ? filterFormat.value : "", // Si l’input de format existe, renvoie sa valeur, sinon chaîne vide
        order: filterOrder ? filterOrder.value : "" // Si l’input de tri existe, renvoie sa valeur, sinon chaîne vide
    };
}

// Fonction de chargement des photos via AJAX
function loadPhotos(nextPage, append = true) { // nextPage : numéro de la page à charger et append : si true, ajoute les nouvelles photos à la suite mais si false, remplace la grille
    if (loadingAjax) return; // Si une requête est déjà en cours, stop
    if (nextPage > maxPages) return; // Si dépasse le nombre total de pages, stop

    loadingAjax = true; // Passe en mode "requête en cours"

    const filters = getFilters(); // Récupère les valeurs actuelles des filtres

    // Préparation des données envoyées à WordPress
    const formData = new FormData(); // Crée un objet FormData pour envoyer les données en POST
    formData.append("action", "load_more_photos"); // Ajoute le paramètre "action" pour que WP appelle la fonction associée à l'action load_more_photos
    formData.append("nonce", motaphotoInfinite.nonce); // Ajoute le nonce de sécurité généré côté PHP pour vérifier l’authenticité de la requête
    formData.append("page", nextPage); // Ajoute le numéro de page à charger
    formData.append("categorie", filters.categorie); // Ajoute la valeur du filtre de catégorie
    formData.append("format", filters.format); // Ajoute la valeur du filtre de format
    formData.append("order", filters.order); // Ajoute la valeur du tri (ordre)

    // ** ENVOI de la requête AJAX à WordPress
    fetch(motaphotoInfinite.ajax_url, { // Envoie la requête à l’URL AJAX de WordPress
        method: "POST", // Utilise la méthode POST
        body: formData // Envoie les données préparées dans formData
    })
    .then(res => res.text()) // Quand la réponse arrive, la convertit en texte (HTML)
    .then(html => { // Callback exécuté avec le HTML renvoyé par le serveur
        // Réponse dans un conteneur temporaire
        const temp = document.createElement("div"); // Crée un élément div temporaire
        temp.innerHTML = html; // Injecte le HTML de la réponse dans ce conteneur temporaire
        const meta = temp.querySelector(".ajax-meta"); // Récupère les infos de pagination envoyées par PHP

        if (meta) { // Si .ajax-meta est présent dans la réponse
            maxPages = parseInt(meta.dataset.maxPages); // Mise à jour du nombre total de pages disponibles
            currentOpenedPage = parseInt(meta.dataset.currentPage); // Mise à jour de la page actuellement chargée
            meta.remove(); // Supprime le div .ajax-meta
        } else {
            console.warn("Pas de .ajax-meta dans la réponse AJAX");
            // Si le bouton existe, le cache
            if (chargerPlusbtn) chargerPlusbtn.style.display = "none";
            return;
        }

    // Si ajout ou remplacement des photos dans la grille
    if (append) {
        // append = true : ajout des nouvelles photos à la suite dans le conteneur temporaire
        photosGrid.insertAdjacentHTML("beforeend", temp.innerHTML);
    } else {
        // append = false : remplacement du contenu (cas du changement de filtre)
        photosGrid.innerHTML = temp.innerHTML;
    }

    // Réinitialisation de la lightbox pour inclure les nouvelles photos ajoutées
    initLightbox();

    // FADE-IN DES NOUVELLES PHOTOS
    const newPhotos = photosGrid.querySelectorAll(".photo-block:not(.photo-already-loaded)"); // Sélectionne toutes les photos qui n’ont pas encore la classe .photo-already-loaded = les nouvelles ajoutées par la requête

    newPhotos.forEach(photo => {
        // Marque la photo comme déjà animée pour éviter de réappliquer le fade-in plus tard
        photo.classList.add("photo-already-loaded");
        // Animation d’apparition progressive (fade-in)
        photo.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards' // Conservation de l’état final (opacity: 1)
        });
    });

    /* GESTION DU BOUTON CHARGER PLUS */
    if (currentOpenedPage >= maxPages) { // Si la page acutelle ouverte est supérieure ou égale au nombre de pages maxi
    const fadeOut = chargerPlusbtn.animate([
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards'
    });

    fadeOut.finished.then(() => { // Alors une fois l'animation de fade out terminée, cache bouton
        chargerPlusbtn.style.display = "none";
    });

    } else {
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
    loadingAjax = false; // Pour libérer possibilité de refaire requête AJAX
  });
}

if (chargerPlusbtn) { // Si le bouton Charger Plus existe
  chargerPlusbtn.addEventListener("click", () => { // Quand clic

    // Animation fade out à chaque clic
    chargerPlusbtn.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 500,
      easing: 'ease-out',
      fill: 'forwards'
    });

    // Et chargement de la page suivante
    loadPhotos(currentOpenedPage + 1, true);
  });
}

// RESET + RECHARGEMENT : fonction appelée quand changement d'un filtre
function onFilterChange() {
    photosGrid.innerHTML = ""; // Vide la grille
    loadPhotos(1, false); // La grille depuis la page 1 avec les filtres rechargée (et non ajoutée)
}

// Quand la catégorie change = recharge la grille
if (filterCategorie) filterCategorie.addEventListener("change", onFilterChange);
// Quand le format change = recharge la grille
if (filterFormat) filterFormat.addEventListener("change", onFilterChange);
// Quand le tri change = recharge la grille
if (filterOrder) filterOrder.addEventListener("change", onFilterChange);
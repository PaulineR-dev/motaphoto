document.addEventListener('DOMContentLoaded', function () {

    // Sélection des éléments principaux de la lightbox
    const lightbox = document.getElementById('lightbox');
    const imageLightbox = document.querySelector('.lightbox__image');
    const refLightbox = document.querySelector('.lightbox__ref');
    const catLightbox = document.querySelector('.lightbox__cat');
    const closeBtnLightbox = document.querySelector('.lightbox__close');
    const prevBtnLightbox = document.querySelector('.lightbox__prev');
    const nextBtnLightbox = document.querySelector('.lightbox__next');

    // Tableau contenant toutes les photos
    let photosLightbox = [];
    let currentIndexLightbox = 0; // Index de la photo affichée actuellement dans le tableau

    // Sélectionne toutes les icônes fullscreen présentes dans la page -> en cours de MODIFICATION CAR DOIT ETRE PAR RAPPORT AUX CATEGORIES
    document.querySelectorAll('.icon-fullscreen').forEach((icon, index) => {

        // Ajout de chaque photo dans le tableau avec son URL, sa ref et sa catégorie
        photosLightbox.push({
            url: icon.dataset.image, // data-image=""
            ref: icon.dataset.ref, // data-ref=""
            cat: icon.dataset.cat // data-cat=""
        });

        // Clic sur l'event fullscreen pour ouvrir la lightbox
        icon.addEventListener('click', function (event) {
            event.preventDefault();
            openLightbox(index); 
        });
    });

    // Fonction d'ouverture de la lightbox et affichage de l'index de la photo ouverte
    function openLightbox(index) {
        currentIndexLightbox = index; 

        imageLightbox.src = photosLightbox[index].url; 
        refLightbox.textContent = "Référence : " + photosLightbox[index].ref;
        catLightbox.textContent = "Catégorie : " + photosLightbox[index].cat;

        lightbox.classList.remove('hidden'); // Pour en css, est retiré display: none
    }

    // Navigation vers la photo précédente
    prevBtnLightbox.addEventListener('click', () => {
        // Tant que pas à la première image (index > 0)
        if (currentIndexLightbox > 0) {
            // Alors ouverture de la photo précédente
            openLightbox(currentIndexLightbox - 1);
        }
    });

    // Navigation vers la photo suivante
    nextBtnLightbox.addEventListener('click', () => {
        // Tant que pas à la dernière photo
        if (currentIndexLightbox < photosLightbox.length - 1) {
            // Alors ouverture de la photo suivante
            openLightbox(currentIndexLightbox + 1);
        }
    });

    // Fermeture via la croix
    closeBtnLightbox.addEventListener('click', () => {
        // Remet la classe css hidden donc display: none
        lightbox.classList.add('hidden');
    });

});

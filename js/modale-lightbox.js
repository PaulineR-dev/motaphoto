// QUAND LA PAGE EST CHARGEE
document.addEventListener('DOMContentLoaded', function () {
    // RECUPERATION ELEMENTS DE LA LIGHTBOX
    const lightbox = document.getElementById('lightbox');
    const imageLightbox = document.querySelector('.lightbox__image');
    const refLightbox = document.querySelector('.lightbox__ref');
    const catLightbox = document.querySelector('.lightbox__cat');
    const closeBtnLightbox = document.querySelector('.lightbox__close');
    const prevBtnLightbox = document.querySelector('.lightbox__prev');
    const nextBtnLightbox = document.querySelector('.lightbox__next');

    // SI PAS SUR LA PAGE D'ACCUEIL
    if (!document.body.classList.contains('home')) { 
        // Cache les flèches sur les côtés
        prevBtnLightbox.style.display = 'none'; 
        nextBtnLightbox.style.display = 'none'; 

        // Décakllage de la croix en haut à droite de l'image
        closeBtnLightbox.style.top = "-5px";
        closeBtnLightbox.style.right = "-65px";
    }

    // TABLEAU DES PHOTOS
    let photosLightbox = [];
    let currentIndexLightbox = 0; // Index de la photo affichée actuellement dans le tableau

    // FONCTION D'INITIALISATION DE LA LIGHTBOX AVEC RECUPERATION DE TOUS LES ICONES FULLSCREEN DE LA PAGE POUR EVITER ABSENCE DE FONCTIONNEMENT AU CLIC
    window.initLightbox = function () {
    // Vide le tableau qui va contenir toutes les images du lightbox
    photosLightbox = [];

    // Trouve toutes les icônes fullscreen dans la page
    document.querySelectorAll('.icon-fullscreen').forEach((icon, index) => {

        // Ajout dans le tableau les infos de chaque image
        photosLightbox.push({
            url: icon.dataset.image, // URL de l’image
            ref: icon.dataset.ref,   // Référence
            cat: icon.dataset.cat    // Catégorie
        });

        // Quand clic sur l'icône
        icon.addEventListener('click', function (event) {

            event.preventDefault(); // empêche le clic normal

            // Ouverture de la lightbox sur cette image
            openLightbox(index);
        });
    });
}

    // FONCTION d'ouverture de la lightbox et affichage de l'index de la photo ouverte
    function openLightbox(index) {
        currentIndexLightbox = index; // Pour savoir quelle image on affiche
        // Mise à jour de l'image, référence et catégorie
        imageLightbox.src = photosLightbox[index].url; 
        refLightbox.textContent = photosLightbox[index].ref;
        catLightbox.textContent = photosLightbox[index].cat;

        lightbox.classList.remove('hidden'); // Pour qu'en css, soit retiré le display: none, et donc affichage lightbox
    }

    // NAVIGATION
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

    // FERMETURE VIA LA CROIX
    closeBtnLightbox.addEventListener('click', () => {
        // Remet la classe en css hidden donc display: none
        lightbox.classList.add('hidden');
    });

    // LANCEMENT DE L'INITIALISATION AU CHARGEMENT
    initLightbox();
});

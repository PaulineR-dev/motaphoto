const lightbox = document.getElementById('lightbox');
const img = document.querySelector('.lightbox__image');
const ref = document.querySelector('.lightbox__ref');
const cat = document.querySelector('.lightbox__cat');

let photos = [];
let currentIndex = 0;

// Récupération des données depuis les icônes fullscreen
document.querySelectorAll('.icon-fullscreen').forEach((icon, index) => {

    photos.push({
        url: icon.dataset.image,
        ref: icon.dataset.ref,
        cat: icon.dataset.cat
    });

    icon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        openLightbox(index);
    });
});

function openLightbox(index) {
    currentIndex = index;

    img.src = photos[index].url;
    ref.textContent = "Référence : " + photos[index].ref;
    cat.textContent = "Catégorie : " + photos[index].cat;

    lightbox.classList.remove('hidden');
}

// Navigation
document.querySelector('.lightbox__prev').addEventListener('click', () => {
    if (currentIndex > 0) openLightbox(currentIndex - 1);
});

document.querySelector('.lightbox__next').addEventListener('click', () => {
    if (currentIndex < photos.length - 1) openLightbox(currentIndex + 1);
});

// Fermeture
document.querySelector('.lightbox__close').addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

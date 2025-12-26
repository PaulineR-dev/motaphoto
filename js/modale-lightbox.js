console.log('modale-lightbox.js chargé'); // Vérifie que le script est bien chargé

class Lightbox {
  constructor(selector) {
    console.log('Lightbox: constructeur appelé avec selector =', selector);

    this.element = document.querySelector(selector);
    console.log('Lightbox: element trouvé =', this.element);

    this.inner = this.element.querySelector('.lightbox__inner');
    console.log('Lightbox: inner trouvé =', this.inner);

    this.closeBtn = this.element.querySelector('.lightbox__close');
    console.log('Lightbox: closeBtn trouvé =', this.closeBtn);

    this.close = this.close.bind(this);

    this.closeBtn.addEventListener('click', () => {
      console.log('Lightbox: bouton fermer cliqué');
      this.close();
    });

    this.element.addEventListener('click', (e) => {
      console.log('Lightbox: clic sur l’overlay', e.target);
      if (e.target === this.element) {
        console.log('Lightbox: fermeture via overlay');
        this.close();
      }
    });
  }

  open(content) {
    console.log('Lightbox: open() appelé avec content =', content);

    this.inner.innerHTML = content;
    console.log('Lightbox: contenu injecté');

    this.element.classList.remove('hidden');
    this.element.classList.add('is-open');
    console.log('Lightbox: classes appliquées (is-open)');
  }

  close() {
    console.log('Lightbox: close() appelé');

    this.element.classList.remove('is-open');
    this.element.classList.add('hidden');
    console.log('Lightbox: classes appliquées (hidden)');

    this.inner.innerHTML = '';
    console.log('Lightbox: contenu vidé');
  }
}

console.log('Instanciation de la lightbox…');
const lightbox = new Lightbox('#lightbox');
console.log('Lightbox instanciée =', lightbox);

const btn = document.querySelector('#open-lightbox');
console.log('Bouton open-lightbox trouvé =', btn);

btn.addEventListener('click', () => {
  console.log('Bouton open-lightbox cliqué');
  lightbox.open('<p>test</p>');
});

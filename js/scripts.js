document.addEventListener('DOMContentLoaded', function () {
  const modale = document.getElementById('contact-modale');
  const contactLink = document.querySelector('.modale-contact');
  const menuToggle = document.querySelector('.menu-toggle'); 
  const body = document.body;

  // Vérifie si en version mobile
  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  // Fade desktop
  function fadeIn(element, duration = 200) {
    element.style.display = 'flex';
    element.style.opacity = 0;
    element.style.transform = 'none'; // Permet le reset
    let start = null;

    function animatefadeIn(ts) {
      if (!start) start = ts;
      const progress = (ts - start) / duration;
      element.style.opacity = Math.min(progress, 1);
      if (progress < 1) requestAnimationFrame(animatefadeIn);
    }
    requestAnimationFrame(animatefadeIn);
  }

  function fadeOut(element, duration = 200) {
    let start = null;

    function animatefadeOut(ts) {
      if (!start) start = ts;
      const progress = (ts - start) / duration;
      element.style.opacity = Math.max(1 - progress, 0);
      if (progress < 1) {
        requestAnimationFrame(animatefadeOut);
      } else {
        element.style.display = 'none';
        element.style.transform = 'none';
      }
    }
    requestAnimationFrame(animatefadeOut);
  }

  // Fade in et out + slide (mobile)
  function fadeSlideIn(element, duration = 200) {
    element.style.display = 'flex';
    element.style.opacity = 0;
    element.style.transform = 'translateX(100%)';
    let start = null;
    function animatefadeSlideIn(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      element.style.opacity = progress;
      element.style.transform = `translateX(${100 - 100 * progress}%)`;
      console.log(duration)

      if (progress < 1) requestAnimationFrame(animatefadeSlideIn);
    }
    requestAnimationFrame(animatefadeSlideIn);
  }

  function fadeSlideOut(element, duration = 200) {
    let start = null;
    function animatefadeSlideOut(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      element.style.opacity = 1 - progress;
      element.style.transform = `translateX(${100 * progress}%)`;
      if (progress < 1) {
        requestAnimationFrame(animatefadeSlideOut);
      } else {
        element.style.display = 'none';
        element.style.transform = 'translateX(100%)';
        element.style.opacity = 0;
      }
    }
    requestAnimationFrame(animatefadeSlideOut);
  }

  // Ouvre la modale au clic sur "Contact"
  if (contactLink && modale) {

    contactLink.addEventListener('click', function (e) {
      e.preventDefault();
      if (isMobile()) {

        fadeSlideIn(modale, 200);
        if (menuToggle) {
          // Ferme le burger instantanément sans animation
          body.classList.add('no-transition');
          menuToggle.checked = false;
          // Retire la classe juste après pour rétablir les transitions normales
          setTimeout(() => body.classList.remove('no-transition'), 50);
        }
      } else {
        fadeIn(modale, 200);
      }
    });
  }

  // Fermer en cliquant sur l’overlay
  window.addEventListener('click', function (e) {
    if (modale && e.target === modale) {
      if (isMobile()) {
        fadeSlideOut(modale, 200);
      } else {
        fadeOut(modale, 200);
      }
    }
  });
});

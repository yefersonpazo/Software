const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dot')];
const currentSlide = document.querySelector('#current-slide');
const progressBar = document.querySelector('#progress-bar');
let activeIndex = 0;

function showSlide(index) {
  activeIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) =>
    slide.classList.toggle('is-active', slideIndex === activeIndex),
  );
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === activeIndex);
    dot.setAttribute(
      'aria-current',
      dotIndex === activeIndex ? 'step' : 'false',
    );
  });
  currentSlide.textContent = String(activeIndex + 1).padStart(2, '0');
  progressBar.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;
  window.history.replaceState(null, '', `#${slides[activeIndex].id}`);
}

document
  .querySelector('#next')
  .addEventListener('click', () => showSlide(activeIndex + 1));
document
  .querySelector('#previous')
  .addEventListener('click', () => showSlide(activeIndex - 1));
document
  .querySelectorAll('[data-next]')
  .forEach((button) =>
    button.addEventListener('click', () => showSlide(activeIndex + 1)),
  );
document
  .querySelectorAll('[data-slide]')
  .forEach((button) =>
    button.addEventListener('click', () =>
      showSlide(Number(button.dataset.slide)),
    ),
  );
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === ' ')
    showSlide(activeIndex + 1);
  if (event.key === 'ArrowLeft') showSlide(activeIndex - 1);
});

const initialId = window.location.hash.slice(1);
const initialIndex = slides.findIndex((slide) => slide.id === initialId);
showSlide(initialIndex >= 0 ? initialIndex : 0);

if (window.gsap) {
  gsap.to('#wave-front', {
    duration: 7,
    attr: {
      d: 'M0,105 C250,175 470,20 730,125 C990,205 1170,25 1440,92 L1440,190 L0,190 Z',
    },
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
  gsap.to('#wave-back', {
    duration: 9,
    attr: {
      d: 'M0,105 C250,15 460,180 720,68 C980,10 1170,160 1440,85 L1440,190 L0,190 Z',
    },
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.7,
  });
}

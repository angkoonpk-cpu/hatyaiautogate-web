document.getElementById('year').textContent = new Date().getFullYear();

const heroProducts = [
  { name: 'TYPE Lynex', image: 'assets/products/lynex.png' },
  { name: 'TYPE Lynex SIM', image: 'assets/products/lynex-sim.png' },
  { name: 'ROGER H30/644', image: 'assets/products/Roger_H30644.png' },
  { name: 'DEA LIVI9/24X/M', image: 'assets/products/DEA_LIVI9_24X_M.png' },
  { name: 'BSM800', image: 'assets/products/BSM.jpg' },
  { name: 'GR', image: 'assets/products/gr-swing.png' },
  { name: 'POWERTECH PW530/530L', image: 'assets/products/PW530L.png' },
  { name: 'MAG BR500', image: 'assets/products/mag-br500.png' },
  { name: 'KTH K2', image: 'assets/products/kth-k2.jpg' },
  { name: 'K1', image: 'assets/products/K1.png' },
  { name: 'SOYAL 721H', image: 'assets/products/soyal-721h.png' },
  { name: 'HIP Ci690S', image: 'assets/products/Ci690S.png' },
  { name: 'ZKTeco EFace10', image: 'assets/products/EFace10.png' }
];

const heroSlides = document.querySelectorAll('.hero-product-slideshow .hero-photo');
const heroProductName = document.getElementById('hero-product-name');

if (heroSlides.length === 2 && heroProductName) {
  let productIndex = 0;
  let visibleSlide = 0;
  let isChanging = false;

  heroProducts.slice(1).forEach((product) => {
    const preload = new Image();
    preload.src = product.image;
  });

  const showNextProduct = () => {
    if (isChanging) return;
    isChanging = true;
    const nextProductIndex = (productIndex + 1) % heroProducts.length;
    const nextSlide = visibleSlide === 0 ? 1 : 0;
    const product = heroProducts[nextProductIndex];
    const loadedImage = new Image();

    loadedImage.onload = () => {
      heroSlides[nextSlide].src = product.image;
      heroSlides[nextSlide].alt = product.name;
      heroSlides[nextSlide].removeAttribute('aria-hidden');
      heroProductName.classList.add('is-changing');

      window.requestAnimationFrame(() => {
        heroSlides[nextSlide].classList.add('is-visible');
        heroSlides[visibleSlide].classList.remove('is-visible');
      });

      window.setTimeout(() => {
        heroProductName.textContent = product.name;
        heroProductName.classList.remove('is-changing');
        heroSlides[visibleSlide].setAttribute('aria-hidden', 'true');
        productIndex = nextProductIndex;
        visibleSlide = nextSlide;
        isChanging = false;
      }, 1000);
    };

    loadedImage.onerror = () => {
      isChanging = false;
    };

    loadedImage.src = product.image;
  };

  window.setInterval(showNextProduct, 6000);
}

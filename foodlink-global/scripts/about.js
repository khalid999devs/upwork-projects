import { SimpleCarousel } from './utils/customCarousel.js';
import {
  foodCarouselItems,
  highlights,
  honourItems,
  leadershipItems,
  metrices,
} from './contents/aboutContents.js';

class AboutPage {
  constructor() {
    this.pageTitle = 'About Us - FoodLink Global';
  }

  initEventListeners() {
    // this.ourFootPrintHandling();
  }

  initializeSliders() {
    new SimpleCarousel(
      '.conception-carousel',
      '.conception-item',

      '.conception-dots',
      null,
      null,
      {
        autoRotate: true,
        interval: 5000,
      }
    );

    // new SimpleCarousel(
    //   '.food-carousel',
    //   '.food-carousel-item',
    //   '.food-dots',
    //   null,
    //   null,
    //   {
    //     autoRotate: true,
    //     interval: 5000,
    //   }
    // );

    // new SimpleCarousel(
    //   '.infs-carousel-container',
    //   '.infs-carousel-item',
    //   '.infs-dots',
    //   null,
    //   null,
    //   {
    //     autoRotate: true,
    //     interval: 5000,
    //   }
    // );
  }

  setupPage() {
    document.title = this.pageTitle;
    this.foodCarouselSetup();
    // this.highlightsSetup();
  }

  initialize() {
    this.setupPage();
    this.initializeSliders();
    this.initEventListeners();
  }

  togglingBtns(toggleBtnsContainerSelector, callback) {
    const toggleBtnsContainer = document.querySelector(
      toggleBtnsContainerSelector
    );
    const toggleBtns = toggleBtnsContainer.querySelectorAll('.toggle-btn');
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const activeBtn =
          toggleBtnsContainer.querySelector('.toggle-btn-active');

        if (!(activeBtn.textContent === btn.textContent)) {
          if (activeBtn) {
            activeBtn.classList.remove('toggle-btn-active');
          }
          activeBtn.classList.add('toggle-btn-inactive');

          btn.classList.remove('toggle-btn-inactive');
          btn.classList.add('toggle-btn-active');

          callback(activeBtn, btn);
        }
      });
    });
  }

  ourFootPrintHandling() {
    this.togglingBtns('.toggle-btns-container', (activeBtn, currBtn) => {
      const mapCanvas = document.querySelector('.map-canvas');
      if (currBtn.dataset.target === 'india') {
        mapCanvas.querySelector('img').src =
          'images/about/Indian & global footprint/India Footprint map.png';
        mapCanvas.querySelector('img').alt = 'Indian footprint map';
        document.querySelector('.canvas-desc').textContent =
          'Pioneering the Future of Experiential Gastronomy in India';
      } else if (currBtn.dataset.target === 'global') {
        mapCanvas.querySelector('img').src =
          'images/about/Indian & global footprint/global footprint.png';
        mapCanvas.querySelector('img').alt = 'Global footprint map';
        document.querySelector('.canvas-desc').textContent =
          'Globally recognized leader in experiential gastronomy';
      }
    });
  }

  // Food carousel
  foodCarouselSetup() {
    const foodCarouselContainer = document.querySelector('.food-carousel');
    if (foodCarouselContainer) {
      foodCarouselContainer.innerHTML = foodCarouselItems
        .map(
          (item, key) => `<div
                    class="food-carousel-item carousel-card place-items-center gap-3 text-center"
                    data-id="${key}"
                    data-index="${key}"
                  >
                    <div
                      class="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center"
                    >
                      <img
                        src="${item.icon}"
                        class="w-14"
                        alt=""
                      />
                    </div>
                    <p class="text-[var(--golden)] text-xl font-semibold">
                      ${item.title} 
                    </p>
                    <p class="text-sm leading-relaxed px-3">
                      ${item.text}
                    </p>
                  </div>`
        )
        .join('');
    }
  }

  // honours cards setup
  honoursCardsSetup() {
    const honoursCardsContainer = document.querySelector('.honours-container');
    honoursCardsContainer.innerHTML = honourItems
      .map(
        (item, key) => `<div
              class="glow-shadow bg-gradient-to-t from-[var(--dark-golden)] to-[rgba(0,0,0,1)] relative flex flex-col items-start justify-center p-6 lg:pl-8 text-[var(--dark-text)] bg-opacity-90 min-h-[250px]"
              data-id="${key}"
              data-index="${key}"
            >
             ${
               key === 0
                 ? `<div
                class="news-label bg-gray-200 absolute -top-6 -left-3 z-10 px-6 py-2.5 bg-opacity-60 backdrop-blur-6"
              >
                <h2 class="text-base font-semibold tracking-wide">
                  Our Founder - Hounours
                </h2>
              </div>`
                 : ''
             }
              <h3
                class="text-2xl mt-3 mb-4 leading-tight pr-4 font-semibold -translate-y-5 text-[var(--light-text)]"
              >
                ${item.title}
              </h3>
              <div class="pl-4 w-full -translate-y-3">
                <div
                  class="p-3 py-0 pt-0 text-base leading-relaxed w-full relative text-[var(--light-text)]"
                >
                  <span
                    >${item.text}</span
                  >

                  <span
                    class="absolute h-[90%] w-[2px] bg-[var(--dark-golden)] top-1/2 -translate-y-1/2 left-0"
                  ></span>
                </div>
              </div>
            </div>`
      )
      .join('');
  }

  // leadership setup
  leadershipSetup() {
    const leadershipContainer = document.querySelector('.leadership-container');
    leadershipContainer.innerHTML = leadershipItems
      .map(
        (item, key) => `   <div
              class="flex flex-col items-center text-center bg-white shadow-md glow-shadow relative"
              data-id="${key}"
              data-index="${key}"
            >
              ${
                key === 0
                  ? `<div
                class="news-label bg-gray-200 absolute -top-8 -left-3 z-10 px-6 py-2.5 bg-opacity-60 backdrop-blur-6"
              >
                <h2 class="text-xl font-semibold tracking-wide">Leadership</h2>
              </div>`
                  : ''
              }
              <img
                src="${item.image}"
                alt="${item.title}"
                class="w-full max-h-[320px] sm:min-h-[230px] object-cover"
              />
              <div
                class="px-2 flex flex-col gap-2 w-full pt-4 pb-6 border border-1 h-full"
              >
                <p class="text-lg font-semibold text-[var(--golden)]">
                  ${item.title}
                </p>
                <p class="text-sm text-gray-900">
                  ${item.designation}
                </p>
              </div>
            </div>`
      )
      .join('');
  }

  // metrices setup
  metricesSetup() {
    const metricesContainer = document.querySelector('.metrices-container');
    metricesContainer.innerHTML = metrices
      .map(
        (item, key) => ` <div
              class="glow-shadow bg-[var(--pure-golden)] relative flex flex-col items-center justify-center p-6 lg:pl-8 text-[var(--dark-text)] bg-opacity-90 min-h-[220px]"
              data-id="${key}" 
              data-index="${key}"
            >
              ${
                key === 0
                  ? `<div
                class="news-label bg-gray-200 absolute -top-6 -left-3 z-10 px-6 py-2.5 bg-opacity-60 backdrop-blur-6"
              >
                <h2 class="text-base font-semibold tracking-wide">
                  Key Metrics Across Locations
                </h2>
              </div>`
                  : ''
              }
              <div class="w-fit -translate-x-2">
                <h3
                  class="text-2xl mt-3 mb-4 leading-tight pr-4 font-semibold -translate-y-5"
                >
                  ${item.title}
                </h3>
                <div class="pl-6 w-full -translate-y-3">
                  <div
                    class="p-3 py-0 pt-0 text-base leading-relaxed w-full relative"
                  >
                    <span>${item.text}</span>

                    <span
                      class="absolute h-[90%] w-[2px] bg-[var(--light-gray)] top-1/2 -translate-y-1/2 left-0"
                    ></span>
                  </div>
                </div>
              </div>
            </div>`
      )
      .join('');
  }

  // highlights setup
  highlightsSetup() {
    const highlightsContainer = document.querySelector('.highlights-container');
    highlightsContainer.innerHTML = highlights
      .map(
        (item, key) => ` <div
              class="flex flex-col items-center justify-center gap-1 max-w-[250px] min-w-[200px] text-center"
              data-id="${key}"
              data-index="${key}"
            >
              <div
                class="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center"
              >
                <img
                  src="${item.icon}"
                  class="w-7 h-7"
                  alt=""
                />
              </div>
              <p class="text-[var(--golden)] text-lg font-semibold">
                ${item.title}
              </p>
            </div>`
      )
      .join('');
  }
}

// Lazy loading images using Intersection Observer API
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '100px',
      }
    );

    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  const aboutPage = new AboutPage();
  aboutPage.initialize();
});

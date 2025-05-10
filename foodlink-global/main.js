import { navbarTemplate } from "./scripts/templates/nav.js";
import { footerTemplate } from "./scripts/templates/footer.js";
import Lenis from "lenis";

window.addEventListener('load', () => {
  const lenis = new Lenis({
    autoRaf: true,
  });

  // Observe layout changes and notify Lenis to recalculate
  const observer = new ResizeObserver(() => {
    lenis.resize();
  });
  observer.observe(document.body);

  // Optional: Handle scroll events
  // lenis.on('scroll', (e) => {});
});



function navBarEventsSetup(){
// Navbar scroll effect with throttling for better performance
const navbar = document.getElementById('navbar');
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
            scrollTimeout = null;
        }, 100);
    }
});

// Mobile menu toggle with animation
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');
const body = document.body;

mobileMenuButton.addEventListener('click', () => {
    // Toggle menu open state
    const isOpen = mobileMenu.classList.contains('active');

    // Update button aria attributes
    mobileMenuButton.setAttribute('aria-expanded', !isOpen);

    if (!isOpen) {
        // First remove hidden class from menu and backdrop
        mobileMenu.classList.remove('hidden');
        mobileMenuBackdrop.classList.remove('hidden');

        // Then trigger animation after a small delay
        setTimeout(() => {
            mobileMenu.classList.add('active');
            mobileMenuBackdrop.classList.add('active');
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        }, 10);
    } else {
        // First remove active class to trigger animation
        mobileMenu.classList.remove('active');
        mobileMenuBackdrop.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = ''; // Restore scrolling

        // Hide the menu after animation completes
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            mobileMenuBackdrop.classList.add('hidden');
        }, 500);
    }
});

// Close mobile menu when clicking on backdrop
mobileMenuBackdrop.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = ''; // Restore scrolling

    setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenuBackdrop.classList.add('hidden');
    }, 500);

    mobileMenuButton.setAttribute('aria-expanded', 'false');
});

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuBackdrop.classList.remove('active');
        mobileMenu.classList.add('hidden');
        mobileMenuBackdrop.classList.add('hidden');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = ''; // Restore scrolling
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
});

// mobile menu dropdowns
// Mobile menu dropdown toggle logic
(function() {
  const toggles = document.querySelectorAll('.mobile-menu-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = document.getElementById(btn.getAttribute('data-target'));
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      btn.querySelector('.chevron').style.transform = expanded ? '' : 'rotate(90deg)';
      if (target) {
        target.classList.toggle('hidden');
      }
    });
  });
})();

// nav menu active logic
(function() {
  // Helper to normalize paths (remove domain, ensure leading slash)
  function normalizePath(path) {
    if (!path) return '';
    let url;
    try {
      url = new URL(path, window.location.origin);
      return url.pathname.replace(/\/index\.html$/, '/');
    } catch {
      return path;
    }
  }
  const currentPath = normalizePath(window.location.pathname);
  // Select all mobile menu <a> links (main and submenus)
  document.querySelectorAll('.mobile-menu a').forEach(function(link) {
    const linkPath = normalizePath(link.getAttribute('href'));
    // Active if current path matches link path (or for index.html root)
    if (
      linkPath === currentPath ||
      (linkPath === '/index.html' && (currentPath === '/' || currentPath === '/index.html')) ||
      (linkPath === '/' && (currentPath === '/' || currentPath === '/index.html'))
    ) {
      link.classList.add('text-[var(--golden)]');
    } else {
      link.classList.remove('text-[var(--golden)]');
    }
  });
})();

// --- Mobile menu close button logic ---
(function() {
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileBackdrop = document.querySelector('.mobile-menu-backdrop');
  if (closeBtn && mobileMenu && mobileBackdrop) {
    closeBtn.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.add('opacity-0');
      mobileBackdrop.classList.add('hidden');
      mobileBackdrop.classList.add('opacity-0');
    });
  }
})();

// --- Dynamic Navbar Extension Slide Logic ---
const navbarExtension = document.getElementById('navbar-extension');
const navMenu = document.querySelector('.hidden.lg\\:flex.space-x-8');
// Robust hover state tracking for nav extension
let isNavItemHovered = false;
let isNavbarExtensionHovered = false;
let submenu = null;
let hideTimeout = null;

if (navbarExtension && navMenu) {
  // Find all nav items with a submenu
  const navItems = navMenu.querySelectorAll('[data-has-submenu="true"]');

  function showNavbarExtension(menuKey, navEl) {
    // Remove underline from all
    navItems.forEach(item => item.classList.remove('active-underline'));
    // Add underline to the active menu
    navEl.classList.add('active-underline');
    navbarExtension.classList.remove('pointer-events-none');
    navbarExtension.style.transition = 'height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.7s ease-in-out';
    navbarExtension.style.opacity = '1';

    // Hide all submenus, but keep the new one temporarily visible for height measurement
    const allSubmenus = document.querySelectorAll('#navbar-extension > div[id^="submenu-"]');
    submenu = document.getElementById(`submenu-${menuKey}`);
    allSubmenus.forEach(sub => {
      if (sub !== submenu) {
        sub.classList.add('hidden');
      }
    });

    // --- Height animation trick ---
    let newHeight = 0;
    if (submenu) {
      // Temporarily show submenu off-screen and hidden from pointer events for accurate measurement
      submenu.style.position = 'absolute';
      submenu.style.visibility = 'hidden';
      submenu.style.pointerEvents = 'none';
      submenu.classList.remove('hidden');
      newHeight = submenu.scrollHeight;
      // Restore styles
      submenu.style.position = '';
      submenu.style.visibility = '';
      submenu.style.pointerEvents = '';
    }
    navbarExtension.style.transition = 'height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.7s ease-in-out';
    navbarExtension.style.height = newHeight + 'px';

    // Hide all submenus immediately except the one to be shown (for measurement)
    allSubmenus.forEach(sub => {
      if (sub !== submenu) sub.classList.add('hidden');
    });
    if (submenu) submenu.classList.remove('hidden');

    // Align submenu content immediately
    if (submenu) {
      const submenuContent = submenu.querySelector('.submenu-content-align');
      if (submenuContent) {
        const navRect = navMenu.getBoundingClientRect();
        submenuContent.style.marginLeft = navRect.left + 'px';
      }
    }

    // After the transition, ensure only the active submenu is visible
    const onTransitionEnd = () => {
      allSubmenus.forEach(sub => {
        if (sub !== submenu) sub.classList.add('hidden');
        else sub.classList.remove('hidden');
      });
      navbarExtension.removeEventListener('transitionend', onTransitionEnd);
    };
    navbarExtension.addEventListener('transitionend', onTransitionEnd);
  }

  function hideNavbarExtension() {
    navItems.forEach(item => item.classList.remove('active-underline'));
    navbarExtension.style.transition = 'height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.7s ease-in-out';
    navbarExtension.style.opacity = '0.08';
    navbarExtension.style.height = '0px';
    setTimeout(() => {
      document.querySelectorAll('#navbar-extension > div[id^="submenu-"]').forEach(sub => sub.classList.add('hidden'));
      if (parseInt(navbarExtension.style.height) === 0 && parseFloat(navbarExtension.style.opacity) === 0.08) {
        navbarExtension.classList.add('pointer-events-none');
      }
    }, 500);
  }

  // Track hover state robustly
  navItems.forEach(item => {
    const menuKey = item.getAttribute('data-submenu');
    item.addEventListener('mouseover', () => {
      isNavItemHovered = true;
      if (hideTimeout) clearTimeout(hideTimeout);
      showNavbarExtension(menuKey, item);
    });
    item.addEventListener('focus', () => {
      isNavItemHovered = true;
      if (hideTimeout) clearTimeout(hideTimeout);
      showNavbarExtension(menuKey, item);
    });
    item.addEventListener('mouseout', () => {
      isNavItemHovered = false;
      scheduleHideNavbarExtension();
    });
    item.addEventListener('blur', () => {
      isNavItemHovered = false;
      scheduleHideNavbarExtension();
    });
  });

  navbarExtension.addEventListener('mouseover', () => {
    isNavbarExtensionHovered = true;
    if (hideTimeout) clearTimeout(hideTimeout);
  });
  navbarExtension.addEventListener('mouseout', () => {
    isNavbarExtensionHovered = false;
    scheduleHideNavbarExtension();
  });

  function scheduleHideNavbarExtension() {
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      if (!isNavItemHovered && !isNavbarExtensionHovered) {
        hideNavbarExtension();
      }
    }, 80);
  }
}
// --- END Dynamic Navbar Extension Slide Logic ---
}


function footerSetup() {
  // Insert footer before the first <script> tag in <body>
  const firstScript = document.body.querySelector('script');
  if (firstScript) {
    firstScript.insertAdjacentHTML('beforebegin', footerTemplate());
  } else {
    document.body.insertAdjacentHTML('beforeend', footerTemplate());
  }
}

function navBarSetup(){
    const blackNavLocs=['/disclaimer.html','/cookies-policy.html','/privacy-policy.html','/terms-conditions.html']
    
    // Inject the navbar at the top of <body>
    document.body.insertAdjacentHTML('afterbegin', navbarTemplate(blackNavLocs.includes(window.location.pathname) ? 'black' : 'white'));

    navBarEventsSetup();
}


// Lazy loading images and initialize components when DOM is ready
let componentsInitialized = false;

// Use requestIdleCallback for non-critical initialization
function initializeComponents() {
    if (componentsInitialized) return;
    componentsInitialized = true;

    // Initialize carousels and other components
    initNewsCarousel();
    initFactsRotation();
    initGalleryCarousel();
    initTextImageCarousel();
    initImageButtonSlider();
    navBarSetup();
    footerSetup();
    // initGallerySliders();
}

// Set up lazy loading with IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px' // Load images when they're 100px from viewport
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Initialize components during idle time or after 2 seconds
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => initializeComponents());
    } else {
        setTimeout(initializeComponents, 100);
    }
});

// News Carousel Functionality
function initNewsCarousel() {
    const carousel = document.querySelector('.news-carousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.news-item');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Show first slide
    items[0].classList.add('active');

    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        goToSlide(currentIndex);
    });

    // Next button click
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    });

    // Go to specific slide
    function goToSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));

        items[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Auto rotate slides every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    }, 5000);
}

// Facts Rotation Functionality
function initFactsRotation() {
    const factItems = document.querySelectorAll('.fact-item');
    if (factItems.length === 0) return;

    let currentFactIndex = 0;

    // Show first fact
    factItems[0].classList.add('active');

    // Rotate facts every 4 seconds
    setInterval(() => {
        factItems[currentFactIndex].classList.remove('active');
        currentFactIndex = (currentFactIndex + 1) % factItems.length;
        factItems[currentFactIndex].classList.add('active');
    }, 4000);
}

// Gallery Carousel Functionality
function initGalleryCarousel() {
    const carousel = document.querySelector('.gallery-carousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.gallery-item');
    const dotsContainer = document.querySelector('.gallery-dots');

    let currentIndex = 0;
    let startX, moveX, initialX;
    let isDragging = false;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // create onCLick functionality
    items.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            console.log(index);
            
        });
    })

    // Show first slide
    items[0].classList.add('active');

    // Go to specific slide
    function goToSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(dot => dot.classList.remove('active'));

        items[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Touch and mouse events for swipe functionality
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('touchmove', drag);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('touchend', dragEnd);
    carousel.addEventListener('mouseleave', dragEnd);

    function dragStart(e) {
        if (e.type !== 'touchstart') e.preventDefault();
        initialX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        startX = initialX;
        isDragging = true;
    }

    function drag(e) {
        if (!isDragging) return;
        if (e.type !== 'touchmove') e.preventDefault();
        moveX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        if (e.type !== 'touchend') e.preventDefault();
        isDragging = false;

        const diffX = initialX - moveX;
        const threshold = 50; // Minimum distance to register as a swipe

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - next slide
                currentIndex = (currentIndex + 1) % items.length;
            } else {
                // Swipe right - previous slide
                currentIndex = (currentIndex - 1 + items.length) % items.length;
            }
            goToSlide(currentIndex);
        }
    }

    // Auto rotate slides every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    }, 5000);
}

// Text-Image Carousel Functionality
function initTextImageCarousel() {
    const carousel = document.querySelector('.text-image-carousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.text-image-item');
    const dotsContainer = document.querySelector('.text-image-dots');

    let currentIndex = 0;
    let startX, moveX, initialX;
    let isDragging = false;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Show first slide
    items[0].classList.add('active');

    // Go to specific slide
    function goToSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(dot => dot.classList.remove('active'));

        items[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Touch and mouse events for swipe functionality
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('touchmove', drag);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('touchend', dragEnd);
    carousel.addEventListener('mouseleave', dragEnd);

    function dragStart(e) {
        if (e.type !== 'touchstart') e.preventDefault();
        initialX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        startX = initialX;
        isDragging = true;
    }

    function drag(e) {
        if (!isDragging) return;
        if (e.type !== 'touchmove') e.preventDefault();
        moveX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        if (e.type !== 'touchend') e.preventDefault();
        isDragging = false;

        const diffX = initialX - moveX;
        const threshold = 50; // Minimum distance to register as a swipe

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - next slide
                currentIndex = (currentIndex + 1) % items.length;
            } else {
                // Swipe right - previous slide
                currentIndex = (currentIndex - 1 + items.length) % items.length;
            }
            goToSlide(currentIndex);
        }
    }

    // Auto rotate slides every 6 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    }, 6000);
}

if (typeof Swiper !== "undefined" && document.querySelector('.timeline .swiper-container')) {
var timelineSwiper = new Swiper('.timeline .swiper-container', {
    direction: 'vertical',
    loop: false,
    speed: 1600,
    pagination: '.swiper-pagination',
    paginationBulletRender: function (swiper, index, className) {
      var year = document
        .querySelectorAll('.swiper-slide')
        [index].getAttribute('data-year');
      return '<span class="' + className + '">' + year + '</span>';
    },
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    breakpoints: {
      768: {
        direction: 'horizontal',
      },
    },
  });
}

const galleryContents=[
    {
        image:"images/Home page/gallery/bg/1.jpg",
        logo:"images/Home page/gallery/logo/1.png"
    },
    {
        image:"images/Home page/gallery/bg/2.JPG",
        logo:"images/Home page/gallery/logo/2.png"
    },
    {
        image:"images/Home page/gallery/bg/3.jpg",
        logo:"images/Home page/gallery/logo/3.png"
    },
    {
        image:"images/Home page/gallery/bg/4.JPG",
        logo:"images/Home page/gallery/logo/4.png"
    },
    {
      image:"images/Home page/gallery/bg/5.jpg",
      logo:"images/Home page/gallery/logo/4.png"
  },
  {
    image:"images/Home page/gallery/bg/6.jpeg",
    logo:"images/Home page/gallery/logo/4.png"
},
{
  image:"images/Home page/gallery/bg/7.jpg",
  logo:"images/Home page/gallery/logo/4.png"
},
{
  image:"images/Home page/gallery/bg/8.jpg",
  logo:"images/Home page/gallery/logo/4.png"
},
{
  image:"images/Home page/gallery/bg/9.jpg",
  logo:"images/Home page/gallery/logo/4.png"
},
{
  image:"images/Home page/gallery/bg/10.jpg",
  logo:"images/Home page/gallery/logo/4.png"
}
]

function setGalleryCanvas(galleryCanvas, logo, bgImage) {
    // Find the content wrapper if it exists
    let contentWrapper = galleryCanvas.querySelector('.gallery-animated-content');

    if (contentWrapper) {
        // Start fade out
        contentWrapper.classList.remove('gallery-fade-in');
        contentWrapper.classList.add('gallery-fade-out');

        // After fade-out, change content and fade in
        setTimeout(() => {
            galleryCanvas.innerHTML = `
                <div class="w-full h-full absolute top-0 left-0 gallery-bg">
                  <img src="${bgImage}" class="w-full h-full object-cover" alt="">
                </div>
                <div class="absolute w-full h-full bg-gradient-to-r from-[rgba(0,0,0,0.6)]  to-transparent inset-0"></div>
                <div class="container mx-auto px-4 relative z-20">
                <div class="gallery-animated-content z-20 max-w-[350px] w-full flex flex-col gap-4 gallery-fade">
                  <button class="px-6 py-2.5 text-[var(--dark-golden)] bg-[var(--dark-bg)] uppercase w-fit">our brands</button>
                </div>
                </div>
            `;
            // Fade in new content
            requestAnimationFrame(() => {
                const newContent = galleryCanvas.querySelector('.gallery-animated-content');
                newContent.classList.add('gallery-fade-in');
            });
        }, 400); // Should match your fade-out duration
    } else {
        // First load: just insert with fade-in
        galleryCanvas.innerHTML = `
            <div class="w-full h-full absolute top-0 left-0 gallery-bg">
              <img src="${bgImage}" class="w-full h-full object-cover" alt="">
            </div>
            <div class="absolute w-full h-full bg-gradient-to-r from-[rgba(0,0,0,0.6)]  to-transparent inset-0"></div>
            <div class="w-full container mx-auto px-4 relative z-20">
            <div class="gallery-animated-content z-20 max-w-[350px] w-full flex flex-col gap-4 gallery-fade gallery-fade-in">
              <button class="px-6 py-2.5 text-[var(--dark-golden)] bg-[var(--dark-bg)] uppercase w-fit">our brands</button>
            </div>
            </div>
        `;
    }
}

function setpImageButtonSliders(imageButtonSlider){
  imageButtonSlider.innerHTML=galleryContents.map((content,index)=>{
    return `
              <div class="image-button-item">
            <div class="image-container">
              <img
                src="${content.image}"
                alt="${content.image}"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
    `
  }).join('')
}

// Image Button Slider Functionality
function initImageButtonSlider() {
    const slider = document.querySelector('.image-button-slider');
    if (!slider) return;

    const imageButtonSlider=document.querySelector('.image-button-slider');
    setpImageButtonSliders(imageButtonSlider);

    const items = slider.querySelectorAll('.image-button-item');
    if(!items.length) return;
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev-btn');
    const nextBtn = document.querySelector('.slider-next-btn');

    // gallery-contents
    const galleryCanvas=document.querySelector('.gallery-canvas');

    let currentIndex = 0;
    let startX, moveX, initialX;
    let isDragging = false;

    if(dotsContainer){
           // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToItem(index));
        dotsContainer.appendChild(dot);
    });
    }
    
    // // set gallery canvas onClick
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            // console.log('index', index);
            
            setGalleryCanvas(galleryCanvas, galleryContents[index].logo, galleryContents[index].image);
        });
    });
    
 

    // Scroll to specific item
    function scrollToItem(index) {
        const itemWidth = items[0].offsetWidth;
        const gap = 24; // 1.5rem gap in pixels
        const scrollPosition = index * (itemWidth + gap);

        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        // updateActiveDot(index);
        currentIndex = index;
    }

    if(dotsContainer){
            // Update active dot
    function updateActiveDot(index) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }
    }


    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        scrollToItem(currentIndex);
        
        
    });

    // Next button click
    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(items.length - 1, currentIndex + 1);
        scrollToItem(currentIndex);

     
        
    });

    // Touch and mouse events for dragging
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('touchstart', dragStart, { passive: true });
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag, { passive: true });
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('touchend', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);

    function dragStart(e) {
        isDragging = true;
        initialX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        startX = slider.scrollLeft;
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        moveX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const x = moveX - initialX;
        slider.scrollLeft = startX - x;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;

        // Determine which item is closest to the scroll position
        const itemWidth = items[0].offsetWidth;
        const gap = 24; // 1.5rem gap in pixels
        const scrollPosition = slider.scrollLeft;
        const newIndex = Math.round(scrollPosition / (itemWidth + gap));

        currentIndex = Math.max(0, Math.min(items.length - 1, newIndex));
        scrollToItem(currentIndex);
    }

    // Handle scroll events to update active dot
    slider.addEventListener('scroll', () => {
        if (isDragging) return; // Don't update during drag

        const itemWidth = items[0].offsetWidth;
        const gap = 24; // 1.5rem gap in pixels
        const scrollPosition = slider.scrollLeft;
        const newIndex = Math.round(scrollPosition / (itemWidth + gap));

        if (newIndex !== currentIndex) {
            currentIndex = Math.max(0, Math.min(items.length - 1, newIndex));
            // updateActiveDot(currentIndex);
        }
    });
}

// Initialize Gallery Sliders
// Gallery Hero Slider with Thumbs
// function initGalleryHeroSlider() {
//     const thumbs = new Swiper('.gallery-hero-thumbs', {
//       spaceBetween: 12,
//       slidesPerView: 'auto',
//       freeMode: true,
//       watchSlidesProgress: true,
//       watchOverflow: true,
//       breakpoints: {
//         320: { slidesPerView: 2 },
//         600: { slidesPerView: 3 },
//         900: { slidesPerView: 4 }
//       }
//     });
  
//     const main = new Swiper('.gallery-hero-slider', {
//       spaceBetween: 0,
//       slidesPerView: 1,
//       effect: 'fade',
//       fadeEffect: { crossFade: true },
//       navigation: {
//         nextEl: '.gallery-hero-arrow.swiper-button-next',
//         prevEl: '.gallery-hero-arrow.swiper-button-prev',
//       },
//       thumbs: { swiper: thumbs },
//       loop: true,
//     });
//   }
  
//   // Call this function in your main initialization
//   document.addEventListener('DOMContentLoaded', function() {
//     initGalleryHeroSlider();
//   });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        // Close mobile menu if it's open when clicking a link
        if (mobileMenu.classList.contains('active') && window.innerWidth < 1024) {
            mobileMenu.classList.remove('active');
            mobileMenuBackdrop.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = ''; // Restore scrolling

            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenuBackdrop.classList.add('hidden');
            }, 500);

            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
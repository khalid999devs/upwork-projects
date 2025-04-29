import { SimpleCarousel } from "./utils/customCarousel.js";

class ContactPage {
  constructor() {
    this.pageTitle = 'Contact Us - FoodLink Global';
  }

  setupPage() {
    document.title = this.pageTitle;
  }

  initializeSliders() {
    new SimpleCarousel(
      '.head-office-carousel',
      '.head-office-carousel-item',
      '.head-office-dots',
      null,
      null,
      {
        autoRotate: true,
        interval: 5000,
      }
    );
  }

  initEventListeners() {
    const form = document.querySelector('.contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const phone = form.querySelector('[name="phone"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();
        const subject = form.querySelector('[name="subject"]').value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }

        const phoneRegex = /^[+]?\d{10,15}$/;
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        if (phone && !phoneRegex.test(cleanPhone)) {
          alert('Please enter a valid phone number (10-15 digits, numbers only).');
          return;
        }

        const formData = {
          name,
          email,
          phone: cleanPhone,
          subject,
          message
        };
        
        console.log('Form Data:', formData);
        alert('Thank you for contacting us!');
        form.reset();
      });
    }
  }

  initialize() {
    this.setupPage();
    this.initializeSliders();
    this.initEventListeners();
  }
}


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

  const contactPage = new ContactPage();
  contactPage.initialize();
});

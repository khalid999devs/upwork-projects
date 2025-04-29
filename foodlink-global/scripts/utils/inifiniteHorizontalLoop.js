class InfiniteHorizontalLoop {
  constructor(containerClass, itemClass, speed = 30, direction = 'forward') {
    this.container = document.querySelector(containerClass);
    this.itemClass = itemClass;
    this.speed = speed;
    this.track = null;
    this.animation = null;
    this.resizeObserver = null;
    this.direction = direction === 'reverse' ? 'reverse' : 'forward';
    this.init();
  }

  init() {
    if (!this.container) return;
    // Remove previous track if exists
    if (this.track) this.track.remove();

    // Create track div
    this.track = document.createElement('div');
    this.track.className = 'infinite-track flex flex-row gap-10 w-max';
    // Move all items into track
    const items = Array.from(this.container.querySelectorAll(this.itemClass));
    items.forEach(item => this.track.appendChild(item));
    // Duplicate for seamless scroll
    items.forEach(item => this.track.appendChild(item.cloneNode(true)));
    // Empty container and append track
    this.container.innerHTML = '';
    this.container.appendChild(this.track);

    // Wait for images to load
    const images = this.track.querySelectorAll('img');
    let loaded = 0;
    const onImgLoad = () => {
      loaded++;
      if (loaded === images.length) this.startAnimation();
    };
    if (images.length) {
      images.forEach(img => {
        if (img.complete) {
          loaded++;
        } else {
          img.onload = onImgLoad;
          img.onerror = onImgLoad;
        }
      });
      if (loaded === images.length) this.startAnimation();
    } else {
      this.startAnimation();
    }
  }

  startAnimation() {
    if (this.animation) this.animation.kill();
    const items = Array.from(this.track.querySelectorAll(this.itemClass));
    const originalWidth = items.slice(0, items.length / 2).reduce((acc, item) => acc + item.offsetWidth, 0);
    this.track.style.transform = 'translateX(0px)';
    const xValue = this.direction === 'reverse' ? originalWidth : -originalWidth;
    this.animation = gsap.to(this.track, {
      x: xValue,
      duration: this.speed,
      ease: 'none',
      repeat: -1,
    });
    this.track.addEventListener('mouseenter', () => this.animation.pause());
    this.track.addEventListener('mouseleave', () => this.animation.resume());
    // Responsive
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.resizeObserver = new ResizeObserver(() => {
      const newWidth = items.slice(0, items.length / 2).reduce((acc, item) => acc + item.offsetWidth, 0);
      const newXValue = this.direction === 'reverse' ? newWidth : -newWidth;
      this.animation.vars.x = newXValue;
      this.animation.invalidate();
      this.animation.restart();
    });
    this.resizeObserver.observe(this.track);
  }
}

export default InfiniteHorizontalLoop;
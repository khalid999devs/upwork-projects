export class SimpleCarousel {
  constructor(
    containerSelector,
    itemSelector,
    dotsSelector,
    prevBtnSelector,
    nextBtnSelector,
    options = {}
  ) {
    this.container = document.querySelector(containerSelector);
    this.items = this.container.querySelectorAll(itemSelector);
    this.dotsContainer = document.querySelector(dotsSelector);
    if (prevBtnSelector) this.prevBtn = document.querySelector(prevBtnSelector);
    if (nextBtnSelector) this.nextBtn = document.querySelector(nextBtnSelector);
    this.currentIndex = 0;

    this.autoRotate = options.autoRotate ?? true;
    this.intervalTime = options.interval ?? 5000;
    this.intervalId = null;

    if (!this.container || this.items.length === 0) return;

    this.setup();
  }

  setup() {
    this.items.forEach((item, index) => {
      item.classList.add('fade-transition');
      if (index === 0) item.classList.add('active');

      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });

    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    if (this.autoRotate) {
      this.startAutoRotate();

      this.container.addEventListener('mouseenter', () =>
        this.stopAutoRotate()
      );

      this.container.addEventListener('mouseleave', () =>
        this.startAutoRotate()
      );
    }
  }

  goToSlide(index) {
    this.items[this.currentIndex].classList.remove('active');
    this.dotsContainer.children[this.currentIndex].classList.remove('active');

    this.items[index].classList.add('active');
    this.dotsContainer.children[index].classList.add('active');

    this.currentIndex = index;
  }

  prev() {
    const newIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.goToSlide(newIndex);
  }

  next() {
    const newIndex = (this.currentIndex + 1) % this.items.length;
    this.goToSlide(newIndex);
  }

  startAutoRotate() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.next(), this.intervalTime);
  }

  stopAutoRotate() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

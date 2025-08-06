/**
 * creates an image carousel inside the specified container
 * @param {Object} options - configuration options
 * @param {HTMLElement} options.container - the root element for the carousel
 * @param {string[]} options.images - array of image URLs
 * @param {number} [options.visibleCount=5] - number of images visible at once
 * @param {HTMLElement} [options.selectorsContainer] - element for selector circles (optional)
 * @param {function} [options.onNext] - callback after next image is shown
 * @param {function} [options.onPrev] - callback after previous image is shown
 * @param {number} [options.autoAdvanceMs=5000] - milliseconds between auto-advances
 */
export function createImageCarousel({
  container,
  images,
  visibleCount = 5,
  selectorsContainer,
  onNext,
  onPrev,
  autoAdvanceMs = 5000,
}) {
  let centerIndex = Math.floor(images.length / 2);
  let autoAdvance;

  function renderCarousel() {
    const carousel = container.querySelector(".carousel");
    carousel.innerHTML = "";

    const half = Math.floor(visibleCount / 2);
    for (let offset = -half; offset <= half; offset++) {
      let imgIndex = (centerIndex + offset + images.length) % images.length;
      const img = document.createElement("img");
      img.src = images[imgIndex];
      img.className = "carousel-item";
      if (offset === 0) img.classList.add("active");
      img.alt = `Image ${imgIndex + 1}`;
      carousel.appendChild(img);
    }

    if (selectorsContainer) {
      selectorsContainer.querySelectorAll(".circle").forEach((circle, idx) => {
        circle.classList.toggle("active", idx === centerIndex);
      });
    }
  }

  function renderSelectors() {
    if (!selectorsContainer) return;
    selectorsContainer.innerHTML = "";
    images.forEach((_, idx) => {
      const circle = document.createElement("div");
      circle.className = "circle";
      if (idx === centerIndex) circle.classList.add("active");
      circle.addEventListener("click", () => {
        centerIndex = idx;
        renderCarousel();
        renderSelectors();
        resetAutoAdvance();
      });
      selectorsContainer.appendChild(circle);
    });
  }

  function nextImage() {
    centerIndex = (centerIndex + 1) % images.length;
    renderCarousel();
    renderSelectors();
    if (onNext) onNext(centerIndex);
  }

  function prevImage() {
    centerIndex = (centerIndex - 1 + images.length) % images.length;
    renderCarousel();
    renderSelectors();
    if (onPrev) onPrev(centerIndex);
  }

  function resetAutoAdvance() {
    clearInterval(autoAdvance);
    autoAdvance = setInterval(nextImage, autoAdvanceMs);
  }

  const api = {
    next: () => {
      nextImage();
      resetAutoAdvance();
    },
    prev: () => {
      prevImage();
      resetAutoAdvance();
    },
    goTo: (idx) => {
      centerIndex = idx;
      renderCarousel();
      renderSelectors();
      resetAutoAdvance();
    },
    destroy: () => clearInterval(autoAdvance),
  };

  container.addEventListener("mouseenter", () => clearInterval(autoAdvance));
  container.addEventListener("mouseleave", resetAutoAdvance);

  renderCarousel();
  renderSelectors();
  resetAutoAdvance();

  return api;
}

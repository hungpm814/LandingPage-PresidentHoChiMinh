/**
 * Custom Carousel Background Change with Smooth Fade Effect
 * Handles background transitions for the 1945-1969 period carousel
 */
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("periodCarousel2");
  const section = document.getElementById("section_5b");

  if (carousel && section) {
    carousel.addEventListener("slide.bs.carousel", function (event) {
      // Add fade-out class
      section.classList.add("bg-transitioning");

      // Wait for fade out, then change background
      setTimeout(function () {
        // Remove all background classes
        section.classList.remove(
          "bg-slide-0",
          "bg-slide-1",
          "bg-slide-2",
          "bg-slide-3",
          "bg-slide-4"
        );

        // Add the new background class based on the active slide
        section.classList.add("bg-slide-" + event.to);

        // Remove transitioning class to fade back in
        setTimeout(function () {
          section.classList.remove("bg-transitioning");
        }, 50);
      }, 300);
    });
  }

  // Show scrollbar when actively scrolling
  const scrollElements = document.querySelectorAll(
    "#periodCarousel .card-body, #periodCarousel2 .card-text"
  );
  let scrollTimeout;

  scrollElements.forEach(function (element) {
    element.addEventListener("scroll", function () {
      // Add class to show scrollbar while scrolling
      this.classList.add("is-scrolling");

      // Clear previous timeout
      clearTimeout(scrollTimeout);

      // Hide scrollbar after scrolling stops (1 second)
      scrollTimeout = setTimeout(() => {
        this.classList.remove("is-scrolling");
      }, 1000);
    });
  });

  // Make entire column clickable for carousel navigation
  const carouselControlColumns = document.querySelectorAll(
    ".carousel-control-column"
  );

  carouselControlColumns.forEach(function (column) {
    column.addEventListener("click", function () {
      const target = this.getAttribute("data-bs-target");
      const action = this.getAttribute("data-bs-slide");

      if (target && action) {
        const carousel = document.querySelector(target);
        if (carousel) {
          const bsCarousel =
            bootstrap.Carousel.getInstance(carousel) ||
            new bootstrap.Carousel(carousel);
          if (action === "prev") {
            bsCarousel.prev();
          } else if (action === "next") {
            bsCarousel.next();
          }
        }
      }
    });
  });
});

const reviewSwiper = new Swiper(".review-swiper", {
    // Enable responsive breakpoints
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // Mobile
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      // Tablet
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // Desktop
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      // Large Desktop
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
  });

  // Function to update star ratings based on percentage
  function updateStarRating(starContainer, rating) {
    const stars = starContainer.querySelectorAll(".rh-review-star");
    const totalStars = stars.length;

    stars.forEach((star, index) => {
      const svg = star.querySelector("svg");
      const path = svg.querySelector("path");

      // Calculate how much of this star should be filled
      const starValue = index + 1;
      let fillPercentage = 0;

      if (rating >= starValue) {
        // Full star
        fillPercentage = 100;
      } else if (rating > index) {
        // Partial star
        fillPercentage = (rating - index) * 100;
      }

      // Apply the fill percentage using CSS clip-path
      if (fillPercentage === 100) {
        path.classList.add("star-fill");
        path.classList.remove("star-outline");
      } else if (fillPercentage > 0) {
        // For partial stars, we'll use a gradient or clip-path approach
        path.style.fill = `url(#star-gradient-${index})`;
        // Create a linear gradient for partial fill
        const defs =
          svg.querySelector("defs") ||
          svg.appendChild(
            document.createElementNS("http://www.w3.org/2000/svg", "defs")
          );
        const gradient = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "linearGradient"
        );
        gradient.id = `star-gradient-${index}`;
        gradient.innerHTML = `
                  <stop offset="0%" stop-color="#05CE78"/>
                  <stop offset="${fillPercentage}%" stop-color="#05CE78"/>
                  <stop offset="${fillPercentage}%" stop-color="#E5E7EB"/>
                  <stop offset="100%" stop-color="#E5E7EB"/>
              `;
        defs.appendChild(gradient);
      } else {
        path.classList.add("star-outline");
        path.classList.remove("star-fill");
      }
    });
  }

  // Initialize star ratings on page load
  document.addEventListener("DOMContentLoaded", function () {
    const starContainers = document.querySelectorAll(".rh-review-stars");

    starContainers.forEach((container) => {
      const rating = parseFloat(container.getAttribute("data-rating"));
      if (rating) {
        updateStarRating(container, rating);
      }
    });
  });

  // Function to update rating dynamically (can be called from anywhere)
  function setRating(containerSelector, newRating) {
    const container = document.querySelector(containerSelector);
    if (container) {
      container.setAttribute("data-rating", newRating);
      updateStarRating(container, newRating);
    }
  }
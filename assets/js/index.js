document.addEventListener("DOMContentLoaded", function () {
  // Respect system dark mode preference if enabled
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!document.body.classList.contains("dark")) {
      document.body.classList.add("dark");
    }
  }

  // Scroll Progress Bar Update
  const progressBar = document.getElementById("scroll-progress-bar");
  window.addEventListener("scroll", function () {
    if (progressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + "%";
    }
  });

  // Reveal elements on scroll using IntersectionObserver
  const sectionsAndCards = document.querySelectorAll(".container, .layout, .intro-container");
  sectionsAndCards.forEach(function (el) {
    el.classList.add("reveal-on-scroll");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    sectionsAndCards.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    sectionsAndCards.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
});

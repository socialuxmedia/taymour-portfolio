(() => {
  "use strict";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionToggle = document.querySelector(".motion-toggle");
  const motionLabel = motionToggle.querySelector("span");
  const motionIcon = motionToggle.querySelector("use");
  let manuallyPaused = false;

  function syncMotion() {
    const paused = manuallyPaused || reducedMotion.matches;
    document.body.classList.toggle("motion-paused", paused);
    document.body.classList.toggle("js-motion", !reducedMotion.matches);
    motionToggle.setAttribute("aria-pressed", String(paused));
    motionToggle.setAttribute(
      "aria-label",
      paused ? "Resume animation" : "Pause animation",
    );
    motionLabel.textContent = paused ? "Play motion" : "Pause motion";
    motionIcon.setAttribute("href", paused ? "#icon-play" : "#icon-pause");
  }
  motionToggle.addEventListener("click", () => {
    manuallyPaused = !manuallyPaused;
    syncMotion();
  });
  reducedMotion.addEventListener("change", syncMotion);

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    revealElements.forEach((element) => revealObserver.observe(element));
    syncMotion();
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const cards = [...document.querySelectorAll(".stack-card")];
  const clipButtons = [...document.querySelectorAll("[data-select-project]")];
  const stageStatus = document.querySelector(".stage-status");
  function selectProject(id) {
    const selectedIndex = cards.findIndex(
      (card) => card.dataset.project === id,
    );
    if (selectedIndex < 0) return;
    cards.forEach((card, index) => {
      const selected = index === selectedIndex;
      const side = (index - selectedIndex + cards.length) % cards.length;
      card.classList.toggle("is-front", selected);
      card.dataset.position = selected
        ? "center"
        : side === 1
          ? "right"
          : "left";
    });
    clipButtons.forEach((button) => {
      const selected = button.dataset.selectProject === id;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    stageStatus.textContent = cards[selectedIndex].dataset.title;
  }
  clipButtons.forEach((button) =>
    button.addEventListener("click", () =>
      selectProject(button.dataset.selectProject),
    ),
  );

  const dialog = document.querySelector(".reel-dialog");
  const frame = dialog.querySelector("iframe");
  const loading = dialog.querySelector(".embed-loading");
  const original = dialog.querySelector(".dialog-original");
  const title = dialog.querySelector("h2");
  let previousFocus = null;
  let loadTimer;

  // Progressive enhancement: without dialog support or JavaScript, real links still work.
  if (typeof dialog.showModal === "function") {
    document.querySelectorAll("[data-open-project]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        )
          return;
        const id = link.dataset.openProject;
        if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
        event.preventDefault();
        previousFocus = link;
        title.textContent = link.dataset.title;
        original.href = link.href;
        frame.title = `${link.dataset.title} — Instagram reel`;
        loading.hidden = false;
        loading.textContent = "Opening Instagram player…";
        frame.src = `https://www.instagram.com/reel/${id}/embed/`;
        dialog.showModal();
        document.body.classList.add("modal-open");
        clearTimeout(loadTimer);
        loadTimer = setTimeout(() => {
          loading.textContent =
            "Taking a while? Use “Open on Instagram” below.";
        }, 9000);
      });
    });
    frame.addEventListener("load", () => {
      // This is transport completion, not proof that Instagram allowed playback.
      clearTimeout(loadTimer);
      loading.hidden = true;
    });
    dialog
      .querySelector(".dialog-close")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (
        event.target === dialog &&
        (event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom)
      )
        dialog.close();
    });
    dialog.addEventListener("close", () => {
      clearTimeout(loadTimer);
      frame.removeAttribute("src");
      document.body.classList.remove("modal-open");
      previousFocus?.focus({ preventScroll: true });
    });
  }

  // Broken media retains the real reel link and a readable caption.
  document
    .querySelectorAll(".stack-card img, .project-cover img")
    .forEach((img) => {
      const fail = () => img.parentElement.classList.add("media-unavailable");
      img.addEventListener("error", fail);
      if (img.complete && img.naturalWidth === 0) fail();
    });

  const navLinks = [...document.querySelectorAll(".nav-links a")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              if (link.hash === `#${entry.target.id}`)
                link.setAttribute("aria-current", "location");
              else link.removeAttribute("aria-current");
            });
          }
        });
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => sectionObserver.observe(section));
  }
})();

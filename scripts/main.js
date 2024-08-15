const lenis = new Lenis({
  lerp: 0.07,
});

lenis.on("scroll", (e) => {
  // console.log(e)
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

function validateSubmittedForm(event) {
  const required = event.currentTarget.querySelectorAll("input[required]");
  const patterns = event.currentTarget.querySelectorAll("input[pattern]");
  let isValid = true;

  function validateRequired(el) {
    if (el.value === "") {
      isValid = false;
      el.nextElementSibling.textContent = "Обязательное поле";
    } else {
      el.nextElementSibling.textContent = "";
    }
  }

  function validatePattern(el) {
    if (!el.value && el.required) return;

    if (!new RegExp(`^(?:${el.pattern})$`).test(el.value)) {
      isValid = false;
      el.nextElementSibling.textContent = el.dataset.patternText;
    } else {
      el.nextElementSibling.textContent = "";
    }
  }

  if (required.length) {
    required.forEach((el) => {
      validateRequired(el);

      el.addEventListener("input", () => validateRequired(el));
    });
  }

  if (patterns.length) {
    patterns.forEach((el) => {
      validatePattern(el);

      el.addEventListener("input", () => validatePattern(el));
    });
  }

  return isValid;
}

function lockScroll() {
  document.body.style.setProperty(
    "--scrollbar-width",
    window.innerWidth - document.body.offsetWidth + "px"
  );
  document.body.classList.add("lock-scroll");
  lenis.stop();
}

function unlockScroll(delay = 0) {
  setTimeout(() => {
    document.body.classList.remove("lock-scroll");
    lenis.start();
  }, delay);
}

function initializeTelMask() {
  const telInputs = document.querySelectorAll("input[type=tel]");

  if (telInputs.length) {
    telInputs.forEach((input) => {
      IMask(input, {
        mask: "+{7} (000) 000-00-00",
      });

      input.addEventListener("input", (event) => {
        input.value = event.target.value.replace("+7 (8", "+7 (");
      });
    });
  }
}

function initializeAutoresizes() {
  const autoresizes = document.querySelectorAll("[data-autoresize]");

  if (autoresizes) {
    autoresizes.forEach((el) => {
      const initialHeight = 44;

      el.style.height =
        el.scrollHeight <= initialHeight
          ? initialHeight / 16 + "rem"
          : el.scrollHeight / 16 + "rem";

      el.addEventListener("input", () => {
        el.style.height = initialHeight / 16 + "rem";
        el.style.height =
          el.scrollHeight <= initialHeight
            ? initialHeight / 16 + "rem"
            : el.scrollHeight / 16 + "rem";
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnTitles = document.querySelectorAll(".btn--title");
  if (btnTitles.length) {
    btnTitles.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        if (!btn.disabled)
          anime({
            targets: btn,
            scale: 1.1,
          });
      });

      btn.addEventListener("mouseleave", () => {
        if (!btn.disabled)
          anime({
            targets: btn,
            scale: 1,
          });
      });
    });
  }
  const paralaxMouseRoots = document.querySelectorAll(
    "[data-paralax-mouse-root]"
  );

  if (paralaxMouseRoots.length) {
    paralaxMouseRoots.forEach((root) => {
      const layers = root.querySelectorAll("[data-paralax-layer]");

      function handleParallax(evt) {
        const parallaxLeftOffset = root.getBoundingClientRect().left;
        const parallaxTopOffset = root.getBoundingClientRect().top;

        const coordX =
          evt.clientX - parallaxLeftOffset - 0.5 * root.offsetWidth;
        const coordY =
          evt.clientY - parallaxTopOffset - 0.5 * root.offsetHeight;

        layers.forEach((layer) => {
          const layerSpeed = layer.dataset.speed;
          const x = -(coordX * layerSpeed).toFixed(2);
          const y = -(coordY * layerSpeed).toFixed(2);
          layer.setAttribute("style", `transform: translate(${x}px, ${y}px);`);
        });
      }

      function reset(event) {
        layers.forEach((layer) => {
          layer.removeAttribute("style");
        });
      }

      root.addEventListener("mousemove", handleParallax);
      root.addEventListener("mouseleave", reset);
    });
  }

  gsap.utils.toArray(".image-parallax").forEach((container) => {
    const img = container.querySelector("img");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: true,
        pin: false,
      },
    });

    tl.fromTo(
      img,
      {
        yPercent: -15,
        ease: "none",
      },
      {
        yPercent: 15,
        ease: "none",
      }
    );
  });

  const burgerTrigger = document.querySelector("[data-burger-trigger]");

  const _burgerAnimationDuration = 300;

  function closeBurger() {
    const root = document.querySelector("[data-burger-root]");
    if (!root) return;
    unlockScroll(_burgerAnimationDuration);
    root.ariaHidden = true;
    burgerTrigger.focus();
    setTimeout(() => root.remove(), _burgerAnimationDuration);
  }

  function openBurger() {
    const template = document.querySelector("[data-burger-template]");
    const templateContent = template.content.cloneNode(true);
    const closes = templateContent.querySelectorAll("[data-burger-close]");
    const root = templateContent.querySelector("[data-burger-root]");
    const focusGuard = templateContent.querySelector("[data-focus-guard]");
    const focusableElements = templateContent.querySelectorAll(
      'a, button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled])'
    );

    if (closes.length) {
      closes.forEach((close) => {
        close.addEventListener("click", closeBurger);
      });
    }

    lockScroll();
    root.style.animationDuration = _burgerAnimationDuration + "ms";

    document.documentElement.appendChild(templateContent);

    focusableElements?.[0].focus();

    focusGuard.addEventListener("focus", () => {
      focusableElements?.[0].focus();
    });

    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") closeBurger();
    });
  }

  burgerTrigger.addEventListener("click", openBurger);

  const sheetOverlay = document.querySelector("[data-sheet-overlay]");

  const _sheetAnimationDuration = 300;

  let _usedSheetTrigger = null;

  function removeSheet(sheet) {
    setTimeout(() => sheet.remove(), _sheetAnimationDuration);
  }

  function closeSheet(key) {
    const sheet = document.querySelector(`[data-sheet-root=${key}]`);
    if (!sheet) return;
    sheet.ariaHidden = true;
    sheetOverlay.ariaHidden = true;
    if (!document.querySelector("[data-burger-root]"))
      unlockScroll(_sheetAnimationDuration);
    removeSheet(sheet);
    if (_usedSheetTrigger) _usedSheetTrigger.focus();
  }

  function openSheet(key, trigger = null) {
    const alreadyOpenedSheets = document.querySelectorAll("[data-sheet-root]");
    if (alreadyOpenedSheets.length) {
      alreadyOpenedSheets.forEach((sheet) => {
        sheet.ariaHidden = true;
        removeSheet(sheet);
      });
    } else {
      _usedSheetTrigger = trigger;
      lockScroll();
    }

    const template = document.querySelector(`[data-sheet-template=${key}]`);
    const templateContent = template.content.cloneNode(true);

    const root = templateContent.querySelector("[data-sheet-root]");
    const closes = templateContent.querySelectorAll("[data-sheet-close]");
    const autofocuses = templateContent.querySelectorAll(
      "[autofocus]:not([disabled])"
    );
    const focusGuard = templateContent.querySelector("[data-focus-guard]");
    const focusableElements = templateContent.querySelectorAll(
      'a, button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled])'
    );

    root.style.animationDuration = _sheetAnimationDuration + "ms";

    if (closes.length) {
      closes.forEach((close) => {
        close.addEventListener("click", () => {
          closeSheet(key);
        });
      });
    }

    sheetOverlay.ariaHidden = false;

    sheetOverlay.addEventListener("click", () => {
      closeSheet(key);
    });

    document.documentElement.appendChild(templateContent);

    if (autofocuses.length) {
      autofocuses.forEach((node) => {
        node.focus({
          preventScroll: true,
        });
      });
    } else {
      focusableElements?.[0].focus({
        preventScroll: true,
      });
    }

    focusGuard.addEventListener("focus", () => {
      focusableElements?.[0].focus();
    });

    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") closeSheet(key);
    });
  }

  document.addEventListener("click", (event) => {
    const sheetTrigger = event.target.closest("[data-sheet-trigger]");
    if (sheetTrigger)
      openSheet(sheetTrigger.dataset.sheetTrigger, sheetTrigger);
  });

  const accordionItems = document.querySelectorAll("[data-accordion-item]");

  if (accordionItems.length) {
    accordionItems.forEach((item) => {
      const trigger = item.querySelector("[data-accordion-trigger]");
      if (!trigger) return;
      trigger.addEventListener("click", () => {
        const isOpen = item.dataset.accordionItem === "true";
        item.dataset.accordionItem = !isOpen;
      });
    });
  }

  function observeSpanInner(target, delay) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            y: "-2%",
            delay: delay,
            duration: 0.45,
          });
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(target);
  }

  const targetElements = document.querySelectorAll(".span-line-inner");

  targetElements.forEach((target) => {
    observeSpanInner(target, parseFloat(target.dataset.delay ?? 0));
  });

  function observeElements(target, delay) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.from(entry.target, {
            y: "2em",
            opacity: 0,
            duration: 0.5,
            delay: delay,
          });
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(target);
  }

  const targetElementsDownUpAnimations = document.querySelectorAll(".anima");

  if (targetElementsDownUpAnimations.length) {
    targetElementsDownUpAnimations.forEach((target) =>
      observeElements(target, parseFloat(target.dataset.delay ?? 0.2))
    );
  }

  initializeAutoresizes();
  initializeTelMask();
});

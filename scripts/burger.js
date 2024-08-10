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

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
      node.focus();
    });
  } else {
    focusableElements?.[0].focus();
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
  if (sheetTrigger) openSheet(sheetTrigger.dataset.sheetTrigger, sheetTrigger);
});

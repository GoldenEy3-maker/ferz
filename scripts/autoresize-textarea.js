function initializeAutoresizes(root = document) {
  const autoresizes = document.querySelectorAll("[data-autoresize]");

  if (autoresizes) {
    autoresizes.forEach((el) => {
      const initialHeight = 30;

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

initializeAutoresizes();

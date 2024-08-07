const accordionTriggers = document.querySelectorAll("[data-accordion-trigger]");

if (accordionTriggers.length) {
  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isOpen = trigger.dataset.accordionTrigger === "true";
      trigger.dataset.accordionTrigger = !isOpen;
    });
  });
}

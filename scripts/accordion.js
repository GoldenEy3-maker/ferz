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

function initializeCreateOrder() {
  const form = document.querySelector("[data-create-order-form]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = validateSubmittedForm(event);

    if (isValid) openSheet("confirm-order");
  });
}

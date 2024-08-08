function validateSubmittedForm(event) {
  const required = event.currentTarget.querySelectorAll("input[required]");
  const patterns = event.currentTarget.querySelectorAll("input[pattern]");
  let isValid = true;

  if (required.length) {
    required.forEach((el) => {
      if (el.value === "") {
        isValid = false;
        el.nextElementSibling.textContent =
          "Необходимо заполнить все поля формы";
      } else {
        el.nextElementSibling.textContent = "";
      }
    });
  }

  if (patterns.length) {
    patterns.forEach((el) => {
      if (!el.value && el.required) return;

      if (!new RegExp(`^(?:${el.pattern})$`).test(el.value)) {
        isValid = false;
        el.nextElementSibling.textContent = el.dataset.patternText;
      } else {
        el.nextElementSibling.textContent = "";
      }
    });
  }

  return isValid;
}

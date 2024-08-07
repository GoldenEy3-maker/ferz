function initializeTelMask() {
  const telInputs = document.querySelectorAll("input[type=tel]");

  if (telInputs.length) {
    telInputs.forEach((input) => {
      IMask(input, {
        mask: "+{7} (000) 000-00-00",
      });
    });
  }
}

initializeTelMask();

const nextTrigger = document.querySelector("[data-slide-next]");
const prevTrigger = document.querySelector("[data-slide-prev]");
const sliderContainers = document.querySelectorAll("[data-slider-container]");
const firstContainer = sliderContainers[0];
const secondContainer = sliderContainers[1];
const firstCards = firstContainer.querySelectorAll("[data-card]");
const secondCards = secondContainer.querySelectorAll("[data-card]");

const firstIndex = parseInt(firstContainer.dataset.sliderContainer);
const secondIndex = parseInt(secondContainer.dataset.sliderContainer);

firstCards[firstIndex].ariaHidden = false;
secondCards[secondIndex].ariaHidden = false;

function inrementIndexes() {
  let firstIndex = parseInt(firstContainer.dataset.sliderContainer);
  let secondIndex = parseInt(secondContainer.dataset.sliderContainer);

  firstIndex = firstIndex === firstCards.length - 1 ? 0 : firstIndex + 1;
  secondIndex = secondIndex === secondCards.length - 1 ? 0 : secondIndex + 1;

  return [firstIndex, secondIndex];
}

function slideNext(event) {
  const [firstIndex, secondIndex] = inrementIndexes();

  firstContainer.dataset.sliderContainer = firstIndex;
  secondContainer.dataset.sliderContainer = secondIndex;

  firstCards.forEach((el) => (el.ariaHidden = true));
  secondCards.forEach((el) => (el.ariaHidden = true));

  firstCards[firstIndex].ariaHidden = false;
  secondCards[secondIndex].ariaHidden = false;
}

nextTrigger.addEventListener("click", slideNext);

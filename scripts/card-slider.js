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

function resetCards() {
  firstCards.forEach((el) => (el.ariaHidden = true));
  secondCards.forEach((el) => (el.ariaHidden = true));
}

function inrementIndexes() {
  let firstIndex = parseInt(firstContainer.dataset.sliderContainer);
  let secondIndex = parseInt(secondContainer.dataset.sliderContainer);

  firstIndex = firstIndex === firstCards.length - 1 ? 0 : firstIndex + 1;
  secondIndex = secondIndex === secondCards.length - 1 ? 0 : secondIndex + 1;

  firstContainer.dataset.sliderContainer = firstIndex;
  secondContainer.dataset.sliderContainer = secondIndex;

  return [firstIndex, secondIndex];
}

function decrementIndexes() {
  let firstIndex = parseInt(firstContainer.dataset.sliderContainer);
  let secondIndex = parseInt(secondContainer.dataset.sliderContainer);

  firstIndex = firstIndex === 0 ? firstCards.length - 1 : firstIndex - 1;
  secondIndex = secondIndex === 0 ? secondCards.length - 1 : secondIndex - 1;

  firstContainer.dataset.sliderContainer = firstIndex;
  secondContainer.dataset.sliderContainer = secondIndex;

  return [firstIndex, secondIndex];
}

function slideNext(event) {
  const [firstIndex, secondIndex] = inrementIndexes();

  resetCards();

  firstCards[firstIndex].ariaHidden = false;
  secondCards[secondIndex].ariaHidden = false;
}

function slidePrev() {
  const [firstIndex, secondIndex] = decrementIndexes();

  resetCards();

  firstCards[firstIndex].ariaHidden = false;
  secondCards[secondIndex].ariaHidden = false;
}

nextTrigger.addEventListener("click", slideNext);
prevTrigger.addEventListener("click", slidePrev);

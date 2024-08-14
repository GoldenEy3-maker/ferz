const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 2,
  spaceBetween: "3.125%",
  speed: 600,
});

const nextSlideTrigger = document.querySelector("[data-slide-next]");
const prevSlideTrigger = document.querySelector("[data-slide-prev]");

swiper.on("progress", () => {
  prevSlideTrigger.disabled = swiper.isBeginning;
  nextSlideTrigger.disabled = swiper.isEnd;
});

nextSlideTrigger.addEventListener("click", () => {
  swiper.slideNext();
});
prevSlideTrigger.addEventListener("click", () => {
  swiper.slidePrev();
});

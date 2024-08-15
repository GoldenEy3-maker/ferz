const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: "3.125%",
  speed: 600,
  enabled: false,
  grid: {
    rows: document.querySelectorAll(".swiper-slide").length,
  },
  breakpoints: {
    991: {
      slidesPerView: 2,
      grid: false,
      enabled: true,
    },
  },
});

const nextSlideTrigger = document.querySelector("[data-slide-next]");
const prevSlideTrigger = document.querySelector("[data-slide-prev]");

swiper.on("progress", () => {
  if (swiper.isBeginning) {
    prevSlideTrigger.disabled = true;
    anime({
      targets: prevSlideTrigger,
      scale: 1,
    });
  } else {
    prevSlideTrigger.disabled = false;
  }

  if (swiper.isEnd) {
    nextSlideTrigger.disabled = true;
    anime({
      targets: nextSlideTrigger,
      scale: 1,
    });
  } else {
    nextSlideTrigger.disabled = false;
  }
});

nextSlideTrigger.addEventListener("click", () => {
  swiper.slideNext();
});
prevSlideTrigger.addEventListener("click", () => {
  swiper.slidePrev();
});

const headerTop = new Swiper("#tbanner", {
  speed: 1000,
  observer: true,
  observeParents: true,
  loop: true,
  direction: "vertical",
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});

const $tbanner = $("#tbanner");
const $header = $("#header");
let previousScroll = 0; // 이전 스크롤 위치를 저장

$(window).on("scroll", function () {
  const currentScroll = $(this).scrollTop(); // 현재 스크롤 위치

  if (currentScroll > previousScroll) {
    // 아래로 스크롤
    if (currentScroll > $tbanner.height()) {
      $tbanner.css("transform", "translateY(-100%)"); // tbanner 숨기기
      $header.css({ position: "fixed", top: "0", zIndex: "1000" }); // 헤더 고정
    }
  } else {
    // 위로 스크롤
    if (currentScroll <= $tbanner.height()) {
      $tbanner.css("transform", "translateY(0)"); // tbanner 다시 보이기
      $header.css({ position: "relative", top: "0" }); // 헤더 원래 위치로
    }
  }

  previousScroll = currentScroll; // 현재 스크롤 값을 저장
});

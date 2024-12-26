/* 클릭 후 클릭상태를 땔때에 작동
$(document).ready(function () {
  var swiper = new Swiper('.product_image_pg', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    grabCursor: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    mousewheel: false,
    keyboard: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '" data-index="' + index + '">' + '<img src="' + $('.product_image_pg .swiper-slide:eq(' + index + ') img').attr('src') + '">' + '</span>';
      }
    },
    on: {
      click: function () {
        swiper.slideTo(swiper.clickedIndex);
      },
      slideChange: function () {
        var activeBullet = $('.swiper-pagination-bullet-active');
        var activeIndex = activeBullet.attr('data-index');
        var bulletWidth = activeBullet.outerWidth();
        var bulletLeft = activeBullet.position().left;
        var offset = -(bulletLeft + bulletWidth / 2 - swiper.pagination.el.offsetWidth / 2);
        swiper.pagination.el.style.transform = 'translate3d(' + offset + 'px, 0, 0)';
      }
    }
  });
});
*/

/* 클릭 동시에 작동 */
$(document).ready(function () {
  // const swiper = new Swiper(".product_image_pg", {
  //   direction: "horizontal",
  //   slidesPerView: 1,
  //   spaceBetween: 0,
  //   grabCursor: true,
  //   scrollbar: {
  //     el: ".swiper-scrollbar",
  //     draggable: true,
  //   },
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   mousewheel: false,
  //   keyboard: true,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //     renderBullet: function (index, className) {
  //       return (
  //         '<span class="' +
  //         className +
  //         '" data-index="' +
  //         index +
  //         '">' +
  //         '<img src="' +
  //         $(".product_image_pg .swiper-slide:eq(" + index + ") img").attr("src") +
  //         '">' +
  //         "</span>"
  //       );
  //     },
  //   },
  //   on: {
  //     slideChange: function () {
  //       var activeBullet = $(".swiper-pagination-bullet-active");
  //       var activeIndex = activeBullet.attr("data-index");
  //       var bulletWidth = activeBullet.outerWidth();
  //       var bulletLeft = activeBullet.position().left;
  //       var offset = -(bulletLeft + bulletWidth / 2 - swiper.pagination.el.offsetWidth / 2);
  //       swiper.pagination.el.style.transform = "translate3d(" + offset + "px, 0, 0)";
  //     },
  //   },
  // });

  // // Touch swipe for pagination bullets
  // $(".swiper-pagination").on("touchstart", ".swiper-pagination-bullet", function () {
  //   var index = $(this).index();
  //   swiper.slideTo(index);
  // });

  // /* 서브 이미지 개수 파악 후 4개 이상일때 */
  // const bulletElements = document.querySelectorAll(".swiper-pagination-bullet");
  // const paginationElement = document.querySelector(".product_image_pg");

  // if (bulletElements.length >= 4) {
  //   paginationElement.classList.add("pagination_open");
  // }
  const detailSwiper = new Swiper(".product_image_pg", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 0,
    grabCursor: true,
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    //   draggable: true,
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    mousewheel: false,
    keyboard: true,
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    //   renderBullet: function (index, className) {
    //     return (
    //       '<span class="' +
    //       className +
    //       '" data-index="' +
    //       index +
    //       '">' +
    //       '<img src="' +
    //       $(".product_image_pg .swiper-slide:eq(" + index + ") img").attr("src") +
    //       '">' +
    //       "</span>"
    //     );
    //   },
    // },
    // on: {
    //   slideChange: function () {
    //     var activeBullet = $(".swiper-pagination-bullet-active");
    //     var activeIndex = activeBullet.attr("data-index");
    //     var bulletWidth = activeBullet.outerWidth();
    //     var bulletLeft = activeBullet.position().left;
    //     var offset = -(bulletLeft + bulletWidth / 2 - detailSwiper.pagination.el.offsetWidth / 2);
    //     detailSwiper.pagination.el.style.transform = "translate3d(" + offset + "px, 0, 0)";
    //   },
    // },
  });

  // Touch swipe for pagination bullets
  // $(".swiper-pagination").on("touchstart", ".swiper-pagination-bullet", function () {
  //   var index = $(this).index();
  //   detailSwiper.slideTo(index);
  // });

  /* 서브 이미지 개수 파악 후 4개 이상일때 */
  // const bulletElements = document.querySelectorAll(".swiper-pagination-bullet");
  // const paginationElement = document.querySelector(".product_image_pg");

  // if (bulletElements.length >= 4) {
  //   paginationElement.classList.add("pagination_open");
  // }
});

/* 서브 이미지 전체보기, 전체보기 닫기 */
// window.addEventListener("load", function () {
//   $(".pagination_more").click(function () {
//     $(".product_image_pg").addClass("more_on");
//   });
//   $(".pagination_close").click(function () {
//     $(".product_image_pg").removeClass("more_on");
//   });
// });

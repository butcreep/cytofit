/* 가로 카테고리 스크롤 고정 */
// $(document).ready(function () {
//   var top_btn = $("#menuFix").offset().top;
//   $(window).scroll(function () {
//     if ($(window).scrollTop() > top_btn + 50) {
//       $("#menuFix").addClass("menuFix_fixed");
//     } else {
//       $("#menuFix").removeClass("menuFix_fixed");
//     }
//   });
// });

/* 카테고리 */
$(document).ready(function () {
  //console.log('allcate');

  //category
  var aCategory = {};
  function get() {
    $.ajax({
      url: "/exec/front/Product/SubCategory",
      dataType: "json",
      success: function (_aCategory) {
        $(_aCategory).each(function () {
          if (!aCategory[this.parent_cate_no]) {
            aCategory[this.parent_cate_no] = [];
          }
          aCategory[this.parent_cate_no].push(this);
        });
        draw();
      },
    });
  }
  function draw() {
    var _iCateNo = 0;
    var _aTmp = [];
    $("#categoryMenu .menu-dp1 > li > a").each(function () {
      _aTmp = $(this).attr("href").split("?cate_no=");
      _iCateNo = _aTmp[1];
      if (!aCategory[_iCateNo]) {
        return;
      }
      var aHtml = [];
      aHtml.push('<ul class="menu-dp2">');
      for (var i = 0; i < aCategory[_iCateNo].length; i++) {
        aHtml.push(
          '<li><a href="/product/list.html' +
            aCategory[_iCateNo][i].param +
            '">' +
            aCategory[_iCateNo][i].name +
            "</a></li>",
        );
      }
      aHtml.push("</ul>");
      $(this).parent(".menu-dp1 > li").append(aHtml.join(""));

      $(this)
        .siblings(".menu-dp2")
        .find(" > li > a")
        .each(function () {
          _aTmp = $(this).attr("href").split("?cate_no=");
          _iCateNo = _aTmp[1];
          if (!aCategory[_iCateNo]) {
            return;
          }
          var aHtml = [];
          aHtml.push('<ul class="menu-dp3">');
          for (var i = 0; i < aCategory[_iCateNo].length; i++) {
            aHtml.push(
              '<li><a href="/product/list.html' +
                aCategory[_iCateNo][i].param +
                '">' +
                aCategory[_iCateNo][i].name +
                "</a></li>",
            );
          }
          aHtml.push("</ul>");
          $(this).parent("li").append(aHtml.join(""));

          $(this)
            .siblings(".menu-dp3")
            .find(" > li > a")
            .each(function () {
              _aTmp = $(this).attr("href").split("?cate_no=");
              _iCateNo = _aTmp[1];
              if (!aCategory[_iCateNo]) {
                return;
              }
              var aHtml = [];
              aHtml.push('<ul class="menu-dp4">');
              for (var i = 0; i < aCategory[_iCateNo].length; i++) {
                aHtml.push(
                  '<li><a href="/product/list.html' +
                    aCategory[_iCateNo][i].param +
                    '">' +
                    aCategory[_iCateNo][i].name +
                    "</a></li>",
                );
              }
              aHtml.push("</ul>");
              $(this).parent("li").append(aHtml.join(""));
            });
        });
    });
  }
  get();
});

/* 돋보기 아이콘 클릭시 검색창 */
// $(document).ready(function () {
//   $("#header .topArea01 .right .search").click(function () {
//     $(".searchWrap").toggle();
//   });
// });
$(document).ready(function () {
  $("#header .search").click(function () {
    $(".searchWrap").toggle();
  });
});

/* 메인슬라이드 재생,정지 */
$(".start").on("click", function () {
  main_swiper.autoplay.start();
  return false;
});

$(".stop").on("click", function () {
  main_swiper.autoplay.stop();
  return false;
});

/* 검색창 아이콘 변경 */
$(document).ready(function () {
  $("#header .search").click(function () {
    $("#header .search").toggleClass("search_close");
  });
});

/* 스크롤시 나타나는 우측 하단버튼 */
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".fixed_btn").addClass("fixed");
    } else {
      $(".fixed_btn").removeClass("fixed");
    }
  });

  $(".btn.up").click(function () {
    return $("html, body").animate({ scrollTop: 0 }, 1200, "easeInOutExpo"), !1;
  });

  $(".btn.down").click(function () {
    return $("html, body").animate({ scrollTop: $(document).height() }, 1200, "easeInOutExpo"), !1;
  });
});

/* 상품상세 탭 */
$("#prdInfo .infoBox .toggle").on("click", function () {
  const $content = $(this).siblings(".content"); // 현재 클릭된 섹션의 내용

  // 스르륵 애니메이션
  if ($content.is(":visible")) {
    // 열려 있으면 닫기
    $content.slideUp(300, function () {
      $(this).parent().removeClass("open");
    });
  } else {
    // 닫혀 있으면 열기
    $content.slideDown(300, function () {
      $(this).parent().addClass("open");
    });
  }
});

jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
  def: "easeOutQuad",
  swing: function (e, f, a, h, g) {
    return jQuery.easing[jQuery.easing.def](e, f, a, h, g);
  },
  easeInQuad: function (e, f, a, h, g) {
    return h * (f /= g) * f + a;
  },
  easeOutQuad: function (e, f, a, h, g) {
    return -h * (f /= g) * (f - 2) + a;
  },
  easeInOutQuad: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return (h / 2) * f * f + a;
    }
    return (-h / 2) * (--f * (f - 2) - 1) + a;
  },
  easeInCubic: function (e, f, a, h, g) {
    return h * (f /= g) * f * f + a;
  },
  easeOutCubic: function (e, f, a, h, g) {
    return h * ((f = f / g - 1) * f * f + 1) + a;
  },
  easeInOutCubic: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return (h / 2) * f * f * f + a;
    }
    return (h / 2) * ((f -= 2) * f * f + 2) + a;
  },
  easeInQuart: function (e, f, a, h, g) {
    return h * (f /= g) * f * f * f + a;
  },
  easeOutQuart: function (e, f, a, h, g) {
    return -h * ((f = f / g - 1) * f * f * f - 1) + a;
  },
  easeInOutQuart: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return (h / 2) * f * f * f * f + a;
    }
    return (-h / 2) * ((f -= 2) * f * f * f - 2) + a;
  },
  easeInQuint: function (e, f, a, h, g) {
    return h * (f /= g) * f * f * f * f + a;
  },
  easeOutQuint: function (e, f, a, h, g) {
    return h * ((f = f / g - 1) * f * f * f * f + 1) + a;
  },
  easeInOutQuint: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return (h / 2) * f * f * f * f * f + a;
    }
    return (h / 2) * ((f -= 2) * f * f * f * f + 2) + a;
  },
  easeInSine: function (e, f, a, h, g) {
    return -h * Math.cos((f / g) * (Math.PI / 2)) + h + a;
  },
  easeOutSine: function (e, f, a, h, g) {
    return h * Math.sin((f / g) * (Math.PI / 2)) + a;
  },
  easeInOutSine: function (e, f, a, h, g) {
    return (-h / 2) * (Math.cos((Math.PI * f) / g) - 1) + a;
  },
  easeInExpo: function (e, f, a, h, g) {
    return f == 0 ? a : h * Math.pow(2, 10 * (f / g - 1)) + a;
  },
  easeOutExpo: function (e, f, a, h, g) {
    return f == g ? a + h : h * (-Math.pow(2, (-10 * f) / g) + 1) + a;
  },
  easeInOutExpo: function (e, f, a, h, g) {
    if (f == 0) {
      return a;
    }
    if (f == g) {
      return a + h;
    }
    if ((f /= g / 2) < 1) {
      return (h / 2) * Math.pow(2, 10 * (f - 1)) + a;
    }
    return (h / 2) * (-Math.pow(2, -10 * --f) + 2) + a;
  },
  easeInCirc: function (e, f, a, h, g) {
    return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a;
  },
  easeOutCirc: function (e, f, a, h, g) {
    return h * Math.sqrt(1 - (f = f / g - 1) * f) + a;
  },
  easeInOutCirc: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return (-h / 2) * (Math.sqrt(1 - f * f) - 1) + a;
    }
    return (h / 2) * (Math.sqrt(1 - (f -= 2) * f) + 1) + a;
  },
  easeInElastic: function (f, h, e, l, k) {
    var i = 1.70158;
    var j = 0;
    var g = l;
    if (h == 0) {
      return e;
    }
    if ((h /= k) == 1) {
      return e + l;
    }
    if (!j) {
      j = k * 0.3;
    }
    if (g < Math.abs(l)) {
      g = l;
      var i = j / 4;
    } else {
      var i = (j / (2 * Math.PI)) * Math.asin(l / g);
    }
    return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin(((h * k - i) * (2 * Math.PI)) / j)) + e;
  },
  easeOutElastic: function (f, h, e, l, k) {
    var i = 1.70158;
    var j = 0;
    var g = l;
    if (h == 0) {
      return e;
    }
    if ((h /= k) == 1) {
      return e + l;
    }
    if (!j) {
      j = k * 0.3;
    }
    if (g < Math.abs(l)) {
      g = l;
      var i = j / 4;
    } else {
      var i = (j / (2 * Math.PI)) * Math.asin(l / g);
    }
    return g * Math.pow(2, -10 * h) * Math.sin(((h * k - i) * (2 * Math.PI)) / j) + l + e;
  },
  easeInOutElastic: function (f, h, e, l, k) {
    var i = 1.70158;
    var j = 0;
    var g = l;
    if (h == 0) {
      return e;
    }
    if ((h /= k / 2) == 2) {
      return e + l;
    }
    if (!j) {
      j = k * (0.3 * 1.5);
    }
    if (g < Math.abs(l)) {
      g = l;
      var i = j / 4;
    } else {
      var i = (j / (2 * Math.PI)) * Math.asin(l / g);
    }
    if (h < 1) {
      return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin(((h * k - i) * (2 * Math.PI)) / j)) + e;
    }
    return g * Math.pow(2, -10 * (h -= 1)) * Math.sin(((h * k - i) * (2 * Math.PI)) / j) * 0.5 + l + e;
  },
  easeInBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158;
    }
    return i * (f /= h) * f * ((g + 1) * f - g) + a;
  },
  easeOutBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158;
    }
    return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
  },
  easeInOutBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158;
    }
    if ((f /= h / 2) < 1) {
      return (i / 2) * (f * f * (((g *= 1.525) + 1) * f - g)) + a;
    }
    return (i / 2) * ((f -= 2) * f * (((g *= 1.525) + 1) * f + g) + 2) + a;
  },
  easeInBounce: function (e, f, a, h, g) {
    return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a;
  },
  easeOutBounce: function (e, f, a, h, g) {
    if ((f /= g) < 1 / 2.75) {
      return h * (7.5625 * f * f) + a;
    } else {
      if (f < 2 / 2.75) {
        return h * (7.5625 * (f -= 1.5 / 2.75) * f + 0.75) + a;
      } else {
        if (f < 2.5 / 2.75) {
          return h * (7.5625 * (f -= 2.25 / 2.75) * f + 0.9375) + a;
        } else {
          return h * (7.5625 * (f -= 2.625 / 2.75) * f + 0.984375) + a;
        }
      }
    }
  },
  easeInOutBounce: function (e, f, a, h, g) {
    if (f < g / 2) {
      return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a;
    }
    return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a;
  },
});
/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * http://j.mp/respondjs */

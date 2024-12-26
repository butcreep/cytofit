(function ($) {
  $.fn.extend({
    center: function () {
      this.each(function () {
        var $this = $(this),
          $w = $(window);
        $this.css({
          position: "absolute",
          top: ~~(($w.height() - $this.outerHeight()) / 2) + $w.scrollTop() + "px",
          left: ~~(($w.width() - $this.outerWidth()) / 2) + $w.scrollLeft() + "px",
        });
      });
      return this;
    },
  });

  $(function () {
    // HTML 구조 생성
    const $container = `
      <div id="modalContainer">
        <iframe id="modalContent" scroll="0" scrolling="no" frameBorder="0"></iframe>
      </div>
    `;

    // Body에 모달 백패널과 컨테이너 추가
    $("body").append('<div id="modalBackpanel"></div>').append($container);

    // 모달 닫기 함수
    function closeModal() {
      $("#modalContainer").hide();
      $("#modalBackpanel").hide();
    }

    // 백패널 클릭 시 모달 닫기 이벤트
    $("#modalBackpanel").on("click", closeModal);

    // zoom 함수 정의
    zoom = function ($piProductNo, $piCategoryNo, $piDisplayGroup) {
      const $url =
        "/product/image_zoom.html?product_no=" +
        $piProductNo +
        "&cate_no=" +
        $piCategoryNo +
        "&display_group=" +
        $piDisplayGroup;

      // 모달 컨텐츠 로드
      $("#modalContent").attr("src", $url);
      $("#modalContent").on("load", function () {
        const $iframeBody = $(this.contentWindow.document.body);
        $iframeBody.find(".header .close").on("click", closeModal);
      });

      // 백패널 스타일 및 모달 표시
      $("#modalBackpanel")
        .css({
          width: $(document).width(),
          height: $(document).height(),
          opacity: 0.4,
          display: "block",
        })
        .show();

      // 모달 중앙 정렬 및 표시
      $("#modalContainer").center().show();
    };
  });
})(jQuery);

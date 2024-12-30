EC$(function ($) {
  //할인율표기
  discount();
  function discount() {
    //상품목록
    $(".prdList").each(function () {
      $(this)
        .find("> li")
        .each(function () {
          var price1 = String($(this).find(".description").attr("ec-data-custom")).replace(/\,/g, "").replace("원", ""); //소비자가
          var price2 = String($(this).find(".description").attr("ec-data-price")).replace(/\,/g, "").replace("원", ""); //판매가
          var price2 = price2.split(" "); //판매가참조화폐 구분
          if (!isNaN(price1) && !isNaN(price2[0])) {
            discountRate = Math.round(((price1 - price2[0]) / price1) * 100);
            if (discountRate > 0 && discountRate != 100 && $(this).find(".ec-sale-rate").length < 1) {
              $(this)
                .find(".thumbnail")
                .append('<div class="ec-sale-rate">' + discountRate + "%</div>");
            }
          }
        });
    });
  }

  if ($(".xans-product-detaildesign").length) {
    discount2();
    function discount2() {
      //상품상세,확대보기(팝업)
      var price1 = String($(".xans-product-detail #span_product_price_custom").text())
        .replace(/\,/g, "")
        .replace("원", ""); //소비자가
      var price2 = String($(".xans-product-detail #span_product_price_text").text())
        .replace(/\,/g, "")
        .replace("원", ""); //판매가
      var price2 = price2.split(" "); //판매가참조화폐 구분
      if (!isNaN(price1) && !isNaN(price2[0])) {
        discountRate = Math.round(((price1 - price2[0]) / price1) * 100);
        if (discountRate > 0 && discountRate != 100 && $(this).find(".ec-sale-rate").length < 1) {
          $(".discount_rate").text(discountRate + "%");
          // $(".xans-product-detail #span_product_price_text").append(
          //   '<span class="ec-sale-rate">' + discountRate + "%</span>",
          // );
        }
      }
    }
  }
});
// tbody 내의 모든 <tr>을 순회
document.querySelectorAll(".xans-product-detaildesign tbody tr").forEach(row => {
  // 각 <tr>의 클래스 추출
  const rowClass = row.className.split(" ")[1];
  console.log("👉", rowClass);
  // '_css'가 포함된 클래스만 처리
  if (rowClass.includes("_css")) {
    // 해당 클래스와 동일한 <div>를 prod_price 내부에서 찾기
    const targetDiv = document.querySelector(`.prod_price .${rowClass}`);
    console.log("👉", targetDiv);
    if (targetDiv) {
      // <td> 값을 가져와 targetDiv에 삽입
      const tdValue = row.querySelector("td").innerText;
      targetDiv.textContent = tdValue;
    }
  }
});

/* 상품상세 */
$(function () {
  $(".xans-product-detail .Product_info_tll ul li").addClass("text_tll");

  $('.xans-product-detail .Product_info_tll .item_title:contains("상품요약정보")')
    .parents(".xans-product-detail .Product_info_tll ul li")
    .addClass("summary");
  $('.xans-product-detail .Product_info_tll .item_title:contains("상품 요약설명")')
    .parents(".xans-product-detail .Product_info_tll ul li")
    .addClass("summary");
  $('.xans-product-detail .Product_info_tll .item_title:contains("상품간략설명")')
    .parents(".xans-product-detail .Product_info_tll ul li")
    .addClass("summary");

  $('.xans-product-detail .Product_info_tll .item_title:contains("판매가")')
    .parents(".xans-product-detail .Product_info_tll ul li")
    .addClass("price_text");

  $(".xans-product-detail .Product_info_tll #span_product_price_custom")
    .parents(".xans-product-detail .Product_info_tll ul li")
    .addClass("price_custom");

  $(".xans-product-detail .Product_info_tll #span_product_price_text")
    .parents(".xans-product-detail .Product_info_tll ul li")
    .addClass("price");
  $(".xans-product-detail .Product_info_tll #span_product_price_text")
    .parents(".xans-product-detail .Product_info_tll")
    .addClass("price_open");

  /* 할인가 노출 */
  $(".xans-product-detail .Product_info_tll #span_product_price_sale")
    .parents(".xans-product-detail .Product_info_tll ul li")
    .addClass("sale");
  $(".xans-product-detail .Product_info_tll #span_product_price_sale")
    .parents(".xans-product-detail .Product_info_tll")
    .addClass("sale_open");

  /* 최적할인가 */
  $(".xans-product-detail .Product_info_tll #span_optimum_discount_price")
    .parents(".xans-product-detail .Product_info_tll ul li")
    .addClass("optimum_sale");
  $(".xans-product-detail .Product_info_tll #span_optimum_discount_price")
    .parents(".xans-product-detail .Product_info_tll")
    .addClass("sale_open");

  /* 쿠폰적용가 */
  $(".xans-product-detail .Product_info_tll #span_product_coupon_dc_price")
    .parents(".xans-product-detail .Product_info_tll ul li")
    .addClass("coupon_dc_sale");
  $(".xans-product-detail .Product_info_tll #span_product_coupon_dc_price")
    .parents(".xans-product-detail .Product_info_tll")
    .addClass("sale_open");
});

/* 상품상세 */
$(function () {
  $(".xans-product-detaildesign tbody tr").addClass("text_tll");

  $('.xans-product-detaildesign span:contains("상품요약정보")').parents("tr").addClass("summary");
  $('.xans-product-detaildesign span:contains("상품 요약설명")').parents("tr").addClass("summary");
  $('.xans-product-detaildesign span:contains("상품간략설명")').parents("tr").addClass("summary");

  /* 소비자가 */
  $(".xans-product-detaildesign #span_product_price_custom").parents("tr").addClass("price_custom");

  /* 판매가 */
  $(".xans-product-detaildesign #span_product_price_text").parents("tr").addClass("price");
  $(".xans-product-detaildesign #span_product_price_text").parents(".xans-product-detaildesign").addClass("price_open");

  /* 할인가 */
  $(".xans-product-detaildesign #span_product_price_sale").parents("tr").addClass("sale");
  $(".xans-product-detaildesign #span_product_price_sale").parents(".xans-product-detaildesign").addClass("sale_open");

  /* 최적할인가 */
  $(".xans-product-detaildesign #span_optimum_discount_price").parents("tr").addClass("optimum_sale");
  $(".xans-product-detaildesign #span_optimum_discount_price")
    .parents(".xans-product-detaildesign")
    .addClass("sale_open");

  /* 쿠폰적용가 */
  $(".xans-product-detaildesign #span_product_coupon_dc_price").parents("tr").addClass("coupon_dc_sale");
  $(".xans-product-detaildesign #span_product_coupon_dc_price")
    .parents(".xans-product-detaildesign")
    .addClass("sale_open");
});

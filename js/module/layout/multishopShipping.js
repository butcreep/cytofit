$(function () {
  if (typeof EC_SHOP_MULTISHOP_SHIPPING != "undefined") {
    var sShippingCountryCode4Cookie = "shippingCountryCode";
    var bShippingCountryProc = false;

    // 배송국가 선택 설정이 사용안함이면 숨김
    if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingCountrySelection === false) {
      $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").hide();
      $(
        ".xans-layout-multishoplist .xans-layout-multishoplistmultioption .xans-layout-multishoplistmultioptioncountry",
      ).hide();
    } else {
      $(".thumb .xans-layout-multishoplistitem").hide();
      var aShippingCountryCode = document.cookie.match("(^|;) ?" + sShippingCountryCode4Cookie + "=([^;]*)(;|$)");
      if (
        typeof aShippingCountryCode != "undefined" &&
        aShippingCountryCode != null &&
        aShippingCountryCode.length > 2
      ) {
        var sShippingCountryValue = aShippingCountryCode[2];
      }

      // query string으로 넘어 온 배송국가 값이 있다면, 그 값을 적용함
      var aHrefCountryValue = decodeURIComponent(location.href).split("/?country=");

      if (aHrefCountryValue.length == 2) {
        var sShippingCountryValue = aHrefCountryValue[1];
      }

      // 메인 페이지에서 국가선택을 안한 경우, 그 외의 페이지에서 셋팅된 값이 안 나오는 현상 처리
      if (
        location.href.split("/").length != 4 &&
        $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val()
      ) {
        $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a .ship span").text(
          " : " +
            $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist option:selected")
              .text()
              .split("SHIPPING TO : ")
              .join(""),
        );

        if ($("#f_country").length > 0 && location.href.indexOf("orderform.html") > -1) {
          $("#f_country").val($(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val());
        }
      }
      if (typeof sShippingCountryValue != "undefined" && sShippingCountryValue != "" && sShippingCountryValue != null) {
        sShippingCountryValue = sShippingCountryValue.split("#")[0];
        var bShippingCountryProc = true;

        $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val(sShippingCountryValue);
        $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a .ship span").text(
          " : " +
            $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist option:selected")
              .text()
              .split("SHIPPING TO : ")
              .join(""),
        );
        var expires = new Date();
        expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30일간 쿠키 유지
        document.cookie =
          sShippingCountryCode4Cookie +
          "=" +
          $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val() +
          ";path=/" +
          ";expires=" +
          expires.toUTCString();
        if ($("#f_country").length > 0 && location.href.indexOf("orderform.html") > -1) {
          $("#f_country").val(sShippingCountryValue).change();
        }
      }
    }
    // 언어선택 설정이 사용안함이면 숨김
    if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingLanguageSelection === false) {
      $(".xans-layout-multishopshipping .xans-layout-multishopshippinglanguagelist").hide();
      $(
        ".xans-layout-multishoplist .xans-layout-multishoplistmultioption .xans-layout-multishoplistmultioptionlanguage",
      ).hide();
    } else {
      $(".thumb .xans-layout-multishoplistitem").hide();
    }

    // 배송국가 및 언어 설정이 둘 다 사용안함이면 숨김
    if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShipping === false) {
      $(".xans-layout-multishopshipping").hide();
      $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption").hide();
    } else if (bShippingCountryProc === false && location.href.split("/").length == 4) {
      // 배송국가 값을 처리한 적이 없고, 메인화면일 때만 선택 레이어를 띄움
      var sShippingCountryValue = $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val();
      $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val(sShippingCountryValue);
      $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a .ship span").text(
        " : " +
          $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist option:selected")
            .text()
            .split("SHIPPING TO : ")
            .join(""),
      );
      // 배송국가 선택을 사용해야 레이어를 보이게 함
      if (EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingCountrySelection === true) {
        $(".xans-layout-multishopshipping").show();
      }
    }

    $(".xans-layout-multishopshipping .close").on("click", function () {
      $(".xans-layout-multishopshipping").hide();
    });

    $(".xans-layout-multishopshipping .ec-base-button a").on("click", function () {
      var expires = new Date();
      expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30일간 쿠키 유지
      document.cookie =
        sShippingCountryCode4Cookie +
        "=" +
        $(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val() +
        ";path=/" +
        ";expires=" +
        expires.toUTCString();

      // 도메인 문제로 쿠키로 배송국가 설정이 안 되는 경우를 위해 query string으로 배송국가 값을 넘김
      var sQuerySting =
        EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingCountrySelection === false
          ? ""
          : "/?country=" +
            encodeURIComponent($(".xans-layout-multishopshipping .xans-layout-multishopshippingcountrylist").val());

      location.href =
        "//" + $(".xans-layout-multishopshipping .xans-layout-multishopshippinglanguagelist").val() + sQuerySting;
    });
    $(".xans-layout-multishoplist .xans-layout-multishoplistmultioption a").on("click", function () {
      $(".xans-layout-multishopshipping").show();
    });
  }
});

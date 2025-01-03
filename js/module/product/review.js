/**
 * 상품상세 사용후기
 */
$(function () {
  $(".xans-product-review a").on("click", function (e) {
    e.preventDefault();

    var no = $(this)
      .attr("href")
      .replace(/(\S*)[?&]no=(\d+)(\S*)/g, "$2");
    var $obj = $("#product-review-read_" + no);

    //로드된 엘리먼트 존재 체크
    if ($obj.length > 0) {
      if ($obj.css("display") == "none") {
        $obj.show();
      } else {
        $obj.hide();
      }
      return;
    }

    REVIEW.getReadData($(this));
  });
});

var PARENT = "";

var OPEN_REVIEW = "";

var REVIEW = {
  getReadData: function (obj, eType) {
    if (obj != undefined) {
      PARENT = obj;
      var sHref = obj.attr("href");
      var pNode = obj.parents("tr");
      var pass_check = "&pass_check=F";
    } else {
      var sHref = PARENT.attr("href");
      var pNode = PARENT.parents("tr");
      var pass_check = "&pass_check=T";
    }

    var sQuery = sHref.split("?");

    var sQueryNo = sQuery[1].split("=");
    if (OPEN_REVIEW == sQueryNo[1]) {
      $("#product-review-read").remove();
      OPEN_REVIEW = "";
      return false;
    } else {
      OPEN_REVIEW = sQueryNo[1];
    }

    $.ajax({
      url: "/exec/front/board/product/4?" + sQuery[1] + pass_check,
      dataType: "json",
      success: function (data) {
        $("#product-review-read").remove();

        var sPath = document.location.pathname;
        var sPattern = /^\/product\/(.+)\/([0-9]+)(\/.*)/;
        var aMatchResult = sPath.match(sPattern);

        if (aMatchResult) {
          var iProductNo = aMatchResult[2];
        } else {
          var iProductNo = getQueryString("product_no");
        }

        var aHtml = [];

        //읽기 권한 체크
        if (false === data.read_auth && eType == undefined) {
          alert(decodeURIComponent(data.alertMSG));

          //로그인페이지 이동
          if (data.returnUrl != undefined) {
            location.replace("/member/login.html?returnUrl=" + data.returnUrl);
          }
          return false;
        }

        if (data.is_secret == true) {
          // 비밀글 비밀번호 입력 폼
          aHtml.push('<form name="SecretForm_4" id="SecretForm_4">');
          aHtml.push('<input type="text" name="a" style="display:none;">');
          aHtml.push(
            '<div class="view"><p>비밀번호 <input type="password" id="secure_password" name="secure_password" onkeydown="if (event.keyCode == 13) ' +
              data.action_pass_submit +
              '"> <input type="button" value="확인" onclick="' +
              data.action_pass_submit +
              '"></p></div>',
          );
          aHtml.push("</form>");
        } else {
          // 글 내용
          if (data.read["content_image"] != null) {
            var sImg = data.read["content_image"];
          } else {
            var sImg = "";
          }

          aHtml.push('<div class="view ' + data.read["block_content_class"] + '">');
          aHtml.push('<div id="ec-ucc-media-box-' + data.read["no"] + '"></div>');
          aHtml.push("<p>" + data.read["content"] + "</p>");
          aHtml.push("<p>" + sImg + "</p>");
          aHtml.push('<p class="ec-base-button"><span class="gLeft">');
          if (data.write_auth == true) {
            aHtml.push(
              '<a href="#none" onclick="EC_PRODUCT_FRONT_BOARD_REVIEW.modify(' +
                data.no +
                ", " +
                iProductNo +
                ');" class="btnNormal">게시글 수정</a>',
            );
          }
          aHtml.push("</span></p>");
          aHtml.push("</div>");

          // 댓글리스트
          if (data.comment != undefined && data.comment.length != undefined) {
            aHtml.push('<ul class="boardComment">');
            for (var i = 0; data.comment.length > i; i++) {
              //댓글리스트
              if (data.comment[i]["comment_reply_css"] == undefined) {
                aHtml.push("<li>");
                aHtml.push(
                  '<strong class="name">' +
                    data.comment[i]["member_icon"] +
                    " " +
                    data.comment[i]["comment_name"] +
                    "</strong>",
                );
                aHtml.push('<span class="date">' + data.comment[i]["comment_write_date"] + "</span>");
                aHtml.push(
                  '<span class="grade ' +
                    data.use_point +
                    '"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/ico_point' +
                    data.comment[i]["comment_point_count"] +
                    '.gif" alt="' +
                    data.comment[i]["comment_point_count"] +
                    '점" /></span>',
                );
                if (data.comment[i]["comment_reply_display"] == true) {
                  aHtml.push(
                    '<span class="button">' +
                      '<a href="#none" class="btnNormal" onclick="' +
                      data.comment[i]["action_comment_reply"] +
                      '">댓글 <img src="//img.echosting.cafe24.com/skin/base/common/btn_icon_reply.gif" alt="" /></a>' +
                      "</span>",
                  );
                }
                aHtml.push(
                  '<p class="comment">' +
                    data.comment[i]["comment_icon_lock"] +
                    " " +
                    data.comment[i]["comment_content"] +
                    "</p>",
                );
                aHtml.push("</li>");
              } else {
                //댓글의 댓글리스트
                aHtml.push('<li class="replyArea">');
                aHtml.push(
                  '<strong class="name">' +
                    data.comment[i]["member_icon"] +
                    " " +
                    data.comment[i]["comment_name"] +
                    "</strong>",
                );
                aHtml.push('<span class="date">' + data.comment[i]["comment_write_date"] + "</span>");
                aHtml.push(
                  '<p class="comment">' +
                    data.comment[i]["comment_icon_lock"] +
                    " " +
                    data.comment[i]["comment_content"] +
                    "</p>",
                );
                aHtml.push("</li>");
              }
            }
            aHtml.push("</ul>");
          }

          // 댓글쓰기
          if (data.comment_write != undefined) {
            aHtml.push('<form name="commentWriteForm_4' + data.key + '" id="commentWriteForm_4' + data.key + '">');
            aHtml.push('<div class="memoCont">');
            aHtml.push('<div class="writer">');
            aHtml.push(
              '<div class="user"><div class="nameArea">이름 ' +
                data.comment_write["comment_name"] +
                " 비밀번호 " +
                data.comment_write["comment_password"],
            );
            if (data.comment_write["comment_secret_display"] == true) {
              aHtml.push('<label class="secret">' + data.comment_write["secure"] + " 비밀댓글</label>");
            }
            aHtml.push(
              '<p class="ec-base-help ' +
                data.comment_write["password_rule_help_display_class"] +
                '">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>',
            );
            aHtml.push("</div>");
            aHtml.push(
              "" +
                data.comment_write["comment"] +
                '<a href="#none" class="btnEm sizeL" onclick="' +
                data.comment_write["action_comment_insert"] +
                '">확인</a></div>',
            );
            aHtml.push(
              '<p class="rating ' +
                data.comment_write["use_point"] +
                '">' +
                data.comment_write["comment_point"] +
                "</p>",
            );
            aHtml.push(
              '<p class="text ' +
                data.comment_write["use_comment_size"] +
                '">' +
                data.comment_write["comment_byte"] +
                " / " +
                data.comment_write["comment_size"] +
                " byte</p>",
            );
            aHtml.push(
              '<p class="captcha ' +
                data.comment_write["use_captcha"] +
                '">' +
                data.comment_write["captcha_image"] +
                data.comment_write["captcha_refresh"] +
                data.comment_write["captcha"] +
                '<img src="//img.echosting.cafe24.com/skin/base/common/ico_info.gif" alt="" /> 왼쪽의 문자를 공백없이 입력하세요.(대소문자구분)</p>',
            );
            aHtml.push("</div>");
            aHtml.push("</div>");
            aHtml.push("</form>");
          }

          // 댓글의 댓글쓰기
          if (data.comment_reply != undefined) {
            aHtml.push(
              '<form name="commentReplyWriteForm_4' +
                data.key +
                '" id="commentReplyWriteForm_4' +
                data.key +
                '" style="display:none">',
            );
            aHtml.push('<div class="memoCont reply">');
            aHtml.push('<div class="writer">');
            aHtml.push(
              '<div class="user"><div class="nameArea">이름 ' +
                data.comment_reply["comment_name"] +
                " 비밀번호 " +
                data.comment_reply["comment_password"],
            );
            if (data.comment_reply["comment_secret_display"] == true) {
              aHtml.push('<label class="secret">' + data.comment_reply["secure"] + " 비밀댓글</label>");
            }
            aHtml.push(
              '<p class="ec-base-help ' +
                data.comment_write["password_rule_help_display_class"] +
                '">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>',
            );
            aHtml.push("</div>");
            aHtml.push(
              "" +
                data.comment_reply["comment"] +
                '<a href="#none" class="btnEm sizeL" onclick="' +
                data.comment_reply["action_comment_insert"] +
                '">확인</a></div>',
            );
            aHtml.push(
              '<p class="text ' +
                data.comment_reply["use_comment_size"] +
                '">' +
                data.comment_reply["comment_byte"] +
                " / " +
                data.comment_reply["comment_size"] +
                " byte</p>",
            );
            aHtml.push(
              '<p class="captcha ' +
                data.comment_reply["use_captcha"] +
                '">' +
                data.comment_reply["captcha_image"] +
                data.comment_write["captcha_refresh"] +
                data.comment_reply["captcha"] +
                '<img src="//img.echosting.cafe24.com/skin/base/common/ico_info.gif" alt="" /> 왼쪽의 문자를 공백없이 입력하세요.(대소문자구분)</p>',
            );
            aHtml.push("</div>");
            aHtml.push("</div>");
            aHtml.push("</form>");
          }
          // 비밀댓글 확인
          if (data.comment_secret != undefined) {
            aHtml.push(
              '<form name="commentSecretForm_4' +
                data.key +
                '" id="commentSecretForm_4' +
                data.key +
                '" style="display:none">',
            );
            aHtml.push('<div class="commentSecret">');
            aHtml.push("<p>비밀번호 : " + data.comment_secret["secure_password"]);
            aHtml.push(
              ' <a href="#none" class="btnNormal" onclick="' +
                data.comment_secret["action_secret_submit"] +
                '">확인</a>',
            );
            aHtml.push(
              ' <a href="#none" class="btnNormal" onclick="' +
                data.comment_secret["action_secret_cancel"] +
                '">취소</a></p>',
            );
            aHtml.push("</div>");
            aHtml.push("</form>");
          }
        }

        $(pNode).after(
          '<tr id="product-review-read' +
            data.key +
            '" class="' +
            data.read["block_target_class"] +
            '" ' +
            data.read["block_data_attr"] +
            '><td colspan="6">' +
            aHtml.join("") +
            "</td></tr>",
        );

        // 평점기능 사용안함일 경우 보여지는 td를 조절하기 위한 함수
        PRODUCT_COMMENT.comment_colspan(pNode);
        // 게시물 작성자 차단 기능
        APP_BOARD_BLOCK.setBlockList();

        if (data.comment_write != undefined && data.comment_write["use_comment_size"] == "")
          PRODUCT_COMMENT.comment_byte(4, data.key);
        if (data.comment_reply != undefined && data.comment_write["use_comment_size"] == "")
          PRODUCT_COMMENT.comment_byte(4, data.key, "commentReplyWriteForm");
        if (data.read["ucc_url"])
          $("#ec-ucc-media-box-" + data.read["no"]).replaceWith(APP_BOARD_UCC.getPreviewElement(data.read["ucc_url"]));
      },
    });
  },

  END: function () {},
};

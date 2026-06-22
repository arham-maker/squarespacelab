function switchDiv(){$(window).outerWidth()<=768&&$(".topAppendTxt").each((function(){var s=$(this).find(".cloneDiv").clone(!0);$(this).find(".cloneDiv").remove(),$(this).append(s)}))}function goToScroll(s){$("html, body").animate({scrollTop:$("."+s).offset().top},1e3)}$(document).ready((function(){switchDiv(),$("li:first-child").addClass("first"),$("li:last-child").addClass("last"),$('[href="#"]').attr("href","javascript:;"),$(".menu-Bar").click((function(){$(this).toggleClass("open"),$(".menuWrap").toggleClass("open"),$("body").toggleClass("ovr-hiddn")})),$(".loginUp").click((function(){$(".LoginPopup").fadeIn(),$(".overlay").fadeIn()})),$(".signUp").click((function(){$(".signUpPop").fadeIn(),$(".overlay").fadeIn()})),$(".closePop,.overlay").click((function(){$(".popupMain").fadeOut(),$(".overlay").fadeOut()})),$(".menu .menu-item-has-children").addClass("dropdown-nav "),$(".menu .menu-item-has-children ul.sub-menu").addClass("dropdown"),$("[data-targetit]").on("click",(function(s){$(this).addClass("active"),$(this).siblings().removeClass("active");var e=$(this).data("targetit");$("."+e).siblings('[class^="box-"]').hide(),$("."+e).fadeIn(),$(".tabViewList").slick("setPosition",0)})),$(".accordion-list > li > .answer").hide(),$(".accordion-list > li").click((function(){return $(this).hasClass("active")?$(this).removeClass("active").find(".answer").slideUp():($(".accordion-list > li.active .answer").slideUp(),$(".accordion-list > li.active").removeClass("active"),$(this).addClass("active").find(".answer").slideDown()),!1})),$("li.dropdown-nav").hover((function(){$(this).children("ul").stop(!0,!1,!0).slideToggle(300)})),$(".searchBtn").click((function(){$(".searchWrap").addClass("active"),$(".overlay").fadeIn("active"),$(".searchWrap input").focus(),$(".searchWrap input").focusout((function(s){$(this).parents().removeClass("active"),$(".overlay").fadeOut("active"),$("body").removeClass("ovr-hiddn")}))})),$(".index-slider").slick({dots:!1,infinite:!0,speed:300,slidesToShow:1})})),$(window).on("load",(function(){var s=window.location.href.substr(window.location.href.lastIndexOf("/")+1);$("ul.menu li a").each((function(){$(this).attr("href")==s&&($(this).removeClass("active"),$(this).closest("li").addClass("active"),$("ul.menu li.first").removeClass("active"))}))})),$(window).width(),$(document).ready((function(){$(".popdynamic").click((function(){$(".centercont.static").addClass("d-none"),$(".centercont.dynamic").removeClass("d-none"),$(".overlay").fadeIn(),$("#popdynamic").fadeIn(),$(".LoginPopup").addClass("price-margin");var s=$(this).closest(".pckg").find(" .title").html(),e=$(this).closest(".pckg").find(".price .amount").html(),i=$(this).attr("rel");$('input[name="pkg_key"]').val(i),$("#popupform input#popuppackage").val(i),$(".centercont.dynamic h3 span").html(s),$(".centercont h4").html("In Just <span>"+e+"</span>")})),$(".popbtn2").click((function(){$(".centercont.static").addClass("d-none"),$(".centercont.dynamic").removeClass("d-none"),$(".overlay").fadeIn(),$("#popdynamic").fadeIn(),$(".LoginPopup").addClass("price-margin");var s=$(this).closest(".pckg2").find(".label").html(),e=$(this).closest(".pckg2").find(".price").html(),i=$(this).attr("rel");$('input[name="pkg_key"]').val(i),$("#popupform input#popuppackage").val(i),$(".centercont.dynamic h3 span").html(s),$(".centercont h4").html("In Just <span>"+e+"</span>")})),$(".closeico,.overlay").click((function(){$(".popupmain").fadeOut(),$(".overlay").fadeOut()})),$(".popstatic").click((function(){$(".centercont.static").removeClass("d-none"),$(".centercont.dynamic").addClass("d-none"),$("#popstatic").fadeIn(),$(".overlay").fadeIn();$(".centercont h4").html("in Just <span>$99</span>")})),$(window).scroll((function(){var s=$("header"),e=$(window).scrollTop();e>=1&&s.addClass("sticky"),e<=0&&s.removeClass("sticky")}))})),$(window).on("scroll",(function(s){$(".goto").length>0&&$(window).scrollTop()>=$(".goto").offset().top-$(window).height()&&($(".goto").hasClass("animated")||($(".count").each((function(){$(this).prop("Counter",0).animate({Counter:$(this).text()},{duration:4e3,easing:"swing",step:function(s){$(this).text(Math.ceil(s).toString().replace(/\B(?=(\d{3})+(?!\d))/g,""))}})})),$(".goto").addClass("animated")))})),$(".countrylist").change((function(){var s=$(this).children("option:selected").val(),e=$(this).children("option:selected").attr("data-abbr");$(this).closest(".newcountrycode ").find(".countrycode").attr("value","+"+s),"CA"==e?($(this).siblings("span").removeClass(),$(this).siblings("span").addClass("fgca")):($(this).siblings("span").removeClass(),$(this).siblings("span").addClass("fg"+s))})),$(".trusted-logos").slick({slidesToShow:8,slidesToScroll:1,autoplay:!0,autoplaySpeed:0,speed:8e3,cssEase:"linear",dots:!1,arrows:!1,responsive:[{breakpoint:1025,settings:{slidesToShow:7}},{breakpoint:885,settings:{slidesToShow:6}},{breakpoint:600,settings:{cssEase:"ease",slidesToShow:3}}]}),$(".design-card-list").slick({slidesToShow:5,slidesToScroll:1,autoplay:!0,autoplaySpeed:0,speed:8e3,cssEase:"linear",dots:!1,arrows:!1,responsive:[{breakpoint:1025,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:885,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:600,settings:{cssEase:"ease",slidesToShow:1,slidesToScroll:1}}]}),$(".design-card-list-2").slick({slidesToShow:5,slidesToScroll:1,autoplay:!0,rtl:!0,autoplaySpeed:0,speed:8e3,cssEase:"linear",dots:!1,arrows:!1,responsive:[{breakpoint:1025,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:885,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:600,settings:{cssEase:"ease",slidesToShow:1,slidesToScroll:1}}]}),$(window).width()>1200?$(".has-child.hover").hover((function(){$(this).children(".dropdown").stop(!0,!1,!0).slideDown(500),$(this).find(".chev").addClass("rotate")}),(function(){$(this).children(".dropdown").stop(!0,!1,!0).slideUp(500),$(this).find(".chev").removeClass("rotate")})):$(".has-child.hover").click((function(){$(".has-child").not($(this)).find(".dropdown").stop(!0,!1,!0).slideUp(500),$(".has-child").not($(this)).find(".chev").removeClass("rotate"),$(this).children(".dropdown").stop(!0,!1,!0).slideToggle(500),$(this).find(".chev").toggleClass("rotate")})),$(".has-child.click").click((function(){$(".has-child").not($(this)).find(".dropdown").stop(!0,!1,!0).slideUp(500),$(".has-child").not($(this)).find(".chev").removeClass("rotate"),$(this).find(".dropdown").stop(!0,!1,!0).slideToggle(500),$(this).find(".chev").toggleClass("rotate")}));
// ---- LPv2 Form Handling ----
$(document).ready(function () {

    // Set current page URL in all hidden pageUrl inputs
    $('.js-page-url').val(window.location.href);

    // Override popdynamic click to populate hidden package fields
    $('.popdynamic').off('click').on('click', function () {
        $('.centercont.static').addClass('d-none');
        $('.centercont.dynamic').removeClass('d-none');
        $('.overlay').fadeIn();
        $('#popdynamic').fadeIn();

        var packtitle = $.trim($(this).closest('.pckg').find('.title').text());
        var packamount = $.trim($(this).closest('.pckg').find('.price .amount').text()).replace('$', '').trim();
        var packprice = '$' + packamount;

        var featureItems = [];
        $(this).closest('.pckg').find('ul li').each(function () {
            var txt = $.trim($(this).text());
            if (txt) featureItems.push(txt);
        });

        $('#dyn-pkg-name').val(packtitle);
        $('#dyn-pkg-cost').val(packprice);
        $('#dyn-pkg-html').val(featureItems.join('\n'));

        $('#popdynamic-form .lp-form-msg').text('').css('color', '');
        $('#popdynamic-form')[0].reset();
        $('#dyn-pkg-name').val(packtitle);
        $('#dyn-pkg-cost').val(packprice);
        $('#dyn-pkg-html').val(featureItems.join('\n'));

        $('.centercont.dynamic h3 span').html(packtitle);
        $('.centercont h4').html('In Just <span>' + packprice + '</span>');
    });

    // Reset static form on open
    $('.popstatic').off('click').on('click', function () {
        $('.centercont.static').removeClass('d-none');
        $('.centercont.dynamic').addClass('d-none');
        $('#popstatic').fadeIn();
        $('.overlay').fadeIn();
        $('#popstatic-form .lp-form-msg').text('').css('color', '');
    });

    // Lead Form AJAX Submission
    var LEADORBIT_URL = 'https://leadorbit.zyloscrm.com/api/leads/squarespace-pros/MCMPmKH9qmmfSfThqMZOnIkWMUlOEtZe';
    var LEADORBIT_KEY = 'lak_w0YH8hdLYIL61TrorHuV14NQiHOr1loBnlkskEUi';

    function submitLeadForm($form) {
        var $msg = $form.find('.lp-form-msg');
        var $btn = $form.find('button[type="submit"]');

        var name  = $.trim($form.find('input[name="name"]').val());
        var email = $.trim($form.find('input[name="email"]').val());
        var phone = $.trim($form.find('input[name="phone"]').val());

        if (!name) {
            $msg.text('Please enter your full name.').css('color', '#e53e3e');
            return;
        }
        if (!email && !phone) {
            $msg.text('Please enter your email or phone number.').css('color', '#e53e3e');
            return;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $msg.text('Please enter a valid email address.').css('color', '#e53e3e');
            return;
        }

        var data = {};
        $form.find('input, textarea').each(function () {
            var k = $(this).attr('name');
            if (k) data[k] = $(this).val();
        });

        var parts     = $.trim(name).split(/\s+/);
        var firstName = parts[0] || '';
        var lastName  = parts.slice(1).join(' ');

        var payload = {
            first_name:          firstName,
            last_name:           lastName,
            email:               email,
            phone:               phone,
            message:             data['message'] || '',
            website:             window.location.href,
            consent:             true,
            hidden_ip:           '',
            hidden_page_url:     window.location.href,
            hidden_utm_source:   data['utm_source'] || '',
            hidden_utm_medium:   data['utm_medium'] || '',
            hidden_utm_campaign: data['utm_campaign'] || '',
            hidden_gclid:        data['gclid'] || '',
            hidden_fbclid:       data['fbclid'] || ''
        };

        $btn.prop('disabled', true).html('<span class="lp-btn-spinner"></span> Sending...');
        $msg.text('').css('color', '');

        $.ajax({
            url:         LEADORBIT_URL,
            type:        'POST',
            contentType: 'application/json',
            data:        JSON.stringify(payload),
            dataType:    'json',
            headers:     { 'X-Api-Key': LEADORBIT_KEY },
            success: function () {
                $btn.html('<span class="lp-btn-spinner"></span> Redirecting...');
                window.location.href = 'thankyou.html';
            },
            error: function () {
                $btn.prop('disabled', false).html('Get Started <i class="fas fa-arrow-right"></i>');
                $msg.text('Could not send. Please try again.').css('color', '#e53e3e');
            }
        });
    }

    $(document).on('submit', '.lp-lead-form', function (e) {
        e.preventDefault();
        submitLeadForm($(this));
    });
});

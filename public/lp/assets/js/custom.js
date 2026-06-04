$(document).ready(function () {
    
    
    var data = {
        "title" : 'Beginner',
        "priceText": '$149',
        "description" : "1 Page Squarespace Website Design \n1 Design Concept 3 Stock Images \nContent Integration \nDedicated Account Manager \nContact Form Integration ($100) \nMobile Responsive Website ($200) \n24/7 Chat Support \nTurn Around 5 Business Days"
    };
    localStorage.setItem('package_details',JSON.stringify(data));
    
    switchDiv();

    $("li:first-child").addClass("first");
    $("li:last-child").addClass("last");

    $('[href="#"]').attr("href", "javascript:;");

    $(".menu-Bar").click(function () {
        $(this).toggleClass("open");
        $(".menuWrap").toggleClass("open");
        $("body").toggleClass("ovr-hiddn");
    });

    $(".loginUp").click(function () {
        $(".LoginPopup").fadeIn();
        $(".overlay").fadeIn();
    });

    $(".signUp").click(function () {
        $(".signUpPop").fadeIn();
        $(".overlay").fadeIn();
    });

    $(".closePop,.overlay").click(function () {
        $(".popupMain").fadeOut();
        $(".overlay").fadeOut();
    });

    $(".menu .menu-item-has-children").addClass("dropdown-nav ");
    $(".menu .menu-item-has-children ul.sub-menu").addClass("dropdown");



    /* Tabbing Function */
    $("[data-targetit]").on("click", function (e) {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        var target = $(this).data("targetit");
        $("." + target).siblings('[class^="box-"]').hide();
        $("." + target).fadeIn();
        $(".tabViewList").slick("setPosition", 0);
    });

    // Accordian
    $('.accordion-list > li > .answer').hide();

    $('.accordion-list > li').click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active").find(".answer").slideUp();
        } else {
            $(".accordion-list > li.active .answer").slideUp();
            $(".accordion-list > li.active").removeClass("active");
            $(this).addClass("active").find(".answer").slideDown();
        }
        return false;
    });

    $("li.dropdown-nav").hover(function () {
        $(this).children("ul").stop(true, false, true).slideToggle(300);
    });

    $(".searchBtn").click(function () {
        $(".searchWrap").addClass("active");
        $(".overlay").fadeIn("active");
        $(".searchWrap input").focus();
        $(".searchWrap input").focusout(function (e) {
            $(this).parents().removeClass("active");
            $(".overlay").fadeOut("active");
            $("body").removeClass("ovr-hiddn");
        });
    });

    $(".index-slider").slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1
    });

});



$(window).on("load", function () {
    var currentUrl = window.location.href.substr(
        window.location.href.lastIndexOf("/") + 1
    );
    $("ul.menu li a").each(function () {
        var hrefVal = $(this).attr("href");
        if (hrefVal == currentUrl) {
            $(this).removeClass("active");
            $(this).closest("li").addClass("active");
            $("ul.menu li.first").removeClass("active");
        }
    });
});

/* RESPONSIVE JS */
if ($(window).width() < 824) { }

function switchDiv() {
    var $window = $(window).outerWidth();
    if ($window <= 768) {
        $(".topAppendTxt").each(function () {
            var getdtd = $(this).find(".cloneDiv").clone(true);
            $(this).find(".cloneDiv").remove();
            $(this).append(getdtd);
        });
    }
}

function goToScroll(e) {
    $("html, body").animate({
        scrollTop: $("." + e).offset().top
    }, 1000);
}

$(document).ready(function () {
    $('.popdynamic').click(function () {
        $('.centercont.static').addClass('d-none');
        $('.centercont.dynamic').removeClass('d-none');
        $('.overlay').fadeIn();
        $('#popdynamic').fadeIn();
        $('.LoginPopup').addClass('price-margin');
        var packtitle = $(this).closest('.pckg').find(" .title").html();
        var packprice = $(this).closest('.pckg').find(".price .amount").html();
        var thisrel = $(this).attr('rel');
        $('input[name="pkg_key"]').val(thisrel);
        $('#popupform input#popuppackage').val(thisrel);
        
        package_html = $(this).closest('.pckg').find('.bottom').find('ul').text();
        console.log(package_html);
        package_html = package_html.replaceAll('<ul>', '');
        package_html = package_html.replaceAll('</ul>', '');
        package_html = package_html.replaceAll('<li>', '');
        package_html = package_html.replaceAll('<li class="first">', '');
        package_html = package_html.replaceAll('<li class="last">', '');
        package_html = package_html.replaceAll('</li>', '');
        package_html = package_html.replaceAll('<i class=\"fas fa-check-circle\"></i>', '');
        
        
        //package_html = "<ul>"+package_html+"</ul>";
        package_html = package_html.replaceAll('\n                                            ','\n');
        
        packprice = packprice.replaceAll('<small>$</small>','$');
        //html = html.replaceAll('\n', '<br>');
        

        var data = {
            "title" : packtitle,
            "priceText": packprice,
            "description" : package_html
        };
        localStorage.setItem('package_details',JSON.stringify(data));
        
        
        $(".centercont.dynamic h3 span").html(packtitle);
        $(".centercont h4").html("In Just <span>" + packprice + "</span>");
    });



    $('.popbtn2').click(function () {
        $('.centercont.static').addClass('d-none');
        $('.centercont.dynamic').removeClass('d-none');
        $('.overlay').fadeIn();
        $('#popdynamic').fadeIn();
        $('.LoginPopup').addClass('price-margin');
        var packtitle = $(this).closest('.pckg2').find(".label").html();
        var packprice = $(this).closest('.pckg2').find(".price").html();
        var thisrel = $(this).attr('rel');
        $('input[name="pkg_key"]').val(thisrel);
        $('#popupform input#popuppackage').val(thisrel);
        $(".centercont.dynamic h3 span").html(packtitle);
        $(".centercont h4").html("In Just <span>" + packprice + "</span>");
    });

    $('.closeico,.overlay').click(function () {
        $('.popupmain').fadeOut();
        $('.overlay').fadeOut();
    });

    $('.popstatic').click(function () {
        $('.centercont.static').removeClass('d-none');
        $('.centercont.dynamic').addClass('d-none');
        $('#popstatic').fadeIn();
        $('.overlay').fadeIn();
        var orgtexts = '$99';
        
        var data = {
            "title" : 'Beginner',
            "priceText": '$149',
            "description" : "1 Page Squarespace Website Design \n1 Design Concept 3 Stock Images \nContent Integration \nDedicated Account Manager \nContact Form Integration ($100) \nMobile Responsive Website ($200) \n24/7 Chat Support \nTurn Around 5 Business Days"
        };
        localStorage.setItem('package_details',JSON.stringify(data));
        
        $(".centercont h4").html("in Just <span>" + orgtexts + "</span>");
    });

    $(window).scroll(function () {
        var header = $('header'),
            scroll = $(window).scrollTop();

        if (scroll >= 1) {
            header.addClass('sticky');
        }
        if (scroll <= 0) {
            header.removeClass('sticky');
        }

    });

});

// counter
$(window).on("scroll", function (e) {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
    }

    if($('.goto').length > 0){
        if ($(window).scrollTop() >= $(".goto").offset().top - $(window).height()) {
           
            if (!$(".goto").hasClass("animated")) {
                $(".count").each(function () {
                    $(this)
                        .prop("Counter", 0)
                        .animate(
                            {
                                Counter: $(this).text(),
                            },
                            {
                                duration: 4000,
                                easing: "swing",
                                step: function (now) {
                                    $(this).text(numberWithCommas(Math.ceil(now)));
                                },
                            }
                        );
                });
                // $("#triggered").addClass("show");
                $(".goto").addClass("animated");
            }
        }
    }
});

$('.countrylist').change(function () {
    var thisval = $(this).children('option:selected').val();
    var thiscode = $(this).children('option:selected').attr('data-abbr');
    $(this).closest('.newcountrycode ').find('.countrycode').attr("value", "+" + thisval);

    if (thiscode == 'CA') {
        $(this).siblings('span').removeClass();
        $(this).siblings('span').addClass('fgca');
    } else {
        $(this).siblings('span').removeClass();
        $(this).siblings('span').addClass('fg' + thisval);
    }
});


$(".portfolio-slider").slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 4,
    responsive: [
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                arrows: false,
                centerPadding: '60px',
            }
        }
    ]
});

$('.design-card-list').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    cssEase: 'linear',
    dots: false,
    arrows: false,
    responsive: [
        {
            breakpoint: 1025,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 885,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 600,
            settings: {
                cssEase: 'ease',
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
});


$('.design-card-list-2').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    rtl: true,
    autoplaySpeed: 0,
    speed: 8000,
    cssEase: 'linear',
    dots: false,
    arrows: false,
    responsive: [
        {
            breakpoint: 1025,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 885,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 600,
            settings: {
                cssEase: 'ease',
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
});


if ($(window).width() > 1200) {
    $('.has-child.hover').hover(
        function () {
            $(this).children('.dropdown').stop(true, false, true).slideDown(500);
            $(this).find('.chev').addClass('rotate');
        },
        function () {
            $(this).children('.dropdown').stop(true, false, true).slideUp(500);
            $(this).find('.chev').removeClass('rotate');
        }
    );
}
else {
    $('.has-child.hover').click(function () {
        $('.has-child').not($(this)).find('.dropdown').stop(true, false, true).slideUp(500);
        $('.has-child').not($(this)).find('.chev').removeClass('rotate');
        $(this).children('.dropdown').stop(true, false, true).slideToggle(500);
        $(this).find('.chev').toggleClass('rotate');
    });
}

$('.has-child.click').click(function () {
    $('.has-child').not($(this)).find('.dropdown').stop(true, false, true).slideUp(500);
    $('.has-child').not($(this)).find('.chev').removeClass('rotate');

    $(this).find('.dropdown').stop(true, false, true).slideToggle(500);
    $(this).find('.chev').toggleClass('rotate');

});




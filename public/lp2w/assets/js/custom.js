$(document).ready(function () {
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
        $(".pckg-slider").slick("setPosition", 0);
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
    // Lead popups are handled by React LeadFormProvider (LpCtaButton / LpPackageButton).

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

window.initLp2wSliders = function () {
    if (typeof $ === "undefined" || !$.fn || !$.fn.slick) return;

    var $trusted = $(".trusted-slider");
    if ($trusted.length && !$trusted.hasClass("slick-initialized")) {
        $trusted.slick({
            slidesToShow: 9,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 8000,
            cssEase: "linear",
            dots: false,
            arrows: false,
            responsive: [
                { breakpoint: 1025, settings: { slidesToShow: 9 } },
                { breakpoint: 885, settings: { slidesToShow: 6 } },
                {
                    breakpoint: 600,
                    settings: { cssEase: "ease", slidesToShow: 3 },
                },
            ],
        });
    }

    var $design = $(".design-card-list");
    if ($design.length && !$design.hasClass("slick-initialized")) {
        $design.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 8000,
            cssEase: "linear",
            dots: false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: { slidesToShow: 3, slidesToScroll: 3 },
                },
                {
                    breakpoint: 885,
                    settings: { slidesToShow: 2, slidesToScroll: 1 },
                },
                {
                    breakpoint: 600,
                    settings: {
                        cssEase: "ease",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
    }

    var $design2 = $(".design-card-list-2");
    if ($design2.length && !$design2.hasClass("slick-initialized")) {
        $design2.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            rtl: true,
            autoplaySpeed: 0,
            speed: 8000,
            cssEase: "linear",
            dots: false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: { slidesToShow: 3, slidesToScroll: 1 },
                },
                {
                    breakpoint: 885,
                    settings: { slidesToShow: 2, slidesToScroll: 1 },
                },
                {
                    breakpoint: 600,
                    settings: {
                        cssEase: "ease",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
    }

    var $testi = $(".testi-slider");
    if ($testi.length && !$testi.hasClass("slick-initialized")) {
        $testi.slick({
            dots: false,
            arrows: false,
            infinite: true,
            autoplay: false,
            speed: 300,
            slidesToShow: 4,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: { slidesToShow: 3, slidesToScroll: 3 },
                },
                {
                    breakpoint: 885,
                    settings: { slidesToShow: 2, slidesToScroll: 1 },
                },
                {
                    breakpoint: 600,
                    settings: {
                        cssEase: "ease",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
    }
};

if (document.readyState === "complete") {
    window.initLp2wSliders();
} else {
    $(window).on("load", function () {
        window.initLp2wSliders();
    });
}

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


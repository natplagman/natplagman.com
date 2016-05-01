var $footer = $("footer");
var $footerBanner = $("#footer_banner");
var $galleryItems = $(".galleryItem");

var footerRelative = function () {
    $footer.removeAttr("style");
    $footer.css({
        "visibility": "visible",
        "height": "auto",
        "padding-top": "1em"
    });
    $footerBanner.removeAttr("style");
    $footerBanner.css({
        "overflow": "visible",
        "position": "relative",
        "bottom": "auto",
        "height": "auto"
    });
    $footerBanner.children().css({
        "position": "relative",
        "top": "auto"
    });
};

var footerFixed = function (y) {
    if (y < 0) { y = 0; }
    var pageHeight = document.body.offsetHeight - window.innerHeight;

    if (pageHeight - y < 220) {
        $footer.removeAttr("style");
        $footerBanner.removeAttr("style");
        $footer.css("visibility", "visible");
        var h = (200 - (pageHeight - y));
        if (h < 0) { h = 0; }
        $footerBanner.css("height", h + "px");
        $footerBanner.children().css("top", (y - pageHeight) + "px");
    } else {
        $("footer").css("visibility", "hidden");
    }
};

window.onscroll = function (event) {
    if ($(window).width() <= 600) {
        footerRelative();
	} else {
        footerFixed(window.scrollY);
    }
};

$galleryItems.on({
    mouseenter: function () {
        $(this).addClass("galItemHover");
    },
    mouseleave: function () {
        $(this).removeClass("galItemHover");
    }
});

$(".skillBar").on({
    mouseenter: function () {
        $(".galleryItem[langtag=" + $(this).attr("langtag") + "]").addClass("galItemHover");
    },
    mouseleave: function () {
        $(".galleryItem[langtag=" + $(this).attr("langtag") + "]").removeClass("galItemHover");
    }
});

$(document).ready(function () {
    window.onscroll();
});

$(window).resize(function () {
    window.onscroll();
});
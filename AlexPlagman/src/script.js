var $footer = $("footer");
var $footerBanner = $("#footer_banner");
var $galleryItems = $(".galleryItem");

window.onscroll = function (event) {
    if ($(window).width() <= 600) {
        $footer.removeAttr("style");
        $footer.css("visibility", "visible");
        $footer.css("height", "auto");
        $footer.css("padding-top", "1em");
        $footerBanner.removeAttr("style");
        $footerBanner.css("overflow", "visible");
        $footerBanner.css("position", "relative");
        $footerBanner.css("bottom", "auto");
        $footerBanner.css("height", "auto");
        $footerBanner.children().css("position", "relative");
	} else {
        var y = window.scrollY;
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
    }
};

$galleryItems.on({
    mouseenter: function () {
        window.onscroll();
    },
    mouseleave: function () {
        window.onscroll();
    }
});

$(document).ready(function () {
    window.onscroll();
});

$(window).resize(function () {
    window.onscroll(); 
});
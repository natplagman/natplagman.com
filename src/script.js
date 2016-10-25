(function ($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */

    $.fn.visible = function (partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

})(jQuery);

var $footer = $("footer");
var $footerBanner = $("#footer_banner");
var $galleryItems = $(".galleryItem");
var allMods = $(".visModule");

allMods.each(function (i, el) {
    var el = $(el);
    if (el.visible(true)) {
        el.addClass("already-visible");
    }
});

var footerRelative = function () {
    $footer.removeAttr("style");
    $footer.css({
        "visibility": "visible",
        "height": "auto"
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
    if (y < 0) {
        y = 0;
    }
    var pageHeight = document.body.offsetHeight - window.innerHeight;

    if (pageHeight - y < 220) {
        $footer.removeAttr("style");
        $footerBanner.removeAttr("style");
        $footer.css("visibility", "visible");
        var h = (215 - (pageHeight - y));
        if (h < 0) {
            h = 0;
        }
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

    allMods.each(function (i, el) {
        var el = $(el);
        setTimeout(function () {
            if (el.visible(true)) {
                el.addClass("come-in");
            }
        }, 75 * i);
    });
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
    $('html, body').hide();
    $(".flexnav").flexNav();
    if (window.location.hash) {
        setTimeout(function () {
            $('html, body').scrollTop(0).show();
            $('html, body').animate({
                scrollTop: $(window.location.hash).offset().top - 50
            }, 400)
        }, 0);
    } else {
        $('html, body').show();
    }
    $galleryItems.matchHeight();
    imageSizes();
    entryDate();
    window.onscroll();
});

$(window).resize(function () {
    $galleryItems.matchHeight._update();
    window.onscroll();
});

$(".loadimg").on("click", function (event) {
    var $figure = $(this).siblings("figure");
    var $caption = $(this).siblings("figcaption");
    $caption.css("height", "auto");
    var img = new Image();
    img.onload = function () {
        var iwidth = $(this).width();
        $figure.css("width", "0px");
        $figure.css("visibility", "visible");
        $figure.animate({
            width: iwidth
        }, 100, function () {
            $figure.removeAttr("style");
            $caption.css("visibility", "visible");
            window.onscroll();
        });
    }
    $figure.css("visibility", "hidden");
    if ($(this).data("url").split('.').pop() === "gif") {
        $(img).attr("data-gifffer", $(this).data("url"));
        $figure.append(img);
        var cb = function () {
            var iwidth = $(this).width();
            $figure.css("width", "0px");
            $figure.css("visibility", "visible");
            $figure.animate({
                width: "100%"
            }, 100, function () {
                $caption.css("visibility", "visible");
                window.onscroll();
            });
        }
        Gifffer(cb);
    } else {
        img.src = $(this).data("url");
        $figure.append(img);
    }
    $("footer").css("visibility", "hidden");
    $(this).hide();
});

imageSizes = function () {
    $(".loadimg").each(function (i, e) {
        $(e).text("Load Image");
        getFileSize(e, $(this).data("url"));
    });
}

function getFileSize(e, url) {
    var fileSize = '';
    var http = new XMLHttpRequest();
    http.open('HEAD', url, true); // true = Asynchronous
    http.onreadystatechange = function () {
        if (this.readyState == this.DONE) {
            if (this.status === 200) {
                fileSize = this.getResponseHeader('content-length') / 1024; //kb
                $(e).text($(e).text() + " (" + sizeUnits(fileSize) + ")");
            }
        }
    };
    http.send();
}

sizeUnits = function (fileSize) {
    if (fileSize < 1024) {
        return Math.round(fileSize * 100) / 100 + " kb";
    } else {
        return Math.round(fileSize / 1024 * 100) / 100 + " mb";
    }
}

Date.daysBetween = function (date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
}

Date.getMonthName = function (date) {
    var month = date.getMonth();
    switch (month + 1) {
        default: return "December";
        case (1):
                return "January";
        case (2):
                return "February";
        case (3):
                return "March";
        case (4):
                return "April";
        case (5):
                return "May";
        case (6):
                return "June";
        case (7):
                return "July";
        case (8):
                return "August";
        case (9):
                return "September";
        case (10):
                return "October";
        case (11):
                return "November";
    }
}

Date.getDayName = function (date) {
    var day = date.getDate();
    var suffix;
    switch (day % 10) {
        default: suffix = "th";
        break;
        case (1):
                suffix = "st";
            break;
        case (2):
                suffix = "nd";
            break;
        case (3):
                suffix = "rd";
            break;
    }

    return day + suffix;
}

var entryDate = function () {
    var $entry = $("#entry");
    if ($entry.size() == 0) {
        return;
    }
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    var dmy = $entry.attr("date").split('/');
    var date = new Date(dmy[0], dmy[1] - 1, dmy[2]);
    var diff = Date.daysBetween(date, today);
    $("#entryTimeStamp").text("Posted " + diff + " days ago on " + Date.getMonthName(date) + " " + Date.getDayName(date) + ", " + (date.getYear() + 1900));
}

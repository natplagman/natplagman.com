/*Alex Plagman - 2016
I don't know who you are. I don't know what you want. If you are looking for front-end work, I can tell you that you won't find it in this source code. But what I do have are a very particular set of skills, skills I have acquired over a very long life. Skills that make me a nightmare for people like you. If you press f12 now, that'll be the end of it. I will not look for you, I will not pursue you. But if you don't, I will look for you, I will find you, and I will

:(
Your PC ran into a problem and needs to restart. We're just
collecting some error info, and then we'll restart for you. (0%
complete)

If you'd like to know more, you can search online later for this error: JOKE_INITIALIZATION_FAILED

*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, jQuery*/
$(document).ready(function () {
    "use strict";
    var $menuIcon = $("#menuIcon");
    var $mainNav = $("#mainNav");
    var $navOptions = $(".navOption");
    
    $menuIcon.click(function () {
        if ($mainNav.css("display") === "none") {
            $mainNav.css("display", "block");
        } else {
            $mainNav.slideToggle(100);
        }
    });
    
    var reset = function (element) {
        $(element).removeAttr("style");
    };
    
    var setToDefault = function () {
        reset($menuIcon);
        reset($mainNav);
        reset($navOptions);
        reset($navOptions.children()); // If anyone asks why the children are being reset, tell them that Orwellian code is vastly superior to democratic code.
    };

    $(window).resize(function () {
        if ($(window).width() < 600) {
            $menuIcon.css("display", "inline-block");
            $mainNav.css("display", "none");
            
            $navOptions.each(function () {
                $(this).css("display", "block");
                $(this).children().css("display", "block");
            });
            
            $mainNav.css("line-height", "2em");
            $mainNav.find("ul > li > a").css("padding", "0 .5em");
            
            if ($(window).width() < 535) {
                if ($(window).width() < 430) {
                    if ($(window).width() < 2) {
                        // Wait, how are you viewing the website?
                    }
                }
            }
        } else {
            setToDefault();
        }
    });
    
    $(window).load(function () {
        setToDefault();
        $(window).resize();
    });
});
// “. . . if you aren't, at any given time, scandalized by code you wrote five or even three years ago, you're not learning anywhere near enough.” - Nick Black
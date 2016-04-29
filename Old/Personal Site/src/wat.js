/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, jQuery*/
$(document).ready(function () {
    "use strict";
    var $menuIcon = $("#menuIcon");
    var $mainNav = $("#mainNav");
    var $navOptions = $(".navOption");
    
    $menuIcon.click(function () {
        $mainNav.animate({
            width: "toggle"
        }, 100);
    });
    
    var setToDefault = function () {
        $menuIcon.css("display", "none");
        
        $mainNav.css("display", "inline-block");
        $mainNav.find("ul > li > a").css("padding", "0 1.1em");
        
        $navOptions.css("display", "inline-block");
        
        $(".lead > span").css("font-size", "3em");
        $("#desc").css("font-size", "5em");
        $("#desc").css("padding-left", "2em");
    };

    $(window).resize(function () {
        if ($(window).width() < 600) {
            $menuIcon.css("display", "inline-block");
            
            $navOptions.each(function () {
                if ($(this).css("display") === "inline-block") {
                    $mainNav.css("display", "none");
                }
                $(this).css("display", "block");
            });
            
            $mainNav.css("line-height", "2em");
            $mainNav.find("ul > li > a").css("padding", "0 .5em");
            
            if ($(window).width() < 535) {
                $(".lead > span").css("font-size", "3em");
                $("#desc").css("font-size", "4em");
                $("#desc").css("padding-left", "1.5em");
                         
                if ($(window).width() < 430) {
                    $(".lead > span").css("font-size", "2em");
                    $("#desc").css("font-size", "3em");
                    $("#desc").css("padding-left", "1em");
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
//= require "gsap"
//= require "ScrollMagic"
//= require "animation.gsap"
//= require "debug.addIndicators"

$( document ).ready(function() {


    // TEXT_SPLITING_ANIMATION
    //========================================================
    var animationTime = 0.4;
    var elementsToSplit = ".intro__presentation";

    //Split span by words

    var arr = $(elementsToSplit).text().split(" ");
    var text="";
    for (i = 0; i < arr.length; ++i) {
        text+= "<span class='words word" + i + "'>" + arr[i] + "&nbsp;" + "</span>";
    }
    $(".intro__presentation").html(text);

    //generate class calling

    var $span = [];

    for (i = 0; i <= arr.length; ++i) {
        $span[i] = $(".word"+i);
    }

    function splitAnimation() {
        splitAnimation = new TimelineLite();
        splitAnimation.staggerFrom($span, animationTime*2, {y: '+=40', autoAlpha: 0, ease:Power4.easeInOut}, 0.16);
        return splitAnimation;
    }

    // MENU_ANIMATION
    //========================================================

    function menuAnimation() {
        menuAnimation = new TimelineLite();
        menuAnimation.from('.logo', animationTime*1.5, {scaleX:0, scaleY:0, ease:Power4.easeInOut});
        menuAnimation.from('.studio-name', animationTime*1.5, {y: '-=40', autoAlpha: 0, ease:Power4.easeInOut}, 0);
        menuAnimation.from('.menu', animationTime*1.5, {x: '-=40', autoAlpha: 0, ease:Power4.easeInOut}, 0);
        return menuAnimation;
    }

    // MASTER_ANIMATION
    //========================================================

    //Manage all the animations
    
    master = new TimelineLite();

    master.add(splitAnimation(), '-=0.6');

    // SUMMARY_ANIMATION
    //========================================================

    var $summaryPart1 = [$("#summary__work-cover1"), $("#summary__work-cover2"), $("#summary__work-cover3"), $("#summary__work-cover4"), $("#summary__work-cover5")];
    var $summaryPart2 = [$("#summary__about-cover1"), $("#summary__about-cover2"), $("#summary__about-cover3"), $("#summary__about-cover4"), $("#summary__about-over5")];
    var $summaryPart3 = [$("#summary__journal-cover1"), $("#summary__journal-cover2")];

    // init
    var ctrl = new ScrollMagic.Controller({
    });

    // Create scenes
    $("#trigger1").each(function(i) {
        var tl1 = new TimelineMax();
        tl1.staggerTo($summaryPart1, animationTime, {y: -80, autoAlpha: 1, ease: Power4.easeOut}, animationTime/6);
        new ScrollMagic.Scene({
            triggerElement: this,
        })
        .setTween(tl1)
        .addTo(ctrl);
    });

    $("#trigger2").each(function(i) {
        var tl2 = new TimelineMax();
        tl2.staggerTo($summaryPart2, animationTime, {y: -80, autoAlpha: 1, ease: Power4.easeOut}, animationTime/6);
        new ScrollMagic.Scene({
            triggerElement: this,
        })
        .setTween(tl2)
        .addTo(ctrl);
    });

    $("#trigger3").each(function(i) {
        var tl3 = new TimelineMax();
        tl3.staggerTo($summaryPart3, animationTime, {y: -80, autoAlpha: 1, ease: Power4.easeOut}, animationTime/6);
        new ScrollMagic.Scene({
            triggerElement: this,
        })
        .setTween(tl3)
        .addTo(ctrl);
    });

    // PICTURES_ANIMATION
    //========================================================

    // loop through all elements
    $('.column__img').each(function() {
        // build a tween
        var tweenimg = TweenMax.from($(this), animationTime, {autoAlpha: 0, scale: 0.95, y: '+=40', ease: Power4.easeOut});

        // build a scene
        var sceneimg = new ScrollMagic.Scene({
            triggerHook: 0.75,
            triggerElement: this
        })
        .setTween(tweenimg) // trigger a TweenMax.to tween
        .addTo(ctrl);      
    });

    // MENU_PAGE_STATE
    //========================================================

    var pageState = window.location.pathname
    if (pageState == '/work.html') {
        $('.menu__li').removeClass('menu__li--active')
        $('.menu__li').eq(0).addClass('menu__li--active')
    } else if (pageState == '/about.html') {
        $('.menu__li').removeClass('menu__li--active')
        $('.menu__li').eq(1).addClass('menu__li--active')
    } else if (pageState == '/journal.html') {
        $('.menu__li').removeClass('menu__li--active')
        $('.menu__li').eq(2).addClass('menu__li--active')
    }

    // MENU_PAGE_STATE
    //========================================================

});

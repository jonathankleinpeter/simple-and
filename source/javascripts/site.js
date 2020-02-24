//= require "gsap"
//= require "ScrollMagic"
//= require "animation.gsap"
//= require "debug.addIndicators"
//= require "barba"

$( document ).ready(function() {

    // init
        var ctrl = new ScrollMagic.Controller({
    });

    Barba.Pjax.start();
    var animationTime = 0.4;

    // This is the js associate with a specific page. This will be loaded by Barba.js when the user tries to load the associated page

    var Homepage = Barba.BaseView.extend({
        namespace: 'homepage',
        onEnter: function() {

            // TEXT_SPLITING_ANIMATION
            //========================================================

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

            // MASTER_ANIMATION
            //========================================================

            master = new TimelineLite();
            master.add(splitAnimation(), '-=0.6');
            //Manage all the animations

            // SUMMARY_ANIMATION
            //========================================================

            var $summaryPart1 = [$("#summary__work-cover1"), $("#summary__work-cover2"), $("#summary__work-cover3"), $("#summary__work-cover4"), $("#summary__work-cover5")];
            var $summaryPart2 = [$("#summary__about-cover1"), $("#summary__about-cover2"), $("#summary__about-cover3"), $("#summary__about-cover4"), $("#summary__about-over5")];
            var $summaryPart3 = [$("#summary__journal-cover1"), $("#summary__journal-cover2")];

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

            // REINITIATE PAGE_STATE
            //========================================================
            $('.menu__li').removeClass('menu__li--active')
        }
    });

    var Work = Barba.BaseView.extend({
        namespace: 'work',
        onEnter: function() {

            // TOOLTIP
            //========================================================

            var tooltip = document.querySelectorAll('.titletip');
            
            document.addEventListener('mousemove', fn, false);
            function fn(e) {
                for (var i=tooltip.length; i--;) {
                    tooltip[i].style.left = e.clientX + 'px';
                    tooltip[i].style.top = e.clientY + 'px';
                    tooltip[i].style.transition = '0.2s';
                }
            }
        }
    });

    // Init the specific js pages

    Homepage.init();
    Work.init();

    Barba.Dispatcher.on('transitionCompleted', function() {
        // PICTURES_ANIMATION
        //========================================================

        // loop through all elements
        $('.column__img').each(function() {
            // build a tween
            var tweenimg = TweenMax.from($(this), animationTime, {autoAlpha: 0, scale: 0.95, y: '+=40', ease: Power4.easeOut});

            // build a scene
            var sceneimg = new ScrollMagic.Scene({
                triggerHook: 0.85,
                triggerElement: this
            })
            .setTween(tweenimg) // trigger a TweenMax.to tween
            .addTo(ctrl);
        });
    });

    Barba.Dispatcher.on('newPageReady', function() {
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

        // facebook share button

        $(".facebookShareLink").on("click",function(currentStatus, oldStatus, container){
            var linkToShare = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href + "&amp;src=sdkpreparse"
            var fbpopup = window.open(linkToShare, "pop", "width=600, height=400, scrollbars=no");
            return false;
        });
    });

    // HEAD_RELOAD
    //========================================================

    Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
        // html head parser borrowed from jquery pjax
        var $newPageHead = $( '<head />' ).html(
            $.parseHTML(
                newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
                , document
                , true
            )
        );
        var headTags = [
            //"meta[name='keywords']",
            "meta[name='description']",
            "meta[property^='og']",
            //"meta[name^='twitter']",
            //"meta[itemprop]",
            //"link[itemprop]",
            //"link[rel='prev']",
            //"link[rel='next']",
            //"link[rel='canonical']"
        ].join(',');
        $( 'head' ).find( headTags ).remove(); // Remove current head tags
        $newPageHead.find( headTags ).appendTo( 'head' ); // Append new tags to the head
    });

    // BARBA BASIC PAGE TRANSITION
    //========================================================

    Barba.Pjax.start();
    var FadeTransition = Barba.BaseTransition.extend({
        start: function() {
            /**
            * This function is automatically called as soon the Transition starts
            * this.newContainerLoading is a Promise for the loading of the new container
            * (Barba.js also comes with an handy Promise polyfill!)
            */

            // As soon the loading is finished and the old page is faded out, let's fade the new page
            Promise
            .all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this));
        },

        fadeOut: function() {
            /**
             * this.oldContainer is the HTMLElement of the old Container
             */

            return $(this.oldContainer).animate({ opacity: 0}, 300).promise();
        },

        fadeIn: function() {
            /**
            * this.newContainer is the HTMLElement of the new Container
            * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
            * Please note, newContainer is available just after newContainerLoading is resolved!
            */
            var _this = this;
            var $el = $(this.newContainer);
            $(this.oldContainer).hide();

            $el.css({
                visibility : 'visible',
                opacity : 0
            });

            $el.animate({ opacity: 1}, 300, function() {
                /**
                * Do not forget to call .done() as soon your transition is finished!
                * .done() will automatically remove from the DOM the old Container
                */
                _this.done();
            });
            $(window).scrollTop(0);
        }
    });

    /**
    * Next step, you have to tell Barba to use the new Transition
    */

    Barba.Pjax.getTransition = function() {
        /**
        * Here you can use your own logic!
        * For example you can use different Transition based on the current page or link...
        */

        return FadeTransition;
    };

   
});

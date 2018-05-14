//= require "gsap"
//= require "ScrollMagic"
//= require "animation.gsap"
//= require "debug.addIndicators"

$( document ).ready(function() {

	//______________________TEXT_SPLITING_ANIMATION______________________//

	var elementsToSplit = ".presentation";
	var animationTime = 0.4;

	//Split span by words

	var arr = $(elementsToSplit).text().split(" ");
	var text="";
	for (i = 0; i < arr.length; ++i) {
	    text+= "<span class='words word" + i + "'>" + arr[i] + "&nbsp;" + "</span>";
	}
	$(".presentation").html(text);

	//generate class calling

    var $span = [];

    for (i = 0; i <= arr.length; ++i) {
  		$span[i] = $(".word"+i);
  	}

	//render animation

  	function textSpliting() {
 		textSpliting = new TimelineLite();
    	textSpliting.staggerFrom($span, animationTime*2, {y: '+=40', autoAlpha: 0, ease:Power4.easeInOut}, 0.16);
    	return textSpliting;
	}

    //______________________MENU_ANIMATION_____________________//

    function menuAnimation() {
	    menuAnimation = new TimelineLite();
		menuAnimation.from('.block-author', animationTime*2, {y: '-=40', autoAlpha: 0, ease:Power4.easeInOut});
		menuAnimation.from('.block-menu', animationTime*2, {x: '-=40', autoAlpha: 0, ease:Power4.easeInOut}, 0);
		return menuAnimation;
	}

	//______________________MASTER_ANIMATION_____________________//

	//Manage all the animations
	
	master = new TimelineLite();

	master.add(menuAnimation())
	master.add(textSpliting(), '-=0.6');

	//______________________MASTER_ANIMATION_____________________//

	var $summaryPart1 = [$("#workCover1"), $("#workCover2"), $("#workCover3"), $("#workCover4"), $("#workCover5")];
	var $summaryPart2 = [$("#aboutCover1"), $("#aboutCover2"), $("#aboutCover3"), $("#aboutCover4"), $("#aboutCover5")];
	var $summaryPart3 = [$("#contactCover1"), $("#contactCover2"), $("#contactCover3"), $("#contactCover4"), $("#contactCover5")];
	var $summaryPart4 = [$("#blogCover1"), $("#blogCover2")];

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
	$("#trigger4").each(function(i) {
	  var tl4 = new TimelineMax();
	  tl4.staggerTo($summaryPart4, animationTime, {y: -80, autoAlpha: 1, ease: Power4.easeOut}, animationTime/6);

	  new ScrollMagic.Scene({
	      triggerElement: this,
	    })
	    .setTween(tl4)
	    .addTo(ctrl);

	});

});

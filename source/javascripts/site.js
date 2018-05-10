//= require "gsap"

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
		menuAnimation.from('.block-author', animationTime*2, {y: '-=100', autoAlpha: 0, ease:Power4.easeInOut});
		menuAnimation.from('.block-menu', animationTime*2, {x: '-=40', autoAlpha: 0, ease:Power4.easeInOut}, 0);
		return menuAnimation;
	}

	//______________________MASTER_ANIMATION_____________________//

	//Manage all the animations
	
	master = new TimelineLite();

	master.add(menuAnimation())
	master.add(textSpliting(), '-=0.6');
});
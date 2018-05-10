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

	//animate word by word

    var $span = [];

    for (i = 0; i <= arr.length; ++i) {
  		$span[i] = $(".word"+i);
  	}

 	tl = new TimelineLite();
    tl.staggerFrom($span, 0.8, {y: '+=40', autoAlpha: 0, ease:Power4.easeInOut}, 0.16);
});
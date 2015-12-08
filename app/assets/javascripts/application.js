//= require jquery
//= require jquery_ujs
//= require js.cookie
//= require_tree .
$( document ).ready(function() {
	
	function getSteps() {
		var $completed = $('.step-completed');
		if($completed.length) {
			if($completed.length === 1) {
				var stepsLeft = "Only 2 steps left.";
			} else if($completed.length === 2) {
				var stepsLeft = "Only 1 step left.";
			} else {
				var stepsLeft = "You're all set, well done!"
			}
		}
		$( "#onboardingmsg" ).text(stepsLeft);
	}
	var openedGmail = Cookies.get('OpenGmail');
	if(openedGmail === "1") {
		$("#gotogmail").addClass("step-completed");
		getSteps();
	} else {
		getSteps();
	}
	
	$("#gotogmail").click(function() {
		$(this).addClass("step-completed");
		getSteps();
		Cookies.set('OpenGmail', '1');
	});
	
});
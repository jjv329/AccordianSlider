$(function(){
	$('a#loginHook').click(function(){
		$('#loginForm_wrap').slideToggle(); 
		return false;
	});
	
	$('#loginForm_wrap').css('display', 'none');
	
	/*
	$('li.toggle').click(function(event) {
		if (event.target == this) {
			$(this).find('ul.options').slideToggle().end();
		}
	});
	$('ul.options').css('display', 'none');
	*/
});
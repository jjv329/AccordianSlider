$('.textDrop').css({opacity:0.2, transform: 'scale(8)'})
	.animate({opacity:0.8, transform:'scale(1)'},{duration:1000, easing:'easeInExpo', complete:function(){
        $('#dustPuffs').show().children('span').each(function(){
        	$(this).animate({opacity:0.2,transform:'scale(3,2)'},1500);
    	}).promise().done(function(){
			$(this).fadeOut(800).css({opacity:1, transform:'scale(1)'});
			$('.textDrop').animate({transform: 'translateX(-200px)'}, 500, 'easeOutElastic');
		});
	}});



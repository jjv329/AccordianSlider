;(function($,window, undefined) {
	'use strict';
	
	//Constructor
	$.AccordianMenu = function(options, selectedDOMelement) {
		
		this.$menuDiv = $(selectedDOMelement);
		this._init(options);
		
		
	};
	
	//Setup defaults property
	$.AccordianMenu.defaults = {
		speed: 250,
		easing: 'ease', 
		defaultItem: 0, 
		menuWidth: '415px', 
		sliceWidth: '90px'
	};
	//Object Defs
	$.AccordianMenu.prototype = {
	
		_init: function(options) {
			this.mergedOptions =  $.extend($.AccordianMenu.defaults, options);
			this.$menu = this.$menuDiv.children('ul');
			this.$menuItems = this.$menu.children('li');
			this.$imgWrapper = this.$menuItems.children('a');
			this.$menuItemsPreview = this.$imgWrapper.children('.menuPreview');
			this.totalItems = this.$menuItems.length;
			this.currentIndex = -1;
			
			this._clickHandler();
			this._openItem(this.mergedOptions.defaultItem);
		},
		
		_validCurrent: function() {
		return this.currentIndex >= 0 && this.currentIndex < this.totalItems ? true : false;
		},
		
		_openItem: function(openedIndex) {
			this.$imgWrapper.eq(openedIndex).click();
		},
		
		_clickHandler: function() {
			var self = this;
			
			this.$imgWrapper.click(function() {
				
				var $parentLI = $(this).parent();
			
				var clickedIndex = $parentLI.index();
			
				if (self.currentIndex === clickedIndex){
						self._slideItem($parentLI, false, 1500, 'easeOutQuint');
						self.currentIndex = -1;
				}else{
						if (self._validCurrent()){ self._slideItem(self.$menuItems.eq(self.currentIndex), false, 250, 'jswing');
																			}
						self.currentIndex = clickedIndex;
						self._slideItem($parentLI, true, 250, 'jswing');
				}

				return false;
			});
		},
		
		_slideItem: function($panelSlice, state, speed, easing, allClosed) {
			var $colorImage = $panelSlice.find('span.menuImage');
			
			var bwOption;
			var colorOption;
			
			if (state){
				bwOption = {width: this.mergedOptions.menuWidth};
				colorOption = {left: '0px'};
			} else {
				bwOption = {width: this.mergedOptions.sliceWidth};
				colorOption = {left: this.mergedOptions.sliceWidth};
			}
			
			if (state){
				this.$menuItemsPreview.stop().animate({opacity: 0.1},1000);
			} else {
				this.$menuItemsPreview.stop().animate({opacity: 1},1500);
			}
			$panelSlice.stop(true).animate(bwOption,speed,easing);
			$colorImage.stop(true).animate(colorOption, speed, easing);
			if (state) {
				$colorImage.animate({opacity: 1}, 2000);
			}else {
				$colorImage.css({opacity: 0.2});
			}
		}
		
	};
	//Define our plugin method (function)
	$.fn.accordianMenu = function(options) {

		if (typeof options === 'string') {
            
            // not as common, leave off code for now...
            
        }else {  // options !== 'string', usually meaning it is an object
            
            // here, this refers the jQuery object that was used
            // to call this plugin method ($('#subMenu'))
            this.each(function() {
                // here inside our eaches function "this" is now the current matched DOM element that each is on right now.
				//'this' refers to #subMenu
                var instance = $.data(this, 'accordianMenu');
                
                if (instance) {
                    instance._init();
                } else {
                    
                  instance = $.data(this, 'accordianMenu', new $.AccordianMenu(options, this));
                    
                }
                
            });
            
        }
		
		return this; // make our qtRotator plugin method chainable	
	
	};
	
})(jQuery, window);
function init(e){
    $('<div class="modal-backdrop custom_backdrop"><img src="http://kodekloud.s3.amazonaws.com/sites/554a79236e6f64713f000000/69e8cd982124dc73de1f5a67a627ee75/loading.gif" class="" alt=""></div>').appendTo(document.body);
    
    $(window).scroll(function(e){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
    //Click event to scroll to top
	$('.scrollToTop').click(function(e){
		$('html, body').animate({scrollTop : 0},800);
		e.preventDefault();
	});
	
	$('.accordion_header').click(function(e){
        $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
	});
}	
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }
    
    
    
    function close_popup() {
        $(".newsletter-box").hide();
    }
    var view_all = false;
    $(function(){

        $('input').val();

//        var logo_img = $(".logo img").attr("src");
//        $(".logo").hover(
//            function(){
//                $(this).find("img").attr("src", "{{1818 | get_image_url}}");
//            },function(){
//                $(this).find("img").attr("src", logo_img);
//            }
//        );
        
        
        
        $("#main-nav ul li.menu_item, .toggle_sub_menu").hover(
            function(){
                $(this).find("img").show();
            },function(){
                $(this).find("img").hide();
            }
        );
        
        $(".sub_menu_li").hover(
            function(){
                $(this).find("ul").show();
            }, function(){
                $(this).find("ul").hide();
            }
        );
        
        $(".page-type-content:nth-child(4)").hover(
            function(){
                $("#service_hover").show();
            }, function(){
                $("#service_hover").hide();
            }
        );
        
        var n = 0;
        $(".home_page h3").each(function(){
            if (n % 4 == 1 ){
                $(this).addClass("yellow");    
                $(this).addClass("ph"+n);    
            } 
            if (n % 4 == 2 ){
                $(this).removeClass("yellow");  
                $(this).addClass("purple");  
                $(this).addClass("ph"+n);    
            }
            if (n % 4 == 3 ){
                $(this).removeClass("yellow");  
                $(this).removeClass("purple");  
                $(this).addClass("red");    
                $(this).addClass("ph"+n);    
            } 
            
            n = n+1;
        });
        
        if (getURLParameter("building") == "1"){           
            $(".building_menu").show();         
            
            var menu_index = getURLParameter("menu");
            $("#building_li_"+ menu_index + " a").addClass("building_menu_highlight");
        } else {
             $(".main_menu").show();
        }
    
    //Campaign Monitor Sign Up
    $('#subForm').submit(function (e) {
//        if ($("#agree_terms").prop("checked") != true){
//            alert("Please agree to the term and conditions.");
//            $("#agree_terms").focus();
//            return false;
//        }
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
                function (data) {
                    if (data.Status === 400) {
                        alert("Please try again later.");
                    } else { // 200
                        alert("Thank you for signing up.");
                    }
        });
    });
        
    
    function validate_pop_up(){
        if($('#subscribe_newsletter_popup').is(":checked"))
        return true;
        else{
            alert("Please check the 'Subscribe to recieve newsletter' checkbox")
            return false;
        }
    }
    function search_site(){
        if($("#SearchTerms").val() != ""){
            window.location.href = "/search?query=" + $("#SearchTerms").val();
        }
    }

});

function subscribe_email(){ 
    if (isValidEmailAddress($("#subscribe_email").val())){            
        var data = {}
        var contest = {}
        contest["email"] = $("#subscribe_email").val();
        contest["newsletter"] = true;
        contest["property_id"] = site.property.id;
        data["contest"] = contest
        data["notice"] = "false"
        $.ajax({
            url: "/newsletter_no_captcha",
            type: "POST",
            data: data,
    		success: function(response){        		    
                alert("Thank you for signing up.");
			},
            error: function(xhr, ajaxOptions, thrownError){
                alert("Please try again later.");
			}
        })    
    } else {
        alert("Please enter a valid email address. ")
    }
}

function show_content(){
    $('.yield').fadeIn();
    $(".modal-backdrop").remove();
    var windowWidth = $(window).width();
    if(windowWidth <= 1024) {
         $('.panel-collapse').removeClass('in')
    }
    var today_hours = getTodaysHours();
    var hours = getPropertyHours();
    renderHomeHours('#today_hour_container', '#today_hour_template', today_hours);
    renderHours('#home_hour_container', '#home_hour_template', hours, 'reg_hours');
    renderHours('#home_exp_hour_container', '#home_exp_hour_template', hours, 'holiday_hours');
}

function get_day(id){
    switch(id) {
        case 0:
            return ("Sunday");
            break;
        case 1:
            return ("Monday");
            break;
        case 2:
            return ("Tuesday");
            break;
        case 3:
            return ("Wednesday");
            break;
        case 4:
            return ("Thursday");
            break;
        case 5:
            return ("Friday");
            break;
        case 6:
            return ("Saturday");
            break;
    }
}

function get_month (id){
    var month = "";
    switch(id) {
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dec";
            break;
            
    }
    return month;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function in_my_time_zone(hour, format){
    return hour.tz(getPropertyTimeZone()).format(format)
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}



// vendor scroll- SimplyScroll 2

/*
 * simplyScroll 2 - a scroll-tastic jQuery plugin
 *
 * http://logicbox.net/jquery/simplyscroll/
 *
 * Copyright (c) 2009-2012 Will Kelly - http://logicbox.net
 *
 * Dual licensed under the MIT and GPL licenses.
 *
 * Version: 2.0.5 Last revised: 10/05/2012
 *
 */


(function($,window,undefined) {

$.fn.simplyScroll = function(options) {
	return this.each(function() {
		new $.simplyScroll(this,options);
	});
};

var defaults = {
	customClass: 'simply-scroll',
	frameRate: 24, //No of movements per second
	speed: 1, //No of pixels per frame
	orientation: 'horizontal', //'horizontal or 'vertical' - not to be confused with device orientation
	auto: true,
	autoMode: 'loop', //auto = true, 'loop' or 'bounce',
	manualMode: 'end', //auto = false, 'loop' or 'end'
	direction: 'forwards', //'forwards' or 'backwards'.
	pauseOnHover: true, //autoMode = loop|bounce only
	pauseOnTouch: true, //" touch device only
	pauseButton: false, //" generates an extra element to allow manual pausing 
	startOnLoad: false //use this to delay starting of plugin until all page assets have loaded
};
	
$.simplyScroll = function(el,options) {
	
	var self = this;
	
	this.o = $.extend({}, defaults, options || {});
	this.isAuto = this.o.auto!==false && this.o.autoMode.match(/^loop|bounce$/)!==null;
	this.isHorizontal = this.o.orientation.match(/^horizontal|vertical$/)!==null && this.o.orientation==defaults.orientation; 
	this.isRTL = this.isHorizontal && $("html").attr('dir') == 'rtl';
	this.isForwards = !this.isAuto  || (this.isAuto && this.o.direction.match(/^forwards|backwards$/)!==null && this.o.direction==defaults.direction) && !this.isRTL;
	this.isLoop = this.isAuto && this.o.autoMode == 'loop' || !this.isAuto && this.o.manualMode == 'loop';
	
	this.supportsTouch = ('createTouch' in document);
	
	this.events = this.supportsTouch ? 
		{start:'touchstart MozTouchDown',move:'touchmove MozTouchMove',end:'touchend touchcancel MozTouchRelease'} : 
		{start:'mouseenter',end:'mouseleave'};
	
	this.$list = $(el); //called on ul/ol/div etc
	var $items = this.$list.children();
	
	//generate extra markup
	this.$list.addClass('simply-scroll-list')
		.wrap('<div class="simply-scroll-clip"></div>')
		.parent().wrap('<div class="' + this.o.customClass + ' simply-scroll-container"></div>');
	
	if (!this.isAuto) { //button placeholders
		this.$list.parent().parent()
		.prepend('<div class="simply-scroll-forward"></div>')
		.prepend('<div class="simply-scroll-back"></div>');
	} else {
		if (this.o.pauseButton) {
			this.$list.parent().parent()
			.prepend('<div class="simply-scroll-btn simply-scroll-btn-pause"></div>');
			this.o.pauseOnHover = false;
		}
	}
	
	//wrap an extra div around the whole lot if elements scrolled aren't equal
	if ($items.length > 1) {
		
		var extra_wrap = false,
			total = 0;
			
		if (this.isHorizontal) {
			$items.each(function() { total+=$(this).outerWidth(true); });
			extra_wrap = $items.eq(0).outerWidth(true) * $items.length !== total;
		} else {
			$items.each(function() { total+=$(this).outerHeight(true); });
			extra_wrap = $items.eq(0).outerHeight(true) * $items.length !== total;
		}
		
		if (extra_wrap) {
			this.$list = this.$list.wrap('<div></div>').parent().addClass('simply-scroll-list');
			if (this.isHorizontal) {
				this.$list.children().css({"float":'left',width: total + 'px'});	
			} else {
				this.$list.children().css({height: total + 'px'});
			}
		}
	}
	
	if (!this.o.startOnLoad) {
		this.init();
	} else {
		//wait for load before completing setup
		$(window).load(function() { self.init();  });
	}
		
};
	
$.simplyScroll.fn = $.simplyScroll.prototype = {};

$.simplyScroll.fn.extend = $.simplyScroll.extend = $.extend;

$.simplyScroll.fn.extend({
	init: function() {

		this.$items = this.$list.children();
		this.$clip = this.$list.parent(); //this is the element that scrolls
		this.$container = this.$clip.parent();
		this.$btnBack = $('.simply-scroll-back',this.$container);
		this.$btnForward = $('.simply-scroll-forward',this.$container);

		if (!this.isHorizontal) {
			this.itemMax = this.$items.eq(0).outerHeight(true); 
			this.clipMax = this.$clip.height();
			this.dimension = 'height';			
			this.moveBackClass = 'simply-scroll-btn-up';
			this.moveForwardClass = 'simply-scroll-btn-down';
			this.scrollPos = 'Top';
		} else {
			this.itemMax = this.$items.eq(0).outerWidth(true);
			this.clipMax = this.$clip.width();			
			this.dimension = 'width';
			this.moveBackClass = 'simply-scroll-btn-left';
			this.moveForwardClass = 'simply-scroll-btn-right';
			this.scrollPos = 'Left';
		}
		
		this.posMin = 0;
		
		this.posMax = this.$items.length * this.itemMax;
		
		var addItems = Math.ceil(this.clipMax / this.itemMax);
		
		//auto scroll loop & manual scroll bounce or end(to-end)
		if (this.isAuto && this.o.autoMode=='loop') {
			
			this.$list.css(this.dimension,this.posMax+(this.itemMax*addItems) +'px');
			
			this.posMax += (this.clipMax - this.o.speed);
			
			if (this.isForwards) {
				this.$items.slice(0,addItems).clone(true).appendTo(this.$list);
				this.resetPosition = 0;
				
			} else {
				this.$items.slice(-addItems).clone(true).prependTo(this.$list);
				this.resetPosition = this.$items.length * this.itemMax;
				//due to inconsistent RTL implementation force back to LTR then fake
				if (this.isRTL) {
					this.$clip[0].dir = 'ltr';
					//based on feedback seems a good idea to force float right
					this.$items.css('float','right');
				}
			}
		
		//manual and loop
		} else if (!this.isAuto && this.o.manualMode=='loop') {
			
			this.posMax += this.itemMax * addItems;
			
			this.$list.css(this.dimension,this.posMax+(this.itemMax*addItems) +'px');
			
			this.posMax += (this.clipMax - this.o.speed);
			
			var items_append  = this.$items.slice(0,addItems).clone(true).appendTo(this.$list);
			var items_prepend = this.$items.slice(-addItems).clone(true).prependTo(this.$list);
			
			this.resetPositionForwards = this.resetPosition = addItems * this.itemMax;
			this.resetPositionBackwards = this.$items.length * this.itemMax;
			
			//extra events to force scroll direction change
			var self = this;
			
			this.$btnBack.bind(this.events.start,function() {
				self.isForwards = false;
				self.resetPosition = self.resetPositionBackwards;
			});
			
			this.$btnForward.bind(this.events.start,function() {
				self.isForwards = true;
				self.resetPosition = self.resetPositionForwards;
			});
			
		} else { //(!this.isAuto && this.o.manualMode=='end') 
			
			this.$list.css(this.dimension,this.posMax +'px');
			
			if (this.isForwards) {
				this.resetPosition = 0;
				
			} else {
				this.resetPosition = this.$items.length * this.itemMax;
				//due to inconsistent RTL implementation force back to LTR then fake
				if (this.isRTL) {
					this.$clip[0].dir = 'ltr';
					//based on feedback seems a good idea to force float right
					this.$items.css('float','right');
				}
			}
		}
		
		this.resetPos() //ensure scroll position is reset
		
		this.interval = null;	
		this.intervalDelay = Math.floor(1000 / this.o.frameRate);
		
		if (!(!this.isAuto && this.o.manualMode=='end')) { //loop mode
			//ensure that speed is divisible by item width. Helps to always make images even not odd widths!
			while (this.itemMax % this.o.speed !== 0) {
				this.o.speed--;
				if (this.o.speed===0) {
					this.o.speed=1; break;	
				}
			}
		}
		
		var self = this;
		this.trigger = null;
		this.funcMoveBack = function(e) { 
			if (e !== undefined) {
				e.preventDefault();
			}
			self.trigger = !self.isAuto && self.o.manualMode=='end' ? this : null;
			if (self.isAuto) {
				self.isForwards ? self.moveBack() : self.moveForward(); 
			} else {
				self.moveBack();	
			}
		};
		this.funcMoveForward = function(e) { 
			if (e !== undefined) {
				e.preventDefault();
			}
			self.trigger = !self.isAuto && self.o.manualMode=='end' ? this : null;
			if (self.isAuto) {
				self.isForwards ? self.moveForward() : self.moveBack(); 
			} else {
				self.moveForward();	
			}
		};
		this.funcMovePause = function() { self.movePause(); };
		this.funcMoveStop = function() { self.moveStop(); };
		this.funcMoveResume = function() { self.moveResume(); };
		
		
		
		if (this.isAuto) {
			
			this.paused = false;
			
			function togglePause() {
				if (self.paused===false) {
					self.paused=true;
					self.funcMovePause();
				} else {
					self.paused=false;
					self.funcMoveResume();
				}
				return self.paused;
			};
			
			//disable pauseTouch when links are present
			if (this.supportsTouch && this.$items.find('a').length) {
				this.supportsTouch=false;
			}
			
			if (this.isAuto && this.o.pauseOnHover && !this.supportsTouch) {
				this.$clip.bind(this.events.start,this.funcMovePause).bind(this.events.end,this.funcMoveResume);
			} else if (this.isAuto && this.o.pauseOnTouch && !this.o.pauseButton && this.supportsTouch) {
				
				var touchStartPos, scrollStartPos;
				
				this.$clip.bind(this.events.start,function(e) {
					togglePause();
					var touch = e.originalEvent.touches[0];
					touchStartPos = self.isHorizontal ? touch.pageX : touch.pageY;
					scrollStartPos = self.$clip[0]['scroll' + self.scrollPos];
					e.stopPropagation();
					e.preventDefault();
					
				}).bind(this.events.move,function(e) {
					
					e.stopPropagation();
					e.preventDefault();
					
					var touch = e.originalEvent.touches[0],
						endTouchPos = self.isHorizontal ? touch.pageX : touch.pageY,
						pos = (touchStartPos - endTouchPos) + scrollStartPos;
					
					if (pos < 0) pos = 0;
					else if (pos > self.posMax) pos = self.posMax;
					
					self.$clip[0]['scroll' + self.scrollPos] = pos;
					
					//force pause
					self.funcMovePause();
					self.paused = true;
				});	
			} else {
				if (this.o.pauseButton) {
					
					this.$btnPause = $(".simply-scroll-btn-pause",this.$container)
						.bind('click',function(e) {
							e.preventDefault();
							togglePause() ? $(this).addClass('active') : $(this).removeClass('active');
					});
				}
			}
			this.funcMoveForward();
		} else {

			this.$btnBack 
				.addClass('simply-scroll-btn' + ' ' + this.moveBackClass)
				.bind(this.events.start,this.funcMoveBack).bind(this.events.end,this.funcMoveStop);
			this.$btnForward
				.addClass('simply-scroll-btn' + ' ' + this.moveForwardClass)
				.bind(this.events.start,this.funcMoveForward).bind(this.events.end,this.funcMoveStop);
				
			if (this.o.manualMode == 'end') {
				!this.isRTL ? this.$btnBack.addClass('disabled') : this.$btnForward.addClass('disabled');	
			}
		}
	},
	moveForward: function() {
		var self = this;
		this.movement = 'forward';
		if (this.trigger !== null) {
			this.$btnBack.removeClass('disabled');
		}
		self.interval = setInterval(function() {
			if (self.$clip[0]['scroll' + self.scrollPos] < (self.posMax-self.clipMax)) {
				self.$clip[0]['scroll' + self.scrollPos] += self.o.speed;
			} else if (self.isLoop) {
				self.resetPos();
			} else {
				self.moveStop(self.movement);
			}
		},self.intervalDelay);
	},
	moveBack: function() {
		var self = this;
		this.movement = 'back';
		if (this.trigger !== null) {
			this.$btnForward.removeClass('disabled');
		}
		self.interval = setInterval(function() {
			if (self.$clip[0]['scroll' + self.scrollPos] > self.posMin) {
				self.$clip[0]['scroll' + self.scrollPos] -= self.o.speed;
			} else if (self.isLoop) {
				self.resetPos();
			} else {
				self.moveStop(self.movement);
			}
		},self.intervalDelay);
	},
	movePause: function() {
		clearInterval(this.interval);	
	},
	moveStop: function(moveDir) {
		this.movePause();
		if (this.trigger!==null) {
			if (typeof moveDir !== 'undefined') {
				$(this.trigger).addClass('disabled');
			}
			this.trigger = null;
		}
		if (this.isAuto) {
			if (this.o.autoMode=='bounce') {
				moveDir == 'forward' ? this.moveBack() : this.moveForward();
			}
		}
	},
	moveResume: function() {
		this.movement=='forward' ? this.moveForward() : this.moveBack();
	},
	resetPos: function() {
		this.$clip[0]['scroll' + this.scrollPos] = this.resetPosition;
	}
});
  
})(jQuery,window);


//****** PLUGIN ************/
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
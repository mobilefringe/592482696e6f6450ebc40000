$('document').ready(function() {
    
    var view_all = false;
    $('#hours-toggle').click(function(){
        console.log("toggled!");
        $("#hours-full").slideToggle();
        if (!view_all){
            $("#hours-toggle b").html("HIDE HOURS");
            view_all = true;
        } else {
            $("#hours-toggle b").html("VIEW ALL HOURS");
            view_all = false;
        }
    });
        
        $('input').val();
        
        
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
        if($("#SearchTerms").val() !== ""){
            window.location.href = "/search?query=" + $("#SearchTerms").val();
        }
    }
    
      if($.cookie("popup_viewed") != "true"){
          $.cookie("popup_viewed", "true", { expires: 1 });
            $.magnificPopup.open({
              items: {
                src: '<div class="mfp-with-anim homepop_up_container" style="height:100%;"><a href=http://www.stvitalcentre.com/pages/svc-giftcard><img alt="Pop up" width="100%" src="//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/jpeg/1495572694000/CAN150_Popup_FNL.jpg" /></a></div>', 
                type: 'inline'
              }
            });
            $.cookie('visited', 'yes'); 
        }
        var date = new Date();
        var minutes = 1440;
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        $.cookie('visited', 'yes', { expires: date, path: '/' });
});
    
$(window).load(function() {
    if (window.location.pathname.indexOf("/stores") == -1) {
        $('.flexslider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav: false,        
            prevText: "Previous",
            nextText: "Next"
        });
        console.log("slidey slide");
    }
    if (window.location.pathname == "/") {
        
        if (getCookie("visited") != "yes"){
            $('.newsletter-box').show();
            var a = new Date();
            a = new Date(a.getTime() +1000*60*60*24*30);
            document.cookie = 'visited=yes; expires='+a.toGMTString()+';'; 
        } 
    }
    
    var today_hours = getTodaysHours();
    var hours = getPropertyHours();
    var feature_items = getFeatureList();
    var banners  = getBanners();
    renderBanner('#banner_template','#home_banner',banners);
    renderHomeHours('#today_hour_container', '#today_hour_template', today_hours);
    renderHours('#home_hour_container', '#home_hour_template', hours, 'reg_hours');
    renderHours('#home_exp_hour_container', '#home_exp_hour_template', hours, 'holiday_hours');
    renderFeatureItems('#feature_container', '#feature_template', feature_items);

});

 
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
	
	
	var n = 0;
    $(".home_page h3").each(function(){
        console.log("loads colour");
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
	
	
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function close_popup() {
    $(".newsletter-box").hide();
}
    
    
 

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

$('document').ready(function() {
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
    }
    else {
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
    var view_all = false;
    $('#hours-toggle').click(function(){
        //console.log("toggled!");
        $("#hours-full").slideToggle();
        if (!view_all){
            $("#hours-toggle b").html("HIDE HOURS");
            view_all = true;
        } else {
            $("#hours-toggle b").html("VIEW ALL HOURS");
            view_all = false;
        }
    });
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

function show_content(){
    $('.yield').fadeIn();
    $(".modal-backdrop").remove();
    var windowWidth = $(window).width();
    if(windowWidth <= 1024) {
         $('.panel-collapse').removeClass('in')
    }
    
    var n = 0;
    $("div.home_page h3").each(function(){
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

function getSVCSearchResults(search_string,max_results,trim_description_length){
    var search_results = {};
    var all_stores = getStoresList();
    var store_ids = [];
    var stores =[];
    var count = 0;
    // console.log(all_stores);
    $.each( all_stores , function( key, val ) {
        //localizeObject(val);
        if(store_ids.indexOf(val.id) == -1){
            // console.log(search_string, val.name);
            if(val.name.toLowerCase().indexOf(search_string.toLowerCase()) > -1){
                val.description_trim = val.description.substring(0, trim_description_length) + "..";
                stores.push(val);
                store_ids.push(val.id);
                count++;
            }
            if(count >= max_results){
                return false;
            }
        }
        if(store_ids.indexOf(val.id) == -1){
            var tags_string = val.tags.join();
            var keywords_string  = val.keywords.join();
            if(search_string.length > 3 && (tags_string.toLowerCase().indexOf(search_string.toLowerCase()) > -1 || keywords_string.toLowerCase().indexOf(search_string.toLowerCase()) > -1)){
                val.description_trim = val.description.substring(0, trim_description_length) + "..";
                stores.push(val);
                store_ids.push(val.id);
                count++;
            }
            if(count >= max_results){
                return false;
            }
        
        }
        
    });
    search_results['stores'] = stores;
    if(stores.length === 0){
        search_results['stores_header_style'] = "display:none";
    }
    
    
    
    //we only want to keep checking promos, events or jobs descriptions if there is more that 2 search string characters, otherwise too many results
    if(count >= max_results || search_string.length < 3){
        search_results['summary'] = {"count":count};
        search_results['promotions_header_style'] = "display:none";
        search_results['events_header_style'] = "display:none";
        search_results['jobs_header_style'] = "display:none";
        return search_results;
    }
    
    var all_promotions = getPromotionsList();
    var promotion_ids = [];
    var promotions =[];
    $.each( all_promotions , function( key, val ) {
        localizeObject(val);
        var added = false;
        if(promotion_ids.indexOf(val.id) == -1){
            if(val.name.toLowerCase().indexOf(search_string.toLowerCase()) > -1){
                val.description_trim = val.description.substring(0, trim_description_length) + "..";
                promotions.push(val);
                promotion_ids.push(val.id);
                count++;
                added = true;
            }
            if(count >= max_results){
                return false;
            }
        }
        if(!added){
            
            if(val.description.toLowerCase().indexOf(search_string.toLowerCase()) > -1){
                val.description_trim = val.description.substring(0, trim_description_length) + "..";
                promotions.push(val);
                promotion_ids.push(val.id);
                count++;
            }
            if(count >= max_results){
                return false;
            }
        }
    });
    search_results['promotions'] = promotions;
    if(promotions.length === 0){
        search_results['promotions_header_style'] = "display:none";
    }
    
    
    var all_events = getEventsList();
    var event_ids = [];
    var events =[];
    $.each( all_events , function( key, val ) {
        localizeObject(val);
        var added = false;
        if(event_ids.indexOf(val.id) == -1){
            if(val.name.toLowerCase().indexOf(search_string.toLowerCase()) > -1){
                val.description_trim = val.description.substring(0, trim_description_length) + "..";
                events.push(val);
                event_ids.push(val.id);
                added = true;
                count++;
            }
            if(count >= max_results){
                return false;
            }
        }
        if(!added){
            
            if(val.description.toLowerCase().indexOf(search_string.toLowerCase()) > -1){
                val.description_trim = val.description.substring(0, trim_description_length) + "..";
                events.push(val);
                event_ids.push(val.id);
                count++;
            }
            if(count >= max_results){
                return false;
            }
        }
    });
    search_results['events'] = events;
    if(events.length === 0){
        search_results['events_header_style'] = "display:none";
    }
    
    var all_jobs = getJobsList();
    var job_ids = [];
    var jobs =[];
    $.each( all_jobs , function( key, val ) {
        localizeObject(val);
        var added = false;
        if(job_ids.indexOf(val.id) == -1){
            if(val.name.toLowerCase().indexOf(search_string.toLowerCase()) > -1){
                val.description_trim = val.description.substring(0, trim_description_length) + "..";
                jobs.push(val);
                job_ids.push(val.id);
                added = true;
                count++;
            }
            if(count >= max_results){
                return false;
            }
        }
        if(!added){
            if(val.description.toLowerCase().indexOf(search_string.toLowerCase()) > -1){
                val.description_trim = val.description.substring(0, trim_description_length) + "..";
                jobs.push(val);
                job_ids.push(val.id);
                count++;
            }
            if(count >= max_results){
                return false;
            }
        }
    });
    search_results['jobs'] = jobs;
    if(jobs.length === 0){
        search_results['jobs_header_style'] = "display:none";
    }
    
    // St Vital Search through pages        
    var slug_list = { 
                        'Service' : ['/pages/svc-customer-service','/pages/svc-leasing', '/pages/svc-community-booth','/pages/svc-giftcard'],
                        'Submission Requirements' : ['/pages/svc-submission-requirements'],
                        'Base Building' : ['/pages/svc-base-building?building=1&menu=2','/pages/svc-base-building--2?building=1&menu=2','/pages/svc-base-building--3?building=1&menu=2','/pages/svc-base-building--4?building=1&menu=2','/pages/svc-base-building--5?building=1&menu=2','/pages/svc-base-building--6?building=1&menu=2'],
                        'Tenants Manual' : ['/pages/svc-tenants-manual'],
                        'Construction' : ['/pages/svc-construction?building=1&menu=3','/pages/svc-construction--2?building=1&menu=3','/pages/svc-construction--3?building=1&menu=3','/pages/svc-construction--4?building=1&menu=3'],
                        'Sustainability' : ['/pages/svc-sustainability-criteria?building=1&menu=4']
                    };
    
    var genInfo =[];
    var gen_info_list = [];
    prefix = get_prefix();
    $.each( slug_list , function( key, each_list ) {
        $.each( each_list , function( key_slug, slug ) {
            var pages_json = prefix + slug + ".json"
            $.getJSON(pages_json).done(function(data) {
                if(gen_info_list.indexOf(key) == -1){
                    
                    if((data.body.indexOf(search_string.toLowerCase()) > -1) || (data.title.toLowerCase().indexOf(search_string.toLowerCase()) > -1)  ){
                        console.log(data.title,slug);
                        var val = {};
                        val.name = key;
                        val.link = slug;
                        val.description = data.body;
                        val.description_trim = val.description.substring(0, trim_description_length) + "..";
                        genInfo.push(val);
                        gen_info_list.push(key)
                        count++;
                    }
                    if(count >= max_results){
                        return false;
                    }
                }
            }).fail(function(jqXHR) {
                if (jqXHR.status == 404) {
                    $("#404_msg").fadeIn("fast");
                }
            });
        });
    });
    
    search_results['genInfo'] = jobs;
    if(genInfo.length === 0){
        search_results['genInfo_header_style'] = "display:none";
    }
    search_results['summary'] = {"count":count};
    
    

    return search_results;
    
}
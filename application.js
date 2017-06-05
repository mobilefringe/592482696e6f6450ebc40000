/*Created 2015-10-23  by RKS*/

function renderBanner(banner_template,home_banner,banners){
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    $.each( banners , function( key, val ) {
        today = new Date();
        start = new Date (val.start_date);
       
        start.setDate(start.getDate());
       if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
       }
       if (start <= today){
         if (val.end_date){
             end = new Date (val.end_date);
             end.setDate(end.getDate() + 1);
             if (end >= today){
               item_list.push(val);  
             }
             
         } else {
             item_list.push(val);
         }
       }
    });

    $.each( item_list , function( key, val ) {
        var repo_rendered = Mustache.render(banner_template_html,val);
        item_rendered.push(repo_rendered);
       
    });
    $(home_banner).html(item_rendered.join(''));
    
}
function renderFeatureItems(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
        }
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderGeneral(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
       
    });
    $(container).html(item_rendered.join(''));
}
function renderVendorScroll(container, template, collection){
    var item_list_temp = [];
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    var store_initial="";
    
    $.each( collection , function( key, val ) {
        if(val.show_logo === true){
            val.image_url = val.store_front_url_abs;
            if(val.image_url.indexOf('missing.png') > 0){
                val.image_url = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
            }
            if(item_list.empty) {
                val.first_class="first_image";
            }
            item_list_temp.push(val);
        }
    });
    
    //var items_length = item_list.length;
    item_list
    for (var i = 0; i < 4; i ++)
    {
        $.each( item_list_temp , function( key, val ) {
            item_list.push(val);
        });
    }
    
    
    $.each( item_list , function( key, val ) {
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
       
    });
    $(container).html(item_rendered.join(''));
    
}

function renderPropertyDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var new_val={};
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
         
        if(key == "name") {
            new_val.name = val;
        }
        if(key == "description") {
            new_val.description = val;
        }
        if(key == "address1") {
            new_val.address1 = val;
        }
         if(key == "address2") {
            new_val.address2 = val;
        }
        if(key == "city") {
            new_val.city = val;
        }
        if(key == "country") {
            new_val.country = val;
        }
        if(key == "postal_code") {
            new_val.postal_code = val;
        }
        if(key == "contact_name") {
            new_val.contact_name = val;
        }
        if(key == "contact_phone") {
            new_val.contact_phone = val;
        }
        if(key == "contact_email") {
            new_val.contact_email = val;
        }
    });
    var repo_rendered = Mustache.render(template_html,new_val);
    item_rendered.push(repo_rendered);
    $(container).html(item_rendered.join(''));
}
function renderStoreList(container, template, collection, type,starter, breaker){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    var store_initial="";
    $.each( collection , function( key, val ) {
        if (type == "stores" || type == "category_stores"){
            if(!val.store_front_url ||  val.store_front_url.indexOf('missing.png') > -1 || val.store_front_url.length === 0){
                val.alt_store_front_url = "//codecloud.cdn.speedyrails.net/sites/56056be06e6f641a1d020000/image/png/1446826281000/stc-logo-holiday-360 copy.png";
            } else {
                val.alt_store_front_url = getImageURL(val.store_front_url);    
            }
            
        }
        //var categories = getStoreCategories();
        var current_initial = val.name[0];
        
        if(store_initial.toLowerCase() == current_initial.toLowerCase()){
            val.initial = "";
            val.show = "display:none;";
        }
        else{
            val.initial = current_initial;
            store_initial = current_initial;
            
            if(val.initial=="0") {
                val.initial = "#";
            }
            
            val.show = "display:block;";
            val.class_show = "first_letter";
        }
        if (val.promotions.length > 0){
            val.promotion_exist = "display:inline-block";
        }
        else{
            val.promotion_exist = "display:none";
        }
        if (val.jobs.length > 0){
            val.job_exist = "display:inline-block";
        }
        else{
            val.job_exist = "display:none";
        }
        val.block = current_initial + '-block';
        var rendered = Mustache.render(template_html,val);
        var upper_current_initial = current_initial.toUpperCase();
        if (upper_current_initial.charCodeAt(0) <= breaker.charCodeAt(0) && upper_current_initial.charCodeAt(0) >= starter.charCodeAt(0)){
            item_rendered.push(rendered);
        }

    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderStoreListCatetories(container, template, category_list,stores){
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future use
    var initial_id = 0;
    var category_index = 0;
    $.each(category_list , function( key, category ) {
        var category_id = parseInt(category.id);
        var category_name = category.name;
        var current_id = category.id;
        var count = 0;
        
        $.each( stores , function( i, store ) {
            var store_category = store.categories;
            var a = store.categories.indexOf(category_id);
            
            if(a > -1){
                if (count == 0){
                    store.show  = "display:block"; 
                    
                    store.class_show = "first_letter";
                }else{
                    store.show  = "display:none"; 
                }
                
                store.header = category_name;
                store.block = category.id;
                if (store.promotions.length > 0){
                    store.promotion_exist = "display:inline";
                    var store_promo = getPromotionsForIds(store.promotions).sortBy(function(o){ return o.start_date })[0];
                    if (store_promo != undefined){
                        store.promo_btn = "/promotions/" + store_promo.slug;
                    }
                }
                else{
                    store.promotion_exist = "display:none";
                }
                if(store.phone.length < 1){
                    store.phone_exist = "display:none";
                }
                var rendered = Mustache.render(template_html,store);
                item_rendered.push(rendered);
                count += 1;
            }
            
        });
        category_index += 1;
    
    });
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderStoreDetails(container, template, collection, slug){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if ((val.store_front_url).indexOf('missing.png') > -1){
            val.image_url = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
        } else {
            val.alt_store_front_url = getImageURL(val.store_front_url); 
        }
        val.category_list = getCategoriesNamesByStoreSlug(slug);
        val.property = getPropertyDetails();
        val.map_x_coordinate = val.x_coordinate - 19;
        val.map_y_coordinate = val.y_coordinate - 58;
        val.property_map = getPropertyDetails().mm_host + getPropertyDetails().map_url;
        if (val.website !== null && val.website.length > 0){
            val.show = "display:inline-block";
        }
        else{
            val.show = "display:none";
        }
        if (val.phone !== null && val.phone.length > 0){
            val.phone_show = "display:inline-block";
        }
        else{
            val.phone_show = "display:none";
        }
        if (val.unit !== null && val.unit.length > 0){
            val.unit_show = "display:inline-block";
        }
        else{
            val.unit_show = "display:none";
        }
        if (val.tags !== null && val.tags.length > 0){
            val.taglist="";
             $.each( val.tags , function( tag_key, tag ) {
                val.taglist = val.taglist + " " + tag;
             });
            val.tags_show = "display:inline-block";
        }
        else{
            val.tags_show = "display:none";
        }
        val.payment = null; val.return = null;
        if (val.payment !== null && val.payment.length > 0){
            val.payment_show = "display:inline-block";
        }
        else{
            val.payment_show = "display:none";
        }
        if (val.return !== null && val.return.length > 0){
            val.return_show = "display:inline-block";
        }
        else{
            val.return_show = "display:none";
        }
        
        if (val.twitter !== null && val.twitter.length > 0){
            val.twitter_show = "display:inline-block";
        }
        else{
            val.twitter_show = "display:none";
        }
        
        if (val.twitter_show == "display:none" && val.phone_show == "display:none" ){
            val.show_line = "display:none";
        }
        else{
            val.show_line = "display:block";
        }
        if((val.twitter === null || val.twitter === "") && (val.facebook === "" || val.facebook === null)){
            val.hide_social = "display:none;";
        }
        if (val.facebook !== null && val.facebook.length > 0){
            val.facebook_show = "display:inline-block";
        }
        else{
            val.facebook_show = "display:none";
        }
        
        var repo = getRepoDetailsByName("Building Design Specs").images;
        $.each( repo , function( repo_key, repo_val ) {
            if((repo_val.name == val.neighbourhood.toLowerCase()) || (repo_val.name == val.neighbourhood))
            { 
                val.repo = repo_val.photo_url_abs;
                val.repo_show= "display:block;";
                val.no_repo_show="display:none;";
            }
            
        });
        if(val.repo === null)
        {
            val.repo_show= "display:none;";
            val.no_repo_show="display:block;";
        }
        
        //parse description_2
        var separate_des2 = val.description_2.match(/[^\r\n]+/g);
        var design_desc = [];
        var paragraph="";
        var title;
        $.each( separate_des2 , function( des2_key, des2_val ) {
            if(des2_val != " ")
            {
                if((/^\s+\d/).test(des2_val ))//((des2_val).startsWith(" 1") )
                {
                    //console.log("h2",des2_val);
                    if(paragraph.length > 0){
                        design_desc.push(paragraph);
                    }
                    title="<strong>"+des2_val+"</strong> <span>read more</span>";
                }
                else {
                    //console.log("text",des2_val);
                    paragraph += des2_val;
                }
                //console.log(des2_key ,des2_val);
            }
        });
         console.log(title,paragraph);
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderStoreListByUnit(container, template, collection, type){
var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    var store_initial="";
    $.each( collection , function( key, val ) {
        if (type == "stores" || type == "category_stores"){
            if(!val.store_front_url ||  val.store_front_url.indexOf('missing.png') > -1 || val.store_front_url.length === 0){
                val.alt_store_front_url = "";
            } else {
                val.alt_store_front_url = getImageURL(val.store_front_url);    
            }
            
        }
        //var categories = getStoreCategories();
        var current_initial = val.name[0];
        val.cat_list = val.categories.join(',')
        if(store_initial.toLowerCase() == current_initial.toLowerCase()){
            val.initial = "";
            val.show = "display:none;";
        }
        else{
            val.initial = current_initial;
            store_initial = current_initial;
            val.show = "display:block;";
        }
        if(val.is_coming_soon_store == true){
            val.coming_soon_store = "display:inline";
        }
        else{
            val.coming_soon_store = "display:none";
        }
        if(val.is_new_store == true){
            val.new_store = "display:inline";
        }
        else{
            val.new_store = "display:none";
        }
        if (val.promotions.length > 0){
            val.promotion_exist = "display:inline";
            var store_promo = getPromotionsForIds(val.promotions).sortBy(function(o){ return o.start_date })[0];
            if (store_promo != undefined){
                val.promo_btn = "/promotions/" + store_promo.slug;
            }
        }
        else{
            val.promotion_exist = "display:none";
        }
        if(val.phone.length < 1){
            val.phone_exist = "display:none";
        }
        val.block = current_initial + '-block';
        
        item_list.push(val);

    });
    
    item_list.sort(function(a, b) {
        var textA = a.unit;
        var textB = b.unit;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    
    collection = [];
    collection = item_list;
        
        
    $.each( collection , function( key, val ) {
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderHours(container, template, collection, type){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    if (type == "reg_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == false) {
                switch(val.day_of_week) {
                    case 0:
                        val.day = "Sunday";
                        break;
                    case 1:
                        val.day = "Monday";
                        break;
                    case 2:
                        val.day = "Tuesday";
                        break;
                    case 3:
                        val.day = "Wednesday";
                        break;
                    case 4:
                        val.day = "Thursday";
                        break;
                    case 5:
                        val.day = "Friday";
                        break;
                    case 6:
                        val.day = "Saturday";
                        break;
                }
                if (val.open_time && val.close_time && val.is_closed == false){
                    var open_time = in_my_time_zone(moment(val.open_time), "h:mmA");
                    var close_time = in_my_time_zone(moment(val.close_time), "h:mmA");
                    val.h = open_time + " - " + close_time;
                } else {
                    "Closed";
                }
                
                item_list.push(val);
            }
        });
        collection = [];
        collection = item_list;
    }
    
    if (type == "holiday_hours") {
        $.each( collection , function( key, val ) {
             
            if (!val.store_id && val.is_holiday === true) {
                holiday = moment(val.holiday_date);
                val.formatted_date = in_my_time_zone(holiday, "MMM D");
                if (val.open_time && val.close_time && val.is_closed === false){
                    var open_time = in_my_time_zone(moment(val.open_time), "h:mmA");
                    var close_time = in_my_time_zone(moment(val.close_time), "h:mmA");
                    val.h = open_time + " - " + close_time;   
                    val.style_now="display:none";
                } else {
                    val.h = "Closed";
                    val.active_class="hoursasterisk";
                    val.style_now="display:block";
                }
                item_list.push(val);
            }
        });
       
        collection = [];
        collection = item_list;
    }
    
    $.each( collection , function( key, val ) {
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);

    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
};

function renderJobs(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.jobable_type == "Store"){
            val.store_name = getStoreDetailsByID(val.jobable_id).name;
            val.store_slug = getStoreDetailsByID(val.jobable_id).slug;
        }
        else{
            val.store_name = "St. Vital Centre";
        }
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = start.format("MMM D") + " - " + end.format("MMM D")
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderJobDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.jobable_type == "Store") {
            var store_details = getStoreDetailsByID(val.jobable_id);
            val.store_detail_btn = store_details.slug;
            val.store_name = store_details.name;
            if (store_details.store_front_url_abs.indexOf('missing.png') > -1){
                val.image_url = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
            }
            else{
                val.image_url = store_details.store_front_url_abs;
            }
        }
        else{
            val.store_name = "St. Vital Centre";
            val.image_url = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = start.format("MMM D") + " - " + end.format("MMM D")
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderGallery(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        val.image_url = "//mallmaverick.cdn.speedyrails.net" + val.photo_url
        if (val.caption != null && val.caption.length > 0){
            val.alt = val.vaption;
        }else{
            val.alt = "Gallery image " + key
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderPromotions(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.image_url  = val.promo_image_url_abs;
            if(val.image_url.indexOf('missing.png') > 0){
                val.image_url = store_details.store_front_url_abs;
            }
            
        }
        else{
            val.store_name = "St. Vital Centre";
            val.image_url = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
        }
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
        }
        if(val.eventable_id){
            val.type="events";
        }
        else {
            val.type="promotions";
        }
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMMM D")
        }
        else{
            val.dates = start.format("MMMM D") + " - " + end.format("MMMM D")
        }
        val.day = start.format("ddd").toLowerCase();
        val.month = start.format("MMM");
        val.date = start.format("DD");
        val.main_host= getPropertyDetails().mm_host;
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}


function renderPromoDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug;
            val.store_name = store_details.name;
            val.image_url  = val.promo_image_url_abs;
            if(val.image_url.indexOf('missing.png') > 0){
                if (store_details.store_front_url_abs.indexOf('missing.png') > -1){
                val.image_url = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
                }
                else{
                    val.image_url = store_details.store_front_url_abs;
                }
            }
        }
        else{
            val.store_name = "St. Vital Centre";
            val.image_url = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
        }
        
        if(val.promo_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMMM D")
        }
        else{
            val.dates = start.format("MMMM D") + " - " + end.format("MMMM D")
        }
        val.day = start.format("ddd").toLowerCase();
        val.month = start.format("MMM");
        val.date = start.format("DD");
        val.main_host= getPropertyDetails().mm_host;
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}



function renderStoreDetailsHours(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        switch(val.day_of_week) {
            case 0:
                val.day = "Sunday";
                break;
            case 1:
                val.day = "Monday";
                break;
            case 2:
                val.day = "Tuesday";
                break;
            case 3:
                val.day = "Wednesday";
                break;
            case 4:
                val.day = "Thursday";
                break;
            case 5:
                val.day = "Friday";
                break;
            case 6:
                val.day = "Saturday";
                break;
            
        }
        var open_time = in_my_time_zone(moment(val.open_time), "h:mmA");
        var close_time = in_my_time_zone(moment(val.close_time), "h:mmA");
       
        if (val.is_closed == true){
            val.hour_string = "Closed"
        } else {
            val.hour_string = open_time + " - " + close_time;
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}


function renderEvents(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.image_url = store_details.store_front_url_abs;
        }
        else{
            val.store_name = "St. Vital Centre";
            val.image_url = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
        }
        if(val.event_image_url_abs.indexOf('missing.png') < 0){
            val.logo = val.event_image_url_abs;
        }
        else{
            if(val.image_url.indexOf('missing.png') < 0){
                val.logo = val.image_url;
            }
            else{
                val.logo = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
            }
        }
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = start.format("MMM D") + " - " + end.format("MMM D")
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderEventDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug;
            val.store_name = store_details.name;
            val.image_url  = val.event_image_url_abs;
            if(val.image_url.indexOf('missing.png') > 0){
                if (store_details.store_front_url_abs.indexOf('missing.png') > -1){
                    val.image_url = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
                }
                else{
                    val.image_url = store_details.store_front_url_abs;
                }
            }
        }
        else{
            val.store_name = "St. Vital Centre";
            val.image_url  = val.event_image_url_abs;
            if(val.image_url.indexOf('missing.png') > 0){
                val.image_url = "//codecloud.cdn.speedyrails.net/sites/592482696e6f6450ebc40000/image/png/1495569752000/logo.png";
            }
        }
        
        if (val.tags.indexOf("#living_room") >= 0){
            val.store_name = "The Living Room";
        }
        
        if(val.event_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMMM D")
        }
        else{
            val.dates = start.format("MMMM D") + " - " + end.format("MMMM D")
        }
        val.day = start.format("ddd").toLowerCase();
        val.month = start.format("MMM");
        val.date = start.format("DD");
        val.main_host= getPropertyDetails().mm_host;
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderHomeHours(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);    
    $.each( item_list , function( key, val ) {
        val.day = get_day(val.day_of_week);
        var d = new Date();
        val.month = get_month(d.getMonth());
        val.weekday = addZero(d.getDate());
        if (val.open_time && val.close_time && (val.is_closed == false || val.is_closed == null)){
            var open_time = in_my_time_zone(moment(val.open_time), "h:mma");
            var close_time = in_my_time_zone(moment(val.close_time), "h:mma");
            val.h = open_time + " - " + close_time;
        } else {
            val.h = "Closed";
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderHomeDropdownHours(container, template, collection, type){
    var item_list = [];
    var item_rendered = [];
    var today_hours = getTodaysHours().day_of_week;
    var template_html = $(template).html();
    
    Mustache.parse(template_html);   // optional, speeds up future uses
    if (type == "reg_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday === false) {
                switch(val.day_of_week) {
                    case 0:
                        val.day = "Sunday";
                        break;
                    case 1:
                        val.day = "Monday";
                        break;
                    case 2:
                        val.day = "Tuesday";
                        break;
                    case 3:
                        val.day = "Wednesday";
                        break;
                    case 4:
                        val.day = "Thursday";
                        break;
                    case 5:
                        val.day = "Friday";
                        break;
                    case 6:
                        val.day = "Saturday";
                        break;
                }
                if (val.open_time && val.close_time && val.is_closed === false){
                    var open_time = in_my_time_zone(moment(val.open_time), "h:mmA");
                    var close_time = in_my_time_zone(moment(val.close_time), "h:mmA");
                    val.h = open_time + " - " + close_time;
                } else {
                    "Closed";
                }
                
                if(val.day_of_week == today_hours) {
                    val.show_class= 'drop-down-row-today';
                }
                else {
                    val.show_class = 'drop-down-row';
                }
                item_list.push(val);
            }
        });
        collection = [];
        collection = item_list;
    }
    
    $.each( collection , function( key, val ) {
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);

    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderStoreTags(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    var tag_list = [];
    $.each( collection , function( key, val ) {
        if(val.tags !== null || val.tags !==undefined)
        {
            $.each( val.tags , function( keys, tag ) {
              if($.inArray(tag, tag_list) == -1 && (tag!=="")){
                    // console.log(tag);
                    var value={};
                    value.name=tag;
                    item_list.push(value);
                    tag_list.push(tag);
                }
            });
        }
    });
    //item_list.sort();
    //item_list=tag_list;
  item_list.sort(function(a, b) {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
    collection = [];
    collection = item_list;
    
    $.each( collection , function( key, val ) {
        //console.log(val.name);
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);

    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}
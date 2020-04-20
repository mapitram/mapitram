/**
* @package OS Touch Slider.
* @copyright 2020 OrdaSoft.
* @author 2020 Andrey Kvasnevskiy(akbet@mail.ru),Roman Akoev(akoevroman@gmail.com).
* @link http://ordasoft.com/os-touch-slider-joomla-responsive-slideshow
* @license GNU General Public License version 2 or later;
* @description OrdaSoft Responsive Touch Slider.
*/


function var_dump(obj) {
  var vartext = "";
  for (var prop in obj) {
    if( isNaN( prop.toString() )) {
      vartext += "\t->"+prop+" = "+ eval( "obj."+prop.toString()) +"\n";
    }
    }
    if(typeof obj == "object") {
      return "Type: "+typeof(obj)+((obj.constructor) ? "\nConstructor: "+obj.constructor : "") + 
      "\n" + vartext;
    } else {
        return "Type: "+typeof(obj)+"\n" + vartext;
  }
}//end function var_dump

(function () {

  var osSliderSettings = function (container, params) {
    if (!(this instanceof osSliderSettings)) return new osSliderSettings(container, params);

    var defaults = {
        loop: 0,
        workImage   : '',
        currentTask : '',
        currentEditImgId : 0,
        textId : 0,
        activeTab:1,
        editTextId: -1,
        previousText : '',
        crop : 0,
        parallax : 0,
        parallaxImg : [],
        imageWidth: 400,
        site_path : '',
        imageHeight: 200,
        imageFullTime: [],
        imageLink: [],
        imageFilter: [],
        imageBackground: [],
        textStartTimes: [],
        textEndTimes: [],
        permanentStartTimes: [],
        permanentEndTimes: [],
        moduleId : 0,
        resetSpeed:false,
        lazy : 0,
        loadPrevNext : 0,
        loadPrevNextAmount : 1,
        screenW : jQuerOs(window).innerWidth(),
        screenH : jQuerOs(window).innerHeight(),
        imageOrdering : [],
        currentTextOrderId: 0,
        textOrdering : [],
        avaibleGoogleFonts : [],
        avaibleGoogleFontsWeights : [],
        neededGoogleFonts : [],
        neededGoogleFontsWeight : [],
        setupAnimation : {},
        textAnimation : {},
        swiperSlider : {},
        ItemId : 0,
        isUser : -1,
        version : 0,
        setupFonts : ["Nixie One", "Open Sans", "Roboto", "Slabo 27px", "Lato", "Roboto Condensed", "Oswald", "Source Sans Pro",
                  "Montserrat", "Raleway", "Roboto Slab", "Lora", "PT Sans", "Josefin Sans", "Dancing Script",
                  "Satisfy", "Cookie", "Playball", "Great Vibes", "Rochester", "Lobster"]
    };

    for (var param in defaults) {
      if (!params[param]){
        params[param] = defaults[param];
      }
    }
    // slider settings
    var oss = this;

    // Params
    oss.params = params || defaults;

    //debug tip
    if(oss.params.debugMode){
      jQuerOs(".slider-head-title").html("<span style='color:red'>!!! Debug Mode ON !!!</span>");
    }

    if(!localStorage.getItem('afterImport')){
      localStorage.clear();  
      image_copy_id='';
    }
    
    //bch

    oss.stopSlider = function(){
      if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val()>1 
      || jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val()>1){
        oss.params.timer.stop();
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide .slide-text").css("opacity",1);
        return true;
      }
      return false;
    }

    oss.capitalizeFirstLetter = function (string) {
      if(string == "") return string;
            return string.charAt(0).toUpperCase() + string.slice(1);
    }


    //for compatibility with more old versions (after resize refactoring)
    oss.setTextAttrValue = function(){

        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide:not(.swiper-slide-duplicate) .slide-text").each(function(index, el){

          if(jQuerOs(el).css("font-size")){
            jQuerOs(el).attr("data-font-size",oss.toSl(jQuerOs(el).css("font-size")));
          }
          if(jQuerOs(el).css("border-top-width")){
            jQuerOs(el).attr("data-border-width",oss.toSl(jQuerOs(el).css("border-top-width")));
          }
          if(jQuerOs(el).css("padding-top")){
            jQuerOs(el).attr("data-padding-top",oss.toSl(jQuerOs(el).css("padding-top")));
          }
          if(jQuerOs(el).css("padding-right")){
            jQuerOs(el).attr("data-padding-right",oss.toSl(jQuerOs(el).css("padding-right")));
          }
          if(jQuerOs(el).css("padding-bottom")){
            jQuerOs(el).attr("data-padding-bottom",oss.toSl(jQuerOs(el).css("padding-bottom")));
          }
          if(jQuerOs(el).css("padding-left")){
            jQuerOs(el).attr("data-padding-left",oss.toSl(jQuerOs(el).css("padding-left")));
          }

          if(jQuerOs(el).attr('data-custom-class')){
            jQuerOs(el).addClass(jQuerOs(el).attr('data-custom-class'));
          }


          //text-shadow add to argument start
          if(jQuerOs(el).css("text-shadow")){
            //pixels params add to argument
            var regExpShadow = /([.\d]*px)/ig;

            var text_all_shadow = jQuerOs(el).css("text-shadow").match(regExpShadow);

            if(Array.isArray(text_all_shadow)){
              jQuerOs(el).attr("data-text-h-shadow",oss.toSl(text_all_shadow[0]));
              jQuerOs(el).attr("data-text-v-shadow",oss.toSl(text_all_shadow[1]));
              jQuerOs(el).attr("data-text-blur-radius",oss.toSl(text_all_shadow[2]));
            }else{
              jQuerOs(el).attr("data-text-h-shadow",'0');
              jQuerOs(el).attr("data-text-v-shadow",'0');
              jQuerOs(el).attr("data-text-blur-radius",'0');
            }

            //color params add to argument
            var regExpShadow = /([rgba]*[(]*[\d.,\s]*[)]+)/;
            var text_shadow = jQuerOs(el).css('text-shadow').match(regExpShadow);

            if(Array.isArray(text_shadow)){
              jQuerOs(el).attr("data-text-shadow-colorpicker",text_shadow[0]);
            }else{
              jQuerOs(el).attr("data-text-shadow-colorpicker",'rgba(255,255,255,1)');
            }
    
          }
          //text-shadow add to argument end

          if(jQuerOs(el).css("border-top-left-radius")){
            jQuerOs(el).attr("data-border-radius",oss.toSl(jQuerOs(el).css("border-top-left-radius")));
          }

        });
  
        return;
    }

    //bch
    // fn-n for delete image
    oss.deleteCurrentImage = function (imgId, moduleId){
      if(oss.params.debugMode){
        console.log("oss.deleteCurrentImage",[imgId, moduleId]);
      }

      if(localStorage.getItem('parent_img_id') == imgId){
          localStorage.clear();
        }
        
      // return;
      jQuerOs.post("index.php?option=com_ajax&module=os_touchslider&Itemid="+oss.params.ItemId+"&task=delete_image&moduleId="+oss.params.moduleId+"&format=raw",{imgId:imgId},

      function (data) {
        if (data.success) {

          countSlides = jQuerOs("#slidesPerView-" + oss.params.moduleId).val()

          empty_image = '<div class="swiper-slide"><img class="slide-image" src="'+empty_image_path+'" alt="slider is empty"></div>';

          if(countSlides < 2){
            jQuerOs('div.empty-image').html(empty_image)
          }

          jQuerOs(container+" .existing-images .slider-images .slider-image-block img, #os-slider-"+oss.params.moduleId+
                                                          " .swiper-slide img").each(function(index, el){
            if(jQuerOs(this).attr("data-image-id") == imgId){
              jQuerOs(this).parent().remove();
            }
          });
          jQuerOs("#message-block-" + oss.params.moduleId).html('<span class="successful-slider-message">Image deleted.</span>');
          setTimeout(function(){
            jQuerOs("#message-block-" + oss.params.moduleId).empty();
          }, 5000);
          oss.cancelImgEditor();
          if(typeof(oss.params.textAnimation['start']) != 'undefined'){
            delete oss.params.textAnimation['start'][imgId];
          }
          if(typeof(oss.params.textAnimation['end']) != 'undefined'){
            delete oss.params.textAnimation['end'][imgId];
          }
          if(typeof(oss.params.textAnimation['permanent']) != 'undefined'){
            delete oss.params.textAnimation['permanent'][imgId];
          }

          if(typeof(oss.params.textAnimation['hover']) != 'undefined'){
            delete oss.params.textAnimation['hover'][imgId];
          }
          oss.resetSlider(true);


        }else{
          jQuerOs("#message-block-" + oss.params.moduleId).html('<span class="error-slider-message">Something was wrong.(deleteCurrentImage)</span>');
        }
      } , 'json' );
    }
    //end

    oss.changeStyle = function (){
      if(oss.params.debugMode){
        console.log("oss.changeStyle",['without arguments']);
      }
      //resize img


      screenWidth = jQuerOs(window).innerWidth();
      kw = screenWidth/oss.params.screenW;
      // WxH = jQuerOs(window).innerWidth()/jQuerOs(window).innerHeight();

      WxH = false;

      exist_slides = jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").length;
      if(kw >0.98)kw=1;
      // if(WxH < 1.5 && kw < 0.8)WxH = true;
      // else WxH = false;
      //enable always auto if checkbox
      if(jQuerOs("#height-auto-" + oss.params.moduleId).prop('checked')){WxH=true}

      //add or remove object fit = cover
      if(jQuerOs("#object_fit-" + oss.params.moduleId).prop('checked')){
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").removeClass('fit-contain')
                                                                    .removeClass('fit-fill');
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide:not(.fit-cover)").addClass('fit-cover');

      }else if(jQuerOs("#object_fit1-" + oss.params.moduleId).prop('checked')){
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").removeClass('fit-cover')
                                                                    .removeClass('fit-fill');
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide:not(.fit-contain)").addClass('fit-contain');

      }else if(jQuerOs("#object_fit2-" + oss.params.moduleId).prop('checked')){
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").removeClass('fit-cover')
                                                                    .removeClass('fit-contain');
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide:not(.fit-fill)").addClass('fit-fill');

      }else{
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").removeClass('fit-cover')
                                                                    .removeClass('fit-contain')
                                                                    .removeClass('fit-fill');
      }   

      //frevent auto for paralax
       if(oss.params.parallax){WxH = false}

       //horizontal
      if(jQuerOs(container + " .direction:checked").val() == 'horizontal'){
        //pixels bouth
        if(jQuerOs(container + " .is_width_in_pixels:checked").val()==1 && jQuerOs(container + " .is_height_in_pixels:checked").val()==1){
          //px  == 1 column and img > 1 per slides


          if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() > 1 && jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val() == 1){
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[px horizontal perView:>1  column:==1]",['without arguments']);
            }
            width = jQuerOs("#image_width_px-" + oss.params.moduleId).val()*kw+"px;";
            height = jQuerOs("#image_height_px-" + oss.params.moduleId).val()*kw+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }

          //px and img > 1 column and img >= 1 per slides
          else if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() >= 1 && jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val() > 1){
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[px horizontal perView:>=1  column:>1]",['without arguments']);
            }
            width = jQuerOs("#image_width_px-" + oss.params.moduleId).val()*kw+"px;";
            height = jQuerOs("#image_height_px-" + oss.params.moduleId).val()*kw+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);

            perColumn = jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val()/2;
            if(!perColumn)perColumn = 1;
            height = ((jQuerOs("#image_height_px-" + oss.params.moduleId).val()/jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val()-
                      jQuerOs("#spaceBetween-" + oss.params.moduleId).val()*(perColumn)/2)*kw)+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }
          //px and 1 column and img == 1 per slides
          else{
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[px horizontal perView:==1  column:==1]",['without arguments']);
            }
            width = jQuerOs("#image_width_px-" + oss.params.moduleId).val()*kw+"px;";
            screenHeight = jQuerOs(window).innerHeight();
            height = jQuerOs("#image_height_px-" + oss.params.moduleId).val()*kw+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }
        }

        //width=px height=%
        if(jQuerOs(container + " .is_width_in_pixels:checked").val()==1 && jQuerOs(container + " .is_height_in_pixels:checked").val()==0){
          //px  == 1 column and img > 1 per slides
          if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() > 1 && jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val() == 1){
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[px/% horizontal perView:>1  column:==1]",['without arguments']);
            }
            width = jQuerOs("#image_width_px-" + oss.params.moduleId).val()*kw+"px;";
            height = jQuerOs("#image_height_per-" + oss.params.moduleId).val();
            screenHeight = jQuerOs(window).innerHeight();
            height = screenHeight*(height/100)+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
          }
          //px and img > 1 column and img >= 1 per slides
          else if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() >= 1 && jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val() > 1){
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[px/% horizontal perView:>=1  column:>1]",['without arguments']);
            }
            width = jQuerOs("#image_width_px-" + oss.params.moduleId).val()*kw+"px;";
            height = jQuerOs("#image_height_per-" + oss.params.moduleId).val();
            screenHeight = jQuerOs(window).innerHeight();
            height = (screenHeight*(height/100))+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);

            perColumn = jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val()/2;
            if(!perColumn)perColumn = 1;
            height = (screenHeight*(jQuerOs("#image_height_per-" + oss.params.moduleId).val()/100)/jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val())-
                      (jQuerOs("#spaceBetween-" + oss.params.moduleId).val()*(perColumn)/2)+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }
          //px and 1 column and img == 1 per slides
          else{
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[px/% horizontal perView:==1  column:==1]",['without arguments']);
            }
            width = jQuerOs("#image_width_px-" + oss.params.moduleId).val()*kw+"px;";
            screenHeight = jQuerOs(window).innerHeight();
            height = jQuerOs("#image_height_per-" + oss.params.moduleId).val();
            height = screenHeight*(height/100)+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }
        }

        //width=% height=px
        if(jQuerOs(container + " .is_width_in_pixels:checked").val()==0 && jQuerOs(container + " .is_height_in_pixels:checked").val()==1){
          //% and img > 1 column and img >= 1 per slides
          if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() >= 1 && jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val() > 1){
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[%/px horizontal perView:>=1  column:>1]",['without arguments']);
            }
            width = jQuerOs("#image_width_per-" + oss.params.moduleId).val();
            screenWidth = jQuerOs(window).innerWidth();
            width = width+"%;";
            height = jQuerOs("#image_height_px-" + oss.params.moduleId).val()*kw+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);

            perColumn = jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val()/2;
            if(!perColumn)perColumn = 1;
            height = ((jQuerOs("#image_height_px-" + oss.params.moduleId).val()/jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val()-
                      jQuerOs("#spaceBetween-" + oss.params.moduleId).val()*(perColumn)/2)*kw)+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }
          //% and 1 column and img > 1 per slides
          else{
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[%/px horizontal]",['without arguments']);
            }
            width = jQuerOs("#image_width_per-" + oss.params.moduleId).val()+"%;";
            height = jQuerOs("#image_height_px-" + oss.params.moduleId).val()*kw+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }
        }

        //% bouth
        if(jQuerOs(container + " .is_width_in_pixels:checked").val()==0 && jQuerOs(container + " .is_height_in_pixels:checked").val()==0){
          //% and img > 1 column and img >= 1 per slides
          if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() >= 1 && jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val() > 1){
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[% horizontal perView:>=1  column:>1]",['without arguments']);
            }
            width = jQuerOs("#image_width_per-" + oss.params.moduleId).val();
            screenWidth = jQuerOs(window).innerWidth();
            width = width+"%;";
            height = jQuerOs("#image_height_per-" + oss.params.moduleId).val();
            screenHeight = jQuerOs(window).innerHeight();
            height = (screenHeight*(height/100))+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);

            perColumn = jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val()/2;
            if(!perColumn)perColumn = 1;
            height = (screenHeight*(jQuerOs("#image_height_per-" + oss.params.moduleId).val()/100)/jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val())-
                      (jQuerOs("#spaceBetween-" + oss.params.moduleId).val()*(perColumn)/2)+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }
          //% and 1 column and img > 1 per slides
          else{
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[% horizontal]",['without arguments']);
            }
            width = jQuerOs("#image_width_per-" + oss.params.moduleId).val()+"%;";
            height = jQuerOs("#image_height_per-" + oss.params.moduleId).val();
            screenHeight = jQuerOs(window).innerHeight();
            height = screenHeight*(height/100)+"px;";
            if(WxH && exist_slides)height="auto;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }
        }
      }
      //vertical
      else{
        //pixels bouth
        if(jQuerOs(container + " .is_width_in_pixels:checked").val()==1 && jQuerOs(container + " .is_height_in_pixels:checked").val()==1){
          //px and img == 1 column and img > 1 per slides
          if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() > 1 && jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val() == 1){
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[px vertical perView:>1 perColumn:==1]",['without arguments']);
            }
            width = jQuerOs("#image_width_px-" + oss.params.moduleId).val()*kw+"px;";
            height = jQuerOs("#image_height_px-" + oss.params.moduleId).val()*kw+"px;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
          }
          //px and 1 column and img == 1 per slides
          else{
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[px vertical]",['without arguments']);
            }
            width = jQuerOs("#image_width_px-" + oss.params.moduleId).val()*kw+"px;";
            height = jQuerOs("#image_height_px-" + oss.params.moduleId).val()*kw+"px;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }
        }

        //width=px height=%
        if(jQuerOs(container + " .is_width_in_pixels:checked").val()==1 && jQuerOs(container + " .is_height_in_pixels:checked").val()==0){
            //px and img == 1 column and img > 1 per slides
          if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() > 1 && jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val() == 1){
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[px/% vertical perView:>1 perColumn:==1]",['without arguments']);
            }
            width = jQuerOs("#image_width_px-" + oss.params.moduleId).val()*kw+"px;";
            height = jQuerOs("#image_height_per-" + oss.params.moduleId).val();
            screenHeight = jQuerOs(window).innerHeight();
            height = screenHeight*(height/100)+"px;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
          }
          //px and 1 column and img == 1 per slides
          else{
            if(oss.params.debugMode){
              console.log("oss.changeStyle::[px/% vertical]",['without arguments']);
            }
            width = jQuerOs("#image_width_px-" + oss.params.moduleId).val()*kw+"px;";
            height = jQuerOs("#image_height_per-" + oss.params.moduleId).val();
            screenHeight = jQuerOs(window).innerHeight();
            height = screenHeight*(height/100)+"px;";
            jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
          }
        }

        //width=% height=px
        if(jQuerOs(container + " .is_width_in_pixels:checked").val()==0 && jQuerOs(container + " .is_height_in_pixels:checked").val()==1){
          //% and 1 column and img > 1 per slides
          if(oss.params.debugMode){
            console.log("oss.changeStyle::[%/px vertical]",['without arguments']);
          }
          width = jQuerOs("#image_width_per-" + oss.params.moduleId).val();
          screenWidth = jQuerOs(window).innerWidth();
          width = screenWidth*(width/100)+"px;";
          height = jQuerOs("#image_height_px-" + oss.params.moduleId).val()*kw+"px;";

          jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
          jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
        }

        //% bouth
        if(jQuerOs(container + " .is_width_in_pixels:checked").val()==0 && jQuerOs(container + " .is_height_in_pixels:checked").val()==0){
          //% and 1 column and img > 1 per slides
          if(oss.params.debugMode){
            console.log("oss.changeStyle::[% vertical]",['without arguments']);
          }
          width = jQuerOs("#image_width_per-" + oss.params.moduleId).val();
          screenWidth = jQuerOs(window).innerWidth();
          width = screenWidth*(width/100)+"px;";
          height = jQuerOs("#image_height_per-" + oss.params.moduleId).val();
          screenHeight = jQuerOs(window).innerHeight();
          height = screenHeight*(height/100)+"px;";

          jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container").attr("style","width:"+width+"height:"+height);
          jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").attr("style","height:"+height);
        }
      }

     

    //end
    }

    oss.toSl = function(cssValue){
      var containerWidth = jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-wrapper .swiper-slide").width(); //600px
      var sl = containerWidth/100; //6px = 1ye
      var textValue = cssValue.replace('px','')/sl;

      return textValue;
    }

    oss.toPx = function(textValue){
      var containerWidth = jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-wrapper .swiper-slide").width(); //600px
      var sl = containerWidth/100; //6px = 1ye
      var pixelsCount = (sl*textValue);

      return pixelsCount;
    }

    oss.resizeSlider = function(){


      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").each(function(index, el) {

    
        fontSize = jQuerOs(el).attr("data-font-size");
        lineHeight = jQuerOs(el).attr("data-line-height");
        borderWidth = jQuerOs(el).attr("data-border-width");
        paddingTop = jQuerOs(el).attr("data-padding-top");
        paddingRight = jQuerOs(el).attr("data-padding-right");
        paddingBottom = jQuerOs(el).attr("data-padding-bottom");
        paddingLeft = jQuerOs(el).attr("data-padding-left");
        borderRadius = jQuerOs(el).attr("data-border-radius");

        textHShadow = jQuerOs(el).attr("data-text-h-shadow");
        textVShadow = jQuerOs(el).attr("data-text-v-shadow");
        textBlurRadius = jQuerOs(el).attr("data-text-blur-radius");
        textShadowColorpicker = jQuerOs(el).attr("data-text-shadow-colorpicker");


        jQuerOs(el).css("font-size", oss.toPx(fontSize)+"px");
        jQuerOs(el).css("line-height", '100%');
        jQuerOs(el).css("border-width", oss.toPx(borderWidth)+"px");
        jQuerOs(el).css("padding-top",oss.toPx(paddingTop)+"px" );
        jQuerOs(el).css("padding-right",oss.toPx(paddingRight)+"px" );
        jQuerOs(el).css("padding-bottom",oss.toPx(paddingBottom)+"px" );
        jQuerOs(el).css("padding-left",oss.toPx(paddingLeft)+"px" );
        jQuerOs(el).css("height", 'auto');
        jQuerOs(el).css("border-radius",oss.toPx(borderRadius)+"px");

        // alert(el);

        jQuerOs(el).css("text-shadow",textShadowColorpicker+" "+
                                       oss.toPx(textHShadow)+"px "+
                                       oss.toPx(textVShadow)+"px "+
                                       oss.toPx(textBlurRadius)+"px");

        // fix for <h>
        el = jQuerOs(el).find("h1,h2,h3,h4,h5,h6");
        if(el.length){
          jQuerOs(el).each(function(index, el) {
            if ( jQuerOs(el).is( "h1" ) ) {
              jQuerOs(el).css("font-size", 2+'em');
              jQuerOs(el).css("line-height", 2+'em');
            }
            if ( jQuerOs(el).is( "h2" ) ) {
              jQuerOs(el).css("font-size", 1.5+'em');
              jQuerOs(el).css("line-height", 1.5+'em');
            }
            if ( jQuerOs(el).is( "h3" ) ) {
              jQuerOs(el).css("font-size", 1.17+'em');
              jQuerOs(el).css("line-height", 1.17+'em');
            }
            if ( jQuerOs(el).is( "h4" ) ) {
              jQuerOs(el).css("font-size", 1+'em');
              jQuerOs(el).css("line-height", 1+'em');
            }
            if ( jQuerOs(el).is( "h5" ) ) {
              jQuerOs(el).css("font-size", 0.83+'em');
              jQuerOs(el).css("line-height", 0.83+'em');
            }
            if ( jQuerOs(el).is( "h6" ) ) {
              jQuerOs(el).css("font-size", 0.67+'em');
              jQuerOs(el).css("line-height", 0.67+'em');
            }
          });
        }

        //arrow
        // if(jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-next")){
        //   jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-next").css("height", 44*kw+"px");
        // }

        // if(jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-prev")){
        //   jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-prev").css("height", 44*kw+"px");
        // }
      });
      //end
    }

    oss.addBackgroundToThumbs = function(){
      if(oss.params.debugMode){
        console.log("oss.addBackgroundToThumbs",[]);
      }

      jQuerOs("#os-slider-"+oss.params.moduleId + " div.swiper-slide").each(function(index,el){
        var image_id = jQuerOs(el).attr('data-image-id');
        var backgroundColor = jQuerOs(el).attr('data-image-background');
        jQuerOs(container + " .slider-image[data-image-id="+image_id+"]").parent('div').css('backgroundColor',backgroundColor);
      })

    }

    oss.addFilterSelect = function(image_id){
      if(oss.params.debugMode){
        console.log("oss.addFilterSelect",[image_id]);
      }

      if(!image_id) return;

        return '<span data-image-id="'+image_id+'" class="image-filter" style="display:none">Filters: <select data-image-id="'
          +image_id+'" class="filter-select" name="image_filter['+image_id+
          ']"><option selected="" value="none">None</option>'+
          '<option disabled style="font-weight:bold; color:#3A8BDF; font-style:italic;" value="blur">-- Blur --</option>'+
          '<option value="blur1">Blur 1px</option><option value="blur2">Blur 2px</option>'+
          '<option value="blur3">Blur 3px</option><option value="blur5">Blur 5px</option>'+
          '<option value="blur10">Blur 10px</option>'+
          '<option disabled style="font-weight:bold; color:#3A8BDF; font-style:italic;" value="grayscale">-- Grayscale --</option>'+
          '<option value="grayscale1">Grayscale 0.1</option><option value="grayscale2">Grayscale 0.2</option>'+
          '<option value="grayscale3">Grayscale 0.3</option><option value="grayscale5">Grayscale 0.5</option>'+
          '<option value="grayscale7">Grayscale 0.7</option><option value="grayscale10">Grayscale 1</option>'+
          '<option disabled style="font-weight:bold; color:#3A8BDF; font-style:italic;" value="hue-rotate">-- Hue rotate --</option>'+
          '<option value="hue-rotate90">Hue rotate 90deg</option><option value="hue-rotate180">Hue rotate 180deg</option>'+
          '<option value="hue-rotate270">Hue rotate 270deg</option>'+
          '<option disabled style="font-weight:bold; color:#3A8BDF; font-style:italic;" value="instagram">-- Instagram filters --</option>'+
          '<option value="_1977">1977</option><option value="aden">Aden</option>'+
          '<option value="brannan">Brannan</option><option value="brooklyn">Brooklyn</option>'+
          '<option value="clarendon">Clarendon</option> <option value="earlybird">Earlybird</option>'+
          '<option value="gingham">Gingham</option><option value="hudson">Hudson</option>'+
          '<option value="inkwell">Inkwell</option><option value="kelvin">Kelvin</option>'+
          '<option value="lark">Lark</option><option value="lofi">Lo-Fi</option>'+
          '<option value="maven">Maven</option><option value="mayfair">Mayfair</option>'+
          '<option value="moon">Moon</option><option value="nashville">Nashville</option>'+
          '<option value="perpetua">Perpetua</option><option value="reyes">Reyes</option>'+
          '<option value="rise">Rise</option><option value="slumber">Slumber</option>'+
          '<option value="stinson">Stinson</option><option value="toaster">Toaster</option>'+
          '<option value="valencia">Valencia</option><option value="walden">Walden</option>'+
          '<option value="willow">Willow</option><option value="xpro2">X-pro II</option>'+
          '<option disabled style="font-weight:bold; color:#3A8BDF; font-style:italic;" value="other">-- Other filters --</option>'+
          '<option value="brightness">Brightness</option><option value="contrast">Contrast</option>'+
          '<option value="invert">Invert</option>'+
          '<option disabled style="font-weight:bold; color:#3A8BDF; font-style:italic;" value="saturate">-- Saturate --</option>'+
          '<option value="saturate2">Saturate 2</option><option value="saturate3">Saturate 3</option>'+
          '<option value="saturate5">Saturate 5</option><option value="saturate7">Saturate 7</option>'+
          '<option value="saturate10">Saturate 10</option>'+
          '<option disabled style="font-weight:bold; color:#3A8BDF; font-style:italic;" value="sepia">-- Sepia --</option>'+
          '<option value="sepia1">Sepia 0.1</option><option value="sepia2">Sepia 0.2</option>'+
          '<option value="sepia3">Sepia 0.3</option><option value="sepia5">Sepia 0.5</option>'+
          '<option value="sepia7">Sepia 0.7</option><option value="sepia10">Sepia 1</option>'+
          '<option disabled style="font-weight:bold; color:#3A8BDF; font-style:italic;" value="opacity">-- Transparent --</option>'+
          '<option value="opacity0">Opacity 0</option><option value="opacity1">Opacity 0.1</option>'+
          '<option value="opacity2">Opacity 0.2</option><option value="opacity3">Opacity 0.3</option>'+
          '<option value="opacity5">Opacity 0.5</option><option value="opacity7">Opacity 0.7</option>'+
          '<option value="opacity9">Opacity 0.9</option></select></span>';
    }

    oss.resetSlider = function (reinit){

      if(oss.params.debugMode){
        console.log("oss.resetSlider",[reinit]);
      }
      oss.changeStyle();


      if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() == 1 && jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val() == 1){
        jQuerOs("#spaceBetween-" + oss.params.moduleId).closest('.spaceBetween-block').hide('slow');
      }else{
        jQuerOs("#spaceBetween-" + oss.params.moduleId).closest('.spaceBetween-block').show('slow');
      }
      if(jQuerOs(container + " .is_width_in_pixels:checked").val() == 1){
        jQuerOs("#is_width_in_pixels-block-" + oss.params.moduleId).show('slow');
        jQuerOs("#width-percentage-block-" + oss.params.moduleId).hide('slow');
      }else{
        jQuerOs("#is_width_in_pixels-block-" + oss.params.moduleId).hide('slow');
        jQuerOs("#width-percentage-block-" + oss.params.moduleId).show('slow');
      }

      if(jQuerOs(container + " .is_height_in_pixels:checked").val() == 1){
        jQuerOs("#is_height_in_pixels-block-" + oss.params.moduleId).show('slow');
        jQuerOs("#height-percentage-block-" + oss.params.moduleId).hide('slow');
      }else{
        jQuerOs("#is_height_in_pixels-block-" + oss.params.moduleId).hide('slow');
        jQuerOs("#height-percentage-block-" + oss.params.moduleId).show('slow');
      }
      if(jQuerOs(container + " .slider-effect").val() == 'parallax'){
        jQuerOs("#height-auto-" + oss.params.moduleId).prop('checked',false);
        jQuerOs("#height-auto-" + oss.params.moduleId).parents(".option-block").hide();
        if(jQuerOs(container + " .direction:checked").val() == 'horizontal'){
          jQuerOs("div[id^='os-slider'] .parallax-bg").css({"width":"130%", "height":"100%"});
        }else{
          jQuerOs("div[id^='os-slider'] .parallax-bg").css({"width":"100%", "height":"130%"});
        }
      }else{
        jQuerOs("#height-auto-" + oss.params.moduleId).parents(".option-block").show();
      }
      if(jQuerOs("#height-auto-" + oss.params.moduleId).prop('checked')){
        jQuerOs("#image_height_per-" + oss.params.moduleId).hide('slow');
        jQuerOs("#image_height_px-" + oss.params.moduleId).hide('slow');
        jQuerOs("#height-pixel-" + oss.params.moduleId).parents(".option-block").hide('slow');
      }else{
        jQuerOs("#image_height_per-" + oss.params.moduleId).show('slow');
        jQuerOs("#image_height_px-" + oss.params.moduleId).show('slow');
        jQuerOs("#height-pixel-" + oss.params.moduleId).parents(".option-block").show('slow');
        if(jQuerOs(container + " .is_height_in_pixels:checked").val() == 1){
          jQuerOs("#is_height_in_pixels-block-" + oss.params.moduleId).show('slow');
          jQuerOs("#height-percentage-block-" + oss.params.moduleId).hide('slow');
        }else{
          jQuerOs("#is_height_in_pixels-block-" + oss.params.moduleId).hide('slow');
          jQuerOs("#height-percentage-block-" + oss.params.moduleId).show('slow');
        }
      }

      //autoplay
      if(jQuerOs("#autoplay-" + oss.params.moduleId).val() > 1){
        jQuerOs("#autoplay-interaction-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#autoplay-interaction-block-" + oss.params.moduleId).hide('slow');
      }

      //free mode
      if(jQuerOs(container + " .freeMode:checked").val() == 1){
        jQuerOs("#free-mode-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#free-mode-block-" + oss.params.moduleId).hide('slow');
      }
      if(jQuerOs(container + " .freeModeMomentum:checked").val() == 1){
        jQuerOs("#freeModeMomentumRatio-" + oss.params.moduleId).closest('div.option-block').show('slow');
      }else{
        jQuerOs("#freeModeMomentumRatio-" + oss.params.moduleId).closest('div.option-block').hide('slow');
      }
      if(jQuerOs(container + " .freeModeMomentumBounce:checked").val() == 1){
        jQuerOs("#freeModeMomentumBounceRatio-" + oss.params.moduleId).closest('div.option-block').show('slow');
      }else{
        jQuerOs("#freeModeMomentumBounceRatio-" + oss.params.moduleId).closest('div.option-block').hide('slow');
      }

      //cube
      if(jQuerOs(container + " .slider-effect").val() == 'cube'){
        jQuerOs("#cube-animation-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#cube-animation-block-" + oss.params.moduleId).hide('slow');
      }
      if(parseInt(jQuerOs(container +" .slideShadows:checked").val()) || parseInt(jQuerOs(container + " .shadow:checked").val())){
        jQuerOs("#shadowOffset-" + oss.params.moduleId+", #shadowScale-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#shadowOffset-" + oss.params.moduleId+", #shadowScale-" + oss.params.moduleId).hide('slow');
      }

      //coverflow
      if(jQuerOs(container + " .slider-effect").val() == 'coverflow'){
        jQuerOs("#coverflow-animation-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#coverflow-animation-block-" + oss.params.moduleId).hide('slow');
      }

      //flip
      if(jQuerOs(container + " .slider-effect").val() == 'flip'){
        jQuerOs("#flip-animation-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#flip-animation-block-" + oss.params.moduleId).hide('slow');
      }
      if(jQuerOs(container + " .slider-effect").val() == 'coverflow' || jQuerOs(container + " .slider-effect").val() == 'slide'){
        jQuerOs("#slidesPerView-" + oss.params.moduleId).parents(".hide-block").show();
      }else{
        jQuerOs("#slidesPerView-" + oss.params.moduleId+", #slidesPerColumn-" + oss.params.moduleId).val(1);
        jQuerOs("#slidesPerView-" + oss.params.moduleId).parents(".hide-block").hide();
      }


      //effects
      if(jQuerOs(container + " .slider-effect").val() == 'custom'){

        // if(!jQuerOs(container + " .animation-manager-block:visible").length){
        //   oss.params.setupAnimation.start = [];
        //   oss.params.setupAnimation.end = [];
        // }

        jQuerOs(container + " .animation-manager-block").show('slow');

      }else if(jQuerOs(container + " .slider-effect").val() != 'slide' 
               && jQuerOs(container + " .slider-effect").val() != 'fade'
               && jQuerOs(container + " .slider-effect").val() != 'cube' 
               && jQuerOs(container + " .slider-effect").val() != 'parallax' 
               && jQuerOs(container + " .slider-effect").val() != 'coverflow'
               && jQuerOs(container + " .slider-effect").val() != 'flip' 
               && jQuerOs(container + " .slider-effect").val() != 'custom'){
    
      jQuerOs(container + " .animation-manager-block").hide('slow');

        if(jQuerOs(container + " .slider-effect").val() 
           && jQuerOs(container + " .slider-effect").val().split("+").length == 2){

            effectArr = jQuerOs(container + " .slider-effect").val().split("+");
            oss.params.setupAnimation.start = [];
            oss.params.setupAnimation.end = [];
            if(effectArr[0]){
              oss.params.setupAnimation.start.push(effectArr[0]);
            }
            if(effectArr[1]){
              oss.params.setupAnimation.end.push(effectArr[1]);
            }

        }else{
            jQuerOs(container + " .animation-manager-block").hide('slow');
            oss.params.setupAnimation= {};
            oss.params.setupAnimation.start = [];
            oss.params.setupAnimation.start.push(jQuerOs(container +" .slider-effect").val());
        }

      }else{
        jQuerOs(container + " .animation-manager-block").hide('slow');
        oss.params.setupAnimation= {};
      }
      //end

      if(parseInt(jQuerOs(container + " .pagination:checked").val()) 
         && jQuerOs(container + " .paginationType:checked").val() == 'progress'){
          jQuerOs("#os-slider-"+oss.params.moduleId + " .swiper-pagination").removeClass("swiper-pagination-bullets swiper-pagination-fraction");
      }else if(parseInt(jQuerOs(container + " .pagination:checked").val()) 
               && jQuerOs(container + " .paginationType:checked").val() == 'fraction'){
        jQuerOs("#os-slider-"+oss.params.moduleId + " .swiper-pagination").removeClass("swiper-pagination-bullets swiper-pagination-progress");
      }else{
        jQuerOs("#os-slider-"+oss.params.moduleId + " .swiper-pagination").removeClass("swiper-pagination-fraction swiper-pagination-progress");
      }

      if(jQuerOs("#paginationCont-" + oss.params.moduleId).prop("checked")){
        jQuerOs("#pagination-lickable-block-" + oss.params.moduleId + ",#os-slider-"+oss.params.moduleId+"  .swiper-pagination").show('slow');
      }else{
        jQuerOs("#pagination-lickable-block-" + oss.params.moduleId + ",#os-slider-"+oss.params.moduleId+"  .swiper-pagination").hide('slow');
      }

      if(jQuerOs(container + " .slider-effect").val() == 'parallax'){
        jQuerOs(container + " #loop1-"+oss.params.moduleId).prop('checked', 'checked');
        jQuerOs(container + " #loop1-"+oss.params.moduleId).parents(".option-block").parent().hide();
      }else{
        jQuerOs(container + " #loop1-"+oss.params.moduleId).parents(".option-block").parent().show();
      }

      if(parseInt(jQuerOs(container + " .loop:checked").val())){
        jQuerOs("#looped-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#looped-block-" + oss.params.moduleId).hide('slow');
      }
      if(parseInt(jQuerOs(container + " .prev_next_arrows:checked").val())){

        jQuerOs("#os-slider-"+oss.params.moduleId + " .swiper-button-prev,#os-slider-"+oss.params.moduleId +" .swiper-button-next").show('slow');

        if(jQuerOs("#os-slider-"+oss.params.moduleId +" .swiper-button-next").hasClass('hide')) jQuerOs("#os-slider-"+oss.params.moduleId +" .swiper-button-next").hide()

        if(jQuerOs("#os-slider-"+oss.params.moduleId +" .swiper-button-prev").hasClass('hide')) jQuerOs("#os-slider-"+oss.params.moduleId +" .swiper-button-prev").hide()

      }else{
        jQuerOs("#os-slider-"+oss.params.moduleId + " .swiper-button-next,#os-slider-"+oss.params.moduleId +" .swiper-button-prev").hide('slow');
      }

      if(jQuerOs(container + " .cropImage:checked").val() > 0){
        jQuerOs("#crop_wxh_block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#crop_wxh_block-" + oss.params.moduleId).hide('slow');
      }

      if(jQuerOs(container + " .lazy:checked").val() == 1){
        jQuerOs("#loadPrevNextBlock-" + oss.params.moduleId).show("slow");
        if(jQuerOs(container + " .loadPrevNext:checked").val() == 1){
          jQuerOs("#lazyAmountBlock-" + oss.params.moduleId).show("slow");
        }else{
          jQuerOs("#lazyAmountBlock-" + oss.params.moduleId).hide("slow");
        }
      }else{
        jQuerOs("#loadPrevNextBlock-" + oss.params.moduleId).hide("slow");
        jQuerOs("#lazyAmountBlock-" + oss.params.moduleId).hide("slow");
      }


      oss.makeCopyright(oss.params.activeTab);

      //change slider option
      var params = new Object();
      params.direction = jQuerOs(container + " .direction:checked").val();
      params.initialSlide = parseInt(jQuerOs("#initialSlide-" + oss.params.moduleId).val());
      params.autoplay = parseInt(jQuerOs("#autoplay-" + oss.params.moduleId).val());
      params.autoplayStopOnLast = parseInt(jQuerOs(container + " .autoplayStopOnLast:checked").val());
      params.autoplayDisableOnInteraction = parseInt(jQuerOs(container + " .autoplay_interaction:checked").val());
      params.freeMode = parseInt(jQuerOs(container + " .freeMode:checked").val());
      params.freeModeMomentum = parseInt(jQuerOs(container + " .freeModeMomentum:checked").val());
      params.freeModeMomentumRatio = parseFloat(jQuerOs("#freeModeMomentumRatio-" + oss.params.moduleId).val());
      params.freeModeMomentumBounce = parseInt(jQuerOs(container + " .freeModeMomentumBounce:checked").val());
      params.freeModeMomentumBounceRatio = parseInt(jQuerOs("#freeModeMomentumBounceRatio-" + oss.params.moduleId).val());
      params.freeModeMinimumVelocity = parseFloat(jQuerOs("#freeModeMinimumVelocity-" + oss.params.moduleId).val());
      params.is_width_in_pixels = parseInt(jQuerOs(container + " .is_width_in_pixels:checked").val());
      params.is_height_in_pixels = parseInt(jQuerOs(container + " .is_height_in_pixels:checked").val());


      //bch
      imageFullTime = new Object();
      jQuerOs(container + " .image-time-block .time-input").each(function(index, el){
        imageFullTime[jQuerOs(el).parent().attr("data-image-id")] = jQuerOs(el).val();
      });
      params.imageFullTime = imageFullTime;

      imageLink = new Object();
      jQuerOs(container + " .image-link-block .image-link-input").each(function(index, el){
        imageLink[jQuerOs(el).parent().attr("data-image-id")] = jQuerOs(el).val();
      });
      params.imageLink = imageLink;

      //filters
      var imageFilter = new Object();
      jQuerOs(container + " .image-filter-block .filter-select").each(function(index, el){
        imageFilter[jQuerOs(el).parent().attr("data-image-id")] = jQuerOs(el).val();
      });
      params.imageFilter = imageFilter;
      //filters


      jQuerOs(container + " .image-background-block .background-input").val();

       //img background
      var imageBackground = new Object();
      jQuerOs(container + " .image-background-block .background-input").each(function(index, el){
        imageBackground[jQuerOs(el).closest('span').attr("data-image-id")] = jQuerOs(el).val();
      });
      params.imageBackground = imageBackground;
      //img background



      params.effect = jQuerOs(container + " .slider-effect").val();
      if(params.effect == "coverflow" && oss.params.resetSpeed){
        jQuerOs("#slidesPerView-" + oss.params.moduleId).val(3);
      }

      params.cube = new Object();
      params.cube.slideShadows = parseInt(jQuerOs(container + " .slideShadows:checked").val());
      params.cube.shadow = parseInt(jQuerOs(container + " .shadow:checked").val());
      params.cube.shadowOffset = parseInt(jQuerOs("#shadowOffset-" + oss.params.moduleId).val());
      params.cube.shadowScale = parseFloat(jQuerOs("#shadowScale-" + oss.params.moduleId).val());

      params.coverflow = new Object();
      params.coverflow.rotate = parseInt(jQuerOs("#rotate-" + oss.params.moduleId).val());
      params.coverflow.stretch = parseInt(jQuerOs("#stretch-" + oss.params.moduleId).val());
      params.coverflow.depth = parseInt(jQuerOs("#depth-" + oss.params.moduleId).val());
      params.coverflow.modifier = parseInt(jQuerOs("#modifier-" + oss.params.moduleId).val());
      params.coverflow.coverflowSlideShadows = parseInt(jQuerOs(container + " .coverflowSlideShadows:checked").val());

      params.flip = new Object();
      params.flip.slideShadows = parseInt(jQuerOs(container + " .flipSlideShadows:checked").val());
      params.flip.limitRotation = parseInt(jQuerOs(container + " .flipLimitRotation:checked").val());

      params.spaceBetween = parseInt(jQuerOs("#spaceBetween-" + oss.params.moduleId).val());
      params.slidesPerView = parseInt(jQuerOs("#slidesPerView-" + oss.params.moduleId).val());
      params.slidesPerColumn = parseInt(jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val());
      params.slidesPerColumnFill = jQuerOs(container + " .slidesPerColumnFill:checked").val();

      params.slidesPerGroup = parseInt(jQuerOs("#slidesPerGroup-" + oss.params.moduleId).val());

      params.centeredSlides = parseInt(jQuerOs(container + " .centeredSlides:checked").val());

      if(parseInt(jQuerOs(container + " .pagination:checked").val())){
        params.pagination = "#os-slider-"+oss.params.moduleId+' .swiper-pagination';
      }else{
        params.pagination = 0;
      }
      params.paginationType = jQuerOs(container + " .paginationType:checked").val();
      params.paginationClickable = parseInt(jQuerOs(container + " .paginationClickable:checked").val());
      if(parseInt(jQuerOs(".showScrollbar:checked").val())){
        params.scrollbar = "#os-slider-"+oss.params.moduleId+' .swiper-scrollbar';
      }else{
        params.scrollbar = 0;
      }

      params.scrollbarHide = parseInt(jQuerOs(container + " .scrollbarHide:checked").val());
      params.scrollbarDraggable = parseInt(jQuerOs(container + " .scrollbarDraggable:checked").val());

      params.keyboardControl = parseInt(jQuerOs(container + " .keyboardControl:checked").val());
      params.mousewheelControl = parseInt(jQuerOs(container + " .mousewheelControl:checked").val());
      params.mousewheelReleaseOnEdges = parseInt(jQuerOs(container + " .mousewheelReleaseOnEdges:checked").val());
      params.loop = parseInt(jQuerOs(container + " .loop:checked").val());
      params.slideActiveClass = "#os-slider-"+oss.params.moduleId+' swiper-slide-active';
      params.crop_image = jQuerOs(container + " .cropImage:checked").val();


      if(params.effect == 'parallax'){
        jQuerOs("#crop-image-option-block-" + oss.params.moduleId + " .important-animation-message").remove();
        if(jQuerOs(container + " .lazy:checked").val() == 1){
          jQuerOs(container+" .selected-layout").prepend('<span class="important-animation-message">Parallax animation not work with Lazy Loading.</span>');
          oss.params.parallax = params.parallax = 0;
        }else{
          oss.params.parallax = params.parallax = 1;
        }
      }else{
        jQuerOs("#crop-image-option-block-" + oss.params.moduleId + " .important-animation-message").remove();
        oss.params.parallax = params.parallax = 0;
      }
      params.image_width = jQuerOs("#image_width-" + oss.params.moduleId).val();
      params.image_height = jQuerOs("#image_height-" + oss.params.moduleId).val();
      params.lazy = jQuerOs(container + " .lazy:checked").val();
      params.loadPrevNext = jQuerOs(container + " .loadPrevNext:checked").val();
      params.loadPrevNextAmount = jQuerOs("#loadPrevNextAmount-" + oss.params.moduleId).val();
      params.setupAnimation = oss.params.setupAnimation;
      params.textAnimation = oss.params.textAnimation;
      //setup speed
      if((typeof params.setupAnimation.start != 'undefined' || typeof params.setupAnimation.end != 'undefined') 
        && oss.params.resetSpeed && jQuerOs(container + " .slider-effect").val() != 'custom'){
        if(typeof params.setupAnimation.start != 'undefined' && typeof params.setupAnimation.end != 'undefined'){
          if(params.setupAnimation.start == 'flip' && params.setupAnimation.end == ''){
            jQuerOs("#speed-" + oss.params.moduleId).val(0);
          }
          if(params.setupAnimation.start == 'flip' && params.setupAnimation.end == 'pulse'
            || params.setupAnimation.start == 'shake' && params.setupAnimation.end == 'rotateOut'){
            jQuerOs("#speed-" + oss.params.moduleId).val(300);
          }
          if(params.setupAnimation.start == 'bounceInLeft' && params.setupAnimation.end == 'swing'
            || params.setupAnimation.start == 'bounce' && params.setupAnimation.end == 'pulse'
            || params.setupAnimation.start == 'pulse' && params.setupAnimation.end == 'bounce'
            || params.setupAnimation.start == 'slideInUp' && params.setupAnimation.end == 'hinge'){
            jQuerOs("#speed-" + oss.params.moduleId).val(500);
          }
          if(params.setupAnimation.start == 'fadeInLeftBig' && params.setupAnimation.end == 'tada'
            || params.setupAnimation.start == 'fadeInRightBig' && params.setupAnimation.end == 'swing'
            || params.setupAnimation.start == 'fadeInLeftBig' && params.setupAnimation.end == 'swing'
            || params.setupAnimation.start == 'fadeInRightBig' && params.setupAnimation.end == 'tada'
            || params.setupAnimation.start == 'slideInDown' && params.setupAnimation.end == 'bounce'
            || params.setupAnimation.start == 'zoomOut' && params.setupAnimation.end == 'tada'
            || params.setupAnimation.start == 'rotateIn' && params.setupAnimation.end == 'tada'){
            jQuerOs("#speed-" + oss.params.moduleId).val(1000);
          }
        }
        else if(typeof params.setupAnimation.start != 'undefined' && params.setupAnimation.start != ''){
          if(params.setupAnimation.start == 'bounce'){
            jQuerOs("#speed-" + oss.params.moduleId).val(500);
          }else{
            jQuerOs("#speed-" + oss.params.moduleId).val(0);
          }
        }
        else if(typeof params.setupAnimation.end != 'undefined' && params.setupAnimation.end != ''){

        }
      }else if(oss.params.resetSpeed){
        jQuerOs("#speed-" + oss.params.moduleId).val(1000);
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-prev img").show();
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-next img").show();
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active img").show();
      }
      //end
      params.speed = parseInt(jQuerOs("#speed-" + oss.params.moduleId).val());

      // if(kw == 1){
        params.userScreenWidth = screen.width;
        params.userScreenHeight = jQuerOs(window).innerHeight();
      // }
      if(kw == 1 && jQuerOs("#width-percentage-block-" + oss.params.moduleId).css('display') == 'none'){
        params.userScreenWidth = jQuerOs(window).innerWidth();
        params.userScreenHeight = jQuerOs(window).innerHeight();
      }
        

      if(oss.params.imageOrdering.length > 0){
        params.imageOrdering = oss.params.imageOrdering;
      }else{
        oss.params.imageOrdering = jQuerOs(container + " .existing-images").sortable('toArray', {attribute: 'data-sortable-id'});
        params.imageOrdering = oss.params.imageOrdering;
      }
      params.textOrdering = oss.params.textOrdering;
      if(reinit){
        //bch
        jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").each(function(index, el) {
          jQuerOs(this).attr("data-style",jQuerOs(this).attr("style"));
        });

        oss.reinitSlider(params, oss.params.setupAnimation);
        oss.changeStyle();
        oss.params.swiperSlider.update(true);

        jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").each(function(index, el) {
          jQuerOs(this).attr("style",jQuerOs(this).attr("data-style"));
        });


      }else{
         //oss.params.swiperSlider.params = params;
        //need reload page block
        //for crop
        if((jQuerOs(container + " .cropImage:checked").val() != oss.params.crop)
            || (jQuerOs("#image_width-" + oss.params.moduleId).val() != oss.params.imageWidth
                || jQuerOs("#image_height-" + oss.params.moduleId).val() != oss.params.imageHeight)){
          if(!jQuerOs("#crop-image-option-block-" + oss.params.moduleId + " .important-message").length){
            jQuerOs("#crop-image-option-block-" + oss.params.moduleId).prepend('<span class="important-message">You need save and reload page to see changes.</span>');
            jQuerOs("#save-settings-" + oss.params.moduleId).addClass('need-save');
          }
        }else{
          jQuerOs("#crop-image-option-block-" + oss.params.moduleId + " .important-message").remove();
        }
        //for lazy loading
        if(jQuerOs(container + " .lazy:checked").val() != oss.params.lazy
          || jQuerOs(container + " .loadPrevNext:checked").val() != oss.params.loadPrevNext
          || jQuerOs("#loadPrevNextAmount-" + oss.params.moduleId).val() != oss.params.loadPrevNextAmount){
            jQuerOs("#lazy-loading-image-option-block-" + oss.params.moduleId + " .important-message").remove();
            if(jQuerOs(container + " .slider-effect").val() == 'parallax' && jQuerOs(container + " .lazy:checked").val() ==1){
              jQuerOs("#lazy-loading-image-option-block-" + oss.params.moduleId).prepend('<span class="important-message">Lazy load not working with Parallax animation.</span>');
              params.lazy = false;
              jQuerOs("#lazy1-" + oss.params.moduleId).prop("checked", true);
              params.loadPrevNext = false;
              jQuerOs("#loadPrevNext1-" + oss.params.moduleId).prop("checked", true);
              params.loadPrevNextAmount = 1;
              jQuerOs("#loadPrevNextAmount-" + oss.params.moduleId).val(1);
            }else{
              jQuerOs("#lazy-loading-image-option-block-" + oss.params.moduleId).prepend('<span class="important-message">You need save and reload page to see changes.</span>');
            }
            jQuerOs("#save-settings-" + oss.params.moduleId).addClass('need-save');
        }else{
          jQuerOs("#lazy-loading-image-option-block-" + oss.params.moduleId + " .important-message").remove();
        }
        //end
        oss.params.swiperSlider.update(true);
      }






      if(parseInt(jQuerOs(container + " .showScrollbar:checked").val())){
        jQuerOs("#scrollbar-block-" + oss.params.moduleId + ",#os-slider-"+oss.params.moduleId+"  .swiper-scrollbar").show('slow');
      }else{
        jQuerOs("#scrollbar-block-" + oss.params.moduleId + ",#os-slider-"+oss.params.moduleId+" .swiper-scrollbar").hide('slow');
      }
      params.height_px = parseInt(jQuerOs("#image_height_px-" + oss.params.moduleId).val());
      params.width_px = parseInt(jQuerOs("#image_width_px-" + oss.params.moduleId).val());
      params.width_per = parseInt(jQuerOs("#image_width_per-" + oss.params.moduleId).val());
      params.height_per = parseInt(jQuerOs("#image_height_per-" + oss.params.moduleId).val());
      params.is_width_in_pixels = parseInt(jQuerOs(container + " .is_width_in_pixels:checked").val());
      params.is_height_in_pixels = parseInt(jQuerOs(container + " .is_height_in_pixels:checked").val());
      params.height_auto = jQuerOs("#height-auto-" + oss.params.moduleId).prop('checked');
      params.object_fit = jQuerOs(container + " .objectFit:checked").val();
      params.prev_next_arrows = parseInt(jQuerOs(container + " .prev_next_arrows:checked").val());


      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-prev img").show();
      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-next img").show();
      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active img").show();
        
      oss.stopSlider();

      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").each(function(index, el){
        jQuerOs(el).css('backgroundColor',jQuerOs(el).attr('data-image-background'));
      });

      oss.makeCustomSlideColorpicker();

      return params;
    }

    //reset slider settings fn-s
    oss.resetSliderSettings = function (){
      if(oss.params.debugMode){
        console.log("oss.resetSliderSettings",['without arguments']);
      }
      
      //change slider option
      var params = new Object();
      params.direction = 'horizontal';
      jQuerOs("#direction-" + oss.params.moduleId).prop("checked", true);
      params.initialSlide = 0;
      jQuerOs("#initialSlide-" + oss.params.moduleId).val(0);
      params.autoplay = 3000;
      jQuerOs("#autoplay-" + oss.params.moduleId).val(3000);
      params.autoplayStopOnLast = false;
      jQuerOs("#autoplayStopOnLast1-" + oss.params.moduleId).prop("checked", true);
      params.autoplayDisableOnInteraction = false;
      jQuerOs("#autoplay_interaction1-" + oss.params.moduleId).prop("checked", true);
      params.speed = 300;
      jQuerOs("#speed-" + oss.params.moduleId).val(300);
      params.freeMode = false;
      jQuerOs("#freeMode1-" + oss.params.moduleId).prop("checked", true);
      params.freeModeMomentum = true;
      jQuerOs("#freeModeMomentum-" + oss.params.moduleId).prop("checked", true);
      params.freeModeMomentumRatio = 1;
      jQuerOs("#freeModeMomentumRatio-" + oss.params.moduleId).val(1);
      params.freeModeMomentumBounce = true;
      jQuerOs("#freeModeMomentumBounce-" + oss.params.moduleId).prop("checked", true);
      params.freeModeMomentumBounceRatio = 1;
      jQuerOs("#freeModeMomentumBounceRatio-" + oss.params.moduleId).val(1);
      params.freeModeMinimumVelocity = 0.02;
      jQuerOs("#freeModeMinimumVelocity-" + oss.params.moduleId).val(0.02);

      params.effect = 'slide';
      jQuerOs(container + " .slider-effect").val('slide');
      params.cube = new Object();
      params.cube.slideShadows = true;
      jQuerOs("#slideShadows-" + oss.params.moduleId).prop("checked", true);
      params.cube.shadow = true;
      jQuerOs("#shadow-" + oss.params.moduleId).prop("checked", true);
      params.cube.shadowOffset = 20;
      jQuerOs("#shadowOffset-" + oss.params.moduleId).val(20);
      params.cube.shadowScale = 0.94;
      jQuerOs("#shadowScale-" + oss.params.moduleId).val(0.94);

      params.coverflow = new Object();
      params.coverflow.rotate = 50;
      jQuerOs("#rotate-" + oss.params.moduleId).val(50);
      params.coverflow.stretch = 0;
      jQuerOs("#stretch-" + oss.params.moduleId).val(0);
      params.coverflow.depth = 100;
      jQuerOs("#depth-" + oss.params.moduleId).val(100);
      params.coverflow.modifier = 1;
      jQuerOs("#modifier-" + oss.params.moduleId).val(1);
      params.coverflow.coverflowSlideShadows = true;
      jQuerOs("#coverflowSlideShadows-" + oss.params.moduleId).prop("checked", true);

      params.flip = new Object();
      params.flip.slideShadows = true;
      jQuerOs("#flipSlideShadows-" + oss.params.moduleId).prop("checked", true);
      params.flip.limitRotation = true;
      jQuerOs("#flipLimitRotation-" + oss.params.moduleId).prop("checked", true);

      params.spaceBetween = 0;
      jQuerOs("#spaceBetween-" + oss.params.moduleId).val(0);
      params.slidesPerView = 1;
      jQuerOs("#slidesPerView-" + oss.params.moduleId).val(1);
      params.slidesPerColumn = 1;
      jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val(1);
      params.slidesPerColumnFill = true;
      jQuerOs("#slidesPerColumnFill-" + oss.params.moduleId).prop("checked", true);

      params.slidesPerGroup = 1;
      jQuerOs("#slidesPerGroup-" + oss.params.moduleId).val(1);

      params.centeredSlides = false;
      jQuerOs("#centeredSlides1-" + oss.params.moduleId).prop("checked", true);

      params.pagination = "#os-slider-"+oss.params.moduleId+' .swiper-pagination';
      jQuerOs("#paginationCont-" + oss.params.moduleId).prop("checked", true);

      params.paginationType = 'bullets';
      jQuerOs("#paginationType-" + oss.params.moduleId).prop("checked", true);
      params.paginationClickable = false;
      jQuerOs(container + " .paginationClickable1").prop("checked", true);
      params.scrollbar = false;
      jQuerOs("#showScrollbar1-" + oss.params.moduleId).prop("checked", true);

      params.scrollbarHide = true;
      jQuerOs("#scrollbarHide-" + oss.params.moduleId).prop("checked", true);
      params.scrollbarDraggable = false;
      jQuerOs("#scrollbarDraggable1-" + oss.params.moduleId).prop("checked", true);

      params.keyboardControl = false;
      jQuerOs("#keyboardControl1-" + oss.params.moduleId).prop("checked", true);
      params.mousewheelControl = false;
      jQuerOs("#mousewheelControl1-" + oss.params.moduleId).prop("checked", true);
      params.mousewheelReleaseOnEdges = false;
      jQuerOs("#mousewheelReleaseOnEdges1-" + oss.params.moduleId).prop("checked", true);

      params.loop = false;
      jQuerOs("#loop1-" + oss.params.moduleId).prop("checked", true);

      params.crop_image = 0;
      jQuerOs("#crop_image2-" + oss.params.moduleId).prop("checked", true);

      params.object_fit = 0;
      jQuerOs("#object_fit2-" + oss.params.moduleId).prop("checked", true);

      params.image_width = 400;
      jQuerOs("#image_width-" + oss.params.moduleId).val(400);
      params.image_height = 200;
      jQuerOs("#image_height-" + oss.params.moduleId).val(200);

      params.lazy = false;
      jQuerOs("#lazy1-" + oss.params.moduleId).prop("checked", true);
      params.loadPrevNext = false;
      jQuerOs("#loadPrevNext1-" + oss.params.moduleId).prop("checked", true);
      params.loadPrevNextAmount = 1;
      jQuerOs("#loadPrevNextAmount-" + oss.params.moduleId).val(1);




      params.slideActiveClass = 'swiper-slide-active';
      params.userScreenWidth = jQuerOs(window).innerWidth();

      //set settings
      if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() == 1 && jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val() == 1){
        jQuerOs("#spaceBetween-" + oss.params.moduleId).closest('.spaceBetween-block').hide('slow');
      }else{
        jQuerOs("#spaceBetween-" + oss.params.moduleId).closest('.spaceBetween-block').show('slow');
      }

      if(jQuerOs(container + " .is_width_in_pixels:checked").val() == 1){
        jQuerOs("#is_width_in_pixels-block-" + oss.params.moduleId).show('slow');
        jQuerOs("#width-percentage-block-" + oss.params.moduleId).hide('slow');
      }else{
        jQuerOs("#is_width_in_pixels-block-" + oss.params.moduleId).hide('slow');
        jQuerOs("#width-percentage-block-" + oss.params.moduleId).show('slow');
      }

      if(jQuerOs(container + " .is_height_in_pixels:checked").val() == 1){
        jQuerOs("#is_height_in_pixels-block-" + oss.params.moduleId).show('slow');
        jQuerOs("#height-percentage-block-" + oss.params.moduleId).hide('slow');
      }else{
        jQuerOs("#is_height_in_pixels-block-" + oss.params.moduleId).hide('slow');
        jQuerOs("#height-percentage-block-" + oss.params.moduleId).show('slow');
      }

      jQuerOs("#height-auto-" + oss.params.moduleId).prop('checked',false);
      // jQuerOs("#object-fit-" + oss.params.moduleId).prop('checked',false);



      jQuerOs("#height-auto-" + oss.params.moduleId).parents(".option-block").show();

      //autoplay
      if(jQuerOs("#autoplay-" + oss.params.moduleId).val() > 1){
        jQuerOs("#autoplay-interaction-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#autoplay-interaction-block-" + oss.params.moduleId).hide('slow');
      }

      //free mode
      if(jQuerOs(container + " .freeMode:checked").val() == 1){
        jQuerOs("#free-mode-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#free-mode-block-" + oss.params.moduleId).hide('slow');
      }
      if(jQuerOs(container + " .freeModeMomentum:checked").val() == 1){
        jQuerOs("#freeModeMomentumRatio-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#freeModeMomentumRatio-" + oss.params.moduleId).hide('slow');
      }
      if(jQuerOs(container + " .freeModeMomentumBounce:checked").val() == 1){
        jQuerOs("#freeModeMomentumBounceRatio-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#freeModeMomentumBounceRatio-" + oss.params.moduleId).hide('slow');
      }

      //cube
      if(jQuerOs(container + " .slider-effect").val() == 'cube'){
        jQuerOs("#cube-animation-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#cube-animation-block-" + oss.params.moduleId).hide('slow');
      }
      if(parseInt(jQuerOs(container + " .slideShadows:checked").val()) || parseInt(jQuerOs(container + " .shadow:checked").val())){
        jQuerOs("#shadowOffset-" + oss.params.moduleId + ", #shadowScale-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#shadowOffset-" + oss.params.moduleId + ", #shadowScale-" + oss.params.moduleId).hide('slow');
      }

      //coverflow
      if(jQuerOs(container + " .slider-effect").val() == 'coverflow'){
        jQuerOs("#coverflow-animation-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#coverflow-animation-block-" + oss.params.moduleId).hide('slow');
      }

      //flip
      if(jQuerOs(container + " .slider-effect").val() == 'flip'){
        jQuerOs("#flip-animation-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#flip-animation-block-" + oss.params.moduleId).hide('slow');
      }
      if(jQuerOs(container + " .slider-effect").val() == 'coverflow' || jQuerOs(container + " .slider-effect").val() == 'slide'){
        jQuerOs("#slidesPerView-" + oss.params.moduleId).parents(".hide-block").show();
      }else{
        jQuerOs("#slidesPerView-" + oss.params.moduleId+", #slidesPerColumn-" + oss.params.moduleId).val(1);
        jQuerOs("#slidesPerView-" + oss.params.moduleId).parents(".hide-block").hide();
      }

      //effects
      oss.params.setupAnimation = {};

      jQuerOs(container + " .animation-manager-block").hide();
      if(parseInt(jQuerOs(container + " .pagination:checked").val()) && jQuerOs(container + " .paginationType:checked").val() != 'progress'){
        jQuerOs("#pagination-lickable-block-" + oss.params.moduleId + ",#os-slider-"+oss.params.moduleId+"  .swiper-pagination").show('slow');
      }else{
        jQuerOs("#pagination-lickable-block-" + oss.params.moduleId + ",#os-slider-"+oss.params.moduleId+"  .swiper-pagination").hide('slow');
      }

      if(parseInt(jQuerOs(container + " .loop:checked").val())){
        jQuerOs("#looped-block-" + oss.params.moduleId).show('slow');
      }else{
        jQuerOs("#looped-block-" + oss.params.moduleId).hide('slow');
      }

      if(parseInt(jQuerOs(container + " .prev_next_arrows:checked").val())){
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-prev,#os-slider-"+oss.params.moduleId+"  .swiper-button-next").show('slow');
      }else{
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-next,#os-slider-"+oss.params.moduleId+"  .swiper-button-prev").hide('slow');
      }
      //end

      //reinit slider
      jQuerOs("#os-slider-"+oss.params.moduleId + " .slide-text").each(function(index, el) {
        jQuerOs(this).attr("data-style",jQuerOs(this).attr("style"));
      });

      params.parallax = oss.params.parallax = 0;
      oss.reinitSlider(params, oss.params.setupAnimation);
      oss.changeStyle();
      oss.params.swiperSlider.update(true);
      jQuerOs("#os-slider-"+oss.params.moduleId + " .slide-text").each(function(index, el) {
        jQuerOs(this).attr("style",jQuerOs(this).attr("data-style"));
      });
    }


    oss.cancelImgEditor = function (){
      if(oss.params.debugMode){
        console.log("oss.cancelImgEditor",[]);
      }

      jQuerOs('#tab2-'+oss.params.moduleId+
             ', #tab3-'+oss.params.moduleId+
             ', #tab4-'+oss.params.moduleId).removeAttr('disabled');

      jQuerOs(container + " .tab-label").click(function(event) {
        oss.makeCopyright(jQuerOs(this).attr("data-tab-id"));
      });

      oss.cancelTextEditor();

      jQuerOs(container + " .slider-images .slider-image-block img").css("width","100%");
      jQuerOs(container + " .slider-images .slider-image-block img").removeClass('edit-img-active');
      // jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active").removeClass('edit-image');
      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").removeClass('edit-image');

      jQuerOs(container + " .slider-images, " +
              "#images-load-area-" + oss.params.moduleId +", .slider-image-block, .delete-current-image").show('slow');
      jQuerOs(container + " .back-image-edit," +
              container + " .add-image-text," +
              container + " .paste-image-text," +
              container + " .text-editor-block, .text-styling-block,"+
              container + " .image-time-block span,"+
              container + " .image-link-block span,"+
              container + " .image-background-block > span,"+
              container + " .image-filter-block span").hide('slow');
      //oss.params.swiperSlider.unlockSwipes();
      oss.params.swiperSlider.allowSlideNext = true;
      oss.params.swiperSlider.allowSlidePrev = true;

      currentEditImgId = 0;
      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").each(function(index, el) {
        if(jQuerOs(this).draggable( "instance" )){
          jQuerOs(this).draggable("destroy");
        }
      });

      oss.checkUnsaved();

      jQuerOs(container + " .existing-text div").remove();
      jQuerOs("#os-show-settings-button-" + oss.params.moduleId).show();

    }

    //Text Editor fn-s
    oss.addNewText= function (el){
      if(oss.params.debugMode){
        console.log("oss.addNewText",[el]);
      }
      if(jQuerOs(container + " .editing-text:visible").length){
        jQuerOs(container + " .save-text-editor").addClass('save-first');
      }else{
        jQuerOs(container+" .add-image-text,"+container+" .paste-image-text,"+
          container+" .back-image-edit,"+container+" .image-time-block,"+container+" .image-link-block,"+
          container+" .image-filter-block,"+container+" .image-background-block").hide();
        jQuerOs(container+" .cancel-text-editor,"+container+" .save-text-editor").show();
        oss.params.editTextId = -1;
        //reset text settings
        jQuerOs(container + " .text-block .text-font-size").val(4);
        jQuerOs(container + " .text-block .text-font-weight-select").val('normal');
        jQuerOs(container + " .text-block .text-align-select").val('start');
        jQuerOs(container + " .text-block .os-slider-autocomplete-input").val('');
        jQuerOs(container + " .text-block .text-color-colorpicker").val('');
        jQuerOs(container + " .text-block .text-padding-top").val('');
        jQuerOs(container + " .text-block .text-padding-right").val('');
        jQuerOs(container + " .text-block .text-padding-bottom").val('');
        jQuerOs(container + " .text-block .text-padding-left").val('');

        jQuerOs(container + " .text-block .text-h-shadow").val('');
        jQuerOs(container + " .text-block .text-v-shadow").val('');
        jQuerOs(container + " .text-block .text-blur-radius").val('');
        jQuerOs(container + " .text-block .text-shadow-colorpicker").val('');


        jQuerOs(container + " .text-block .text-block-width").val(0);
        jQuerOs(container + " .text-block .text-background-colorpicker").val('');
        jQuerOs(container + " .text-block .text-borer-width").val(0);
        jQuerOs(container + " .text-block .text-borer-radius").val(0);
        jQuerOs(container + " .text-block .text-border-colorpicker").val('');
        jQuerOs(container + " .text-block .text-custom-class").val('');
        jQuerOs(container + " .text-block .text-time-start-input").val(0);
        jQuerOs(container + " .text-block .text-time-end-input").val(0);
        jQuerOs(container + " .text-block .permanent-time-start-input").val(0);
        jQuerOs(container + " .text-block .permanent-time-end-input").val(0);
        jQuerOs(container + " .input-colorpicker").minicolors('destroy');

        oss.makeTextColorpicker();

        textStyle = 'style="font-size:'+oss.toPx("4")+'px;line-height:100%;font-weight:normal;width:auto;height:auto;"';

        //end
        jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('text-active');
        sliderEl = '<div '+textStyle+' class="slide-text text-active" data-image-id="'+currentEditImgId+'" '+
                        'data-text-id="'+(++oss.params.textId)+
                        '" data-text-order-id="'+oss.params.currentTextOrderId+
                        '" data-text-body="{}" ></div>';
        jQuerOs(oss.params.swiperSlider.slides).each(function(index, slide) {
          if(!jQuerOs(slide).hasClass('swiper-slide-duplicate')){
            if(jQuerOs(slide).attr("data-image-id") == currentEditImgId){
              jQuerOs(slide).append(sliderEl);
            }
          }
        });


        jQuerOs(container+" .anim-type .start-animations-list,"+
                container+" .anim-type .end-animations-list,"+
                container+" .anim-type .permanent-animations-list,"+
                container+" .anim-type .hover-animations-list").attr("data-text-id" ,oss.params.textId);

        jQuerOs(container+" .anim-type .start-animations-list,"+
                container+" .anim-type .end-animations-list,"+
                container+" .anim-type .permanent-animations-list,"+
                container+" .anim-type .hover-animations-list").attr("data-image-id" ,currentEditImgId);



        jQuerOs(container + " .editing-text").val('');
        jQuerOs(container + " .text-editor-block,"+container+" .text-styling-block").show("slow");
        oss.textDraggable();
      }
      oss.checkUnsaved();
    }

    oss.textDraggable = function (){
      if(oss.params.debugMode){
        console.log("oss.textDraggable",['without arguments']);
      }

      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active").draggable({
        containment: "#os-slider-"+oss.params.moduleId,
        drag: function(event, ui){

         if(jQuerOs(container+" .text-block .text-block-width").val() > 0){
            jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css('width',jQuerOs(container+" .text-block .text-block-width").val()+'%');
          }else{
            jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css('width','auto');
          }
         jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").height('auto');

        },
        stop: function( event, ui ) {

          jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css("left", ui.position.left*100/ui.helper.parent().width()+'%');
          jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css("top", ui.position.top*100/ui.helper.parent().height()+'%');

          if(jQuerOs(container+" .text-block .text-block-width").val() > 0){
            jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css('width',jQuerOs(container+" .text-block .text-block-width").val()+'%');
          }else{
            jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css('width','auto');
          }
          oss.sortImagesText(oss.params.textOrdering, jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").attr("data-image-id"));

        }
      });
    }

    oss.cancelTextEditor = function (el){
      if(oss.params.debugMode){
        console.log("oss.cancelTextEditor",[el]);
      }


      if(jQuerOs(el).length){
        jQuerOs(container + " .existing-text,"+container +"  .image-time-block,"+container +"  .image-link-block,"
          +container +"  .image-filter-block,"+container +"  .image-background-block").show();
        jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").each(function(index, el) {
          if(jQuerOs(this).draggable( "instance" )){
            jQuerOs(this).draggable("destroy");
          }
        });
        if(oss.params.previousText){
          jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active").html(oss.params.previousText);
          jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active").attr("data-text-body", window.JSON.stringify(oss.params.previousText));
          jQuerOs(container + " .text-editor-block,"+container+" .text-styling-block").hide("slow");
          oss.params.previousText = '';
        }else{
          //if only 1 text-active ///
          if(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active").length == 1){
            jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active").remove();
            jQuerOs(container + " .text-editor-block,"+container+" .text-styling-block").hide("slow");
          }
        }
        jQuerOs(container + " .save-text-editor").removeClass('save-first');
        jQuerOs(".cancel-text-editor, .save-text-editor").hide();
        jQuerOs(".back-image-edit,.add-image-text,.paste-image-text").show();

        oss.makeClickFunction(oss.params.moduleId);

      }

      oss.checkUnsaved();
    }

    oss.saveTextEditor = function (el){

      if(oss.params.debugMode){
        console.log("oss.saveTextEditor",[el]);
      }
      
      if(!jQuerOs(container + " .editing-text").val()){
        //remove from existing text

        jQuerOs(container + " .existing-text .slide-text-data").each(function(index, el) {
          if(jQuerOs(el).attr("data-text-id") == jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active").attr("data-text-id")){
            jQuerOs(el).remove();
          }
        });
        //end
        jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active").remove();
        jQuerOs("#save-settings-" + oss.params.moduleId).addClass('need-save');
        jQuerOs(container + " .text-editor-block,"+container+" .text-styling-block").hide("slow");
      }else if(jQuerOs(container + " .editing-text").val() && (jQuerOs(container + " .editing-text").val() != oss.params.previousText)){


        jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active").addClass('not-saved');
        //new text or edit exist
        //add new text in existing list
        imgId = jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active").attr("data-image-id");
        textBody = jQuerOs(container + " .editing-text").val().substring(0,100);
        textBody = textBody.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        if(oss.params.editTextId != -1){
          dataTextID = oss.params.editTextId;
          newElement = '<span class="icon-menu"></span>'+
                            '<a class="edit-current-text" aria-invalid="false"'+
                            '><i class="fa os_icon-pencil" aria-hidden="true"></i></a>'+
                            '<a class="copy-current-text oss-pro-avaible" aria-invalid="false"'+
                            '><i class="fa os_icon-docs" aria-hidden="true"></i></a>'+
                            '<a class="delete-current-text" aria-invalid="false"'+
                            '><i class="fa os_icon-cancel" aria-hidden="true"></i></a>'+

                            // '<input class="text-time-start-input" placeholder="start time" type="number" min="0" step="0.1" value="'+
                            //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-text-start-time")+
                            // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+

                            // '<input class="text-time-end-input" placeholder="stop time" type="number" min="0" step="0.1" value="'+
                            //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-text-end-time")+
                            // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+

                            // //permanent time
                            // '<input class="permanent-time-start-input" placeholder="start time" type="number" min="0" step="0.1" value="'+
                            //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-permanent-start-time")+
                            // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+
                            
                            // '<input class="permanent-time-end-input" placeholder="stop time" type="number" min="0" step="0.1" value="'+
                            //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-permanent-end-time")+
                            // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+
                            // //permanent time

                            '<i class="fa os_icon-help-circled"><span class="text-helper animated fadeInRight">Start and stop text animations!</span></i>'+
                            '<div class="text-line">'+textBody+'</div>';
          jQuerOs(container + " .existing-text [data-text-id='"+dataTextID+"']").html(newElement);
        }else{
          dataTextID = oss.params.textId;
          newElement = '<div class="slide-text-data" data-image-id="'+imgId+
                              '" data-text-order-id="'+oss.params.currentTextOrderId+
                              '" data-text-id="'+dataTextID+'">'+
                            '<span class="icon-menu"></span>'+
                            '<a class="edit-current-text" aria-invalid="false"'+
                            '><i class="fa os_icon-pencil" aria-hidden="true"></i></a>'+
                            '<a class="copy-current-text oss-pro-avaible" aria-invalid="false"'+
                            '><i class="fa os_icon-docs" aria-hidden="true"></i></a>'+
                            '<a class="delete-current-text" aria-invalid="false"'+
                            '><i class="fa os_icon-cancel" aria-hidden="true"></i></a>'+

                            // '<input class="text-time-start-input" placeholder="start time" type="number" min="0" step="0.1" value="'+
                            //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-text-start-time")+
                            // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+
                            // '<input class="text-time-end-input" placeholder="stop time" type="number" min="0" step="0.1" value="'+
                            //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-text-end-time")+
                            // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+

                            // //permanent time
                            // '<input class="permanent-time-start-input" placeholder="start time" type="number" min="0" step="0.1" value="'+
                            //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-permanent-start-time")+
                            // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+
                            // '<input class="permanent-time-end-input" placeholder="stop time" type="number" min="0" step="0.1" value="'+
                            //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-permanent-end-time")+
                            // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+
                            // //permanent time

                            '<i class="fa os_icon-help-circled"><span class="text-helper animated fadeInRight">Start and stop text animations!</span></i>'+
                            '<div class="text-line">'+textBody+'</div>'+
                          '</div>';
          jQuerOs(container + " .existing-text").append(newElement);
          oss.params.textOrdering[imgId] = jQuerOs(container+" .existing-text .slide-text-data[data-image-id='"+imgId+"']").parent().sortable('toArray', {attribute: 'data-text-order-id'});
          oss.params.currentTextOrderId++;
        }

        oss.sortImagesText(oss.params.textOrdering, imgId);

        if(jQuerOs(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active")).draggable( "instance" )){
          jQuerOs(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active")).draggable("destroy");
        }

        jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('text-active');
        jQuerOs(container + " .save-text-editor").removeClass('save-first');
        jQuerOs(container + " .editing-text").val('');
        jQuerOs(container + " .text-editor-block,"+container+" .text-styling-block").hide("slow");
        jQuerOs(container + " .existing-text").show("slow");
        oss.params.previousText = '';
      }else{
        oss.cancelTextEditor(el);
        oss.sortImagesText(oss.params.textOrdering, jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active").attr("data-image-id"));
      }

      //stop permanent effect
      oss.params.timer.stop();
      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('infinite');
      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('animated');
      //stop permanent effect

      jQuerOs(container+" .add-image-text,"+container+" .paste-image-text,"+container+" .back-image-edit,"+
        container+" .image-time-block,"+container+" .image-link-block,"+
        container+" .image-filter-block,"+container+" .image-background-block").show();
      jQuerOs(container+" .cancel-text-editor,"+container+" .save-text-editor").hide();
      oss.checkUnsaved();
      oss.makeClickFunction(oss.params.moduleId);
      oss.makeTimeInput();

    }

    oss.findText = function (id, imageId){
      if(oss.params.debugMode){
        console.log("oss.findText",[id,imageId]);
      }

     jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").unbind('dblclick')

      oss.params.editTextId = id;
      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-wrapper .swiper-slide:not(.swiper-slide-duplicate)").find(".slide-text").each(function(index, el) {
        if(jQuerOs(el).attr("data-text-id") == id && jQuerOs(el).attr("data-image-id") == imageId){
          oss.editSlideText(el);
        }
      });
    }

    oss.editSlideText = function (el) {

      if(oss.params.debugMode){
        console.log("oss.editSlideText",[el]);
      }

      if(jQuerOs(container + " .add-image-text:visible").length){
        jQuerOs("#os-show-settings-button-" + oss.params.moduleId + ", .existing-text").hide();
        if(jQuerOs(container + " .editing-text:visible").length && (jQuerOs(".editing-text").val() != oss.params.previousText)){
          jQuerOs(container + " .save-text-editor").addClass('save-first');
        }else{
          jQuerOs(container+" .add-image-text,"+container+" .paste-image-text,"+container+" .back-image-edit,"
            +container+" .image-time-block,"+container+" .image-link-block,"
            +container+" .image-filter-block,"+container+" .image-background-block").hide();
          jQuerOs(container+" .cancel-text-editor,"+container+" .save-text-editor").show();
          //delete previous selected animation in start list

          //add text/iamge id for text list
          jQuerOs(container+" .start-text-animation .start-animations-list, "+
                  container+" .end-text-animation .end-animations-list, "+
                  container+" .permanent-text-animation .permanent-animations-list, "+
                  container+" .hover-text-animation .hover-animations-list").attr("data-text-id" ,jQuerOs(el).attr("data-text-id"));
          jQuerOs(container+" .start-text-animation .start-animations-list, "+
                  container+" .end-text-animation .end-animations-list, "+
                  container+" .permanent-text-animation .permanent-animations-list, "+
                  container+" .hover-text-animation .hover-animations-list").attr("data-image-id" ,jQuerOs(el).attr("data-image-id"));


          //end
          //add selected value



          if(typeof(oss.params.textAnimation['start']) != 'undefined' 
              && oss.params.textAnimation['start'][jQuerOs(el).attr("data-image-id")] 
              && oss.params.textAnimation['start'][jQuerOs(el).attr("data-image-id")][jQuerOs(el).attr("data-text-id")]){
            
              jQuerOs(container+" .start-text-animation .os-slider-autocomplete-input-anim-start").val(oss.capitalizeFirstLetter(oss.params.textAnimation['start'][jQuerOs(el).attr("data-image-id")][jQuerOs(el).attr("data-text-id")]));
          }

          if(typeof(oss.params.textAnimation['end']) != 'undefined' 
              && oss.params.textAnimation['end'][jQuerOs(el).attr("data-image-id")] 
              && oss.params.textAnimation['end'][jQuerOs(el).attr("data-image-id")][jQuerOs(el).attr("data-text-id")]){
            
              jQuerOs(container+" .end-text-animation .os-slider-autocomplete-input-anim-end").val(oss.capitalizeFirstLetter(oss.params.textAnimation['end'][jQuerOs(el).attr("data-image-id")][jQuerOs(el).attr("data-text-id")]));
          }

          if(typeof(oss.params.textAnimation['permanent']) != 'undefined' 
              && oss.params.textAnimation['permanent'][jQuerOs(el).attr("data-image-id")] 
              && oss.params.textAnimation['permanent'][jQuerOs(el).attr("data-image-id")][jQuerOs(el).attr("data-text-id")]){
            
              jQuerOs(container+" .permanent-text-animation .os-slider-autocomplete-input-anim-permanent").val(oss.capitalizeFirstLetter(oss.params.textAnimation['permanent'][jQuerOs(el).attr("data-image-id")][jQuerOs(el).attr("data-text-id")]));
          }

          if(typeof(oss.params.textAnimation['hover']) != 'undefined' 
              && oss.params.textAnimation['hover'][jQuerOs(el).attr("data-image-id")] 
              && oss.params.textAnimation['hover'][jQuerOs(el).attr("data-image-id")][jQuerOs(el).attr("data-text-id")]){
            
              jQuerOs(container+" .hover-text-animation .os-slider-autocomplete-input-anim-hover").val(oss.capitalizeFirstLetter(oss.params.textAnimation['hover'][jQuerOs(el).attr("data-image-id")][jQuerOs(el).attr("data-text-id")]));
          }

          currentEditImgId = jQuerOs(el).attr("data-image-id");
          oss.params.previousText = window.JSON.parse(jQuerOs(el).attr("data-text-body") || '{}');
          textBody = window.JSON.parse(jQuerOs(el).attr("data-text-body") || '{}');
          //existing text list
          jQuerOs(container + " .existing-text div").remove();
          jQuerOs(oss.params.swiperSlider.slides).each(function(index, slide) {
            if(!jQuerOs(slide).hasClass('swiper-slide-duplicate')){
              if(jQuerOs(slide).attr("data-image-id") == jQuerOs(el).attr("data-image-id")){
                perView = jQuerOs("#slidesPerView-" + oss.params.moduleId).val();
                perColumn = jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val();
                if(perView > 1 || perColumn > 1){
                  //what it is? i don't now but it's work.
                  k = Math.floor(index/(perView*perColumn));
                  oss.params.swiperSlider.slideTo(k*perView);
                }else{
                  oss.params.swiperSlider.slideTo(index);
                }
                //oss.params.swiperSlider.lockSwipes();
                 oss.params.swiperSlider.allowSlideNext = false;
                 oss.params.swiperSlider.allowSlidePrev = false;

                //create list of existinf text field

                  jQuerOs(slide).find(".slide-text").each(function(index, el) {
                      //set dinamic id for identificate text
                      text = jQuerOs(el).html().substring(0,100);
                      text = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                      newElement = '<div class="slide-text-data" data-image-id="'+jQuerOs(slide).attr("data-image-id")+
                                        '" data-text-order-id="'+jQuerOs(el).attr("data-text-order-id")+
                                        '" data-text-id="'+jQuerOs(el).attr("data-text-id")+'">'+
                                    '<span class="icon-menu"></span>'+
                                    '<a class="edit-current-text" aria-invalid="false"'+
                                    '><i class="fa os_icon-pencil" aria-hidden="true"></i></a>'+
                                    '<a class="copy-current-text oss-pro-avaible" aria-invalid="false"'+
                                    '><i class="fa os_icon-docs" aria-hidden="true"></i></a>'+
                                    '<a class="delete-current-text" aria-invalid="false"'+
                                    '><i class="fa os_icon-cancel" aria-hidden="true"></i></a>'+

                                    // '<input class="text-time-start-input" placeholder="start time" type="number" min="0" step="0.1" value="'+
                                    //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(el).attr("data-text-id")+"'][data-image-id='"+jQuerOs(el).attr("data-image-id")+"']").attr("data-text-start-time")+
                                    // '" data-text-id='+jQuerOs(el).attr("data-text-id")+' data-image-id="'+jQuerOs(slide).attr("data-image-id")+'">'+
                                    // '<input class="text-time-end-input" placeholder="stop time" type="number" min="0" step="0.1" value="'+
                                    //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(el).attr("data-text-id")+"'][data-image-id='"+jQuerOs(el).attr("data-image-id")+"']").attr("data-text-end-time")+
                                    // '" data-text-id='+jQuerOs(el).attr("data-text-id")+' data-image-id="'+jQuerOs(slide).attr("data-image-id")+'">'+

                                    // //permanent time
                                    // '<input class="permanent-time-start-input" placeholder="start time" type="number" min="0" step="0.1" value="'+
                                    //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(el).attr("data-text-id")+"'][data-image-id='"+jQuerOs(el).attr("data-image-id")+"']").attr("data-permanent-start-time")+
                                    // '" data-text-id='+jQuerOs(el).attr("data-text-id")+' data-image-id="'+jQuerOs(slide).attr("data-image-id")+'">'+
                                    // '<input class="permanent-time-end-input" placeholder="stop time" type="number" min="0" step="0.1" value="'+
                                    //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(el).attr("data-text-id")+"'][data-image-id='"+jQuerOs(el).attr("data-image-id")+"']").attr("data-permanent-end-time")+
                                    // '" data-text-id='+jQuerOs(el).attr("data-text-id")+' data-image-id="'+jQuerOs(slide).attr("data-image-id")+'">'+
                                    // //permanent time

                                    '<i class="fa os_icon-help-circled"><span class="text-helper animated fadeInRight">Start and stop text animations!</span></i>'+
                                    '<div class="text-line">'+text+'</div>'+
                                  '</div>'
                      jQuerOs(container + " .existing-text").append(newElement);
                      if(oss.params.textId < parseInt(jQuerOs(el).attr("data-text-id"))){
                        oss.params.textId = jQuerOs(el).attr("data-text-id");
                      }
                  });
                //end lists
              }
            }
          });
          //end
          jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('text-active');


          

          //stop permanent effect
          oss.params.timer.stop();
          jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('infinite');
          jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('animated');
          //stop permanent effect

          jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").each(function(index, el) {
            if(jQuerOs(this).draggable( "instance" )){
              jQuerOs(this).draggable("destroy");
            }
          });
          jQuerOs(el).addClass('text-active');

          oss.textDraggable();

          jQuerOs(container + " .editing-text").val(textBody);
          jQuerOs(container + " .save-text-editor").removeClass('save-first');
          //css
          jQuerOs(container + ' .text-color-colorpicker').minicolors('value',jQuerOs(el).css('color'));
          jQuerOs(container + ' .text-background-colorpicker').minicolors('value',jQuerOs(el).css('background-color'));
          jQuerOs(container + ' .text-border-colorpicker').minicolors('value',jQuerOs(el).css('borderTopColor'));

          var regExpShadow = /([rgba]*[(]*[\d.,\s]*[)]+)/;
          var text_shadow = jQuerOs(el).css('text-shadow');
          var text_shadow = text_shadow.match(regExpShadow);

          if(Array.isArray(text_shadow)){
              jQuerOs(container + ' .text-shadow-colorpicker').minicolors('value',text_shadow[0]);
          }else{
              jQuerOs(container + ' .text-shadow-colorpicker').minicolors('value','rgba(255,255,255,1)');
          }

          jQuerOs(container + " .text-custom-class").val(jQuerOs(el).attr("data-custom-class"));

          jQuerOs(container + " .text-time-start-input").val(jQuerOs(el).attr("data-text-start-time"));
          jQuerOs(container + " .text-time-end-input").val(jQuerOs(el).attr("data-text-end-time"));
          jQuerOs(container + " .permanent-time-start-input").val(jQuerOs(el).attr("data-permanent-start-time"));
          jQuerOs(container + " .permanent-time-end-input").val(jQuerOs(el).attr("data-permanent-end-time"));



          
          jQuerOs(container + " .text-borer-width").val(
            (Math.round(jQuerOs(el).attr("data-border-width")*10)/10)
          );

          jQuerOs(container + " .text-borer-radius").val(
            (Math.round(jQuerOs(el).attr("data-border-radius")*10)/10)
          );

          //text padding
          jQuerOs(container + " .text-padding-top").val(
            (Math.round(jQuerOs(el).attr("data-padding-top")*10)/10)
          );

          jQuerOs(container + " .text-padding-right").val(
            (Math.round(jQuerOs(el).attr("data-padding-right")*10)/10)
          );

          jQuerOs(container + " .text-padding-bottom").val(
            (Math.round(jQuerOs(el).attr("data-padding-bottom")*10)/10)
          );

          jQuerOs(container + " .text-padding-left").val(
            (Math.round(jQuerOs(el).attr("data-padding-left")*10)/10)
          );

          // text shadow
          jQuerOs(container + " .text-h-shadow").val(
            (Math.round(jQuerOs(el).attr("data-text-h-shadow")*10)/10)
            );
          jQuerOs(container + " .text-v-shadow").val(
            (Math.round(jQuerOs(el).attr("data-text-v-shadow")*10)/10)
            );
          jQuerOs(container + " .text-blur-radius").val(
            (Math.round(jQuerOs(el).attr("data-text-blur-radius")*10)/10)
            );
          // text shadow
          
          jQuerOs(container + " .text-block-width").val(jQuerOs(el).attr("data-text-width") || 0);
          // jQuerOs(container + " .text-font-size").val(jQuerOs(el).css("font-size").replace('px',''));

          jQuerOs(container + " .text-font-size").val(
            (Math.round(jQuerOs(el).attr("data-font-size")*10)/10)
          );

          //font weight select
          jQuerOs(container + ' .text-font-weight-select option').remove();
          jQuerOs(container + ' .text-font-weight-select')
                    .append(jQuerOs('<option></option>').attr("value", "normal").text("normal"));

          if(oss.params.avaibleGoogleFontsWeights[oss.params.avaibleGoogleFonts.indexOf(jQuerOs(el).attr("data-font-family"))]){
            fontWeightQuery='';
            fontWeights = oss.params.avaibleGoogleFontsWeights[oss.params.avaibleGoogleFonts.indexOf(jQuerOs(el).attr("data-font-family"))];
            jQuerOs(fontWeights)
              .each(function(index, val){
                  jQuerOs(container + ' .text-font-weight-select')
                    .append(jQuerOs('<option></option>').attr("value", val).text(val));
              fontWeightQuery += fontWeights[index];
              if(index < fontWeights.length-1)fontWeightQuery += ',';
            });

            //load needed fonts
            WebFont.load({
              google: {
                families: [jQuerOs(el).attr("data-font-family") +':'+ fontWeightQuery]
              }
            });
            //end
          }
          if(jQuerOs(el).css("font-weight") == 400 || !jQuerOs(el).css("font-weight")){
            fWeight = 'normal';
          }else{
            fWeight = jQuerOs(el).css("font-weight");
          }

          jQuerOs(container + " .text-font-weight-select").val(fWeight);

          if(jQuerOs(el).css("text-align")){
            tAlign = jQuerOs(el).css("text-align");
            // alert(tAlign);
          }else{
            tAlign = 'inherit';
          }

          jQuerOs(container + " .text-align-select").val(tAlign);
          //end
          //select font
          if(oss.params.setupFonts.indexOf(jQuerOs(el).css("font-family").replace(/\"/g, "")) != -1){
            fFamily = jQuerOs(el).css("font-family").replace(/\"/g, "");
          }else{
            fFamily = '';
          }
          jQuerOs(container + " .os-slider-autocomplete-input").val(fFamily);
          //
          jQuerOs(container + " .text-editor-block,"+container+" .text-styling-block").show("slow");
        }
      }else{
        if(jQuerOs(container + " .existing-images:visible").length){
          //oss.params.swiperSlider.lockSwipes();
          oss.params.swiperSlider.allowSlideNext = false;
          oss.params.swiperSlider.allowSlidePrev = false;

          oss.imageEdit(jQuerOs(el).parent().parent().find("img"));
          oss.editSlideText(el);
        }
      }
      oss.checkUnsaved();
    }
    //end

    //delete text
    oss.deleteCurrentText = function (el){
      if(oss.params.debugMode){
        console.log("oss.deleteCurrentText",[el]);
      }

      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").each(function(index, el2) {

        if(localStorage.getItem('id') == jQuerOs(el).parent().attr("data-text-id"))
          {
            localStorage.clear();
          }

          if(jQuerOs(el2).attr("data-text-id") == jQuerOs(el).parent().attr("data-text-id") 
            && jQuerOs(el2).attr("data-image-id") == jQuerOs(el).parent().attr("data-image-id")){
          jQuerOs(el2).remove();
          jQuerOs(el).parent().remove();
            if(oss.params.textAnimation['start']
                && oss.params.textAnimation['start'][jQuerOs(el).parent().attr("data-image-id")]){
              delete oss.params.textAnimation['start'][jQuerOs(el).parent().attr("data-image-id")][jQuerOs(el).parent().attr("data-text-id")];
            }
            if(oss.params.textAnimation['end']
                && oss.params.textAnimation['end'][jQuerOs(el).parent().attr("data-image-id")]){
              delete oss.params.textAnimation['end'][jQuerOs(el).parent().attr("data-image-id")][jQuerOs(el).parent().attr("data-text-id")];
            }
            if(oss.params.textAnimation['permanent']
                && oss.params.textAnimation['permanent'][jQuerOs(el).parent().attr("data-image-id")]){
              delete oss.params.textAnimation['permanent'][jQuerOs(el).parent().attr("data-image-id")][jQuerOs(el).parent().attr("data-text-id")];
            }
            if(oss.params.textAnimation['hover']
                && oss.params.textAnimation['hover'][jQuerOs(el).parent().attr("data-image-id")]){
              delete oss.params.textAnimation['hover'][jQuerOs(el).parent().attr("data-image-id")][jQuerOs(el).parent().attr("data-text-id")];
            }

        }
      });
    }
    //end
    
    //sort existing text
    oss.sortImagesText = function (sortArray, imgid){
      if(oss.params.debugMode){
        console.log("oss.sortImagesText",[sortArray]);
      }
      jQuerOs(sortArray[imgid]).each(function(indexSortArray, sortingId) {
        jQuerOs(container+" .existing-text .slide-text-data[data-image-id='"+imgid+"']").each(function(indexText, text) {
          if(jQuerOs(this).attr("data-text-order-id") == sortingId){
            jQuerOs(this).parent().append(this);
          }
        });
      });
      oss.sortSliderText(sortArray, imgid);
    }

    oss.sortSliderText = function (sortArray, imgid){
      if(oss.params.debugMode){
        console.log("oss.sortSliderText",[sortArray]);
      }

      jQuerOs(sortArray[imgid]).each(function(indexSortArray, sortingId) {
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id='"+imgid+"']:not(.swiper-slide-duplicate) .slide-text").each(function(indexText, text){
          if(jQuerOs(this).attr("data-text-order-id") == sortingId){
            jQuerOs(this).parent().append(this);
          }
        });
      });
    }
    //end

    oss.fileExport = function(){
       if(oss.params.debugMode){
          console.log("oss.fileExport");
        }

          jQuerOs.post("index.php?option=com_ajax&module=os_touchslider&Itemid="+oss.params.ItemId+"&task=fileExport&moduleId="+oss.params.moduleId+"&format=raw",
          function (data) {
            if (data.success) {
            
               var zipPath = data.path;
               jQuerOs(container + " .export-responce").text("Load export file");
               jQuerOs(container + " .export-responce").css('backgroundColor','#3A8BDF');
               jQuerOs(container + " .export-responce").hover(function() {
                 jQuerOs(this).css('backgroundColor','#0E9267');
               }, function() {
                 jQuerOs(this).css('backgroundColor','#3A8BDF');
               });
               jQuerOs(container).click(function(){
                  jQuerOs(container + " .export-responce").hide(500);
               })
               jQuerOs(container + " .export-responce").show(500);
               jQuerOs(container + " .export-a").attr('href', zipPath);
               jQuerOs(container + " .export-responce").unbind('click');
               jQuerOs(container + " .export-responce").click(function(){
                  jQuerOs(this).hide(500);
               })

            }else{
              
               // jQuerOs(container + " .option-title").hide(500);
               jQuerOs(container + " .export-responce").show(500);
               jQuerOs(container + " .export-responce").text("Export failed");
               jQuerOs(container + " .export-responce").css('backgroundColor','#f7484e');
               jQuerOs(container + " .export-responce").unbind('click');
               jQuerOs(container + " .export-responce").click(function(){
                  jQuerOs(this).hide(400);

               })
            }
          } , 'json' );
    }

    oss.copyText = function(id, text, parent_img_id){
      if(oss.params.debugMode){
          console.log("oss.copyText",[id,text]);
      }
         localStorage.clear();
         localStorage.setItem('text',text);
         localStorage.setItem('id',id);
         localStorage.setItem('parent_img_id',parent_img_id);
    }

    oss.pasteText = function(){
      if(oss.params.debugMode){
            console.log("oss.pasteText",['accept localStorage data']);
          }

            parentTextBody = localStorage.getItem('text');
            parentTextId = localStorage.getItem('id');
            parent_img_id = localStorage.getItem('parent_img_id');

            // alert(parentTextId);

            if(!parentTextBody || !parentTextId)
            {
               localStorage.clear();
               return;
            } 

            imgId = jQuerOs("#os-slider-"+oss.params.moduleId+" .edit-image").attr("data-image-id");
            dataTextID = ++oss.params.textId;
            oss.params.currentTextOrderId++;

            SelectorForTextElementForPast = '#os-slider-'+oss.params.moduleId+' div.slide-text[data-text-id='+parentTextId+'][data-image-id='+parent_img_id+']' ;
            if(jQuerOs(SelectorForTextElementForPast).length > 1 )
              displayText = jQuerOs(SelectorForTextElementForPast).first().clone(); //this need for fix loop option
            else displayText = jQuerOs(SelectorForTextElementForPast).clone();
            //old
            //displayText = jQuerOs('#os-slider-'+oss.params.moduleId+' div.slide-text[data-text-id='+parentTextId+'][data-image-id='+parent_img_id+']').clone();

            displayText.addClass('not-saved');
            displayText.attr('data-text-id',dataTextID);
            displayText.attr('data-image-id',imgId);
            displayText.attr('data-text-order-id',oss.params.currentTextOrderId);

            jQuerOs('#os-slider-'+oss.params.moduleId+' div.swiper-slide[data-image-id='+imgId+']').append(displayText);

            newElement = '<div class="slide-text-data" data-image-id="'+imgId+
                          '" data-text-order-id="'+oss.params.currentTextOrderId+
                          '" data-text-id="'+dataTextID+'">'+
                          '<span class="icon-menu"></span>'+
                          '<a class="edit-current-text oss-pro-avaible" aria-invalid="false"'+
                          '><i class="fa os_icon-pencil" aria-hidden="true"></i></a>'+
                          //bch
                          '<a class="copy-current-text  oss-pro-avaible" aria-invalid="false"'+
                          '><i class="fa os_icon-docs" aria-hidden="true"></i></a>'+
                          //bch
                          '<a class="delete-current-text" aria-invalid="false"'+
                          '><i class="fa os_icon-cancel" aria-hidden="true"></i></a>'+

                          // '<input class="text-time-start-input" placeholder="start time" type="number" min="0" step="0.1" value="'+
                          //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-text-start-time")+
                          // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+
                          // '<input class="text-time-end-input" placeholder="stop time" type="number" min="0" step="0.1" value="'+
                          //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-text-end-time")+
                          // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+

                          // //permanent time
                          // '<input class="permanent-time-start-input" placeholder="start time" type="number" min="0" step="0.1" value="'+
                          //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-permanent-start-time")+
                          // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+
                          // '<input class="permanent-time-end-input" placeholder="stop time" type="number" min="0" step="0.1" value="'+
                          //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+dataTextID+"'][data-image-id='"+imgId+"']").attr("data-permanent-end-time")+
                          // '" data-text-id='+dataTextID+' data-image-id="'+imgId+'">'+
                          // //permanent time

                          '<i class="fa os_icon-help-circled"><span class="text-helper animated fadeInRight">Start and stop text animations!</span></i>'+
                          '<div class="text-line">'+parentTextBody+'</div>'+
                          '</div>';
              jQuerOs(container + " .existing-text ").append(newElement);

              jQuerOs(container + " .slide-text-data[data-text-id="+dataTextID+"]").hide();
              jQuerOs(container + " .slide-text-data[data-text-id="+dataTextID+"]").fadeIn();

              //start - end animation
              if(oss.params.textAnimation['start'] && oss.params.textAnimation['end']){

                if(parent_img_id!=imgId){
                    oss.params.textAnimation['start'][imgId] = Array();
                    oss.params.textAnimation['end'][imgId] = Array();
                }
               
                if(oss.params.textAnimation['start'] && oss.params.textAnimation['start'][parent_img_id] && oss.params.textAnimation['start'][parent_img_id][parentTextId]){
                   oss.params.textAnimation['start'][imgId][dataTextID] = oss.params.textAnimation['start'][parent_img_id][parentTextId]
                }

                if(oss.params.textAnimation['end'] && oss.params.textAnimation['end'][parent_img_id] && oss.params.textAnimation['end'][parent_img_id][parentTextId]){
                  oss.params.textAnimation['end'][imgId][dataTextID] = oss.params.textAnimation['end'][parent_img_id][parentTextId]
                }
                
              }

              //permanent animation
              if(oss.params.textAnimation['permanent']){

                if(parent_img_id!=imgId){
                    oss.params.textAnimation['permanent'][imgId] = Array();
                }
               
                if(oss.params.textAnimation['permanent'] && oss.params.textAnimation['permanent'][parent_img_id] && oss.params.textAnimation['permanent'][parent_img_id][parentTextId]){
                   oss.params.textAnimation['permanent'][imgId][dataTextID] = oss.params.textAnimation['permanent'][parent_img_id][parentTextId]
                }
                
              }

              //hover animation
              if(oss.params.textAnimation['hover']){

                if(parent_img_id!=imgId){
                    oss.params.textAnimation['hover'][imgId] = Array();
                }
               
                if(oss.params.textAnimation['hover'] && oss.params.textAnimation['hover'][parent_img_id] && oss.params.textAnimation['hover'][parent_img_id][parentTextId]){
                   oss.params.textAnimation['hover'][imgId][dataTextID] = oss.params.textAnimation['hover'][parent_img_id][parentTextId]
                }
                
              }
              
              oss.params.textOrdering[imgId] = jQuerOs(container+" .existing-text .slide-text-data[data-image-id='"+imgId+"']").parent().sortable('toArray', {attribute: 'data-text-order-id'});
              
              jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active:not(.swiper-slide-duplicate) .slide-text").css("opacity",1);
              // oss.sortImagesText(oss.params.textOrdering, imgId);
              //end
              if(jQuerOs(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active")).draggable( "instance" )){
                jQuerOs(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text.text-active")).draggable("destroy");
              }

              oss.checkUnsaved();
              oss.makeClickFunction(oss.params.moduleId);
              oss.makeTimeInput();

    }


    //bucha
    oss.create_custom_img = function(color){
      if(oss.params.debugMode){
        console.log("oss.create_custom_img",'[color]');
      }

      jQuerOs.post("index.php?option=com_ajax&module=os_touchslider&Itemid="+oss.params.ItemId+"&moduleId="+oss.params.moduleId+"&format=raw&method=create_custom_img",

        function (responseJSON) {      
          if(oss.params.debugMode){
            console.log("copyImage.responseJSON",[responseJSON]);
          }

          if(responseJSON.img_id == false){
            alert(responseJSON.error);
          }else{

            var img_id = responseJSON.img_id;
            var fileName = responseJSON.fileName;
            var fileName_thumb = responseJSON.fileName_thumb;
            var custom_color = color;
            

            //add thumbnail
            var slideSrc = oss.params.site_path+'images/os_touchslider_'+oss.params.moduleId+'/thumbnail/'+fileName_thumb;
            var image = '<div class="slider-images" data-sortable-id="'+img_id+'">'+
                          '<div class="slider-image-block">'+
                            '<a class="delete-current-image" type="button" aria-invalid="false">'+
                            '<i class="fa os_icon-cancel" aria-hidden="true"></i></a>'+
                            '<a class="edit-current-image" type="button" '+
                            'aria-invalid="false" value="-E-">'+
                            '<i class="fa os_icon-pencil" aria-hidden="true"></i></a>'+

                            //bch
                            '<a class="copy-current-image oss-pro-avaible" aria-invalid="false">'+
                            '<i class="fa os_icon-docs" aria-hidden="true"></i></a>'+

                            '<a class="replace-current-image oss-pro-avaible" aria-invalid="false">'+
                            '<i class="fa os_icon-picture" aria-hidden="true"></i></a>'+
                            //bch
                            
                            '<img class="slider-image" src="'+slideSrc+'" alt="'+fileName+'" data-image-id="'+img_id+'">'+
                          '</div>'+
                        '</div>';

            jQuerOs(container + " .existing-images").append(image);
            //add thumbnail




            //image full time
            var timeInput = '<span data-image-id="'+img_id+'" class="image-full-time" style="display:none;">'+
                         'Image full time, s:<input class="time-input" type="number" '+
                         ' name="image_full_time['+img_id+']" min="0" step="0.1" value="">'+
                        '</span>';
            jQuerOs(container + " .image-time-block").append(timeInput);

            //image link
            var imageLinkInput = '<span data-image-id="'+img_id+'" class="image-link" style="display:none;">'+
                         'Image link:<i title="Add link for every whole image or you may add links to every text" '+
                         'class="fa os_icon-info-circled info_block"></i>'+
                         '<input class="image-link-input" type="text" name="image-link['+img_id+']" size="20" '+
                         ' maxlength="300" value="">'+
                        '</span>';
            jQuerOs(container + " .image-link-block").append(imageLinkInput);



            //image filters
                jQuerOs(container + " .image-filter-block").append(oss.addFilterSelect(img_id));
            //image filters

            //image background
             
              var background = '<span data-image-id="'+img_id+'" class="image-background" style="display:none;">Background:'+
                '<i title="To use, apply a transparency effect to the image or load a transparent image." '+
                'class="fa os_icon-info-circled info_block"></i><input '+
                ' class="background-input custom_color_slide-'+oss.params.moduleId+'" '+
                'type="text" data-image-id="'+img_id+'" name="image_background'+img_id+'" min="0" step="0.1" '+
                ' value="'+custom_color+'"></span>';

              jQuerOs(container + " .image-background-block").append(background);
            //image background


            //add original
            slideSrc = oss.params.site_path+'images/os_touchslider_'+oss.params.moduleId+'/original/'+fileName;

             if(oss.params.lazy){
               newSlide = '<img class="swiper-lazy" data-src="'+slideSrc+'" data-image-id="'+img_id+'">'+
                          '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>';
             }else{
              newSlide = '<img src="'+slideSrc+'" alt="'+fileName+'" data-image-id="'+img_id+'">';
             }

            oss.params.swiperSlider.appendSlide('<div class="swiper-slide" data-image-id="'+img_id+'">'+newSlide+'</div>');
            //add original

            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+img_id+"]").attr('data-image-background',custom_color)

            //apply params
              // oss.saveSliderSettings(oss.params.moduleId,true);
              oss.addBackgroundToThumbs();
              oss.makeSortable();
              oss.params.imageOrdering = jQuerOs(container + " .existing-images").sortable('toArray', {attribute: 'data-sortable-id'});
              oss.sortSliderImages(oss.params.imageOrdering);
              oss.makeClickFunction(oss.params.moduleId);
              oss.resetSlider();
              oss.checkUnsaved();
              oss.makeTimeInput();
            //apply params

          }
        }

      , 'json');

    } 
    //bucha



    if(oss.params.isUser == 1){

      oss.copyImage = function(parent_img_id){

        if(oss.params.debugMode){
              console.log("oss.copyImage",[parent_img_id]);
            }

            jQuerOs.post("index.php?option=com_ajax&module=os_touchslider&Itemid="+oss.params.ItemId+"&moduleId="+oss.params.moduleId+"&format=raw&image_id="+parent_img_id+"&method=copyImage",

                      function (responseJSON) {
                              
                      if(oss.params.debugMode){
                        console.log("copyImage.responseJSON",[responseJSON]);
                      }

                        parent_img_id = parent_img_id;
                        image_id = responseJSON.id;
                        fileName = responseJSON.file;
                        ext = responseJSON.ext;
                        //paste image 
                        slideSrc = oss.params.site_path+'images/os_touchslider_'+oss.params.moduleId+'/thumbnail/'+fileName+'_150_100_1'+ext;
                        image = '<div class="slider-images" data-sortable-id="'+image_id+'">'+
                                  '<div class="slider-image-block">'+
                                  '<a class="delete-current-image" type="button" aria-invalid="false">'+
                                  '<i class="fa os_icon-cancel" aria-hidden="true"></i></a>'+
                                  '<a class="edit-current-image" type="button" '+
                                  'aria-invalid="false" value="-E-">'+
                                  '<i class="fa os_icon-pencil" aria-hidden="true"></i></a>'+

                                  //bch
                                  '<a class="copy-current-image oss-pro-avaible" aria-invalid="false">'+
                                  '<i class="fa os_icon-docs" aria-hidden="true"></i></a>'+

                                  '<a class="replace-current-image oss-pro-avaible" aria-invalid="false">'+
                                  '<i class="fa os_icon-picture" aria-hidden="true"></i></a>'+
                                  //bch
                                  
                                  '<img class="slider-image" src="'+slideSrc+'" alt="'+fileName+ext+'" data-image-id="'+image_id+'">'+
                                '</div>'+
                                '</div>';


                        jQuerOs(container + " .existing-images").append(image);

                        slideSrc = oss.params.site_path+'images/os_touchslider_'+oss.params.moduleId+'/original/'+fileName+ext;

                        //image full time
                        var timeInput = '<span data-image-id="'+image_id+'" class="image-full-time" style="display:none;">'+
                                     'Image full time, s:<input class="time-input" type="number" '+
                                     ' name="image_full_time['+image_id+']" min="0" step="0.1" '+
                                     ' value="'+jQuerOs(".image-full-time[data-image-id="+parent_img_id+"] input").val()+'">'+
                                    '</span>';
                        jQuerOs(container + " .image-time-block").append(timeInput);

                        //image link
                        var imageLinkInput = '<span data-image-id="'+image_id+'" class="image-link" style="display:none;">'+
                                     'Image link:<i title="Add link for every whole image or you may add links to every text" '+
                                     'class="fa os_icon-info-circled info_block"></i>'+
                                     '<input class="image-link-input" type="text" name="image-link['+image_id+']" size="20" '+
                                     ' maxlength="300" '+
                                     'value="'+jQuerOs(".image-link[data-image-id="+parent_img_id+"] input").val()+'">'+
                                    '</span>';
                        jQuerOs(container + " .image-link-block").append(imageLinkInput);

                        //image filters
                          var filterSelectCopy = jQuerOs(container+" span.image-filter[data-image-id="+parent_img_id+"]")[0].outerHTML;
                              filterSelectCopy = filterSelectCopy.replaceAll(parent_img_id, image_id);
                              jQuerOs(container + " .image-filter-block").append(filterSelectCopy);
                        //image filters

                        //image background
                          var backgroundValue = jQuerOs(container+" span.image-background[data-image-id="+parent_img_id+"] input").val();

                          var backgroundSelectCopy = '<span data-image-id="'+image_id+'" class="image-background" style="display:none;">Background:<i title="To use, apply a transparency effect to the image or load a transparent image." class="fa os_icon-info-circled info_block"></i><input class="background-input custom_color_slide-'+oss.params.moduleId+'" type="text" data-image-id="'+image_id+'" name="image_background'+image_id+'" min="0" step="0.1" value="'+backgroundValue+'"></span>';

                          jQuerOs(container + " .image-background-block").append(backgroundSelectCopy);
                        //image background


                        if(oss.params.lazy){
                          newSlide = '<img class="swiper-lazy " data-src="'+slideSrc+'" data-image-id="'+image_id+'">'+
                                     '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>';
                        }else{
                          newSlide = '<img class="" src="'+slideSrc+'" alt="'+fileName+ext+'" data-image-id="'+image_id+'">';
                        }

                        oss.params.swiperSlider.appendSlide('<div class="swiper-slide" data-image-id="'+image_id+'">'+newSlide+'</div>');

                        // all time adding .not('.swiper-slide-duplicate') because if you use "loop mode" , slider creates duplicates with 
                        // .swiper-slide-duplicate class

                        //filters
                        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+image_id+"]").not('.swiper-slide-duplicate')
                        .addClass(jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+parent_img_id+"]").not('.swiper-slide-duplicate').attr('data-image-filter'))
                        .attr('data-image-filter',jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+parent_img_id+"]").not('.swiper-slide-duplicate').attr('data-image-filter'));

                        //background
                        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+image_id+"]").not('.swiper-slide-duplicate')
                        .css('backgroundColor',jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+parent_img_id+"]").not('.swiper-slide-duplicate').attr('data-image-background'))
                        .attr('data-image-background',jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+parent_img_id+"]").not('.swiper-slide-duplicate').attr('data-image-background'));

                      
                        setTimeout(function(){
                          jQuerOs(container + " .qqsl-upload-list").empty();
                        }, 5000);
                        //paste image 

                        //paste text
            
                        if(oss.params.textAnimation['start'] && oss.params.textAnimation['end']){
                          oss.params.textAnimation['start'][image_id] = [];
                          oss.params.textAnimation['end'][image_id] =  [];
                        }

                        if(oss.params.textAnimation['permanent']){
                          oss.params.textAnimation['permanent'][image_id] = [];
                        }

                         if(oss.params.textAnimation['hover']){
                          oss.params.textAnimation['hover'][image_id] = [];
                        }
                          
                        displayText = jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+parent_img_id+"]").not('.swiper-slide-duplicate').find('.slide-text').clone();

                        displayText.each(function(index, el) {

                           ++oss.params.textId;
                           ++oss.params.currentTextOrderId;

                          if(oss.params.textAnimation['start'] && oss.params.textAnimation['start'][parent_img_id])
                          {
                            oss.params.textAnimation['start'][image_id][oss.params.textId] 
                              = oss.params.textAnimation['start'][parent_img_id][jQuerOs(el).attr('data-text-id')]
                          }

                          if(oss.params.textAnimation['end'] && oss.params.textAnimation['end'][parent_img_id])
                          {
                            oss.params.textAnimation['end'][image_id][oss.params.textId] 
                              = oss.params.textAnimation['end'][parent_img_id][jQuerOs(el).attr('data-text-id')]
                          }

                          if(oss.params.textAnimation['permanent'] && oss.params.textAnimation['permanent'][parent_img_id])
                          {
                            oss.params.textAnimation['permanent'][image_id][oss.params.textId] 
                              = oss.params.textAnimation['permanent'][parent_img_id][jQuerOs(el).attr('data-text-id')]
                          }

                          if(oss.params.textAnimation['hover'] && oss.params.textAnimation['hover'][parent_img_id])
                          {
                            oss.params.textAnimation['hover'][image_id][oss.params.textId] 
                              = oss.params.textAnimation['hover'][parent_img_id][jQuerOs(el).attr('data-text-id')]
                          }
                            
                          jQuerOs(el).attr('data-text-id',oss.params.textId);
                          jQuerOs(el).attr('data-text-order-id',oss.params.currentTextOrderId);
                          jQuerOs(el).attr('data-image-id',image_id);

                        });

    
                        jQuerOs(container + " .image-full-time[data-image-id="+parent_img_id+"]");
                        jQuerOs('.swiper-slide[data-image-id='+image_id+']').append(displayText);

                        oss.addBackgroundToThumbs();
                        oss.saveSliderSettings(oss.params.moduleId,true);
                        oss.makeSortable();
                        oss.params.imageOrdering = jQuerOs(container + " .existing-images").sortable('toArray', {attribute: 'data-sortable-id'});
                        oss.sortSliderImages(oss.params.imageOrdering);
                        oss.makeClickFunction(oss.params.moduleId);
                        oss.resetSlider();
                        oss.checkUnsaved();
                        oss.makeTimeInput();
                        //paste text  

                        },'json'  );

      }

    }

  //img click // text edit
  oss.imageEdit = function (el){
    if(oss.params.debugMode){
      console.log("oss.imageEdit",[el]);
    }

    jQuerOs('#tab2-'+oss.params.moduleId+
             ', #tab3-'+oss.params.moduleId+
             ', #tab4-'+oss.params.moduleId).attr('disabled','disabled');

    jQuerOs(container + " .tab-label").unbind('click');
    jQuerOs(container + " .existing-text").html('');
    jQuerOs(container + " .existing-text").show();
    currentTask = 'imageEditor';
    currentEditImgId = jQuerOs(el).attr("data-image-id");
    workImage = el;
    jQuerOs(container + " .slider-images, " +
            "#images-load-area-" + oss.params.moduleId +","+container+" .slider-image-block,"+container+" .delete-current-image").hide('slow');
    jQuerOs(oss.params.swiperSlider.slides).each(function(index, slide) {
      if(!jQuerOs(slide).hasClass('swiper-slide-duplicate')){
        if(jQuerOs(slide).attr("data-image-id") == jQuerOs(el).attr("data-image-id")){
          jQuerOs(slide).addClass('edit-image');
          perView = jQuerOs("#slidesPerView-" + oss.params.moduleId).val();
          perColumn = jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val();
          if(perView > 1 || perColumn > 1){
            //what it is? i don't now but it's work.
            k = Math.floor(index/(perView*perColumn));
            oss.params.swiperSlider.slideTo(k*perView);
          }else{
            oss.params.swiperSlider.slideTo(index);
          }
          //oss.params.swiperSlider.lockSwipes();
          oss.params.swiperSlider.allowSlideNext = false;
          oss.params.swiperSlider.allowSlidePrev = false;

          //create list of existinf text field

            //if ordering incorrect
            function array_unique(array) {
                var unique = {};
                jQuerOs.each(array, function(x, value) {
                    unique[value] = value;
                });
                return jQuerOs.map(unique, function(value) { return value; });
            }

            var orderInAttrText = [];

            jQuerOs(slide).find(".slide-text").each(function(index, el) {
              orderInAttrText[index] = jQuerOs(el).attr("data-text-order-id");
            })

            var uniqueOrder = array_unique(orderInAttrText).length;
            var allOrder = orderInAttrText.length;

            if(uniqueOrder != allOrder){
              jQuerOs(slide).find(".slide-text").each(function(index, el) {
                jQuerOs(el).attr("data-text-order-id",++index);
              })
            }
            //if ordering incorrect
            
            
            jQuerOs(slide).find(".slide-text").each(function(index, el) {
                //set dinamic id for identificate text

                text = jQuerOs(el).html().substring(0,100);
                text = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                newElement = '<div class="slide-text-data" data-image-id="'+jQuerOs(slide).attr("data-image-id")+'" data-text-id="'+jQuerOs(el).attr("data-text-id")+
                                  '" data-text-order-id="'+jQuerOs(el).attr("data-text-order-id")+'">'+
                              '<span class="icon-menu"></span>'+
                              
                              '<a class="edit-current-text" aria-invalid="false"'+
                              '><i class="fa os_icon-pencil" aria-hidden="true"></i></a>'+
                              //bch
                              '<a class="copy-current-text  oss-pro-avaible" aria-invalid="false"'+
                              '><i class="fa os_icon-docs" aria-hidden="true"></i></a>'+
                              //bch
                              '<a class="delete-current-text" aria-invalid="false"'+
                              '><i class="fa os_icon-cancel" aria-hidden="true"></i></a>'+

                              // '<input class="text-time-start-input" placeholder="start time" type="number" min="0" step="0.1" value="'+
                              //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(el).attr("data-text-id")+"'][data-image-id='"+jQuerOs(slide).attr("data-image-id")+"']").attr("data-text-start-time")+
                              // '" data-text-id='+jQuerOs(el).attr("data-text-id")+' data-image-id="'+jQuerOs(slide).attr("data-image-id")+'">'+
                              // '<input class="text-time-end-input" placeholder="stop time" type="number" min="0" step="0.1" value="'+
                              //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(el).attr("data-text-id")+"'][data-image-id='"+jQuerOs(slide).attr("data-image-id")+"']").attr("data-text-end-time")+
                              // '" data-text-id='+jQuerOs(el).attr("data-text-id")+' data-image-id="'+jQuerOs(slide).attr("data-image-id")+'">'+

                              // //permanent time
                              // '<input class="permanent-time-start-input" placeholder="start time" type="number" min="0" step="0.1" value="'+
                              //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(el).attr("data-text-id")+"'][data-image-id='"+jQuerOs(slide).attr("data-image-id")+"']").attr("data-permanent-start-time")+
                              // '" data-text-id='+jQuerOs(el).attr("data-text-id")+' data-image-id="'+jQuerOs(slide).attr("data-image-id")+'">'+
                              // '<input class="permanent-time-end-input" placeholder="stop time" type="number" min="0" step="0.1" value="'+
                              //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(el).attr("data-text-id")+"'][data-image-id='"+jQuerOs(slide).attr("data-image-id")+"']").attr("data-permanent-end-time")+
                              // '" data-text-id='+jQuerOs(el).attr("data-text-id")+' data-image-id="'+jQuerOs(slide).attr("data-image-id")+'">'+
                              //permanent time

                              '<i class="fa os_icon-help-circled"><span class="text-helper animated fadeInRight">Start and stop text animations!</span></i>'+
                              '<div class="text-line">'+text+'</div>'+
                            '</div>'
                jQuerOs(container + " .existing-text").append(newElement);
                if(oss.params.textId < parseInt(jQuerOs(el).attr("data-text-id"))){
                  oss.params.textId = jQuerOs(el).attr("data-text-id");
                }
            });
          //end list
        }
      }
    });
    
   
    jQuerOs(container +"  .image-time-block span[data-image-id='"+jQuerOs(el).attr("data-image-id")+"']").show();
    jQuerOs(container +"  .image-link-block span[data-image-id='"+jQuerOs(el).attr("data-image-id")+"']").show();
    jQuerOs(container +"  .image-filter-block span[data-image-id='"+jQuerOs(el).attr("data-image-id")+"']").show();
    jQuerOs(container +"  .image-background-block span[data-image-id='"+jQuerOs(el).attr("data-image-id")+"']").show();

    //stop permanent effect
    oss.params.timer.stop();
    jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('infinite');
    jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('animated');

    //stop permanent effect

    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active:not(.swiper-slide-duplicate) .slide-text").css("opacity",1);
    jQuerOs("#os-show-settings-button-" + oss.params.moduleId).hide();
    jQuerOs(container + " .back-image-edit," +
            container + " .paste-image-text," +
            container + " .add-image-text").show('slow');

    oss.textDraggable();
    oss.checkUnsaved();
    oss.makeClickFunction(oss.params.moduleId);
    oss.sortImagesText(oss.params.textOrdering, currentEditImgId);
    oss.makeTimeInput();
  }
  //end

  oss.makeTimeInput = function (){
    if(oss.params.debugMode){
      console.log("oss.makeTimeInput",['without arguments']);
    }

    // jQuerOs(".text-time-start-input").on("input",function(){
    //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(this).attr("data-text-id")+"'][data-image-id='"+jQuerOs(this).attr("data-image-id")+"']")
    //     .attr("data-text-start-time",jQuerOs(this).val());
    // });
    // jQuerOs(".text-time-end-input").on("input",function(){
    //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(this).attr("data-text-id")+"'][data-image-id='"+jQuerOs(this).attr("data-image-id")+"']")
    //     .attr("data-text-end-time",jQuerOs(this).val());
    // });

    // //permanent time
    // jQuerOs(".permanent-time-start-input").on("input",function(){
    //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(this).attr("data-text-id")+"'][data-image-id='"+jQuerOs(this).attr("data-image-id")+"']")
    //     .attr("data-permanent-start-time",jQuerOs(this).val());
    // });
    // jQuerOs(".permanent-time-end-input").on("input",function(){
    //   jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-id='"+jQuerOs(this).attr("data-text-id")+"'][data-image-id='"+jQuerOs(this).attr("data-image-id")+"']")
    //     .attr("data-permanent-end-time",jQuerOs(this).val());
    // });
    //  //permanent time

  }

  //make copyright
  oss.makeCopyright = function (id){
    oss.params.activeTab = id;
    var correction = -15;
    setTimeout(function() {
      var heightDraggable = jQuerOs(container + " [id^=tab-content"+id+"]").outerHeight()
                          +jQuerOs("#dragable-settings-block"+oss.params.moduleId).outerHeight()+correction;
      if(jQuerOs(".copyright-block").css("top") != heightDraggable+'px'){
        jQuerOs(".copyright-block").hide();
        jQuerOs(".copyright-block").css("top",heightDraggable);
        jQuerOs(".copyright-block").show("slow");
      }
    }, 500);
  }
  //end

  //load minicolor
  oss.makeTextColorpicker = function (){
    if(oss.params.debugMode){
      console.log("oss.makeTextColorpicker",['without arguments']);
    }
    jQuerOs(container + " .input-colorpicker").minicolors({
      control: "hue",
      defaultValue: "",
      format:"rgb",
      opacity:true,
      position: "top right",
      hideSpeed: 100,
      inline: false,
      theme: "bootstrap",
      show: function(){
        oss.preventDraggable();
      },
      change: function(value, opacity) {
        jQuerOs(this).attr("value",value);
        if(jQuerOs(this).hasClass('text-color-colorpicker')){
          jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css('color', value);
        }
        else if(jQuerOs(this).hasClass('text-background-colorpicker')){
          jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css('background-color', value);
        }
        else if(jQuerOs(this).hasClass('text-border-colorpicker')){
          if(value){
            jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css('border-color', value);
          }else{
            jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css('border-color', "rgb(255, 255, 255)");
          }
        }else if(jQuerOs(this).hasClass('text-shadow-colorpicker')){

          var regExpShadow = /([rgba]*[(]*[\d.,\s]*[)]+)/;
          var text_shadow = jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css('text-shadow');
          var text_shadow = text_shadow.replace(regExpShadow,'');

          jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css('text-shadow', value+" "+text_shadow);
   
        }
      }
    });
  }
  //end


  //load minicolor
  oss.makeCustomSlideColorpicker = function (){

    if(oss.params.debugMode){
      console.log("oss.makeTextColorpicker",['without arguments']);
    }

    jQuerOs(".custom_color_slide-"+oss.params.moduleId).minicolors({
      control: "hue",
      defaultValue: "",
      format:"rgb",
      opacity:true,
      position: "bottom right",
      hideSpeed: 100,
      inline: false,
      theme: "bootstrap",
      show: function(){
        oss.preventDraggable();
      }
    });
  }
  //end


// //load minicolor
//   oss.colorTest = function (selector){

//     if(oss.params.debugMode){
//       console.log("oss.makeTextColorpicker",['without arguments']);
//     }

//     jQuerOs(selector).minicolors({
//       control: "hue",
//       defaultValue: "",
//       format:"rgb",
//       opacity:true,
//       position: "bottom right",
//       hideSpeed: 100,
//       inline: false,
//       theme: "bootstrap",
//       show: function(){
//         oss.preventDraggable();
//       },
//     });
//   }
//   //end


  //make sortable
  oss.makeSortable = function (){
    if(oss.params.debugMode){
      console.log("oss.makeSortable",['without arguments']);
    }
    jQuerOs(container + " .existing-images").sortable({
      cancel: null, // Cancel the default events on the controls
      connectWith: container + " .slider-images",
      helper: "clone",
      revert: true,
      tolerance: "intersect",
      stop: function( event, ui ) {
        oss.params.imageOrdering = jQuerOs(this).sortable('toArray', {attribute: 'data-sortable-id'});
        oss.sortSliderImages(oss.params.imageOrdering);
        oss.resetSlider(true);
      }
    }).disableSelection();
  }
  //end
  //get current text order id
  oss.currentTextOrderId = function (){
    if(oss.params.debugMode){
      console.log("oss.currentTextOrderId",['without arguments']);
    }
    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide:not(.swiper-slide-duplicate) .slide-text[data-text-order-id]").each(function(index, el){
      if(jQuerOs(el).attr("data-text-order-id") > oss.params.currentTextOrderId){
        oss.params.currentTextOrderId = jQuerOs(el).attr("data-text-order-id");
      }
    });
    oss.params.currentTextOrderId++;
    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide:not(.swiper-slide-duplicate) .slide-text:not([data-text-order-id])").each(function(index, el) {
      jQuerOs(el).attr("data-text-order-id", oss.params.currentTextOrderId);
      oss.params.currentTextOrderId++;
    });

    //sort slider text according to the array
    jQuerOs(oss.params.textOrdering).each(function(indexSortArray, sortingIdArr) {
      jQuerOs(sortingIdArr).each(function(index, sortingId) {
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id='"+indexSortArray+"']:not(.swiper-slide-duplicate) .slide-text").each(function(indexText, text){
          if(jQuerOs(this).attr("data-text-order-id") == sortingId){
            jQuerOs(this).parent().append(this);
          }
        });
      });
    });
    //end
  }
  //end
  //make sortable
  oss.makeImgTextSortable = function (){
    if(oss.params.debugMode){
      console.log("oss.makeImgTextSortable",['without arguments']);
    }
    jQuerOs(container + " .existing-text").sortable({
      cancel: null, // Cancel the default events on the controls
      connectWith: container + " .slide-text-data",
      helper: "clone",
      cancel: ".text-time-start-input, .text-time-end-input, .permanent-time-start-input, .permanent-time-end-input",
      revert: true,
      tolerance: "intersect",
      stop: function( event, ui ) {
        oss.params.textOrdering[jQuerOs(container + " .slide-text-data").attr("data-image-id")] = jQuerOs(this).sortable('toArray', {attribute: 'data-text-order-id'});
        oss.sortSliderText(oss.params.textOrdering, jQuerOs(container + " .slide-text-data").attr("data-image-id"));
      }
    });
  }
  //end

  //func for sorting main slider images
  oss.sortSliderImages = function (ordering){
    if(oss.params.debugMode){
      console.log("oss.sortSliderImages",[ordering]);
    }
    jQuerOs(ordering).each(function(indexSortArray, sortingId) {
      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide").each(function(indexSlide, slide) {
        if(jQuerOs(this).attr("data-image-id") == sortingId){
          jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-wrapper").append(this);
        }
      });
    });
  }
  //end

  //function for check new data
  oss.checkUnsaved = function (){
    if(oss.params.debugMode){
      console.log("oss.checkUnsaved",['without arguments']);
    }
    if(jQuerOs(container + " .not-saved").length && !jQuerOs("#save-settings-" + oss.params.moduleId).hasClass('need-save')){
      jQuerOs("#save-settings-" + oss.params.moduleId).addClass('need-save');
    }
  }
  //end

  //load needed google fonts
  oss.loadNededFonts = function (){
    if(oss.params.debugMode){
      console.log("oss.loadNededFonts",['without arguments']);
    }
    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-wrapper .slide-text").each(function(index, el){
      if(jQuerOs(this).css("font-family").length && oss.params.setupFonts.indexOf(jQuerOs(this).css("font-family")) >-1){
        if(jQuerOs(this).css("font-family").length && oss.params.neededGoogleFonts.indexOf(jQuerOs(this).css("font-family")) == -1){
          oss.params.neededGoogleFonts.push(jQuerOs(this).css("font-family"));
          oss.params.neededGoogleFontsWeight[jQuerOs(this).css("font-family")]=[];
        }
        if(jQuerOs(this).css("font-weight").length && oss.params.neededGoogleFontsWeight[jQuerOs(this).css("font-family")].indexOf(jQuerOs(this).css("font-weight")) == -1){
          oss.params.neededGoogleFontsWeight[jQuerOs(this).css("font-family")].push(jQuerOs(this).css("font-weight"));
        }
      }
    });



    jQuerOs(oss.params.neededGoogleFonts).each(function(fontIndex, font) {
      oss.params.neededGoogleFonts[fontIndex] = oss.params.neededGoogleFonts[fontIndex]
                                        .replace(",",'')
                                        .replace(" ",'+')
                                        .replace(" ",'+')
                                        .replace(new RegExp('\\"', 'gi'),'')
                                        .replace("serif",'Serif')
                                        .replace("sans",'Sans');
      oss.params.neededGoogleFonts[fontIndex] += ':'+oss.params.neededGoogleFontsWeight[font].join(",");
    });

    if(oss.params.neededGoogleFonts.length){
      (function() {
        var wf = document.createElement('link');
        wf.href ='https://fonts.googleapis.com/css?family='+oss.params.neededGoogleFonts.join('|');
        wf.type = 'text/css';
        wf.rel = 'stylesheet';
        var s = document.getElementsByTagName('link')[0];
        s.parentNode.insertBefore(wf, s);
      })();
    }
  }
  //end

  jQuerOs.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD6jQjeJtf5CnSWC27XJv3iui3Pf-lc2_4&sort=popularity",  {}, function (data) {
    for (var i = 0; i < data.items.length; i++) {
      if(oss.params.setupFonts.indexOf(data.items[i].family) > -1){
        if(data.items[i]){
          oss.params.avaibleGoogleFonts.push(data.items[i].family);
          oss.params.avaibleGoogleFontsWeights.push(data.items[i].variants.filter(Number));
          jQuerOs(container + ' .text-font-select').append(jQuerOs('<option></option>').attr("value", data.items[i].family).text(data.items[i].family));
        }
      }
    } 

    WebFont.load({
      google: {
        families: [oss.params.avaibleGoogleFonts.join('|')]
      }
    });

  });
  //end


  oss.autocompleteSlideAnimateSelect = function(){
    if(oss.params.debugMode){
      console.log("oss.autocompleteSlideAnimateSelect",['without arguments']);
    }
    //text start open/close list
    jQuerOs(container + " .os-slider-automplete-show-anim-slide-start").click(function(event) {
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-slide-start").toggleClass('ul-hidden');
      jQuerOs(container + " .os-slider-autocomplete-anim-slide-start:hidden").show();
    });

    //text end open/close list
    jQuerOs(container + " .os-slider-automplete-show-anim-slide-end").click(function(event) {
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-slide-end").toggleClass('ul-hidden');
      jQuerOs(container + " .os-slider-autocomplete-anim-slide-end:hidden").show();
    });

    //text start autocomplete text
    jQuerOs(container + " .os-slider-autocomplete-input-anim-slide-start").on('input', function(event) {
      enter_text = jQuerOs(this).val();
      event.preventDefault();
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-slide-start").removeClass('ul-hidden')
      jQuerOs(container + " .os-slider-autocomplete-anim-slide-start:visible").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) == -1){
          jQuerOs(el).hide();
        }
      });
      jQuerOs(container + " .os-slider-autocomplete-anim-slide-start:hidden").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) != -1){
          jQuerOs(el).show();
        }
      });
    });

    //text end autocomplete text
    jQuerOs(container + " .os-slider-autocomplete-input-anim-slide-end").on('input', function(event) {
      enter_text = jQuerOs(this).val();
      event.preventDefault();
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-slide-end").removeClass('ul-hidden')
      jQuerOs(container + " .os-slider-autocomplete-anim-slide-end:visible").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) == -1){
          jQuerOs(el).hide();
        }
      });
      jQuerOs(container + " .os-slider-autocomplete-anim-slide-end:hidden").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) != -1){
          jQuerOs(el).show();
        }
      });
    });

    //text start add text to input after click
    jQuerOs(container + " .os-slider-autocomplete-anim-slide-start").click(function(event) {
      if(!jQuerOs(container + " .os-slider-autocomplete-avaible-anim-slide-start").hasClass('ul-hidden')){
        jQuerOs(container + " .os-slider-autocomplete-avaible-anim-slide-start").addClass('ul-hidden');
        var animateSelected = jQuerOs(this).text();
        jQuerOs(container + " .os-slider-autocomplete-input-anim-slide-start").val(animateSelected);
      }
    });
    //text end add text to input after click
    jQuerOs(container + " .os-slider-autocomplete-anim-slide-end").click(function(event) {
      if(!jQuerOs(container + " .os-slider-autocomplete-avaible-anim-slide-end").hasClass('ul-hidden')){
        jQuerOs(container + " .os-slider-autocomplete-avaible-anim-slide-end").addClass('ul-hidden');
        var animateSelected = jQuerOs(this).text();
        jQuerOs(container + " .os-slider-autocomplete-input-anim-slide-end").val(animateSelected);
      }
    });

    //add text effect when load page
    if(typeof(oss.params.setupAnimation.start) != 'undefined'){
        jQuerOs(container+" .start-slide-animation .os-slider-autocomplete-input-anim-slide-start").val(
          oss.params.setupAnimation.start[0]
        );
    }
    //add text effect when load page
    if(typeof(oss.params.setupAnimation.end) != 'undefined'){
        jQuerOs(container+" .end-slide-animation .os-slider-autocomplete-input-anim-slide-end").val(
          oss.params.setupAnimation.end[0]
        );
    }

  }

  oss.autocompleteAnimateSelect = function(){
    if(oss.params.debugMode){
      console.log("oss.autocompleteAnimateSelect",['without arguments']);
    }

    //animation start open/close list
    jQuerOs(container + " .os-slider-automplete-show-anim-start").click(function(event) {
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-start").toggleClass('ul-hidden');
      jQuerOs(container + " .os-slider-autocomplete-anim-start:hidden").show();
    });

    //animation end open/close list
    jQuerOs(container + " .os-slider-automplete-show-anim-end").click(function(event) {
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-end").toggleClass('ul-hidden');
      jQuerOs(container + " .os-slider-autocomplete-anim-end:hidden").show();
    });

    //permanent open/close list
    jQuerOs(container + " .os-slider-automplete-show-anim-permanent").click(function(event) {
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-permanent").toggleClass('ul-hidden');
      jQuerOs(container + " .os-slider-autocomplete-anim-permanent:hidden").show();
    });

    //hover open/close list
    jQuerOs(container + " .os-slider-automplete-show-anim-hover").click(function(event) {
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-hover").toggleClass('ul-hidden');
      jQuerOs(container + " .os-slider-autocomplete-anim-hover:hidden").show();
    });


    //animation start autocomplete text
    jQuerOs(container + " .os-slider-autocomplete-input-anim-start").on('input', function(event) {
      enter_text = jQuerOs(this).val();
      event.preventDefault();
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-start").removeClass('ul-hidden')
      jQuerOs(container + " .os-slider-autocomplete-anim-start:visible").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) == -1){
          jQuerOs(el).hide();
        }
      });
      jQuerOs(container + " .os-slider-autocomplete-anim-start:hidden").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) != -1){
          jQuerOs(el).show();
        }
      });
    });

    //animation end autocomplete text
    jQuerOs(container + " .os-slider-autocomplete-input-anim-end").on('input', function(event) {
      enter_text = jQuerOs(this).val();
      event.preventDefault();
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-end").removeClass('ul-hidden')
      jQuerOs(container + " .os-slider-autocomplete-anim-end:visible").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) == -1){
          jQuerOs(el).hide();
        }
      });
      jQuerOs(container + " .os-slider-autocomplete-anim-end:hidden").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) != -1){
          jQuerOs(el).show();
        }
      });
    });

    //animation permanent autocomplete text
    jQuerOs(container + " .os-slider-autocomplete-input-anim-permanent").on('input', function(event) {
      enter_text = jQuerOs(this).val();
      event.preventDefault();
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-permanent").removeClass('ul-hidden')
      jQuerOs(container + " .os-slider-autocomplete-anim-permanent:visible").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) == -1){
          jQuerOs(el).hide();
        }
      });
      jQuerOs(container + " .os-slider-autocomplete-anim-permanent:hidden").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) != -1){
          jQuerOs(el).show();
        }
      });
    });

     //animation hover autocomplete text
    jQuerOs(container + " .os-slider-autocomplete-input-anim-hover").on('input', function(event) {
      enter_text = jQuerOs(this).val();
      event.preventDefault();
      jQuerOs(container + " .os-slider-autocomplete-avaible-anim-hover").removeClass('ul-hidden')
      jQuerOs(container + " .os-slider-autocomplete-anim-hover:visible").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) == -1){
          jQuerOs(el).hide();
        }
      });
      jQuerOs(container + " .os-slider-autocomplete-anim-hover:hidden").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) != -1){
          jQuerOs(el).show();
        }
      });
    });

    //animation start add text to input after click
    jQuerOs(container + " .os-slider-autocomplete-anim-start").click(function(event) {
      if(!jQuerOs(container + " .os-slider-autocomplete-avaible-anim-start").hasClass('ul-hidden')){
        jQuerOs(container + " .os-slider-autocomplete-avaible-anim-start").addClass('ul-hidden');
        var animateSelected = jQuerOs(this).text();
        jQuerOs(container + " .os-slider-autocomplete-input-anim-start").val(animateSelected);
      }
    });
    //animation end add text to input after click
    jQuerOs(container + " .os-slider-autocomplete-anim-end").click(function(event) {
      if(!jQuerOs(container + " .os-slider-autocomplete-avaible-anim-end").hasClass('ul-hidden')){
        jQuerOs(container + " .os-slider-autocomplete-avaible-anim-end").addClass('ul-hidden');
        var animateSelected = jQuerOs(this).text();
        jQuerOs(container + " .os-slider-autocomplete-input-anim-end").val(animateSelected);
      }
    });

    //animation permanent add text to input after click
    jQuerOs(container + " .os-slider-autocomplete-anim-permanent").click(function(event) {
      if(!jQuerOs(container + " .os-slider-autocomplete-avaible-anim-permanent").hasClass('ul-hidden')){
        jQuerOs(container + " .os-slider-autocomplete-avaible-anim-permanent").addClass('ul-hidden');
        var animateSelected = jQuerOs(this).text();
        jQuerOs(container + " .os-slider-autocomplete-input-anim-permanent").val(animateSelected);
      }
    });

    //animation hover add text to input after click
    jQuerOs(container + " .os-slider-autocomplete-anim-hover").click(function(event) {
      if(!jQuerOs(container + " .os-slider-autocomplete-avaible-anim-hover").hasClass('ul-hidden')){
        jQuerOs(container + " .os-slider-autocomplete-avaible-anim-hover").addClass('ul-hidden');
        var animateSelected = jQuerOs(this).text();
        jQuerOs(container + " .os-slider-autocomplete-input-anim-hover").val(animateSelected);
      }
    });

  }

  oss.autocompleteFontSelect = function (){
    if(oss.params.debugMode){
      console.log("oss.autocompleteFontSelect",['without arguments']);
    }

    oss.params.setupFonts = oss.params.setupFonts.sort();

    jQuerOs(oss.params.setupFonts).each(function(index, el) {

      if(el){
        // console.log(el);

        li = document.createElement('li');
        li.className = "os-slider-autocomplete-font";
        li.style = "font-family:'"+el+"';";
        jQuerOs(li).text(el);
        jQuerOs(container + " .os-slider-autocomplete-avaible-fonts").append(li);
      }
    });

    //click on open font
    jQuerOs(container + " .os-slider-automplete-show-fonts").click(function(event) {
      jQuerOs(container + " .os-slider-autocomplete-avaible-fonts").toggleClass('ul-hidden');
      jQuerOs(container + " .os-slider-autocomplete-font:hidden").show();
    });


    //start input
    jQuerOs(container + " .os-slider-autocomplete-input").on('input', function(event) {
      enter_text = jQuerOs(this).val();
      event.preventDefault();
      jQuerOs(container + " .os-slider-autocomplete-avaible-fonts").removeClass('ul-hidden')
      jQuerOs(container + " .os-slider-autocomplete-font:visible").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) == -1){
          jQuerOs(el).hide();
        }
      });
      jQuerOs(container + " .os-slider-autocomplete-font:hidden").each(function(index, el) {
        if(jQuerOs(el).text().toLowerCase().indexOf(enter_text) != -1){
          jQuerOs(el).show();
        }
      });
    });

    jQuerOs(container + " .os-slider-autocomplete-font").click(function(event) {
      if(!jQuerOs(container + " .os-slider-autocomplete-avaible-fonts").hasClass('ul-hidden')){
        jQuerOs(container + " .os-slider-autocomplete-avaible-fonts").addClass('ul-hidden');
        var fontSelected = jQuerOs(this).text();
        jQuerOs(container + " .os-slider-autocomplete-input").val(fontSelected);

        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-wrapper .text-active").css("font-family","'"+fontSelected+"'")
                  .css("font-weight","normal")
                  .attr("data-font-family",fontSelected);
        //fix h1-6
        jQuerOs(jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-wrapper .text-active"))
              .find("h1,h2,h3,h4,h5,h6").css("font-family",fontSelected)
              .css("font-weight","normal");

        jQuerOs(container + " .text-font-weight-select option").remove()
        //create font weight select
        if(oss.params.avaibleGoogleFontsWeights[oss.params.avaibleGoogleFonts.indexOf(fontSelected)]){
          var fontWeightQuery='';
          fontWeights = oss.params.avaibleGoogleFontsWeights[oss.params.avaibleGoogleFonts.indexOf(fontSelected)];
          jQuerOs(container + " .text-font-weight-select").append(jQuerOs('<option></option>').attr("value", "normal").text("normal"));
          for (var i = 0; i < fontWeights.length; i++) {
            fontWeightQuery += fontWeights[i];
            if(i < fontWeights.length-1)fontWeightQuery += ',';

            jQuerOs(container + " .text-font-weight-select")
              .append(jQuerOs('<option></option>').attr("value", fontWeights[i]).text(fontWeights[i]));
          }
          WebFont.load({
            google: {
              families: [fontSelected +':'+ fontWeightQuery]
            }
          });
        }
      }
    });

  }

  oss.showHideArrows = function (){
    if(oss.params.debugMode){
      console.log("oss.showHideArrows:",params.loop );
    }

      if(jQuerOs("#os-slider-"+oss.params.moduleId+" img.slide-image").length < 2){
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-prev").hide();
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-prev").addClass('hide');
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-next").hide();
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-next").addClass('hide');
      }

      if(oss.params.swiperSlider.isBeginning && params.loop == 0){
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-prev").hide()
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-prev").addClass('hide');

      }else if(parseInt(jQuerOs(container + " .prev_next_arrows:checked").val())){
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-prev").show()
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-prev").removeClass('hide');
      }

      if(oss.params.swiperSlider.isEnd && params.loop == 0){
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-next").hide()
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-next").addClass('hide');
      }else if(parseInt(jQuerOs(container + " .prev_next_arrows:checked").val())){
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-next").show()
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-next").removeClass('hide');
      }
  }

  oss.reinitSlider = function (params, setupAnimation){
    if(oss.params.debugMode){
      console.log("oss.reinitSlider",[params],[oss.params], [setupAnimation]);
    }

    oss.params.timer.stop();
    oss.params.swiperSlider.destroy(true, true);

    jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container,#os-slider-"+oss.params.moduleId+"  .swiper-wrapper ,#os-slider-"+oss.params.moduleId+" .swiper-slide,#os-slider-"+oss.params.moduleId+"  .swiper-slide div").removeAttr("style");
    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-cube-shadow,#os-slider-"+oss.params.moduleId+" .swiper-slide-shadow-right,#os-slider-"+oss.params.moduleId+" .swiper-slide-shadow-left,#os-slider-"+oss.params.moduleId+" .swiper-scrollbar-drag").remove();
    jQuerOs("#os-slider-"+oss.params.moduleId+".swiper-container .swiper-pagination").removeClass('swiper-pagination-clickable, swiper-pagination-bullets, swiper-pagination-fraction, swiper-pagination-progress');

    oss.params.swiperSlider = new SwipeOs('#os-slider-'+oss.params.moduleId, {
      // kw_tosave:kw_tosave,
      debugMode: oss.params.debugMode,
      parallax:params.parallax,
      autoplay: {
        delay: params.autoplay,
        stopOnLastSlide: params.autoplayStopOnLast,
        disableOnInteraction: params.autoplayDisableOnInteraction,
      },
      initialSlide:params.initialSlide,
      direction: params.direction,
      setupAnimation: setupAnimation,
      imageFullTime: params.imageFullTime,
      imageLink: params.imageLink,
      imageFilter: params.imageFilter,
      imageBackground: params.imageBackground,
      endAnimationEnable:true,
      speed: params.speed,
      spaceBetween: params.spaceBetween,
      slidesPerColumn: params.slidesPerColumn,
      slidesPerColumnFill: params.slidesPerColumnFill,
      slidesPerGroup: params.slidesPerGroup,
      centeredSlides: params.centeredSlides,
      slidesPerView: params.slidesPerView,
      freeMode: params.freeMode,
      freeModeMomentum: params.freeModeMomentum,
      freeModeMomentumRatio: params.freeModeMomentumRatio,
      freeModeMomentumBounce: params.freeModeMomentumBounce,
      freeModeMomentumBounceRatio: params.freeModeMomentumBounceRatio,
      freeModeMinimumVelocity: params.freeModeMinimumVelocity,
      effect: params.effect,
      cube: {
        slideShadows: params.cube.slideShadows,
        shadow: params.cube.shadow,
        shadowOffset: params.cube.shadowOffset,
        shadowScale: params.cube.shadowScale
      },
      coverflow: {
        rotate: params.coverflow.rotate,
        stretch: params.coverflow.stretch,
        depth: params.coverflow.depth,
        modifier: params.coverflow.modifier,
        slideShadows : params.coverflow.coverflowSlideShadows
      },
      flip: {
        slideShadows : params.flip.slideShadows,
        limitRotation: params.flip.limitRotation
      },
      pagination: params.pagination,
      paginationType: params.paginationType,
      paginationClickable: params.paginationClickable,
      nextButton: '',
      prevButton: '',
      scrollbar: params.scrollbar,
      scrollbarHide: params.scrollbarHide,
      scrollbarDraggable: params.scrollbarDraggable,
      keyboardControl: params.keyboardControl,
      mousewheelControl: params.mousewheelControl,
      preloadImages: params.preloadImages,
        
      lazy: {
        enable :              oss.params.lazy,
        loadPrevNext :        oss.params.loadPrevNext,
        loadPrevNextAmount:   oss.params.loadPrevNextAmount,
      },

      loop: params.loop,
      mousewheelReleaseOnEdges: params.mousewheelReleaseOnEdges,
      slideActiveClass: 'swiper-slide-active',

      on: {
        transitionStart: function () { //callback

          if(oss.params.debugMode){
            console.log("oss.transitionStart");
          }        
          //if more than 1 slide
          oss.stopSlider();
          //if more than 1 slide
          oss.params.timer.stop();

          if(!oss.stopSlider()){
              jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").fadeTo(0,0);
          }

          //paralax
          if(oss.params.parallax){
            if(jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active").attr("data-image-id") 
              != jQuerOs("#os-slider-"+oss.params.moduleId+" .parallax-bg").attr("data-image-id")){
                jQuerOs(oss.params.parallaxImg).each(function(index, img) {
                  if(jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active").attr("data-image-id")
                    == img[2]){
                    jQuerOs("#os-slider-"+oss.params.moduleId+" .parallax-bg")
                      .attr("style","background-image:url("+img[0]+")")
                      .attr("data-image-id",img[2]);
                      jQuerOs("#os-slider-"+oss.params.moduleId+" .parallax-bg").hide();
                      jQuerOs("#os-slider-"+oss.params.moduleId+" .parallax-bg").fadeTo(50, 1);
                      if(jQuerOs(container + " .direction:checked").val() == 'horizontal'){
                        jQuerOs("div[id^='os-slider'] .parallax-bg").css({"width":"130%", "height":"100%"});
                      }else{
                        jQuerOs("div[id^='os-slider'] .parallax-bg").css({"width":"100%", "height":"130%"});
                      }
                  }
                });
            }
          }
          //paralax

          if(setupAnimation){
            // setTimeout(function(){
              jQuerOs(setupAnimation.start).each(function(index, animationClass) {
                jQuerOs("#os-slider-"+oss.params.moduleId+' .swiper-slide-active').animateCssSlide(animationClass);
              });
            // }, 50);
          }
          if(oss.params.debugMode){
            console.log("oss.transitionStart end");
          }           

        },


        transitionEnd: function (swiper) { //callback
          if(oss.params.debugMode){
            console.log("oss.transitionEnd");
          }        

           //if more than 1 slide
          if(oss.stopSlider()){
              return;
          }
          //if more than 1 slide

          //for arrow show/hide
          oss.showHideArrows();
          //for arrow show/hide

          oss.params.timer.stop();

          oss.params.textStartTimes = [];
          oss.params.textEndTimes = [];
          oss.params.permanentStartTimes = [];
          oss.params.permanentEndTimes = [];
          
          jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active:not(.edit-image) .slide-text:not([data-text-start-time='0'])").each(function(index, el) {

            if(typeof(oss.params.textStartTimes[jQuerOs(el).attr("data-text-start-time")]) == 'undefined'){
              oss.params.textStartTimes[jQuerOs(el).attr("data-text-start-time")] = [];
            }
          
            oss.params.textStartTimes[jQuerOs(el).attr("data-text-start-time")].push(jQuerOs(el).attr("data-text-id"));
          });


          jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active:not(.edit-image) .slide-text:not([data-text-end-time='0'])").each(function(index, el) {

            if(typeof(oss.params.textEndTimes[jQuerOs(el).attr("data-text-end-time")]) == 'undefined'){
              oss.params.textEndTimes[jQuerOs(el).attr("data-text-end-time")] = [];
            }

            oss.params.textEndTimes[jQuerOs(el).attr("data-text-end-time")].push(jQuerOs(el).attr("data-text-id"));
          });

          //permanent effect
          jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active:not(.edit-image) .slide-text:not([data-permanent-start-time='0'])").each(function(index, el) {

            if(typeof(oss.params.permanentStartTimes[jQuerOs(el).attr("data-permanent-start-time")]) == 'undefined'){
              oss.params.permanentStartTimes[jQuerOs(el).attr("data-permanent-start-time")] = [];
            }
          
            oss.params.permanentStartTimes[jQuerOs(el).attr("data-permanent-start-time")].push(jQuerOs(el).attr("data-text-id"));
          });


          jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active:not(.edit-image) .slide-text:not([data-permanent-end-time='0'])").each(function(index, el) {

            if(typeof(oss.params.permanentEndTimes[jQuerOs(el).attr("data-permanent-end-time")]) == 'undefined'){
              oss.params.permanentEndTimes[jQuerOs(el).attr("data-permanent-end-time")] = [];
            }

            oss.params.permanentEndTimes[jQuerOs(el).attr("data-permanent-end-time")].push(jQuerOs(el).attr("data-text-id"));
          });
          //permanent effect

          oss.params.timer.run(function (timer) {

            imageId = jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active").attr("data-image-id");

            if(oss.params.textStartTimes[timer.time/1000]){

              jQuerOs(oss.params.textStartTimes[timer.time/1000]).each(function(index, textId) {
                if(typeof(oss.params.textAnimation['start']) !='undefined' 
                    && oss.params.textAnimation['start'][imageId] 
                    && oss.params.textAnimation['start'][imageId][textId]){
                  jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").animateCssTextStart(oss.params.textAnimation['start'][imageId][textId]);
                }else{
                  jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").fadeTo("slow",1);
                }
              });
              delete oss.params.textStartTimes[timer.time/1000];
            }

            if(oss.params.textEndTimes[timer.time/1000]){

              jQuerOs(oss.params.textEndTimes[timer.time/1000]).each(function(index, textId) {
                if(typeof(oss.params.textAnimation['end']) !='undefined' 
                    && oss.params.textAnimation['end'][imageId] 
                    && oss.params.textAnimation['end'][imageId][textId]){
                  jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").animateCssTextEnd(oss.params.textAnimation['end'][imageId][textId]);
                }else{
                  jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").fadeTo("slow",0);
                }
              });
              delete oss.params.textEndTimes[timer.time/1000];
            } 

            //permanent start
            if(oss.params.permanentStartTimes[timer.time/1000]){

              jQuerOs(oss.params.permanentStartTimes[timer.time/1000]).each(function(index, textId) {
                if(typeof(oss.params.textAnimation['permanent']) !='undefined' 
                    && oss.params.textAnimation['permanent'][imageId] 
                    && oss.params.textAnimation['permanent'][imageId][textId]){
                  jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").animateCssTextPermanentStart(oss.params.textAnimation['permanent'][imageId][textId]);
                }else{
                  jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").fadeTo("slow",1);
                }
              });
              delete oss.params.permanentStartTimes[timer.time/1000];
            }

            //permanent end
            if(oss.params.permanentEndTimes[timer.time/1000]){
              
              jQuerOs(oss.params.permanentEndTimes[timer.time/1000]).each(function(index, textId) {
                if(typeof(oss.params.textAnimation['permanent']) !='undefined' 
                    && oss.params.textAnimation['permanent'][imageId] 
                    && oss.params.textAnimation['permanent'][imageId][textId]){
                  jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").animateCssTextPermanentStart(oss.params.textAnimation['permanent'][imageId][textId]);
                }else{
                  jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").fadeTo("slow",0);
                }
              });
              delete oss.params.permanentEndTimes[timer.time/1000];
            }        


          });

          if(oss.params.debugMode){
            console.log("oss.transitionEnd end");
          }             
        }


      }


    });
    

    //if more than 1 pictures in the same time (arrows always show)
    if(!oss.stopSlider()){
      oss.showHideArrows();
    }  
    
    //text Animation on 1-st slide after reload
    //hide text and show only without timeout//
    jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-text-start-time='0'],"+
            "#os-slider-"+oss.params.moduleId+" .slide-text:not([data-text-start-time]),"+
            "#os-slider-"+oss.params.moduleId+" .slide-text[data-text-start-time='']").fadeTo(0,1);

    // permanent only without timeout//
    var textPermanentWithoutTime = jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-permanent-start-time='0'],"+
            "#os-slider-"+oss.params.moduleId+" .slide-text[data-permanent-start-time='']");

    function checkAttr(attr){
      if(attr == false || attr == undefined || attr == 'undefined' || attr == 'NAN') return false;
      return true;
    }

    if(checkAttr(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").attr('data-permanent-start-time'))) textPermanentWithoutTime.length = 0;
    if(checkAttr(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").attr('data-text-start-time'))) textPermanentWithoutTime.length = 0;
    if(checkAttr(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").attr('data-permanent-end-time'))) textPermanentWithoutTime.length = 0;
    if(checkAttr(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").attr('data-text-end-time'))) textPermanentWithoutTime.length = 0;

    if(textPermanentWithoutTime.length > 0){
      textPermanentWithoutTime.animateCssTextPermanentStart(oss.params.textAnimation['permanent'][textPermanentWithoutTime.attr("data-image-id")][textPermanentWithoutTime.attr("data-text-id")]);
      return;
    }

  

    //make animation for text on first slide


    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active .slide-text:not([data-text-start-time='0'])").each(function(index, el) {

      if(typeof(oss.params.textStartTimes[jQuerOs(el).attr("data-text-start-time")]) == 'undefined'){
        oss.params.textStartTimes[jQuerOs(el).attr("data-text-start-time")] = [];
      }

      oss.params.textStartTimes[jQuerOs(el).attr("data-text-start-time")].push(jQuerOs(el).attr("data-text-id"));
    });

    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active .slide-text:not([data-text-end-time='0'])").each(function(index, el) {

      if(typeof(oss.params.textEndTimes[jQuerOs(el).attr("data-text-end-time")]) == 'undefined'){
        oss.params.textEndTimes[jQuerOs(el).attr("data-text-end-time")] = [];
      }

      oss.params.textEndTimes[jQuerOs(el).attr("data-text-end-time")].push(jQuerOs(el).attr("data-text-id"));
    });



    //for permanent efect

    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active .slide-text:not([data-permanent-start-time='0'])").each(function(index, el) {

      if(typeof(oss.params.permanentStartTimes[jQuerOs(el).attr("data-permanent-start-time")]) == 'undefined'){
        oss.params.permanentStartTimes[jQuerOs(el).attr("data-permanent-start-time")] = [];
      }

      oss.params.permanentStartTimes[jQuerOs(el).attr("data-permanent-start-time")].push(jQuerOs(el).attr("data-text-id"));
    });


    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active .slide-text:not([data-permanent-end-time='0'])").each(function(index, el) {

      if(typeof(oss.params.permanentEndTimes[jQuerOs(el).attr("data-permanent-end-time")]) == 'undefined'){
        oss.params.permanentEndTimes[jQuerOs(el).attr("data-permanent-end-time")] = [];
      }

      oss.params.permanentEndTimes[jQuerOs(el).attr("data-permanent-end-time")].push(jQuerOs(el).attr("data-text-id"));
    });

    //for permanent efect



    //init animation text
    oss.stopSlider();
    if(params.loop != 0) return;
    

    oss.params.timer.run(function (timer) {

      //image id    
      imageId = jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide.swiper-slide-active").attr("data-image-id");

      //start text Animation //on slider init 1-st slide
      if(oss.params.textStartTimes[timer.time/1000]){

        jQuerOs(oss.params.textStartTimes[timer.time/1000]).each(function(index, textId) {

          if(typeof(oss.params.textAnimation['start']) !='undefined' 
              && oss.params.textAnimation['start'][imageId] 
              && oss.params.textAnimation['start'][imageId][textId]){
          jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").animateCssTextStart(oss.params.textAnimation['start'][imageId][textId]);
          }else{
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").fadeTo("slow",1);
          }

        });

        delete oss.params.textStartTimes[timer.time/1000];
      }

      //end text Animation //on slider init 1-st slide
      if(oss.params.textEndTimes[timer.time/1000]){


        jQuerOs(oss.params.textEndTimes[timer.time/1000]).each(function(index, textId) {

          if(typeof(oss.params.textAnimation['end']) !='undefined' 
              && oss.params.textAnimation['end'][imageId] && oss.params.textAnimation['end'][imageId][textId]){
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").animateCssTextEnd(oss.params.textAnimation['end'][imageId][textId]);
          }else{
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").fadeTo("slow",0);
          }

        });

        delete oss.params.textEndTimes[timer.time/1000];
      }



      //permanent start 
       if(oss.params.permanentStartTimes[timer.time/1000]){


        jQuerOs(oss.params.permanentStartTimes[timer.time/1000]).each(function(index, textId) {

          if(typeof(oss.params.textAnimation['permanent']) !='undefined' 
              && oss.params.textAnimation['permanent'][imageId]
              && oss.params.textAnimation['permanent'][imageId][textId]){
          jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").animateCssTextPermanentStart(oss.params.textAnimation['permanent'][imageId][textId]);
          }else{
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").fadeTo("slow",1);
          }

        });

        delete oss.params.permanentStartTimes[timer.time/1000];
      }
      //permanent start 

      //permanent end 
      if(oss.params.permanentEndTimes[timer.time/1000]){

        jQuerOs(oss.params.permanentEndTimes[timer.time/1000]).each(function(index, textId) {

          if(typeof(oss.params.textAnimation['permanent']) !='undefined' 
              && oss.params.textAnimation['permanent'][imageId] && oss.params.textAnimation['permanent'][imageId][textId]){
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").animateCssTextPermanentEnd(oss.params.textAnimation['permanent'][imageId][textId]);
          }else{
            jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+textId+"']").fadeTo("slow",0);
          }

        });

        delete oss.params.textEndTimes[timer.time/1000];
      }
      //permanent end 

    });



    //end first slide animation


    //hover effect
    jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").unbind('mouseover');

    jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").mouseover(function(event) {

        if(jQuerOs(this).css("opacity") == 0) return;
        if(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").hasClass('text-active')) return;
        if(jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").parent('div').hasClass('edit-image')) return;


        var afterEffect = true;
        if(jQuerOs(this).hasClass('text-active')) afterEffect = false;

        if(oss.params.textAnimation['hover'] 
          && oss.params.textAnimation['hover'][jQuerOs(this).attr("data-image-id")] 
          && oss.params.textAnimation['hover'][jQuerOs(this).attr("data-image-id")][jQuerOs(this).attr("data-text-id")]){

           jQuerOs(this).animateCssTextHover(oss.params.textAnimation['hover'][jQuerOs(this).attr("data-image-id")][jQuerOs(this).attr("data-text-id")], afterEffect);
        }

    });    

  }

  oss.saveSliderSettings = function (moduleId,copyimage){
    if(oss.params.debugMode){
      console.log("oss.saveSliderSettings",[moduleId]);
    }

    oss.addBackgroundToThumbs();

    var imgText = [];
    if(jQuerOs(container + " .editing-text:visible").val()){
      oss.saveTextEditor();
    }

    jQuerOs(container+" .cancel-text-editor,"+container+" .save-text-editor").hide();

    oss.setTextAttrValue();

    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide:not(.swiper-slide-duplicate) .slide-text").each(function(index, el){
      

      if(jQuerOs(el).css("width")){
        jQuerOs(el).attr("data-width",jQuerOs(el).css("width").replace('px',''));
      }

      if(jQuerOs(el).attr("data-custom-class")){
        jQuerOs(el).addClass(jQuerOs(el).attr("data-custom-class"));
      }

      jQuerOs(el).attr("data-style",jQuerOs(el).attr("style"));

      if(el){
        imgId = jQuerOs(el).attr("data-image-id");
        if(imgText.indexOf(imgId)){
          imgText[imgId] = [];
        }
        textHtml = jQuerOs(el).parent().clone();
        jQuerOs(textHtml).find("img.slide-image").remove();


                var imgTextIndex = []; // for remove text duplicate
        jQuerOs(textHtml).find("div.slide-text").each(function(index, el) {
          jQuerOs(el).parent().removeClass('ui-draggable ui-draggable-handle text-active not-saved');

          textId = jQuerOs(el).attr("data-text-id"); // for remove text duplicate
          if(imgTextIndex.indexOf(textId) === -1 ){
            imgTextIndex[textId] = textId;
            imgText[imgId].push(encodeURI(jQuerOs(el).clone().wrap('<div>').parent().html()));
          }else {
            // for remove text duplicate
            //continue ;
          }       

        });
      }
    });

  
  
  
    params = oss.resetSlider();

//console.log(":1111111111111111111111:",params.setupAnimation);
    params.imageFilter = jQuerOs.toJSON(params.imageFilter);
    params.imageBackground = jQuerOs.toJSON(params.imageBackground);

    params.imageFullTime = jQuerOs.toJSON(params.imageFullTime);
    params.imageLink = jQuerOs.toJSON(params.imageLink);
    params.textAnimation = jQuerOs.toJSON(params.textAnimation);
    params.textOrdering = jQuerOs.toJSON(params.textOrdering);
    params.setupAnimation = jQuerOs.toJSON(params.setupAnimation);
    params.version = 5.0;

    // params = jQuerOs.toJSON(params);
    imgText = jQuerOs.toJSON(imgText);

    if(oss.params.isUser != 1){
       jQuerOs("#message-block-" + oss.params.moduleId+","+container+" .qqsl-upload-list").html('<span class="successful-slider-message">Changes successfully saved.</span>');
       jQuerOs("#os-slider-"+oss.params.moduleId).unbind('mouseover');
      jQuerOs(container).hide('slow');
      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").fadeTo(0,0);

      oss.resetSlider(true);
      jQuerOs("#os-show-settings-button-" + oss.params.moduleId).show();

      oss.stopSlider();
      
      return;
    }

    jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('text-active');
    jQuerOs.post("index.php?option=com_ajax&module=os_touchslider&Itemid="+oss.params.ItemId+"&task=save_settings&moduleId="+oss.params.moduleId+"&format=raw",
                 {form_data:params,image_text_data:imgText},


    function (data) {

      if (data.success){

          jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").fadeTo(0,0);

          // jQuerOs("#message-block-" + oss.params.moduleId+","+container+" .qqsl-upload-list").html('<span class="successful-slider-message">Changes successfully saved.</span>');
          if(!copyimage){
          jQuerOs("#os-slider-"+oss.params.moduleId).unbind('mouseover');
            jQuerOs(container).hide('slow');
          }
          jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").removeClass('not-saved');
          jQuerOs("#save-settings-" + oss.params.moduleId).removeClass('need-save');
          setTimeout(function(){
            jQuerOs("#message-block-" + oss.params.moduleId+","+container+" .qqsl-upload-list").empty();
          }, 5000);
          oss.cancelImgEditor();
          if(oss.params.parallax == 1){
            oss.enableParalax();
          }
          oss.resetSlider(true);

          jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").fadeTo(0,0);

      }else{
   
          jQuerOs("#message-block-" + oss.params.moduleId).html('<span class="error-slider-message">Something was wrong.(saveSliderSettings)</span>');
          jQuerOs(container).hide('slow');
        
      }

      oss.stopSlider();

    } , 'json' );

  }

  //uploader
  if(jQuerOs('#images-load-area-' + oss.params.moduleId).length){
    
    var uploader = new qqsl.FineUploader({
    
    /* other required config options left out for brevity */
        //multiple: true,
        element: document.getElementById("fine-uploader-"+oss.params.moduleId),
        template: 'qqsl-template-'+oss.params.moduleId,
        validation: {
            allowedExtensions: ['jpg', 'jpeg', 'png', 'gif', 'zip'],
            sizeLimit: 10 * 1024 * 1024,
        },
        request: {
            endpoint: oss.params.site_path+'index.php?option=com_ajax&module=os_touchslider&Itemid='+oss.params.ItemId+'&format=json',
            params: {
              id: oss.params.moduleId,
              image_width: oss.params.imageWidth,
              image_height: oss.params.imageHeight,
              crop: oss.params.crop
            }
        },
        callbacks: {

          onComplete: function (id, filename, responseJSON) {

            if (!responseJSON.success) {

              if(responseJSON.id == 'import'){
  
                     jQuerOs(container + " .import-responce").text("Import failed");
                     jQuerOs(container + " .import-responce").show(500);
                     jQuerOs(container + " .import-responce").css('backgroundColor','#f7484e');
                     jQuerOs(container + " .import-responce").click(function(event) {
                        jQuerOs(this).hide(500)
                     });

                }

            }else{
              if(oss.params.debugMode){
                console.log("onComplete.upload.image",[responseJSON]);
              }

              jQuerOs('div.empty-image div').remove();
              //bch
              fileName = responseJSON.file;
              ext = responseJSON.ext;


              if(responseJSON.id == 'import'){
              
                if(responseJSON.success){

                    jQuerOs(container + " .import-responce").text("Import success");
                    jQuerOs(container + " .import-responce").show(500);
                    jQuerOs(container + " .import-responce").css('backgroundColor','#0E9267');
                    jQuerOs(container + " .import-responce").unbind('click');

                    //localStorage.setItem('afterImport', true); andrew add comment, I removed text resize after import
                    //need additional check

                    var i=3;
                    var interval = setInterval(function(){
                      jQuerOs(container + " .import-responce").text("Page update after "+i+" seconds");
                      --i;
                      if(i == 0){
                        clearTimeout(interval)
                        location.reload(true)
                      } 
                    },1000)

                  
                    }

                    return;
              }


              if(responseJSON.image_copy_id)
              {
                  image_id = responseJSON.image_copy_id;
                  jQuerOs(container + " .slider-images[data-sortable-id="+image_id+"]").remove();
              }else{
                  image_id = responseJSON.id;
              }
              //bch

              slideSrc = oss.params.site_path+'images/os_touchslider_'+oss.params.moduleId+'/thumbnail/'+fileName+'_150_100_1'+ext;
              image = '<div class="slider-images" data-sortable-id="'+image_id+'">'+
                        '<div class="slider-image-block">'+
                        '<a class="delete-current-image" type="button" aria-invalid="false">'+
                        '<i class="fa os_icon-cancel" aria-hidden="true"></i></a>'+
                        '<a class="edit-current-image" type="button" '+
                        'aria-invalid="false" value="-E-">'+
                        '<i class="fa os_icon-pencil" aria-hidden="true"></i></a>'+

                        //bch
                        '<a class="copy-current-image oss-pro-avaible" aria-invalid="false">'+
                        '<i class="fa os_icon-docs" aria-hidden="true"></i></a>'+

                        '<a class="replace-current-image oss-pro-avaible" aria-invalid="false">'+
                        '<i class="fa os_icon-picture" aria-hidden="true"></i></a>'+
                        //bch
                        
                        '<img class="slider-image" src="'+slideSrc+'" alt="'+fileName+ext+'" data-image-id="'+image_id+'">'+
                        '</div>'+
                      '</div>';

              jQuerOs(container + " .existing-images").append(image);

              slideSrc = oss.params.site_path+'images/os_touchslider_'+oss.params.moduleId+'/original/'+fileName+ext;


              if(responseJSON.image_copy_id){
                timeInput = jQuerOs(container + " .image-full-time[data-image-id="+image_id+"]");
                imageLinkInput = jQuerOs(container + " .image-link[data-image-id="+image_id+"]");
                var filterSelectAdd = jQuerOs(container + " .image-filter[data-image-id="+image_id+"]");
                var backgroundSelectAdd = jQuerOs(container + " .image-background[data-image-id="+image_id+"]");


              }else{
                jQuerOs(" .swiper-slide[data-image-id="+image_id+"] img").remove();
                timeInput = '<span data-image-id="'+image_id+'" class="image-full-time" style="display:none;">'+
                           'Image full time, s:<input class="time-input" type="number" '+
                           'name="image_full_time['+image_id+']" min="0" step="0.1" value="">'+
                          '</span>';
                imageLinkInput = '<span data-image-id="'+image_id+'" class="image-link" style="display:none;">'+
                             'Image link:<i title="Add link for every whole image or you may add links to every text" '+
                             'class="fa os_icon-info-circled info_block"></i>'+
                             '<input class="image-link-input" type="text" name="image-link['+image_id+']" size="20" '+
                             ' maxlength="300" '+
                             'value="">'+
                            '</span>';

                var filterSelectAdd = oss.addFilterSelect(image_id);

                var backgroundSelectAdd = '<span data-image-id="'+image_id+'" class="image-background" style="display:none;">Background:<i title="To use, apply a transparency effect to the image or load a transparent image." class="fa os_icon-info-circled info_block"></i><input data-image-id="'+image_id+'" class="background-input custom_color_slide-'+oss.params.moduleId+'" type="text" name="image_background'+image_id+'" min="0" step="0.1" value="rgba(255, 255, 255, 1)"></span>';
              }


              jQuerOs(container + " .image-time-block").append(timeInput);
              jQuerOs(container + " .image-link-block").append(imageLinkInput);
              jQuerOs(container + " .image-filter-block").append(filterSelectAdd);
              jQuerOs(container + " .image-background-block").append(backgroundSelectAdd);


              if(oss.params.lazy){
                newSlide = '<img class="swiper-lazy" data-src="'+slideSrc+'" data-image-id="'+image_id+'">'+
                            '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>';
              }else{
                newSlide = '<img src="'+slideSrc+'" alt="'+fileName+ext+'" data-image-id="'+image_id+'">';
              }


              if(responseJSON.image_copy_id)
              {
                  jQuerOs('.swiper-slide[data-image-id="'+image_id+'"').prepend(newSlide);
              }else{
                  oss.params.swiperSlider.appendSlide('<div class="swiper-slide" data-image-id="'+image_id+'">'+newSlide+'</div>');
              }
            

              setTimeout(function(){
                jQuerOs(container + " .qqsl-upload-list").empty();
              }, 5000);
              oss.makeSortable();
              oss.params.imageOrdering = jQuerOs(container + " .existing-images").sortable('toArray', {attribute: 'data-sortable-id'});
              oss.sortSliderImages(oss.params.imageOrdering);
              oss.makeClickFunction(oss.params.moduleId);
              oss.resetSlider();

              image_copy_id = false;
            }
          }
        }
    });

  }
  //end

  oss.makeClickFunction = function (modId){
    if(oss.params.debugMode){
      console.log("oss.makeClickFunction",[modId]);
    }


    jQuerOs(container+" .filter-select").unbind('change');
    jQuerOs(container+" .filter-select").change(function(){

      var img_id = jQuerOs(this).attr('data-image-id');
      var filter = jQuerOs(this).val();

      jQuerOs(this).find('option[value!='+filter+']').removeAttr('selected');
      jQuerOs(this).find('option[value='+filter+']').attr('selected','selected');

      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+img_id+"]").removeClass(function(){
        return jQuerOs(this).attr('data-image-filter');
      })

      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+img_id+"]").attr('data-image-filter',filter);
      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+img_id+"]").addClass(filter);

    })


    jQuerOs(container+" .background-input").unbind('change');
    jQuerOs(container+" .background-input").change(function(){

      var img_id = jQuerOs(this).attr('data-image-id');
      var background = jQuerOs(this).val();

      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+img_id+"]").css('backgroundColor',background);
      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+img_id+"]").attr('data-image-background',background);

    })


    // jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+jQuerOs(this).attr("data-text-id")+"']").animateCssTextHover(jQuerOs(this).attr("data-animation"));

    jQuerOs(container+" .delete-current-text").unbind('click')
    jQuerOs(container+" .delete-current-text").click(function(event) {
      oss.deleteCurrentText(this);
    });

    jQuerOs(container+" .edit-current-text").unbind('click')
    jQuerOs(container+" .edit-current-text").click(function(event) {
      oss.findText(jQuerOs(this).parent().attr("data-text-id"),jQuerOs(this).parent().attr("data-image-id"));
    });

    jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").unbind('dblclick')
     // jQuerOs("#os-slider-"+oss.params.moduleId+" .edit-image .slide-text").dblclick(function(event) {
      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").dblclick(function(event) {
      oss.findText(jQuerOs(this).attr("data-text-id"),jQuerOs(this).attr("data-image-id"));
    });


    //animation select function // add animation on slider-active ready
    jQuerOs(container + " .start-slide-animation li").click(function(event) {
      if(jQuerOs(this).hasClass('start-animations-list')){

        //start add animation
        if(jQuerOs(container + " .os-slider-autocomplete-input-anim-slide-start").length
           && oss.params.setupAnimation.start != undefined){
          sel = jQuerOs(container + " .os-slider-autocomplete-input-anim-slide-start");
          oss.params.setupAnimation.start.splice(oss.params.setupAnimation.start.indexOf(jQuerOs(sel).attr("data-animation")), 1);
        }

        oss.params.setupAnimation.start = [];
        oss.params.setupAnimation.start.push(jQuerOs(this).attr("data-animation"));
      }else if(jQuerOs(this).hasClass('os-slider-autocomplete-input-anim-slide-start')){

        oss.params.setupAnimation.start.splice(oss.params.setupAnimation.start.indexOf(jQuerOs(this).attr("data-animation")), 1);
      }
      oss.resetSlider(true);
    });
    //end

    //add animation to the end of prev slide
      jQuerOs(container + " .end-slide-animation li").click(function(event) {
        if(jQuerOs(this).hasClass('end-animations-list')){
          //end add animation
          if(jQuerOs(container + " .os-slider-autocomplete-input-anim-slide-end").length 
            && oss.params.setupAnimation.end != undefined){
            sel = jQuerOs(container + " .os-slider-autocomplete-input-anim-slide-end");
            oss.params.setupAnimation.end.splice(oss.params.setupAnimation.end.indexOf(jQuerOs(sel).attr("data-animation")), 1);
          }
        
          oss.params.setupAnimation.end = [];
          oss.params.setupAnimation.end.push(jQuerOs(this).attr("data-animation"));
        }else if(jQuerOs(this).hasClass('os-slider-autocomplete-input-anim-slide-end')){
          //end drop animation
          oss.params.setupAnimation.end.splice(oss.params.setupAnimation.end.indexOf(jQuerOs(this).attr("data-animation")), 1);
        }
        oss.resetSlider(true);
      });
    //end

    //text start animation select function
      jQuerOs(container + " .start-text-animation li").click(function(event) {

        if(typeof(oss.params.textAnimation['start']) == 'undefined'){
          oss.params.textAnimation['start'] = [];
          oss.params.textAnimation['start'][jQuerOs(this).attr("data-image-id")] = [];
        }

        if(typeof(oss.params.textAnimation['start'][jQuerOs(this).attr("data-image-id")])=='undefined' 
          || !Array.isArray(oss.params.textAnimation['start'][jQuerOs(this).attr("data-image-id")])){
          oss.params.textAnimation['start'][jQuerOs(this).attr("data-image-id")] = [];
        }

        oss.params.textAnimation['start'][jQuerOs(this).attr("data-image-id")][jQuerOs(this).attr("data-text-id")] = jQuerOs(this).attr("data-animation");

        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+jQuerOs(this).attr("data-text-id")+"']").animateCssTextStart(jQuerOs(this).attr("data-animation"));

      });
    //end

    //text end animation select function
      jQuerOs(container + " .end-text-animation li").click(function(event) {

        if(typeof(oss.params.textAnimation['end']) == 'undefined'){
          oss.params.textAnimation['end'] = [];
          oss.params.textAnimation['end'][jQuerOs(this).attr("data-image-id")] = [];
        }

        if(typeof(oss.params.textAnimation['end'][jQuerOs(this).attr("data-image-id")])=='undefined' 
          || !Array.isArray(oss.params.textAnimation['end'][jQuerOs(this).attr("data-image-id")])){
          oss.params.textAnimation['end'][jQuerOs(this).attr("data-image-id")] = [];
        }

        oss.params.textAnimation['end'][jQuerOs(this).attr("data-image-id")][jQuerOs(this).attr("data-text-id")] = jQuerOs(this).attr("data-animation");

        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+jQuerOs(this).attr("data-text-id")+"']").animateCssTextStart(jQuerOs(this).attr("data-animation"));

      });
    //end


    //text permanent animation select function
      jQuerOs(container + " .permanent-text-animation li").click(function(event) {

        if(typeof(oss.params.textAnimation['permanent']) == 'undefined'){
          oss.params.textAnimation['permanent'] = [];
          oss.params.textAnimation['permanent'][jQuerOs(this).attr("data-image-id")] = [];
        }

        if(typeof(oss.params.textAnimation['permanent'][jQuerOs(this).attr("data-image-id")])=='undefined' 
          || !Array.isArray(oss.params.textAnimation['permanent'][jQuerOs(this).attr("data-image-id")])){
          oss.params.textAnimation['permanent'][jQuerOs(this).attr("data-image-id")] = [];
        }

        oss.params.textAnimation['permanent'][jQuerOs(this).attr("data-image-id")][jQuerOs(this).attr("data-text-id")] = jQuerOs(this).attr("data-animation");

        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+jQuerOs(this).attr("data-text-id")+"']").animateCssTextPermanentStart(jQuerOs(this).attr("data-animation"));
        
      });

      //text hover animation select function
      jQuerOs(container + " .hover-text-animation li").click(function(event) {

        if(typeof(oss.params.textAnimation['hover']) == 'undefined'){
          oss.params.textAnimation['hover'] = [];
          oss.params.textAnimation['hover'][jQuerOs(this).attr("data-image-id")] = [];
        }

        if(typeof(oss.params.textAnimation['hover'][jQuerOs(this).attr("data-image-id")])=='undefined' 
          || !Array.isArray(oss.params.textAnimation['hover'][jQuerOs(this).attr("data-image-id")])){
          oss.params.textAnimation['hover'][jQuerOs(this).attr("data-image-id")] = [];
        }

        oss.params.textAnimation['hover'][jQuerOs(this).attr("data-image-id")][jQuerOs(this).attr("data-text-id")] = jQuerOs(this).attr("data-animation");

        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-active .slide-text[data-text-id='"+jQuerOs(this).attr("data-text-id")+"']").animateCssTextHover(jQuerOs(this).attr("data-animation"),false);
        
      });
    //end

    jQuerOs(container+" .copy-current-text").unbind('click')
    jQuerOs(container+" .copy-current-text").click(function(event) {
      event.stopPropagation();
      jQuerOs(this).fadeOut(300,function()
        {
          jQuerOs(this).fadeIn(300);
        });

      oss.copyText(jQuerOs(this).parent().attr("data-text-id"),
                   jQuerOs(this).parent().find(".text-line").text(),
                   jQuerOs(this).parent().attr("data-image-id"));
    });

    jQuerOs(container + " .edit-current-image").unbind('click')
    jQuerOs(container + " .edit-current-image").click(function(event) {

      // event.isPropagationStopped()
      event.stopPropagation();
      oss.imageEdit(jQuerOs(this).parent().find('img'));
    });

    jQuerOs(container + " .delete-current-image").unbind('click')
    jQuerOs(container + " .delete-current-image").click(function(event) {
      event.stopPropagation();
      oss.deleteCurrentImage(jQuerOs(this).parent().find(".slider-image").attr("data-image-id"), modId);
    });
  }

  //click fucntion for all settings input
  oss.initContainerOnClick = function (contId, modId){
    if(oss.params.debugMode){
      console.log("oss.initContainerOnClick",[contId, modId]);
    }
    jQuerOs("#save-settings-"+modId).unbind('click')
    jQuerOs("#save-settings-"+modId).click(function(event) {
      oss.saveSliderSettings(modId);
    });

    jQuerOs(container + " .tab-label").click(function(event) {
      oss.makeCopyright(jQuerOs(this).attr("data-tab-id"));
    });

    jQuerOs(container + " .selected-layout").change(function(event) {
      oss.makeCopyright(oss.params.activeTab);
    });

    jQuerOs(container + " .back-image-edit").click(function(event) {
      oss.addBackgroundToThumbs();
      oss.cancelImgEditor();
    });

    jQuerOs(container + " .add-image-text").click(function(event) {
      oss.addNewText(this);
    });

    //bch
    jQuerOs(container + " .paste-image-text").click(function(event) {
      
       jQuerOs(this).fadeOut(300,function()
        {
          jQuerOs(this).fadeIn(300);
        });
      oss.pasteText();
    });
    //bch

    jQuerOs(container + " .cancel-text-editor").click(function(event) {
      oss.cancelTextEditor(this);
    });

    jQuerOs(container + " .save-text-editor").click(function(event) {
      oss.saveTextEditor(this);
      oss.setTextAttrValue();
    });

    //simple reset slider
    jQuerOs(container + " .easy-reset").click(function(event) {
      oss.params.resetSpeed = false;
      oss.resetSlider();
      oss.resizeSlider()
    });

    //simple reset slider
    jQuerOs(container + " .animate-reset").click(function(event) {
      oss.resetSlider();
      oss.resizeSlider()
    });

    //simple input reset
    jQuerOs(container + " .easy-input-reset").on('input', function (e) {
      oss.params.resetSpeed = false;
      oss.resetSlider();
      oss.resizeSlider()
    });

    //hard reset slider
    jQuerOs(container + " .hard-reset").click(function(event) {

      if(jQuerOs(container + " .direction:checked").val() == 'vertical'){

        oss.params.slidesPerColumn = 1;
        jQuerOs("#slidesPerColumn-" + oss.params.moduleId).closest('.option-block').hide();

      }else{

        jQuerOs("#slidesPerColumn-" + oss.params.moduleId).closest('.option-block').show();
        oss.params.slidesPerColumn = jQuerOs("#slidesPerColumn-" + oss.params.moduleId).val();

      }

      oss.params.resetSpeed = false;
      oss.resetSlider(true);
      oss.resizeSlider()

    });

    //hard input reset
    jQuerOs(container + " .hard-input-reset").on('input', function (e) {
      oss.params.resetSpeed = false;

      if(jQuerOs("#slidesPerView-" + oss.params.moduleId).val() == '')
        jQuerOs("#slidesPerView-" + oss.params.moduleId).val(1)
      
      if(jQuerOs("#spaceBetween-" + oss.params.moduleId).val() == '')
        jQuerOs("#spaceBetween-" + oss.params.moduleId).val(0)
      
      oss.resetSlider(true)
      oss.resizeSlider()
    });

    //hard change reset slider
    jQuerOs(container + " .hard-change-reset").change(function(event) {

      if(jQuerOs(this).hasClass('slider-effect')){
        oss.params.resetSpeed = true;
      }else{
        oss.params.resetSpeed = false;
      }

      oss.resetSlider(true);
      oss.resizeSlider()

    });

    jQuerOs(container + " .reset-settings-button").click(function(event) {
      if(confirm('All settings will be set to default.You confirm reset?')){
        oss.resetSliderSettings();
      };
    });

    jQuerOs(container + " .editing-text").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').html(jQuerOs(this).val());
      jQuerOs('#os-slider-'+modId+' .text-active').attr("data-text-body", window.JSON.stringify(jQuerOs(this).val()));
      //oss.textDraggable();
    });

    jQuerOs(container + " .text-font-size").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').css('font-size',oss.toPx(jQuerOs(this).val())+'px')
                                                // .css('line-height','100%')
                                                // .css('height','auto')
                                                .addClass('not-saved');
    });

    jQuerOs(container + " .text-padding-top").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').css('padding-top',oss.toPx(jQuerOs(this).val())+'px')
                                                .addClass('not-saved');
    });

    jQuerOs(container + " .text-padding-right").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').css('padding-right',oss.toPx(jQuerOs(this).val())+'px')
                                                .addClass('not-saved');
    });

    jQuerOs(container + " .text-padding-bottom").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').css('padding-bottom',oss.toPx(jQuerOs(this).val())+'px')
                                                .addClass('not-saved');
    });

    jQuerOs(container + " .text-padding-left").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').css('padding-left',oss.toPx(jQuerOs(this).val())+'px')
                                                .addClass('not-saved');
    });

    jQuerOs(container + " .text-font-weight-select").change(function(event) {
      jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css("font-weight",this.value);
    });

    jQuerOs(container + " .text-align-select").change(function(event) {
      jQuerOs("#os-slider-"+oss.params.moduleId+" .text-active").css("text-align", this.value);
    });

    //text shadow apply style start
    jQuerOs(container + " .text-h-shadow").on('input', function (e) {
      var text_h_shadow = oss.toPx(jQuerOs(this).val())+'px';
      var text_v_shadow = oss.toPx(jQuerOs(this).closest('#tab-text-content2-'+modId).find('.text-v-shadow').val())+'px';
      var text_blur_radius = oss.toPx(jQuerOs(this).closest('#tab-text-content2-'+modId).find('.text-blur-radius').val())+'px';
      var text_shadow_colorpicker = jQuerOs(this).closest('#tab-text-content2-'+modId).find('.text-shadow-colorpicker').val();

      jQuerOs('#os-slider-'+modId+' .text-active').css('text-shadow',text_shadow_colorpicker+" "+
                                                                      text_h_shadow+" "+
                                                                      text_v_shadow+" "+
                                                                      text_blur_radius)
                                                                      .addClass('not-saved');
    });

    jQuerOs(container + " .text-v-shadow").on('input', function (e) {
      var text_h_shadow = oss.toPx(jQuerOs(this).closest('#tab-text-content2-'+modId).find('.text-h-shadow').val())+'px';
      var text_v_shadow = oss.toPx(jQuerOs(this).val())+'px';
      var text_blur_radius = oss.toPx(jQuerOs(this).closest('#tab-text-content2-'+modId).find('.text-blur-radius').val())+'px';
      var text_shadow_colorpicker = jQuerOs(this).closest('#tab-text-content2-'+modId).find('.text-shadow-colorpicker').val();

      jQuerOs('#os-slider-'+modId+' .text-active').css('text-shadow',text_shadow_colorpicker+" "+
                                                                      text_h_shadow+" "+
                                                                      text_v_shadow+" "+
                                                                      text_blur_radius)
                                                                      .addClass('not-saved');
    });


    jQuerOs(container + " .text-blur-radius").on('input', function (e) {
      var text_h_shadow = oss.toPx(jQuerOs(this).closest('#tab-text-content2-'+modId).find('.text-h-shadow').val())+'px';
      var text_v_shadow = oss.toPx(jQuerOs(this).closest('#tab-text-content2-'+modId).find('.text-v-shadow').val())+'px';
      var text_blur_radius = oss.toPx(jQuerOs(this).val())+'px';
      var text_shadow_colorpicker = jQuerOs(this).closest('#tab-text-content2-'+modId).find('.text-shadow-colorpicker').val();
      jQuerOs('#os-slider-'+modId+' .text-active').css('text-shadow',text_shadow_colorpicker+" "+
                                                                      text_h_shadow+" "+
                                                                      text_v_shadow+" "+
                                                                      text_blur_radius)
                                                                      .addClass('not-saved');
    });

    //text shadow apply style end

    jQuerOs(container + " .text-block-width").on('input', function (e) {
      curW = (jQuerOs(this).val()>0)?jQuerOs(this).val()+'%':'auto';
      jQuerOs('#os-slider-'+modId+' .text-active').css('width',curW)
                                                .attr('data-text-width',jQuerOs(this).val())
                                                .addClass('not-saved');
    });

    jQuerOs(container + " .text-borer-width").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').css('border-width',oss.toPx(jQuerOs(this).val())+'px')
      .addClass('not-saved');
    });

    jQuerOs(container + " .text-custom-class").on('input', function (e) {

      var currentCustClass = jQuerOs('#os-slider-'+modId+' .text-active').attr('data-custom-class');
      if(currentCustClass) jQuerOs('#os-slider-'+modId+' .text-active').removeClass(currentCustClass);

      jQuerOs('#os-slider-'+modId+' .text-active').attr('data-custom-class',jQuerOs(this).val())
      .addClass('not-saved');

      jQuerOs('#os-slider-'+modId+' .text-active').addClass(jQuerOs(this).val())

    });

    jQuerOs(container + " .text-borer-radius").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').css('border-radius',oss.toPx(jQuerOs(this).val())+'px')
      .addClass('not-saved');
    });


    jQuerOs(container + " .text-time-start-input").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').attr('data-text-start-time',jQuerOs(this).val())
      .addClass('not-saved');
    });

    jQuerOs(container + " .text-time-end-input").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').attr('data-text-end-time',jQuerOs(this).val())
      .addClass('not-saved');
    });

    jQuerOs(container + " .permanent-time-start-input").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').attr('data-permanent-start-time',jQuerOs(this).val())
      .addClass('not-saved');
    });

    jQuerOs(container + " .permanent-time-end-input").on('input', function (e) {
      jQuerOs('#os-slider-'+modId+' .text-active').attr('data-permanent-end-time',jQuerOs(this).val())
      .addClass('not-saved');
    });


    jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").each(function(index, el) {
      jQuerOs(this).attr("data-image-id",jQuerOs(this).parents(".swiper-slide").attr("data-image-id"));
    });


    //init for free
    jQuerOs('.oss-pro-avaible').prop('disabled', 'disabled');
    jQuerOs('.oss-pro-avaible *').prop('disabled', 'disabled');
    if(!jQuerOs(".ordasoft-copyright").length){
      jQuerOs("#os-slider-"+oss.params.moduleId).parent().append('<div class="ordasoft-copyright"><a href="http://ordasoft.com" style="font-size: 10px;">Nice try! But you still fail!</br>Powered by OrdaSoft!</a></div>');
    }
    //init for free
    
  }
  //end

  oss.preventDraggable = function (){
    if(oss.params.debugMode){
      console.log("oss.preventDraggable",['without arguments']);
    }
    jQuerOs(container).draggable();
      jQuerOs(container+" .slider-image,"+
            container + " .animation-manager-block,"+container+" input,"+container+" label,"+
            container +" .minicolors-panel").hover(function() {
        jQuerOs(container).draggable('disable');
      }, function() {
        jQuerOs(container).draggable('enable');
      });
  }

  oss.enableParalax = function (){
    if(oss.params.debugMode){
      console.log("oss.enableParalax",['without arguments']);
    }
    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide .slide-image").each(function(index, el) {
      //add paralax bg
      oss.params.parallaxImg.push([jQuerOs(el).attr("src"),jQuerOs(el).attr("alt"),jQuerOs(el).attr("data-image-id")]);
      if(!jQuerOs("#os-slider-"+oss.params.moduleId+" .parallax-bg").length){
        parallaxBg = '<div '+
                        'class="parallax-bg" '+
                        'style="background-image:url('+jQuerOs(el).attr("src")+')" '+
                        'data-swiper-parallax="-23%"'+
                        'data-image-id="'+jQuerOs(el).attr("data-image-id")+'">'+
                      '</div>';
        jQuerOs("#os-slider-"+oss.params.moduleId).prepend(parallaxBg);
      }
      //end
      jQuerOs(el).unwrap("#os-slider-"+oss.params.moduleId+" .swiper-slide");
      jQuerOs(el).remove();
    });
    jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").each(function(index, el) {
      jQuerOs(el).wrap('<div class="swiper-slide" data-image-id="'+jQuerOs(el).attr("data-image-id")+'"></div>');
    });
    oss.sortSliderImages(oss.params.imageOrdering);
  }

  oss.compareReversed = function (a, b) {
    return b - a;
  }

  oss.disableParalax = function (){
    if(oss.params.debugMode){
      console.log("oss.disableParalax",['without arguments']);
    }
    jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").each(function(index, el) {
      jQuerOs(el).unwrap("#os-slider-"+oss.params.moduleId+" .swiper-slide");
    });
    oss.params.parallaxImg.sort(oss.compareReversed);
    jQuerOs(oss.params.parallaxImg).each(function(index, img) {
      var imgHtml = '<div class="swiper-slide" data-image-id="'+img[2]+'">'+
                      '<img  class="slide-image" src="'+img[0]+'" alt="'+img[1]+'" data-image-id="'+img[2]+'">'+
                    '</div>';
      jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-wrapper").prepend(imgHtml);
      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text[data-image-id="+img[2]+"]").each(function(index, text){
        jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide[data-image-id="+img[2]+"]").prepend(text);
      });
    });
    jQuerOs("#os-slider-"+oss.params.moduleId+" .parallax-bg").remove();
    oss.params.parallaxImg = [];
    oss.sortSliderImages(oss.params.imageOrdering);
  }

  oss.timer = function (timeout) {
      var self = this;
      this.interval = timeout ? timeout : 1000;   // Default
      this.time = 0;
      this.run = function (runnable) {
          this.timer = setInterval(function () {
            self.time += self.interval;
            runnable(self); 
         }, this.interval);
      };

      this.stop = function () {
          clearTimeout(this.timer);
          this.time = 0;
      };
  }

  oss.makeNextPrevClickable = function(){

    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-next").on('click', function(e) {
      if(oss.params.debugMode){
        console.log("oss.onNextClick",[oss.params.swiperSlider]);
      }      

        oss.params.timer.stop();
        oss.params.swiperSlider.navigation.onNextClick(e);

    });

    jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-button-prev").on('click', function(e) {

      oss.params.timer.stop();
      oss.params.swiperSlider.navigation.onPrevClick(e);

    });

  }

  //initialize function
  oss.init = function (){
    if(oss.params.debugMode){
      console.log("oss.init",['without arguments']);
    }
    
    // add animate//included before
    jQuerOs.fn.extend({
      // animateCssSlide: function (animationName, hide) {
      //     var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      //     jQuerOs("#os-slider-"+oss.params.moduleId+" .swiper-slide-prev").fadeTo(0, 1);
      //     jQuerOs(this).addClass('animated ' + animationName).one(animationEnd, function() {
      //       jQuerOs(this).removeClass('animated ' + animationName);
      //     });
      // },

      animateCssSlide: function (animationName, hide) {
    
        if(oss.params.debugMode){
          console.log("animateCssSlide");
        }

        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        jQuerOs(this).parents(".swiper-container").find(".swiper-slide-prev img").show();
        jQuerOs(this).parents(".swiper-container").find(" .swiper-slide-next img").show();
        jQuerOs(this).parents(".swiper-container").find(" .swiper-slide-active img").show();
        jQuerOs(this).parents(".swiper-container").find(" .swiper-slide-prev").fadeTo(0, 1);
        jQuerOs(this).addClass('animated ' + animationName).one(animationEnd, function() {
          jQuerOs(this).removeClass('animated ' + animationName);
          jQuerOs(this).parents(".swiper-container").find(" .swiper-slide-prev img").hide();
          jQuerOs(this).parents(".swiper-container").find(" .swiper-slide-next img").hide();
        });
      },

      animateCssTextStart: function (animationName, hide) {
        if(oss.params.debugMode){
          console.log("animateCssTextStart");
        }

        jQuerOs(this).css("opacity",1);
        var animationTextStart = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        jQuerOs(this).removeClass('infinite');
        jQuerOs(this).removeClass('animated');
        jQuerOs(this).removeClass(jQuerOs(this).attr('data-permanent-effect'));

        jQuerOs(this).addClass('animated ' + animationName).one(animationTextStart, function() {
          jQuerOs(this).removeClass('animated');
          jQuerOs(this).removeClass(animationName);
           
           if(jQuerOs(this).parent('div').hasClass('edit-image')) return;
           jQuerOs(this).addClass('infinite animated ' + jQuerOs(this).attr('data-permanent-effect'));
        }); 
      },

      animateCssTextEnd: function (animationName, hide) {
        if(oss.params.debugMode){
          console.log("animateCssTextEnd");
        }

        var animationTextEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        jQuerOs(this).removeClass('infinite');
        jQuerOs(this).removeClass('animated');
        jQuerOs(this).removeClass(jQuerOs(this).attr('data-permanent-effect'));

        jQuerOs(this).addClass('animated ' + animationName).one(animationTextEnd, function() {
          jQuerOs(this).removeClass('animated');
          jQuerOs(this).removeClass(animationName);
          jQuerOs(this).css("opacity",0);
          jQuerOs(this).addClass('infinite animated ' + jQuerOs(this).attr('data-permanent-effect'));
        });
      },

      animateCssTextPermanentStart: function (animationName, hide) {
        if(oss.params.debugMode){
          console.log("animateCssTextPermanentStart");
        }

        var animationTextPermanent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        jQuerOs(this).removeClass('infinite');
        jQuerOs(this).removeClass('animated');
        jQuerOs(this).removeClass(jQuerOs(this).attr('data-permanent-effect'));
        jQuerOs(this).attr('data-permanent-effect',animationName);

        jQuerOs(this).addClass('infinite animated ' + animationName).one(animationTextPermanent, function() {
          
        });

      },

      animateCssTextPermanentEnd: function (animationName, hide) {
        if(oss.params.debugMode){
          console.log("animateCssTextPermanentEnd");
        }

        var animationTextPermanent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        jQuerOs(this).removeClass('infinite');
        jQuerOs(this).removeClass('animated');
        jQuerOs(this).removeClass(jQuerOs(this).attr('data-permanent-effect'));
        jQuerOs(this).removeAttr('data-permanent-effect');
      },

      animateCssTextHover: function (animationName, hide) {
        if(oss.params.debugMode){
          console.log("animateCssTextHover");
        }

        var animationTextHover = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        jQuerOs(this).removeClass('infinite');
        jQuerOs(this).removeClass('animated');
        jQuerOs(this).removeClass(jQuerOs(this).attr('data-permanent-effect'));
        // jQuerOs(this).attr('hover-effect',animationName);
        jQuerOs(this).addClass('animated ' + animationName).one(animationTextHover, function() {
          jQuerOs(this).removeClass('animated ' + animationName);

          if(hide && jQuerOs(this).attr('data-permanent-effect')){
            jQuerOs(this).addClass('infinite animated ' + jQuerOs(this).attr('data-permanent-effect'));
          }
        });
      }

    });

    oss.params.timer = new oss.timer(100);

    oss.autocompleteAnimateSelect();
    oss.autocompleteSlideAnimateSelect();

    oss.autocompleteFontSelect();
    oss.initContainerOnClick(container, oss.params.moduleId);
    oss.makeClickFunction(oss.params.moduleId);

    //draggable init for settings block
    oss.preventDraggable();
    //end

    //init show/hide button on slider
    jQuerOs("#show-settings-" + oss.params.moduleId).click(function(event) {

      if(oss.params.parallax){
        if(jQuerOs("#dragable-settings-block"+oss.params.moduleId+":visible").length){
          oss.enableParalax();
          oss.resetSlider(true);
        }else{
          oss.disableParalax();
          oss.resetSlider(true);
        }
      }
        jQuerOs("#os-slider-"+oss.params.moduleId).mouseover(function(event) {
          jQuerOs("#os-show-settings-button-" + oss.params.moduleId).hide();
        });

      jQuerOs(container).show('slow');
      oss.makeCopyright(oss.params.activeTab);

    });
    //end

  

    if(localStorage.getItem('afterImport') 
      || oss.params.version == 0){
      oss.setTextAttrValue();     
    }

    //check isNew version after new resize
    if(oss.params.version == 0) oss.setTextAttrValue();

    oss.changeStyle();
    oss.makeTextColorpicker();
    oss.loadNededFonts();
    oss.resizeSlider();
    oss.params.swiperSlider.update(true);
    oss.makeSortable();
    oss.currentTextOrderId();
    oss.makeImgTextSortable();
    oss.makeNextPrevClickable();

    String.prototype.replaceAll = function (replaceThis, withThis) {
       var re = new RegExp(replaceThis,"g"); 
       return this.replace(re, withThis);
    };

    jQuerOs(window).resize(function(event) {
      oss.resetSlider()
      oss.resizeSlider();
    });

    window.addEventListener("orientationchange", function() {
      oss.resetSlider()
      oss.resizeSlider();
    }, false);

    jQuerOs(window).load(function() {

      if(oss.params.debugMode){
        console.log("oss.init",['without arguments']);
      }
      //string below fix some wrong classes in text ufter save animation
      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").attr("class","").addClass('slide-text');
      /*maybe bug with reset slider on init.*/
      oss.resetSlider(true);
      oss.resizeSlider();
      /*end*/
      jQuerOs("#os-slider-"+oss.params.moduleId+" .slide-text").fadeTo(0,0);
      jQuerOs("#os-slider-"+oss.params.moduleId+" .slider-load-background").remove();

      oss.stopSlider();

      oss.setTextAttrValue();

      if(localStorage.getItem('afterImport')){
      // oss.setTextAttrValue();
        oss.saveSliderSettings();
        localStorage.removeItem('afterImport');
        location.reload(true);
      }

      oss.makeCustomSlideColorpicker();

      oss.addBackgroundToThumbs();

    }); //end  jQuerOs(window).load(function() {

    oss.makeCopyright(oss.params.activeTab);
  }


  oss.init();

  ///parallax
  if(oss.params.parallax){
    oss.enableParalax();
    oss.resetSlider(true);
  }
    //end
    // Return settings instance
    return oss;
  }

  window.osSliderSettings = osSliderSettings;

})();
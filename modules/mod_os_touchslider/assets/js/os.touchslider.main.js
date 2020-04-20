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

  var osSliderMain = function (container, params) {
    if (!(this instanceof osSliderMain)) return new osSliderMain(container, params);

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

    // if(!localStorage.getItem('afterImport')){
    //   localStorage.clear();  
    //   image_copy_id='';
    // }
    
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

    oss.resetSlider = function (reinit){

      if(oss.params.debugMode){
        console.log("oss.resetSlider",[reinit]);
      }
      oss.changeStyle();



      if(parseInt(jQuerOs(container + " .pagination:checked").val()) 
         && jQuerOs(container + " .paginationType:checked").val() == 'progress'){
          jQuerOs("#os-slider-"+oss.params.moduleId + " .swiper-pagination").removeClass("swiper-pagination-bullets swiper-pagination-fraction");
      }else if(parseInt(jQuerOs(container + " .pagination:checked").val()) 
               && jQuerOs(container + " .paginationType:checked").val() == 'fraction'){
        jQuerOs("#os-slider-"+oss.params.moduleId + " .swiper-pagination").removeClass("swiper-pagination-bullets swiper-pagination-progress");
      }else{
        jQuerOs("#os-slider-"+oss.params.moduleId + " .swiper-pagination").removeClass("swiper-pagination-fraction swiper-pagination-progress");
      }



      //oss.makeCopyright(oss.params.activeTab);

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
        // oss.params.swiperSlider.params = params;
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

      //oss.makeCustomSlideColorpicker();

      return params;
    }





  
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


  
  
  
  oss.showHideArrows = function (){

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
      console.log("oss.reinitSlider",[params, setupAnimation]);
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
            console.log("oss.transitionStart2");
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
    //oss.sortSliderImages(oss.params.imageOrdering);
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
    //oss.sortSliderImages(oss.params.imageOrdering);
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
        var animationTextPermanent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        jQuerOs(this).removeClass('infinite');
        jQuerOs(this).removeClass('animated');
        jQuerOs(this).removeClass(jQuerOs(this).attr('data-permanent-effect'));
        jQuerOs(this).attr('data-permanent-effect',animationName);

        jQuerOs(this).addClass('infinite animated ' + animationName).one(animationTextPermanent, function() {
          
        });

      },

      animateCssTextPermanentEnd: function (animationName, hide) {
        var animationTextPermanent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        jQuerOs(this).removeClass('infinite');
        jQuerOs(this).removeClass('animated');
        jQuerOs(this).removeClass(jQuerOs(this).attr('data-permanent-effect'));
        jQuerOs(this).removeAttr('data-permanent-effect');
      },

      animateCssTextHover: function (animationName, hide) {
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

    //oss.autocompleteAnimateSelect();
    //oss.autocompleteSlideAnimateSelect();

    //oss.autocompleteFontSelect();
    //oss.initContainerOnClick(container, oss.params.moduleId);
    //oss.makeClickFunction(oss.params.moduleId);

    //draggable init for settings block
    //oss.preventDraggable();
    //end

  

    // if(localStorage.getItem('afterImport') 
    //   || oss.params.version == 0){
    //   oss.setTextAttrValue();     
    // }

    //check isNew version after new resize
    //if(oss.params.version == 0) oss.setTextAttrValue();

    oss.changeStyle();
    //oss.makeTextColorpicker();
    //oss.loadNededFonts();
    oss.resizeSlider();
    oss.params.swiperSlider.update(true);
    //oss.makeSortable();
    //oss.currentTextOrderId();
    //oss.makeImgTextSortable();
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

      //oss.setTextAttrValue();

      if(localStorage.getItem('afterImport')){
      // oss.setTextAttrValue();
        oss.saveSliderSettings();
        localStorage.removeItem('afterImport');
        location.reload(true);
      }

      //oss.makeCustomSlideColorpicker();

      oss.addBackgroundToThumbs();

    }); //jQuerOs(window).load

    //oss.makeCopyright(oss.params.activeTab);
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

  window.osSliderMain = osSliderMain;

})();
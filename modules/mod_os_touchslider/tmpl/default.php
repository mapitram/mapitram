<?php
/**
* @package OS Touch Slider.
* @copyright 2020 OrdaSoft.
* @author 2020 Andrey Kvasnevskiy(akbet@mail.ru),Roman Akoev(akoevroman@gmail.com).
* @link http://ordasoft.com/os-touch-slider-joomla-responsive-slideshow
* @license GNU General Public License version 2 or later;
* @description OrdaSoft Responsive Touch Slider.
*/
defined('_JEXEC') or die;

 $object_fit = $params->get('object_fit',0);
 if($object_fit == 1 ) {
?>

<style>   #os-slider-<?php echo $module->id;?> img.slide-image {     object-fit: cover;   } </style>

<?php
 } else if($object_fit == 2 ) {
?>

<style>   #os-slider-<?php echo $module->id;?> img.slide-image {     object-fit: contain;   } </style>

<?php
 } else if($object_fit == 0 ) {
?>

<style>  #os-slider-<?php echo $module->id;?> img.slide-image {  object-fit: fill;  } </style>

<?php
 }


?>



<div class="os-slider-container <?php echo $suffix?>">
  <!-- Slider main container -->
  <div id="os-slider-<?php echo $module->id;?>" class="swiper-container" <?php echo $params->get('rtl',0)?'dir="rtl"':''?>>
    <div class="slider-load-background">
      <div class="os-slider-spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
     <?php 
     // Comment out, to get a demo version
      if(JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id)){
      ?>
      <!-- Slider Settings Buttons-->
      <span id="os-show-settings-button-<?php echo $module->id?>">
        <a id="show-settings-<?php echo $module->id?>" type="button" aria-invalid="false"><i class="fa os_icon-pencil-squared" aria-hidden="true"></i></a>
        <span id="message-block-<?php echo $module->id;?>"></span>
      </span>
      <!-- end Slider Settings Buttons-->
    <?php 
    // Comment out, to get a demo version
    } 
    ?>
    <noscript>
        Javascript is required to use TouchSlider 
        <a href="http://ordasoft.com/os-touch-slider-joomla-slideshow-module">TouchSlider - Joomla slideshow content slider </a>, 

        <a href="http://ordasoft.com/os-touch-slider-joomla-slideshow-module">TouchSlider - Joomla slider module for created animated slide </a>
    </noscript>

    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        <?php

        $imageLink = $params->get("imageLink", array());
        $imageFilter = $params->get("imageFilter", array());
        $imageBackground = $params->get("imageBackground", array());

        if(!empty($images)){
          foreach ($images as $image) { 

            $filter_name =  isset( $imageFilter->{$image->id} ) ? $imageFilter->{$image->id} : '';
            $background_name = isset($imageBackground->{$image->id}) ? $imageBackground->{$image->id} : '';
            ?>
              
            <div class="swiper-slide <?php echo $filter_name ?>" data-image-filter="<?php echo $filter_name ?>" data-image-id="<?php echo $image->id; ?>" style="background-color: <?php $background_name ?>" data-image-background="<?php echo $background_name ?>">
              <?php
              if($params->get("lazy",0)){ 
                if(  is_object($imageLink)  && "" !== trim($imageLink->{$image->id})  ){
                ?>
                  <a class="slide-image-link" href="<?php echo $imageLink->{$image->id} ;?>"><img class="swiper-lazy slide-image" data-src="<?php echo $image->image_path?>" data-image-id="<?php echo $image->id; ?>"></a>
                  <?php
                }else{
                ?>
                  <img class="swiper-lazy slide-image" data-src="<?php echo $image->image_path?>" data-image-id="<?php echo $image->id; ?>">
                <?php
                }
                ?>

                <!-div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div->
                <div class="os-slider-spinner swiper-lazy-preloader swiper-lazy-preloader-white"">
                  <div class="bounce1"></div>
                  <div class="bounce2"></div>
                  <div class="bounce3"></div>
                </div>

                <?php
              }else{ 
                if(  is_object($imageLink) && "" !== trim($imageLink->{$image->id})  ){
                ?>
                  <a class="slide-image-link" href="<?php echo $imageLink->{$image->id} ;?>"><img  class="slide-image " src="<?php echo $image->image_path?>" alt="<?php echo $image->file_name?>"  data-image-id="<?php echo $image->id; ?>"></a>
                  <?php
                }else{
                ?>
                  <img  class="slide-image " src="<?php echo $image->image_path?>" alt="<?php echo $image->file_name?>"  data-image-id="<?php echo $image->id; ?>">
                <?php
                  
                }
              }
              
              if(isset($sliderText[$image->id])){
                $textArr = $sliderText[$image->id];
                echo urldecode(implode('', $textArr));
              }
              ?>
            </div>

            <?php
          }
        }else{
          // if(!JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id)){
          ?>
          <div class="empty-image">
            <div class="swiper-slide">
              <img class="slide-image" src="<?php echo JURI::root().'/modules/mod_os_touchslider/assets/images/empty_image.png';?>" alt="slider is empty">
            </div>
          </div>
          <?php
          // }
        }
        ?>
    </div>
    <!-- If we need pagination -->
    <div <?php echo $params->get('pagination',1)?'':'style="display:none;"'?> class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->

    <div class="swiper-button-prev"  <?php echo $params->get('prev_next_arrows', 1)?'':'style="display:none;"'?>></div>
    <div class="swiper-button-next"  <?php echo $params->get('prev_next_arrows', 1)?'':'style="display:none;"'?>></div>

    <!-- If we need scrollbar -->
    <div <?php echo $params->get('showScrollbar',0)?'':'style="display:none;"'?> class="swiper-scrollbar"></div>
  </div>
        <div class="ordasoft-copyright"><a href="http://ordasoft.com" style="font-size: 10px;"></a></div>


  <?php


  $width_suffix = $params->get('is_width_in_pixels',1)?'px':'%';
  $height_suffix = $params->get('is_height_in_pixels',1)?'px':'%';

  if($params->get("slidesPerView",1) > 1 && $params->get('is_width_in_pixels',1)){
    //in pixel more than 1 slide
    $height = 'auto';
    $width = $slider_width.'px';
  }else {

    if($params->get('is_width_in_pixels',1)){
      $slider_width = $params->get('width_px',400);
    }else{
      $slider_width = $params->get('width_per',100);
    }
    if($params->get('is_height_in_pixels',1)){
      $slider_height = $params->get('height_px',200);
    }else{
      $slider_height = $params->get('height_per',150);
    }


     $height = $slider_height.$height_suffix;
     $width = $slider_width.$width_suffix;
  }


  ?>
  <style type="text/css" media="screen">
    #os-slider-<?php echo $module->id;?>.swiper-container{
      width: <?php echo $width?>;
      height: <?php echo $height?>;
    }

    #os-slider-<?php echo $module->id;?> .swiper-slide{
      height: <?php echo $height?>;
    }

    #os-slider-<?php echo $module->id;?>.swiper-container img{
      width: 100%;
      height: 100%;
    }
    div[id^="os-slider-<?php echo $module->id;?>"] .parallax-bg {
      background-position: center center;
      background-size: cover;
      left: 0;
      position: absolute;
      top: 0;
      <?php if($params->get('direction', 'horizontal') == 'horizontal'){?>
        width: 130%;
        height: 100%;
      <?php }else{?>
        height: 130%;
        width: 100%;
      <?php }?>
    }
  </style>

<?php
if( JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id) ){
  require JModuleHelper::getLayoutPath('mod_os_touchslider', '_settings');
} else {
  require JModuleHelper::getLayoutPath('mod_os_touchslider', '_main');
}
?>
  <style>
    #dragable-settings-block<?php echo $module->id; ?>{
      z-index: 99999999999!important;
      background-color: grey;
    }
    <?php if($params->get("lazy",0)){?>
      #os-slider-<?php echo $module->id;?>.swiper-container{
        background: ;
      }
    <?php }?>
  </style>
</div>

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
?>
 
  <div id="dragable-settings-block<?php echo $module->id;?>" style="display:none">

    <ul id="os-tabs-<?php echo $module->id?>">
      <li class="slider-settings">

        <div id="tab-content1-<?php echo $module->id?>" class="tab-content animated fadeIn">

          <div id="text-content-<?php echo $module->id?>">


            <div class="image-time-block">
              <?php
              if(!empty($images)){
                $imageFullTimes = $params->get("imageFullTime", array());
                foreach ($images as $image) {
                  ?>
                  <span data-image-id="<?php echo $image->id ?>" class="image-full-time" style="display:none;">Image full time, s:<input class="time-input" type="number" name="image_full_time[<?php echo $image->id?>]" min="0" step="0.1" value="<?php echo $imageFullTimes->{$image->id} ;  ?>"></span>
                  <?php
                }
              }?>
            </div>

            <div class="image-link-block">
              <?php
              if(!empty($images)){
                $imageLink = $params->get("imageLink", array());
                foreach ($images as $image) {
                  ?>
                  <span data-image-id="<?php echo $image->id?>" class="image-link" style="display:none;">Image link:<i title="Add link for every whole image or you may add links to every text" class="fa os_icon-info-circled info_block"></i><input class="image-link-input" type="text" name="image-link[<?php echo $image->id?>]"  size="20" maxlength="300"
                  value="<?php if( is_object($imageLink)  && "" !== trim($imageLink->{$image->id})  ){ echo $imageLink->{$image->id} ; }  ?>"></span>
                  <?php
                }
              }?>
            </div>

            <div class="image-background-block">
              <?php

              if(!empty($images)){

                $imageBackground = $params->get("imageBackground", array());

                foreach ($images as $image) {
                  $selected_background = isset($imageBackground->{$image->id}) ? $imageBackground->{$image->id} : 'rgba(255, 255, 255, 1)';
                  ?>
                  <span data-image-id="<?php echo $image->id?>" class="image-background" style="display:none;">Background:<i title="To use, apply a transparency effect to the image or load a transparent image." class="fa os_icon-info-circled info_block"></i><input class="background-input custom_color_slide-<?php echo $module->id?>" data-image-id="<?php echo $image->id?>" type="text" name="image_background[<?php echo $image->id?>]" value="<?php echo $selected_background?>"></span>
                  <?php
                }
              }?>

            </div>
            
            


          </div>
      </li>
      <li class="slider-settings">

                <input id="image_width_px-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_width_px<?php echo $module->id?>" default="400" min="0" step="1" value="<?php echo $params->get("width_px","400")?>"/>

                <input id="image_width_per-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_width_per<?php echo $module->id?>" default="100" min="0" max="100" step="1" value="<?php echo $params->get('width_per',100)?>"/>

                <input id="width-pixel-<?php echo $module->id?>" class="is_width_in_pixels easy-reset" name="is_width_in_pixels<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('is_width_in_pixels',1))?'checked':''?>>
                <input id="width-pixel1-<?php echo $module->id?>" class="is_width_in_pixels easy-reset" name="is_width_in_pixels<?php echo $module->id?>" type="radio" value="0" <?php echo (!$params->get('is_width_in_pixels',1))?'checked':''?>>
                <label for="width-pixel-<?php echo $module->id?>" data-value="px">px</label>
                <label for="width-pixel1-<?php echo $module->id?>" data-value="%">%</label>




                <input id="image_height_px-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_height_px<?php echo $module->id?>" default="200" min="0" step="1" value="<?php echo $params->get("height_px","300")?>"/>

                <input id="image_height_per-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_height_per<?php echo $module->id?>" default="100" min="0" step="1" value="<?php echo $params->get('height_per',100)?>"/>

                <input id="height-pixel-<?php echo $module->id?>" class="is_height_in_pixels easy-reset" name="is_height_in_pixels<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('is_height_in_pixels',1))?'checked':''?>>
                <input id="height-pixel1-<?php echo $module->id?>" class="is_height_in_pixels easy-reset" name="is_height_in_pixels<?php echo $module->id?>" type="radio" value="0" <?php echo (!$params->get('is_height_in_pixels',1))?'checked':''?>>

                <input id="height-auto-<?php echo $module->id?>" class="height-auto easy-reset" name="height_auto<?php echo $module->id?>" type="checkbox" <?php echo ($params->get('height_auto',0))?'checked':''?>>


                <input id="object_fit-<?php echo $module->id?>" class="objectFit easy-reset" name="object_fit<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('object_fit', 0) == 1)?'checked':''?>>
                <input id="object_fit1-<?php echo $module->id?>" class="objectFit easy-reset" name="object_fit<?php echo $module->id?>" type="radio" value="2" <?php echo ($params->get('object_fit', 0) == 2)?'checked':''?>>
                <input id="object_fit2-<?php echo $module->id?>" class="objectFit easy-reset" name="object_fit<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('object_fit', 0) == 0)?'checked':''?>>
                <label class="checken" for="object_fit-<?php echo $module->id?>" data-value="cover">Cover</label>
                <label class="checken" for="object_fit1-<?php echo $module->id?>" data-value="contain">Contain</label>
                <label class="checken" for="object_fit2-<?php echo $module->id?>" data-value="fill">Fill</label>
  



                <input id="crop_image-<?php echo $module->id?>" class="cropImage easy-reset" name="crop_image<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('crop_image', 0) == 1)?'checked':''?>>
                <input id="crop_image1-<?php echo $module->id?>" class="cropImage easy-reset" name="crop_image<?php echo $module->id?>" type="radio" value="2" <?php echo ($params->get('crop_image', 0) == 2)?'checked':''?>>
                <input id="crop_image2-<?php echo $module->id?>" class="cropImage easy-reset" name="crop_image<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('crop_image', 0) == 0)?'checked':''?>>
                <label class="checken" for="crop_image-<?php echo $module->id?>" data-value="yes">yes</label>
                <label class="checken" for="crop_image1-<?php echo $module->id?>" data-value="resize">resize</label>
                <label class="checken" for="crop_image2-<?php echo $module->id?>" data-value="no">no</label>

                <input id="image_width-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_width<?php echo $module->id?>" min="0" step="1" value="<?php echo $image_width?>"/>
                <input id="image_height-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_height<?php echo $module->id?>" min="0" step="1" value="<?php echo $image_height?>"/>

                  <input id="direction-<?php echo $module->id?>" class="direction hard-reset" name="direction<?php echo $module->id?>" type="radio" value="horizontal" <?php echo ($params->get('direction', 'horizontal') == 'horizontal')?'checked':''?>>
                  <input id="direction1-<?php echo $module->id?>" class="direction hard-reset" name="direction<?php echo $module->id?>" type="radio" value="vertical" <?php echo ($params->get('direction', 'horizontal') == 'vertical')?'checked':''?>>

                <input id="initialSlide-<?php echo $module->id?>" class="hard-input-reset" name='initialSlide<?php echo $module->id?>' type="number" value="<?php echo $params->get('initialSlide', 0)?>" min="0" step="1">
                <input id="autoplay-<?php echo $module->id?>" class="hard-input-reset" name='autoplay<?php echo $module->id?>' type="number" value="<?php echo $params->get('autoplay', 3000)?>" min="0" step="500">

                  <input id="autoplayStopOnLast-<?php echo $module->id?>" class="autoplayStopOnLast hard-reset" name="autoplayStopOnLast<?php echo $module->id?>" type="radio" value="1" checked >

                  <input id="autoplayStopOnLast1-<?php echo $module->id?>" class="autoplayStopOnLast hard-reset" name="autoplayStopOnLast<?php echo $module->id?>" type="radio" value="0" >

                  <input id="autoplay_interaction-<?php echo $module->id?>" class="autoplay_interaction hard-reset" name="autoplay_interaction<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('autoplayDisableOnInteraction', false))?'checked':''?>>
                  <input id="autoplay_interaction1-<?php echo $module->id?>" class="autoplay_interaction hard-reset" name="autoplay_interaction<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('autoplayDisableOnInteraction', false))?'':'checked'?>>

                  <input id="prev_next_arrows-<?php echo $module->id?>" class="prev_next_arrows easy-reset" name="prev_next_arrows<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('prev_next_arrows', 1))?'checked':''?>>
                  <input id="prev_next_arrows1-<?php echo $module->id?>" class="prev_next_arrows easy-reset" name="prev_next_arrows<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('prev_next_arrows', 1))?'':'checked'?>>

      </li>
      <li class="slider-settings">
                    <input id="slidesPerView-<?php echo $module->id?>" class="hard-input-reset" name='slidesPerView<?php echo $module->id?>' type="number" value="<?php echo $params->get('slidesPerView', 1)?>" min="1" step="1">
                    <input id="slidesPerColumn-<?php echo $module->id?>" class="hard-input-reset" name='slidesPerColumn<?php echo $module->id?>' type="number" value="<?php echo $params->get('slidesPerColumn', 1)?>" min="1" step="1">
                    <input id="spaceBetween-<?php echo $module->id?>" class="hard-input-reset" name='spaceBetween<?php echo $module->id?>' type="number" value="<?php echo $params->get('spaceBetween', 0)?>" min="0" step="1">
                    <input id="slidesPerColumnFill-<?php echo $module->id?>" class="slidesPerColumnFill hard-reset" name="slidesPerColumnFill<?php echo $module->id?>" type="radio" value="column" <?php echo ($params->get('slidesPerColumnFill', true))?'checked':''?>>
                    <input id="slidesPerColumnFill1-<?php echo $module->id?>" class="slidesPerColumnFill hard-reset" name="slidesPerColumnFill<?php echo $module->id?>" type="radio" value="row" <?php echo ($params->get('slidesPerColumnFill', true))?'':'checked'?>>
                  <input id="slidesPerGroup-<?php echo $module->id?>" class="hard-input-reset" name='slidesPerGroup<?php echo $module->id?>' type="number" value="<?php echo $params->get('slidesPerGroup', 1)?>" min="1" step="1">
                    <input id="centeredSlides-<?php echo $module->id?>" class="centeredSlides hard-reset" name="centeredSlides<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('centeredSlides', false))?'checked':''?>>
                    <input id="centeredSlides1-<?php echo $module->id?>" class="centeredSlides hard-reset" name="centeredSlides<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('centeredSlides', false))?'':'checked'?>>
                <input id="paginationCont-<?php echo $module->id?>" class="pagination hard-reset" name="pagination<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('pagination','.swiper-pagination'))?'checked':''?>>
                <input id="paginationCont1-<?php echo $module->id?>" class="pagination hard-reset" name="pagination<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('pagination', '.swiper-pagination'))?'':'checked'?>>
                  <input id="paginationType-<?php echo $module->id?>" class="paginationType hard-reset" name="paginationType<?php echo $module->id?>" type="radio" value="bullets" <?php echo ($params->get('paginationType', 'bullets') == "bullets")?'checked':''?>>
                  <input id="paginationType1-<?php echo $module->id?>" class="paginationType hard-reset" name="paginationType<?php echo $module->id?>" type="radio" value="fraction" <?php echo ($params->get('paginationType', 'bullets') == "fraction")?'checked':''?>>
                  <input id="paginationType2-<?php echo $module->id?>" class="paginationType hard-reset" name="paginationType<?php echo $module->id?>" type="radio" value="progress" <?php echo ($params->get('paginationType', 'bullets') == "progress")?'checked':''?>>
                    <label class="checken" for="paginationType-<?php echo $module->id?>" data-value="Bullets">Bullets</label>
                    <label class="checken" for="paginationType1-<?php echo $module->id?>" data-value="Fraction">Fraction</label>
                    <label class="checken" for="paginationType2-<?php echo $module->id?>" data-value="Progress">Progress</label>
                  <input id="paginationClickable-<?php echo $module->id?>" class="paginationClickable hard-reset" name="paginationClickable<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('paginationClickable', false))?'checked':''?>>
                  <input id="paginationClickable1-<?php echo $module->id?>" class="paginationClickable hard-reset" name="paginationClickable<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('paginationClickable', false))?'':'checked'?>>
                  <input id="showScrollbar-<?php echo $module->id?>" class="showScrollbar hard-reset" name="showScrollbar<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('showScrollbar', null))?'checked':''?>>
                  <input id="showScrollbar1-<?php echo $module->id?>" class="showScrollbar hard-reset" name="showScrollbar<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('showScrollbar', null))?'':'checked'?>>
                  <input id="scrollbarHide-<?php echo $module->id?>" class="scrollbarHide hard-reset" name="scrollbarHide<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('scrollbarHide', true))?'checked':''?>>
                  <input  id="scrollbarHide1-<?php echo $module->id?>" class="scrollbarHide hard-reset" name="scrollbarHide<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('scrollbarHide', true))?'':'checked'?>>
                  <input id="scrollbarDraggable-<?php echo $module->id?>" class="scrollbarDraggable hard-reset" name="scrollbarDraggable<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('scrollbarDraggable', false))?'checked':''?>>
                  <input id="scrollbarDraggable1-<?php echo $module->id?>" class="scrollbarDraggable hard-reset" name="scrollbarDraggable<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('scrollbarDraggable', false))?'':'checked'?>>
                  <input id="keyboardControl-<?php echo $module->id?>" class="keyboardControl hard-reset" name="keyboardControl<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('keyboardControl', false))?'checked':''?>>
                  <input id="keyboardControl1-<?php echo $module->id?>" class="keyboardControl hard-reset" name="keyboardControl<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('keyboardControl', false))?'':'checked'?>>

                  <input id="mousewheelControl-<?php echo $module->id?>" class="mousewheelControl hard-reset" name="mousewheelControl<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('mousewheelControl', false))?'checked':''?>>
                  <input id="mousewheelControl1-<?php echo $module->id?>" class="mousewheelControl hard-reset" name="mousewheelControl<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('mousewheelControl', false))?'':'checked'?>>

                  <input id="mousewheelReleaseOnEdges-<?php echo $module->id?>" class="mousewheelReleaseOnEdges hard-reset" name="mousewheelReleaseOnEdges<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('mousewheelReleaseOnEdges', false))?'checked':''?>>
                  <input id="mousewheelReleaseOnEdges1-<?php echo $module->id?>" class="mousewheelReleaseOnEdges hard-reset" name="mousewheelReleaseOnEdges<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('mousewheelReleaseOnEdges', false))?'':'checked'?>>
                  <input id="freeMode-<?php echo $module->id?>" class="freeMode hard-reset" name="freeMode<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('freeMode', false))?'checked':''?>>
                  <input id="freeMode1-<?php echo $module->id?>" class="freeMode hard-reset" name="freeMode<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('freeMode', false))?'':'checked'?>>

                  <input id="freeModeMomentum-<?php echo $module->id?>" class="freeModeMomentum hard-reset" name="freeModeMomentum<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('freeModeMomentum', true))?'':''?> checked>
                  <input id="freeModeMomentum1-<?php echo $module->id?>" class="freeModeMomentum hard-reset" name="freeModeMomentum<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('freeModeMomentum', true))?'':''?>>
                <input id="freeModeMomentumRatio-<?php echo $module->id?>" class="hard-input-reset" name='freeModeMomentumRatio<?php echo $module->id?>' type="number" value="<?php echo $params->get('freeModeMomentumRatio', 1)?>" min="0" step="0.5">
                  <input id="freeModeMomentumBounce-<?php echo $module->id?>" class="freeModeMomentumBounce hard-reset" name="freeModeMomentumBounce<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('freeModeMomentumBounce', true))?'':''?> checked>
                  <input id="freeModeMomentumBounce1-<?php echo $module->id?>" class="freeModeMomentumBounce hard-reset" name="freeModeMomentumBounce<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('freeModeMomentumBounce', true))?'':''?>>
                <input id="freeModeMomentumBounceRatio-<?php echo $module->id?>" class="hard-input-reset" name='freeModeMomentumBounceRatio<?php echo $module->id?>' type="number" value="<?php echo $params->get('freeModeMomentumBounceRatio', 1)?>" min="0" step="1">
                <input id="freeModeMinimumVelocity-<?php echo $module->id?>" class="hard-input-reset" name='freeModeMinimumVelocity<?php echo $module->id?>' type="number" value="<?php echo $params->get('freeModeMinimumVelocity', 0.02)?>" min="0" step="0.01">
                  <input id="loop-<?php echo $module->id?>" class="loop hard-reset" name="loop<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('loop', false))?'checked':''?>>
                  <input id="loop1-<?php echo $module->id?>" class="loop hard-reset" name="loop<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('loop', false))?'':'checked'?>>
                  <label class="checken" for="loop-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="loop1-<?php echo $module->id?>" data-value="no">no</label>
                  <input id="lazy-<?php echo $module->id?>" class="lazy easy-reset" name="lazy<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('lazy', 0))?'checked':''?>>
                  <input id="lazy1-<?php echo $module->id?>" class="lazy easy-reset" name="lazy<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('lazy', 0))?'':'checked'?>>
                  <input id="loadPrevNext-<?php echo $module->id?>" class="loadPrevNext easy-reset" name="loadPrevNext<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('loadPrevNext', false))?'checked':''?>>
                  <input id="loadPrevNext1-<?php echo $module->id?>" class="loadPrevNext easy-reset" name="loadPrevNext<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('loadPrevNext', false))?'':'checked'?>>
                  <label class="checken" for="loadPrevNext-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="loadPrevNext1-<?php echo $module->id?>" data-value="no">no</label>
              <input id="loadPrevNextAmount-<?php echo $module->id?>" class="easy-input-reset" type="number" name="loadPrevNextAmount<?php echo $module->id?>" min="1" step="1" value="<?php echo $params->get("loadPrevNextAmount", 1)?>"/>
      </li>
      <li class="slider-settings">
                <input id="speed-<?php echo $module->id?>" class="hard-input-reset" name='speed<?php echo $module->id?>' type="number" value="<?php echo $params->get('speed', 300)?>" min="0" step="100">
                <select class="slider-effect hard-change-reset" name="slider-effect<?php echo $module->id?>">
                  <option <?php echo $params->get("effect","slide")=="slide"?'selected':'';?> value="slide">Slide</option>
                  <option <?php echo $params->get("effect","slide")=="fade"?'selected':'';?> value="fade">Fade</option>
                  <option <?php echo $params->get("effect","slide")=="cube"?'selected':'';?> value="cube">Cube</option>
                  <option <?php echo $params->get("effect","slide")=="coverflow"?'selected':'';?> value="coverflow">Coverflow</option>
                  <option <?php echo $params->get("effect","slide")=="flip"?'selected':'';?> value="flip">Super Flip</option>
                  <option <?php echo $params->get("effect","slide")=="parallax"?'selected':'';?> value="parallax">Parallax</option>
                  <option <?php echo $params->get("effect","slide")=="pulse"?'selected':'';?> value="pulse">Pulse</option>
                  <option <?php echo $params->get("effect","slide")=="fadeIn"?'selected':'';?> value="fadeIn">Fade In</option>
                  <option <?php echo $params->get("effect","slide")=="flip+"?'selected':'';?> value="flip+">Flip</option>
                  <option <?php echo $params->get("effect","slide")=="flipInX"?'selected':'';?> value="flipInX">Flip In X</option>
                  <option <?php echo $params->get("effect","slide")=="flipInY"?'selected':'';?> value="flipInY">Flip In Y</option>
                  <option <?php echo $params->get("effect","slide")=="slideInUp"?'selected':'';?> value="slideInUp">Slide In Up</option>
                  <option <?php echo $params->get("effect","slide")=="bounce"?'selected':'';?> value="bounce">Bounce</option>
                  <option <?php echo $params->get("effect","slide")=="zoomIn"?'selected':'';?> value="zoomIn">Zoom In</option>
                  <option <?php echo $params->get("effect","slide")=="rotateIn"?'selected':'';?> value="rotateIn">Rotate In</option>
                  <option <?php echo $params->get("effect","slide")=="bounceInLeft+swing"?'selected':'';?> value="bounceInLeft+swing">Bounce In Left + Swing</option>
                  <option <?php echo $params->get("effect","slide")=="bounce+pulse"?'selected':'';?> value="bounce+pulse">Bounce + Pulse</option>
                  <option <?php echo $params->get("effect","slide")=="pulse+bounce"?'selected':'';?> value="pulse+bounce">Pulse + Bounce</option>
                  <option <?php echo $params->get("effect","slide")=="fadeInLeftBig+tada"?'selected':'';?> value="fadeInLeftBig+tada">Fade In Left Big + Tada</option>
                  <option <?php echo $params->get("effect","slide")=="fadeInRightBig+swing"?'selected':'';?> value="fadeInRightBig+swing">Fade In Right Big + Swing</option>
                  <option <?php echo $params->get("effect","slide")=="fadeInLeftBig+swing"?'selected':'';?> value="fadeInLeftBig+swing">Fade In Left Big + Swing</option>
                  <option <?php echo $params->get("effect","slide")=="fadeInRightBig+tada"?'selected':'';?> value="fadeInRightBig+tada">Fade In Right Big + Tada</option>
                  <option <?php echo $params->get("effect","slide")=="flip+pulse"?'selected':'';?> value="flip+pulse">Flip + Pulse</option>
                  <option <?php echo $params->get("effect","slide")=="shake+rotateOut"?'selected':'';?> value="shake+rotateOut">Shake + Rotate Out</option>
                  <option <?php echo $params->get("effect","slide")=="slideInUp+hinge"?'selected':'';?> value="slideInUp+hinge">Slide In Up + Hinge</option>
                  <option <?php echo $params->get("effect","slide")=="slideInDown+bounce"?'selected':'';?> value="slideInDown+bounce">Slide In Down + Bounce</option>
                  <option <?php echo $params->get("effect","slide")=="zoomOut+tada"?'selected':'';?> value="zoomOut+tada">Zoom Out + Tada</option>
                  <option <?php echo $params->get("effect","slide")=="rotateIn+tada"?'selected':'';?> value="rotateIn+tada">Rotate In + Tada</option>

                  <option <?php echo $params->get("effect","slide")=="custom"?'selected':'';?> value="custom">Custom</option>
                </select>
                  <input class="os-slider-autocomplete-input-anim-slide-start" type="text" value="">
                  <input class="os-slider-autocomplete-input-anim-slide-end" type="text" value="">
                <input id="slideShadows-<?php echo $module->id?>" class="slideShadows hard-reset" name="slideShadows<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('slideShadows', true))?'':''?> checked>
                <input id="slideShadows1-<?php echo $module->id?>" class="slideShadows hard-reset" name="slideShadows<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('slideShadows', true))?'':''?>>
                <input id="shadow-<?php echo $module->id?>" class="shadow hard-reset" name="shadow<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('shadow', true))?'checked':''?>>
              <input id="shadowOffset-<?php echo $module->id?>" class="hard-input-reset" name='shadowOffset<?php echo $module->id?>' type="number" value="<?php echo $params->get('shadowOffset', 20)?>" min="0" step="1">
              <input id="shadowScale-<?php echo $module->id?>" class="hard-input-reset" name='shadowScale<?php echo $module->id?>' type="number" value="<?php echo $params->get('shadowScale', 0.94)?>" min="0" step="0.01">
              <input id="rotate-<?php echo $module->id?>" class="hard-input-reset" name='rotate<?php echo $module->id?>' type="number" value="<?php echo $params->get('rotate', 50)?>" min="0" step="1">
              <input id="depth-<?php echo $module->id?>" class="hard-input-reset" name='depth<?php echo $module->id?>' type="number" value="<?php echo $params->get('depth', 100)?>" min="0" step="1">
              <input id="modifier-<?php echo $module->id?>" class="hard-input-reset" name='modifier<?php echo $module->id?>' type="number" value="<?php echo $params->get('modifier', 1)?>" min="0" step="1">
                <input id="coverflowSlideShadows-<?php echo $module->id?>" class="coverflowSlideShadows hard-reset" name="coverflowSlideShadows<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('coverflowSlideShadows', true))?'checked':''?>>
                <input id="coverflowSlideShadows1-<?php echo $module->id?>" class="coverflowSlideShadows hard-reset" name="coverflowSlideShadows<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('coverflowSlideShadows', true))?'':'checked'?>>
                <input id="flipSlideShadows-<?php echo $module->id?>" class="flipSlideShadows hard-reset" name="flipSlideShadows<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('flipSlideShadows', true))?'checked':''?>>
                <input id="flipSlideShadows1-<?php echo $module->id?>" class="flipSlideShadows hard-reset" name="flipSlideShadows<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('flipSlideShadows', true))?'':'checked'?>>
                <input id="flipLimitRotation-<?php echo $module->id?>" class="flipLimitRotation hard-reset" name="flipLimitRotation<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('flipLimitRotation', true))?'checked':''?>>
                <input id="flipLimitRotation1-<?php echo $module->id?>" class="flipLimitRotation hard-reset" name="flipLimitRotation<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('flipLimitRotation', true))?'':'checked'?>>
      </li>
    </ul>
  </div>

  <script>


    //jQuerOs(document).ready(function($) {
      var setupAnimation    = <?php echo json_encode($params->get("setupAnimation")) ?> || {};
      var textAnimation    = <?php echo json_encode($params->get("textAnimation")) ?> || {};

      var mySwipeOs = new SwipeOs('#os-slider-<?php echo $module->id;?>', {
        debugMode:                    false,
        parallax:                     <?php echo $parallax; ?>,
        autoplay: {
          delay:                      <?php echo $params->get("autoplay", 0);?>,
          stopOnLastSlide:            <?php echo $params->get("autoplayStopOnLast", 0);?>,
          disableOnInteraction:       <?php echo $params->get("autoplayDisableOnInteraction", 0);?>,
        },
        initialSlide:                 <?php echo $params->get("initialSlide", 0);?>,
        direction:                   '<?php echo $params->get("direction","horizontal");?>',
        setupAnimation:               setupAnimation,
        textAnimation:                textAnimation,
        endAnimationEnable:           true,
        imageFullTime:                <?php echo json_encode($params->get("imageFullTime", array()))?>,
        imageLink:                    <?php echo json_encode($params->get("imageLink", array()))?>,
        imageFilter:                  <?php echo json_encode($params->get("imageFilter", array()))?>,
        imageBackground:              <?php echo json_encode($params->get("imageBackground", array()))?>,
        speed:                        <?php echo $params->get("speed", 300);?>,
<?php 
        if ( $params->get("loop", 0) != 0 ) {
          //fix error with loop and slider
?>
        slidesPerColumn:              1,
        slidesPerView:                1,
        spaceBetween:                 0,
<?php 
        }
        else{
?>
        slidesPerColumn:              <?php echo $params->get("slidesPerColumn", 1);?>,
        slidesPerView:                <?php echo $params->get("slidesPerView", 1);?>,
        spaceBetween:                 <?php echo $params->get("spaceBetween", 0);?>,
<?php 
        } 
?>

        slidesPerColumnFill:         '<?php echo $params->get("slidesPerColumnFill","column");?>',
        slidesPerGroup:               <?php echo $params->get("slidesPerGroup", 1);?>,
        centeredSlides:               <?php echo $params->get("centeredSlides", 0);?>,
        freeMode:                     <?php echo $params->get("freeMode", 0);?>,
        freeModeMomentum:             <?php echo $params->get("freeModeMomentum", 1);?>,
        freeModeMomentumRatio:        <?php echo $params->get("freeModeMomentumRatio", 1);?>,
        freeModeMomentumBounce:       <?php echo $params->get("freeModeMomentumBounce", 1);?>,
        freeModeMomentumBounceRatio:  <?php echo $params->get("freeModeMomentumBounceRatio", 1);?>,
        freeModeMinimumVelocity:      <?php echo $params->get("freeModeMinimumVelocity", 0.02);?>,
        effect:                      '<?php echo $params->get("effect","slide");?>',
        cube: {
          slideShadows:               <?php echo $params->get("slideShadows", 1);?>,
          shadow:                     <?php echo $params->get("shadow", 1);?>,
          shadowOffset:               <?php echo $params->get("shadowOffset", 40);?>,
          shadowScale:                <?php echo $params->get("shadowScale", 0.94);?>
        },
        coverflow: {
          rotate:                     <?php echo $params->get("rotate", 50);?>,
          stretch:                    <?php echo $params->get("stretch", 0);?>,
          depth:                      <?php echo $params->get("depth", 10);?>,
          modifier:                   <?php echo $params->get("modifier", 1);?>,
          slideShadows :              <?php echo $params->get("coverflowSlideShadows", 1);?>
        },
        flip: {
          slideShadows :              <?php echo $params->get("flipSlideShadows", 1);?>,
          limitRotation:              <?php echo $params->get("flipLimitRotation", 1);?>
        },
        pagination:                   '#os-slider-<?php echo $module->id;?> .swiper-pagination',
        paginationType:              '<?php echo $params->get("paginationType","bullets");?>',
        paginationClickable:          <?php echo $params->get("paginationClickable", 1);?>,
        nextButton:                   '',
        prevButton:                   '',
        scrollbar:                   '<?php echo $params->get("showScrollbar", 0)?".swiper-scrollbar":"";?>',
        scrollbarHide:                <?php echo $params->get("scrollbarHide", 1);?>,
        scrollbarDraggable:           <?php echo $params->get("scrollbarDraggable", 0);?>,
        keyboardControl:              <?php echo $params->get("keyboardControl", 0);?>,
        mousewheelControl:            <?php echo $params->get("mousewheelControl", 0);?>,
        mousewheelReleaseOnEdges:     <?php echo $params->get("mousewheelReleaseOnEdges", 0);?>,
        preloadImages:                <?php echo $params->get("lazy", 0)?0:1;?>,

        <?php if($params->get("lazy", 0) == 1 &&  $params->get("loadPrevNext", 1) ){ ?>
        lazy: {
          loadPrevNext :              <?php echo $params->get("loadPrevNext", 1);?>,
          loadPrevNextAmount:         <?php echo $params->get("loadPrevNextAmount", 1);?>
        },
        <?php }else if($params->get("lazy", 0) == 1){ ?>
          lazy:                       true,
        <?php }?>


        slideActiveClass:             'swiper-slide-active',
        onSlideChangeStart: function (swiper) {
          if(setupAnimation){
            setTimeout(function(){
              jQuerOs(setupAnimation.start).each(function(index, animationClass) {
                jQuerOs('#os-slider-<?php echo $module->id;?> .swiper-slide-active').animateCssSlide(animationClass);
              });
            }, 50);
          }
        }
      });

      //initialise Slider Settings block
      var screenW     = (<?php echo $params->get('userScreenWidth',0) ?>)? <?php echo $params->get('userScreenWidth',0)?> : jQuerOs(window).innerWidth();
      var screenH     = (<?php echo $params->get('userScreenHeight',0) ?>)? <?php echo $params->get('userScreenHeight',0)?> : jQuerOs(window).innerHeight();


      var mySliderMain = new osSliderMain("#dragable-settings-block<?php echo $module->id;?>",{
      

        debugMode :                   false,
        crop :                        <?php echo $crop?>,
        parallax :                    <?php echo $parallax; ?>,
        imageWidth:                   <?php echo $image_width?>,
        imageHeight:                  <?php echo $image_height?>,
        imageFullTime:                <?php echo json_encode($params->get("imageFullTime", array()))?>,
        imageLink:                    <?php echo json_encode($params->get("imageLink", array()))?>,
        imageFilter:                  <?php echo json_encode($params->get("imageFilter", array()))?>,
        imageBackground:                  <?php echo json_encode($params->get("imageBackground", array()))?>,
        site_path :                   '<?php echo JURI::base(); ?>',
        moduleId :                    <?php echo $module->id?>,
        lazy :                        <?php echo $params->get("lazy", 0);?>,
        loadPrevNext :                <?php echo $params->get("loadPrevNext", 0);?>,
        loadPrevNextAmount :          <?php echo $params->get("loadPrevNextAmount", 1);?>,
        textOrdering:                 <?php echo $params->get("textOrdering","[]");?>,
        screenW :                     screenW,
        screenH :                     screenH,
        setupAnimation :              setupAnimation,
        textAnimation :               textAnimation,
        swiperSlider :                mySwipeOs,
        ItemId :                      <?php echo $itemId?>,
        isUser : <?php echo (JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id))?'1':'-1' ?>,
        version: <?php echo $params->get('version', 0);?>
      });
      //end
    //})   //end jQuerOs(document).ready ;
  </script>


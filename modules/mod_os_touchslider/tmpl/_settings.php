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
    <div class="button-save">
      <input id="save-settings-<?php echo $module->id?>" type="button" aria-invalid="false" value="Save">
    </div>
    
    <div class="slider-head">
      <h1 class="slider-head-title">
        <a href="http://ordasoft.com/os-touch-slider-joomla-responsive-slideshow">OS Touch Slider</a>
        <a href="<?php echo $updateArticleUrl?>">
          <img class="update-image" src="<?php echo JURI::base()?>modules/mod_os_touchslider/assets/images/<?php echo($avaibleUpdate)?'new-version.png':'current-version.png'?>" title="<?php echo($avaibleUpdate)?'Available new version.':'No available updates.'?>">

        </a>
      </h1>
    </div>


    <ul id="os-tabs-<?php echo $module->id?>">
      <li class="slider-settings">
        <input type="radio" name="tab<?php echo $module->id?>" id="tab1-<?php echo $module->id?>" checked>
        <label data-tab-id="1" class="tab-label" for="tab1-<?php echo $module->id?>">Images<i class="fa os_icon-picture"></i></label>

        <div id="tab-content1-<?php echo $module->id?>" class="tab-content animated fadeIn">
          <div id="images-load-area-<?php echo $module->id?>">


              <script type="text/template" id="qqsl-template-<?php echo $module->id?>">
                  <div class="qqsl-uploader-selector qqsl-uploader">
                      <div class="qqsl-total-progress-bar-container-selector qqsl-total-progress-bar-container">
                          <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qqsl-total-progress-bar-selector qqsl-progress-bar qqsl-total-progress-bar"></div>
                      </div>
                      <div class="qqsl-upload-drop-area-selector qqsl-upload-drop-area" qqsl-hide-dropzone>
                          <span class="qqsl-upload-drop-area-text-selector"></span>
                      </div>
                      <div class="qqsl-upload-button-selector qqsl-upload-button">
                          <div>Upload image</div>
                      </div>
                          <span class="qqsl-drop-processing-selector qqsl-drop-processing">
                              <span>Processing dropped files...</span>
                              <span class="qqsl-drop-processing-spinner-selector qqsl-drop-processing-spinner"></span>
                          </span>
                      <ul class="qqsl-upload-list-selector qqsl-upload-list" aria-live="polite" aria-relevant="additions removals">
                          <li>
                              <div class="qqsl-progress-bar-container-selector">
                                  <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qqsl-progress-bar-selector qqsl-progress-bar"></div>
                              </div>
                              <span class="qqsl-upload-spinner-selector qqsl-upload-spinner"></span>
                              <span class="qqsl-upload-file-selector qqsl-upload-file"></span>
                              <span class="qqsl-edit-filename-icon-selector qqsl-edit-filename-icon" aria-label="Edit filename"></span>
                              <input class="qqsl-edit-filename-selector qqsl-edit-filename" tabindex="0" type="text">
                              <span class="qqsl-upload-size-selector qqsl-upload-size"></span>
                              <button type="button" class="qqsl-btn qqsl-upload-cancel-selector qqsl-upload-cancel">Cancel</button>
                              <button type="button" class="qqsl-btn qqsl-upload-retry-selector qqsl-upload-retry">Retry</button>
                              <button type="button" class="qqsl-btn qqsl-upload-delete-selector qqsl-upload-delete">Delete</button>
                              <span role="status" class="qqsl-upload-status-text-selector qqsl-upload-status-text"></span>
                          </li>
                      </ul>
                      <div class="center">

                      <div class="custom_slide_wrap oss-pro-avaible">
                        <button  class="custom_slide-<?php echo $module->id?>" >Add empty image</button>
                        <input id="custom_img_color-<?php echo $module->id?>" type="hidden" class="custom_color_slide-<?php echo $module->id?>" >
                      </div>

                      <dialog class="qqsl-alert-dialog-selector">
                          <div class="qqsl-dialog-message-selector"></div>
                          <div class="qqsl-dialog-buttons">
                              <button type="button" class="qqsl-cancel-button-selector">Close</button>
                          </div>
                      </dialog>

                      <dialog class="qqsl-confirm-dialog-selector">
                          <div class="qqsl-dialog-message-selector"></div>
                          <div class="qqsl-dialog-buttons">
                              <button type="button" class="qqsl-cancel-button-selector">No</button>
                              <button type="button" class="qqsl-ok-button-selector">Yes</button>
                          </div>
                      </dialog>

                      <dialog class="qqsl-prompt-dialog-selector">
                          <div class="qqsl-dialog-message-selector"></div>
                          <input type="text">
                          <div class="qqsl-dialog-buttons">
                              <button type="button" class="qqsl-cancel-button-selector">Cancel</button>
                              <button type="button" class="qqsl-ok-button-selector">Ok</button>
                          </div>
                      </dialog>
                  </div>
              </script>
              <div id="fine-uploader-<?php echo $module->id?>"></div>
          </div>
          <div id="text-content-<?php echo $module->id?>">
            <div class="text-block add-text">
              <a class="back-image-edit" aria-invalid="false" style="display:none;">Back</a>
              <a class="add-image-text" aria-invalid="false" style="display:none;">Add text</a>
              <a class="paste-image-text oss-pro-avaible" aria-invalid="false" style="display:none;">Paste</a>
              <a class="cancel-text-editor" aria-invalid="false" style="display:none;">Cancel</a>
              <a class="save-text-editor" aria-invalid="false" style="display:none;">Save</a>
            </div>

            <div class="image-time-block">
              <?php
              if(!empty($images)){
                $imageFullTimes = $params->get("imageFullTime", array());
                foreach ($images as $image) {
                  ?>
                  <span data-image-id="<?php echo $image->id ?>" class="image-full-time" style="display:none;">Image full time, s:<input class="time-input" type="number" name="image_full_time[<?php echo $image->id?>]" min="0" step="0.1" value="<?php echo (isset($imageFullTimes->{$image->id}) )? ($imageFullTimes->{$image->id}):"" ;  ?>"></span>
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
            
            <!-- filters -->
            <div class="image-filter-block">
              <?php
            $filters_list = [ 'none'=>'None','blur'=>'Blur','blur1' => 'Blur 1px','blur2' => 'Blur 2px','blur3' => 'Blur 3px','blur5' => 'Blur 5px','blur10' => 'Blur 10px','grayscale'=>'Grayscale','grayscale1'=>'Grayscale 0.1','grayscale2'=>'Grayscale 0.2','grayscale3'=>'Grayscale 0.3','grayscale5'=>'Grayscale 0.5','grayscale7'=>'Grayscale 0.7','grayscale10'=>'Grayscale 1','hue-rotate'=>'Hue rotate','hue-rotate90'=>'Hue rotate 90deg','hue-rotate180'=>'Hue rotate 180deg','hue-rotate270'=>'Hue rotate 270deg','instagram'=>'Instagram filters','_1977'=>'1977','aden'=>'Aden','brannan'=>'Brannan','brooklyn'=>'Brooklyn','clarendon'=>'Clarendon','earlybird'=>'Earlybird','gingham'=>'Gingham','hudson'=>'Hudson',
              'inkwell'=>'Inkwell','kelvin'=>'Kelvin','lark'=>'Lark','lofi'=>'Lo-Fi','maven'=>'Maven',
              'mayfair'=>'Mayfair','moon'=>'Moon','nashville'=>'Nashville','perpetua'=>'Perpetua','reyes'=>'Reyes',
              'rise'=>'Rise', 'slumber'=>'Slumber','stinson'=>'Stinson','toaster'=>'Toaster','valencia'=>'Valencia',
              'walden'=>'Walden','willow'=>'Willow','xpro2'=>'X-pro II','other'=>'Other filters', 'brightness' => 'Brightness','contrast'=>'Contrast','invert'=>'Invert','saturate'=>'Saturate','saturate2'=>'Saturate 2','saturate3'=>'Saturate 3','saturate5'=>'Saturate 5','saturate7'=>'Saturate 7','saturate10'=>'Saturate 10','sepia'=>'Sepia','sepia1'=>'Sepia 0.1','sepia2'=>'Sepia 0.2','sepia3'=>'Sepia 0.3','sepia5'=>'Sepia 0.5','sepia7'=>'Sepia 0.7','sepia10'=>'Sepia 1','opacity' => 'Transparent','opacity0' => 'Opacity 0','opacity1' => 'Opacity 0.1','opacity2' => 'Opacity 0.2','opacity3' => 'Opacity 0.3','opacity5' => 'Opacity 0.5','opacity7' => 'Opacity 0.7','opacity9' => 'Opacity 0.9'];

              // ksort($filters_list);

              if(!empty($images)){
                $imageFilter = $params->get("imageFilter", array());
                foreach ($images as $image) {
                  $selected_filter = isset($imageFilter->{$image->id})  ? $imageFilter->{$image->id} : 'none';
                  ?>
                  <span data-image-id="<?php echo $image->id?>"  class="image-filter" style="display:none;" >Filters:<select data-image-id="<?php echo $image->id?>" class="filter-select" name="image_filter[<?php echo $image->id?>]" >
                      
                      <?php foreach ($filters_list as $value => $text):?>
                          <?php $attribute = '';
                          ?>
                          <?php if($value == $selected_filter) $attribute = 'selected'?>
                          <?php if($value == 'instagram' 
                                || $value == 'other'
                                || $value == 'blur'
                                || $value == 'opacity'
                                || $value == 'hue-rotate'
                                || $value == 'saturate'
                                || $value == 'grayscale'
                                || $value == 'sepia'){
                                    $attribute = 'disabled style="font-weight:bold; color:#3A8BDF; font-style:italic;"';
                                    $text = '-- '.$text.' --';
                                } ?>

                          <?php if($value != 'none'
                                && $value != 'blur3' 
                                && $value != 'grayscale10'
                                && $value != 'hue-rotate180'
                                && $value != 'clarendon'
                                && $value != 'inkwell'
                                && $value != 'toaster'
                                && $value != 'walden'
                                && $value != 'invert'
                                && $value != 'sepia10'
                                && $value != 'opacity0'
                                && $value != 'opacity7'){

                                    $attribute = 'class="oss-pro-avaible" disabled style="font-weight:bold; color:#3A8BDF; font-style:italic;"';
                                    $text = '-- '.$text.' --';
                                } ?>


                          <option <?php echo $attribute ?> value="<?php echo $value ?>"><?php echo $text ?></option>
                      <?php endforeach; ?>
                      
                    </select>
                  </span>

                  <?php
                }
              }?>
            </div>
            <!--/ filters -->

            <div class="text-styling-block" style="display:none;">

              <div class="tab-edit-text">
                <ul id="os-text-tabs-<?php echo $module->id?>">
                  <li class="text-settings">
                    <input type="radio" name="tab-text<?php echo $module->id?>" id="tab-text1-<?php echo $module->id?>" checked>
                    <label id="text-label1-<?php echo $module->id?>" class="text-label" for="tab-text1-<?php echo $module->id?>">Text<i class="fa os_icon-text-width" aria-hidden="true"></i></label>
                    <div id="tab-text-content1-<?php echo $module->id?>" class="tab-text-content animated fadeIn">

                      <div class="text-editor-block" style="display:none;">
                        <textarea class="editing-text" name="editing_text<?php echo $module->id?>" placeholder="Type text here..."></textarea>
                      </div>

                    </div>
                  </li>
                  <li class="text-settings">
                    <input type="radio" name="tab-text<?php echo $module->id?>" id="tab-text2-<?php echo $module->id?>">
                    <label id="text-label2-<?php echo $module->id?>" class="text-label" for="tab-text2-<?php echo $module->id?>">Edit<i class="fa os_icon-pencil" aria-hidden="true"></i></label>
                    <div id="tab-text-content2-<?php echo $module->id?>" class="tab-text-content animated fadeIn">

                      <div class="text-block font-type">
                        <label>Font family:</label>
                        <input class="os-slider-autocomplete-input" type="text" value="">
                        <a class="os-slider-automplete-show-fonts">Font &#x25BC;</a>
                        <ul class="os-slider-autocomplete-avaible-fonts ul-hidden">
                        </ul>
                      </div>

                      <div class="text-block">
                        <label>Font Size, %:</label>
                        <input class="text-font-size" name="text_font_size<?php echo $module->id?>" type="number" min="0.1"  value="14" step="0.1"/>
                      </div>

                      <div class="text-block weight-font">
                        <label>Font weight:</label>
                        <select class="text-font-weight-select" name="text_font_weight_select<?php echo $module->id?>">
                          <option value="normal">normal</option>
                        </select>
                      </div>

                       <div class="text-block align-font  oss-pro-avaible">
                        <label>Text align:</label>
                        <select class="text-align-select" name="text-align-select<?php echo $module->id?>">
                          <option selected="" value="start">inherit</option>
                          <option value="center">center</option>
                          <option value="left">left</option>
                          <option value="right">right</option>
                          <option value="justify">justify</option> 
                        </select>
                      </div>

                      <div class="text-block color-block">
                        <label>Text Color:</label>
                        <input class="text-color-colorpicker input-colorpicker" type="text" data-opacity="1.00" value="" name="text_color_picker<?php echo $module->id?>" size="25">
                      </div>


                      <!-- Shadow start -->
                      <div class="shadow_settings  oss-pro-avaible">
                        <div class="shadow_settings_input">
                          <label>H-Shahow, %:</label>
                          <input class="text-h-shadow" name="text-h-shadow<?php echo $module->id?>" type="number"  step="0.1" value="0" />
                        </div>
                        <div class="shadow_settings_input">
                          <label>V-Shahow, %:</label>
                          <input class="text-v-shadow" name="text-v-shadow<?php echo $module->id?>" type="number"  step="0.1" 
                          value="0" />
                        </div>
                        <div class="shadow_settings_input">
                          <label>Blur-radius, %:</label>
                          <input class="text-blur-radius" name="text-blur-radius<?php echo $module->id?>" type="number"  step="0.1" value="0" />
                        </div>
                      </div>

                      <div class="oss-pro-avaible">
                        <div class="text-block color-block">
                              <label>Text Shadow Color:</label>
                              <input class="text-shadow-colorpicker input-colorpicker" type="text" data-opacity="1.00" value="" name="text_shadow_picker<?php echo $module->id?>" size="25">
                        </div>
                      </div>
                      
                      </br>

                  <!-- Shadow end -->

                    </div>
                  </li>
                  <li class="text-settings">
                    <input type="radio" name="tab-text<?php echo $module->id?>" id="tab-text3-<?php echo $module->id?>">
                    <label id="text-label3-<?php echo $module->id?>" class="text-label oss-pro-avaible" for="tab-text3-<?php echo $module->id?>">Block<i class="fa os_icon-indent-right" aria-hidden="true"></i></label>
                    <div id="tab-text-content3-<?php echo $module->id?>" class="tab-text-content animated fadeIn oss-pro-avaible">

                      <div class="text-block padding-block">
                        <label>Text Padding, %:</label>
                        
                        <div class="css_settings">
                          <div class="settings_input">
                            <label>Top</label>
                            <input class="text-padding-top" type="number" min="0" value="0" name="text_padding_top<?php echo $module->id?>" step="0.1" size="25">
                          </div>
                          <div class="settings_input">
                             <label>Right</label>
                            <input class="text-padding-right" type="number" min="0" value="0" name="text_padding_right<?php echo $module->id?>" step="0.1" size="25">
                          </div>
                          <div class="settings_input">
                             <label>Bottom</label>
                            <input class="text-padding-bottom" type="number" min="0" value="0" name="text_padding_bottom<?php echo $module->id?>" step="0.1" size="25">
                          </div>
                          <div class="settings_input">
                             <label>Left</label>
                            <input class="text-padding-left" type="number" min="0" value="0" name="text_padding_left<?php echo $module->id?>" step="0.1" size="25">
                          </div>
                        </div>
                      </div>

                      <div class="text-block">
                        <label>Text Block Widht, %:</label>
                        <input class="text-block-width" type="number" min="0" max="100" value="0" name="text_block_width<?php echo $module->id?>" size="25">
                      </div>

                      <div class="text-block color-block">
                        <label>Background Color:</label>
                        <input class="text-background-colorpicker input-colorpicker" type="text" data-opacity="1.00" value="" name="text_background_picker<?php echo $module->id?>" size="25">
                      </div>

                      <div class="text-block">
                        <label>Border Width, %:</label>
                        <input class="text-borer-width" step="0.1" type="number" min="0" value="0" name="text_border_width<?php echo $module->id?>" size="25">
                      </div>

                      <div class="text-block">
                        <label>Border Radius, %:</label>
                        <input class="text-borer-radius" type="number" min="0" value="0" name="text_border_radius<?php echo $module->id?>" step='0.1' size="25">
                      </div>

                      <div class="text-block color-block">
                        <label>Border Color:</label>
                        <input class="text-border-colorpicker input-colorpicker" type="text" data-opacity="1.00" value="" name="text_border_picker<?php echo $module->id?>" size="25">
                      </div>

                      <div class="text-block">
                        <label>Custom Class:</label>
                        <input class="text-custom-class" type="text" value="" name="text_custom_class<?php echo $module->id?>" size="25">
                      </div>

                    </div>
                  </li>
                  <li class="text-settings">
                    <input type="radio" name="tab-text<?php echo $module->id?>" id="tab-text4-<?php echo $module->id?>">
                    <label id="text-label4-<?php echo $module->id?>" class="text-label" for="tab-text4-<?php echo $module->id?>">Animation</label>
                    <div id="tab-text-content4-<?php echo $module->id?>" class="tab-text-content animated fadeIn">
                 
                 


                    <div class="text-block anim-type start-text-animation general_animate">
                        <label>Start Animation:</label>
                        <span class="timeLabel">Start: </span>
                        <input class="text-time-start-input" placeholder="start time" type="number" min="0" step="0.1">

                        <input class="os-slider-autocomplete-input-anim-start" placeholder="Select animation" type="text" value="">
                        <a class="os-slider-automplete-show-anim-start">Effect &#x25BC;</a>
                        <ul class="os-slider-autocomplete-avaible-anim-start ul-hidden">
                          <li class="os-slider-autocomplete-anim-start start-animations-list" data-animation="none">none</li>
                        <!-- start animation list -->
                          
                        </ul>
                    </div>
                     <div class="text-block anim-type end-text-animation general_animate">
                        <label>End Animation:</label>
                        <span class="timeLabel">&nbspEnd: </span>
                        <input class="text-time-end-input" placeholder="end time" type="number" min="0" step="0.1">

                        <input class="os-slider-autocomplete-input-anim-end" type="text" placeholder="Select animation" value="">
                        <a class="os-slider-automplete-show-anim-end">Effect &#x25BC;</a>
                        <ul class="os-slider-autocomplete-avaible-anim-end ul-hidden">
                            <li class="os-slider-autocomplete-anim-end end-animations-list" data-animation="none">none</li>
                        <!-- end animation list -->

                        </ul>
                    </div>

                    <div class="text-block anim-type permanent-text-animation">
                        <label>Permanent Animation:</label>
                        <span class="timeLabel">Start: </span><input class="permanent-time-start-input" placeholder="start time" type="number" min="0" step="0.1">
                        <span class="timeLabel">End: </span><input class="permanent-time-end-input" placeholder="end time" type="number" min="0" step="0.1">

                        <input class="os-slider-autocomplete-input-anim-permanent" placeholder="Select animation" type="text" value="">
                        <a class="os-slider-automplete-show-anim-permanent">Effect &#x25BC;</a>
                        <ul class="os-slider-autocomplete-avaible-anim-permanent ul-hidden">
                          <li class="os-slider-autocomplete-anim-permanent permanent-animations-list" data-animation="none">none</li>
                        </ul>
                    </div>

                   

                     <div class="text-block anim-type hover-text-animation">
                        <label>Hover Animation:</label>
                        <input class="os-slider-autocomplete-input-anim-hover" type="text" placeholder="Select animation" value="">
                        <a class="os-slider-automplete-show-anim-hover">Effect &#x25BC;</a>
                        <ul class="os-slider-autocomplete-avaible-anim-hover ul-hidden">
                          <li class="os-slider-autocomplete-anim-hover hover-animations-list" data-animation="none">none</li>
                        </ul>
                    </div>

                    </div>
                  </li>
                </ul>

              </div>
            </div>
            <div class="existing-images">
              <?php
              if(!empty($images)){
                foreach ($images as $image){ ?>
                  <div class="slider-images" data-sortable-id="<?php echo $image->id?>">
                    <div class="slider-image-block">

                      <a class="edit-current-image" aria-invalid="false">
                        <i class="fa os_icon-pencil" aria-hidden="true"></i>
                      </a>

                    
                       <?php if(JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id)){?>
                        <a class="copy-current-image oss-pro-avaible" aria-invalid="false">
                          <i class="fa os_icon-docs" aria-hidden="true"></i>
                        </a>
                      <?php }else{?>
                        <a class="copy-current-image oss-pro-avaible" aria-invalid="false">
                          <i class="fa os_icon-docs" aria-hidden="true"></i>
                        </a>
                      <?php }
                      ?>

                      <?php if(JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id)){?>
                        <a class="replace-current-image oss-pro-avaible" aria-invalid="false">
                          <i class="fa os_icon-picture" aria-hidden="true"></i>
                        </a>
                      <?php }else{?>
                        <a class="replace-current-image oss-pro-avaible" aria-invalid="false">
                          <i class="fa os_icon-picture" aria-hidden="true"></i>
                        </a>
                      <?php }
                      ?>
                     
                      
                      <?php if(JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id)){?>
                      <a class="delete-current-image" aria-invalid="false">
                        <i class="fa os_icon-cancel" aria-hidden="true"></i>
                      </a>
                      <?php }?>

                      <img class="slider-image" src="<?php echo $image->thumbnail_path?>"
                            alt="<?php echo $image->file_name?> " data-image-id="<?php echo $image->id?>">
                    </div>
                  </div>
                  <?php
                }
              } ?>
            </div>
            <div class="existing-text"></div>
          </div>
      </li>
      <li class="slider-settings">
        <input type="radio" name="tab<?php echo $module->id?>" id="tab2-<?php echo $module->id?>">
        <label class="tab-label" data-tab-id="2" for="tab2-<?php echo $module->id?>">General<i class="fa os_icon-cogs"></i></label>
        <div id="tab-content2-<?php echo $module->id?>" class="tab-content animated fadeIn">

          <div class="slider-size-block">

            <div class="option-block osslider-main-width">
              <div id="is_width_in_pixels-block-<?php echo $module->id?>" <?php echo ($params->get('is_width_in_pixels',1)?'':'style="display:none"')?>>

                  <span class="option-title">Width, px</span>
                  <span class="option">
                    <input id="image_width_px-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_width_px<?php echo $module->id?>" default="400" min="0" step="1" value="<?php echo $params->get("width_px","400")?>"/>
                  </span>

              </div>

              <div id="width-percentage-block-<?php echo $module->id?>" <?php echo ($params->get('is_width_in_pixels',1)?'style="display:none"':'')?>>

                  <span class="option-title">Width, %</span>
                  <span class="option">
                    <input id="image_width_per-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_width_per<?php echo $module->id?>" default="100" min="0" max="100" step="1" value="<?php echo $params->get('width_per',100)?>"/>
                  </span>

              </div>

                <span class="option checked-width">
                  <div class="checkbox-block">
                    <input id="width-pixel-<?php echo $module->id?>" class="is_width_in_pixels easy-reset" name="is_width_in_pixels<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('is_width_in_pixels',1))?'checked':''?>>
                    <input id="width-pixel1-<?php echo $module->id?>" class="is_width_in_pixels easy-reset" name="is_width_in_pixels<?php echo $module->id?>" type="radio" value="0" <?php echo (!$params->get('is_width_in_pixels',1))?'checked':''?>>
                    <label for="width-pixel-<?php echo $module->id?>" data-value="px">px</label>
                    <label for="width-pixel1-<?php echo $module->id?>" data-value="%">%</label>
                  </div>
                </span>

            </div>



            <div class="option-block height-main-block" <?php echo $params->get('height_auto', 0)?'style="display:none;"':''?>>
              <div id="is_height_in_pixels-block-<?php echo $module->id?>" <?php echo ($params->get('is_height_in_pixels',1)?'':'style="display:none"')?>>
                  <span class="option-title">Height, px</span>
                  <span class="option">
                    <input id="image_height_px-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_height_px<?php echo $module->id?>" default="200" min="0" step="1" value="<?php echo $params->get("height_px","300")?>"/>
                  </span>
              </div>

              <div id="height-percentage-block-<?php echo $module->id?>" <?php echo ($params->get('is_height_in_pixels',1)?'style="display:none"':'')?>>
                  <span class="option-title">Height, %</span>
                  <span class="option">
                    <input id="image_height_per-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_height_per<?php echo $module->id?>" default="100" min="0" step="1" value="<?php echo $params->get('height_per',100)?>"/>
                  </span>
              </div>

              <span>
                 <span class="option checked-height">
                  <div class="checkbox-block">
                    <input id="height-pixel-<?php echo $module->id?>" class="is_height_in_pixels easy-reset" name="is_height_in_pixels<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('is_height_in_pixels',1))?'checked':''?>>
                    <input id="height-pixel1-<?php echo $module->id?>" class="is_height_in_pixels easy-reset" name="is_height_in_pixels<?php echo $module->id?>" type="radio" value="0" <?php echo (!$params->get('is_height_in_pixels',1))?'checked':''?>>
                    <label for="height-pixel-<?php echo $module->id?>" data-value="px">px</label>
                    <label for="height-pixel1-<?php echo $module->id?>" data-value="%">%</label>
                  </div>
                </span>
              </span>
            </div>

          </div>
          <div class="option-block check-auto">
            <span class="option">
              <div class="maincheckbox-block">
                <input id="height-auto-<?php echo $module->id?>" class="height-auto easy-reset" name="height_auto<?php echo $module->id?>" type="checkbox" <?php echo ($params->get('height_auto',0))?'checked':''?>>
              </div>
            </span>
            <span class="option-title">Height auto</span>
          </div>


        <!-- object fit -->
          <div id="object-fit-option-block-<?php echo $module->id?>" class="option-block object-fit-block">
            <span class="option-title">Object-fit:</span>
            <span class="option">
              <div class="checkbox-block">
                <input id="object_fit-<?php echo $module->id?>" class="objectFit easy-reset" name="object_fit<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('object_fit', 0) == 1)?'checked':''?>>
                <input id="object_fit1-<?php echo $module->id?>" class="objectFit easy-reset" name="object_fit<?php echo $module->id?>" type="radio" value="2" <?php echo ($params->get('object_fit', 0) == 2)?'checked':''?>>
                <input id="object_fit2-<?php echo $module->id?>" class="objectFit easy-reset" name="object_fit<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('object_fit', 0) == 0)?'checked':''?>>
                <label class="checken" for="object_fit-<?php echo $module->id?>" data-value="cover">Cover</label>
                <label class="checken" for="object_fit1-<?php echo $module->id?>" data-value="contain">Contain</label>
                <label class="checken" for="object_fit2-<?php echo $module->id?>" data-value="fill">Fill</label>
              </div>
            </span>
          </div>
        <!--/ object fit -->
  

     <!--      <div class="option-block check-cover">
            <span class="option">
              <div class="maincheckbox-block">
                <input id="object-fit-cover-<?php echo $module->id?>" class="object-fit-cover easy-reset" name="object_fit_cover<?php echo $module->id?>" type="checkbox" <?php echo ($params->get('object_fit_cover',0))?'checked':''?>>
              </div>
            </span>
            <span class="option-title">Object-fit:cover</span>
          </div> -->


          <div id="crop-image-option-block-<?php echo $module->id?>" class="option-block crop-block">
            <span class="option-title">Crop image:</span>
            <span class="option">
              <div class="checkbox-block">
                <input id="crop_image-<?php echo $module->id?>" class="cropImage easy-reset" name="crop_image<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('crop_image', 0) == 1)?'checked':''?>>
                <input id="crop_image1-<?php echo $module->id?>" class="cropImage easy-reset" name="crop_image<?php echo $module->id?>" type="radio" value="2" <?php echo ($params->get('crop_image', 0) == 2)?'checked':''?>>
                <input id="crop_image2-<?php echo $module->id?>" class="cropImage easy-reset" name="crop_image<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('crop_image', 0) == 0)?'checked':''?>>
                <label class="checken" for="crop_image-<?php echo $module->id?>" data-value="yes">yes</label>
                <label class="checken" for="crop_image1-<?php echo $module->id?>" data-value="resize">resize</label>
                <label class="checken" for="crop_image2-<?php echo $module->id?>" data-value="no">no</label>
              </div>
            </span>
          </div>

          <div id="crop_wxh_block-<?php echo $module->id?>" <?php echo $params->get('crop_image', 0)?'':'style="display:none;"'?>>
            <div class="option-block">
              <span class="option-title">Width, px</span>
              <span class="option">
                <input id="image_width-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_width<?php echo $module->id?>" min="0" step="1" value="<?php echo $image_width?>"/>
              </span>
            </div>
            <div class="option-block">
              <span class="option-title">Height, px</span>
              <span class="option">
                <input id="image_height-<?php echo $module->id?>" class="easy-input-reset" type="number" name="image_height<?php echo $module->id?>" min="0" step="1" value="<?php echo $image_height?>"/>
              </span>
            </div>
          </div>

          <div>
            <div class="option-block">
              <span class="option-title">Slider direction</span>
              <span class="option">
                <div class="checkbox-block slider-direction">
                  <input id="direction-<?php echo $module->id?>" class="direction hard-reset" name="direction<?php echo $module->id?>" type="radio" value="horizontal" <?php echo ($params->get('direction', 'horizontal') == 'horizontal')?'checked':''?>>
                  <input id="direction1-<?php echo $module->id?>" class="direction hard-reset" name="direction<?php echo $module->id?>" type="radio" value="vertical" <?php echo ($params->get('direction', 'horizontal') == 'vertical')?'checked':''?>>
                  <label class="checken" for="direction-<?php echo $module->id?>" data-value="horizontal">horizontal</label>
                  <label class="checken" for="direction1-<?php echo $module->id?>" data-value="vertical">vertical</label>
                  </div>
              </span>
            </div>
          </div>

          <div>
            <div class="option-block">
              <span class="option-title">Initial slide:</span>
              <span class="option">
                <input id="initialSlide-<?php echo $module->id?>" class="hard-input-reset" name='initialSlide<?php echo $module->id?>' type="number" value="<?php echo $params->get('initialSlide', 0)?>" min="0" step="1">
              </span>
            </div>
          </div>

          <div>
            <div class="option-block">
              <span class="option-title">Autoplay, ms:</span>
              <span class="option">
                <input id="autoplay-<?php echo $module->id?>" class="hard-input-reset" name='autoplay<?php echo $module->id?>' type="number" value="<?php echo $params->get('autoplay', 3000)?>" min="0" step="500">
              </span>
            </div>
          </div>

          <div id="autoplay-interaction-block-<?php echo $module->id?>" <?php echo $params->get('autoplay', 3000)?'':'style="display:none;"'?>>
            <div class="option-block" style="display:none;">
              <span class="option-title">Autoplay stop on last:</span>
              <span class="option">
                <div class="checkbox-block" >
                  <input id="autoplayStopOnLast-<?php echo $module->id?>" class="autoplayStopOnLast hard-reset" name="autoplayStopOnLast<?php echo $module->id?>" type="radio" value="1" checked >

                  <input id="autoplayStopOnLast1-<?php echo $module->id?>" class="autoplayStopOnLast hard-reset" name="autoplayStopOnLast<?php echo $module->id?>" type="radio" value="0" >

                  <label class="checken" for="autoplayStopOnLast-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="autoplayStopOnLast1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
            <div class="option-block">
              <span class="option-title">Autoplay interactions:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="autoplay_interaction-<?php echo $module->id?>" class="autoplay_interaction hard-reset" name="autoplay_interaction<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('autoplayDisableOnInteraction', false))?'checked':''?>>
                  <input id="autoplay_interaction1-<?php echo $module->id?>" class="autoplay_interaction hard-reset" name="autoplay_interaction<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('autoplayDisableOnInteraction', false))?'':'checked'?>>
                  <label class="checken" for="autoplay_interaction-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="autoplay_interaction1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          </div>

          <div>
            <div class="option-block">
              <span class="option-title">Prev/Next Arrows:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="prev_next_arrows-<?php echo $module->id?>" class="prev_next_arrows easy-reset" name="prev_next_arrows<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('prev_next_arrows', 1))?'checked':''?>>
                  <input id="prev_next_arrows1-<?php echo $module->id?>" class="prev_next_arrows easy-reset" name="prev_next_arrows<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('prev_next_arrows', 1))?'':'checked'?>>
                  <label class="checken" for="prev_next_arrows-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="prev_next_arrows1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          
            <div class="option-block export-block">
              <span class="option-title">Export:</span>
                <span class="option">
                <div class="checkbox-block  oss-pro-avaible">
                 <?php if(JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id)){ ?>
                  <a class="export-settings-button" id="file-export">export</a>
                  <?php }else{ ?>
                  <a class="export-settings-button oss-pro-avaible" id="file-export">export</a>
                   <?php } ?>
                  </div>
                </span>
            </div>

            <div style="clear:both;"></div>
              <a class="export-a" download href="#" >
                <div class="export-responce"></div>
              </a>

            <div class="option-block import-block">
              <span class="option-title">Import:</span>
                <span class="option">
                <div class="checkbox-block  oss-pro-avaible>
                <?php if(JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id)){ ?>
                  <a class="import-settings-button" id="file-import">import</a>
                  <?php }else{ ?>
                  <a class="import-settings-button oss-pro-avaible" id="file-import">import</a>
                  <?php } ?>
                   </div>
                </span>
            </div>

            <div style="clear:both;"></div>
             <div class="import-responce"></div>

          </div>
        </div>
      </li>
      <li class="slider-settings">
        <input type="radio" name="tab<?php echo $module->id?>" id="tab4-<?php echo $module->id?>">
        <label class="tab-label  oss-pro-avaible" data-tab-id="4" for="tab4-<?php echo $module->id?>">Advanced<i class="fa os_icon-toggle-on"></i></label>
        <div id="tab-content4-<?php echo $module->id?>" class="tab-content animated fadeIn">

          <div class="hide-block  oss-pro-avaible" <?php echo ($params->get('effect') != 'slide' && $params->get('effect') != 'coverflow')?'style="display:none;"':''?>>
              <div>
                <div class="option-block">
                  <span class="option-title">Slides per view:</span>
                  <span class="option">
                    <input id="slidesPerView-<?php echo $module->id?>" class="hard-input-reset" name='slidesPerView<?php echo $module->id?>' type="number" value="<?php echo $params->get('slidesPerView', 1)?>" min="1" step="1">
                  </span>
                </div>
              </div>

              <div <?php echo $params->get("direction","horizontal") == 'horizontal'?'':'style="display:none;"'?>>
                <div class="option-block">
                  <span class="option-title">Slides per column:</span>
                  <span class="option">
                    <input id="slidesPerColumn-<?php echo $module->id?>" class="hard-input-reset" name='slidesPerColumn<?php echo $module->id?>' type="number" value="<?php echo $params->get('slidesPerColumn', 1)?>" min="1" step="1">
                  </span>
                </div>
              </div>

              <div class="spaceBetween-block" <?php echo $params->get('slidesPerColumn', 1) == 1 && $params->get('slidesPerView', 1) == 1?'style="display:none;"':''?>>
                <div class="option-block">
                  <span class="option-title">Space between sliders:</span>
                  <span class="option">
                    <input id="spaceBetween-<?php echo $module->id?>" class="hard-input-reset" name='spaceBetween<?php echo $module->id?>' type="number" value="<?php echo $params->get('spaceBetween', 0)?>" min="0" step="1">
                  </span>
                </div>
              </div>

            <div>
              <div class="option-block">
                <span class="option-title">Column fill:</span>
                <span class="option">
                  <div class="checkbox-block">
                    <input id="slidesPerColumnFill-<?php echo $module->id?>" class="slidesPerColumnFill hard-reset" name="slidesPerColumnFill<?php echo $module->id?>" type="radio" value="column" <?php echo ($params->get('slidesPerColumnFill', true))?'checked':''?>>
                    <input id="slidesPerColumnFill1-<?php echo $module->id?>" class="slidesPerColumnFill hard-reset" name="slidesPerColumnFill<?php echo $module->id?>" type="radio" value="row" <?php echo ($params->get('slidesPerColumnFill', true))?'':'checked'?>>
                    <label class="checken" for="slidesPerColumnFill-<?php echo $module->id?>" data-value="yes">yes</label>
                    <label class="checken" for="slidesPerColumnFill1-<?php echo $module->id?>" data-value="no">no</label>
                  </div>
                </span>
              </div>
            </div>

            <div>
              <div class="option-block">
                <span class="option-title">Slides per group:<i title="Set numbers of slides to define and enable group sliding. Useful to use with 'Slides per view' > 1" class="fa os_icon-info-circled info_block"></i></span>
                <span class="option">
                  <input id="slidesPerGroup-<?php echo $module->id?>" class="hard-input-reset" name='slidesPerGroup<?php echo $module->id?>' type="number" value="<?php echo $params->get('slidesPerGroup', 1)?>" min="1" step="1">
                </span>
              </div>
            </div>

            <div>
              <div class="option-block">
                <span class="option-title">Centered slides:</span>
                <span class="option">
                  <div class="checkbox-block">
                    <input id="centeredSlides-<?php echo $module->id?>" class="centeredSlides hard-reset" name="centeredSlides<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('centeredSlides', false))?'checked':''?>>
                    <input id="centeredSlides1-<?php echo $module->id?>" class="centeredSlides hard-reset" name="centeredSlides<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('centeredSlides', false))?'':'checked'?>>
                    <label class="checken" for="centeredSlides-<?php echo $module->id?>" data-value="yes">yes</label>
                    <label class="checken" for="centeredSlides1-<?php echo $module->id?>" data-value="no">no</label>
                  </div>
                </span>
              </div>
            </div>
          </div>

          <div>
            <div class="option-block  oss-pro-avaible">
            <span class="option-title">Pagination:</span>
            <span class="option">
              <div class="checkbox-block">
                <input id="paginationCont-<?php echo $module->id?>" class="pagination hard-reset" name="pagination<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('pagination','.swiper-pagination'))?'checked':''?>>
                <input id="paginationCont1-<?php echo $module->id?>" class="pagination hard-reset" name="pagination<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('pagination', '.swiper-pagination'))?'':'checked'?>>
                <label class="checken" for="paginationCont-<?php echo $module->id?>" data-value="yes">yes</label>
                <label class="checken" for="paginationCont1-<?php echo $module->id?>" data-value="no">no</label>
              </div>
            </span>
            </div>
          </div>

          <div>
            <div class="option-block pagination-block oss-pro-avaible">
              <span class="option-title">Pagin type:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="paginationType-<?php echo $module->id?>" class="paginationType hard-reset" name="paginationType<?php echo $module->id?>" type="radio" value="bullets" <?php echo ($params->get('paginationType', 'bullets') == "bullets")?'checked':''?>>
                  <input id="paginationType1-<?php echo $module->id?>" class="paginationType hard-reset" name="paginationType<?php echo $module->id?>" type="radio" value="fraction" <?php echo ($params->get('paginationType', 'bullets') == "fraction")?'checked':''?>>
                  <input id="paginationType2-<?php echo $module->id?>" class="paginationType hard-reset" name="paginationType<?php echo $module->id?>" type="radio" value="progress" <?php echo ($params->get('paginationType', 'bullets') == "progress")?'checked':''?>>
                    <label class="checken" for="paginationType-<?php echo $module->id?>" data-value="Bullets">Bullets</label>
                    <label class="checken" for="paginationType1-<?php echo $module->id?>" data-value="Fraction">Fraction</label>
                    <label class="checken" for="paginationType2-<?php echo $module->id?>" data-value="Progress">Progress</label>
                  </div>
              </span>
            </div>
          </div>

          <div id="pagination-lickable-block-<?php echo $module->id?>" <?php echo $params->get('pagination', '.swiper-pagination') && $params->get('paginationType', 'bullets')!='progress'?'':'style="display:none;"'?>>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Pagination clickable:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="paginationClickable-<?php echo $module->id?>" class="paginationClickable hard-reset" name="paginationClickable<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('paginationClickable', false))?'checked':''?>>
                  <input id="paginationClickable1-<?php echo $module->id?>" class="paginationClickable hard-reset" name="paginationClickable<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('paginationClickable', false))?'':'checked'?>>
                  <label class="checken" for="paginationClickable-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="paginationClickable1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          </div>

          <div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Scrollbar:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="showScrollbar-<?php echo $module->id?>" class="showScrollbar hard-reset" name="showScrollbar<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('showScrollbar', null))?'checked':''?>>
                  <input id="showScrollbar1-<?php echo $module->id?>" class="showScrollbar hard-reset" name="showScrollbar<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('showScrollbar', null))?'':'checked'?>>
                  <label class="checken" for="showScrollbar-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="showScrollbar1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          </div>

          <div id="scrollbar-block-<?php echo $module->id?>" <?php echo $params->get('showScrollbar', null)?'':'style="display:none;"'?>>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Scrollbar hide:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="scrollbarHide-<?php echo $module->id?>" class="scrollbarHide hard-reset" name="scrollbarHide<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('scrollbarHide', true))?'checked':''?>>
                  <input  id="scrollbarHide1-<?php echo $module->id?>" class="scrollbarHide hard-reset" name="scrollbarHide<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('scrollbarHide', true))?'':'checked'?>>
                  <label class="checken" for="scrollbarHide-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="scrollbarHide1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Scrollbar draggable:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="scrollbarDraggable-<?php echo $module->id?>" class="scrollbarDraggable hard-reset" name="scrollbarDraggable<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('scrollbarDraggable', false))?'checked':''?>>
                  <input id="scrollbarDraggable1-<?php echo $module->id?>" class="scrollbarDraggable hard-reset" name="scrollbarDraggable<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('scrollbarDraggable', false))?'':'checked'?>>
                  <label class="checken" for="scrollbarDraggable-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="scrollbarDraggable1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          </div>

          <div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Keyboard control:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="keyboardControl-<?php echo $module->id?>" class="keyboardControl hard-reset" name="keyboardControl<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('keyboardControl', false))?'checked':''?>>
                  <input id="keyboardControl1-<?php echo $module->id?>" class="keyboardControl hard-reset" name="keyboardControl<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('keyboardControl', false))?'':'checked'?>>
                  <label class="checken" for="keyboardControl-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="keyboardControl1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
              </div>
          </div>

          <div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Mousewheel control:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="mousewheelControl-<?php echo $module->id?>" class="mousewheelControl hard-reset" name="mousewheelControl<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('mousewheelControl', false))?'checked':''?>>
                  <input id="mousewheelControl1-<?php echo $module->id?>" class="mousewheelControl hard-reset" name="mousewheelControl<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('mousewheelControl', false))?'':'checked'?>>
                  <label class="checken" for="mousewheelControl-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="mousewheelControl1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          </div>

          <div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Mousewheel on edges:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="mousewheelReleaseOnEdges-<?php echo $module->id?>" class="mousewheelReleaseOnEdges hard-reset" name="mousewheelReleaseOnEdges<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('mousewheelReleaseOnEdges', false))?'checked':''?>>
                  <input id="mousewheelReleaseOnEdges1-<?php echo $module->id?>" class="mousewheelReleaseOnEdges hard-reset" name="mousewheelReleaseOnEdges<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('mousewheelReleaseOnEdges', false))?'':'checked'?>>
                  <label class="checken" for="mousewheelReleaseOnEdges-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="mousewheelReleaseOnEdges1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          </div>

          <div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Free mode:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="freeMode-<?php echo $module->id?>" class="freeMode hard-reset" name="freeMode<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('freeMode', false))?'checked':''?>>
                  <input id="freeMode1-<?php echo $module->id?>" class="freeMode hard-reset" name="freeMode<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('freeMode', false))?'':'checked'?>>
                  <label class="checken" for="freeMode-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="freeMode1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          </div>

          <div id="free-mode-block-<?php echo $module->id?>" <?php echo $params->get('freeMode', false)?'':'style="display:none;"'?>>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Free mode momentum:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="freeModeMomentum-<?php echo $module->id?>" class="freeModeMomentum hard-reset" name="freeModeMomentum<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('freeModeMomentum', true))?'':''?> checked>
                  <input id="freeModeMomentum1-<?php echo $module->id?>" class="freeModeMomentum hard-reset" name="freeModeMomentum<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('freeModeMomentum', true))?'':''?>>
                  <label class="checken" for="freeModeMomentum-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="freeModeMomentum1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Momentum ratio:</span>
              <span class="option">
                <input id="freeModeMomentumRatio-<?php echo $module->id?>" class="hard-input-reset" name='freeModeMomentumRatio<?php echo $module->id?>' type="number" value="<?php echo $params->get('freeModeMomentumRatio', 1)?>" min="0" step="0.5">
              </span>
            </div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Free mode bounce:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="freeModeMomentumBounce-<?php echo $module->id?>" class="freeModeMomentumBounce hard-reset" name="freeModeMomentumBounce<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('freeModeMomentumBounce', true))?'':''?> checked>
                  <input id="freeModeMomentumBounce1-<?php echo $module->id?>" class="freeModeMomentumBounce hard-reset" name="freeModeMomentumBounce<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('freeModeMomentumBounce', true))?'':''?>>
                  <label class="checken" for="freeModeMomentumBounce-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="freeModeMomentumBounce1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Bounce ratio:</span>
              <span class="option">
                <input id="freeModeMomentumBounceRatio-<?php echo $module->id?>" class="hard-input-reset" name='freeModeMomentumBounceRatio<?php echo $module->id?>' type="number" value="<?php echo $params->get('freeModeMomentumBounceRatio', 1)?>" min="0" step="1">
              </span>
            </div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Minimum velocity:</span>
              <span class="option">
                <input id="freeModeMinimumVelocity-<?php echo $module->id?>" class="hard-input-reset" name='freeModeMinimumVelocity<?php echo $module->id?>' type="number" value="<?php echo $params->get('freeModeMinimumVelocity', 0.02)?>" min="0" step="0.01">
              </span>
            </div>
          </div>


          <div>
            <div class="option-block  oss-pro-avaible">
              <span class="option-title">Loop:<i title="This parameter works only if slidesPerView=1 and slidesPerColumn=1" class="fa os_icon-info-circled info_block"></i></span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="loop-<?php echo $module->id?>" class="loop hard-reset" name="loop<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('loop', false))?'checked':''?>>
                  <input id="loop1-<?php echo $module->id?>" class="loop hard-reset" name="loop<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('loop', false))?'':'checked'?>>
                  <label class="checken" for="loop-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="loop1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          </div>

          <div>
            <div id=" y-loading-image-option-block-<?php echo $module->id?>" class="option-block  oss-pro-avaible">
              <span class="option-title">Lazy Loading:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="lazy-<?php echo $module->id?>" class="lazy easy-reset" name="lazy<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('lazy', 0))?'checked':''?>>
                  <input id="lazy1-<?php echo $module->id?>" class="lazy easy-reset" name="lazy<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('lazy', 0))?'':'checked'?>>
                  <label class="checken" for="lazy-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="lazy1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          </div>

          <div id="loadPrevNextBlock-<?php echo $module->id?>" <?php echo $params->get('lazy', 0)?'':'style="display:none;"'?>>
            <div class="option-block  oss-pro-avaible lazy-loading">
              <span class="option-title">Lazy loading in prev/next:</span>
              <span class="option">
                <div class="checkbox-block">
                  <input id="loadPrevNext-<?php echo $module->id?>" class="loadPrevNext easy-reset" name="loadPrevNext<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('loadPrevNext', false))?'checked':''?>>
                  <input id="loadPrevNext1-<?php echo $module->id?>" class="loadPrevNext easy-reset" name="loadPrevNext<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('loadPrevNext', false))?'':'checked'?>>
                  <label class="checken" for="loadPrevNext-<?php echo $module->id?>" data-value="yes">yes</label>
                  <label class="checken" for="loadPrevNext1-<?php echo $module->id?>" data-value="no">no</label>
                </div>
              </span>
            </div>
          </div>

          <div id="lazyAmountBlock-<?php echo $module->id?>" class="option-block  oss-pro-avaible lazy-loading" <?php echo $params->get('loadPrevNext', false)?'':'style="display:none;"'?>>
            <span class="option-title">Images Number:</span>
            <span class="option">
              <input id="loadPrevNextAmount-<?php echo $module->id?>" class="easy-input-reset" type="number" name="loadPrevNextAmount<?php echo $module->id?>" min="1" step="1" value="<?php echo $params->get("loadPrevNextAmount", 1)?>"/>
            </span>
          </div>

          <div>
            <div class="option-block reset-block">
              <span class="option-title">Reset Settings:</span>
              <span class="option">
                <a href="#" class="reset-settings-button">Reset</a>
              </span>
            </div>
          </div>
        </div>
      </li>
      <li class="slider-settings">
        <input type="radio" name="tab<?php echo $module->id?>" id="tab3-<?php echo $module->id?>">
        <label class="tab-label" data-tab-id="3" for="tab3-<?php echo $module->id?>">Animation<i class="fa os_icon-desktop"></i></i></label>
        <div id="tab-content3-<?php echo $module->id?>" class="tab-content animated fadeIn">
          <div>
            <div class="option-block">
              <span class="option-title">Speed, ms:</span>
              <span class="option">
                <input id="speed-<?php echo $module->id?>" class="hard-input-reset" name='speed<?php echo $module->id?>' type="number" value="<?php echo $params->get('speed', 300)?>" min="0" step="100">
              </span>
            </div>
          </div>

          <div>
            <div class="option-block selected-layout">
              <span class="option-title">Animation:</span>
              <span class="option">
                <select class="slider-effect hard-change-reset" name="slider-effect<?php echo $module->id?>">
                  <option <?php echo $params->get("effect","slide")=="slide"?'selected':'';?> value="slide">Slide</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="fade"?'selected':'';?> value="fade">Fade</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="cube"?'selected':'';?> value="cube">Cube</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="coverflow"?'selected':'';?> value="coverflow">Coverflow</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="flip"?'selected':'';?> value="flip">Super Flip</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="parallax"?'selected':'';?> value="parallax">Parallax</option>
                  <option  <?php echo $params->get("effect","slide")=="pulse"?'selected':'';?> value="pulse">Pulse</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="fadeIn"?'selected':'';?> value="fadeIn">Fade In</option>
                  <option <?php echo $params->get("effect","slide")=="flip+"?'selected':'';?> value="flip+">Flip</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="flipInX"?'selected':'';?> value="flipInX">Flip In X</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="flipInY"?'selected':'';?> value="flipInY">Flip In Y</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="slideInUp"?'selected':'';?> value="slideInUp">Slide In Up</option>
                  <option <?php echo $params->get("effect","slide")=="bounce"?'selected':'';?> value="bounce">Bounce</option>
                  <option <?php echo $params->get("effect","slide")=="zoomIn"?'selected':'';?> value="zoomIn">Zoom In</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="rotateIn"?'selected':'';?> value="rotateIn">Rotate In</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="bounceInLeft+swing"?'selected':'';?> value="bounceInLeft+swing">Bounce In Left + Swing</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="bounce+pulse"?'selected':'';?> value="bounce+pulse">Bounce + Pulse</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="pulse+bounce"?'selected':'';?> value="pulse+bounce">Pulse + Bounce</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="fadeInLeftBig+tada"?'selected':'';?> value="fadeInLeftBig+tada">Fade In Left Big + Tada</option>
                  <option class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="fadeInRightBig+swing"?'selected':'';?> value="fadeInRightBig+swing">Fade In Right Big + Swing</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="fadeInLeftBig+swing"?'selected':'';?> value="fadeInLeftBig+swing">Fade In Left Big + Swing</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="fadeInRightBig+tada"?'selected':'';?> value="fadeInRightBig+tada">Fade In Right Big + Tada</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="flip+pulse"?'selected':'';?> value="flip+pulse">Flip + Pulse</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="shake+rotateOut"?'selected':'';?> value="shake+rotateOut">Shake + Rotate Out</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="slideInUp+hinge"?'selected':'';?> value="slideInUp+hinge">Slide In Up + Hinge</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="slideInDown+bounce"?'selected':'';?> value="slideInDown+bounce">Slide In Down + Bounce</option>
                  <option  class="oss-pro-avaible" <?php echo $params->get("effect","slide")=="zoomOut+tada"?'selected':'';?> value="zoomOut+tada">Zoom Out + Tada</option>
                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="rotateIn+tada"?'selected':'';?> value="rotateIn+tada">Rotate In + Tada</option>

                  <option class="oss-pro-avaible"  <?php echo $params->get("effect","slide")=="custom"?'selected':'';?> value="custom">Custom</option>
                </select>
              </span>
            </div>
  <!-- end -->              
            <div class="animation-manager-block" <?php echo ($params->get('effect') == 'custom')?'':'style="display:none;"'?>>
         
              <div class="text-block anim-type start-slide-animation">
                  <label>Start Animation:</label>
                  <input class="os-slider-autocomplete-input-anim-slide-start" type="text" value="">
                  <a class="os-slider-automplete-show-anim-slide-start">Effect &#x25BC;</a>
                  <ul class="os-slider-autocomplete-avaible-anim-slide-start ul-hidden">
                    <li class="os-slider-autocomplete-anim-slide-start start-animations-list" data-animation="">No Animate</li>
                  </ul>
              </div>

              <div class="text-block anim-type end-slide-animation">
                  <label>End Animation:</label>
                  <input class="os-slider-autocomplete-input-anim-slide-end" type="text" value="">
                  <a class="os-slider-automplete-show-anim-slide-end">Effect &#x25BC;</a>
                  <ul class="os-slider-autocomplete-avaible-anim-slide-end ul-hidden">
                      <li class="os-slider-autocomplete-anim-slide-end end-animations-list" data-animation="">No Animate</li>
                  </ul>
              </div>                

            </div>
          </div>
          <div id="cube-animation-block-<?php echo $module->id?>" <?php echo ($params->get('effect') == 'cube')?'':'style="display:none;"'?>>
          <div class="option-block">
            <span class="option-title">Slide shadows:</span>
            <span class="option">
              <div class="checkbox-block">
                <input id="slideShadows-<?php echo $module->id?>" class="slideShadows hard-reset" name="slideShadows<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('slideShadows', true))?'':''?> checked>
                <input id="slideShadows1-<?php echo $module->id?>" class="slideShadows hard-reset" name="slideShadows<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('slideShadows', true))?'':''?>>
                <label class="checken" for="slideShadows-<?php echo $module->id?>" data-value="yes">yes</label>
                <label class="checken" for="slideShadows1-<?php echo $module->id?>" data-value="no">no</label>
              </div>
            </span>
            </div>
            <div class="option-block">
            <span class="option-title">Shadow:</span>
            <span class="option">
              <div class="checkbox-block">
                <input id="shadow-<?php echo $module->id?>" class="shadow hard-reset" name="shadow<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('shadow', true))?'checked':''?>>
                <input id="shadow1-<?php echo $module->id?>" class="shadow hard-reset" name="shadow<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('shadow', true))?'':'checked'?>>
                <label class="checken" for="shadow-<?php echo $module->id?>" data-value="yes">yes</label>
                <label class="checken" for="shadow1-<?php echo $module->id?>" data-value="no">no</label>
              </div>
            </span>
            </div>
            <div class="option-block">
            <span class="option-title">Shadow offset:</span>
            <span class="option">
              <input id="shadowOffset-<?php echo $module->id?>" class="hard-input-reset" name='shadowOffset<?php echo $module->id?>' type="number" value="<?php echo $params->get('shadowOffset', 20)?>" min="0" step="1">
            </span>
            </div>
            <div class="option-block">
            <span class="option-title">Shadow scale:</span>
            <span class="option">
              <input id="shadowScale-<?php echo $module->id?>" class="hard-input-reset" name='shadowScale<?php echo $module->id?>' type="number" value="<?php echo $params->get('shadowScale', 0.94)?>" min="0" step="0.01">
            </span>
            </div>
          </div>
          <div id="coverflow-animation-block-<?php echo $module->id?>" <?php echo ($params->get('effect', 'slide') == 'coverflow')?'':'style="display:none;"'?>>
          <div class="option-block">
            <span class="option-title">Rotate:</span>
            <span class="option">
              <input id="rotate-<?php echo $module->id?>" class="hard-input-reset" name='rotate<?php echo $module->id?>' type="number" value="<?php echo $params->get('rotate', 50)?>" min="0" step="1">
            </span>
            </div>
            <div class="option-block">
            <span class="option-title">Stretch:</span>
            <span class="option">
              <input id="stretch-<?php echo $module->id?>" class="hard-input-reset" name='stretch<?php echo $module->id?>' type="number" value="<?php echo $params->get('stretch', 0)?>" min="0" step="1">
            </span>
            </div>
            <div class="option-block">
            <span class="option-title">Depth:</span>
            <span class="option">
              <input id="depth-<?php echo $module->id?>" class="hard-input-reset" name='depth<?php echo $module->id?>' type="number" value="<?php echo $params->get('depth', 100)?>" min="0" step="1">
            </span>
            </div>
            <div class="option-block">
            <span class="option-title">Modifier:</span>
            <span class="option">
              <input id="modifier-<?php echo $module->id?>" class="hard-input-reset" name='modifier<?php echo $module->id?>' type="number" value="<?php echo $params->get('modifier', 1)?>" min="0" step="1">
            </span>
            </div>
            <div class="option-block">
            <span class="option-title">Shadow:</span>
            <span class="option">
              <div class="checkbox-block">
                <input id="coverflowSlideShadows-<?php echo $module->id?>" class="coverflowSlideShadows hard-reset" name="coverflowSlideShadows<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('coverflowSlideShadows', true))?'checked':''?>>
                <input id="coverflowSlideShadows1-<?php echo $module->id?>" class="coverflowSlideShadows hard-reset" name="coverflowSlideShadows<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('coverflowSlideShadows', true))?'':'checked'?>>
                <label class="checken" for="coverflowSlideShadows-<?php echo $module->id?>" data-value="yes">yes</label>
                <label class="checken" for="coverflowSlideShadows1-<?php echo $module->id?>" data-value="no">no</label>
              </div>
            </span>
            </div>
          </div>
          <div id="flip-animation-block-<?php echo $module->id?>" <?php echo ($params->get('effect', 'slide') == 'flip')?'':'style="display:none;"'?>>
          <div class="option-block">
            <span class="option-title">Shadows:</span>
            <span class="option">
              <div class="checkbox-block">
                <input id="flipSlideShadows-<?php echo $module->id?>" class="flipSlideShadows hard-reset" name="flipSlideShadows<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('flipSlideShadows', true))?'checked':''?>>
                <input id="flipSlideShadows1-<?php echo $module->id?>" class="flipSlideShadows hard-reset" name="flipSlideShadows<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('flipSlideShadows', true))?'':'checked'?>>
                <label class="checken" for="flipSlideShadows-<?php echo $module->id?>" data-value="yes">yes</label>
                <label class="checken" for="flipSlideShadows1-<?php echo $module->id?>" data-value="no">no</label>
              </div>
            </span>
            </div>
            <div class="option-block">
            <span class="option-title">Limit rotation:</span>
            <span class="option">
              <div class="checkbox-block">
                <input id="flipLimitRotation-<?php echo $module->id?>" class="flipLimitRotation hard-reset" name="flipLimitRotation<?php echo $module->id?>" type="radio" value="1" <?php echo ($params->get('flipLimitRotation', true))?'checked':''?>>
                <input id="flipLimitRotation1-<?php echo $module->id?>" class="flipLimitRotation hard-reset" name="flipLimitRotation<?php echo $module->id?>" type="radio" value="0" <?php echo ($params->get('flipLimitRotation', true))?'':'checked'?>>
                <label class="checken" for="flipLimitRotation-<?php echo $module->id?>" data-value="yes">yes</label>
                <label class="checken" for="flipLimitRotation1-<?php echo $module->id?>" data-value="no">no</label>
              </div>
            </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="copyright-block">
      <a href="//ordasoft.com/os-touch-slider-joomla-slideshow-module" class="copyright-link" style="float:left;" title="Touch Slider - Joomla slideshow module">&copy;2019 OrdaSoft.com All rights reserved. </a>
      <span class="slider-version" style="float:right;"><?php echo 'v'.$sliderV?></span>
    </div>
  </div>


  <script>

    var fromCamelCaseToStringCapitalizeFirstLetter = function(text){
      var result = text.replace( /([A-Z])/g, " $1" );
      var finalResult = result.charAt(0).toUpperCase() + result.slice(1); // capitalize the first letter - as an example.

      return finalResult;
    }

      
    //autoload and sort effect list 
    var startEffectList = ['bounce','flash','pulse','rubberBand','shake','swing','tada','wobble','jello','bounceIn','bounceInDown',
    'bounceInLeft','bounceInRight','bounceInUp','fadeIn','fadeInDown','fadeInDownBig','fadeInLeft','fadeInLeftBig','fadeInRight',
    'fadeInRightBig','fadeInUp','fadeInUpBig','flip','flipInX','flipInY','lightSpeedIn','rotateIn',
    'rotateInDownLeft','rotateInDownRight','rotateInUpLeft','rotateInUpRight','slideInUp','slideInDown','slideInLeft',
    'slideInRight','zoomIn','zoomInDown','zoomInLeft','zoomInRight','zoomInUp','hinge','rollIn'];

    var endEffectList = ['bounce','flash','pulse','rubberBand','shake','swing','tada','wobble','jello','bounceOut',
    'bounceOutDown','bounceOutLeft','bounceOutRight','bounceOutUp',
    'fadeOut','fadeOutDown','fadeOutDownBig','fadeOutLeft','fadeOutLeftBig','fadeOutRight','fadeOutRightBig','fadeOutUp',
    'fadeOutUpBig','flip','flipOutX','flipOutY','lightSpeedOut','rotateOut','rotateOutDownLeft','rotateOutDownRight',
    'rotateOutUpLeft','rotateOutUpRight','slideOutUp','slideOutDown','slideOutLeft','slideOutRight','zoomOut',
    'zoomOutDown','zoomOutLeft','zoomOutRight','zoomOutUp','hinge','rollOut'];

    startEffectList = startEffectList.sort();
    endEffectList = endEffectList.sort();

    //text start
    for(var i = 0;startEffectList.length > i;i++){

      if(startEffectList[i] == 'bounce' 
        || startEffectList[i] == 'pulse' 
        ||startEffectList[i] == 'zoomIn' 
        ||startEffectList[i] == 'flip'){

      var liItem = '<li class="os-slider-autocomplete-anim-start start-animations-list " data-animation="'
      +startEffectList[i]+'">'+fromCamelCaseToStringCapitalizeFirstLetter(startEffectList[i])+'</li>';
      }else{
         var liItem = '<li class="os-slider-autocomplete-anim-start start-animations-list non-event" data-animation="'
      +startEffectList[i]+'">'+fromCamelCaseToStringCapitalizeFirstLetter(startEffectList[i])+'</li>';
      }
     

      jQuerOs('ul.os-slider-autocomplete-avaible-anim-start').append(liItem);
    }

     //text end
    for(var i = 0;endEffectList.length > i;i++){
      if(startEffectList[i] == 'bounce' 
        || startEffectList[i] == 'pulse' 
        || startEffectList[i] == 'zoomOut' 
        || startEffectList[i] == 'flip'){
        var liItem = '<li class="os-slider-autocomplete-anim-end end-animations-list" data-animation="'
      +endEffectList[i]+'">'+fromCamelCaseToStringCapitalizeFirstLetter(endEffectList[i])+'</li>';
      }else{
        var liItem = '<li class="os-slider-autocomplete-anim-end end-animations-list  non-event" data-animation="'
      +endEffectList[i]+'">'+fromCamelCaseToStringCapitalizeFirstLetter(endEffectList[i])+'</li>';
      }
      

      jQuerOs('ul.os-slider-autocomplete-avaible-anim-end').append(liItem);
    }


     var allEffectList = startEffectList.concat(endEffectList);

    //permanent
    for(var i = 0;allEffectList.length > i;i++){

      if(startEffectList[i] == 'bounce' 
        || startEffectList[i] == 'pulse' 
        ||startEffectList[i] == 'zoomIn' 
        ||startEffectList[i] == 'flip'){
        var liItem = '<li class="os-slider-autocomplete-anim-permanent permanent-animations-list" data-animation="'
      +allEffectList[i]+'">'+fromCamelCaseToStringCapitalizeFirstLetter(allEffectList[i])+'</li>';
      }else{
      var liItem = '<li class="os-slider-autocomplete-anim-permanent permanent-animations-list non-event" data-animation="'
      +allEffectList[i]+'">'+fromCamelCaseToStringCapitalizeFirstLetter(allEffectList[i])+'</li>';
      }

      

      jQuerOs('ul.os-slider-autocomplete-avaible-anim-permanent').append(liItem);
    }

    //hover
    for(var i = 0;allEffectList.length > i;i++){

      if(startEffectList[i] == 'bounce' 
        || startEffectList[i] == 'pulse' 
        ||startEffectList[i] == 'zoomIn' 
        ||startEffectList[i] == 'flip'){
      var liItem = '<li class="os-slider-autocomplete-anim-hover hover-animations-list" data-animation="'
      +allEffectList[i]+'">'+fromCamelCaseToStringCapitalizeFirstLetter(allEffectList[i])+'</li>';
    }else{
      var liItem = '<li class="os-slider-autocomplete-anim-hover hover-animations-list non-event" data-animation="'
      +allEffectList[i]+'">'+fromCamelCaseToStringCapitalizeFirstLetter(allEffectList[i])+'</li>';
    }

      jQuerOs('ul.os-slider-autocomplete-avaible-anim-hover').append(liItem);
    }

    var allEffectList = startEffectList.concat(endEffectList);

    //permanent
    for(var i = 0;allEffectList.length > i;i++){
      var liItem = '<li class="os-slider-autocomplete-anim-permanent permanent-animations-list" data-animation="'
      +allEffectList[i]+'">'+fromCamelCaseToStringCapitalizeFirstLetter(allEffectList[i])+'</li>';

      jQuerOs('ul.os-slider-autocomplete-avaible-anim-permanent').append(liItem);
    }

    //hover
    for(var i = 0;allEffectList.length > i;i++){
      var liItem = '<li class="os-slider-autocomplete-anim-hover hover-animations-list" data-animation="'
      +allEffectList[i]+'">'+fromCamelCaseToStringCapitalizeFirstLetter(allEffectList[i])+'</li>';

      jQuerOs('ul.os-slider-autocomplete-avaible-anim-hover').append(liItem);
    }

    //autoload and sort effect list 
    
    //image link for empty slider
    var empty_image_path = '<?php echo JURI::root()."/modules/mod_os_touchslider/assets/images/empty_image.png";?>';
    //image link for empty slider

    

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


      var mySliderSetings = new osSliderSettings("#dragable-settings-block<?php echo $module->id;?>",{
      

        debugMode:                    false,
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
  //  }); //end jQuerOs(document).ready ;
  </script>

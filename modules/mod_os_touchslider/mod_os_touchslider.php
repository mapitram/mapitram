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


if($module->id==0)return;
//setters&getters->
require_once dirname(__FILE__) . '/helper.php';
$doc = JFactory::getDocument();
//stylesheet
if(modOsTouchSliderHelper::checkStylesIncludedOSS('swiper.css') === false){
  $doc->addStyleSheet(JURI::root() . "modules/mod_os_touchslider/assets/css/swiper.css");
}
if(modOsTouchSliderHelper::checkStylesIncludedOSS('animate.css') === false){
  $doc->addStyleSheet("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css");
}

if( JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id) ){

  //$doc->addStyleSheet(JURI::root() . "modules/mod_os_touchslider/assets/css/font-awesome.min.css");
  $doc->addStyleSheet(JURI::root() . "modules/mod_os_touchslider/assets/css/os_touchslider_font.css");
  $doc->addStyleSheet(JURI::root() . "modules/mod_os_touchslider/assets/css/fine-uploader-new-sl.css");
  $doc->addStyleSheet(JURI::root() . "modules/mod_os_touchslider/assets/css/jquery.slider.minicolors.css");
  if(modOsTouchSliderHelper::checkStylesIncludedOSS('jquerOs-ui.min.css') === false){
    $doc->addStyleSheet(JURI::root() . "modules/mod_os_touchslider/assets/css/jquerOs-ui.min.css");
  }
  $doc->addStyleSheet(JURI::root() . "modules/mod_os_touchslider/assets/css/cssgram.min.css");
}

$doc->addStyleSheet(JURI::root() . "modules/mod_os_touchslider/assets/css/style.css");

//script
if(modOsTouchSliderHelper::checkJavaScriptIncludedOSS('jQuerOs-2.2.4.min.js') === false){
  $doc->addScript(JURI::root() . "modules/mod_os_touchslider/assets/js/jQuerOs-2.2.4.min.js");
  $doc->addScriptDeclaration("jQuerOs=jQuerOs.noConflict();");  
}

//var_dump(expression)
if(modOsTouchSliderHelper::checkJavaScriptIncludedOSS('jquerOs-ui.min.js') === false){
  $doc->addScript(JURI::root() . "modules/mod_os_touchslider/assets/js/jquerOs-ui.min.js");
}
if(modOsTouchSliderHelper::checkJavaScriptIncludedOSS('swiper-os.js') === false){
  $doc->addScript(JURI::root() . "modules/mod_os_touchslider/assets/js/swiper-os.js");
}
//include settings // webfonts library needed
if(modOsTouchSliderHelper::checkJavaScriptIncludedOSS('webfont.js') === false){
  $doc->addScript("https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js");
}

if( JFactory::getUser()->authorise('module.edit.frontend', 'com_modules.module.' . $module->id) ){

$doc->addScript(JURI::root() . "modules/mod_os_touchslider/assets/js/jQuerOs.slider.minicolors.js");

  $doc->addScript(JURI::root() . "modules/mod_os_touchslider/assets/js/fine-uploader-sl.js");
  $doc->addScript(JURI::root() . "modules/mod_os_touchslider/assets/js/jQuerOs.json.js");
  $doc->addScript(JURI::root() . "modules/mod_os_touchslider/assets/js/os.touchslider.settings.js");

} else {
  $doc->addScript(JURI::root() . "modules/mod_os_touchslider/assets/js/os.touchslider.main.js");

}




//params from xml
$suffix = $params->get('moduleclass_sfx','');
//end
//->view variables
$unsortableImages = modOsTouchSliderHelper::getSliderImages($module->id);
$sliderText = modOsTouchSliderHelper::getSliderText($module->id);
$params = modOsTouchSliderHelper::getSliderParams($module->id);
//sort images
if($params->get("imageOrdering") && count($params->get("imageOrdering"))){
  foreach ($params->get("imageOrdering") as $key => $orderId) {
    if(isset($unsortableImages[$orderId])){
      $images[$key] = $unsortableImages[$orderId];
      unset($unsortableImages[$orderId]);
    }
  }
}//end sort
if($unsortableImages){
  foreach ($unsortableImages as $image) {
    $images[] = $image;
  }
}
$crop = $params->get('crop_image',0);
$width_suffix = $params->get('is_width_in_pixels',1)?'px':'%';
$height_suffix = $params->get('is_height_in_pixels',1)?'px':'%';
$parallax = $params->get("effect","slide")=='parallax'?1:0;

if($params->get('is_width_in_pixels',1)){
  $slider_width = $params->get('width_px',400);
}else{
  $slider_width = $params->get('width_per',100);
}
if($params->get('is_height_in_pixels',1)){
  $slider_height = $params->get('height_px',200);
}else{
  $slider_height = $params->get('height_per',100);
}

$image_width = $params->get('image_width',400);
$image_height = $params->get('image_height',200);

if(isset($images)){
  foreach ($images as $image) {
    if($crop){
      $src = JPATH_BASE.'/images/os_touchslider_'.$module->id.'/original/'.$image->file_name;

      $pathinfo = pathinfo(strtolower($src));
      $ext = $pathinfo['extension'];
      $ext = '.'.$ext;
      $fileName = $pathinfo['filename'];
      $dest = JPATH_BASE.'/images/os_touchslider_'.$module->id.'/slideshow/'.$fileName.'_'.$image_width.'_'.$image_height.'_'.$crop.$ext;
      $slide_dest = JURI::root().'images/os_touchslider_'.$module->id.'/slideshow/'.$fileName.'_'.$image_width.'_'.$image_height.'_'.$crop.$ext;
      if(!file_exists($slide_dest)){
        modOsTouchSliderHelper::createimageThumbnail($src, $dest, $image_width, $image_height ,$crop);
        if(!file_exists($slide_dest)){
          $image->image_path = $slide_dest;
        }
      }
    }else{
      $image->image_path = JURI::root().'/images/os_touchslider_'.$module->id.'/original/'.$image->file_name;
    }
    $src = JPATH_BASE.'/images/os_touchslider_'.$module->id.'/original/'.$image->file_name;
    $pathinfo = pathinfo(strtolower($src));

    $ext = isset($pathinfo['extension'])?$pathinfo['extension']:'';
    $ext = '.'.$ext;
    $fileName = $pathinfo['filename'];

    $dest = JPATH_BASE.'/images/os_touchslider_'.$module->id.'/slideshow/'.$fileName.'_150_100_1'.$ext;
    $slide_dest = JURI::root().'images/os_touchslider_'.$module->id.'/slideshow/'.$fileName.'_150_100_1'.$ext;
    if(!file_exists($slide_dest)){
      modOsTouchSliderHelper::createimageThumbnail($src, $dest, 150, 100 ,1);
      $image->thumbnail_path = $slide_dest;
    }
  }
}

//get itemId need for correct com_ajax query
$request = JFactory::getApplication()->input;
$app = JFactory::getApplication();
if($app->getMenu()->getActive()){
  $itemId = $app->getMenu()->getActive()->id;
}elseif($request->getRaw('ItemId',false)){
  $itemId = $request->get('ItemId');
}else{
  $itemId = 101;
}

$user = JFactory::getUser();

foreach($user->groups as $group){
    if($group == 8){
    //get sldier version
        $xml = @simplexml_load_file(JPATH_BASE . "/modules/mod_os_touchslider/mod_os_touchslider.xml");
        $sliderV = '';
        
        $creationDate = '';
        if($xml){
          $sliderV = (string)$xml->version;
          $creationDate = (string)$xml->creationDate;

          unset($xml);

          //check update
          $avaibleUpdate = false;
          $url="http://ordasoft.com/xml_update/mod_os_touchslider.xml";
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,0); 
          curl_setopt($ch, CURLOPT_TIMEOUT, 1);

          $data = curl_exec($ch);
          curl_close($ch);

          $xml = simplexml_load_string($data);
          $updateArticleUrl = '#';
          $sliderVArr = explode(".", $sliderV);
          if($xml && isset($xml->version)){
            $ordasoftV = (string)$xml->version;
            $ordasoftVArr = explode(".", $ordasoftV);
            $ordasoftCreationDate = (string)$xml->creationDate;
            $updateArticleUrl = (string)$xml->updateArticleUrl;
            foreach ($sliderVArr as $k => $sliderSubV) {
              if(isset($ordasoftVArr[$k])){
                if((int)$ordasoftVArr[$k] < (int)$sliderSubV){
                  break;
                }
                if((int)$ordasoftVArr[$k] > (int)$sliderSubV){
                  $avaibleUpdate = true;
                  break;
                }
              }
            }
          }
          unset($xml);
        }
    }else{
        $avaibleUpdate = false;
    }
}
//->view
require JModuleHelper::getLayoutPath('mod_os_touchslider', $params->get('layout', 'default'));

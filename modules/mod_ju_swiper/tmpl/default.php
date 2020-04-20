<?php

/**
* @package   Swiper Slider Module
* @author    joomla2you https://www.joomla2you.com
* @copyright Copyright (C) 2008 - 2018 joomla2you.
* @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or Later
*/

// no direct access
defined('_JEXEC') or die;
if(!defined('DS')){
define( 'DS', DIRECTORY_SEPARATOR );
}

$slide = $params->get('slides');
$cacheFolder = JURI::base(true).'/cache/';
$modID = $module->id;
$modPath = JURI::base(true).'/modules/mod_ju_swiper/';
$document = JFactory::getDocument(); 
$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
$interlOffset = $params->get('interlOffset');
$seffect = $params->get('seffect');
$sdelay = $params->get('sdelay');
$sspeed = $params->get('sspeed');
$slider_items    = $params->get('slider_items');
$ol_image = $params->get('ol_image');
$ol_title = $params->get('ol_title');
$ol_text = $params->get('ol_text');
$ol_target_url = $params->get('ol_target_url');
$readmore = $params->get('readmore');
$url = $params->get('url');
$target = $params->get('target');


$document->addStyleSheet($modPath.'assets/css/style.css');
$document->addScript($modPath.'assets/js/swiper.js');
?>

<div class="swiper-container main-slider swiper-container-horizontal" style="cursor: grab;">
<div class="swiper-wrapper">
<?php foreach ($slider_items as $item) : ?>
<div class="swiper-slide" data-swiper-slide-index="<?php echo $item->ol_title; ?>">
<figure class="slide-bgimg">
<img src="<?php echo $item->ol_image; ?>" class="img-fluid" alt="<?php echo $item->ol_title; ?>">
</figure>
<div class="content container content-center text-center">
<div class="mt-4">
<h1 class="title"><?php echo $item->ol_title; ?></h1>
<p class="caption"><?php echo $item->ol_text; ?></p>
<?php if (!empty($item->ol_target_url)) : ?> <div class="mt-5">
<a href="<?php echo $item->ol_target_url; ?>" title="<?php echo $item->ol_title; ?>" class="btn main-btn"><?php echo $item->readmore; ?></a>
</div><?php endif; ?>
</div>
</div>
</div>

<?php endforeach; ?>
</div>
<div class="swiper-button-prev swiper-button-white" tabindex="0" role="button" aria-label="Previous slide"></div>
<div class="swiper-button-next swiper-button-white" tabindex="0" role="button" aria-label="Next slide"></div>
<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
</div>

<script>
(function ($) {
'use strict';
$(document).ready(function () {

var mainSliderSelector = '.main-slider',
navSliderSelector = '.nav-slider',
interleaveOffset = <?php echo $params->get('interlOffset'); ?>;

var mainSliderOptions = {
loop: true,
effect: '<?php echo $params->get('seffect'); ?>',
speed: <?php echo $params->get('sspeed'); ?>,
autoplay: {
delay: <?php echo $params->get('sdelay'); ?>
},
grabCursor: true,
watchSlidesProgress: true,
navigation: {
nextEl: '.swiper-button-next',
prevEl: '.swiper-button-prev',
},
on: {
init: function () {
this.autoplay.stop();
},
imagesReady: function () {
this.el.classList.remove('loading');
this.autoplay.start();
},
slideChangeTransitionEnd: function () {
var swiper = this,
captions = swiper.el.querySelectorAll('.caption');
for (var i = 0; i < captions.length; ++i) {
captions[i].classList.remove('show');
}
swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
},
progress: function () {
var swiper = this;
for (var i = 0; i < swiper.slides.length; i++) {
var slideProgress = swiper.slides[i].progress,
innerOffset = swiper.width * interleaveOffset,
innerTranslate = slideProgress * innerOffset;
swiper.slides[i].querySelector(".slide-bgimg").style.transform =
"translate3d(" + innerTranslate + "px, 0, 0)";
}
},
touchStart: function () {
var swiper = this;
for (var i = 0; i < swiper.slides.length; i++) {
swiper.slides[i].style.transition = "";
}
},
setTransition: function (speed) {
var swiper = this;
for (var i = 0; i < swiper.slides.length; i++) {
swiper.slides[i].style.transition = speed + "ms";
swiper.slides[i].querySelector(".slide-bgimg").style.transition =
speed + "ms";
}
}
}
};
var mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

});
}(jQuery));
</script>

<?php
/*
# ------------------------------------------------------------------------
# Vina Articles Accordion for Joomla 3
# ------------------------------------------------------------------------
# Copyright(C) 2014 www.VinaGecko.com. All Rights Reserved.
# @license http://www.gnu.org/licenseses/gpl-3.0.html GNU/GPL
# Author: VinaGecko.com
# Websites: http://vinagecko.com
# Forum: http://vinagecko.com/forum/
# ------------------------------------------------------------------------
*/

// no direct access
defined('_JEXEC') or die('Restricted access');
$doc = JFactory::getDocument();
$doc->addScript('modules/mod_vina_accordion_content/assets/js/jquery.cookie.js', 'text/javascript');
$doc->addScript('modules/mod_vina_accordion_content/assets/js/jquery.accordion.js', 'text/javascript');
$doc->addStyleSheet('modules/mod_vina_accordion_content/assets/css/style.css');
?>
<style type="text/css">
#vina-accordion-content<?php echo $module->id; ?> {
	max-width: <?php echo $moduleWidth; ?>;
}
#vina-accordion-content<?php echo $module->id; ?> .vina-accordion-item {
	border-top: <?php echo $contentBgColor; ?> 1px solid;
	background: <?php echo $tabBgColor; ?>;
	color: <?php echo $tabTextColor; ?>;
}
#vina-accordion-content<?php echo $module->id; ?> .accordion-open {
	background: <?php echo $tabOpenBgColor; ?>;
	color: <?php echo $tabOpenTextColor; ?>;
}
#vina-accordion-content<?php echo $module->id; ?> .vina-accordion-container {
	padding: <?php echo $contentPadding; ?>px;
	background: <?php echo $contentBgColor; ?>;
	color: <?php echo $contentTextColor; ?>;
}
#vina-copyright<?php echo $module->id; ?> {
	font-size: 12px;
	<?php if(!$params->get('copyRightText', 0)) : ?>
	height: 1px;
	overflow: hidden;
	<?php endif; ?>
}
</style>
<div id="vina-accordion-content<?php echo $module->id; ?>" class="vina-accordion-content <?php echo $moduleclass_sfx; ?>">
	<?php 
		foreach ($list as $key => $item) :
			$title 	= $item->title;
			$link   = $item->link;
			$images = json_decode($item->images);
			$category 	 = $item->displayCategoryTitle;
			$hits  		 = $item->displayHits;
			$description = $item->displayIntrotext;
			$created   	 = $item->displayDate;
			$image = $images->image_fulltext;
			$image = (empty($image)) ? $images->image_intro : $image;
			if(!empty($image)) {
				if($resizeImage) {
					$image = ModVinaArticlesAccordionHelper::resizeImage($resizeType, $image, '', $imagegWidth, $imagegHeight, $module);
				}
				else {
					$image = (strpos($image, 'http://') === FALSE) ? JURI::base() . $image : $image;
				}				
			}
	?>
	<div class="vina-accordion-item" id="vina-accordion-item<?php echo $module->id; ?><?php echo $key; ?>">
		<div class="title"><?php echo $title; ?></div>
		<?php if($useIcon) : ?><span></span><?php endif; ?>
	</div>
	<div class="vina-accordion-container">
		<div class="content row-fluid">
			<!-- Image Block -->
			<?php if(!empty($image) && $showImage) : ?>
			<div class="span<?php echo ($showTitle || $showCategory || $showCreatedDate || $showHits || $introText || $readmore) ? 4 : 12; ?>">
				<a href="<?php echo $link; ?>" title="<?php echo $title; ?>">
					<img src="<?php echo $image; ?>" alt="<?php echo $title; ?>" title="<?php echo $title; ?>" />
				</a>
			</div>
			<?php endif; ?>
			
			<?php if($showTitle || $showCategory || $showCreatedDate || $showHits || $introText || $readmore) : ?>
			<div class="span<?php echo (!empty($image) && $showImage) ? 8 : 12; ?>">
				<!-- Title Block -->
				<?php if($showTitle) :?>
				<h3 class="title">
					<?php echo $title; ?>
				</h3>
				<?php endif; ?>
				
				<!-- Info Block -->
				<?php if($showCategory || $showCreatedDate || $showHits) : ?>
				<div class="info">
					<?php if($showCreatedDate) : ?>
					<span><?php echo JTEXT::_('VINA_PUBLISHED'); ?>: <?php echo JHTML::_('date', $created, 'F d, Y');?></span>
					<?php endif; ?>
					
					<?php if($showCategory) : ?>
					<span><?php echo JTEXT::_('VINA_CATEGORY'); ?>: <?php echo $category; ?></span>
					<?php endif; ?>
					
					<?php if($showHits) : ?>
					<span><?php echo JTEXT::_('VINA_HITS'); ?>: <?php echo $hits; ?></span>
					<?php endif; ?>
				</div>
				<?php endif; ?>
				
				<!-- Intro text Block -->
				<?php if($introText) : ?>
				<div class="introtext"><?php echo $description; ?></div>
				<?php endif; ?>
				
				<!-- Readmore Block -->
				<?php if($readmore) : ?>
				<div class="readmore">
					<a class="buttonlight morebutton" href="<?php echo $link; ?>" title="<?php echo $title; ?>">
						<?php echo JText::_('VINA_READ_MORE'); ?>
					</a>
				</div>
				<?php endif; ?>
			</div>
			<?php endif; ?>
		</div>
	</div>
	<?php endforeach; ?>
</div>

<script type="text/javascript">
jQuery(document).ready(function($) {
	$('#vina-accordion-content<?php echo $module->id; ?> .vina-accordion-item').accordion({
		moduleId: '#vina-accordion-content<?php echo $module->id; ?>',
		cookieName: 'vina-accordion-content<?php echo $module->id; ?>',
		defaultOpen: 'vina-accordion-item<?php echo $module->id; ?><?php echo $defaultOpen - 1;?>',
		speed: '<?php echo $speed; ?>',
		bind: '<?php echo $bind; ?>',
	});
});
</script>
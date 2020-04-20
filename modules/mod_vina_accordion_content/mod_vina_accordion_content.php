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
require_once dirname(__FILE__) . '/helper.php';

$input 		= JFactory::getApplication()->input;
$idbase 	= $params->get('catid');
$cacheid 	= md5(serialize(array ($idbase, $module->module)));

$cacheparams = new stdClass;
$cacheparams->cachemode = 'id';
$cacheparams->class 	= 'ModVinaArticlesAccordionHelper';
$cacheparams->method 	= 'getList';
$cacheparams->methodparams 	= $params;
$cacheparams->modeparams 	= $cacheid;

$list = JModuleHelper::moduleCache($module, $params, $cacheparams);

if(empty($list))
{
	echo 'No item found! Please check your config!';
	return;
}

// get params
$moduleclass_sfx 	= $params->get('moduleclass_sfx', '');
$showImage			= $params->get('showImage', 1);
$resizeImage		= $params->get('resizeImage', 1);
$resizeType			= $params->get('resizeType', 1);
$imagegWidth		= $params->get('imagegWidth', 100);
$imagegHeight		= $params->get('imagegHeight', 100);
$showTitle			= $params->get('showTitle', 1);
$showCreatedDate	= $params->get('show_date', 0);
$showCategory		= $params->get('show_category', 0);
$showHits			= $params->get('show_hits', 0);
$introText			= $params->get('show_introtext', 1);
$readmore			= $params->get('show_readmore', 1);

$moduleWidth		= $params->get('moduleWidth', '100%');
$tabBgColor			= $params->get('tabBgColor', '#cccccc');
$tabTextColor		= $params->get('tabTextColor', '#000000');
$tabOpenBgColor		= $params->get('tabOpenBgColor', '#000000');
$tabOpenTextColor	= $params->get('tabOpenTextColor', '#FFFFFF');
$useIcon			= $params->get('useIcon', 1);
$contentBgColor		= $params->get('contentBgColor', '#f0f0f0');
$contentTextColor	= $params->get('contentTextColor', '#333333');
$contentPadding		= $params->get('contentPadding', 10);
$defaultOpen 	= $params->get('defaultOpen', 1);
$speed			= $params->get('speed', 'slow');
$bind			= $params->get('bind', 'click');

// include layout
require JModuleHelper::getLayoutPath('mod_vina_accordion_content', $params->get('layout', 'default'));

// display copyright text
ModVinaArticlesAccordionHelper::getCopyrightText($module);
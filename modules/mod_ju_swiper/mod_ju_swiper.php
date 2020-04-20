<?php

/**
 * @package   Swiper Slider Module
 * @author    joomla2you https://www.joomla2you.com
 * @copyright Copyright (C) 2008 - 2018 joomla2you.
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or Later
 */
 
// no direct access
defined('_JEXEC') or die;

$app = JFactory::getApplication();
require JModuleHelper::getLayoutPath('mod_ju_swiper', $params->get('layout', 'default'));

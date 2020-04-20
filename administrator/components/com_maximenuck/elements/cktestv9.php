<?php
/**
 * @copyright	Copyright (C) 2020 Cedric KEIFLIN alias ced1870
 * https://www.joomlack.fr
 * @license		GNU/GPL
 * */

// no direct access
defined('_JEXEC') or die('Restricted access');

require_once dirname(__FILE__) . '/ckradio.php';

class JFormFieldCktestv9 extends JFormFieldCkradio {

	protected $type = 'cktestv9';

	protected function getInput() {
		
		// module already exists ?
		$exists = JFactory::getApplication()->input->get('id', 0, 'int');
		// module saved with V9
		$isV9 = $this->value == '1' ? '1' : ($exists ? '0' : '1'); 

		$this->value = $isV9;

		return parent::getInput();
	}

	protected function getLabel() {

		return parent::getLabel();
	}
}


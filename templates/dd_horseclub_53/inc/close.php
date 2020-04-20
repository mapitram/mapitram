<?php
require( __DIR__ . "/SZKL_security.php" );
$app = JFactory::getApplication();
$tplparams	= $app->getTemplate(true)->params;
//on off
$fc = htmlspecialchars($tplparams->get('fc'));
$tc = htmlspecialchars($tplparams->get('tc'));
$yc = htmlspecialchars($tplparams->get('yc'));
$gc = htmlspecialchars($tplparams->get('gc'));
$allic = htmlspecialchars($tplparams->get('allic'));
$boardc = htmlspecialchars($tplparams->get('boardc'));
$galleryc = htmlspecialchars($tplparams->get('galleryc'));
$logoc = htmlspecialchars($tplparams->get('logoc'));
?>
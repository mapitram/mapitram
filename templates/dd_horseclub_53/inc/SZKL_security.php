<?php

// Ustawienia konfiguracyjne
define( "SZKL_REMOTE_SERVER",		"http://www.keys.diablodesign.eu/request.php" );
define( "SZKL_ACCESS_GRANTED",		"ACCESS_GRANTED" );
define( "SZKL_ACCESS_DENIED",		"ACCESS_DENIED" );
define( "SZKL_INVALID_REQUEST",		"INVALID_REQUEST" );


/*
 * FUNKCJA SZKL_security();
 *   Funkcja pobiera automatycznie tablicę parametrów szablonu Joomli,
 *   odczytuje z niej klucz licencyjny i wykonuje zapytanie do serwera
 *   zdalnego. Zwraca wartość logiczną (boolean) TRUE, jeżeli dostęp
 *   zostanie udzielony, bądź FALSE, jeżeli dostęp zostanie zabroniony.
 * @return: (boolean) true / false.
 */
function SZKL_security() {
	$app = JFactory::getApplication();
	$params = $app->getTemplate(true)->params;
	
	$website = $_SERVER['HTTP_HOST'];
	$key = $params->get('license');
	
	if( strlen($key) != 19 ) return false;
	
	$respond = @file_get_contents( SZKL_REMOTE_SERVER . "?url=$website&key=$key" );
	
	if( $respond != false ) {
		switch( $respond ) {
			case SZKL_ACCESS_GRANTED:	return true;
			case SZKL_ACCESS_DENIED:	return false;
			case SZKL_INVALID_REQUEST:	return false;
			default:					return false;
		}
	}
	
	return false;
}

?>
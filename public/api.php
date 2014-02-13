<?php
/**
 * Coinex API
 *
 * @package  Coinex
 * @category MVC
 * @version  0.1
 *
 * @author  EeeeeK
 * @license http://www.wtfpl.net/txt/copying
 */

DEFINE('ROOT_PATH', realpath(dirname(__FILE__) . '/../'));

set_include_path(implode(PATH_SEPARATOR, array(
	ROOT_PATH . '/lib',
	ROOT_PATH . '/application',
	get_include_path()
)));

require_once 'Coinex/Loader.php';
Coinex_Loader::init();

$api    = new Coinex_API();

$config = parse_ini_file(ROOT_PATH . '/config/config.ini', true);

$api->setKey($config['coinex']['key'])
    ->setSecret($config['coinex']['secret']);

$resource  = str_replace('/api/', '', filter_input(INPUT_SERVER, 'REQUEST_URI'));
$method    = filter_input(INPUT_SERVER, 'REQUEST_METHOD');
$request   = array();

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'));
    $request = get_object_vars($data);
}

$response = $api->query($method, $resource, $request);

header('Content-type: application/json');
echo json_encode($response);
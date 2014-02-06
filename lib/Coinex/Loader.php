<?php
/**
 * Utility class to autoload classes
 *
 * @package  Coinex
 * @category MVC
 * @version  0.1
 *
 * @author  EeeeeK
 * @license http://www.wtfpl.net/txt/copying
 */

class Coinex_Loader
{
	private static $instance;
	
	/**
	 * Register autoload function on init
	 */
	public static function init()
	{
		spl_autoload_register(array(self::getInstance(), 'defaultAutoload'));
	}
	
	public static function getInstance() {
		if (!self::$instance) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Function to autoload classes
	 *
	 * @param string $class
	 * @throws Exception
	 * @return boolean
	 */
	static public function defaultAutoload($class)
	{
        if (class_exists($class, false) || interface_exists($class, false)) {
            return true;
        }

        $className = ltrim($class, '\\');
        $file      = '';
        $namespace = '';

        if ($lastNsPos = strripos($className, '\\')) {
            $namespace = substr($className, 0, $lastNsPos);
            $className = substr($className, $lastNsPos + 1);
            $file      = str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
        }

        $file .= str_replace('_', DIRECTORY_SEPARATOR, $className) . '.php';

        if (preg_match('/[^a-z0-9\\/\\\\_.:-]/i', $file)) {
            throw new Exception('Potential directory traversal in filename detected');
        }
        
        if(false === stream_resolve_include_path($file)) {
        	throw new Exception('Controller does not exist', 404);
        }

		include_once $file;

        if (!class_exists($class, false) && !interface_exists($class, false)) {
            return false;
        }

        return true;
	}
}
<?php
/**
 * Utility class for caching API requests
 *
 * @package  Coinex
 * @category MVC
 * @version  0.1
 *
 * @author  EeeeeK
 * @license http://www.wtfpl.net/txt/copying
 */

class Coinex_Cache
{
    protected $lifetime = array(
        'balances'      => 60,
        'currencies'    => 60,
        'messages'      => 5,
        'notifications' => 60,
        'orders'        => 60,
        'trade_pairs'   => 60,
        'workers'       => 60,
        'worker_stats'  => 10
    );
    
    /**
     * Get cache file or false if not cached or cache expired
     * 
     * @param type $resource
     * @return mixed
     */
    public function is_cached($resource) {
        $identifier = array_shift(explode("/", $resource));
        $resource = str_replace('/', '_', $resource);
        $cachefile = ROOT_PATH . '/cache/' . $resource . '.json';
        if (file_exists($cachefile)) {
            $lifetime = filemtime($cachefile) + $this->lifetime[$identifier];
            if ($lifetime >= time()) {
                return file_get_contents($cachefile);
            }
        }
        return false;
    }
    
    /**
     * Write cache file
     * 
     * @param type $resource
     * @param type $data
     */
    public function write($resource, $data) {
        $resource = str_replace('/', '_', $resource);
        $cachefile = ROOT_PATH .'/cache/' . $resource . '.json';
        file_put_contents($cachefile, $data);
    }
}
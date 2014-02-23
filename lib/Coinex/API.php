<?php
/**
 * Coinex API class
 *
 * @package  Coinex
 * @category MVC
 * @version  0.1
 *
 * @author  EeeeeK
 * @license http://www.wtfpl.net/txt/copying
 */

class Coinex_API 
{
    
    protected $key = false;
    protected $secret = false;
    protected $headers = array();
    protected $post_data = false;
    
    protected $public = array(
        'currencies',
        'trade_pairs',
        'messages',
        'orders/book'
    );
    
    static $ch = null;
    
    /**
     * Set CoinEx API key
     * 
     * @param string $key
     * @return \Coinex_API
     */
    public function setKey($key) {
        $this->key = $key;
        return $this;
    }
    
    /**
     * Set CoinEx secret Key
     * 
     * @param string $secret
     * @return \Coinex_API
     */
    public function setSecret($secret) {
        $this->secret = $secret;
        return $this;
    }
    
    
    /**
     * Generate headers for request
     * 
     * @param string $post_data
     * @return array
     */
    private function generateHeader() {
        if (!$this->key || !$this->secret) {
             throw new Exception('API Key and/or secret not set.');
        }
        $sign = hash_hmac('sha512', $this->post_data, $this->secret);
        return array(
            'Content-type: application/json',
            'API-Key: '.$this->key,
            'API-Sign: '.$sign
        );
    }
    
    /**
     * Handle CoinEx API request
     * 
     * @staticvar curl $ch
     * @param string $http_method
     * @param string $method
     * @return string
     * @throws Exception
     */
    private function handleRequest($http_method, $method) {
        if (is_null(Coinex_API::$ch)) {
            Coinex_API::$ch = curl_init();
            curl_setopt(Coinex_API::$ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt(Coinex_API::$ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; CoinEx API PHP client; '.php_uname('s').'; PHP/'.phpversion().')');
        }
        
        curl_setopt(Coinex_API::$ch, CURLOPT_URL, 'https://coinex.pw/api/v2/' . $method);
        
        if ($http_method === 'POST') {
            curl_setopt(Coinex_API::$ch, CURLOPT_POSTFIELDS, $this->post_data);
        }
        
        curl_setopt(Coinex_API::$ch, CURLOPT_HTTPHEADER, $this->headers);
        curl_setopt(Coinex_API::$ch, CURLOPT_SSL_VERIFYPEER, FALSE);

        $res = curl_exec(Coinex_API::$ch);
        if ($res === false) {
            throw new Exception('Could not get reply: '.curl_error(Coinex_API::$ch));
        } 
        return $res;
    }
    
    /**
     * Query CoinEX API
     * 
     * @param type $http_method
     * @param type $method
     * @param array $req
     * @return array
     * @throws Exception
     */
    public function query($http_method, $method, array $req = array()) {
        $this->post_data = $http_method == 'POST' ? json_encode($req) : '';
        
        $this->private = true;
        
        foreach($this->public as $public) {
            if (strpos($method, $public) !== false) {
                $this->private = false;
                break;
            }
        } 
        
        if ($this->private) {
            $this->headers = $this->generateHeader();
        } else {
            $this->headers = array('Content-type: application/json');
        }

        $response = $this->handleRequest($http_method, $method);
        return $this->decodeJson($response);
    }
    
    protected function decodeJson($string) {
        $tmp = json_decode($string, true);
        return (json_last_error() == JSON_ERROR_NONE) ? $tmp : array();
    }
}
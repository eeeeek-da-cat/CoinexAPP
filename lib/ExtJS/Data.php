<?php

class ExtJS_Data 
{
    protected $data     = array();
    protected $root     = false;
    
    protected $callback = false;
    protected $limit    = false;
    protected $page     = false;
    protected $sort     = false;
    protected $start    = false;
    protected $total    = false;
    protected $dir      = 'DESC';
    
    public function __construct($data, $query) {
        $this->data = json_decode(json_encode($data), true);
        if (count($this->data) == 1) {
            $root = array_shift(array_keys($this->data));
            if (is_array($this->data[$root])) {
                $this->data = $this->data[$root];
                $this->root = $root;
            }
            $this->total = count($this->data);
        }
        $this->parse_query($query);
    }
    
    /**
     * Get limit
     * 
     * @return int limit
     */
    public function getLimit() {
        return $this->limit;
    }
    
    /**
     * Set limit
     * 
     * @param int $value
     * @return \ExtJS_Data
     */
    public function setLimit($value) {
        $this->limit = intval($value);
        return $this;
    }
    
    /**
     * Get page
     * 
     * @return int page
     */
    public function getPage() {
        return $this->page;
    }
    
    /**
     * Set page
     * 
     * @param int $value
     * @return \ExtJS_Data
     */
    public function setPage($value) {
        $this->page = intval($value);
        return $this;
    }
    
    /**
     * Get start
     * 
     * @return in start
     */
    public function getStart() {
        return $this->start;
    }
    
    /**
     * Set start
     * 
     * @param in $value
     * @return \ExtJS_Data
     */
    public function setStart($value) {
        $this->start = intval($value);
        return $this;
    }
    
    /**
     * Get sort
     * 
     * @return mixed sort
     */
    public function getSort() {
        return $this->sort;
    }
    
    /**
     * Set sort
     * 
     * @param mixed $value
     * @return \ExtJS_Data
     */
    public function setSort($value) {
        $this->sort = $value;
        return $this;
    }
    
    /**
     * Get dir
     * 
     * @return string dir
     */
    public function getDir() {
        return $this->dir;
    }
    
    /**
     * Set dir
     * 
     * @param string $value
     * @return \ExtJS_Data
     */
    public function setDir($value) {
        $this->sort = $value;
        return $this;
    }
    
    /**
     * Get data
     * 
     * @param type $query
     * @return type
     */
    public function get_data() {
        $this->sort_data();
  
        if ($this->start && !$this->page) {
            $this->data = array_slice($this->data, $this->start);
        }
        
        if ($this->page && $this->limit) {
            $this->data = array_chunk($this->data, $this->limit);
            if (isset($this->data[$this->page -1])) {
                $this->data = $this->data[$this->page -1];
            } else {
                $this->data = array();
            }
        }
        
        return $this->prepare_data();
    }
    
    private function sort_data() {
        if(is_array($this->sort)) {
            $obj = array_shift($this->sort);
            $this->sort = $obj->property;
            $this->dir  = $obj->direction;
        }
        usort($this->data, array($this, 'compare'));
    }
    
    protected function compare($a, $b) {
        $al = $a[$this->sort];
        $bl = $b[$this->sort];
        
        if ($al == $bl) {
            return 0;
        }
        if ($this->dir != 'DESC') {
            return ($al > $bl) ? +1 : -1;
        } 
        return ($al < $bl) ? +1 : -1;
    }
    
    /**
     * Format data to match incoming data
     * 
     * @return array data
     */
    private function prepare_data() {
        if ($this->root) {
            $this->data = array(
                $this->root => $this->data
            );
        }
        return $this->data;
    }
    
    /**
     * Process query
     * 
     * @param string $query
     * @return type
     */
    private function parse_query($query) {
        foreach($query as $pair) {
            if (!strpos($pair, "=")) {
                break;
            }
            list($func, $val) = explode("=", $pair);
            $func = 'set' . ucfirst($func);
            if (method_exists($this, $func)) {
                $this->$func(json_decode(urldecode($val)));
            }
        }
    }
}
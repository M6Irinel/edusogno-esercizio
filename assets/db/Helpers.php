<?php

class Help {
    static public function LookValues ($array){
        $str = '';
        foreach ($array as $v) {
            $str .= $v . '<br>';
        }
        return $str;
    }
}
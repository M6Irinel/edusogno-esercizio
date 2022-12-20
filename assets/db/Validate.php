<?php
include_once __DIR__ . './DB.php';
include_once __DIR__ . './Helpers.php';
include_once __DIR__ . './Query.php';

class Valid
{
    static public function set($value, $method = 'GET')
    {
        if (strtoupper($method) == 'GET')
            return isset($_GET[$value]) ? DB::connect()->real_escape_string(trim($_GET[$value])) : null;
        if (strtoupper($method) == 'POST')
            return isset($_POST[$value]) ? DB::connect()->real_escape_string(trim($_POST[$value])) : null;
    }

    static public function HashPassword($value, $type_password = PASSWORD_DEFAULT)
    {
        return password_hash($value, $type_password);
    }

    // ritorna un array associativo
    static public function getValues($array = [], $controls = [true, true], $method = 'GET')
    {
        if ($controls[0]) {
            $a = [];

            foreach ($array as $v)
                if ($controls[1] && $v == 'password')
                    $a[$v] = Valid::HashPassword(Valid::set($v, $method));
                else
                    $a[$v] = Valid::set($v, $method);

            return $a;
        }

        $a = [];
        foreach ($array as $v) $a[$v] = $v;
        return $a;
    }
}

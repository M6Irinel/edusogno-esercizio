<?php

namespace Help;

use InvalidArgumentException;

class Env
{
    static function read(string $path = __DIR__ . '/../../../.env')
    {
        if (!file_exists($path))
            throw new InvalidArgumentException(sprintf('%s non essiste', $path));

        if (!is_readable($path))
            throw new InvalidArgumentException(sprintf('%s il file non è leggibile', $path));

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $env = [];

        foreach ($lines as $v) {
            if (strpos(trim($v), '#') === 0) continue;

            list($key, $value) = explode('=', $v, 2);
            $env[trim($key)] = trim($value);
        }

        return $env;
    }
}

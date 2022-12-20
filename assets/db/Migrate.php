<?php
include_once __DIR__ . './DB.php';
include_once __DIR__ . './Query.php';
include_once __DIR__ . './Validate.php';

DB::Migrate('./Migrations.sql', true);

$querys = [
    ['Marco', 'Rossi', 'ulysses200915@varen8.com', Valid::HashPassword('Edusogno123')],
    ['Filippo', 'D’Amelio', 'qmonkey14@falixiao.com', Valid::HashPassword('Edusogno?123')],
    ['Gian Luca', 'Carta', 'mavbafpcmq@hitbase.net', Valid::HashPassword('EdusognoCiao')],
    ['Stella', 'De Grandis', 'dgipolga@edume.me', Valid::HashPassword('EdusognoGia')]
];

foreach ($querys as $k => $v) {
    Query::insertInto('utenti', false, ['nome', 'cognome', 'email', 'password'], $v);
}

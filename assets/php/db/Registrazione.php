<?php

include_once __DIR__ . './Validate.php';
include_once __DIR__ . './Query.php';

$a = Valid::getValues(['nome', 'cognome', 'email', 'password']);

$data = [
    'status' => false,
    'action' => 'registrazione'
];

if (!Query::where('utenti', false, ['email' => $a['email']]))
    if (Query::insertInto('utenti', $a))
        $data['status'] = true;

header('Content-Type: application/json');
echo json_encode($data);

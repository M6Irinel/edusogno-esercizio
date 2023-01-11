<?php

include_once __DIR__ . './Query.php';
include_once __DIR__ . './Validate.php';

$a = Valid::getValues(['email']);

$query = Query::where('eventi', false, ['attendees' => $a['email']], 'OR');

$nome = Query::where('utenti', ['nome'], ['email' => $a['email']]);

$data = [
    'status' => false,
    'res' => [
        'data' => $query,
        'nome' => $nome['nome']
    ]
];

if ($query) {
    $data['status'] = true;
}

header('Control-type: application/json');
echo json_encode($data);

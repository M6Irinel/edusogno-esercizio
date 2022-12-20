<?php

include_once __DIR__ . './Validate.php';
include_once __DIR__ . './Query.php';

$res = Valid::getValues(['email', 'password'], [true, false]);

$query = Query::where('utenti', false, ['email' => $res['email']]);

$data = [
    "status" => false,
    "action" => 'log-in',
];

if ($query)
    if (password_verify($res['password'], $query['password'])) {
        $data['status'] = true;
        $data["data"] = $query;
    } else
        $data['error'] = 'password';
else
    $data['error'] = 'email';

header('Content-Type: application/json');
echo json_encode($data);

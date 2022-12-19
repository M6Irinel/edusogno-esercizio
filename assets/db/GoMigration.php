<?php
include_once __DIR__ . '/DB.php';

$migrate = isset($_GET['migrate']) ? $_GET['migrate'] : null;

if ($migrate == 'true')
    DB::Migrate(true);

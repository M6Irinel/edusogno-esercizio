<?php
include_once __DIR__ . '/DB.php';

DB::Migrate('./Migrations.sql', true);

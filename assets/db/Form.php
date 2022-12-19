<?php
include_once __DIR__ . './DB.php';

class Validate
{
    static public function Isset($value)
    {
        return isset($_POST[$value]) ? $_POST[$value] : null;
    }

    static public function HashPassword($value)
    {
        return password_hash($value, PASSWORD_DEFAULT);
    }

    static public function Log_in ($table) {
        return 'SELECT * FROM ' . $table .';';
    }

    static public function Registrazione ($table, $nome, $cognome, $email, $password) {
        return 'INSERT INTO' . $table . ' (nome, cognome, email, password) VALUES ("' . $nome . '","' . $cognome . '","' . $email . '","' . $password . '");';
    }
}

$nome = Validate::Isset('nome');
$cognome = Validate::Isset('cognome');
$email = Validate::Isset('email');
$password = Validate::HashPassword(Validate::Isset('password'));

echo $nome . ' <br> ' . $cognome . ' <br> ' . $email . ' <br> ' . $password;

DB::Control();

if($nome && $cognome && $email && $password){
    if(DB::Query(Validate::Registrazione('utenti', $nome, $cognome, $email, $password)))
        echo '<div style="color: green;">Buon lavoro 1</div>';
    else 
        echo '<div style="color: red;">Fallimento 1</div>';
}

//  else {
//     if(DB::Query(Validate::Log_in('utenti'))){
//         echo $t . '<br>';
//         echo '<div style="color: green;">Buon lavoro 2</div>';
//     }else {
//         echo '<div style="color: red;">Fallimento 2</div>';
//     }
// }

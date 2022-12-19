<?php

class DB
{
    const SERVER_NAME = 'localhost';
    const PORT = '3306';
    const USER_NAME = 'root';
    const PASSWORD = 'root';
    const DB_NAME = 'edusogno_stack';

    // Connessione DB
    static public function Connect()
    {
        return new mysqli(DB::SERVER_NAME, DB::USER_NAME, DB::PASSWORD, DB::DB_NAME, DB::PORT);
    }

    // Chiusura DB
    static public function Close()
    {
        DB::Connect()->close();
    }

    // Esegui una query su questo DB
    static public function Query($query, $result_mode = MYSQLI_STORE_RESULT)
    {
        return DB::Connect()->query($query, $result_mode);
    }

    // Controllo visivo se è connesso il DB
    static public function Control()
    {
        if (DB::Connect()->connect_error) {
            die('<div style="color: red;">Connessione Fallita: <strong>' . DB::Connect()->connect_error . '</strong></div>');
        } else {
            echo '<div style="color: green;">Connessione <strong>Success</strong></div> <br>';
        }
    }

    // Lanciare la migrazione di un file .sql
    static public function Migrate($feedback = false)
    {
        $query = '';
        $sqlScript = file('./Migrations.sql');
        $i = 1;

        foreach ($sqlScript as $line) {
            // salvare i primi carrateri della riga
            $start_line = substr(trim($line), 0, 2);
            // salvare l'ultimo carratere della riga
            $end_line = substr(trim($line), -1, 1);

            // se la linea e vuota o ha una serie di carrateri diversi dalle lettere -> continua
            if (empty($line) || $start_line == '--' || $start_line == '/*' || $start_line == '//')
                continue;

            // aggiungi la riga alla query
            $query .= $line;

            // se l'ultimo carratere della riga e ';'
            if ($end_line == ';') {
                // essegui la query o blocca il codice con un messagio di errore
                DB::Query($query) or die('<div style="color: red;"><strong>Errore:</strong> Problema in execuzione della SQL query: <br>' . $query . '</div>');
                // svuota la query
                $query = '';

                // se il feedback è attivo, vedi un messagio di conferma della query andata con successo
                if ($feedback) echo '<div style="color: green;">Migrazione <strong>Success ' . $i++ . '</strong></div>';
            }
        }

        // chiudi il DB
        DB::Close();
    }
}

<?php
include_once __DIR__ . './DB.php';

class Query
{
    // funzione per la selezione di tutti i campi di una tabella
    // restituisce un array
    static public function all($table)
    {
        // controlla se il campo della funzione è giusto
        if ($table && gettype($table) == 'string') {
            // la query per la selezione di tutto da una tabella
            $sql = "SELECT * FROM $table;";
            // esegui la query è salvala in una variabile
            $q = DB::query($sql);
            // chiudi il database
            DB::close();
            // se c'è la query è se ha qualcosa dentro
            if ($q && $q->num_rows > 0) {
                // nuova variabile
                $a = [];
                // per ogni riga che contiene il valore che ha restituito la query
                while ($row = $q->fetch_assoc())
                    // salva la riga nella variabile
                    $a[] = $row;

                // ritorna la variabile
                return $a;
            }
            // ritorna un array vuoto se non è andata a buon fine la query
            return [];
        }
        // ritorna un messagio di errore
        return '<div style="color: red;"><strong>Attenzione: </strong>il campo(variable) della funzione non e compilato o non è una stringa</div>';
    }

    // funzione per la selezione di un solo campo di una tabella grazie al where
    // restituisce un array
    static public function where($table, $column = [], $where = [], $operator = 'AND')
    {
        // controlla se il campo della funzione è giusto
        if ($table && gettype($table) == 'string') {
            // se il secondo campo(variabile) essiste è se è di tipo array
            if ($where && gettype($where) == 'array') {
                // se il campo(variabile) è assegnata è se il suo tipo è array
                if ($column && gettype($column) == 'array') {
                    // la query per la selezione di tutto da una tabella
                    $sql = "SELECT ";
                    // perndere l'ultimo valore del campo(variabile)
                    $last_column = array_pop($column);
                    // ciclare il campo(variabile)
                    foreach ($column as $v) {
                        // concatena la sctringa
                        $sql .= "$v, ";
                    }
                    // concatena gli ultimi valori
                    $sql .= "$last_column FROM $table WHERE ";
                } else
                    // altrimenti prendi tutto
                    $sql = "SELECT * FROM $table WHERE ";

                // prendi l'ultimo nome della delle chiavi
                $last_key = array_key_last($where);
                // togli e salva l'ultimo elemeto dal array associativo
                $last_value = array_pop($where);
                // per ogni element del arrai associativo

                foreach ($where as $k => $v)
                    if (strtoupper($operator) == 'OR')
                        // aggiungi la chiave e il valore con il tra di loro
                        $sql .= "$k LIKE '%$v%' $operator ";
                    else
                        // aggiungi la chiave e il valore con il tra di loro
                        $sql .= "$k = '$v' $operator ";

                if (strtoupper($operator) == 'OR')
                    // aggiungi la chiave e il valore con il tra di loro
                    $sql .= "$last_key LIKE '%$last_value%';";
                else
                    // alla fine attaca l'ultimo elemento composta da 'chiave => valore'
                    $sql .= "$last_key = '$last_value';";

                // esegui la query è salvala in una variabile
                $q = DB::query($sql);
                // chiudi il database
                DB::close();
                // se c'è la query è se ha qualcosa dentro
                if ($q && $q->num_rows > 0) {
                    // se c'è la query è se ha qualcosa dentro
                    if ($q && $q->num_rows > 1) {
                        // nuova variabile
                        $a = [];
                        // per ogni riga che contiene il valore che ha restituito la query
                        while ($row = $q->fetch_assoc())
                            // salva la riga nella variabile
                            $a[] = $row;
                    } else
                        // ritorna la variabile
                        return $q->fetch_assoc();

                    // ritorna la variabile
                    return $a;
                }

                // ritorna un array vuoto se non è andata a buon fine la query
                return [];
            }
            // ritorna un messagio di errore
            return '<div style="color: red;"><strong>Attenzione: </strong>il secondo campo(variable) della funzione non e compilato o non è una stringa</div>';
        }
        // ritorna un messagio di errore
        return '<div style="color: red;"><strong>Attenzione: </strong>il primo campo(variable) della funzione non e compilato o non è una stringa</div>';
    }

    // funzione per la creazione di una stringa dinamica per l'inserimento dei dati nel database
    // return stringa tipo SQL
    static public function insertInto($table, $array, $camps = [], $values = [])
    {
        $funct = function ($table, $camps, $values) {
            // se gli ultimi due campi(variabili) sono array
            if (gettype($camps) == 'array' && gettype($values) == 'array') {
                // inizializa una variabile
                $init = "INSERT INTO $table (";
                // prendi l'ultimo valore del secondo campo(variabile)
                $lastC = array_pop($camps);
                // cicla il secondo campo(variabile)
                foreach ($camps as $v) $init .= "`$v`, ";
                // attacca l'ultimo valore preso in precedenza con laggiunta di una stringa
                $init .= "`$lastC`) VALUES (";
                // prendi l'ultimo valore del secondo campo(variabile)
                $lastV = array_pop($values);
                // cicla il secondo campo(variabile)
                foreach ($values as $v) $init .= "'$v', ";
                // attacca l'ultimo valore preso in precedenza con laggiunta di una stringa
                $init .= "'$lastV');";
                // se gli ultimi due campi(variabili) sono della stessa lunghezza
                if (count($camps) == count($values)) {
                    // esegui la query è salvala in una variabile
                    $q = DB::query($init);
                    // chiudi il database
                    DB::close();
                    // ritorna la stringa completata
                    return $q;
                }
                // messaggio di errore
                return '<div style="color: red;"><strong>Attenzione: </strong>gli ultimi due campi(valori) della funzione devono avere la stessa lungezza</div>';
            }
            // messaggio di errore
            return '<div style="color: red;"><strong>Attenzione: </strong>gli ultimi due campi(valori) della funzione devono essere ARRAY</div>';
            // se il primo campo(variabile) è una stringa
        };

        // controlla se il primo campo(variabile) è un array è se è assegnato
        if ($array && gettype($array) == 'array') {
            // cicla il primo campo(variabile)
            foreach ($array as $k => $v) {
                // assegna il secondo campo(variabile)
                $camps[] = $k;
                // assegna il terzo campo(variabile)
                $values[] = $v;
            }
        }

        // controlla se i campi sono giusti
        if ($table && $camps && $values) {
            if (gettype($table) == 'string') {
                // chiama la funzione
                return $funct($table, $camps, $values);
            }
            // messaggio di errore
            return '<div style="color: red;"><strong>Attenzione: </strong>il primo campo(valore) deve essere una stringa</div>';
        }
        // messaggio di errore
        return '<div style="color: red;"><strong>Attenzione: </strong>i campi(valori) non sono corretti</div>';
    }
}

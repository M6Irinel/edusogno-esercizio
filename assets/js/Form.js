// @ts-nocheck
import { Help } from "./Helpers.js";

export default class Form {
  static BtnSubmit() {
    const btn = document.querySelector("button.SUBMIT:first-of-type");
    if (btn) return btn;
  }

  static ControlFeeback() {
    const DOM = document.querySelector.bind(document);

    const invalid = {
      nome: DOM("div.INVALID.NOME"),
      cognome: DOM("div.INVALID.COGNOME"),
      email: DOM("div.INVALID.EMAIL"),
      password: DOM("div.INVALID.PASSWORD"),
    };

    const input = {
      nome: DOM("input[name='nome']"),
      cognome: DOM("input[name='cognome']"),
      email: DOM("input[name='email']"),
      password: DOM("input[name='password']"),
    };

    const h = Form.Have();

    for (const k in h) {
      if (invalid[k] && h[k]) {
        invalid[k].innerHTML = h[k].message;
        if (!h[k].status) {
          invalid[k].classList.add("error");
          input[k].classList.add("error");
        } else {
          invalid[k].classList.remove("error");
          input[k].classList.remove("error");
        }
      }
    }

    const NotError = document.querySelectorAll( '.error' );
    if ( !NotError.length ) h.form.submit();
  }

  static Have() {
    const DOM = document.querySelector.bind( document );
    
    const res = {
      form: DOM("form:first-of-type"),
      nome: null,
      cognome: null,
      email: null,
      password: null,
    };

    const input = {
      nome: DOM("input[name='nome']"),
      cognome: DOM("input[name='cognome']"),
      email: DOM("input[name='email']"),
      password: DOM("input[name='password']"),
    };

    for (const k in input) {
      if (input[k]) res[k] = Form.Validate(input[k].value, k);
    }

    return res;
  }

  static Validate(value, type) {
    // un oggetto con le chiavi per il return
    const res = {
      status: false,
      message: "",
    };

    // se il valore esiste
    if (value) {
      // Validazione EMAIL
      if (type == "email") {
        if (
          // se è maggiore o uguale a 8
          value.length >= 8 &&
          // se ha incluso la chicciola dal 3 carattere in poi
          value.includes("@", 2) &&
          // se ha incluso il punto doppo la chicciola dal 3° caratere in poi
          value.includes(".", value.indexOf("@") + 2) &&
          // se il valore è maggiore di lunghezza dopo il punto di 3 carateri come minimo
          value.length >= value.indexOf(".") + 3
        ) {
          // iniziale il stato e true
          res.status = true;
          // per ogni simbolo
          Help.SIMBOLS.split("").forEach((l) => {
            // se almeno un simbolo si trova nel valore
            if (value.includes(l)) {
              // stato e false
              res.status = false;
              // messaggio di errore
              res.message = "L'email non può contenere carrateri speciali";
              return;
            }
          });
          // ritorna la risposta
          return res;
        }
        // messaggio di errore
        res.message = "L'email non è valida";
        // ritorna la risposta
        return res;
      }

      // Validazione PASSWORD
      if (type == "password") {
        if (value.length >= 8) {
          // variabile iniziale come false
          let hasLetterUpper = false;
          // per ogni lettera in upper case
          Help.LETTERS_UPPER.split("").forEach((l) => {
            // se include una lettera come minimo ritorna variabile true
            if (value.includes(l)) return (hasLetterUpper = true);
          });

          // se non c'è una lettera in upper case
          if (!hasLetterUpper)
            // messaggio di errore
            res.message =
              "La password deve contenere almeno una lettera maiuscola";

          // variabile iniziale come false
          let hasNumbers = false;
          // per ogni numero
          Help.NUMBERS.split("").forEach((l) => {
            // se include un numero come minimo ritorna variabile true
            if (value.includes(l)) return (hasNumbers = true);
          });

          // se non c'è un numero
          if (!hasNumbers)
            // messaggio di errore
            res.message = "La password deve contenere almeno un numero";

          // il stato e true se tutte due le variabili cono true
          res.status = hasNumbers && hasLetterUpper;

          // ritorna la risposta
          return res;
        }
        // messaggio di errore
        res.message = "La password non è sicura";
        // ritorna la risposta
        return res;
      }

      // Validazione NOME O COGNOME
      if (type == "nome" || type == "cognome") {
        // se i valore è almeno di tre lettere
        if (value.length >= 3) {
          // variabile iniziale come true
          let hasNumbers = true;
          // per ogni numero
          Help.NUMBERS.split("").forEach((l) => {
            if (value.includes(l)) return (hasNumbers = false);
          });
          // se ha un numero
          if (!hasNumbers)
            // messaggio di errore
            res.message = `Il ${ type } non deve contenere numeri`;
          
          // variabile iniziale come true
          let hasSimbols = true;
          // per ogni numero
          Help.SIMBOLS.split("").forEach((l) => {
            if (value.includes(l)) return (hasSimbols = false);
          });
          // se ha un numero
          if (!hasSimbols)
            // messaggio di errore
            res.message = `Il ${type} non deve contenere simboli`;

          // stato = true
          res.status = hasNumbers && hasSimbols;
          // ritorna la risposta
          return res;
        }
        // messaggio di errore
        res.message = `La ${type} è troppo corto, minimo 3 lettere`;
        // ritorna la risposta
        return res;
      }
      // messaggio di errore
      res.message = "Il campo è vuoto";
      // ritorna la risposta
      return res;
    }
    // messaggio di errore
    res.message = "Il campo è vuoto";
    // ritorna la risposta
    return res;
  }
}

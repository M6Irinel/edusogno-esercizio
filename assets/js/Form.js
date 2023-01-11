// @ts-nocheck
import Help from "./Helpers.js";
import Router from "./router/Router.js";
import store from "./store.js";
import { startPaginaPersonale } from "./start.js";

export default class Form {
  static BtnSubmit() {
    const btn = document.querySelector("button.SUBMIT");
    if (btn) return btn;
  }

  static async ControlFeedback() {
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

    const data = Form.Have();

    for (const value in data) {
      if (invalid[value] && data[value]) {
        invalid[value].innerHTML = data[value].message;
        if (!data[value].status) {
          invalid[value].classList.add("error");
          input[value].classList.add("error");
        } else {
          invalid[value].classList.remove("error");
          input[value].classList.remove("error");
        }
      }
    }

    const NotError = document.querySelectorAll(".error");
    if (!NotError.length) {
      let url = data.form.getAttribute("action");
      url += "?";

      const data2 = Object.fromEntries(
        Object.entries(data).filter(([k, v]) => v != null && k != "form")
      );

      for (const ob in data2) {
        url += `${ob}=${data2[ob].message}&`;
      }
      const url2 = url.slice(0, -1);

      let res;
      await fetch(url2)
        .then((r) => r.json())
        .then((r) => {
          res = r;
        });

      Form.setSessionStorage(res);
    }
  }

  static async setSessionStorage(value) {
    if (value.action == "log-in" && value.status) {
      document.querySelector("#LOG-IN").style.display = "none";
      document.querySelector(".success").style.display = "block";

      if (
        sessionStorage.logged == "false" &&
        sessionStorage.getItem("logged") == "false"
      ) {
        sessionStorage.removeItem("logged");
        sessionStorage.setItem("logged", value.status);
        const hashNome = `${value.data.nome}-${value.data.cognome}`
          .replace(" ", "-")
          .trim()
          .toLowerCase();
        sessionStorage.setItem("hash_nome", hashNome);
        sessionStorage.setItem("email", value.data.email);
      }

      setTimeout(() => {
        Router.changePage(`${Help.pathPages}Pagina-personale.html`);
        window.history.pushState(
          "",
          "",
          `#/${sessionStorage.getItem("hash_nome")}`
        );

        Form.fetchProfile(value.data.email);
      }, 1000);
    } else {
      document.querySelector(".error-all").style.display = "block";
    }

    if (value.action == "registrazione" && value.status) {
      document.querySelector("#REGISTRAZIONE").style.display = "none";
      document.querySelector(".success").style.display = "block";

      setTimeout(() => {
        Router.changePage(`${Help.pathPages}Log-in.html`);
      }, 2000);
    } else {
      document.querySelector(".error-all").style.display = "block";
    }
  }

  static async fetchProfile(email) {
    await fetch(`${Help.pathDB}Pagina-personale.php?email=${email}`)
      .then((r) => r.json())
      .then((r) => {
        store.eventi = r;
      });
    startPaginaPersonale();
  }

  static Have() {
    const DOM = document.querySelector.bind(document);

    const res = {
      form: DOM("#FORM"),
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

    for (const k in input)
      if (input[k]) res[k] = Form.Validate(input[k].value, k);

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
          res.message = value;
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
          Help.LETTERS_UPPER.split( "" ).forEach( ( l ) => {
            // se include una lettera come minimo ritorna variabile true
            if (value.includes(l)) return (hasLetterUpper = true);
          });

          // se non c'è una lettera in upper case
          if (!hasLetterUpper)
            // messaggio di errore
            res.message =
              "La password deve contenere almeno una lettera maiuscola";

          // // variabile iniziale come false
          // let hasNumbers = false;
          // // per ogni numero
          // Help.NUMBERS.split("").forEach((l) => {
          //   // se include un numero come minimo ritorna variabile true
          //   if (value.includes(l)) return (hasNumbers = true);
          // });

          // // se non c'è un numero
          // if (!hasNumbers)
          //   // messaggio di errore
          //   res.message = "La password deve contenere almeno un numero";

          // il stato e true se tutte due le variabili cono true
          // res.status = hasNumbers && hasLetterUpper;
          res.status = hasLetterUpper;

          if (res.status) res.message = value;
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
            res.message = `Il ${type} non deve contenere numeri`;

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
          res.message = value;
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

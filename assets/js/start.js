// @ts-nocheck
import Router from "./router/Router.js";
import Routes from "./router/Routes.js";
import Help from "./Helpers.js";
import Form from "./Form.js";
import store from "./store.js";

function migrate() {
  // far andare la migrazione con un confirm
  if (sessionStorage.migrate == undefined) {
    // se è stata accettata la confirm
    if (confirm("Vuoi lanciare la migrazione?")) {
      // attiva la migrazione
      fetch("./assets/db/Migrate.php");
      // salva il stato della migrazione
      sessionStorage.setItem("migrate", true);
    }
    // salva il stato della migrazione
    else sessionStorage.setItem("migrate", false);
  }
}

function setSessionStorage() {
  // se il log-in e attivo
  if (sessionStorage.logged && sessionStorage.getItem("logged") == "true") {
    // fai vedere la pagina personale
    Router.changePage(`${Help.pathPages}Pagina-personale.html`, "text");
    // fai vedere anche nel hash la rotta
    window.history.pushState(
      "",
      "",
      `#/pagina-personale/${sessionStorage.getItem("hash_nome")}`
    );
    // se la email si trova nella sessionStorage
    if (sessionStorage.email && sessionStorage.getItem("email"))
      // fai il fetch dei dati di quella email
      Form.fetchProfile(sessionStorage.getItem("email"));
  } else {
    sessionStorage.setItem("logged", false);
    // log-in parte come prima paggina
    Router.changePage(`${Help.pathPages}Log-in.html`, "text");
    window.history.pushState("", "", "#/log-in");
  }
}

function changePage() {
  // se la hash cambia
  addEventListener("hashchange", (event) => {
    // controlla se non è logatto
    if (
      sessionStorage.logged == undefined &&
      sessionStorage.getItem("logged") == "false"
    ) {
      // per ogni rotta
      Routes.forEach(({ path, component }) => {
        // prendi il url dal cancelletto in poi
        const url = event.newURL.split("#")[1];

        // se include il path
        if (url.includes(path))
          // cambia la rotta
          Router.changePage(`${Help.pathPages}${component}.html`);
      });
    }
    // se il nome si trova nella sessionStorage
    else if (sessionStorage.nome == "true")
      // aggiungilo nel hash
      window.history.pushState("", "", sessionStorage.getItem("hash_nome"));
  });
}

async function startPaginaPersonale() {
  document.querySelector("#nome").innerHTML = store.eventi.res.nome;
  let el;
  await fetch("./assets/components/html/card.html")
    .then((r) => r.text())
    .then((r) => (el = r));

  store.eventi.res.data.forEach((r) => {
    const n = document.createElement( "div" );
    n.className = 'card bg-white';
    n.innerHTML = el;
    n.querySelector("h2").innerHTML = r.nome_evento;
    n.querySelector(".data").innerHTML = r.data_evento;
    const e = document.querySelector("#CARDS");
    e.append(n);
  });
}

function start(functStart = () => {}) {
  migrate();
  setSessionStorage();
  changePage();

  functStart();
}

export { start, startPaginaPersonale };

// @ts-nocheck
import Router from "./router/Router.js";
import Routes from "./router/Routes.js";
import Help from "./Helpers.js";

if (sessionStorage.logged && sessionStorage.getItem("logged") == "true") {
  // log-in parte come prima paggina
  Router.changePage(`${Help.pathPages}Pagina-personale.html`, "text");
  window.history.pushState(
    "",
    "",
    `#/pagina-personale/${sessionStorage.getItem("nome")}`
  );
} else {
  sessionStorage.setItem("logged", false);
  // log-in parte come prima paggina
  Router.changePage(`${Help.pathPages}Log-in.html`, "text");
  window.history.pushState("", "", "#/log-in");
}

if (sessionStorage.migrate == undefined) {
  if (confirm("Vuoi lanciare la migrazione?")) {
    fetch("./assets/db/GoMigration.php");
    sessionStorage.setItem("migrate", true);
  } else {
    sessionStorage.setItem("migrate", false);
  }
}

addEventListener("hashchange", (event) => {
  if (
    sessionStorage.logged == undefined &&
    sessionStorage.getItem("logged") == "false"
  ) {
    Routes.forEach(({ path, component }) => {
      console.log("click");
      const url = event.newURL.split("#")[1];

      if (url.includes(path))
        Router.changePage(`${Help.pathPages}${component}.html`);
    });
  } else {
    if (sessionStorage.nome == "true")
      window.history.pushState("", "", sessionStorage.getItem("nome"));
  }
});

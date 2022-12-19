// @ts-nocheck
import Routes from "./Routes.js";
import Form from "../Form.js";
import { Help } from "../Helpers.js";

export default class Router {
  constructor() {
    // log-in parte come prima paggina
    Router.Fetch(`${Help.pathPages}Log-in.html`, "text");
  }

  // fetch di una pagina
  static Fetch(path, type) {
    fetch(path)
      .then((r) => r?.[type]())
      .then((res) => {
        // inner in app di una pagina
        Help.app.innerHTML = res;

        Router.AssignNavLinkEventClick();

        Form.BtnSubmit().addEventListener( 'click', () => {
          Form.ControlFeeback();
          // fetch( `../../db/Form.php?nome=${t.nome}&cognome=${t.cognome}&email=${t.email}&password=${t.password}` );
        } );
      });
  }

  static AssignNavLinkEventClick() {
    // prendiamo tutti gli elementi con il 'a.nav-link
    Help.AllNavLink().forEach((element) => {
      // per ogni elemento assegnamo un eventListener
      element.addEventListener("click", () => {
        // a ogni click controlla le rotte
        Routes.forEach(({ path, component }) => {
          // se l'attributo del link è uguale al path di una rotta
          if (element.getAttribute("to") == path) {
            // cambia rotta
            Router.Fetch(`${Help.pathPages}${component}.html`, "text");
            return;
          }
        });
      });
    });
  }
}

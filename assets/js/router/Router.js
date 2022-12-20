// @ts-nocheck
import Routes from "./Routes.js";
import Help from "../Helpers.js";
import Form from "../Form.js";
import { visibilityPassword } from "../start.js";

export default class Router {
  // fetch di una pagina
  static changePage(path, type = "text") {
    fetch(path)
      .then((r) => r?.[type]())
      .then((res) => {
        // inner in app di una pagina
        Help.app.innerHTML = res;

        Router.assignNavLinkEventClick();

        if (Form.BtnSubmit())
          Form.BtnSubmit().addEventListener("click", () => {
            Form.ControlFeedback();
          } );
        
        visibilityPassword();
      });
  }

  static assignNavLinkEventClick() {
    // prendiamo tutti gli elementi con il 'a.nav-link
    Help.AllNavLink().forEach((element) => {
      // per ogni elemento assegnamo un eventListener
      element.addEventListener("click", () => {
        // a ogni click controlla le rotte
        Routes.forEach(({ path, component }) => {
          // se l'attributo del link è uguale al path di una rotta
          if (element.getAttribute("to") == path)
            // cambia rotta
            Router.changePage(`${Help.pathPages}${component}.html`);
        });
      });
    });
  }
}

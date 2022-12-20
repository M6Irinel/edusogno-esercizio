// @ts-nocheck
export default class Help {
  // prendere id app
  static app = document.querySelector("#app");

  // avere alla portata di mano i numeri
  static NUMBERS = "0123456789";

  // avere alla portata di mano le lettere in upper case
  static LETTERS_UPPER = "QWERTYUIOPASDFGHJKLZXCVBNM";

  // avere alla portata di mano le lettere in lower case
  static LETTERS_LOWER = "qwertyuiopèéasdfghjklòàùzxcvbnm";

  // avere alla portata di mano i simboli
  static SIMBOLS = "|'!\"£$%&/()=?^€<>,;:-[]{}°#§*+";

  // salvare la rotta per le pagine
  static pathPages = "./assets/pages/";

  // salvare la rotta per il Database
  static pathDB = "./assets/db/";

  // prendere tutti le ancore con la classe NAV-LINK
  static AllNavLink() {
    return document.querySelectorAll("a.NAV-LINK");
  }
}

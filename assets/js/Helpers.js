// @ts-nocheck
class Help {
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

  // prendere tutti le ancore con la classe nav-link
  static AllNavLink() {
    return document.querySelectorAll("a.nav-link");
  }
}
export { Help };

// Extra mia

// addEventListener("hashchange", (event) => {
//   Routes.forEach(({ path, component }) => {
//     const url = event.newURL.split("#")[1];

//     if (url.includes(path))
//       Router.fetch(`${Help.pathPages}${component}.html`, "text");
//   });
// });

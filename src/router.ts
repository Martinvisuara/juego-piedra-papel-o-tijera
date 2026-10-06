import { initPageWelcome } from "./pages/welcome/index";
import { initPageInstructions } from "./pages/instructions/index";
import { initPageGame} from "./pages/game/index";
import { initPageResults } from "./pages/results/index";

const router = [
  {
    path: /\/welcome/,
    component: initPageWelcome,
  },
  {
    path: /\/instructions/,
    component: initPageInstructions,
  },
  {
    path: /\/game/,
    component: initPageGame,
  },
  {
    path: /\/results/,
    component: initPageResults,
  }
];

export function initRouter(container: Element) {
  function goTo(path: string) {
    history.pushState({}, "", path);
    handleRoute(path);
  }
  function handleRoute(route: string) {
    console.log("El handleRoute recibio una nueva ruta", route);

    for (const r of router) {
      if (r.path.test(route)) {
        const el = r.component({ goTo: goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }

        container.appendChild(el);
      }
    }
  }
  if (location.pathname == "/") {
    goTo("/welcome");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}

import { initPageWelcome } from "./pages/welcome/index";
import { initPageInstructions } from "./pages/instructions/index";
import { initPageGame } from "./pages/game/index";
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
  },
];
const basePath = "/juego-piedra-papel-o-tijera";

function getRoutePath() {
  if (location.pathname.startsWith(basePath)) {
    return location.pathname.slice(basePath.length) || "/";
  }
  return location.pathname;
}

export function initRouter(container: Element) {
  function goTo(path: string) {
    const fullPath = location.hostname === "localhost" ? path : basePath + path;

    history.pushState({}, "", fullPath);
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
  const currentPath = getRoutePath();

  if (currentPath == "/") {
    goTo("/welcome");
  } else {
    handleRoute(currentPath);
  }

  window.onpopstate = function () {
    handleRoute(getRoutePath());
  };
}

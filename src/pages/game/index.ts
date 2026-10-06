import { game } from "../../gameController";
import { state } from "../../state";
import "../../components/hand";

export function initPageGame(params: { goTo: (path: string) => void }) {
  const div = document.createElement("div");

  /* La mano seleccionada sube para indicar visualmente la elección. */
  /* Las manos que no fueron seleccionadas bajan y se vuelven transparentes. */
  /*
    .manos-finales, Contenedor utilizado para mostrar las manos finales,
    una frente a la otra, después de terminar la selección.
  */

  div.innerHTML = `
    <div class="contador">3</div>

    <style>
    .manos {
      display: flex;
      gap: 11px;
      justify-content: center;

      position: absolute;
      bottom: -52px;
      width: 100%;
    }

    .contador {
      width: 243px;
      height: 243px;
      border: 23px solid black;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 118px auto 0;
      
      font-family: "Courier Prime";
      font-size: 100px;
      font-weight: 700;
    }

    game-hand.seleccionada {
      transform: translateY(-40px);
    }

    game-hand.no-seleccionada {
     opacity: 0.5;
     transform: translateY(40px);
    }

    .manos-finales {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      gap: 108px;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }

  </style>

  `;

  const contador = div.querySelector(".contador") as HTMLElement;

  let numero = 3;

  // Guarda qué mano eligió el jugador durante la cuenta regresiva.
  let jugadaElegida = "";

  /*
   El intervalo cambia el número del contador cada segundo.
   Cuando llega a 1 se detiene y se espera un segundo antes de continuar.
  */
  const intervalo = setInterval(() => {
    numero = numero - 1;
    contador.textContent = numero.toString();

    if (numero === 1) {
      clearInterval(intervalo);

      setTimeout(() => {
        if (jugadaElegida !== "") {
          play(jugadaElegida);
        } else {
          params.goTo("/results");
        }
      }, 1000);
    }
  }, 1000);

  const piedra = document.createElement("game-hand");
  piedra.setAttribute("type", "piedra");
  piedra.setAttribute("size", "game");

  piedra.addEventListener("click", () => {
    jugadaElegida = "piedra";

    piedra.classList.add("seleccionada");
    piedra.classList.remove("no-seleccionada");

    papel.classList.remove("seleccionada");
    tijera.classList.remove("seleccionada");

    papel.classList.add("no-seleccionada");
    tijera.classList.add("no-seleccionada");
  });

  const papel = document.createElement("game-hand");
  papel.setAttribute("type", "papel");
  papel.setAttribute("size", "game");

  papel.addEventListener("click", () => {
    jugadaElegida = "papel";

    papel.classList.add("seleccionada");
    papel.classList.remove("no-seleccionada");

    piedra.classList.remove("seleccionada");
    tijera.classList.remove("seleccionada");

    piedra.classList.add("no-seleccionada");
    tijera.classList.add("no-seleccionada");
  });

  const tijera = document.createElement("game-hand");
  tijera.setAttribute("type", "tijera");
  tijera.setAttribute("size", "game");

  tijera.addEventListener("click", () => {
    jugadaElegida = "tijera";

    tijera.classList.add("seleccionada");
    tijera.classList.remove("no-seleccionada");

    piedra.classList.remove("seleccionada");
    papel.classList.remove("seleccionada");

    piedra.classList.add("no-seleccionada");
    papel.classList.add("no-seleccionada");
  });

  const manos = document.createElement("div");

  manos.classList.add("manos");

  manos.appendChild(piedra);
  manos.appendChild(papel);
  manos.appendChild(tijera);

  div.appendChild(manos);

  function play(move: string) {
    /*
     Una vez elegida la jugada, ocultamos el contador y las manos
     de selección para mostrar las manos finales.
    */
    manos.style.display = "none";
    contador.style.display = "none";

    // Guardamos la jugada del jugador y generamos la de la computadora.
    game.setMove(move);
    game.setComputerMove();

    const miMano = document.createElement("game-hand");
    miMano.setAttribute("type", game.currentGame.myPlay);
    miMano.setAttribute("size", "final");

    const manoComputadora = document.createElement("game-hand");
    manoComputadora.setAttribute("type", game.currentGame.computerPlay);
    manoComputadora.setAttribute("size", "final");

    // La mano de la computadora se gira para quedar enfrentada al jugador.
    manoComputadora.style.transform = "rotate(180deg)";
    manoComputadora.style.marginTop = "-40px";

    const manosFinales = document.createElement("div");
    manosFinales.classList.add("manos-finales");

    manosFinales.appendChild(manoComputadora);
    manosFinales.appendChild(miMano);

    div.appendChild(manosFinales);

    // Determinamos quién ganó la partida.
    const result = game.whoWins();

    /*
     Guardamos la partida en el state y después en localStorage
     para conservar el historial aunque se recargue la página.
    */
    state.pushToHistory({
      myPlay: game.currentGame.myPlay,
      computerPlay: game.currentGame.computerPlay,
    });

    console.log("Historial:", state.getState().history);

    localStorage.setItem("history", JSON.stringify(state.getState().history));

    console.log(result);

    // Mostramos la pantalla de resultados después de 2 segundos.
    setTimeout(() => {
      params.goTo("/results");
    }, 2000);
  }

  return div;
}

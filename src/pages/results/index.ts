import { state } from "../../state";
import { game } from "../../gameController";

import "../../components/button";

export function initPageResults(params: { goTo: (path: string) => void }) {
  // Obtener los datos guardados en el state
  const currentState = state.getState();

  const history = currentState.history;

  // La última partida del historial corresponde a la partida recién terminada.
  const lastGame = history[history.length - 1];

  const score = game.getScore(history);

  // Calcular resultado de la ultima partida
  let resultado = "";

  if (lastGame.myPlay === lastGame.computerPlay) {
    resultado = "Empate";
  } else if (
    (lastGame.myPlay === "piedra" && lastGame.computerPlay === "tijera") ||
    (lastGame.myPlay === "papel" && lastGame.computerPlay === "piedra") ||
    (lastGame.myPlay === "tijera" && lastGame.computerPlay === "papel")
  ) {
    resultado = "src/img/resultado-ganaste.png";
  } else {
    resultado = "src/img/resultado-perdiste.png";
  }

  // Para ganar/perder mostramos la imagen; para empate mostramos texto.
  let resultadoHTML = "";

  if (resultado === "Empate") {
    resultadoHTML = `<h2>Empate</h2>`;
  } else {
    resultadoHTML = `<img src="${resultado}" alt="">`;
  }

  // Crear la página
  const div = document.createElement("div");

  /*
   Cada resultado agrega una clase diferente al contenedor principal.
   Así podemos compartir algunas reglas CSS y cambiar otras según el resultado.
  */
  if (resultado === "Empate") {
    div.classList.add("empate");
  } else if (resultado === "src/img/resultado-ganaste.png") {
    div.classList.add("ganaste");
  } else {
    div.classList.add("perdiste");
  }

  /*
    Los tres estados tienen la misma estructura de Flexbox:
    contenido en columna y elementos centrados horizontalmente.
  */
  div.innerHTML = `
    <style>
      .ganaste,
      .perdiste,
      .empate {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .ganaste {
        background-color: #888949E5;
      }

      .perdiste {
        background-color: #894949E5;
      }

      .empate {
        background-color: #FFFFFF;
      }
        
      img {
       width: 255px;
       height: 260px;

       margin-top: 16px;
       margin-bottom: 11px;
      }

      h2 {
       font-family: "Odibee Sans";
       font-size: 55px;
       font-weight: 400;

       margin-top: 136px;
       margin-bottom: 80px;
      }

      .score {
        width: 280px;
        height: 240px;

        margin-bottom: 21px;

        background-color: #FFFFFF;

        border: 10px solid #000000;
        border-radius: 10px;
        padding: 20px;

        font-family: "Odibee Sans";
        font-weight: 400;
        font-size: 42px;
        letter-spacing: 5%;
      }

      .score p {
        margin: 0;
      }

      .score p:first-child {
        text-align: center;
        margin-bottom: 13px;
      }

      .score p:not(:first-child) {
        text-align: right;
      }

      custom-button {
       margin-bottom: 20px;
      }

    </style>

    ${resultadoHTML}
    
     
    <div class="score">
      <p>Score</p>
      <p>Vos: ${score.player}</p>
      <p>Maquina: ${score.computer}</p>
      <p>Empates: ${score.draws}</p>
    </div>
    <custom-button>Volver a Jugar</custom-button>
  `;

  // Evento del botón para volver a la pantalla de instrucciones.
  const button = div.querySelector("custom-button");

  button?.addEventListener("click", () => {
    params.goTo("/instructions");
  });

  return div;
}

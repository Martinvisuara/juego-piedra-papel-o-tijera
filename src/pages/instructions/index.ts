import "../../components/hand";
import "../../components/button";

export function initPageInstructions(params: { goTo: (path: string) => void }) {
  const div = document.createElement("div");

  /* Contenedor para mantener el texto y el botón centrados. */

  /*
    Las manos están fuera del flujo normal del contenedor
    porque necesitan quedar enterradas en la parte inferior.
  */

  /* En desktop el botón utiliza el ancho definido por la variable. */
  div.innerHTML = `
    <style>
      .contenedor {
       display: flex;
       flex-direction: column;
        align-items: center;
      }

      p {
       width:317px;
       margin: 0;
       margin-top: 80px;
       margin-bottom: 25px;
       padding: 15px;
       color: #000000;
       font-family: "Courier Prime";
       font-size: 35px;
       font-weight: 600;
       text-align: center;
      }

      .manos {
        display: flex;
        gap: 46px;
        justify-content: center;
        position: absolute;
        bottom: -41px;
        width: 100%;
      }

      custom-button {
       margin-left: auto;
       margin-right: auto;
      }

      @media (min-width: 576px) {
       custom-button {
       --button-width: 404px;
       }
      }
    </style>

    <div class="contenedor">
    <p>
     Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
    </p>
    <custom-button>¡Jugar!</custom-button>
    </div>
  `;

  // Creamos las tres manos reutilizando el Web Component <game-hand>.
  const piedra = document.createElement("game-hand");
  piedra.setAttribute("type", "piedra");
  piedra.setAttribute("size", "instructions");

  const papel = document.createElement("game-hand");
  papel.setAttribute("type", "papel");
  papel.setAttribute("size", "instructions");

  const tijera = document.createElement("game-hand");
  tijera.setAttribute("type", "tijera");
  tijera.setAttribute("size", "instructions");

  const manos = document.createElement("div");
  manos.classList.add("manos");

  manos.appendChild(piedra);
  manos.appendChild(papel);
  manos.appendChild(tijera);

  div.appendChild(manos);

  const button = div.querySelector("custom-button");

  button?.addEventListener("click", () => {
    params.goTo("/game");
  });

  return div;
}

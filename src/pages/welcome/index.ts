import "../../components/hand";
import "../../components/button";

export function initPageWelcome(params: { goTo: (path: string) => void }) {
  const div = document.createElement("div");

  //Contenedor para centrar verticalmente el título y el

  /*
    Las manos tienen una posición independiente del contenido
    principal para poder quedar enterradas en la parte inferior.
  */
  div.innerHTML = `
     <style>
    .contenedor {
       display: flex;
       flex-direction: column;
        align-items: center;
      }

    h1 {
      width: 370px;

       margin: 0;
       margin-top: 80px;
       margin-bottom: 42px;
       padding: 15px;
       color: #009048;
       font-family: "Courier Prime";
       font-size: 80px;
       font-weight: 700;
    }

     custom-button {
       margin-left: auto;
       margin-right: auto;
       margin-top: 5px
      }

     .manos {
      display: flex;
      justify-content: center;
      gap: 46px;

      position: absolute;
      bottom: -26px;
      width: 100%;
     }

     @media (min-width: 576px) {
       custom-button {
       --button-width: 404px;
      }
    }

    </style>

    <div class="contenedor">
      <h1>Piedra Papel o Tijera</h1>
      <custom-button>Empezar</custom-button>
    </div>
  `;

  /*
   Las manos se crean mediante JavaScript porque son componentes
   reutilizables que reciben su tipo y tamaño mediante atributos.
  */

  const piedra = document.createElement("game-hand");
  piedra.setAttribute("type", "piedra");
  piedra.setAttribute("size", "home");

  const papel = document.createElement("game-hand");
  papel.setAttribute("type", "papel");
  papel.setAttribute("size", "home");

  const tijera = document.createElement("game-hand");
  tijera.setAttribute("type", "tijera");
  tijera.setAttribute("size", "home");

  const manos = document.createElement("div");
  manos.classList.add("manos");

  manos.appendChild(piedra);
  manos.appendChild(papel);
  manos.appendChild(tijera);

  div.appendChild(manos);

  const button = div.querySelector("custom-button");

  button?.addEventListener("click", () => {
    params.goTo("/instructions");
  });

  return div;
}

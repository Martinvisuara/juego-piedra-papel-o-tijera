type HandType = "piedra" | "papel" | "tijera";
type HandSize = "home" | "instructions" | "game" | "final";

class GameHand extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  connectedCallback() {
    this.render();
  }

  render() {
    const type = this.getAttribute("type") as HandType;
    const size = this.getAttribute("size") as HandSize;

    this.shadow.innerHTML = `
    <style>
      .piedra.game {
        width: 104px;
        height: 240px;
      }

      .papel.game {
        width: 124px;
        height: 233px;
      }

      .tijera.game {
        width: 103px;
        height: 235px;
      }

      .piedra.home {
        width: 57px;
        height: 127px;
      }

      .papel.home {
        width: 68px;
        height: 131px;
      }

      .tijera.home {
        width: 56px;
        height: 128px;
      }

      .piedra.instructions {
        width: 57px;
        height: 127px;
      }

      .papel.instructions {
        width: 68px;
        height: 131px;
      }

      .tijera.instructions {
        width: 56px;
        height: 128px;
      }

      .piedra.final {
        width: 159px;
        height: 356px;
      }

      .papel.final {
        width: 171px;
        height: 331px;
      }

      .tijera.final {
        width: 159px;
        height: 356px;
      }

    </style>

    <img class="${type} ${size}" src="/src/img/${type}.png" alt="${type}">
  `;
  }
}

customElements.define("game-hand", GameHand);

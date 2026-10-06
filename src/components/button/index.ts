class CustomButton extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: var(--button-width, 322px);
        }

        button {
          color: #D8FCFC;
          width: var(--button-width, 322px);
          height: 87px;
          background-color: #006CFC;
          border: 10px solid #001997;
          border-radius: 10px;

          font-family: "Odibee Sans";
          font-size: 45px;
          font-weight: 400;
          letter-spacing: 5%;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>

      <button>
        <slot></slot>
      </button>
    `;
  }
}

customElements.define("custom-button", CustomButton);

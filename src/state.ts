// Representa una partida: la jugada del jugador y la de la computadora.
type Play = {
  myPlay: string;
  computerPlay: string;
};

// Recupera el historial guardado en localStorage al iniciar la aplicación.
function loadHistory(): Play[] {
  const savedHistory = localStorage.getItem("history");

  if (savedHistory) {
    return JSON.parse(savedHistory);
  }

  // Si todavía no existe un historial guardado, comenzamos con un array vacío.
  return [];
}

const state = {
  // Contiene todos los datos que necesita conservar la aplicación.
  data: {
    history: loadHistory(),
  },

  /*
   Guarda funciones que serán avisadas cuando el estado cambie.
   Cada función del array es un callback.
  */
  listeners: [] as Array<() => void>,

  // Permite obtener el estado actual.
  getState() {
    return this.data;
  },

  /*
   Reemplaza el estado actual y avisa a todos los listeners
   que hubo un cambio.
  */
  setState(newState: any) {
    this.data = newState;

    for (const cb of this.listeners) {
      cb();
    }

    console.log("soy el state, he cambiado", this.data);
  },

  // Permite que otras partes de la aplicación se suscriban a cambios del estado.
  subscribe(callback: () => void) {
    this.listeners.push(callback);
  },

  // Agrega una nueva partida al historial y actualiza el estado.
  pushToHistory(play: { myPlay: string; computerPlay: string }) {
    const currentState = this.getState();

    currentState.history.push(play);

    this.setState(currentState);
  },
};

export { state };

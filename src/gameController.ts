const game = {
  /*
   Guarda temporalmente las jugadas de la partida actual:
   la del jugador y la de la computadora.
  */
  currentGame: {
    myPlay: "",
    computerPlay: "",
  },

  // Guarda la jugada elegida por el jugador.
  setMove(move: string) {
    this.currentGame.myPlay = move;
  },

  // Elige aleatoriamente una de las tres opciones para la computadora.
  setComputerMove() {
    const opciones = ["piedra", "papel", "tijera"];
    const random = Math.floor(Math.random() * 3);

    this.currentGame.computerPlay = opciones[random];
  },

  // Compara las dos jugadas y determina el resultado de la partida.
  whoWins() {
    const { myPlay, computerPlay } = this.currentGame;

    if (myPlay === computerPlay) return "empate";

    if (
      (myPlay === "piedra" && computerPlay === "tijera") ||
      (myPlay === "papel" && computerPlay === "piedra") ||
      (myPlay === "tijera" && computerPlay === "papel")
    ) {
      return "ganaste";
    }

    return "perdiste";
  },

  /*
   Recorre todo el historial y cuenta cuántas partidas ganó
   el jugador, cuántas ganó la computadora y cuántos empates hubo.
  */
  getScore(
    history: Array<{
      myPlay: string;
      computerPlay: string;
    }>,
  ) {
    let player = 0;
    let computer = 0;
    let draws = 0;

    for (const play of history) {
      if (play.myPlay === play.computerPlay) {
        draws++;
      } else if (
        (play.myPlay === "piedra" && play.computerPlay === "tijera") ||
        (play.myPlay === "papel" && play.computerPlay === "piedra") ||
        (play.myPlay === "tijera" && play.computerPlay === "papel")
      ) {
        player++;
      } else {
        computer++;
      }
    }

    return {
      player,
      computer,
      draws,
    };
  },
};

export { game };

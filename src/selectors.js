export const selectPointBeforeWin = (playerId) => {
  const otherPlayerId = playerId === "player1" ? "player2" : "player1";
  return (state) => {
    if (state.winner) {
      return null;
    }
    if (state.advantage === playerId) {
      return 1;
    }
    if (state.advantage === otherPlayerId) {
      return 3;
    }
    const playerScore = state[playerId];
    const otherPlayerScore = state[otherPlayerId];
    const pointsTo40 =
      playerScore === 0
        ? 3
        : playerScore === 15
        ? 2
        : playerScore === 30
        ? 1
        : 0;
    if (otherPlayerScore === 40) {
      return pointsTo40 + 2;
    }
    return pointsTo40 + 1;
  };
};

export const selectPlayerHasAdvantage = (playerId) => {
  return (state) => state.advantage === playerId;
};

export const selectPlayerScore = (playerId) => {
  return (state) => state[playerId];
};

export const selectDisplayText = (state) => {
  if (state.winner) {
    if (state.winner === "player1") {
      return "Joueur 1 gagne le jeu";
    } else {
      return "Joueur 2 gagne le jeu";
    }
  } else {
    let text = "Le score est: " + state.player1 + " - " + state.player2;
    if (state.advantage) {
      if (state.advantage === "player1") {
        text += " avantage joueur 1";
      } else {
        text += " avantage joueur 2";
      }
    }
    return text;
  }
};

export const selectPlayerPoints = (playerId) => {
  return (state) =>
    state.history.filter((item) => item.winner === playerId).length;
};

export const selectGameIsPlaying = (state) => state.playing;

import { createStore } from "redux";
import produce from "immer";

// state
const initialState = {
  player1: 0,
  player2: 0,
  advantage: null,
  winner: null,
  playing: false,
  // historique des jeux joués
  history: [
    // { player1: 15, player2: 40, winner: "player2" }
  ],
};

// actions creators

const setPlaying = (playing) => ({
  type: "setPlaying",
  payload: playing,
});

export const restartGame = () => ({ type: "restart" });

export const pointScored = (player) => ({
  type: "pointScored",
  payload: { player: player },
});

export function autoplay(store) {
  const isPlaying = store.getState().playing;
  if (isPlaying) {
    // Déjà entrain de jouer, on ne fait rien
    return;
  }
  // on indique que la partie est en cours
  store.dispatch(setPlaying(true));
  // on utilise setTimeout pour attendre 2 secondes
  window.setTimeout(() => {
    // le jeu est-il toujours en cours ?
    if (store.getState().playing === false) {
      // Si non, on ne fait rien
      return;
    }
    // si oui on marque un point aléatoire
    const pointWinner = Math.random() > 0.5 ? "player1" : "player2";
    store.dispatch(pointScored(pointWinner));
    // on remet le jeu en pause
    store.dispatch(setPlaying(false));
  }, 2000);
}

function reducer(state = initialState, action) {
  if (action.type === "restart") {
    return produce(state, (draft) => {
      // si le match est terminé, on ajoute un élément à l'historique
      if (draft.winner) {
        draft.history.push({
          player1: draft.player1,
          player2: draft.player2,
          winner: draft.winner,
        });
      }
      // puis on reset les autres propriétés
      draft.player1 = 0;
      draft.player2 = 0;
      draft.advantage = null;
      draft.winner = null;
      draft.playing = false;
    });
  }
  if (action.type === "setPlaying") {
    return produce(state, (draft) => {
      draft.playing = action.payload;
    });
  }
  if (action.type === "pointScored") {
    const player = action.payload.player;
    const otherPlayer = player === "player1" ? "player2" : "player1";
    if (state.winner) {
      // On ne peut pas marquer de point si le set est terminé
      return state;
    }
    return produce(state, (draft) => {
      const currentPlayerScore = draft[player];
      if (currentPlayerScore <= 15) {
        // 0 ou 15 => on ajoute 15
        draft[player] += 15;
        return;
      }
      if (currentPlayerScore === 30) {
        draft[player] = 40;
        return;
      }
      if (currentPlayerScore === 40) {
        if (draft[otherPlayer] !== 40) {
          // Le joueur à gagné
          draft.winner = player;
          return;
        }
        if (draft.advantage === player) {
          // Le joueur à gagné
          draft.winner = player;
          return;
        }
        if (draft.advantage === null) {
          // Le joueur a maintenant l'avantage
          draft.advantage = player;
          return;
        }
        // L'autre joueur a perdu l'avantage
        draft.advantage = null;
        return;
      }
    });
  }
  return state;
}

export const store = createStore(reducer);

store.subscribe(() => {
  console.log("Nouveau state:");
  console.log(store.getState());
});

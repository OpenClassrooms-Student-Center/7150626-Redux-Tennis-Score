import { useSelector } from "react-redux";

const selectPlayerHasAdvantage = (playerId) => {
  return (state) => state.advantage === playerId;
};

export function PlayerScore({ playerId, playerName }) {
  // playerId est soit "player1" soit "player2"
  // on l'utilise dans le selector pour accéder au score du joueur !
  const score = useSelector((state) => state[playerId]);
  const hasAdvantage = useSelector(selectPlayerHasAdvantage(playerId));

  return (
    <div className="player-score">
      <p>{playerName}</p>
      <p>{(hasAdvantage ? "Avantage " : "") + score}</p>
    </div>
  );
}

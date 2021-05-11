import { useSelector } from "react-redux";
import { selectPlayerHasAdvantage, selectPlayerScore } from "./selectors";

export function PlayerScore({ playerId, playerName }) {
  const score = useSelector(selectPlayerScore(playerId));
  const hasAdvantage = useSelector(selectPlayerHasAdvantage(playerId));

  return (
    <div className="player-score">
      <p>{playerName}</p>
      <p>{(hasAdvantage ? "Avantage " : "") + score}</p>
    </div>
  );
}

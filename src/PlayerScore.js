import { useSelector } from "react-redux";
import {
  selectPlayerHasAdvantage,
  selectPlayerScore,
  selectPointBeforeWin,
} from "./selectors";

export function PlayerScore({ playerId, playerName }) {
  const score = useSelector(selectPlayerScore(playerId));
  const hasAdvantage = useSelector(selectPlayerHasAdvantage(playerId));
  const pointsBeforeWin = useSelector(selectPointBeforeWin(playerId));

  return (
    <div className="player-score">
      <p>
        {playerName}
        {pointsBeforeWin === null
          ? ""
          : ` (encore ${pointsBeforeWin} ${
              pointsBeforeWin > 1 ? "points" : "point"
            })`}
      </p>
      <p>{(hasAdvantage ? "Avantage " : "") + score}</p>
    </div>
  );
}

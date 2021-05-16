import { useSelector, useStore } from "react-redux";
import { autoplay } from "./store";
import { selectGameIsPlaying } from "./selectors";

export function PlayPauseButton() {
  const store = useStore();
  const playing = useSelector(selectGameIsPlaying);

  return (
    <button
      className="button"
      onClick={() => {
        autoplay(store);
      }}
    >
      {playing ? "Jeu en cours..." : "Jouer"}
    </button>
  );
}

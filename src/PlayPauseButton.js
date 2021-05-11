// on import useDispatch depuis react-redux
import { useDispatch } from "react-redux";
import { playPause } from "./store";

export function PlayPauseButton() {
  // on utilise le hooks useDispatch dans notre composant
  // pour récupérer la fonction dispatch de redux
  const dispatch = useDispatch();

  return (
    <button
      className="button"
      onClick={() => {
        // au clique sur le bouton on exécute la fonction dispatch
        // avec une action.
        dispatch(playPause());
      }}
    >
      Pause / Reprendre
    </button>
  );
}

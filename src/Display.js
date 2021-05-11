// on import useSelector depuis react-redux
import { useSelector } from "react-redux";

export function Display() {
  // on utilise useSelector avec en paramètre une fonction
  // qui permet de récupérer uniquement la propriété `playing`
  // du state
  const gameIsPlaying = useSelector((state) => state.playing);
  // on peut ensuite utiliser cette valeur dans le rendu
  return <p>{gameIsPlaying ? "Jeu en cours" : "C'est la pause"}</p>;
}

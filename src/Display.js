// on import useSelector depuis react-redux
import { useSelector } from "react-redux";
import { selectDisplayText } from "./selectors";

export function Display() {
  const displayText = useSelector(selectDisplayText);

  return <p className="display">{displayText}</p>;
}

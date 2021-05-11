import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// on importe le Provider
import { Provider } from "react-redux";
// on importe le store
import { store } from "./store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  // Le Provider doit englober toute l'application !
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  rootElement
);

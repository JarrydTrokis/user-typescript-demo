import { render } from "react-dom";
import { store } from "./lib/store";
import { Provider } from "react-redux";
import App from "./App";

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const rootElement = document.getElementById("root");
render(<AppWithStore />, rootElement);

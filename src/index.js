import React from "react";
import { render } from "react-dom";
import withTemporaryProp from "./withTemporaryProp";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

let App = ({ buttonText, setTemporarily }) => (
  <div style={styles}>
    <button onClick={() => setTemporarily("Saved!")}>{buttonText}</button>
  </div>
);

App = withTemporaryProp(3000, "buttonText", "Save")(App);

render(<App />, document.getElementById("root"));

import React  from "react";
import DropdownSearch from "./DropdownSearch";


const App = ({ children }) => (
  <React.Fragment>
  <DropdownSearch/>
  </React.Fragment>

);

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default App;
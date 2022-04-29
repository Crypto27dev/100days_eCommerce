import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import {
  BsPatchCheck,
  BsPatchExclamation,
  BsXCircleFill,
} from "react-icons/bs";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
  offset: "10px",
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div
    style={{
      backgroundColor:
        options.type === "success"
          ? "#4CAF50"
          : options.type === "error"
          ? "#F44336"
          : "#2196F3",
      color: "#fff",
      padding: "1rem",
      margin: "2rem 1rem",
      borderRadius: "0.5rem",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
      zIndex: "999",
      ...style,
    }}
  >
    {options.type === "info" && <BsPatchExclamation />}

    {options.type === "success" && <BsPatchCheck />}

    {options.type === "error" && <BsPatchExclamation />}

    <div
      style={{
        marginLeft: "0.5rem",
      }}
    >
      {message}
    </div>

    <button
      style={{
        marginLeft: "1rem",
        cursor: "pointer",
        color: "#fff",
      }}
      onClick={close}
    >
      <BsXCircleFill size={24} />
    </button>
  </div>
);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

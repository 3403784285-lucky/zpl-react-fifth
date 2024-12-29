import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import createStorage from "web-localstorage-plus";
import store from "./store";
import { Provider } from "react-redux";
import '@/style/scss/index.scss'
createStorage({
  rootName: "crm-storage",
  noUseLocalStorage: false,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }}>
        <FloatingButton />
      </div> 
    </Provider>
  // {/* </React.StrictMode> */}
);
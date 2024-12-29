import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import FloatingButton from "./components/base/FloatingButton.jsx";
import createStorage from "web-localstorage-plus";
import store from "./store";
import { Provider } from "react-redux";
import '@/style/scss/index.scss'
import router from './router';
import { RouterProvider, useLocation } from 'react-router-dom';

createStorage({
  rootName: "crm-storage",
  noUseLocalStorage: false,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />

      <App />

    </Provider>

  // {/* </React.StrictMode> */}
);
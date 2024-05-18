import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import BaseWrapper from './components/base/BaseWrapper';

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
      <BaseWrapper className="flex-center-center bg-color-primary">
   
   </BaseWrapper>
    </Provider>
  // </React.StrictMode>
);
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from "./store";
import { Provider } from "react-redux";
import createStorage from 'web-localstorage-plus'
createStorage({
    // 根命名空间
    rootName:'spp-storage',
    // 是否禁用原生localstorage
    noUseLocalStorage:false
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
  </React.StrictMode>,
)

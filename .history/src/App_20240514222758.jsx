import Sustain from "./pages/sustain";
import { RouterProvider } from 'react-router-dom';
import router from './router'
import { Provider } from "react-redux";

function App() {

  return (
    <Provider >
      <RouterProvider router={router}/>
      <br />
     <Sustain/>
    </Provider>
  )
}

export default App
import Sustain from "./pages/sustain";
import { RouterProvider } from 'react-router-dom';
import router from './router'
import { Provider } from "react-redux";

function App() {

  return (

      <RouterProvider router={router}/>
      <br />
     <Sustain/>

  )
}

export default App
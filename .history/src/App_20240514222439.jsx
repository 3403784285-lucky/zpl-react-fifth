import Sustain from "../pages/sustain";
import { RouterProvider } from 'react-router-dom';
import router from './router'

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <br />
     <Sustain/>
    </>
  )
}

export default App
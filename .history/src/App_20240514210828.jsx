import Storage from './pages/test';
import { RouterProvider } from 'react-router-dom';
import router from './router'

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <br />
      <Storage/>
    </>
  )
}

export default App
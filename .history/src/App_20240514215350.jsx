import Test from './pages/test';
import { RouterProvider } from 'react-router-dom';
import router from './router'

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <br />
      <Test/>
    </>
  )
}

export default App
import { createHashRouter } from "react-router-dom";
import Login from "../pages/loRePage/login";
import Register from "../pages/loRePage/register";
import Index  from "../pages/frameLayout/index";

const router = createHashRouter([
  {
    path: "/",
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/index",
    Component: Index,
    children:[
      {
        path: "/index/",
        Component: Login,

      },
      {
        path: "/index/intelligent-correction",
        Component: Login,

        
      },
      {
        path: "/index/text-completion",
        Component: Login,

      },
      {
        path: "/index/chapter-generation",
        Component: Login,

      },
      {
        path: "/index/text-polishing",
        Component: Login,

      },
      {
        path: "/index",
        Component: Login,

      }
    ]
  },
]);

export default router;
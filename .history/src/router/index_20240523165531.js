import { createHashRouter } from "react-router-dom";
import Login from "../pages/loRePage/login";
import Register from "../pages/loRePage/register";
import Index  from "../pages/frameLayout/index";
import Correction from "../pages/ai/correction";
import Completion from "../pages/ai/completion";


const router = createHashRouter([

  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: Index,
    children:[
    
      {
        path: "intelligent-correction",
        Component: Correction,

        
      },
      {
        path: "text-completion",
        Component:  Completion,

      },
      // {
      //   path: "/index/chapter-generation",
      //   Component: Generation,

      // },
      // {
      //   path: "/index/text-polishing",
      //   Component: Polishing,

      // },
      // {
      //   path: "/index/super-dictionary",
      //   Component: Dictionary,

      // }
    ]
  },
]);

export default router;
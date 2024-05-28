import { createHashRouter } from "react-router-dom";
import Login from "../pages/loRePage/login";
import Register from "../pages/loRePage/register";
import Index  from "../pages/frameLayout/index";
import Correction from "../pages/ai/correction";
import Completion from "../pages/ai/completion";
import Generation from "../pages/ai/generation";
import Polishing from "../pages/ai/polish";
import Dictionary from "../pages/ai/dictionary";
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
    path: "/homepage-recommendation",
    Component: ,
  },
  {
    path: "/recent-files",
    Component: ,
  },
  {
    path: "/my-favorites",
    Component: ,
  },
  {
    path: "/my-folders",
    Component: ,
  },
  {
    path: "/my-folders",
    Component: ,
  },{
    path: "/my-folders",
    Component: ,
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
      {
        path: "chapter-generation",
        Component: Generation,

      },
      {
        path: "text-polishing",
        Component: Polishing,

      },
      {
        path: "super-dictionary",
        Component: Dictionary,

      }
    ]
  },
]);

export default router;
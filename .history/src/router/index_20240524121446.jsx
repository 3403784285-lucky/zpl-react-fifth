import { createHashRouter, Navigate } from "react-router-dom";
import Login from "../pages/loRePage/login";
import Register from "../pages/loRePage/register";
import Index from "../pages/frameLayout/index";
import Correction from "../pages/ai/correction";
import Completion from "../pages/ai/completion";
import Generation from "../pages/ai/generation";
import Polishing from "../pages/ai/polish";
import Dictionary from "../pages/ai/dictionary";
import Recommendation from "../pages/main/recommendation";
import Files from "../pages/main/files";
import Favorites from "../pages/main/favorites";
import Folders from "../pages/main/folders";
import Bin from "../pages/main/bin";
import Center from "../pages/main/center";
import Benefits from "../pages/main/benefits";
import Tools from "../pages/main/tools";
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
    element: <Navigate to="/index" replace />,
    children: [
      {
        path: "/index",
        Component: Index,
        children: [

        ]
      },
      {
        path: "/homepage-recommendation",
        Component: Recommendation,
      },

      {
        path: "/recent-files",
        Component: Files,
        children: [
          {
            path: "intelligent-correction",
            Component: Correction,
          },
          {
            path: "text-completion",
            Component: Completion,

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
      {
        path: "/my-favorites",
        Component: Favorites,
      },
      {
        path: "/my-folders",
        Component: Folders,
      },
      {
        path: "/recycle-bin",
        Component: Bin,
      },
      {
        path: "/member-center",
        Component: Center,
      },
      {
        path: "/membership-benefits",
        Component: Benefits,
      },
      {
        path: "/membership-tools",
        Component: Tools,
      },

    ]
  },
]);

export default router;
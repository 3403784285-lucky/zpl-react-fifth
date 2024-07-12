import { createHashRouter } from "react-router-dom";
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
import Library from "../pages/main/library";
import Edit from "../pages/main/file-recent/edit";
import Key  from "../pages/ai/key";
import FileLay from "../pages/main/file-recent/fileLay.jsx";
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
    children: [
      {
        path: "homepage-recommendation",
        Component: Recommendation,
      },

      {

       
        Component: Files,
        children: [
          {
           
            index:true,
            Component: FileLay,
          },

          {
            path:"edit",
            Component: Edit,
            children: [
              {
                
                path:"text-correction",
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

              },
              {
                path: "shortcut-key",
                Component: Key,

              }
              
            ]
          },
       

        ]
      },
      {
        path: "my-favorites",
        Component: Favorites,
      },
      {
        path: "my-folders",
        Component: Folders,
        children: [
          {
            
            path:"template-center",
            Component: Correction,
          },
          {
            path: "my-template",
            Component: Completion,

          },
          

        ]
      },
      {
        path: "recycle-bin",
        Component: Bin,
      },
      {
        path: "library",
        Component: Library,
      },
      {
        path: "member-center",
        Component: Center,
      },
      {
        path: "membership-benefits",
        Component: Benefits,
      },
      {
        path: "membership-tools",
        Component: Tools,
      },

    ]
  },
]);

export default router;
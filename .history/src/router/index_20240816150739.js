import {
  createHashRouter
} from "react-router-dom";
import Login from "../pages/loRePage/login";
import Register from "../pages/loRePage/register";
import Index from "../pages/frameLayout/index";
import Correction from "../pages/ai/correction";
import Completion from "../pages/ai/completion";
import Generation from "../pages/ai/generation";
import Polishing from "../pages/ai/polish";
import Dictionary from "../pages/ai/dictionary";
import Recommendation from "../pages/main/recommendation";
import Files from "../pages/main/file/files.jsx";
import Favorites from "../pages/main/folder/favorites.jsx";
import Folders from "../pages/main/folder/folders.jsx";
import Bin from "../pages/main/file/bin.jsx";
import Center from "../pages/main/center/center";
import Library from "../pages/main/file/library.jsx";
import Edit from "../pages/main/file/edit.jsx";
import Key from "../pages/ai/key";
import FileLay from "../pages/main/file/fileLay.jsx";
import ItsCenter from "../pages/template/itsCenter.jsx";
import MyIts from "../pages/template/myIts.jsx";
import Extraction from "../pages/ai/extraction.jsx";
import Person from "../pages/person.jsx";
import File from "../pages/main/file/file.jsx";
import Wallet from "../pages/main/center/wallet.jsx";
import OrderTable from "../pages/main/center/orderTable.jsx";
import BigEditor from "../pages/main/file/bigEditor.jsx"
import SearchFile from "../pages/main/file/searchFile.jsx";
import OrderPay from "../pages/main/center/orderPay.jsx";
import DocumentSearchPage from "../pages/documentSearchPage.jsx";
import UploadMaterialForm from "../components/utils/main/cards.jsx";
import UserManagement from "../pages/admin/userManage.jsx";
import InterfaceManagement from "../pages/admin/interfaceManage.jsx";
import OrderManagement from "../pages/admin/orderManage.jsx";
import PriceManagement from "../pages/admin/priceManage.jsx";
import Statistics from "../pages/admin/statistics.jsx";
import VectorManagement from '../pages/admin/vectorManage.jsx'
import AppContent from '../AppContent.jsx'
const router = createHashRouter([{

    Component: AppContent,
    children: [

      {
        path: "/login",
        Component: Login,
      },

      {
        path: "/register",
        Component: Register,
      },
      {
        path: "big-editor",
        Component: BigEditor,
        children: [{
          path: "information-extraction",
          Component: Extraction,

        }, ]

      },

      {
        path: "/",
        Component: Index,
        children: [{

            path: "homepage-recommendation",
            Component: Recommendation,
          },
          {

            path: "statistics",
            Component: Statistics,
          },
          {

            path: "user-manage",
            Component: UserManagement,
          },
          {

            path: "api-manage",
            Component: InterfaceManagement,
          },
          {

            path: "vector-manage",
            Component: VectorManagement,
          },

          {

            path: "order-manage",
            Component: OrderManagement,
          },
          {

            path: "price-manage",
            Component: PriceManagement,
          },


          {


            Component: Files,
            children: [{

                
                Component: FileLay,
              },


              {
                path: "edit",
                Component: Edit,
                children: [{

                    path: "",
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
                    path: "information-extraction",
                    Component: Extraction,

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
            path: "my-order",
            Component: OrderTable,
          },
          {
            path: "my-wallet",
            Component: Wallet,
          },
          {
            path: "order-pay",
            Component: OrderPay,
          },
          {
            path: "point-pay",
            Component: Wallet,
          },
          {
            path: "search-document",
            Component: DocumentSearchPage,
          },
          {
            path: "my-example",
            Component: UploadMaterialForm,
          },
          {
            path: "person",
            Component: Person,
          },
          {
            path: "my-folders",
            Component: Folders,
            children: [{

                path: "",
                Component: ItsCenter,
              },
              {
                path: "my-template",
                Component: MyIts,

              },

            ]
          },
          {
            path: "my-file",
            Component: File,

          },

          {
            path: "search-file",
            Component: SearchFile,

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

        ]
      },
    ]
  },

]);

export default router;
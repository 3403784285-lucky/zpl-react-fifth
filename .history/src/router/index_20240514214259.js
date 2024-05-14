import { createHashRouter } from "react-router-dom";
import ReduxCopy from "../pages/redux";
import Test from "../pages/test"
const router = createHashRouter([
  {
    path: "/",
  },
  {
    path: "/redux",
    Component: ReduxCopy,
  },
  {
    path: "/test",
    Component: Test,
  },
]);

export default router;

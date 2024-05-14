import { createHashRouter } from "react-router-dom";
import ReduxC from "../pages/redux";
import Test from "../pages/test"
const router = createHashRouter([
  {
    path: "/",
  },
  {
    path: "/redux",
    Component: ReduxC,
  },
  {
    path: "/test",
    Component: Test,
  },
]);

export default router;

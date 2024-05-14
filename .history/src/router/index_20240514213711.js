import { createHashRouter } from "react-router-dom";
import Redux from "../pages/redux";
import Test from "../pages/test"
const router = createHashRouter([
  {
    path: "/",
  },
  {
    path: "/redux",
    Component: Redux,
  },
  {
    path: "/test",
    Component: Test,
  },
]);

export default router;

import { createHashRouter } from "react-router-dom";
import User from "../pages/user";
import Test from "../pages/test"
const router = createHashRouter([
  {
    path: "/",
  },
  {
    path: "/user",
    Component: User,
  },
  {
    path: "/test",
    Component: Test,
  },
]);

export default router;

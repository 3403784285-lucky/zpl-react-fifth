import { createHashRouter } from "react-router-dom";
import User from "../pages/user";

const router = createHashRouter([
  {
    path: "/",
  },
  {
    path: "/user",
    Component: User,
  },
]);

export default router;

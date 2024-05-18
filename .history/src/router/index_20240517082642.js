import { createHashRouter } from "react-router-dom";
import Login from "../pages/loRePage/login";

const router = createHashRouter([
  {
    path: "/",
  },
  {
    path: "/login",
    Component: Login,
  },
]);

export default router;
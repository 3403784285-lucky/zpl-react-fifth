import { createHashRouter } from "react-router-dom";
import Copy from "../pages/copy";

const router = createHashRouter([
  {
    path: "/",
  },
  {
    path: "/copy",
    Component: Copy,
  },
]);

export default router;
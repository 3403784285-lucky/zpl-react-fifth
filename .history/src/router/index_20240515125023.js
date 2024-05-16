import { createHashRouter } from "react-router-dom";
import Sustain from "../pages/sustain";

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
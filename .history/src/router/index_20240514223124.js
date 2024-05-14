import { createHashRouter } from "react-router-dom";
import Sustain from "../pages/sustain";

const router = createHashRouter([
  {
    path: "/",
  },
  {
    path: "/sustain",
    Component: Sustain,
  },
]);

export default router;
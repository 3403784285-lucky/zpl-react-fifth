import { createHashRouter } from "react-router-dom";
import Sustain from "../pages/sustain";
import Test from "../pages/test"
const router = createHashRouter([
  {
    path: "/",
    Component: Test
  },
  {
    path: "/sustain",
    Component: Sustain,
  },
//   {
//     path: "/test",
//     Component: Test,
//   },
]);

export default router;

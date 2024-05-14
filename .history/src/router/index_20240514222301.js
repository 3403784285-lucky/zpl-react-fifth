import { createHashRouter } from "react-router-dom";
import Sustain from "../pages/sustain";
// import Test from "../pages/test"
const router = createHashRouter([
  {
    path: "/",
  
  },
  {
    path: "/sustain",
    component: Sustain
  },
//   {
//     path: "/test",
//     Component: Test,
//   },
]);

export default router;

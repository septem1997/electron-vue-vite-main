import Test from "../pages/test.vue";
import Home from "../App.vue";
import Capture from "../pages/capture.vue";
export default [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/capture",
    name: "Capture",
    component: Capture,
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
];

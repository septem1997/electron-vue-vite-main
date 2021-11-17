import { createStore } from "vuex";
import global from "./global";
const store = createStore({
  modules: {
    global: global,
  },
});
export default store;

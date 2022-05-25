import { createStore } from "vuex";
import Map from "./map.js";
import kakaoapi from "./kakaoapi.js";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    map: Map,
    kakaoapi,
  },
  state: {
    flag: true,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

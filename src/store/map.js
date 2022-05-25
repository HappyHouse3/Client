import http from "@/util/http-common";

export default {
  state: {
    map: "",
    sidos: [],
    guguns: [],
    dongs: [],
    apts: [],
    subways: [],
    busstations: [],
    bicycles: [],
    aptCode: "",
    homeCode: "",
    selectedApt: {},
    homes: [],
    curposition: "",
    words: [],
    transcnt: "",
  },
  mutations: {
    SET_SIDO_LIST(state, payload) {
      state.sidos = payload;
    },
    SET_GUGUN_LIST(state, payload) {
      state.guguns = payload;
    },
    SET_DONG_LIST(state, payload) {
      state.dongs = payload;
    },
    SET_APT_LIST(state, payload) {
      state.apts = payload;
    },
    SET_HOME_LIST(state, payload) {
      state.homes = payload;
    },
    SET_APT(state, payload) {
      console.log(payload);
      state.aptCode = payload.aptCode;
      console.log(state.aptCode);
    },
    SET_HOME(state, payload) {
      console.log(payload);
      state.homeCode = payload.homeCode;
      console.log(state.homeCode);
    },
    SET_POSITION(state, payload) {
      console.log(payload);
      state.curposition = payload.position;
    },
    SET_SUBWAY_LIST(state, payload) {
      state.subways = payload;
    },
    SET_BUS_LIST(state, payload) {
      state.busstations = payload;
    },
    SET_BICYCLE_LIST(state, payload) {
      state.bicycles = payload;
    },
    SET_WORD_LIST(state, payload) {
      state.words = payload;
    },
    SET_TRANS_CNT(state, payload) {
      state.transcnt = payload;
    },
  },
  actions: {
    setSidoList({ commit }) {
      http.get(`/map/sido`).then(({ data }) => {
        commit("SET_SIDO_LIST", data);
      });
    },
    setGugunList({ commit }, sidocode) {
      http.get(`/map/gugun?sido=` + sidocode).then(({ data }) => {
        commit("SET_GUGUN_LIST", data);
      });
    },
    setDongList({ commit }, guguncode) {
      http.get(`/map/dong?gugun=` + guguncode).then(({ data }) => {
        commit("SET_DONG_LIST", data);
      });
    },
    setAptList({ commit }, dongcode) {
      http
        .get(`/map/apt?dong=${dongcode}&month=10&year=2021`)
        .then(({ data }) => {
          console.log(data);
          commit("SET_APT_LIST", data);
        });
    },
    setHomeList({ commit }, dongcode) {
      http.get(`/map/home?dong=${dongcode}`).then(({ data }) => {
        console.log(data);
        commit("SET_HOME_LIST", data);
      });
    },
    setSubwayList({ commit }, payload) {
      http
        .get(`/map/subway?lng=${payload.La}&lat=${payload.Ma}`)
        .then(({ data }) => {
          console.log(data);
          commit("SET_SUBWAY_LIST", data);
        });
    },
    setBusList({ commit }, payload) {
      http
        .get(`/map/bus?lng=${payload.La}&lat=${payload.Ma}`)
        .then(({ data }) => {
          console.log(data);
          commit("SET_BUS_LIST", data);
        });
    },
    setBicycleList({ commit }, payload) {
      http
        .get(`/map/bicycle?lng=${payload.La}&lat=${payload.Ma}`)
        .then(({ data }) => {
          console.log(data);
          commit("SET_BICYCLE_LIST", data);
        });
    },
    setWordList({ commit }) {
      http.get(`/word/`).then(({ data }) => {
        this.words = data;
        console.log(this.words);
        commit("SET_WORD_LIST", data);
      });
    },
    setTransCnt({ commit }, payload) {
      http
        .get(`/map/transcnt?lng=${payload.La}&lat=${payload.Ma}`)
        .then(({ data }) => {
          commit("SET_TRANS_CNT", data);
        });
    },
  },
  getters: {
    getSidoList(state) {
      return state.sidos;
    },
    getGugunList(state) {
      return state.guguns;
    },
    getDongList(state) {
      return state.dongs;
    },
    getAptList(state) {
      return state.apts;
    },
    getHomeList(state) {
      return state.homes;
    },
    getPosition(state) {
      return state.curposition;
    },
    getAptInfo(state) {
      return state.apts.find((apt) => apt.aptCode == state.aptCode);
    },
    getHomeInfo(state) {
      return state.homes.find((home) => home.homeCode == state.homeCode);
    },
    getBusList(state) {
      return state.busstations;
    },
    getBicycleList(state) {
      return state.bicycles;
    },
    getSubwayList(state) {
      return state.subways;
    },
    getTransCnt(state) {
      return state.transcnt;
    },
  },
};

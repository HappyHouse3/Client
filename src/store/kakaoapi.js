import http from "@/util/kakao-common";

export default {
  state: {
    hospitals: [],
    schools: [],
    cafes: [],
    convenients: [],
    kids: [],
    hospitalcnt: 0,
    schoolcnt: 0,
    cafecnt: 0,
    convenientcnt: 0,
    kidcnt: 0,
  },
  mutations: {
    SET_HOSPITAL_LIST(state, payload) {
      state.hospitals = payload;
    },
    SET_SCHOOL_LIST(state, payload) {
      state.schools = payload;
    },
    SET_CAFE_LIST(state, payload) {
      state.cafes = payload;
    },
    SET_CONVENIENT_LIST(state, payload) {
      state.convenients = payload;
    },
    SET_KID_LIST(state, payload) {
      state.kids = payload;
    },
    SET_HOSPITAL_COUNT(state, payload) {
      state.hospitalcnt = payload;
    },
    SET_SCHOOL_COUNT(state, payload) {
      state.schoolcnt = payload;
    },
    SET_CAFE_COUNT(state, payload) {
      state.cafecnt = payload;
    },
    SET_CONVENIENT_COUNT(state, payload) {
      state.convenientcnt = payload;
    },
    SET_KID_COUNT(state, payload) {
      state.kidcnt = payload;
    },
  },
  actions: {
    setHospitalList({ commit }, payload) {
      http
        .get(
          `/category.json?category_group_code=HP8&radius=500&sort=distance&x=${payload.La}&y=${payload.Ma}`
        )
        .then(({ data }) => {
          console.log(data);
          commit("SET_HOSPITAL_LIST", data.documents);
        });
    },
    setSchoolList({ commit }, payload) {
      http
        .get(
          `/category.json?category_group_code=SC4&radius=500&sort=distance&x=${payload.La}&y=${payload.Ma}`
        )
        .then(({ data }) => {
          console.log(data.documents);
          commit("SET_SCHOOL_LIST", data.documents);
        });
    },
    setCafeList({ commit }, payload) {
      http
        .get(
          `/category.json?category_group_code=CE7&radius=500&sort=distance&x=${payload.La}&y=${payload.Ma}`
        )
        .then(({ data }) => {
          commit("SET_CAFE_LIST", data.documents);
        });
    },
    setConvenientList({ commit }, payload) {
      http
        .get(
          `/category.json?category_group_code=CS2&radius=500&sort=distance&x=${payload.La}&y=${payload.Ma}`
        )
        .then(({ data }) => {
          commit("SET_CONVENIENT_LIST", data.documents);
        });
    },
    setKidList({ commit }, payload) {
      http
        .get(
          `/category.json?category_group_code=PS3&radius=500&sort=distance&x=${payload.La}&y=${payload.Ma}`
        )
        .then(({ data }) => {
          commit("SET_KID_LIST", data.documents);
        });
    },
    setHospitalCnt({ commit }, payload) {
      console.log(payload);
      http
        .get(
          `/category.json?category_group_code=HP8&radius=500&sort=distance&x=${payload.La}&y=${payload.Ma}`
        )
        .then(({ data }) => {
          console.log(data);
          commit("SET_HOSPITAL_COUNT", data.meta.total_count);
        });
    },
    setCafeCnt({ commit }, payload) {
      http
        .get(
          `/category.json?category_group_code=CE7&radius=500&sort=distance&x=${payload.La}&y=${payload.Ma}`
        )
        .then(({ data }) => {
          console.log(data);
          commit("SET_CAFE_COUNT", data.meta.total_count);
        });
    },
    setConvenientCnt({ commit }, payload) {
      http
        .get(
          `/category.json?category_group_code=CS2&radius=500&sort=distance&x=${payload.La}&y=${payload.Ma}`
        )
        .then(({ data }) => {
          console.log(data);
          commit("SET_CONVENIENT_COUNT", data.meta.total_count);
        });
    },
    setSchoolCnt({ commit }, payload) {
      http
        .get(
          `/category.json?category_group_code=SC4&radius=500&sort=distance&x=${payload.La}&y=${payload.Ma}`
        )
        .then(({ data }) => {
          console.log(data);
          commit("SET_SCHOOL_COUNT", data.meta.total_count);
        });
    },
    setKidCnt({ commit }, payload) {
      http
        .get(
          `/category.json?category_group_code=PS3&radius=500&sort=distance&x=${payload.La}&y=${payload.Ma}`
        )
        .then(({ data }) => {
          console.log(data);
          commit("SET_KID_COUNT", data.meta.total_count);
        });
    },
  },
  getters: {
    getHospitalList(state) {
      return state.hospitals;
    },
    getSchooList(state) {
      return state.schools;
    },
    getConvenientList(state) {
      return state.convenients;
    },
    getKidList(state) {
      return state.kids;
    },
    getCafeList(state) {
      return state.cafes;
    },
    getHospitalCnt(state) {
      return state.hospitalcnt;
    },
    getSchoolCnt(state) {
      return state.schoolcnt;
    },
    getConvenientCnt(state) {
      return state.convenientcnt;
    },
    getKidCnt(state) {
      return state.kidcnt;
    },
    getCafeCnt(state) {
      return state.cafecnt;
    },
  },
};

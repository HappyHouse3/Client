import http from "@/util/http-common";

export default {
  state: {
    reviewList: [],
    homecode: "",
    ranking: "",
    avgrank: 0,
  },
  getters: {
    getReviewList: function(state) {
      return state.reviewList;
    },
    getRanking: function(state) {
      return state.ranking;
    },
  },
  mutations: {
    SET_REVIEW_LIST(state, payload) {
      state.reviewList = payload;
    },
    SET_REVIEW_HOMECODE(state, payload) {
      state.homecode = payload.homeCode;
    },
    SET_REVIEW_RANKING(state, payload) {
      state.ranking = payload.ranking;
    },
    SET_AVG_RANKING(state) {
      let sum = 0;
      console.log(state.avgrank);
      if (state.avgrank == null) state.avgrank = 0;
      else {
        let l = Number(state.reviewList.length);
        for (let i = 0; i < l; i++) {
          sum += Number(state.reviewList[i].rating);
        }
        console.log(sum + " " + l + " " + sum / l);
        state.avgrank = sum / l;
      }
    },
  },
  actions: {
    setReviewList({ commit }, payload) {
      console.log(payload);
      http.get(`/review/${payload}`).then(({ data }) => {
        console.log(data);
        commit("SET_REVIEW_LIST", data);
        commit("SET_AVG_RANKING");
      });
    },
  },
};

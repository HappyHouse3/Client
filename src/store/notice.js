// import { registerNotice } from "@/api/notice.js";
// import { registerInterest, deleteInterest } from "@/api/interest.js";
import http from "@/util/http-common";

const noticeStore = {
  namespaced: true,
  state: {
    noticeList: [],
    currentNotice: null,
  },
  getters: {
    checkMemberInfo: function(state) {
      return state.memberInfo;
    },
  },
  mutations: {
    SET_NOTICE_LIST(state, payload) {
      state.noticeList = payload;
    },
    SET_CURRENT_NOTICE(state, payload) {
      state.currentNotice = payload;
    },
  },
  actions: {
    async setNoticeList({ commit }) {
      await http.get(`/notice`).then(({ data }) => {
        commit("SET_NOTICE_LIST", data);
      });
    },
    async getNotice({ commit }, idx) {
      await http.get(`/notice/${idx}`).then(({ data }) => {
        commit("SET_CURRENT_NOTICE", data);
      });
    },
  },
};

export default noticeStore;

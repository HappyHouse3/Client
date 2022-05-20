import http from "@/util/http-common";

export default {
  state: {
    type: String, // Q or A
    mode: String, // C or M
    qnas: [],
    index: String,
  },
  mutations: {
    SET_QNA_LIST(state, payload) {
      state.qnas = payload;
    },
    SET_TYPE_MODE(state, payload) {
      state.type = payload.type;
      state.mode = payload.mode;
    },
    SET_INDEX(state, payload) {
      state.index = payload.index;
    },
    DELETE_Q(state, payload) {
      for (let i = 0; i < state.qnas.length; i++) {
        if (state.qnas[i].idx == payload) {
          state.qnas.splice(i, 1);
          break;
        }
      }
    },
    DELETE_A(state, payload) {
      outer: for (let i = 0; i < state.qnas.length; i++) {
        if (state.qnas[i].idx == payload.qidx) {
          let question = state.qnas[i];
          for (let j = 0; j < question.qnaanswer.length; j++) {
            if (question.qnaanswer[j].idx == payload.aidx) {
              question.splice(j, 1);
              break outer;
            }
          }
        }
      }
    },
  },
  actions: {
    setQnAList({ commit }) {
      //
      http.get(`/qna`).then(({ data }) => {
        commit("SET_QNA_LIST", data);
      });
    },
    deleteQ({ commit }, idx) {
      http.delete(`/qna/${idx}`).then(({ data }) => {
        let msg = "질문 삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "질문 삭제가 완료되었습니다.";
        }
        alert(msg);
        commit("DELETE_Q", idx);
      });
    },
    deleteA({ commit }, indexes) {
      http.delete(`/qna/answer/${indexes.aidx}`).then(({ data }) => {
        let msg = "답변 삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "답변 삭제가 완료되었습니다.";
        }
        alert(msg);
        commit("DELETE_A", indexes);
      });
    },
  },
  getters: {
    getQnAList(state) {
      return state.qnas;
    },
    getTypeMode(state) {
      let tm = {
        type: state.type,
        mode: state.mode,
      };
      return tm;
    },
    getQuestion: (state) => (idx) => {
      return state.qnas.find((qna) => qna.idx == idx);
    },
    getAnswer: (state) => (idx, gidx) => {
      let question = state.qnas.find((qna) => qna.idx == gidx);
      // let question = this.getQuestion(gidx);
      return question.qnaanswer.find((ans) => ans.idx == idx);
    },
    getIndex(state) {
      return state.index;
    },
  },
};

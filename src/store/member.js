import jwt_decode from "jwt-decode";
import {
  login,
  getMemberById,
  modifyMemberInfo,
  unregisterMember,
  signUpMember,
  // collectMemberInfo,
} from "@/api/member.js";
import { registerInterest, deleteInterest } from "@/api/interest.js";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    memberInfo: null,

    isSignupError: false,
  },
  getters: {
    checkMemberInfo: function(state) {
      return state.memberInfo;
    },
    getInterestList: function(state) {
      return state.memberInfo.dongname;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_MEMBER_INFO: (state, memberInfo) => {
      state.isLogin = true;
      state.memberInfo = memberInfo;
    },

    SET_IS_SIGNUP_ERROR: (state, isSignupError) => {
      state.isSignupError = isSignupError;
    },
  },
  actions: {
    async memberConfirm({ commit }, member) {
      await login(
        member,
        (response) => {
          console.log("-------------");
          //   console.log(response.data.message);
          if (response.data.message === "success") {
            // alert("SUCCESS !!");
            var token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            // alert("FAILURE ㅠㅠ");
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {}
      );
    },
    getMemberInfo({ commit }, token) {
      console.log("getMemberInfo() 호출됨");
      let decoded = jwt_decode(token);
      console.log("decoded: " + decoded.userid);
      getMemberById(
        decoded.userid,
        (response) => {
          console.log(response.data);
          if (response.data.message === "success") {
            commit("SET_MEMBER_INFO", response.data.memberInfo);
          } else {
            alert("아이디 또는 패스워드를 확인하세요.");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyMember({ commit }, member) {
      modifyMemberInfo(member);
      commit("SET_MEMBER_INFO", member);
    },
    deleteMember({ commit }, memberid) {
      unregisterMember(
        memberid,
        (response) => {
          console.log(response.data);
          if (response.data === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_MEMBER_INFO", null);
          } else {
            console.log("response data fail");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async registerMember({ commit }, member) {
      //   signUpMember(member);
      //   commit("SET_IS_LOGIN", false);
      //   commit("SET_IS_LOGIN_ERROR", false);
      //   commit("SET_MEMBER_INFO", null);
      await signUpMember(
        member,
        () => {
          alert("Store Sign Up Member Success!!");
          commit("SET_IS_LOGIN", false);
          commit("SET_IS_LOGIN_ERROR", false);
          commit("SET_IS_SIGNUP_ERROR", false);
          commit("SET_MEMBER_INFO", null);
        },
        () => {
          //   alert("Store Sign Up Member Fail!!");
          commit("SET_IS_SIGNUP_ERROR", true);
        }
      );
    },
    async addInterest({ commit }, payload) {
      console.log(
        "addInterest 호출됨 " + payload.dongcode + " " + payload.memberid
      );
      await registerInterest(
        payload,
        () => {
          // commit("SET_MEMBER_INFO", collectMemberInfo(payload.memberid));
          getMemberById(
            payload.memberid,
            (response) => {
              console.log("registerInterest 중 " + response);
              commit("SET_MEMBER_INFO", response.data.memberInfo);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        () => {}
      );
    },
    async removeInterest({ commit }, dongcode, memberid) {
      await deleteInterest(
        dongcode,
        memberid,
        () => {
          console.log("removeInterest 호출됨");
          getMemberById(
            memberid,
            (response) => {
              console.log("deleteInterest 중 " + response.data);
              if (response.data.message === "success") {
                commit("SET_MEMBER_INFO", response.data.memberInfo);
              } else {
                alert("아이디 또는 패스워드를 확인하세요.");
              }
            },
            (error) => {
              console.log(error);
            }
          );
        },
        () => {}
      );
    },
  },
};

export default memberStore;

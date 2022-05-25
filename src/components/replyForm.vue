<template>
  <div
    style="
      display: flex;
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 10px;
    "
  >
    <input v-model="replycontent" style="width: 220px" /><md-button
      class="md-raised md-success"
      style="min-width: 20px !important; width: 60px; margin-left: 20px"
      @click="addReply"
      >작성</md-button
    >
  </div>
</template>
<script>
import http from "@/util/http-common";
import jwt_decode from "jwt-decode";

let token = sessionStorage.getItem("access-token");
let loginUserInfo = jwt_decode(token);
let userNo = loginUserInfo.userNo;

export default {
  props: {
    boardId: Number,
  },
  data() {
    return {
      replycontent: "",
    };
  },
  methods: {
    addReply() {
      http
        .post(`/qna/${this.boardId}/reply`, {
          content: this.replycontent,
          userNo: userNo,
        })
        .then((response) => {
          console.log(response.data);
          console.log("댓글작성 성공");
        })
        .then(() => {
          this.$emit("updateReply");
          this.replycontent = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <div
    style="
      display: flex;
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 10px;
    "
  >
    <input v-model="replycontent" style="width: 220px" />
    <b-button
      size="sm"
      style="
        border: none;
        background-color: #e4e4e4;
        color: black;
        margin: auto;
        display: block;
        margin-bottom: 10px;
        margin-top: 10px;
      "
      @click="addReply"
      >작성</b-button
    >
  </div>
</template>
<script>
import http from "@/util/http-common";
import jwt_decode from "jwt-decode";

export default {
  props: {
    boardId: Number,
  },
  data() {
    return {
      replycontent: "",
      userNo: null,
    };
  },
  created() {
    this.userNo = jwt_decode(sessionStorage.getItem("access-token")).userNo;
  },
  methods: {
    addReply() {
      http
        .post(`/qna/${this.boardId}/reply`, {
          content: this.replycontent,
          userNo: this.userNo,
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

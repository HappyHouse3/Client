<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title" style="font-weight: bold">{{ title }}</h4>
          </md-card-header>
          <div
            style="
              margin: 50px 50px 0px 50px;
              padding-bottom: 20px;
              border-bottom: 1px solid black;
              text-align: right;
            "
          >
            작성자 : {{ userNickName }} | 작성일 : {{ regTime }}
          </div>
          <div style="margin: 50px">
            <Viewer v-if="content != null" :initialValue="content" />
          </div>

          <div class="md-layout-item md-size-100 text-center">
            <md-button
              class="md-raised md-success"
              style="margin-right: 10px"
              v-if="isAdmin"
              >수정하기</md-button
            >
            <md-button
              class="md-raised md-success"
              style="margin-left: 10px"
              @click="backList"
              >글 목록</md-button
            >
          </div>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import { Viewer } from "@toast-ui/vue-editor";
import roleProvier from "@/util/getRoleType";

export default {
  components: {
    Viewer,
  },
  props: {
    boardId: {
      default: "",
    },
  },
  data() {
    return {
      title: null,
      content: null,
      userNickName: null,
      regTime: null,
      userNo: null,
    };
  },
  created() {
    http
      .get(`/notice/${this.boardId}`)
      .then(({ data }) => {
        this.title = data.title;
        this.content = data.content;
        this.userNickName = data.userNickName;
        this.regTime = data.regTime;
        this.userNo = data.userNo;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    backList() {
      location.href = "./";
    },
  },
  computed: {
    isAdmin() {
      return roleProvier.isAdmin();
    },
  },
};
</script>

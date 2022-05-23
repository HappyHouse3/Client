<template>
  <div>
    <div v-if="noticeList != null">
      <md-table v-model="noticeList" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="순번">{{ item.id }}</md-table-cell>
          <md-table-cell md-label="제목"
            ><router-link
              :to="{ name: 'Notice Detail', params: { boardId: item.id } }"
              >{{ item.title }}</router-link
            ></md-table-cell
          >
          <md-table-cell md-label="작성자">{{
            item.userNickName
          }}</md-table-cell>
          <md-table-cell md-label="작성일">{{ item.regTime }}</md-table-cell>
        </md-table-row>
      </md-table>
      <div class="md-layout-item md-size-100 text-right">
        <md-button class="md-raised md-success" @click="upload"
          >글쓰기</md-button
        >
      </div>
    </div>
    <div v-else><p></p></div>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "simple-table",

  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      noticeList: [],
    };
  },
  created() {
    http
      .get("/notice")
      .then((response) => {
        console.log(response.data);
        this.noticeList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    upload() {
      location.href = "./notice/upload";
    },
  },
};
</script>

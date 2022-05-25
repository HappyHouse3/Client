<template>
  <div>
    <div v-if="boardList != null">
      <div class="md-layout-item md-size-100 text-right">
        <md-button class="md-raised md-success" @click="upload"
          >글쓰기</md-button
        >
      </div>
      <div
        id="QnAArea"
        style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100%, auto));
        "
      >
        <div
          v-for="(item, index) in boardList"
          :key="index"
          style="
            margin-left: 20px;
            width: 90%;
            height: auto;
            background-color: white;
            z-index: 50;
            border: 1px solid black;
            margin: 15px;
            display: block;
            justify-content: center;
          "
        >
          <div
            style="
              float: left;
              width: 50%;
              height: 500px;
              display: table-cell;
              position: relative;
              vertical-align: middle;
            "
          >
            <Viewer
              v-if="item != null"
              :initialValue="item.img"
              style="
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
              "
            />
          </div>
          <div style="float: right; width: 50%; height: 500px">
            <div
              style="
                margin: 50px 50px 0px 50px;
                padding-bottom: 20px;
                border-bottom: 1px solid black;
                text-align: left;
                font-weight: bold;
                font-size: 1.5rem;
              "
            >
              {{ item.title }}
            </div>
            <div
              style="
                margin: 0px 50px 50px 50px;
                padding-bottom: 20px;
                text-align: right;
              "
            >
              작성자 : {{ item.userNickName }} <br />
              작성일 : {{ item.regTime }}
            </div>

            <div
              style="
                margin: 50px 50px 0px 50px;
                padding-bottom: 20px;
                border-bottom: 1px solid black;
                text-align: center;
              "
            >
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import tokenDecoder from "@/util/token-decoder";
import { Viewer } from "@toast-ui/vue-editor";

export default {
  name: "simple-table",
  components: {
    Viewer,
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      boardList: [],
      token: null,
      sidoCode: null,
    };
  },
  created() {
    this.token = sessionStorage.getItem("access-token");
    this.sidoCode = tokenDecoder.decode(this.token).sidoCode;

    http
      .get(`/${this.sidoCode}/regionboard`)
      .then((response) => {
        console.log(response.data);
        this.boardList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    upload(event) {
      event.preventDefault();
      location.href = "./board/upload";
    },
  },
};
</script>
<style>
.md-table-head-container {
  text-align: center;
}
</style>

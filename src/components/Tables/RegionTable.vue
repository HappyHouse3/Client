<template>
  <div>
    <div v-if="boardList != null">
      <img
        src="../../assets/img/upload.jpg"
        style="width: 50px; height: 50px; cursor: pointer; float: right"
        @click="upload"
      />

      <div
        id="QnAArea"
        class="jm-font"
        style="
          display: grid;
          padding: 10px 100px;
          grid-template-columns: repeat(auto-fill, minmax(33%, auto));
        "
      >
        <div
          v-for="(item, index) in boardList"
          :key="index"
          style="width: 400px; margin: 20px 5px"
        >
          <b-card-group columns>
            <b-card
              :title="item.title"
              style="
                background-color: #c6b39a;
                border: none;
                border-radius: 20px;
              "
            >
              작성자 : {{ item.userNickName }} <br />
              작성일 : {{ item.regTime }}

              <Viewer v-if="item != null" :initialValue="item.img" />
              <b-card-text>
                {{ item.content }}
              </b-card-text>
            </b-card>
          </b-card-group>
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

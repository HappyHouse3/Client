<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Q&A 게시판</h4>
            <p class="category">이곳은 Q&A 게시판입니다.</p>
          </md-card-header>
          <md-card-content>
            <div id="typography">
              <div class="md-layout-item md-size-100 text-center">
                <md-button class="md-raised md-success" @click="upload"
                  >글쓰기</md-button
                >
              </div>

              <div
                id="mTxtArea"
                style="
                  margin-left: 20px;
                  width: 265px;
                  height: 265px;
                  background-color: white;
                  z-index: 50;
                  border: 1px solid black;
                  margin: 15px;
                  display: none;
                  justify-content: center;
                "
              >
                <input
                  placeholder="제목을 작성하세요"
                  v-model="title"
                  style="
                    margin-top: 10px;
                    margin-left: 10px;

                    border: none;
                  "
                />

                <textarea
                  v-model="content"
                  placeholder="내용을 작성하세요"
                  style="
                    width: 90%;
                    height: 150px;
                    margin-top: 10px;
                    margin-left: 10px;
                    border: none;
                  "
                />
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
                  @click="uploadReview"
                  >작성</b-button
                >
              </div>
            </div>

            <div
              id="QnAArea"
              style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(25%, auto));
              "
            >
              <div
                v-for="(item, index) in qnaList"
                :key="index"
                style="
                  margin-left: 20px;
                  width: 265px;
                  height: auto;
                  background-color: white;
                  z-index: 50;
                  border: 1px solid black;
                  margin: 15px;
                  display: block;
                  justify-content: center;
                "
              >
                <p
                  style="
                    color: #ffcd4a;
                    text-align: center;
                    margin-top: 15px;
                    font-weight: bold;
                    font-size: 1rem;
                  "
                >
                  {{ item.title }}
                </p>
                <p
                  style="
                    color: black;
                    text-align: right;
                    font-weight: bold;
                    font-size: 0.44rem;
                    margin-right: 10px;
                  "
                >
                  {{ item.userNickName }} ({{ item.regTime }})
                </p>
                <div
                  style="
                    color: black;
                    text-align: center;
                    font-weight: bold;
                    margin: 0px;
                    margin-top: 10px;
                    line-height: 80%;
                    height: 100px;
                  "
                >
                  {{ item.content }}
                </div>
                <hr style="margin: 0.5rem 0" />
                <p
                  style="font-size: 1rem; text-align: right; margin-right: 10px"
                >
                  💬 {{ item.replyList.length }}
                </p>
                <hr style="margin: 0" />
                <div style="background-color: rgb(248 241 246 / 50%)">
                  <div
                    v-for="(item, index) in item.replyList"
                    :key="index"
                    style="
                      padding-left: 10px;
                      margin-top: 5px;
                      margin-bottom: 5px;
                    "
                  >
                    <strong>{{ item.userNickName }}</strong> ({{
                      item.regTime
                    }}) <br />{{ item.content }}
                  </div>
                  <div
                    style="
                      display: flex;
                      margin-top: 20px;
                      margin-bottom: 20px;
                      margin-left: 10px;
                    "
                  >
                    <input v-model="replycontent" /><md-button
                      class="md-raised md-success"
                      style="min-width: 40px"
                      @click="replay(item.id)"
                      >작성</md-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import tokenDecoder from "@/util/token-decoder";

import { ninvoke } from "q";
export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      qnaList: [],
      title: null,
      content: null,
      token: null,
      replycontent: null,
    };
  },
  created() {
    this.token = sessionStorage.getItem("access-token");

    http
      .get("/qna")
      .then((response) => {
        console.log(response.data);
        this.qnaList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    upload() {
      var con = document.getElementById("mTxtArea");
      var createQna = document.getElementById("QnAArea");

      createQna.prepend(con);

      if (con.style.display == "none") {
        con.style.display = "block";
      } else if (con.style.display == "block") {
        con.style.display = "none";
      }
    },
    uploadReview() {
      http
        .post("/qna", {
          title: this.title,
          content: this.content,
          userNo: tokenDecoder.decode(this.token).userNo,
        })
        .then((response) => {
          console.log(response.data);
          console.log("글작성 성공");
        })
        .then(() => {
          http
            .get("/qna")
            .then((response) => {
              console.log(response.data);
              this.qnaList = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    replay(boardid) {
      http
        .post(`/qna/${boardid}/reply`, {
          content: this.replycontent,
          userNo: tokenDecoder.decode(this.token).userNo,
        })
        .then((response) => {
          console.log(response.data);
          console.log("댓글작성 성공");
        })
        .then(() => {
          http
            .get("/qna")
            .then((response) => {
              console.log(response.data);
              this.qnaList = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

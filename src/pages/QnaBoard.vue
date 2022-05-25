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
                class="md-layout-item md-medium-size-50 md-xsmall-size-100"
                style="display: none"
              >
                <stats-card data-background-color="green">
                  <template slot="content">
                    <div style="text-align: center">
                      <input
                        placeholder="제목을 작성하세요"
                        v-model="title"
                        style="
                          margin-top: 10px;
                          margin-left: 10px;
                          border: none;
                          text-align: center;
                        "
                      />
                    </div>
                  </template>

                  <template slot="footer"
                    ><div style="display: block !important; width: 100%">
                      <textarea
                        v-model="content"
                        placeholder="내용을 작성하세요"
                        style="
                          width: 100%;
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
                  </template>
                </stats-card>
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
                class="md-layout-item md-medium-size-50 md-xsmall-size-100"
              >
                <stats-card data-background-color="green">
                  <template slot="content">
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
                    <p class="category">
                      {{ item.userNickName }} ({{ item.regTime }})
                    </p>
                    <h4
                      class="title"
                      style="margin-top: 20px; text-align: left"
                    >
                      {{ item.content }}
                    </h4>
                  </template>

                  <template slot="footer">
                    <div class="stats" style="width: 100%">
                      <div style="width: 100%; text-align: right">
                        💬 {{ item.replyList.length }}
                      </div>

                      <div
                        style="
                          background-color: rgb(248 241 246 / 50%);
                          width: 100%;
                          display: grid;
                        "
                      >
                        <div
                          v-for="(item, index) in item.replyList"
                          :key="index"
                          style="
                            padding-left: 10px;
                            margin-top: 5px;
                            margin-bottom: 5px;
                            width: 100%;
                          "
                        >
                          <strong>{{ item.userNickName }}</strong> ({{
                            item.regTime
                          }}) <br />
                          {{ item.content }}
                        </div>
                        <reply-form
                          :boardId="item.id"
                          @updateReply="updateReply"
                        />
                      </div>
                    </div>
                  </template>
                </stats-card>
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
import ReplyForm from "@/components/replyForm";

import { ninvoke } from "q";
import { StatsCard } from "@/components";
export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  components: {
    StatsCard,
    ReplyForm,
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
    updateReply() {
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
    uploadReview() {
      document.getElementById("mTxtArea").style.display = "none";

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

<style>
.md-card-stats .md-card-header {
  display: none !important;
}
</style>

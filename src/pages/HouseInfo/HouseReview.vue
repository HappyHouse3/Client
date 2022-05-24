<template>
  <b-container style="height: 100%; display: block; align-items: center">
    <b-button
      size="sm"
      style="
        border: none;
        background-color: #e4e4e4;
        color: black;
        margin: auto;
        display: block;
        margin-bottom: 20px;
        margin-top: 20px;
      "
      @click="createReview"
      >리뷰 작성하기</b-button
    >
    <div
      id="myRev"
      style="
        margin: 20px 10px;
        display: none;
        height: 200px;
        border: 1px solid black;
      "
    >
      <div class="font-size-15 color-dimgrey" style="text-align: center">
        만족도
        <b-form-rating
          no-border
          variant="warning"
          inline
          size="sm"
          class="p-0 bg-transparent"
          v-model="score"
        ></b-form-rating>
        <textarea
          id="mTxtArea"
          v-model="content"
          placeholder="리뷰를 작성하세요"
          style="width: 100%; height: 100px; margin-top: 10px; border: none"
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
    <b-container v-if="reviews.length == 0" class="p-2" style="height: 100%">
      <b-container class="p-5">
        <h3><b-icon-emoji-expressionless></b-icon-emoji-expressionless></h3>
        등록된 리뷰가 없습니다
      </b-container>
    </b-container>
    <b-card
      class="text-left mb-3"
      role="dialog"
      v-for="(review, index) in reviews"
      :key="index"
    >
      <h5>{{ review.userNickName }}</h5>
      <b-card-text class="m-0"
        ><span class="font-size-15 color-dimgrey"
          >만족도 <strong>{{ review.score }}</strong>
          <b-form-rating
            v-model="review.score"
            readonly
            no-border
            variant="warning"
            inline
            size="sm"
            class="p-0 bg-transparent"
          ></b-form-rating></span
      ></b-card-text>
      <b-card-text class="font-size-18">
        {{ review.content }}
      </b-card-text>
    </b-card>
  </b-container>
</template>
<script>
import http from "@/util/http-common";
import tokenDecoder from "@/util/token-decoder";
export default {
  data() {
    return {
      reviews: [],
      content: null,
      title: "title",
      score: null,
    };
  },
  props: {
    curHouseInfo: {
      default: null,
    },
  },
  created() {
    this.token = sessionStorage.getItem("access-token");
  },
  methods: {
    createReview() {
      console.log(this.curHouseInfo);
      var con = document.getElementById("myRev");
      if (con.style.display == "none") {
        con.style.display = "block";
      } else if (con.style.display == "block") {
        con.style.display = "none";
      }
    },
    uploadReview(event) {
      event.preventDefault();
      console.log({
        content: this.content,
        title: this.title,
        score: this.score,
        userNo: tokenDecoder.decode(this.token).userNo,
      });

      http
        .post(`/map/apt/${this.curHouseInfo.aptCode}/review`, {
          content: this.content,
          title: this.title,
          score: this.score,
          userNo: tokenDecoder.decode(this.token).userNo,
        })
        .then(() => {
          console.log("리뷰 작성 성공");
          var con = document.getElementById("myRev");
          document.getElementById("mTxtArea").value = " ";
          this.content = "";
          con.style.display = "none";
        })
        .then(() => {
          http
            .get(`/map/apt/${this.curHouseInfo.aptCode}/review`)
            .then(({ data }) => {
              this.reviews = data;
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
  watch: {
    curAptCode: function () {
      console.log(this.curHouseInfo.userNo);
      if (this.curAptCode) {
        console.log("리뷰 불러오기");
        http
          .get(`/map/apt/${this.curHouseInfo.aptCode}/review`)
          .then(({ data }) => {
            this.reviews = data;
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(this.reviews);
      }
    },
  },
  computed() {},
};
</script>

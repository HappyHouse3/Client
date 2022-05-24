<template>
  <b-container style="height: 100%">
    <b-container v-if="reviews.length == 0" class="p-2">
      <b-container class="p-5">
        <h3><b-icon-emoji-expressionless></b-icon-emoji-expressionless></h3>
        등록된 리뷰가 없습니다
      </b-container>
    </b-container>
    <b-card
      :title="review.title"
      class="text-left mb-3"
      role="dialog"
      v-for="(review, index) in reviews"
      :key="index"
    >
      <b-card-text class="m-0"
        ><span class="font-size-15 color-dimgrey"
          >만족도 <strong>4.5</strong>
          <b-form-rating
            v-model="review.star"
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
export default {
  data() {
    return {
      reviews: [],
    };
  },
  props: {
    curAptCode: {
      default: 0,
      type: Number,
    },
  },
  methods: {
    createReview() {},
  },
  watch: {
    curAptCode: function () {
      console.log(this.curAptCode);
      if (this.curAptCode) {
        console.log("리뷰 불러오기");
        http
          .get(`/map/apt/${this.curAptCode}/review`)
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

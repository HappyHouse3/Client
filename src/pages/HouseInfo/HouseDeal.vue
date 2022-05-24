<template>
  <div>
    <b-card
      border-variant="success"
      header-bg-variant="success"
      header-border-variant="success"
      header-text-variant="white"
      header="평균 실거래가"
      align="center"
      class="mb-4"
    >
      <b-card-text>
        <div style="display: flex; justify-content: center">
          <h1 class="font-weight-bold m-0">{{ avgDealAmount }}</h1>
          <h6 style="padding-top: 22px">&nbsp;&nbsp;만원</h6>
        </div>
      </b-card-text>
    </b-card>
    <b-card
      v-for="(item, index) in aptDeals"
      :key="index"
      tag="article"
      style="height: 120px"
      class="mb-2"
    >
      <div style="display: flex">
        <h4>{{ item.dealAmount }}</h4>
        <h6 style="margin-top: 7px">&nbsp;&nbsp;만원</h6>
      </div>
      <b-card-text style="margin-bottom: 4px">
        면적 : {{ item.area }}m²
      </b-card-text>
      <b-card-text>
        거래날짜 : {{ item.dealYear }}년 {{ item.dealMonth }}월
        {{ item.dealDay }}일
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    aptDeals: {
      type: Array,
    },
  },
  data() {
    return {
      avgDealAmount: 0,
    };
  },
  watch: {
    aptDeals: function () {
      let total = 0;
      console.log("거래내역 불러오기 완료");
      console.log(this.aptDeals);
      this.aptDeals.forEach((apt) => {
        total += parseInt(apt.dealAmount.replace(",", ""));
      });
      if (this.aptDeals.length != 0) {
        total = Math.round(total / this.aptDeals.length);
      }
      this.avgDealAmount = total.toLocaleString("ko-KR");
    },
  },
};
</script>

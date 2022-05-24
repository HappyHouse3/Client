<template>
  <b-card
    title="Card Title"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem; height: 92%"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</template>
<script>
export default {
  props: {
    aptDeals: {
      type: Array,
    },
  },
  watch: {
    aptDeals: function () {
      console.log("거래내역 불러오기 완료");
      console.log(this.aptDeals);
    },
  },
};
</script>

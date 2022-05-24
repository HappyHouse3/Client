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
            <div id="typography"></div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
};
</script>

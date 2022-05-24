<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">지역별 게시판</h4>
            <p class="category">이곳은 지역별 게시판입니다.</p>
          </md-card-header>
          <md-card-content>
            <region-table table-header-color="green"></region-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { RegionTable } from "@/components";

export default {
  components: {
    RegionTable,
  },
};
</script>

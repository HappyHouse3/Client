<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>아파트 매매정보</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>

        <p v-if="token">프로필</p>
        <p v-else>회원가입</p>
      </sidebar-link>
      <sidebar-link to="/notice">
        <md-icon>content_paste</md-icon>
        <p>공지사항</p>
      </sidebar-link>
      <sidebar-link to="/board" v-if="token">
        <md-icon>dashboard</md-icon>
        <p>{{ sidoName }} 게시판</p>
      </sidebar-link>
      <sidebar-link to="/qna">
        <md-icon>library_books</md-icon>
        <p>Q&A</p>
      </sidebar-link>
      <!-- <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link> -->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";
import jwt_decode from "jwt-decode";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      token: null,
      sidoName: null,
    };
  },
  created() {
    this.token = sessionStorage.getItem("access-token");
    if (this.token) {
      this.sidoName = jwt_decode(this.token).sidoName;
    }
  },
};
</script>

<style>
.jm-font {
  font-family: "Hanna", sans-serif;
}
</style>

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import UserLogin from "@/pages/UserLogin.vue";
import TableList from "@/pages/TableList.vue";
import NoticeUpload from "@/pages/NoticeUpload.vue";
import NoticeDetail from "@/pages/NoticeDetail.vue";
import Typography from "@/pages/Typography.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/maps",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "login",
        name: "User Login",
        component: UserLogin,
      },
      {
        path: "notice",
        name: "Notice",
        component: TableList,
      },
      {
        path: "notice/detail",
        name: "Notice Detail",
        component: NoticeDetail,
        props: true,
      },
      {
        path: "notice/upload",
        name: "Notice Upload",
        component: NoticeUpload,
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography,
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
        },
        component: Maps,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      },
    ],
  },
];

export default routes;

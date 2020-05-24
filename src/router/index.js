import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "UserManagement",
    component: () => import("../views/StaffManagement.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

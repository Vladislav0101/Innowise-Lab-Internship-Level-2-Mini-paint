import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Routes from "./routes";
import Main from "@/components/Main/Main.vue";
import Create from "@/components/Creat/Create.vue";
import SignIn from "@/components/Auth/SignIn.vue";
import Registration from "@/components/Auth/Registration.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "main",
      path: Routes.main,
      component: Main,
    },
    {
      name: "create",
      path: Routes.create,
      component: Create,
    },
    {
      name: "sign",
      path: Routes.sign,
      component: SignIn,
    },
    {
      name: "registration",
      path: Routes.registration,
      component: Registration,
    },
  ],
});

export default router;

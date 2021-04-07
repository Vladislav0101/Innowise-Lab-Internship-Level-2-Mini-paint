import Vue from "vue";
import VueRouter from "vue-router";

import Routes from "./routes";
import store from "@/store/index";

import Main from "@/pages/Main.vue";
import Create from "@/pages/Create.vue";
import SignIn from "@/pages/SignIn.vue";
import Registration from "@/pages/Registration.vue";
import Slider from "@/pages/Slider.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "main",
      path: Routes.main,
      component: Main,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "create",
      path: Routes.create,
      component: Create,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "sign",
      path: Routes.sign,
      component: SignIn,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: "registration",
      path: Routes.registration,
      component: Registration,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: "slider",
      path: Routes.slider,
      component: Slider,
      meta: {
        requiresAuth: true,
      },
      beforeEnter(to, from, next) {
        if (from.path === Routes.main) {
          next();
        } else {
          next({ path: Routes.main });
        }
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const user: string = store.getters.user;
  const isRequiresAuth = to.meta.requiresAuth;

  if (isRequiresAuth && !user) {
    next({ path: Routes.sign });
  } else if (!isRequiresAuth && user) {
    next({ path: Routes.main });
  } else {
    next();
  }
});
export default router;

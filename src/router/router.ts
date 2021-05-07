import Vue from "vue";
import VueRouter from "vue-router";

import Routes from "./routes";
import store from "@/store/index";

import Main from "@/pages/Main.vue";
import Create from "@/pages/Create.vue";
import SignIn from "@/pages/SignIn.vue";
import Registration from "@/pages/Registration.vue";
import Slider from "@/pages/SliderPage.vue";
import MyAccount from "@/pages/MyAccount.vue";
import SomeoneUser from "@/pages/SomeoneUser.vue";

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
    {
      name: "myAccount",
      path: Routes.myAccount,
      component: MyAccount,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "someoneUser",
      path: Routes.someoneUser,
      component: SomeoneUser,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.dispatch("setAnalyticsUnit", {
    user: store.getters.user,
    date: new Date().getTime(),
    event: `visit-${to.name}-page`,
  });

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

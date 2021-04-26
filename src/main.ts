import Vulidate from "vuelidate";
import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import { PopoverPlugin } from "bootstrap-vue";

import router from "./router/router";
import store from "./store";

import App from "./App.vue";

Vue.use(PopoverPlugin);
Vue.use(VueCompositionAPI);
Vue.use(Vulidate);

Vue.config.productionTip = false;

export const eventBus = new Vue();

store.dispatch("initializeApp").then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});

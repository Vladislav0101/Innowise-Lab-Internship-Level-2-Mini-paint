import Vue from "vue";
import { PopoverPlugin } from "bootstrap-vue";

import router from "./router/router";
import store from "./store";

import App from "./App.vue";

Vue.use(PopoverPlugin);

Vue.config.productionTip = false;

export const eventBus = new Vue();

store.dispatch("initializeApp").then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});

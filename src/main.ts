import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";

Vue.config.productionTip = false;
console.log("asd");
store.dispatch("initializeApp").then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});

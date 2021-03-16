import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";

import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";
import "firebase/storage";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  created(): void {
    const firebaseConfig: object = {
      apiKey: process.env.VUE_APP_API_KEY,
      authDomain: process.env.VUE_APP_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_DATABASE_URL,
      projectId: process.env.VUE_APP_PROJECT_ID,
      storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_APPID,
    };
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        this.$store.commit("setUser", user.uid);
        this.$store.commit("setEmail", user.email);
        if (this.$route.name !== "main") this.$router.push({ name: "main" });
      } else {
        if (this.$route.name !== "sign") this.$router.push({ name: "sign" });
      }
    });
  },
}).$mount("#app");

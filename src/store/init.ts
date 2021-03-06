import { ActionTree, MutationTree, GetterTree } from "vuex";
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";
import "firebase/storage";

import { IRootState, IInit } from "@/types/index";
import { eventBus } from "@/main";

const state: IInit = {
  isInit: false,
};

const getters: GetterTree<IInit, IRootState> = {
  isInit(state) {
    return state.isInit;
  },
};

const mutations: MutationTree<IInit> = {
  setIsInit(state, value) {
    state.isInit = value;
  },
};

const actions: ActionTree<IInit, IRootState> = {
  async initializeApp({ commit, dispatch }) {
    const firebaseConfig = {
      apiKey: process.env.VUE_APP_API_KEY,
      authDomain: process.env.VUE_APP_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_DATABASE_URL,
      projectId: process.env.VUE_APP_PROJECT_ID,
      storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_APPID,
    };
    firebase.initializeApp(firebaseConfig);

    commit("setIsInit", true);

    return new Promise((res, rej) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit("setUser", { newUser: user.uid, email: user.email });

          dispatch("initVersion");
        }
        res(user);
      }, rej);
    });
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};

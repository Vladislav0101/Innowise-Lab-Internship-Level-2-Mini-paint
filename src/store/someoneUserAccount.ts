import firebase from "firebase";
import { ActionTree, MutationTree, GetterTree } from "vuex";

import { IRootState, ISomeoneUser } from "@/types/index";
import { stringToDBFormat } from "@/utils/helpFunction";

const state: ISomeoneUser = {
  someoneUserInfo: null,
  someoneUserEmail: null,
};

const getters: GetterTree<ISomeoneUser, IRootState> = {
  someoneUserInfo(state) {
    return state.someoneUserInfo;
  },
  someoneUserEmail(state) {
    return state.someoneUserEmail;
  },
};

const mutations: MutationTree<ISomeoneUser> = {
  setSomeoneUserInfo(state, userInfo) {
    state.someoneUserInfo = userInfo;
  },
  setSomeoneUserEmail(state, email) {
    state.someoneUserEmail = email;
  },
};

const actions: ActionTree<ISomeoneUser, IRootState> = {
  getSomeoneUserInfo({ commit }, email) {
    commit("setSomeoneUserEmail", email);

    const emailToDb = stringToDBFormat(email);
    firebase
      .database()
      .ref(`${emailToDb}/userInfo`)
      .on("value", (res) => {
        commit("setSomeoneUserInfo", res.val());
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

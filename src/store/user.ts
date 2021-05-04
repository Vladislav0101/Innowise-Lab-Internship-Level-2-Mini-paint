import firebase from "firebase";
import { ActionTree, MutationTree, GetterTree } from "vuex";

import { IRootState, IUser } from "@/types/index";
import { eventBus } from "@/main";
import { stringToDBFormat } from "@/utils/helpFunction";

const state: IUser = {
  userAccountInfo: null,
  userAvatar: null,
};

const getters: GetterTree<IUser, IRootState> = {
  userAccountInfo(state) {
    return state.userAccountInfo;
  },
  userAvatar(state) {
    return state.userAvatar;
  },
};

const mutations: MutationTree<IUser> = {
  setUserAccountInfo(state, userInfo) {
    state.userAccountInfo = userInfo;
  },

  setUserAvatar(state, url) {
    state.userAvatar = url;
  },
};

const actions: ActionTree<IUser, IRootState> = {
  async checkEqualVersion({ getters, commit, dispatch }) {
    const emailToDB = stringToDBFormat(getters.email);

    firebase
      .database()
      .ref(`users/${emailToDB}/version`)
      .on("value", (res) => {
        const result = res.val();

        if (!result || result.version !== getters.version) {
          dispatch("setVersionOnDB");
        }

        commit("setIsVersionsMatch", result.version === getters.version);

        if (!result.checkedVersion) {
          eventBus.$emit("isNeedToLearningPath");
        }
      });
    commit("setFeatures");
  },

  async setVersionOnDB({ getters }, value) {
    const emailToDB = stringToDBFormat(getters.email);
    firebase
      .database()
      .ref(`users/${emailToDB}/version`)
      .set({
        version: getters.version,
        checkedVersion: value ? value : false,
      });
  },

  setUserInfo({ dispatch, getters }, userInfo) {
    const emailToDB = stringToDBFormat(getters.email);
    firebase
      .database()
      .ref(`users/${emailToDB}/userInfo`)
      .set(userInfo);

    dispatch("getUserInfo");
  },

  setUserAvatar({ getters, dispatch, commit }, { img }) {
    const storageRef = firebase.storage().ref("avatars/");
    const emailToDB = stringToDBFormat(getters.email);

    storageRef
      .child(`${getters.email}.jpeg`)
      .putString(img, "data_url")
      .then(() => {
        firebase
          .database()
          .ref(`users/${emailToDB}/isAvatar`)
          .set(true);
      });

    commit("setUsersAvatars", { email: getters.email, img });
  },

  getUserInfo({ getters, commit }) {
    const emailToDB = stringToDBFormat(getters.email);

    firebase
      .database()
      .ref(`users/${emailToDB}/userInfo`)
      .on("value", (res) => {
        commit("setUserAccountInfo", res.val());
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

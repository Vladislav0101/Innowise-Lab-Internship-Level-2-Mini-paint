import firebase from "firebase";
import { ActionTree, MutationTree, GetterTree } from "vuex";

import { IRootState, IVersion } from "@/types/index";
import features from "@/utils/features";

const state: IVersion = {
  version: "1.0",
  versionReviewed: false,
  features: {},
};

const getters: GetterTree<IVersion, IRootState> = {
  version(state) {
    return state.version;
  },
  versionReviewed(state) {
    return state.versionReviewed;
  },
  features(state) {
    return state.features;
  },
};

const mutations: MutationTree<IVersion> = {
  setFeatures(state, features) {
    state.features = features;
  },
  setVersionReviewed(state, value) {
    state.versionReviewed = value;
  },
};

const actions: ActionTree<IVersion, IRootState> = {
  getFeatures({ commit }) {
    commit("setFeatures", features);
  },

  async checkEqualVersion({ dispatch, getters, commit }) {
    const user = getters.user;

    firebase
      .database()
      .ref(`${user}`)
      .on("value", (res) => {
        const result = res.val();

        if (!result || result.version !== state.version) {
          dispatch("setVersionOnDB");
        } else {
          commit("setVersionReviewed", result.checkedVersion);
        }

        if (!result.checkedVersion) {
          const resultQ = confirm(
            "We have some new features, would you like to see them?"
          );

          if (resultQ) {
            commit("setVersionReviewed", false);
          } else {
            commit("setVersionReviewed", true);
            dispatch("setVersionOnDB", true);
          }
        }
      });

    dispatch("getFeatures");
  },

  async setVersionOnDB({ getters }, value) {
    const user = getters.user;

    firebase
      .database()
      .ref(`${user}`)
      .set({
        version: state.version,
        checkedVersion: value ? value : false,
      });
  },
};

export default { state, getters, actions, mutations };
